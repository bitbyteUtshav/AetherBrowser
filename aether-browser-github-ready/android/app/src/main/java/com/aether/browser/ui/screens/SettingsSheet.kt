package com.aether.browser.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.aether.browser.ui.components.LiquidGlassCard
import com.aether.browser.ui.theme.*

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SettingsSheet(
    isDarkMode: Boolean,
    onToggleDarkMode: (Boolean) -> Unit,
    searchEngine: String,
    onSelectSearchEngine: (String) -> Unit,
    trackingProtection: Boolean,
    onToggleTrackingProtection: (Boolean) -> Unit,
    onDismiss: () -> Unit
) {
    ModalBottomSheet(
        onDismissRequest = onDismiss,
        containerColor = Charcoal900,
        dragHandle = {
            BottomSheetDefaults.DragHandle(color = Color.White.copy(alpha = 0.3f))
        }
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 20.dp, vertical = 12.dp)
                .navigationBarsPadding(),
            verticalArrangement = Arrangement.spacedBy(20.dp)
        ) {
            Text(
                text = "Aether Settings",
                style = MaterialTheme.typography.titleLarge,
                color = Color.White,
                fontWeight = FontWeight.Bold
            )

            // Appearance Section
            SettingsSectionHeader(title = "Appearance & Glass Shaders")
            LiquidGlassCard(modifier = Modifier.fillMaxWidth()) {
                Column(modifier = Modifier.padding(14.dp), verticalArrangement = Arrangement.spacedBy(14.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column {
                            Text("Dark Charcoal Theme", color = Color.White, fontWeight = FontWeight.Medium)
                            Text("Safari Liquid Glass dark mode", style = MaterialTheme.typography.labelSmall, color = Color.White.copy(alpha = 0.6f))
                        }
                        Switch(
                            checked = isDarkMode,
                            onCheckedChange = onToggleDarkMode,
                            colors = SwitchDefaults.colors(
                                checkedThumbColor = Color.White,
                                checkedTrackColor = AetherVioletPrimary
                            )
                        )
                    }
                }
            }

            // Search Provider Section
            SettingsSectionHeader(title = "Search Provider")
            LiquidGlassCard(modifier = Modifier.fillMaxWidth()) {
                Column(modifier = Modifier.padding(14.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
                    listOf("Google", "DuckDuckGo", "Ecosia", "Kagi").forEach { engine ->
                        Row(
                            modifier = Modifier
                                .fillMaxWidth()
                                .clickable { onSelectSearchEngine(engine) }
                                .padding(vertical = 4.dp),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text(engine, color = Color.White)
                            RadioButton(
                                selected = (searchEngine == engine),
                                onClick = { onSelectSearchEngine(engine) },
                                colors = RadioButtonDefaults.colors(selectedColor = AetherSapphireGaze)
                            )
                        }
                    }
                }
            }

            // Privacy & Shield Section
            SettingsSectionHeader(title = "Privacy & Shield")
            LiquidGlassCard(modifier = Modifier.fillMaxWidth()) {
                Row(
                    modifier = Modifier.fillMaxWidth().padding(14.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column {
                        Text("Aether Shield Protection", color = Color.White, fontWeight = FontWeight.Medium)
                        Text("Blocks trackers & fingerprinting", style = MaterialTheme.typography.labelSmall, color = Color.White.copy(alpha = 0.6f))
                    }
                    Switch(
                        checked = trackingProtection,
                        onCheckedChange = onToggleTrackingProtection,
                        colors = SwitchDefaults.colors(
                            checkedThumbColor = Color.White,
                            checkedTrackColor = ShieldActiveGreen
                        )
                    )
                }
            }

            // About section
            Column(
                modifier = Modifier.fillMaxWidth().padding(vertical = 8.dp),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                Text(
                    text = "Aether Browser v1.0.0 (Phase 1 UI Architecture)",
                    style = MaterialTheme.typography.labelSmall,
                    color = Color.White.copy(alpha = 0.5f)
                )
                Text(
                    text = "Jetpack Compose • Material 3 • Liquid Glass",
                    style = MaterialTheme.typography.labelSmall,
                    color = AetherSapphireGaze.copy(alpha = 0.8f)
                )
            }
        }
    }
}

@Composable
fun SettingsSectionHeader(title: String) {
    Text(
        text = title.uppercase(),
        style = MaterialTheme.typography.labelSmall,
        color = AetherSapphireGaze,
        letterSpacing = 1.2.sp,
        fontWeight = FontWeight.SemiBold
    )
}
