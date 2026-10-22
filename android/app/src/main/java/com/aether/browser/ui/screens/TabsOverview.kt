package com.aether.browser.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.Shield
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.aether.browser.ui.components.LiquidGlassCard
import com.aether.browser.ui.theme.*

data class TabModel(
    val id: String,
    val title: String,
    val url: String,
    val isPrivate: Boolean = false
)

@Composable
fun TabsOverview(
    tabs: List<TabModel>,
    activeTabId: String,
    onSelectTab: (String) -> Unit,
    onCloseTab: (String) -> Unit,
    onNewTab: (Boolean) -> Unit,
    onCloseAll: () -> Unit,
    onDismiss: () -> Unit,
    modifier: Modifier = Modifier
) {
    var isPrivateMode by remember { mutableStateOf(false) }

    Box(
        modifier = modifier
            .fillMaxSize()
            .background(Charcoal950)
            .padding(16.dp)
    ) {
        Column(modifier = Modifier.fillMaxSize()) {
            // Header with Tab Mode Toggle and Close
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 12.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = if (isPrivateMode) "Private Tabs" else "Open Tabs (${tabs.size})",
                    style = MaterialTheme.typography.titleLarge,
                    color = if (isPrivateMode) PrivateAmethyst else Color.White,
                    fontWeight = FontWeight.Bold
                )

                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    TextButton(onClick = onCloseAll) {
                        Text("Close All", color = Color.White.copy(alpha = 0.5f))
                    }
                    TextButton(onClick = onDismiss) {
                        Text("Done", color = AetherSapphireGaze, fontWeight = FontWeight.Bold)
                    }
                }
            }

            // Tabs Grid
            LazyVerticalGrid(
                columns = GridCells.Fixed(2),
                horizontalArrangement = Arrangement.spacedBy(12.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp),
                modifier = Modifier.weight(1f)
            ) {
                items(tabs.filter { it.isPrivate == isPrivateMode }) { tab ->
                    val isActive = tab.id == activeTabId
                    LiquidGlassCard(
                        onClick = { onSelectTab(tab.id) },
                        modifier = Modifier
                            .height(200.dp)
                            .then(
                                if (isActive) {
                                    Modifier.border(
                                        2.dp,
                                        if (isPrivateMode) PrivateAmethyst else AetherVioletPrimary,
                                        RoundedCornerShape(20.dp)
                                    )
                                } else Modifier
                            ),
                        shape = RoundedCornerShape(20.dp)
                    ) {
                        Column(modifier = Modifier.fillMaxSize().padding(12.dp)) {
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Text(
                                    text = tab.title,
                                    style = MaterialTheme.typography.labelSmall,
                                    color = Color.White,
                                    maxLines = 1,
                                    overflow = TextOverflow.Ellipsis,
                                    modifier = Modifier.weight(1f)
                                )
                                IconButton(
                                    onClick = { onCloseTab(tab.id) },
                                    modifier = Modifier.size(24.dp)
                                ) {
                                    Icon(
                                        imageVector = Icons.Default.Close,
                                        contentDescription = "Close Tab",
                                        tint = Color.White.copy(alpha = 0.6f),
                                        modifier = Modifier.size(16.dp)
                                    )
                                }
                            }

                            Spacer(modifier = Modifier.height(8.dp))

                            // Tab Preview Placeholder Surface
                            Box(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .weight(1f)
                                    .clip(RoundedCornerShape(12.dp))
                                    .background(Color.White.copy(alpha = 0.04f)),
                                contentAlignment = Alignment.Center
                            ) {
                                Text(
                                    text = tab.url.removePrefix("https://").take(18),
                                    style = MaterialTheme.typography.labelSmall,
                                    color = Color.White.copy(alpha = 0.4f)
                                )
                            }
                        }
                    }
                }
            }

            // Bottom Bar: New Tab & Private Mode
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 12.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Button(
                    onClick = { isPrivateMode = !isPrivateMode },
                    colors = ButtonDefaults.buttonColors(
                        containerColor = if (isPrivateMode) PrivateAmethyst.copy(alpha = 0.2f) else Color.White.copy(alpha = 0.08f)
                    ),
                    shape = CircleShape
                ) {
                    Icon(
                        imageVector = Icons.Default.Shield,
                        contentDescription = "Private Mode",
                        tint = if (isPrivateMode) PrivateAmethyst else Color.White.copy(alpha = 0.7f),
                        modifier = Modifier.size(16.dp)
                    )
                    Spacer(modifier = Modifier.width(6.dp))
                    Text(
                        text = if (isPrivateMode) "Private Active" else "Private",
                        color = if (isPrivateMode) PrivateAmethyst else Color.White
                    )
                }

                FloatingActionButton(
                    onClick = { onNewTab(isPrivateMode) },
                    containerColor = AetherVioletPrimary,
                    contentColor = Color.White,
                    shape = CircleShape
                ) {
                    Icon(Icons.Default.Add, contentDescription = "New Tab")
                }
            }
        }
    }
}
