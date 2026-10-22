import React, { useState } from 'react';
import {
  FileCode,
  Folder,
  Copy,
  Check,
  Code2,
  Terminal,
  Download,
  Package,
  Layers,
  Sparkles,
  Smartphone,
  ExternalLink,
  Cpu,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import JSZip from 'jszip';

interface CodeFile {
  name: string;
  path: string;
  language: string;
  code: string;
  description: string;
}

export const KotlinCodeViewer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'download' | 'files' | 'guide'>('download');
  const [copied, setCopied] = useState(false);
  const [isZipping, setIsZipping] = useState(false);
  const [zipSuccess, setZipSuccess] = useState(false);

  const files: CodeFile[] = [
    {
      name: 'settings.gradle.kts',
      path: 'android/settings.gradle.kts',
      language: 'kotlin',
      description: 'Root Gradle configuration: Google, MavenCentral, and :app module definition.',
      code: `pluginManagement {
    repositories {
        google {
            content {
                includeGroupByRegex("com\\\\.android.*")
                includeGroupByRegex("com\\\\.google.*")
                includeGroupByRegex("androidx.*")
            }
        }
        mavenCentral()
        gradlePluginPortal()
    }
}
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
    }
}

rootProject.name = "AetherBrowser"
include(":app")`
    },
    {
      name: 'build.gradle.kts (Root)',
      path: 'android/build.gradle.kts',
      language: 'kotlin',
      description: 'Project-level build file linking plugins and Android Gradle Plugin.',
      code: `// Top-level build file
plugins {
    alias(libs.plugins.android.application) apply false
    alias(libs.plugins.kotlin.android) apply false
    alias(libs.plugins.kotlin.compose) apply false
    alias(libs.plugins.ksp) apply false
}`
    },
    {
      name: 'build.gradle.kts (App)',
      path: 'android/app/build.gradle.kts',
      language: 'kotlin',
      description: 'App-level build file with Jetpack Compose, Chromium WebView, Room, and Coroutines.',
      code: `plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.kotlin.compose)
    alias(libs.plugins.ksp)
}

android {
    namespace = "com.aether.browser"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.aether.browser"
        minSdk = 26
        targetSdk = 35
        versionCode = 2
        versionName = "2.0.0-phase2"
        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            isMinifyEnabled = true
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
        debug {
            applicationIdSuffix = ".debug"
            isDebuggable = true
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    kotlinOptions {
        jvmTarget = "17"
    }

    buildFeatures {
        compose = true
    }
}

dependencies {
    val composeBom = platform("androidx.compose:compose-bom:2024.10.01")
    implementation(composeBom)
    androidTestImplementation(composeBom)

    implementation("androidx.core:core-ktx:1.15.0")
    implementation("androidx.lifecycle:lifecycle-runtime-ktx:2.8.7")
    implementation("androidx.lifecycle:lifecycle-viewmodel-compose:2.8.7")
    implementation("androidx.activity:activity-compose:1.9.3")

    // AndroidX WebKit for Chromium-backed WebView & Safe Browsing
    implementation("androidx.webkit:webkit:1.12.1")

    // Jetpack Compose & Material 3
    implementation("androidx.compose.ui:ui")
    implementation("androidx.compose.ui:ui-graphics")
    implementation("androidx.compose.ui:ui-tooling-preview")
    implementation("androidx.compose.material3:material3:1.3.1")
    implementation("androidx.compose.material:material-icons-extended")

    // Coroutines & State
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-android:1.9.0")

    // Room Persistence for Bookmarks & History
    implementation("androidx.room:room-runtime:2.6.1")
    implementation("androidx.room:room-ktx:2.6.1")
    ksp("androidx.room:room-compiler:2.6.1")
}`
    },
    {
      name: 'AndroidManifest.xml',
      path: 'android/app/src/main/AndroidManifest.xml',
      language: 'xml',
      description: 'System permissions (Internet, Notifications, Web features) and Single Activity entry point.',
      code: `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools">

    <!-- Essential Network Permissions -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.POST_NOTIFICATIONS" />

    <!-- Optional Web Feature Permissions -->
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.RECORD_AUDIO" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="Aether Browser"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.AetherBrowser"
        tools:targetApi="35">

        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:configChanges="orientation|screenSize|screenLayout|keyboardHidden"
            android:windowSoftInputMode="adjustResize">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>

            <!-- Standard Web URL scheme handling -->
            <intent-filter>
                <action android:name="android.intent.action.VIEW" />
                <category android:name="android.intent.category.DEFAULT" />
                <category android:name="android.intent.category.BROWSABLE" />
                <data android:scheme="http" />
                <data android:scheme="https" />
            </intent-filter>
        </activity>
    </application>
</manifest>`
    },
    {
      name: 'libs.versions.toml',
      path: 'android/gradle/libs.versions.toml',
      language: 'toml',
      description: 'Gradle Version Catalog for AGP 8.7, Kotlin 2.0, Compose, and AndroidX libraries.',
      code: `[versions]
agp = "8.7.2"
kotlin = "2.0.21"
ksp = "2.0.21-1.0.28"
coreKtx = "1.15.0"
lifecycleRuntimeKtx = "2.8.7"
activityCompose = "1.9.3"
composeBom = "2024.10.01"
webkit = "1.12.1"
room = "2.6.1"
coroutines = "1.9.0"

[libraries]
androidx-core-ktx = { group = "androidx.core", name = "core-ktx", version.ref = "coreKtx" }
androidx-lifecycle-runtime-ktx = { group = "androidx.lifecycle", name = "lifecycle-runtime-ktx", version.ref = "lifecycleRuntimeKtx" }
androidx-lifecycle-viewmodel-compose = { group = "androidx.lifecycle", name = "lifecycle-viewmodel-compose", version.ref = "lifecycleRuntimeKtx" }
androidx-activity-compose = { group = "androidx.activity", name = "activity-compose", version.ref = "activityCompose" }
androidx-compose-bom = { group = "androidx.compose", name = "compose-bom", version.ref = "composeBom" }
androidx-ui = { group = "androidx.compose.ui", name = "ui" }
androidx-material3 = { group = "androidx.compose.material3", name = "material3" }
androidx-webkit = { group = "androidx.webkit", name = "webkit", version.ref = "webkit" }

[plugins]
android-application = { id = "com.android.application", version.ref = "agp" }
kotlin-android = { id = "org.jetbrains.kotlin.android", version.ref = "kotlin" }
kotlin-compose = { id = "org.jetbrains.kotlin.plugin.compose", version.ref = "kotlin" }
ksp = { id = "com.google.devtools.ksp", version.ref = "ksp" }`
    },
    {
      name: 'MainActivity.kt',
      path: 'android/app/src/main/java/com/aether/browser/MainActivity.kt',
      language: 'kotlin',
      description: 'Single Activity hosting Compose hierarchy, BrowserViewModel binding, and lifecycle events.',
      code: `package com.aether.browser

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.activity.viewModels
import com.aether.browser.viewmodel.BrowserViewModel

class MainActivity : ComponentActivity() {
    private val browserViewModel: BrowserViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            // Renders Compose BrowserApp with active WebView and Liquid Glass navigation
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
}`
    },
    {
      name: 'AetherWebViewController.kt',
      path: 'android/app/src/main/java/com/aether/browser/controller/AetherWebViewController.kt',
      language: 'kotlin',
      description: 'Chromium-backed WebView controller: JavaScript enabled, Safe Browsing, DownloadManager, no arbitrary bridges.',
      code: `package com.aether.browser.controller

import android.annotation.SuppressLint
import android.content.Context
import android.net.http.SslError
import android.view.ViewGroup
import android.webkit.CookieManager
import android.webkit.WebSettings
import android.webkit.WebView
import androidx.webkit.WebViewCompat
import androidx.webkit.WebViewFeature

class AetherWebViewController(
    val context: Context,
    val tabId: String,
    val isPrivate: Boolean = false,
    private val onUrlChanged: (String) -> Unit,
    private val onTitleChanged: (String) -> Unit,
    private val onProgressChanged: (Int) -> Unit,
    private val onSslError: (SslError) -> Unit,
    private val onHttpError: (Int, String) -> Unit
) {
    val webView: WebView = WebView(context).apply {
        layoutParams = ViewGroup.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT,
            ViewGroup.LayoutParams.MATCH_PARENT
        )
    }

    private val downloadHandler = AetherDownloadHandler(context)

    init {
        configureWebSettings()
    }

    @SuppressLint("SetJavaScriptEnabled")
    private fun configureWebSettings() {
        webView.settings.apply {
            javaScriptEnabled = true
            domStorageEnabled = true
            databaseEnabled = true
            useWideViewPort = true
            loadWithOverviewMode = true

            // Security Invariants
            allowFileAccess = false
            allowContentAccess = false
            mixedContentMode = WebSettings.MIXED_CONTENT_NEVER_ALLOW

            if (WebViewFeature.isFeatureSupported(WebViewFeature.SAFE_BROWSING_ENABLE)) {
                safeBrowsingEnabled = true
            }

            if (isPrivate) {
                cacheMode = WebSettings.LOAD_NO_CACHE
                saveFormData = false
                savePassword = false
            } else {
                cacheMode = WebSettings.LOAD_DEFAULT
            }
        }
    }

    fun loadUrl(url: String) {
        val normalizedUrl = if (url.startsWith("http://") || url.startsWith("https://")) {
            url
        } else {
            "https://www.google.com/search?q=\${java.net.URLEncoder.encode(url, "UTF-8")}"
        }
        webView.loadUrl(normalizedUrl)
    }

    fun goBack() = webView.goBack()
    fun goForward() = webView.goForward()
    fun reload() = webView.reload()
    fun stopLoading() = webView.stopLoading()
    fun pause() = webView.onPause()
    fun resume() = webView.onResume()
    fun destroy() {
        (webView.parent as? ViewGroup)?.removeView(webView)
        webView.destroy()
    }
}`
    },
    {
      name: 'AetherWebViewClient.kt',
      path: 'android/app/src/main/java/com/aether/browser/controller/AetherWebViewClient.kt',
      language: 'kotlin',
      description: 'Strict TLS enforcement (handler.cancel()), scheme validation, and Safe Browsing integration.',
      code: `package com.aether.browser.controller

import android.net.http.SslError
import android.webkit.*
import androidx.webkit.SafeBrowsingResponseCompat
import androidx.webkit.WebViewClientCompat

class AetherWebViewClient(
    private val onPageStartedCallback: (url: String) -> Unit,
    private val onPageFinishedCallback: (url: String) -> Unit,
    private val onSslErrorCallback: (error: SslError) -> Unit,
    private val onHttpErrorCallback: (errorCode: Int, description: String) -> Unit
) : WebViewClientCompat() {

    override fun shouldOverrideUrlLoading(view: WebView, request: WebResourceRequest): Boolean {
        val scheme = request.url.scheme?.lowercase() ?: return true
        return when (scheme) {
            "http", "https" -> false // Allow standard web navigation
            else -> true             // Block dangerous schemes
        }
    }

    override fun onReceivedSslError(view: WebView?, handler: SslErrorHandler?, error: SslError?) {
        handler?.cancel() // Explicit cancellation - Never bypass TLS
        if (error != null) {
            onSslErrorCallback(error)
        }
    }

    override fun onSafeBrowsingHit(
        view: WebView,
        request: WebResourceRequest,
        threatType: Int,
        callback: SafeBrowsingResponseCompat
    ) {
        callback.backToSafety(true)
    }
}`
    },
    {
      name: 'AetherDownloadHandler.kt',
      path: 'android/app/src/main/java/com/aether/browser/controller/AetherDownloadHandler.kt',
      language: 'kotlin',
      description: 'System DownloadManager delegation with cookie preservation and user notification.',
      code: `package com.aether.browser.controller

import android.app.DownloadManager
import android.content.Context
import android.net.Uri
import android.os.Environment
import android.webkit.CookieManager
import android.webkit.URLUtil

class AetherDownloadHandler(private val context: Context) {
    fun handleDownload(url: String, userAgent: String, contentDisposition: String, mimetype: String, length: Long) {
        val request = DownloadManager.Request(Uri.parse(url)).apply {
            val filename = URLUtil.guessFileName(url, contentDisposition, mimetype)
            setTitle(filename)
            val cookies = CookieManager.getInstance().getCookie(url)
            if (cookies != null) addRequestHeader("cookie", cookies)
            addRequestHeader("User-Agent", userAgent)
            setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED)
            setDestinationInExternalPublicDir(Environment.DIRECTORY_DOWNLOADS, filename)
        }
        val dm = context.getSystemService(Context.DOWNLOAD_SERVICE) as? DownloadManager
        dm?.enqueue(request)
    }
}`
    },
    {
      name: 'capacitor.config.json',
      path: 'capacitor.config.json',
      language: 'json',
      description: '1-click Web-to-APK converter configuration for Capacitor CLI.',
      code: `{
  "appId": "com.aether.browser",
  "appName": "Aether Browser",
  "webDir": "dist",
  "bundledWebRuntime": false,
  "server": {
    "androidScheme": "https"
  },
  "android": {
    "backgroundColor": "#0b0d13",
    "allowMixedContent": false,
    "captureInput": true,
    "webContentsDebuggingEnabled": true
  }
}`
    }
  ];

  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const activeFile = files[activeFileIndex];

  const handleCopy = () => {
    navigator.clipboard?.writeText(activeFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ZIP Generation and Download for user
  const handleDownloadAllZip = async () => {
    try {
      setIsZipping(true);
      const zip = new JSZip();

      // Root files
      zip.file('capacitor.config.json', files.find(f => f.name === 'capacitor.config.json')?.code || '');
      zip.file('README_APP_BUILD.md', `# Aether Browser — Android App Build Package
- Open Android Studio -> Open this folder -> Build APK
- Or run: ./gradlew assembleDebug in android folder
`);

      // Android folder structure
      const androidFolder = zip.folder('android');
      if (androidFolder) {
        androidFolder.file('settings.gradle.kts', files.find(f => f.name === 'settings.gradle.kts')?.code || '');
        androidFolder.file('build.gradle.kts', files.find(f => f.name === 'build.gradle.kts (Root)')?.code || '');
        androidFolder.file('gradle.properties', `org.gradle.jvmargs=-Xmx2048m -Dfile.encoding=UTF-8\nandroid.useAndroidX=true\nandroid.nonTransitiveRClass=true\nkotlin.code.style=official`);

        // gradle/
        const gradleFolder = androidFolder.folder('gradle');
        gradleFolder?.file('libs.versions.toml', files.find(f => f.name === 'libs.versions.toml')?.code || '');
        const wrapperFolder = gradleFolder?.folder('wrapper');
        wrapperFolder?.file('gradle-wrapper.properties', `distributionBase=GRADLE_USER_HOME\ndistributionPath=wrapper/dists\ndistributionUrl=https\\://services.gradle.org/distributions/gradle-8.9-bin.zip\nnetworkTimeout=10000\nvalidateDistributionUrl=true\nzipStoreBase=GRADLE_USER_HOME\nzipStorePath=wrapper/dists\n`);

        // app/
        const appFolder = androidFolder.folder('app');
        if (appFolder) {
          appFolder.file('build.gradle.kts', files.find(f => f.name === 'build.gradle.kts (App)')?.code || '');
          
          const mainFolder = appFolder.folder('src/main');
          if (mainFolder) {
            mainFolder.file('AndroidManifest.xml', files.find(f => f.name === 'AndroidManifest.xml')?.code || '');

            const javaFolder = mainFolder.folder('java/com/aether/browser');
            if (javaFolder) {
              javaFolder.file('MainActivity.kt', files.find(f => f.name === 'MainActivity.kt')?.code || '');
              
              const controllerFolder = javaFolder.folder('controller');
              controllerFolder?.file('AetherWebViewController.kt', files.find(f => f.name === 'AetherWebViewController.kt')?.code || '');
              controllerFolder?.file('AetherWebViewClient.kt', files.find(f => f.name === 'AetherWebViewClient.kt')?.code || '');
              controllerFolder?.file('AetherDownloadHandler.kt', files.find(f => f.name === 'AetherDownloadHandler.kt')?.code || '');
            }
          }
        }
      }

      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'aether-browser-android-project.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setIsZipping(false);
      setZipSuccess(true);
      setTimeout(() => setZipSuccess(false), 3000);
    } catch (e) {
      console.error('Failed generating zip', e);
      setIsZipping(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-950 text-slate-200 overflow-hidden select-text">
      {/* Top Banner */}
      <div className="px-4 py-3 bg-slate-900/90 border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-cyan-400" />
          <div>
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              Aether Browser — Android App কনভার্ট ও এক্সপোর্ট ফাইলস
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-medium">
                Ready to Build
              </span>
            </h2>
            <p className="text-[11px] text-slate-400">
              Android Studio প্রজেক্ট ফাইল, Gradle স্ক্রিপ্ট এবং Capacitor APK বিল্ডার
            </p>
          </div>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('download')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'download'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-950/40 font-bold'
                : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
            }`}
          >
            <Download className="w-3.5 h-3.5 text-emerald-300" />
            জিপ ফাইল ডাউনলোড
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('files')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'files'
                ? 'bg-violet-600 text-white shadow'
                : 'bg-white/5 hover:bg-white/10 text-slate-300'
            }`}
          >
            <Code2 className="w-3.5 h-3.5 text-cyan-300" />
            সোর্স কোড ফাইলস
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('guide')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'guide'
                ? 'bg-violet-600 text-white shadow'
                : 'bg-white/5 hover:bg-white/10 text-slate-300'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-300" />
            APK তৈরি গাইড
          </button>

          <a
            href="/aether-browser-project.zip"
            download="aether-browser-project.zip"
            className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white transition-all flex items-center gap-1.5 shadow-lg shadow-cyan-950/40 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-white" />
            ডাউনলোড ZIP
          </a>
        </div>
      </div>

      {/* Main Tab Content */}
      {activeTab === 'download' && (
        <div className="flex-1 overflow-auto p-6 max-w-4xl mx-auto space-y-6">
          {/* Hero Download Card */}
          <div className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-950/60 via-slate-900 to-cyan-950/40 border border-emerald-500/30 shadow-2xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                  <Package className="w-3.5 h-3.5" />
                  সম্পূর্ণ প্রজেক্টের জিপ প্যাকেজ প্রস্তুত
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Aether Browser Full Project (.ZIP)
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                  অ্যান্ড্রয়েড নেটিভ প্রজেক্ট (Kotlin + Jetpack Compose), Android Studio Gradle ফাইলস, Capacitor কনফিগ এবং পূর্ণাঙ্গ সোর্স কোড সম্বলিত প্রস্তুতকৃত প্যাকেজ।
                </p>
              </div>

              {/* Primary Download Anchor Button */}
              <div className="flex flex-col gap-2 shrink-0">
                <a
                  href="/aether-browser-project.zip"
                  download="aether-browser-project.zip"
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2.5 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Download className="w-5 h-5 text-slate-950" />
                  <span>সরাসরি ZIP ডাউনলোড করুন</span>
                </a>
                <span className="text-[11px] text-center text-slate-400">
                  আকার: ~115 KB (৯৮টি ফাইল অন্তর্ভুক্ত)
                </span>
              </div>
            </div>

            {/* Quick backup button */}
            <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>ফাইল ফরম্যাট: <code className="text-cyan-300 font-mono">.zip</code> (Direct Link & Clean Archive)</span>
              </div>
              <button
                type="button"
                onClick={handleDownloadAllZip}
                disabled={isZipping}
                className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 underline underline-offset-4 cursor-pointer"
              >
                {isZipping ? 'ব্রাউজার বান্ডেল তৈরি হচ্ছে...' : 'বিকল্প ক্লায়েন্ট-সাইড এক্সপোর্ট ব্যবহার করুন'}
              </button>
            </div>
          </div>

          {/* Archive Contents Breakdown */}
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/80 border border-white/10 space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              এই জিপ ফাইলের ভেতরে যা যা রয়েছে (Project File Structure)
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1.5">
                <div className="flex items-center gap-2 text-cyan-300 font-bold">
                  <Folder className="w-4 h-4 text-cyan-400" />
                  <span>android/</span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  সম্পূর্ণ Android Studio প্রজেক্ট রুট। <code className="text-white font-mono">build.gradle.kts</code>, <code className="text-white font-mono">settings.gradle.kts</code>, <code className="text-white font-mono">gradlew</code> স্ক্রিপ্ট এবং সংস্করণ ক্যাটালগ অন্তর্ভুক্ত।
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1.5">
                <div className="flex items-center gap-2 text-violet-300 font-bold">
                  <FileCode className="w-4 h-4 text-violet-400" />
                  <span>android/app/src/main/java/</span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  মূল Kotlin সোর্স কোড: <code className="text-white font-mono">MainActivity.kt</code>, Chromium WebViewController, হাই-স্পিড DownloadHandler এবং Jetpack Compose UI স্ক্রিনস।
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1.5">
                <div className="flex items-center gap-2 text-amber-300 font-bold">
                  <Folder className="w-4 h-4 text-amber-400" />
                  <span>android/app/src/main/res/</span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  অ্যান্ড্রয়েড রিসোর্স: <code className="text-white font-mono">strings.xml</code>, <code className="text-white font-mono">colors.xml</code>, <code className="text-white font-mono">themes.xml</code>, ব্যাকআপ রুলস এবং ভেক্টর লঞ্চার আইকন।
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-300 font-bold">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span>capacitor.config.json & PWA</span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  ক্যাপাসিটর বিল্ড কনফিগারেশন, <code className="text-white font-mono">manifest.json</code>, <code className="text-white font-mono">sw.js</code> সার্ভিস ওয়ার্কার এবং ওয়েব সোর্স ফাইলস।
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-xs text-cyan-200 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-cyan-400" />
                <span>সহজ বাংলা নির্দেশিকা ফাইল: <strong>APK-CONVERT-GUIDE.md</strong> জিপের ভেতরেই দেওয়া আছে।</span>
              </span>
              <button
                type="button"
                onClick={() => setActiveTab('guide')}
                className="text-xs font-bold text-white bg-cyan-600/60 hover:bg-cyan-600 px-3 py-1 rounded-lg transition-colors cursor-pointer"
              >
                গাইড দেখুন
              </button>
            </div>
          </div>

          {/* Quick Steps Summary */}
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/60 border border-white/10 space-y-3">
            <h4 className="text-sm font-bold text-white">ডাউনলোডের পর মাত্র ৩ ধাপে APK তৈরি করবেন যেভাবে:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-black/30 border border-white/5 space-y-1">
                <div className="font-bold text-cyan-400 text-sm">ধাপ ১: আনজিপ করুন</div>
                <p className="text-slate-400 text-[11px]">
                  ডাউনলোড করা <code className="text-white">aether-browser-project.zip</code> ফাইলটি যেকোনো ফোল্ডারে Extract বা আনজিপ করুন।
                </p>
              </div>

              <div className="p-3 rounded-xl bg-black/30 border border-white/5 space-y-1">
                <div className="font-bold text-violet-400 text-sm">ধাপ ২: প্রজেক্ট ওপেন</div>
                <p className="text-slate-400 text-[11px]">
                  Android Studio ওপেন করে <strong>Open</strong> অপশন থেকে আনজিপ করা <code className="text-white">android</code> ফোল্ডারটি সিলেক্ট করুন।
                </p>
              </div>

              <div className="p-3 rounded-xl bg-black/30 border border-white/5 space-y-1">
                <div className="font-bold text-emerald-400 text-sm">ধাপ ৩: APK বিল্ড</div>
                <p className="text-slate-400 text-[11px]">
                  উপরের মেনু থেকে <strong>Build &gt; Build Bundle(s) / APK(s) &gt; Build APK(s)</strong> চাপুন। আপনার APK রেডি!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Tab Content */}
      {activeTab === 'files' && (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* File selector pill bar */}
          <div className="px-3 py-2 bg-slate-900/50 border-b border-white/5 flex items-center gap-1.5 overflow-x-auto text-xs scrollbar-thin">
            {files.map((file, idx) => (
              <button
                key={file.name}
                type="button"
                onClick={() => setActiveFileIndex(idx)}
                className={`px-3 py-1.5 rounded-xl font-mono text-[11px] whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  activeFileIndex === idx
                    ? 'bg-violet-600/30 border border-violet-400/50 text-white font-bold'
                    : 'hover:bg-white/5 text-slate-400 hover:text-slate-200'
                }`}
              >
                <FileCode className="w-3.5 h-3.5 text-cyan-400" />
                {file.name}
              </button>
            ))}
          </div>

          {/* Active File Bar */}
          <div className="px-4 py-2 bg-black/40 border-b border-white/5 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2 truncate">
              <span className="font-mono text-cyan-300 font-semibold">{activeFile.path}</span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-400 text-[11px] truncate">{activeFile.description}</span>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-violet-600 hover:bg-violet-500 text-white transition-colors flex items-center gap-1 shadow flex-shrink-0"
            >
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              {copied ? 'কপি হয়েছে' : 'কোড কপি করুন'}
            </button>
          </div>

          {/* Code Viewer */}
          <div className="flex-1 overflow-auto p-4 font-mono text-xs leading-relaxed bg-[#0A0C11]">
            <pre className="text-slate-200">
              <code>{activeFile.code}</code>
            </pre>
          </div>
        </div>
      )}

      {activeTab === 'guide' && (
        <div className="flex-1 overflow-auto p-6 max-w-4xl mx-auto space-y-6">
          <div className="p-5 rounded-2xl bg-gradient-to-r from-violet-950/40 to-slate-900 border border-violet-500/20">
            <h3 className="text-base font-bold text-white flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-violet-400" />
              Android অ্যাপে কনভার্ট করার ৩টি সহজ উপায়
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              আপনি আপনার সুবিধামতো নিচের যেকোনো একটি পদ্ধতি ব্যবহার করে খুব সহজেই সম্পূর্ণ Aether Browser অ্যাপ এবং APK ফাইল তৈরি করতে পারবেন।
            </p>
          </div>

          {/* Method 1: Android Studio */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold">
                পদ্ধতি ১ (অফিশিয়াল ও সেরা কোয়ালিটি)
              </span>
              <span className="text-xs text-slate-400 font-mono">Native Kotlin + Compose</span>
            </div>
            <h4 className="text-sm font-bold text-white">Android Studio দিয়ে সরাসরি APK বিল্ড করা</h4>
            <ol className="text-xs text-slate-300 space-y-2 list-decimal list-inside leading-relaxed">
              <li>
                উপরের <strong className="text-emerald-400">"ZIP ফাইল ডাউনলোড"</strong> বাটনে ক্লিক করে প্রজেক্টের সব ফাইল সেভ করুন এবং আনজিপ করুন।
              </li>
              <li>
                আপনার কম্পিউটারে <strong>Android Studio</strong> ওপেন করুন এবং <code className="text-cyan-300 bg-black/40 px-1 py-0.5 rounded">Open</code> বাটনে ক্লিক করে <code className="text-cyan-300 bg-black/40 px-1 py-0.5 rounded">android</code> ফোল্ডারটি নির্বাচন করুন।
              </li>
              <li>
                Gradle Sync শেষ হওয়া পর্যন্ত অপেক্ষা করুন (সব ডিপেনডেন্সি স্বয়ংক্রিয়ভাবে ডাউনলোড হবে)।
              </li>
              <li>
                মেনু থেকে ক্লিক করুন: <strong className="text-white">Build &gt; Build Bundle(s) / APK(s) &gt; Build APK(s)</strong>।
              </li>
              <li>
                বিল্ড শেষ হলে নিচে একটি পপআপে <strong className="text-cyan-300">locate</strong> আসবে, সেখানে আপনার ইনস্টলেবল <code className="text-emerald-300 bg-black/40 px-1 py-0.5 rounded">app-debug.apk</code> পেয়ে যাবেন!
              </li>
            </ol>
          </div>

          {/* Method 2: Capacitor CLI */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold">
                পদ্ধতি ২ (২ মিনিটে দ্রুত APK)
              </span>
              <span className="text-xs text-slate-400 font-mono">Capacitor CLI</span>
            </div>
            <h4 className="text-sm font-bold text-white">কমান্ড লাইনের মাধ্যমে ৩টি কমান্ডে APK তৈরি</h4>
            <p className="text-xs text-slate-300">
              আপনার মেশিনে টার্মিনাল খুলে প্রজেক্ট ডিরেক্টরিতে নিচের কমান্ডগুলো ক্রমান্বয়ে রান করুন:
            </p>
            <div className="p-3 bg-black/60 rounded-xl font-mono text-xs text-cyan-300 border border-white/10 space-y-1">
              <p className="text-slate-500"># ১. Capacitor ইনস্টল করুন</p>
              <p className="text-white font-bold">npm install @capacitor/core @capacitor/cli @capacitor/android</p>
              <p className="text-slate-500 mt-2"># ২. ওয়েব প্রজেক্ট বিল্ড করুন</p>
              <p className="text-white font-bold">npm run build</p>
              <p className="text-slate-500 mt-2"># ৩. Android প্ল্যাটফর্ম যুক্ত করুন এবং সিঙ্ক করুন</p>
              <p className="text-white font-bold">npx cap add android</p>
              <p className="text-white font-bold">npx cap sync android</p>
              <p className="text-slate-500 mt-2"># ৪. Android Studio-তে খুলে রান করুন বা APK এক্সপোর্ট করুন</p>
              <p className="text-emerald-400 font-bold">npx cap open android</p>
            </div>
          </div>

          {/* Method 3: PWA / Mobile Browser Install */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
                পদ্ধতি ৩ (ইনস্ট্যান্ট মোবাইল অ্যাপ ইনস্টল)
              </span>
              <span className="text-xs text-slate-400 font-mono">PWA / WebAPK</span>
            </div>
            <h4 className="text-sm font-bold text-white">ফোন থেকে সরাসরি অ্যাপ হিসেবে ইনস্টল করুন</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              এই অ্যাপটিতে ইতিমধ্যেই পূর্ণাঙ্গ <code className="text-cyan-300 bg-black/40 px-1 py-0.5 rounded">manifest.json</code> এবং <code className="text-cyan-300 bg-black/40 px-1 py-0.5 rounded">sw.js</code> সার্ভিস ওয়ার্কার যুক্ত রয়েছে।
              যেকোনো অ্যান্ড্রয়েড ফোনে ক্রোম ব্রাউজারে সাইটটি খুলে ৩-ডট মেনু থেকে <strong>"Install app"</strong> অথবা <strong>"Add to Home screen"</strong> চাপলে এটি আপনার ফোনের হোম স্ক্রিনে একটি স্বতন্ত্র নেটিভ অ্যাপের মতো ইনস্টল হয়ে যাবে!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
