package com.aether.browser.ui.screens

import androidx.compose.animation.*
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material.icons.outlined.*
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
import com.aether.browser.ui.components.LiquidGlassPill
import com.aether.browser.ui.theme.*

data class QuickAccessTile(
    val id: String,
    val title: String,
    val domain: String,
    val category: String,
    val iconColor: Color
)

data class RecentSiteItem(
    val id: String,
    val title: String,
    val url: String,
    val timeAgo: String,
    val readingTime: String,
    val snippet: String
)

@Composable
fun HomeScreen(
    onNavigateToUrl: (String) -> Unit,
    onOpenTabs: () -> Unit,
    onOpenSettings: () -> Unit,
    tabCount: Int = 3,
    modifier: Modifier = Modifier
) {
    var searchQuery by remember { mutableStateOf("") }

    val quickTiles = remember {
        listOf(
            QuickAccessTile("1", "GitHub", "github.com", "Dev", AetherVioletPrimary),
            QuickAccessTile("2", "Wikipedia", "wikipedia.org", "Knowledge", AetherCyanHighlight),
            QuickAccessTile("3", "Figma", "figma.com", "Design", AetherIndigoAccent),
            QuickAccessTile("4", "Hacker News", "news.ycombinator.com", "Tech", Color(0xFFFF6600)),
            QuickAccessTile("5", "Reddit", "reddit.com", "Community", Color(0xFFFF4500)),
            QuickAccessTile("6", "ArXiv", "arxiv.org", "Science", Color(0xFF10B981)),
            QuickAccessTile("7", "Dribbble", "dribbble.com", "Inspiration", Color(0xFFEA4C89)),
            QuickAccessTile("8", "Add Site", "", "Custom", Color.White.copy(alpha = 0.5f))
        )
    }

    val recentSites = remember {
        listOf(
            RecentSiteItem(
                id = "r1",
                title = "Reflections on Liquid Glass Interfaces",
                url = "design.aether.io/liquid-glass",
                timeAgo = "12m ago",
                readingTime = "4 min read",
                snippet = "Deep dive into real-time refractive shaders and subtle specular highlights in modern mobile UX."
            ),
            RecentSiteItem(
                id = "r2",
                title = "Jetpack Compose 1.7 Architecture Insights",
                url = "developer.android.com/jetpack/compose",
                timeAgo = "1h ago",
                readingTime = "6 min read",
                snippet = "Optimizing composition passes and memory footprints in high-performance browser frames."
            ),
            RecentSiteItem(
                id = "r3",
                title = "Ethereal Computing: The Post-Flat Era",
                url = "chronicles.ethereal.tech",
                timeAgo = "Yesterday",
                readingTime = "3 min read",
                snippet = "Why translucent spatial layers are returning with mathematical restraint and high-DPI displays."
            )
        )
    }

    Box(
        modifier = modifier
            .fillMaxSize()
            .background(
                brush = Brush.radialGradient(
                    colors = listOf(
                        Charcoal800,
                        Charcoal900,
                        Charcoal950
                    ),
                    radius = 1200f
                )
            )
    ) {
        LazyColumn(
            modifier = Modifier.fillMaxSize(),
            contentPadding = PaddingValues(start = 20.dp, end = 20.dp, top = 48.dp, bottom = 120.dp),
            verticalArrangement = Arrangement.spacedBy(24.dp)
        ) {
            // Header: Aether Glowing Emblem & Greeting
            item {
                Column(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    // Ethereal Emblem
                    Box(
                        modifier = Modifier
                            .size(72.dp)
                            .clip(CircleShape)
                            .background(
                                Brush.linearGradient(
                                    colors = listOf(
                                        AetherVioletPrimary.copy(alpha = 0.8f),
                                        AetherIndigoAccent.copy(alpha = 0.6f),
                                        AetherCyanHighlight.copy(alpha = 0.7f)
                                    )
                                )
                            ),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(
                            imageVector = Icons.Default.AllInclusive,
                            contentDescription = "Aether Logo",
                            tint = Color.White,
                            modifier = Modifier.size(38.dp)
                        )
                    }

                    Spacer(modifier = Modifier.height(16.dp))

                    Text(
                        text = "AETHER",
                        style = MaterialTheme.typography.labelSmall,
                        color = AetherSapphireGaze,
                        letterSpacing = 4.sp,
                        fontWeight = FontWeight.Bold
                    )

                    Spacer(modifier = Modifier.height(6.dp))

                    Text(
                        text = "Good morning",
                        style = MaterialTheme.typography.displayLarge,
                        color = Color.White
                    )

                    Text(
                        text = "The boundless web, refined.",
                        style = MaterialTheme.typography.bodyMedium,
                        color = Color.White.copy(alpha = 0.6f)
                    )

                    Spacer(modifier = Modifier.height(12.dp))

                    // Privacy Shield Indicator Chip
                    LiquidGlassPill(
                        onClick = { /* Privacy details */ }
                    ) {
                        Row(
                            modifier = Modifier.padding(horizontal = 14.dp, vertical = 6.dp),
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.spacedBy(6.dp)
                        ) {
                            Icon(
                                imageVector = Icons.Default.Shield,
                                contentDescription = "Shield",
                                tint = ShieldActiveGreen,
                                modifier = Modifier.size(14.dp)
                            )
                            Text(
                                text = "Aether Shield Active • 14 Trackers Blocked",
                                style = MaterialTheme.typography.labelSmall,
                                color = Color.White.copy(alpha = 0.85f)
                            )
                        }
                    }
                }
            }

            // Quick Access Section
            item {
                Column(verticalArrangement = Arrangement.spacedBy(14.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(
                            text = "Quick Access",
                            style = MaterialTheme.typography.titleMedium,
                            color = Color.White.copy(alpha = 0.9f),
                            fontWeight = FontWeight.SemiBold
                        )
                        Text(
                            text = "Edit",
                            style = MaterialTheme.typography.labelSmall,
                            color = AetherSapphireGaze
                        )
                    }

                    // 4x2 Grid of Quick Access Tiles
                    Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                        quickTiles.chunked(4).forEach { rowTiles ->
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween
                            ) {
                                rowTiles.forEach { tile ->
                                    Column(
                                        horizontalAlignment = Alignment.CenterHorizontally,
                                        modifier = Modifier.width(72.dp)
                                    ) {
                                        LiquidGlassCard(
                                            onClick = {
                                                if (tile.domain.isNotEmpty()) {
                                                    onNavigateToUrl("https://${tile.domain}")
                                                }
                                            },
                                            shape = RoundedCornerShape(18.dp),
                                            modifier = Modifier.size(62.dp)
                                        ) {
                                            Box(
                                                modifier = Modifier.fillMaxSize(),
                                                contentAlignment = Alignment.Center
                                            ) {
                                                if (tile.id == "8") {
                                                    Icon(
                                                        imageVector = Icons.Default.Add,
                                                        contentDescription = "Add",
                                                        tint = Color.White.copy(alpha = 0.7f),
                                                        modifier = Modifier.size(24.dp)
                                                    )
                                                } else {
                                                    Text(
                                                        text = tile.title.take(2).uppercase(),
                                                        fontWeight = FontWeight.Bold,
                                                        fontSize = 17.sp,
                                                        color = tile.iconColor
                                                    )
                                                }
                                            }
                                        }
                                        Spacer(modifier = Modifier.height(6.dp))
                                        Text(
                                            text = tile.title,
                                            style = MaterialTheme.typography.labelSmall,
                                            color = Color.White.copy(alpha = 0.8f),
                                            maxLines = 1,
                                            overflow = TextOverflow.Ellipsis
                                        )
                                    }
                                }
                            }
                        }
                    }
                }
            }

            // Recent Sites Section (Placeholder Data simulation)
            item {
                Column(verticalArrangement = Arrangement.spacedBy(14.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(
                            text = "Recent Sites",
                            style = MaterialTheme.typography.titleMedium,
                            color = Color.White.copy(alpha = 0.9f),
                            fontWeight = FontWeight.SemiBold
                        )
                        Text(
                            text = "Clear",
                            style = MaterialTheme.typography.labelSmall,
                            color = Color.White.copy(alpha = 0.4f)
                        )
                    }

                    // Notice Badge clearly treating as placeholder
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .clip(RoundedCornerShape(12.dp))
                            .background(AetherIndigoAccent.copy(alpha = 0.12f))
                            .padding(horizontal = 12.dp, vertical = 8.dp)
                    ) {
                        Text(
                            text = "✦ Simulated reading history (Placeholder data ready for Phase 2 WebView)",
                            style = MaterialTheme.typography.labelSmall,
                            color = AetherSapphireGaze
                        )
                    }

                    // Recent Cards
                    Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                        recentSites.forEach { site ->
                            LiquidGlassCard(
                                onClick = { onNavigateToUrl("https://${site.url}") },
                                modifier = Modifier.fillMaxWidth(),
                                shape = RoundedCornerShape(16.dp)
                            ) {
                                Column(
                                    modifier = Modifier
                                        .fillMaxWidth()
                                        .padding(16.dp)
                                ) {
                                    Row(
                                        modifier = Modifier.fillMaxWidth(),
                                        horizontalArrangement = Arrangement.SpaceBetween,
                                        verticalAlignment = Alignment.CenterVertically
                                    ) {
                                        Row(
                                            verticalAlignment = Alignment.CenterVertically,
                                            horizontalArrangement = Arrangement.spacedBy(8.dp)
                                        ) {
                                            Box(
                                                modifier = Modifier
                                                    .size(8.dp)
                                                    .clip(CircleShape)
                                                    .background(AetherVioletPrimary)
                                            )
                                            Text(
                                                text = site.url,
                                                style = MaterialTheme.typography.labelSmall,
                                                color = Color.White.copy(alpha = 0.5f)
                                            )
                                        }
                                        Text(
                                            text = site.timeAgo,
                                            style = MaterialTheme.typography.labelSmall,
                                            color = Color.White.copy(alpha = 0.4f)
                                        )
                                    }

                                    Spacer(modifier = Modifier.height(8.dp))

                                    Text(
                                        text = site.title,
                                        style = MaterialTheme.typography.titleMedium,
                                        color = Color.White,
                                        fontWeight = FontWeight.SemiBold
                                    )

                                    Spacer(modifier = Modifier.height(4.dp))

                                    Text(
                                        text = site.snippet,
                                        style = MaterialTheme.typography.bodyMedium,
                                        color = Color.White.copy(alpha = 0.65f),
                                        maxLines = 2,
                                        overflow = TextOverflow.Ellipsis
                                    )
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
