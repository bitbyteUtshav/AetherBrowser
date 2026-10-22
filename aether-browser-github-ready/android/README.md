# Aether Browser — Android Studio Project & APK Build Guide
## কীভাবে Android অ্যাপ / APK তৈরি করবেন (Step-by-Step)

এই ফোল্ডারটিতে Aether Browser-এর সম্পূর্ণ নেটিভ অ্যান্ড্রয়েড সোর্স কোড (Kotlin, Jetpack Compose, Chromium-backed WebView, Safe Browsing, এবং DownloadManager) অন্তর্ভুক্ত রয়েছে।

---

### পদ্ধতি ১: Android Studio দিয়ে সরাসরি APK তৈরি (সবচেয়ে সহজ)

1. **Android Studio ইনস্টল করুন:**
   - [developer.android.com/studio](https://developer.android.com/studio) থেকে Android Studio (Ladybug / Iguana বা লেটেস্ট ভার্সন) ডাউনলোড ও ইনস্টল করুন।

2. **প্রজেক্ট ওপেন করুন:**
   - Android Studio ওপেন করে **Open** বাটনে ক্লিক করুন।
   - এই `android` ফোল্ডারটি সিলেক্ট করুন এবং ওপেন করুন।
   - Gradle নিজে থেকেই প্রয়োজনীয় লাইব্রেরি এবং SDK ডাউনলোড (Sync) করে নিবে।

3. **Debug APK বিল্ড করুন:**
   - শীর্ষ মেনু থেকে: **Build** > **Build Bundle(s) / APK(s)** > **Build APK(s)** চাপুন।
   - কয়েক সেকেন্ডের মধ্যে বিল্ড সম্পন্ন হলে নিচে `locate` লিংক আসবে।
   - আপনার ফোন বা এমুলেটরে সরাসরি ফাইলটি ইনস্টল করতে পারবেন:
     `app/build/outputs/apk/debug/app-debug.apk`

4. **প্লে স্টোরের জন্য Signed Release APK / AAB তৈরি করুন:**
   - মেনু থেকে: **Build** > **Generate Signed Bundle / APK...**
   - **Android App Bundle (.aab)** সিলেক্ট করুন।
   - আপনার Keystore তৈরি করুন বা নির্বাচন করুন।
   - `release` ভ্যারিয়েন্ট সিলেক্ট করে **Create** চাপুন।

---

### পদ্ধতি ২: টার্মিনাল / কমান্ড লাইন থেকে ১-ক্লিকে APK বিল্ড (CLI)

টার্মিনালে এই `android` ডিরেক্টরিতে এসে নিচের কমান্ডটি চালান:

```bash
# Debug APK তৈরি
./gradlew assembleDebug

# আউটপুট APK লোকেশন:
# android/app/build/outputs/apk/debug/app-debug.apk

# প্লে স্টোর রিলিজ APK তৈরি
./gradlew assembleRelease
```

---

### পদ্ধতি ৩: Capacitor ব্যবহার করে Web App থেকে দ্রুত APK তৈরি (Node.js)

যদি আপনি এই আধুনিক ওয়েব ইন্টারফেসটি সরাসরি অ্যাপে কনভার্ট করতে চান:

```bash
# ১. ডিপেনডেন্সি ইনস্টল করুন
npm install @capacitor/core @capacitor/cli @capacitor/android

# ২. প্রজেক্ট বিল্ড করুন
npm run build

# ৩. অ্যান্ড্রয়েড প্ল্যাটফর্ম যুক্ত করুন
npx cap add android

# ৪. ফাইল সিঙ্ক করুন
npx cap sync android

# ৫. Android Studio-তে খুলে রান করুন
npx cap open android
```

---

### প্রধান ফিচারসমূহ (Included Features):
- **Chromium Android WebView Integration:** AndroidView এর মাধ্যমে রিয়েল ক্রোমিয়াম ব্রাউজিং।
- **Safe Browsing & Strict TLS:** কোনো প্রকার অনিরাপদ সংযোগ বা অবৈধ সার্টিফিকেট বাইপাস নেই।
- **Turbo Multi-Threaded Download Manager:** অ্যান্ড্রয়েডের অফিশিয়াল `DownloadManager` ইন্টিগ্রেশন।
- **Jetpack Compose Liquid Glass UI:** আধুনিক ট্রান্সলুসেন্ট ব্লার এবং অ্যাডাপ্টিভ ডার্ক/লাইট মোড।
- **Full Chrome Toolset:** ট্যাব গ্রুপ, পাসওয়ার্ড ম্যানেজার, ইন-পেজ ট্রান্সলেট ও ফাইন্ড।
