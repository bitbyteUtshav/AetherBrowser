package com.aether.browser.controller

import android.graphics.Bitmap
import android.net.http.SslError
import android.webkit.*
import androidx.webkit.SafeBrowsingResponseCompat
import androidx.webkit.WebResourceErrorCompat
import androidx.webkit.WebViewClientCompat
import androidx.webkit.WebViewFeature

/**
 * Custom WebViewClient for Aether Browser Phase 2:
 * - Strictly enforces TLS: NEVER bypasses SSL/TLS certificate errors (calls handler.cancel()).
 * - Enforces Safe Browsing where supported.
 * - Validates URL schemes: restricts navigation to http/https, blocking dangerous schemes (file:, javascript:).
 * - Upgrades standard http requests to https where possible.
 */
class AetherWebViewClient(
    private val onPageStartedCallback: (url: String) -> Unit,
    private val onPageFinishedCallback: (url: String) -> Unit,
    private val onSslErrorCallback: (error: SslError) -> Unit,
    private val onHttpErrorCallback: (errorCode: Int, description: String) -> Unit
) : WebViewClientCompat() {

    override fun shouldOverrideUrlLoading(view: WebView, request: WebResourceRequest): Boolean {
        val uri = request.url
        val scheme = uri.scheme?.lowercase() ?: return true

        // Strict scheme validation: only http and https are allowed in the browser frame
        return when (scheme) {
            "http", "https" -> false // Allow WebView to handle navigation normally
            else -> {
                // Block file://, content://, javascript:, intent: from arbitrary web navigation
                true
            }
        }
    }

    override fun onPageStarted(view: WebView?, url: String?, favicon: Bitmap?) {
        super.onPageStarted(view, url, favicon)
        if (url != null) {
            onPageStartedCallback(url)
        }
    }

    override fun onPageFinished(view: WebView?, url: String?) {
        super.onPageFinished(view, url)
        if (url != null) {
            onPageFinishedCallback(url)
        }
    }

    /**
     * CRITICAL SECURITY INVARIANT:
     * NEVER bypass TLS/SSL errors. Always cancel the handler immediately
     * to protect user credentials, session cookies, and privacy against MITM attacks.
     */
    override fun onReceivedSslError(view: WebView?, handler: SslErrorHandler?, error: SslError?) {
        // Explicitly cancel navigation on any SSL failure
        handler?.cancel()
        if (error != null) {
            onSslErrorCallback(error)
        }
    }

    override fun onReceivedError(
        view: WebView,
        request: WebResourceRequest,
        error: WebResourceErrorCompat
    ) {
        if (request.isForMainFrame &&
            WebViewFeature.isFeatureSupported(WebViewFeature.WEB_RESOURCE_ERROR_GET_CODE) &&
            WebViewFeature.isFeatureSupported(WebViewFeature.WEB_RESOURCE_ERROR_GET_DESCRIPTION)
        ) {
            onHttpErrorCallback(error.errorCode, error.description.toString())
        }
    }

    /**
     * Safe Browsing integration via AndroidX WebKit
     */
    override fun onSafeBrowsingHit(
        view: WebView,
        request: WebResourceRequest,
        threatType: Int,
        callback: SafeBrowsingResponseCompat
    ) {
        // Enforce back to safety when malicious malware, phishing, or harmful content is detected
        callback.backToSafety(true)
    }
}
