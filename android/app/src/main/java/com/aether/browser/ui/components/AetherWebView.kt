package com.aether.browser.ui.components

import android.view.ViewGroup
import android.webkit.WebView
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Warning
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.ui.viewinterop.AndroidView
import com.aether.browser.ui.theme.Charcoal950

/**
 * Embeds an active Chromium WebView instance inside Jetpack Compose using AndroidView.
 * If a TLS error occurs, renders an explicit TLS security warning screen without bypassing certificates.
 */
@Composable
fun AetherWebView(
    webView: WebView,
    sslError: String?,
    onDismissSslError: () -> Unit,
    modifier: Modifier = Modifier
) {
    Box(
        modifier = modifier
            .fillMaxSize()
            .background(Charcoal950)
    ) {
        if (sslError != null) {
            // Strict TLS Security Blocker UI
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(24.dp),
                contentAlignment = Alignment.Center
            ) {
                LiquidGlassCard(modifier = Modifier.fillMaxWidth()) {
                    Column(
                        modifier = Modifier.padding(24.dp),
                        horizontalAlignment = Alignment.CenterHorizontally,
                        verticalArrangement = Arrangement.spacedBy(16.dp)
                    ) {
                        Icon(
                            imageVector = Icons.Default.Warning,
                            contentDescription = "SSL Warning",
                            tint = Color(0xFFEF4444),
                            modifier = Modifier.size(48.dp)
                        )
                        Text(
                            text = "Connection Is Not Secure",
                            style = MaterialTheme.typography.titleLarge,
                            color = Color.White
                        )
                        Text(
                            text = "Aether Browser blocked this page to protect your passwords, cookies, and personal data. Under strict security invariants, TLS certificate errors are never bypassed.",
                            style = MaterialTheme.typography.bodySmall,
                            color = Color.White.copy(alpha = 0.75f)
                        )
                        Text(
                            text = sslError,
                            style = MaterialTheme.typography.labelSmall,
                            color = Color(0xFFFCA5A5)
                        )
                        Button(
                            onClick = onDismissSslError,
                            colors = ButtonDefaults.buttonColors(containerColor = Color(0xFFEF4444))
                        ) {
                            Text("Go Back to Safety")
                        }
                    }
                }
            }
        } else {
            AndroidView(
                factory = {
                    (webView.parent as? ViewGroup)?.removeView(webView)
                    webView
                },
                update = { view ->
                    if (view.parent == null) {
                        // Re-attached if detached during recomposition
                    }
                },
                modifier = Modifier.fillMaxSize()
            )
        }
    }
}
