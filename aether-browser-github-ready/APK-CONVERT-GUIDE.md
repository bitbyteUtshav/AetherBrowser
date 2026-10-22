# Aether Browser - সম্পূর্ণ মোবাইল অ্যাপ কনভার্ট ও APK তৈরি নির্দেশিকা 📱⚡

এই জিপ ফাইলটিতে **Aether Browser** এর সম্পূর্ণ **Android Native Project (Kotlin + Jetpack Compose + High-Speed Multi-threaded WebKit)** এবং **Web/Capacitor Configurations** অন্তর্ভুক্ত রয়েছে।

---

## 🚀 ৩টি সহজ উপায়ে APK বা মোবাইল অ্যাপ তৈরি করুন:

### পদ্ধতি ১: অ্যান্ড্রয়েড স্টুডিও (Android Studio) দিয়ে অফিশিয়াল APK তৈরি (সবচেয়ে শক্তিশালী ও ফাস্ট)

১. **Android Studio** ওপেন করুন। (না থাকলে https://developer.android.com/studio থেকে ফ্রি ইনস্টল করুন)।
২. **Open** বাটনে ক্লিক করে জিপ ফাইলটি আনজিপ করা ফোল্ডারের ভেতরের `android` ফোল্ডারটি সিলেক্ট করুন।
৩. Android Studio স্বয়ংক্রিয়ভাবে Gradle সিঙ্ক সম্পন্ন করবে (১-২ মিনিট সময় লাগতে পারে)।
৪. উপরের মেনু থেকে **Build > Build Bundle(s) / APK(s) > Build APK(s)** এ ক্লিক করুন।
৫. কয়েক সেকেন্ডের মধ্যে আপনার **`app-debug.apk`** তৈরি হয়ে যাবে!
৬. সরাসরি মোবাইলে ইনস্টল করতে:
   - মোবাইল USB দিয়ে পিসির সাথে যুক্ত করুন (USB Debugging অন করুন)।
   - Android Studio এর সবুজ **Run (▶)** বাটনে চাপ দিন। আপনার ফোনে সরাসরি অ্যাপ ইনস্টল ও চালু হয়ে যাবে।

---

### পদ্ধতি ২: কোনো কোডিং ছাড়া ১ মিনিটে APK (PWABuilder) 🌐➡️📲

Aether Browser একটি সম্পূর্ণ **PWA-ready** অ্যাপ (Web Manifest এবং Service Worker অন্তর্ভুক্ত)।
১. আপনার লাইভ ডেভ ইউআরএলটি কপি করুন।
২. ব্রাউজারে যান: **https://www.pwabuilder.com**
৩. আপনার ইউআরএলটি বক্সে পেস্ট করে **Start** চাপুন।
৪. **Package for Stores** এ গিয়ে **Android** সিলেক্ট করুন এবং **Generate APK** এ ক্লিক করুন।
৫. সরাসরি সাইন করা **.apk** ফাইল ডাউনলোড হয়ে যাবে এবং যেকোনো অ্যান্ড্রয়েড ফোনে সরাসরি ইনস্টল করা যাবে!

---

### পদ্ধতি ৩: Capacitor CLI দিয়ে অ্যাপ তৈরি

টার্মিনালে এই কমান্ডগুলো রান করুন:
```bash
# ডিপেন্ডেন্সি ইনস্টল
npm install

# ক্যাপাসিটর অ্যান্ড্রয়েড প্লাগইন
npm install @capacitor/core @capacitor/cli @capacitor/android

# বিল্ড ও সিঙ্ক
npm run build
npx cap add android
npx cap copy
npx cap open android
```

---

## 🛡️ এই অ্যাপের বিশেষ ফিচারসমূহ:
- 🚀 **Extreme Download Priority & Multi-threaded Chunking:** যেকোনো ফাইল চোখের পলকে ডাউনলোড।
- 🔒 **Extreme Security & Sandboxing:** থার্ড-পার্টি ট্র্যাকার, ম্যালওয়্যার ও ফিশিং ব্লক।
- 💎 **Liquid Glass UI:** ট্রিমিয়াম গ্লাস-মর্ফিজম ডিজাইন ও সুপার ফ্লুইড অ্যানিমেশন।
- 📑 **Google Chrome Features:** মাল্টি-ট্যাব, ইনকগনিটো মোড, ডাউনলোড ম্যানেজার, বুকমার্ক, পেজ সার্চ, গুগল ট্রান্সলেট, পাসওয়ার্ড ভল্ট, প্রিন্ট/PDF এক্সপোর্ট ইত্যাদি।
