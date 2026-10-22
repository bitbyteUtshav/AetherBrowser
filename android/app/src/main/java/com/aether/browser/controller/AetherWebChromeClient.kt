package com.aether.browser.controller

import android.net.Uri
import android.webkit.PermissionRequest
import android.webkit.ValueCallback
import android.webkit.WebChromeClient
import android.webkit.WebView

/**
 * WebChromeClient for Aether Browser:
 * - Real loading progress updates
 * - Document page title updates
 * - Safe file chooser bridge with ActivityResult callback
 * - Safe web permission handling (Camera, Microphone, Geolocation) requiring user consent
 */
class AetherWebChromeClient(
    private val onProgressChangedCallback: (progress: Int) -> Unit,
    private val onTitleReceivedCallback: (title: String) -> Unit,
    private val onFileChooserCallback: (
        filePathCallback: ValueCallback<Array<Uri>>,
        fileChooserParams: WebChromeClient.FileChooserParams
    ) -> Boolean,
    private val onPermissionRequestedCallback: (request: PermissionRequest) -> Unit
) : WebChromeClient() {

    override fun onProgressChanged(view: WebView?, newProgress: Int) {
        super.onProgressChanged(view, newProgress)
        onProgressChangedCallback(newProgress)
    }

    override fun onReceivedTitle(view: WebView?, title: String?) {
        super.onReceivedTitle(view, title)
        if (title != null) {
            onTitleReceivedCallback(title)
        }
    }

    override fun onShowFileChooser(
        webView: WebView?,
        filePathCallback: ValueCallback<Array<Uri>>?,
        fileChooserParams: FileChooserParams?
    ): Boolean {
        if (filePathCallback == null || fileChooserParams == null) {
            return false
        }
        return onFileChooserCallback(filePathCallback, fileChooserParams)
    }

    override fun onPermissionRequest(request: PermissionRequest?) {
        if (request != null) {
            // Forward to browser ViewModel/Activity to prompt user explicitly
            onPermissionRequestedCallback(request)
        }
    }
}
