# 🔧 Expo Go + Android Emulator - Complete Fix Guide

## ✅ Current Status

**ADB Setup:**
- ✅ ADB installed: Version 36.0.0
- ✅ PATH configured: `C:\Users\Giean Carlo\AppData\Local\Android\Sdk\platform-tools`
- ✅ ADB daemon started successfully
- ⚠️ No devices connected

**Issues:**
1. Android emulator not running
2. Expo Go cannot connect
3. Tunnel connection fails
4. App stuck at loading screen

---

## 🎯 Complete Fix Steps

### Step 1: Start Android Emulator

**Option A: From Android Studio**
1. Open Android Studio
2. Click **Tools** → **Device Manager** (or **AVD Manager**)
3. Find your emulator (e.g., Pixel_5_API_33)
4. Click the **▶ Play** button
5. Wait 2-3 minutes for emulator to fully boot

**Option B: From Command Line**
```powershell
# List available emulators
& "C:\Users\Giean Carlo\AppData\Local\Android\Sdk\emulator\emulator.exe" -list-avds

# Start specific emulator (replace with your AVD name)
& "C:\Users\Giean Carlo\AppData\Local\Android\Sdk\emulator\emulator.exe" -avd Pixel_5_API_33
```

---

### Step 2: Verify Emulator Connection

After emulator starts, run:
```powershell
adb devices
```

**Expected Output:**
```
List of devices attached
emulator-5554   device
```

If you see `offline` or `unauthorized`:
```powershell
adb kill-server
adb start-server
adb devices
```

---

### Step 3: Clear Expo Cache

```powershell
cd C:\Enrollment-System\enrollment-app
npx expo start --clear
```

This will:
- Clear Metro bundler cache
- Clear Expo cache
- Start fresh development server

---

### Step 4: Connect Expo to Emulator

**Method 1: Press 'a' in Terminal**
1. After `npx expo start --clear` runs
2. Wait for Metro bundler to be ready
3. Press **`a`** key
4. Expo will install and launch on emulator

**Method 2: Use Expo Go App**
1. Open Expo Go app on emulator
2. Scan QR code from terminal
3. Or enter URL manually: `exp://localhost:8081`

---

### Step 5: Test Default User Login

Once app loads:
1. Navigate to Login screen
2. Enter credentials:
   - **Email:** `newtest@example.com`
   - **Password:** `password123`
3. Click "Sign In"
4. Should successfully log in

---

## 🚨 Common Issues & Solutions

### Issue 1: "could not connect to TCP port 5554"

**Cause:** Emulator not running

**Solution:**
```powershell
# Check if emulator is running
adb devices

# If no devices, start emulator
& "C:\Users\Giean Carlo\AppData\Local\Android\Sdk\emulator\emulator.exe" -avd Pixel_5_API_33
```

---

### Issue 2: "Expo Go stuck at loading screen"

**Cause:** Metro bundler not ready or cache issues

**Solution:**
```powershell
# Stop Metro (Ctrl+C)
# Clear all caches
npx expo start --clear

# Wait for "Metro waiting on..." message
# Then press 'a' to launch on Android
```

---

### Issue 3: "Tunnel connection failed"

**Cause:** Network/firewall issues

**Solution:**
```powershell
# Don't use tunnel, use direct connection
npx expo start

# Make sure emulator and Metro are on same network (localhost)
# Press 'a' to launch
```

---

### Issue 4: "adb: command not found" or "where adb returns nothing"

**Cause:** PowerShell session doesn't have updated PATH

**Solution:**
```powershell
# Refresh environment variables
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

# Verify adb works
adb version

# If still not working, use full path
& "C:\Users\Giean Carlo\AppData\Local\Android\Sdk\platform-tools\adb.exe" version
```

---

### Issue 5: "Login fails on mobile"

**Cause:** AsyncStorage is platform-isolated

**Solution:**
The seed user feature automatically creates `newtest@example.com` on first launch.

**On Emulator:**
1. Clear app data: Settings → Apps → Expo Go → Clear Data
2. Restart app
3. Default user will be seeded automatically
4. Login with `newtest@example.com` / `password123`

---

## 📋 Quick Checklist

Before testing, ensure:
- [ ] Android emulator is running (`adb devices` shows device)
- [ ] Metro bundler is running (`npx expo start --clear`)
- [ ] Expo Go is installed on emulator
- [ ] No firewall blocking connections
- [ ] Using correct credentials: `newtest@example.com` / `password123`

---

## 🔄 Complete Restart Procedure

If everything fails, do a complete restart:

```powershell
# 1. Kill all processes
adb kill-server
# Close Android Studio
# Close all PowerShell windows
# Stop Metro bundler (Ctrl+C)

# 2. Restart ADB
adb start-server

# 3. Start emulator
& "C:\Users\Giean Carlo\AppData\Local\Android\Sdk\emulator\emulator.exe" -avd Pixel_5_API_33

# 4. Wait for emulator to boot (2-3 minutes)

# 5. Verify connection
adb devices

# 6. Start Expo with clean cache
cd C:\Enrollment-System\enrollment-app
npx expo start --clear

# 7. Press 'a' to launch on Android
```

---

## 🎯 Expected Behavior

**When Everything Works:**

1. **Emulator Status:**
   ```
   adb devices
   List of devices attached
   emulator-5554   device
   ```

2. **Metro Bundler:**
   ```
   › Metro waiting on exp://localhost:8081
   › Press a │ open Android
   ```

3. **After Pressing 'a':**
   ```
   › Opening on Android...
   › Building JavaScript bundle
   › Running app on emulator-5554
   ```

4. **On Emulator:**
   - Expo Go opens
   - App loads (shows splash screen)
   - Login screen appears
   - Can log in with `newtest@example.com` / `password123`

---

## 🔍 Debugging Commands

```powershell
# Check ADB version
adb version

# Check connected devices
adb devices

# Check emulator status
adb shell getprop ro.build.version.release

# View emulator logs
adb logcat

# Restart ADB
adb kill-server
adb start-server

# Check Expo Go installation
adb shell pm list packages | Select-String expo

# Clear Expo Go data
adb shell pm clear host.exp.exponent
```

---

## 📱 Alternative: Use Physical Device

If emulator continues to have issues:

1. **Enable USB Debugging** on Android phone
2. **Connect via USB**
3. **Run:**
   ```powershell
   adb devices
   # Should show your phone
   ```
4. **Start Expo:**
   ```powershell
   npx expo start
   ```
5. **Press 'a'** to launch on phone

---

## ✅ Success Indicators

You'll know it's working when:
- ✅ `adb devices` shows `emulator-5554   device`
- ✅ Metro bundler shows "Metro waiting on..."
- ✅ Pressing 'a' shows "Opening on Android..."
- ✅ App loads on emulator without hanging
- ✅ Login screen appears
- ✅ Can log in with default credentials
- ✅ Profile shows user name "New Test"

---

## 🆘 Still Not Working?

1. **Check Android Studio:**
   - Is emulator actually running?
   - Can you see the emulator window?
   - Is it fully booted (not stuck at boot animation)?

2. **Check Firewall:**
   - Windows Firewall might be blocking connections
   - Temporarily disable to test

3. **Check Expo Version:**
   ```powershell
   npx expo --version
   # Should be 54.x.x
   ```

4. **Reinstall Expo Go on Emulator:**
   ```powershell
   adb uninstall host.exp.exponent
   # Then press 'a' in Metro to reinstall
   ```

---

## 📚 Additional Resources

- **Android Emulator Docs:** https://developer.android.com/studio/run/emulator
- **Expo Docs:** https://docs.expo.dev/workflow/android-studio-emulator/
- **ADB Docs:** https://developer.android.com/tools/adb

---

**Your setup is ready! Just need to start the emulator and connect Expo.** 🚀
