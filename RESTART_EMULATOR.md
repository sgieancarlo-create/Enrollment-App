# 🔧 Restart Android Emulator

## ❌ Problem
The Android emulator stopped running. Error: "could not connect to TCP port 5554"

## ✅ Solution: Restart the Emulator

### **Option 1: Start from Android Studio (Easiest)**

1. **Open Android Studio**
2. **Click "More Actions"** (or three dots menu)
3. **Select "Virtual Device Manager"** (or "AVD Manager")
4. **Find your emulator** (e.g., Pixel_5_API_33)
5. **Click the ▶ Play button**
6. **Wait 2-3 minutes** for emulator to fully boot
7. **Go back to your terminal** and press `a`

---

### **Option 2: Start from Command Line**

```powershell
# List available emulators
emulator -list-avds

# Start one (replace with your emulator name)
emulator -avd Pixel_5_API_33
```

Wait for emulator to boot, then press `a` in the yarn start terminal.

---

### **Option 3: Use Expo Go Instead (Fastest!)**

If you don't want to wait for the emulator:

1. **Install "Expo Go"** app on your Android phone (from Play Store)
2. **Connect phone to same WiFi** as your computer
3. **Open Expo Go** app
4. **Scan the QR code** shown in your terminal
5. **App loads on your phone** in 10-30 seconds

---

## 🔍 Verify Emulator is Running

After starting the emulator, verify it's connected:

```powershell
adb devices
```

**Should show:**
```
List of devices attached
emulator-5554   device
```

**If it shows nothing**, wait a bit longer for emulator to boot.

---

## 🚀 Once Emulator is Running

1. **Go to terminal** where `yarn start` is running
2. **Press `a`**
3. **App will install and launch**

---

## ⏱️ Time Estimates

- **Emulator startup:** 2-3 minutes
- **App installation:** 30-60 seconds
- **Total:** ~4 minutes

vs.

- **Expo Go on phone:** 30 seconds total

---

## 💡 Recommendation

**For fastest testing, use Expo Go on your phone:**
- No emulator needed
- Faster to start
- Real device testing
- Just scan QR code

**For emulator testing:**
- More control
- Better for debugging
- But slower to start

---

## 🎯 Your Choice

**Option A: Restart Emulator** (4 minutes)
- Open Android Studio
- Start emulator
- Wait for boot
- Press `a`

**Option B: Use Expo Go** (30 seconds)
- Install Expo Go on phone
- Scan QR code
- Start testing immediately

---

**Which option would you like to use?**

Let me know and I'll guide you through the next steps!
