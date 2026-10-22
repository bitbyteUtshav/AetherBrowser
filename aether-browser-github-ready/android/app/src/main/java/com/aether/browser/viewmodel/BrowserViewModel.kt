package com.aether.browser.viewmodel

import android.app.Application
import android.webkit.CookieManager
import android.webkit.WebStorage
import androidx.lifecycle.AndroidViewModel
import com.aether.browser.controller.AetherWebViewController
import com.aether.browser.data.model.Bookmark
import com.aether.browser.data.model.HistoryItem
import com.aether.browser.data.model.TabState
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import java.util.UUID

/**
 * Architecture-compliant ViewModel managing multi-tab browser state,
 * WebView controllers, navigation, history, bookmarks, and privacy data.
 */
class BrowserViewModel(application: Application) : AndroidViewModel(application) {

    private val controllers = mutableMapOf<String, AetherWebViewController>()

    private val _tabs = MutableStateFlow<List<TabState>>(emptyList())
    val tabs: StateFlow<List<TabState>> = _tabs.asStateFlow()

    private val _activeTabId = MutableStateFlow<String>("")
    val activeTabId: StateFlow<String> = _activeTabId.asStateFlow()

    private val _bookmarks = MutableStateFlow<List<Bookmark>>(emptyList())
    val bookmarks: StateFlow<List<Bookmark>> = _bookmarks.asStateFlow()

    private val _history = MutableStateFlow<List<HistoryItem>>(emptyList())
    val history: StateFlow<List<HistoryItem>> = _history.asStateFlow()

    init {
        // Create initial starting tab
        createNewTab(url = "", isPrivate = false)
    }

    fun getController(tabId: String): AetherWebViewController? = controllers[tabId]

    fun createNewTab(url: String = "", isPrivate: Boolean = false): String {
        val newId = UUID.randomUUID().toString()
        val controller = AetherWebViewController(
            context = getApplication(),
            tabId = newId,
            isPrivate = isPrivate,
            onUrlChanged = { newUrl ->
                updateTab(newId) { it.copy(url = newUrl, canGoBack = true) }
                if (newUrl.isNotBlank() && !isPrivate) {
                    recordHistory(title = newUrl, url = newUrl)
                }
            },
            onTitleChanged = { newTitle ->
                updateTab(newId) { it.copy(title = newTitle) }
            },
            onProgressChanged = { progress ->
                updateTab(newId) { it.copy(progress = progress) }
            },
            onSslError = { error ->
                updateTab(newId) { it.copy(sslError = "TLS Certificate Verification Failed: $error") }
            },
            onHttpError = { code, desc ->
                // Handle main frame error
            }
        )

        controllers[newId] = controller

        val newTab = TabState(
            id = newId,
            title = if (url.isBlank()) "Start Page" else "Loading...",
            url = url,
            isPrivate = isPrivate
        )

        _tabs.value = _tabs.value + newTab
        _activeTabId.value = newId

        if (url.isNotBlank()) {
            controller.loadUrl(url)
        }

        return newId
    }

    fun selectTab(tabId: String) {
        if (_tabs.value.any { it.id == tabId }) {
            _activeTabId.value = tabId
        }
    }

    fun closeTab(tabId: String) {
        val controller = controllers.remove(tabId)
        controller?.destroy()

        val remaining = _tabs.value.filterNot { it.id == tabId }
        if (remaining.isEmpty()) {
            _tabs.value = emptyList()
            createNewTab()
        } else {
            _tabs.value = remaining
            if (_activeTabId.value == tabId) {
                _activeTabId.value = remaining.last().id
            }
        }
    }

    fun closeAllTabs() {
        controllers.values.forEach { it.destroy() }
        controllers.clear()
        _tabs.value = emptyList()
        createNewTab()
    }

    fun navigate(url: String) {
        val currentId = _activeTabId.value
        val controller = controllers[currentId]
        if (controller != null) {
            updateTab(currentId) { it.copy(sslError = null) }
            controller.loadUrl(url)
        }
    }

    fun goBack() {
        controllers[_activeTabId.value]?.goBack()
    }

    fun goForward() {
        controllers[_activeTabId.value]?.goForward()
    }

    fun reload() {
        controllers[_activeTabId.value]?.reload()
    }

    fun stop() {
        controllers[_activeTabId.value]?.stopLoading()
    }

    fun addBookmark(title: String, url: String) {
        _bookmarks.value = _bookmarks.value + Bookmark(title = title, url = url)
    }

    fun removeBookmark(id: Long) {
        _bookmarks.value = _bookmarks.value.filterNot { it.id == id }
    }

    private fun recordHistory(title: String, url: String) {
        _history.value = listOf(HistoryItem(title = title, url = url)) + _history.value.take(49)
    }

    fun clearBrowsingData() {
        // Clear all cookies
        CookieManager.getInstance().removeAllCookies(null)
        CookieManager.getInstance().flush()

        // Clear web database & local storage
        WebStorage.getInstance().deleteAllData()

        // Clear in-memory history and active tab histories
        _history.value = emptyList()
        controllers.values.forEach { it.webView.clearCache(true) }
    }

    fun onPause() {
        controllers.values.forEach { it.pause() }
    }

    fun onResume() {
        controllers.values.forEach { it.resume() }
    }

    override fun onCleared() {
        super.onCleared()
        controllers.values.forEach { it.destroy() }
        controllers.clear()
    }

    private fun updateTab(tabId: String, transform: (TabState) -> TabState) {
        _tabs.value = _tabs.value.map { tab ->
            if (tab.id == tabId) transform(tab) else tab
        }
    }
}
