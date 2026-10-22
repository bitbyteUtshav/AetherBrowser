package com.aether.browser.data.model

import androidx.room.Entity
import androidx.room.PrimaryKey

/**
 * State representing an active browser tab.
 */
data class TabState(
    val id: String,
    val title: String = "New Tab",
    val url: String = "",
    val isPrivate: Boolean = false,
    val progress: Int = 0,
    val canGoBack: Boolean = false,
    val canGoForward: Boolean = false,
    val sslError: String? = null
)

/**
 * Persisted user bookmark.
 */
@Entity(tableName = "bookmarks")
data class Bookmark(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val title: String,
    val url: String,
    val createdAt: Long = System.currentTimeMillis()
)

/**
 * Persisted browsing history item.
 */
@Entity(tableName = "history")
data class HistoryItem(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val title: String,
    val url: String,
    val visitedAt: Long = System.currentTimeMillis()
)
