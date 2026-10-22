package com.aether.browser.controller

import android.annotation.SuppressLint
import android.content.Context
import android.net.http.SslError
import android.view.ViewGroup
import android.webkit.CookieManager
import android.webkit.WebSettings
import android.webkit.WebView
import androidx.webkit.WebViewCompat
import androidx.webkit.WebViewFeature

/**
 * Encapsulates a Chromium-backed Android WebView instance for a browser tab.
 */
class AetherWebViewController(
    val context: Context,
    val tabId: String,
    val isPrivate: Boolean = false,
    private val onUrlChanged: (String) -> Unit,
    private val onTitleChanged: (String) -> Unit,
    private val onProgressChanged: (Int) -> Unit,
    private val onSslError: (SslError) -> Unit,
    private val onHttpError: (Int, String) -> Unit
) {
    val webView: WebView = WebView(context).apply {
        layoutParams = ViewGroup.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT,
            ViewGroup.LayoutParams.MATCH_PARENT
        )
    }

    private val downloadHandler = AetherDownloadHandler(context)

    init {
        configureWebSettings()
        setupClients()
    }

    @SuppressLint("SetJavaScriptEnabled")
    private fun configureWebSettings() {
        webView.settings.apply {
            // Enable JavaScript for standard modern web app compatibility
            javaScriptEnabled = true

            // HTML5 storage APIs
            domStorageEnabled = true
            databaseEnabled = true

            // Responsive viewport support
            useWideViewPort = true
            loadWithOverviewMode = true

            // Pinch-to-zoom
            setSupportZoom(true)
            builtInZoomControls = true
            displayZoomControls = false

            // SECURITY INVARIANTS:
            // 1. Never allow file access to app sandbox files from web content
            allowFileAccess = false
            allowContentAccess = false

            // 2. Disallow mixed content (enforces HTTPS)
            mixedContentMode = WebSettings.MIXED_CONTENT_NEVER_ALLOW

            // 3. Enable Safe Browsing where supported by AndroidX WebKit
            if (WebViewFeature.isFeatureSupported(WebViewFeature.SAFE_BROWSING_ENABLE)) {
                safeBrowsingEnabled = true
            }

            // 4. In private incognito mode, disable persistent caching and form data
            if (isPrivate) {
                cacheMode = WebSettings.LOAD_NO_CACHE
                saveFormData = false
                savePassword = false
            } else {
                cacheMode = WebSettings.LOAD_DEFAULT
            }
        }

        // Configure CookieManager for privacy mode
        if (isPrivate) {
            CookieManager.getInstance().setAcceptCookie(false)
        } else {
            CookieManager.getInstance().setAcceptCookie(true)
            CookieManager.getInstance().setAcceptThirdPartyCookies(webView, false)
        }

        // Configure Download Listener
        webView.setDownloadListener { url, userAgent, contentDisposition, mimetype, contentLength ->
            downloadHandler.handleDownload(url, userAgent, contentDisposition, mimetype, contentLength)
        }

        // NOTE: We deliberately DO NOT call webView.addJavascriptInterface()
        // Never expose privileged Kotlin/Java methods to arbitrary untrusted web content!
    }

    private fun setupClients() {
        webView.webViewClient = AetherWebViewClient(
            onPageStartedCallback = { url -> onUrlChanged(url) },
            onPageFinishedCallback = { url -> onUrlChanged(url) },
            onSslErrorCallback = { error -> onSslError(error) },
            onHttpErrorCallback = { code, desc -> onHttpError(code, desc) }
        )

        webView.webChromeClient = AetherWebChromeClient(
            onProgressChangedCallback = { progress -> onProgressChanged(progress) },
            onTitleReceivedCallback = { title -> onTitleChanged(title) },
            onFileChooserCallback = { _, _ ->
                // Handled via ActivityResult in Activity
                false
            },
            onPermissionRequestedCallback = { request ->
                // Deny by default unless user explicitly grants via permission prompt
                request.deny()
            }
        )
    }

    fun loadUrl(url: String) {
        val normalizedUrl = normalizeUrl(url)
        webView.loadUrl(normalizedUrl)
    }

    fun canGoBack(): Boolean = webView.canGoBack()

    fun goBack() {
        if (webView.canGoBack()) {
            webView.goBack()
        }
    }

    fun canGoForward(): Boolean = webView.canGoForward()

    fun goForward() {
        if (webView.canGoForward()) {
            webView.goForward()
        }
    }

    fun reload() {
        webView.reload()
    }

    fun stopLoading() {
        webView.stopLoading()
    }

    fun pause() {
        webView.onPause()
        webView.pauseTimers()
    }

    fun resume() {
        webView.onResume()
        webView.resumeTimers()
    }

    fun destroy() {
        (webView.parent as? ViewGroup)?.removeView(webView)
        webView.stopLoading()
        webView.clearHistory()
        webView.destroy()
    }

    private fun normalizeUrl(input: String): String {
        val trimmed = input.trim()
        return if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
            trimmed
        } else if (trimmed.contains(".") && !trimmed.contains(" ")) {
            "https://$trimmed"
        } else {
            "https://www.google.com/search?q=${java.net.URLEncoder.encode(trimmed, "UTF-8")}"
        }
    }
}
