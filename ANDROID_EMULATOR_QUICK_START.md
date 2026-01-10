# 🤖 Android Emulator Quick Start

## ✅ Your Code is Already Ready!

The enrollment app is fully coded and the server is running. You just need to launch it on the Android emulator.

---

## 🚀 Quick Method (If Emulator is Already Running)

### **Step 1: Check if Emulator is Running**

In a NEW terminal (keep the server running), type:
```powershell
adb devices
```

**If you see:**
```
List of devices attached
emulator-5554   device
```
✅ Emulator is running! Go to Step 2.

**If you see:**
```
List of devices attached
```
❌ No emulator running. Follow "Start Emulator" section below.

---

### **Step 2: Launch App on Emulator**

In the terminal where the server is running, press:
```
a
```

That's it! The app will install and launch automatically.

---

## 📱 If Emulator is NOT Running

### **Option A: Start from Android Studio**

1. **Open Android Studio**
2. **Click "More Actions" → "Virtual Device Manager"**
3. **Click the ▶ Play button** next to any emulator
4. **Wait 2-3 minutes** for emulator to fully boot
5. **Go back to your terminal** and press `a`

---

### **Option B: Start from Command Line**

First, list available emulators:
```powershell
emulator -list-avds
```

You'll see something like:
```
Pixel_5_API_33
Pixel_7_API_34
```

Start one:
```powershell
emulator -avd Pixel_5_API_33
```

Wait for it to boot, then press `a` in the server terminal.

---

## 🆘 If You Don't Have an Emulator

### **Quick Setup (15 minutes):**

1. **Open Android Studio**
2. **More Actions → Virtual Device Manager**
3. **Click "Create Device"**
4. **Select:** Pixel 5 or Pixel 7
5. **Click "Next"**
6. **Select:** API 33 (Android 13) - Click "Download" if needed
7. **Click "Next" → "Finish"**
8. **Click ▶ Play button** to start it
9. **Wait for boot** (~2-3 minutes)
10. **Press `a`** in server terminal

---

## ✅ Verification

Once you press `a`, you should see:

```
› Opening on Android...
› Building JavaScript bundle
Android Bundled 1234ms
› Installed app on emulator
```

Then the app will launch on the emulator!

---

## 🎯 What You'll See

The app will open showing:
1. **Login Screen** (first screen)
2. **"Sign Up" link** at the bottom
3. **Email and Password fields**

---

## 🧪 Ready to Test!

Once the app is running on the emulator, follow **`CRITICAL_PATH_TESTING.md`**:

### **Test 1: Registration**
1. Tap "Sign Up" link
2. Fill out the registration form
3. Use test data from CRITICAL_PATH_TESTING.md
4. Submit and verify

### **Test 2: Login**
1. Login with created credentials
2. Verify authentication works

### **Test 3-5: Continue with checklist**

---

## 🐛 Common Issues

### **Issue: "No Android device found"**
**Solution:**
```powershell
# Restart ADB
adb kill-server
adb start-server
adb devices
```

Then press `a` again.

---

### **Issue: "Emulator won't start"**
**Solution:**
1. Close Android Studio
2. Restart computer
3. Open Android Studio
4. Start emulator again

---

### **Issue: "App crashes on emulator"**
**Solution:**
1. Press `r` in terminal to reload
2. Or press `a` again to reinstall

---

## 📝 Quick Commands Reference

```powershell
# Check devices
adb devices

# List emulators
emulator -list-avds

# Start emulator
emulator -avd Pixel_5_API_33

# Restart ADB
adb kill-server
adb start-server

# In server terminal:
# Press 'a' - Launch on Android
# Press 'r' - Reload app
# Press 'j' - Open debugger
```

---

## ✅ Summary

**Your Code:** ✅ Already complete and ready
**Server:** ✅ Running
**Next Step:** Press `a` to launch on emulator

**If emulator not running:**
1. Open Android Studio
2. Start emulator (▶ button)
3. Wait for boot
4. Press `a` in terminal

---

**The code is ready - just launch it on the emulator!** 🚀
