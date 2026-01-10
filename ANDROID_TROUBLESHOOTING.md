# 🔧 Android Troubleshooting Guide
## Complete Solution for "No Android Device Found" Error

---

## 📖 Quick Navigation

- [Quick Fix](#-quick-fix-try-this-first)
- [Full Setup Guide](#-full-setup-android-studio--emulator)
- [Common Errors](#-common-errors--solutions)
- [Verification Script](#-automated-verification)
- [Alternative Options](#-alternative-options)

---

## ⚡ Quick Fix (Try This First)

If you already have Android Studio and an emulator set up:

### Step 1: Restart ADB
```powershell
adb kill-server
adb start-server
adb devices
```

### Step 2: Start Your Emulator
- Open Android Studio
- Go to **Tools** → **Device Manager** (or **AVD Manager**)
- Click the **▶ Play** button on your emulator
- Wait for it to fully boot (~2 minutes)

### Step 3: Verify Connection
```powershell
adb devices
```
You should see:
```
List of devices attached
emulator-5554   device
```

### Step 4: Update Dependencies & Start Expo
```powershell
cd "C:\Users\Giean Carlo\Desktop\Enrollment-System\enrollment-app"
npm install
npx expo start --clear
```

### Step 5: Launch on Android
Press **`a`** when Metro bundler is ready.

---

## 🆕 Full Setup: Android Studio & Emulator

If you don't have Android Studio installed yet, follow this complete guide:

### Prerequisites
- ✅ Windows 11 (you have this)
- ✅ 8GB+ RAM (16GB recommended)
- ✅ 10GB+ free disk space
- ✅ Stable internet connection
- ✅ Administrator access

### Installation Steps

#### 1️⃣ Install Android Studio (~30 minutes)

1. **Download**: https://developer.android.com/studio
2. **Run installer** and select these components:
   - ✅ Android Studio
   - ✅ Android SDK
   - ✅ Android SDK Platform
   - ✅ Android Virtual Device
3. **Complete setup wizard** (choose "Standard" installation)
4. **Wait for SDK downloads** to complete

#### 2️⃣ Install SDK Components (~15 minutes)

1. Open **Android Studio** → **More Actions** → **SDK Manager**
2. In **SDK Platforms** tab, install:
   - ✅ Android 14.0 (API 34)
   - ✅ Android 13.0 (API 33) ← Recommended
   - ✅ Android 11.0 (API 30)
3. In **SDK Tools** tab, install:
   - ✅ Android SDK Build-Tools
   - ✅ Android SDK Command-line Tools
   - ✅ Android Emulator
   - ✅ Android SDK Platform-Tools
   - ✅ Intel x86 Emulator Accelerator (HAXM) - for Intel CPUs
4. Click **Apply** and wait for downloads

#### 3️⃣ Set Environment Variables (~5 minutes)

1. Press **Windows Key** → Search **"Environment Variables"**
2. Click **"Edit the system environment variables"**
3. Click **"Environment Variables"** button
4. Under **User variables**, click **"New"**:
   - Variable name: `ANDROID_HOME`
   - Variable value: `C:\Users\Giean Carlo\AppData\Local\Android\Sdk`
5. Select **"Path"** → Click **"Edit"** → Click **"New"** and add:
   ```
   %ANDROID_HOME%\platform-tools
   %ANDROID_HOME%\emulator
   %ANDROID_HOME%\tools
   %ANDROID_HOME%\tools\bin
   ```
6. Click **OK** on all windows
7. **Restart PowerShell** (or restart computer)

#### 4️⃣ Verify Installation

Open a **NEW** PowerShell window and run:

```powershell
# Check ANDROID_HOME
echo $env:ANDROID_HOME
# Should output: C:\Users\Giean Carlo\AppData\Local\Android\Sdk

# Check ADB
adb --version
# Should output: Android Debug Bridge version X.X.X
```

If these don't work, restart your computer and try again.

#### 5️⃣ Create Android Emulator (~10 minutes)

1. Open **Android Studio** → **More Actions** → **Virtual Device Manager**
2. Click **"Create Device"**
3. Select **"Pixel 5"** or **"Pixel 6"** → Click **"Next"**
4. Select **"Tiramisu"** (API 33) system image
   - If not downloaded, click **"Download"** and wait
5. Click **"Next"**
6. Configure settings:
   - AVD Name: `Pixel_5_API_33`
   - RAM: 2048 MB (or 4096 MB if you have 16GB+ RAM)
7. Click **"Finish"**
8. Click **▶ Play** to test the emulator
9. Wait for boot (~2-3 minutes first time)

#### 6️⃣ Update Project Dependencies

```powershell
cd "C:\Users\Giean Carlo\Desktop\Enrollment-System\enrollment-app"
npm install
```

This installs the updated packages (expo@54.0.26, expo-router@6.0.16).

#### 7️⃣ Launch Your App

```powershell
# Make sure emulator is running first!
npx expo start

# When Metro bundler is ready, press 'a'
```

---

## 🚨 Common Errors & Solutions

### Error 1: "adb: command not found"

**Cause**: ADB not in PATH or ANDROID_HOME not set

**Solution**:
```powershell
# Option 1: Use full path
C:\Users\Giean Carlo\AppData\Local\Android\Sdk\platform-tools\adb.exe devices

# Option 2: Fix PATH (see Step 3 above)
# Then restart PowerShell
```

---

### Error 2: "No devices/emulators found"

**Cause**: Emulator not running or ADB not connected

**Solution**:
```powershell
# 1. Start emulator from Android Studio
# 2. Wait for full boot (see home screen)
# 3. Restart ADB
adb kill-server
adb start-server
adb devices

# 4. Should show: emulator-5554   device
```

---

### Error 3: "Emulator won't start"

**Cause**: Hardware acceleration not enabled

**Solution for Intel CPUs**:
1. Go to: `C:\Users\Giean Carlo\AppData\Local\Android\Sdk\extras\intel\Hardware_Accelerated_Execution_Manager`
2. Run `intelhaxm-android.exe`
3. Follow installation wizard
4. Restart computer
5. Try launching emulator again

**Solution for AMD CPUs**:
1. Enable Hyper-V in Windows Features
2. Restart computer
3. Use ARM system images instead of x86

**Alternative**:
- Try a different API level (API 30 instead of 33)
- Reduce RAM allocation (1024 MB instead of 2048 MB)

---

### Error 4: "Emulator is very slow"

**Solutions**:
1. Increase RAM allocation (4GB if you have 16GB+ RAM)
2. Enable hardware acceleration (HAXM/Hyper-V)
3. Close other applications
4. Use a lower API level (API 30)
5. **Best solution**: Use a physical Android device instead

---

### Error 5: "Metro bundler won't start"

**Solution**:
```powershell
# Kill existing node processes
taskkill /F /IM node.exe

# Clear cache and restart
cd "C:\Users\Giean Carlo\Desktop\Enrollment-System\enrollment-app"
npx expo start --clear
```

---

### Error 6: "App crashes on emulator"

**Solutions**:
1. Check Metro bundler logs for errors
2. Clear app data: Emulator → Settings → Apps → Your App → Clear Data
3. Try a different API level emulator
4. Increase emulator RAM
5. Rebuild with cache cleared:
   ```powershell
   npx expo start --clear
   ```

---

### Error 7: "Package version mismatch"

**Solution**:
```powershell
cd "C:\Users\Giean Carlo\Desktop\Enrollment-System\enrollment-app"
npm install expo@~54.0.26 expo-router@~6.0.16
```

---

### Error 8: "Device unauthorized"

**Cause**: USB debugging not accepted on device/emulator

**Solution**:
1. Unlock the emulator screen
2. Look for "Allow USB debugging?" popup
3. Check "Always allow from this computer"
4. Click "OK"
5. Run `adb devices` again

---

## 🤖 Automated Verification

Run this script to check your setup:

```powershell
cd "C:\Users\Giean Carlo\Desktop\Enrollment-System\enrollment-app"
.\check-android-setup.ps1
```

This will verify:
- ✅ ANDROID_HOME is set
- ✅ ADB is working
- ✅ Devices are connected
- ✅ Node.js is installed
- ✅ Expo CLI is available
- ✅ Project dependencies are installed

---

## 📱 Alternative Options

### Option A: Use Physical Android Device (Fastest)

**Advantages**:
- ✅ Much faster than emulator
- ✅ Real device testing
- ✅ No virtualization needed

**Setup**:
1. Enable Developer Options:
   - Go to **Settings** → **About Phone**
   - Tap **"Build Number"** 7 times
2. Enable USB Debugging:
   - Go to **Settings** → **System** → **Developer Options**
   - Enable **"USB Debugging"**
3. Connect phone via USB cable
4. Accept USB debugging prompt on phone
5. Verify: `adb devices`
6. Run: `npx expo start` and press `a`

---

### Option B: Use Expo Go App (Simplest)

**Advantages**:
- ✅ No emulator needed
- ✅ No Android Studio needed
- ✅ Instant testing

**Setup**:
1. Install **"Expo Go"** from Google Play Store on your phone
2. Make sure phone and computer are on same WiFi
3. Run: `npx expo start`
4. Scan QR code with Expo Go app
5. App opens instantly!

**Limitations**:
- ⚠️ Cannot test native modules
- ⚠️ Cannot build APK
- ⚠️ Requires internet connection

---

### Option C: Use EAS Build (Cloud Build)

**Advantages**:
- ✅ No local setup needed
- ✅ Builds APK in the cloud
- ✅ Works on any computer

**Setup**:
```powershell
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Build APK
eas build --platform android --profile preview
```

Wait ~15 minutes for build, then download and install APK on your phone.

---

## ✅ Verification Checklist

Before running your app, verify:

- [ ] Android Studio installed
- [ ] Android SDK installed (API 30+)
- [ ] ANDROID_HOME environment variable set
- [ ] PATH includes platform-tools and emulator
- [ ] AVD created and can launch
- [ ] `adb devices` shows your emulator/device
- [ ] Expo dependencies updated
- [ ] Metro bundler starts without errors

---

## 🚀 Daily Workflow (After Setup)

```powershell
# 1. Start emulator (from Android Studio Virtual Device Manager)
# Or use command line:
emulator -avd Pixel_5_API_33

# 2. In another PowerShell window:
cd "C:\Users\Giean Carlo\Desktop\Enrollment-System\enrollment-app"
npx expo start

# 3. Press 'a' to launch on Android
```

**Pro Tip**: Keep the emulator running between app restarts to save time!

---

## 📚 Additional Resources

- **Full Setup Guide**: See `ANDROID_STUDIO_SETUP.md` for detailed instructions
- **Quick Checklist**: See `TROUBLESHOOTING_CHECKLIST.md` for quick reference
- **Expo Docs**: https://docs.expo.dev/workflow/android-studio-emulator/
- **Android Studio Docs**: https://developer.android.com/studio/intro

---

## 💡 Pro Tips

1. **Keep emulator running**: Don't close it between restarts (saves 2-3 minutes)
2. **Use snapshots**: Enable "Quick Boot" in AVD settings
3. **Multiple emulators**: Create different devices for testing (phone, tablet)
4. **Physical device**: Always faster than emulator for development
5. **Expo Go**: Great for quick testing without building

---

## 🎯 Success Indicators

You'll know everything is working when:

- ✅ `adb devices` shows your emulator/device
- ✅ Metro bundler starts without errors
- ✅ App installs automatically on emulator
- ✅ App launches and shows your UI
- ✅ Hot reload works (edit code, see changes instantly)

---

## 🆘 Still Having Issues?

1. **Restart everything**:
   - Close Android Studio
   - Close all PowerShell windows
   - Restart computer
   - Try again from Step 1

2. **Run verification script**:
   ```powershell
   .\check-android-setup.ps1
   ```

3. **Check detailed logs**:
   - Metro bundler logs (in terminal)
   - Android Studio logcat (for emulator logs)
   - `adb logcat` (for device logs)

4. **Clean install**:
   ```powershell
   cd "C:\Users\Giean Carlo\Desktop\Enrollment-System\enrollment-app"
   rm -r node_modules
   rm package-lock.json
   npm install
   npx expo start --clear
   ```

---

**Your Android development environment is ready!** 🎉

Choose your preferred method:
- **Emulator**: Best for long-term development
- **Physical Device**: Fastest for testing
- **Expo Go**: Simplest for quick demos

Good luck with your Enrollment System app! 📱
