package com.aether.browser

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.activity.viewModels
import androidx.compose.animation.*
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import com.aether.browser.ui.components.AetherWebView
import com.aether.browser.ui.screens.*
import com.aether.browser.ui.theme.*
import com.aether.browser.viewmodel.BrowserViewModel

class MainActivity : ComponentActivity() {

    private val browserViewModel: BrowserViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        setContent {
            var isDarkMode by remember { mutableStateOf(true) }

            AetherBrowserTheme(darkTheme = isDarkMode) {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    BrowserApp(
                        viewModel = browserViewModel,
                        isDarkMode = isDarkMode,
                        onToggleDarkMode = { isDarkMode = it }
                    )
                }
            }
        }
    }

    override fun onPause() {
        super.onPause()
        browserViewModel.onPause()
    }

    override fun onResume() {
        super.onResume()
        browserViewModel.onResume()
    }
}

@Composable
fun BrowserApp(
    viewModel: BrowserViewModel,
    isDarkMode: Boolean,
    onToggleDarkMode: (Boolean) -> Unit
) {
    val tabs by viewModel.tabs.collectAsState()
    val activeTabId by viewModel.activeTabId.collectAsState()
    val activeTab = tabs.find { it.id == activeTabId } ?: tabs.firstOrNull()

    var showTabsOverview by remember { mutableStateOf(false) }
    var showSettings by remember { mutableStateOf(false) }
    var searchEngine by remember { mutableStateOf("Google") }
    var trackingProtection by remember { mutableStateOf(true) }

    val controller = activeTab?.let { viewModel.getController(it.id) }

    Scaffold(
        modifier = Modifier.fillMaxSize(),
        bottomBar = {
            FloatingOmnibar(
                currentUrl = activeTab?.url ?: "",
                onSearchOrNavigate = { query -> viewModel.navigate(query) },
                canGoBack = controller?.canGoBack() == true,
                onBack = { viewModel.goBack() },
                canGoForward = controller?.canGoForward() == true,
                onForward = { viewModel.goForward() },
                tabCount = tabs.size,
                onOpenTabs = { showTabsOverview = true },
                onOpenSettings = { showSettings = true }
            )
        }
    ) { innerPadding ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
        ) {
            val currentUrl = activeTab?.url ?: ""

            if (currentUrl.isEmpty()) {
                // Home Screen
                HomeScreen(
                    onNavigateToUrl = { url -> viewModel.navigate(url) },
                    onOpenTabs = { showTabsOverview = true },
                    onOpenSettings = { showSettings = true },
                    tabCount = tabs.size
                )
            } else if (controller != null) {
                // Active Chromium WebView
                AetherWebView(
                    webView = controller.webView,
                    sslError = activeTab?.sslError,
                    onDismissSslError = { viewModel.goBack() }
                )
            }

            // Real Loading Progress Bar
            if (activeTab != null && activeTab.progress in 1..99) {
                LinearProgressIndicator(
                    progress = { activeTab.progress / 100f },
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(2.5.dp),
                    color = AetherVioletPrimary,
                    trackColor = Color.Transparent
                )
            }

            // Tabs Switcher Overlay
            if (showTabsOverview) {
                TabsOverview(
                    tabs = tabs.map { TabModel(it.id, it.title, it.url, it.isPrivate) },
                    activeTabId = activeTabId,
                    onSelectTab = { selectedId ->
                        viewModel.selectTab(selectedId)
                        showTabsOverview = false
                    },
                    onCloseTab = { closeId -> viewModel.closeTab(closeId) },
                    onNewTab = { isPrivate ->
                        viewModel.createNewTab(isPrivate = isPrivate)
                        showTabsOverview = false
                    },
                    onCloseAll = { viewModel.closeAllTabs() },
                    onDismiss = { showTabsOverview = false }
                )
            }

            // Settings Sheet
            if (showSettings) {
                SettingsSheet(
                    isDarkMode = isDarkMode,
                    onToggleDarkMode = onToggleDarkMode,
                    searchEngine = searchEngine,
                    onSelectSearchEngine = { searchEngine = it },
                    trackingProtection = trackingProtection,
                    onToggleTrackingProtection = { trackingProtection = it },
                    onDismiss = { showSettings = false }
                )
            }
        }
    }
}
