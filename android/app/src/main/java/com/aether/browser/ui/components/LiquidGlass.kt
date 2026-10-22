package com.aether.browser.ui.components

import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.interaction.collectIsPressedAsState
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.BoxScope
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.scale
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Shape
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import com.aether.browser.ui.theme.*

/**
 * Custom Modifier extension that applies the Safari-inspired Liquid Glass effect:
 * - Layered semi-translucent backdrop
 * - Specular gradient highlight borders (refractive top-left rim)
 * - Soft diffuse shadow
 */
fun Modifier.liquidGlass(
    shape: Shape = RoundedCornerShape(24.dp),
    isDark: Boolean = true,
    borderWidth: Dp = 1.dp,
    elevation: Dp = 12.dp
): Modifier = this
    .shadow(
        elevation = elevation,
        shape = shape,
        spotColor = if (isDark) Color(0x66000000) else Color(0x1F0F172A),
        ambientColor = if (isDark) AetherIndigoAccent.copy(alpha = 0.12f) else Color(0x0F000000)
    )
    .clip(shape)
    .background(
        brush = Brush.verticalGradient(
            colors = if (isDark) {
                listOf(
                    Color.White.copy(alpha = 0.10f),
                    Color.White.copy(alpha = 0.04f),
                    Charcoal800.copy(alpha = 0.65f)
                )
            } else {
                listOf(
                    Color.White.copy(alpha = 0.90f),
                    Color.White.copy(alpha = 0.75f),
                    Pearl100.copy(alpha = 0.85f)
                )
            }
        )
    )
    .border(
        width = borderWidth,
        brush = Brush.linearGradient(
            colors = if (isDark) {
                listOf(
                    Color.White.copy(alpha = 0.35f),
                    Color.White.copy(alpha = 0.10f),
                    AetherVioletPrimary.copy(alpha = 0.25f),
                    Color.White.copy(alpha = 0.05f)
                )
            } else {
                listOf(
                    Color.White.copy(alpha = 0.80f),
                    Color(0x3364748B),
                    Color(0x1A64748B)
                )
            }
        ),
        shape = shape
    )

/**
 * Interactive Liquid Glass Surface Card with scale spring animation
 */
@Composable
fun LiquidGlassCard(
    modifier: Modifier = Modifier,
    onClick: (() -> Unit)? = null,
    shape: Shape = RoundedCornerShape(20.dp),
    elevation: Dp = 8.dp,
    content: @Composable BoxScope.() -> Unit
) {
    val isDark = isSystemInDarkTheme()
    val interactionSource = remember { MutableInteractionSource() }
    val isPressed by interactionSource.collectIsPressedAsState()
    
    val animatedScale by animateFloatAsState(
        targetValue = if (isPressed) 0.97f else 1.0f,
        animationSpec = tween(durationMillis = 150),
        label = "glassCardScale"
    )

    Box(
        modifier = modifier
            .scale(animatedScale)
            .liquidGlass(shape = shape, isDark = isDark, elevation = elevation)
            .then(
                if (onClick != null) {
                    Modifier.clickable(
                        interactionSource = interactionSource,
                        indication = null,
                        onClick = onClick
                    )
                } else Modifier
            ),
        content = content
    )
}

/**
 * Liquid Glass Pill (ideal for floating omnibar, badges, and status chips)
 */
@Composable
fun LiquidGlassPill(
    modifier: Modifier = Modifier,
    onClick: (() -> Unit)? = null,
    content: @Composable BoxScope.() -> Unit
) {
    LiquidGlassCard(
        modifier = modifier,
        onClick = onClick,
        shape = CircleShape,
        elevation = 14.dp,
        content = content
    )
}
