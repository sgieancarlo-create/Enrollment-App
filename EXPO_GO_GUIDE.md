# 📱 Expo Go - Quick Start Guide

## ✅ Fastest Way to Test Your App (2 Minutes!)

Expo Go lets you test your app instantly without any emulator setup.

---

## Step 1: Install Expo Go on Your Phone

1. Open **Google Play Store** on your Android phone
2. Search for **"Expo Go"**
3. Install the app (it's free)
4. Open Expo Go app

---

## Step 2: Connect to Same WiFi

**Important**: Your phone and computer must be on the **same WiFi network**.

- Computer WiFi: Check your WiFi connection
- Phone WiFi: Settings → WiFi → Connect to same network

---

## Step 3: Start Development Server

The development server is already running! You should see:

```
› Metro waiting on exp://172.20.10.4:8081
› Scan the QR code above with Expo Go (Android) or the Camera app (iOS)
```

---

## Step 4: Scan QR Code

### Option A: Scan with Expo Go App
1. Open **Expo Go** app on your phone
2. Tap **"Scan QR Code"**
3. Point camera at the QR code in your terminal
4. Wait for app to load (~10-30 seconds)

### Option B: Manual Connection
If QR code doesn't work:
1. In Expo Go app, tap **"Enter URL manually"**
2. Type: `exp://172.20.10.4:8081`
3. Tap **"Connect"**

---

## Step 5: Your App is Running! 🎉

You should now see your Enrollment System app on your phone!

### What You Can Do:
- ✅ Test all features
- ✅ Navigate through screens
- ✅ Edit code and see changes instantly (hot reload)
- ✅ Shake phone to open developer menu

---

## 🔄 Making Changes

1. Edit your code in VS Code
2. Save the file
3. App automatically reloads on your phone
4. See changes instantly!

---

## 🚨 Troubleshooting

### "Unable to connect to Metro"

**Solution 1: Check WiFi**
- Make sure phone and computer are on same WiFi
- Disable VPN if you have one running

**Solution 2: Use Tunnel**
```powershell
# Stop current server (Ctrl+C)
npx expo start --tunnel
# Scan new QR code
```

**Solution 3: Manual IP**
1. Find your computer's IP address:
   ```powershell
   ipconfig
   # Look for "IPv4 Address" under your WiFi adapter
   ```
2. In Expo Go, enter: `exp://YOUR_IP:8081`

---

### "Network response timed out"

**Solution**:
```powershell
# Stop server (Ctrl+C)
# Clear cache and restart
npx expo start --clear
```

---

### "Something went wrong"

**Solution**:
1. Close Expo Go app completely
2. Restart development server:
   ```powershell
   # Stop with Ctrl+C
   npx expo start --clear
   ```
3. Scan QR code again

---

## 📊 Current Status

✅ **Package versions updated**:
- expo: 54.0.26
- expo-router: 6.0.16

✅ **Development server running**:
- Metro bundler: Ready
- QR code: Displayed in terminal
- Web: http://localhost:8081

---

## 🎯 Next Steps

1. **Install Expo Go** on your phone (if not done)
2. **Connect to same WiFi** as your computer
3. **Scan QR code** in terminal
4. **Test your app** on your phone!

---

## 💡 Pro Tips

1. **Shake phone** to open developer menu
2. **Enable Fast Refresh** for instant updates
3. **Use tunnel mode** if WiFi connection is problematic
4. **Check logs** in terminal for errors

---

## 🔄 Restarting the Server

If you need to restart:

```powershell
# Stop current server
Ctrl+C

# Start again
cd C:\Enrollment-System\enrollment-app
npx expo start

# Or with cache cleared
npx expo start --clear
```

---

## 📱 Alternative: Press 'w' for Web

If you want to test in browser instead:
1. In the terminal, press **`w`**
2. Browser opens at http://localhost:8081
3. Test in browser (good for quick checks)

---

## ⚠️ Limitations of Expo Go

**What Works**:
- ✅ All React Native components
- ✅ Expo SDK features
- ✅ Navigation
- ✅ State management
- ✅ API calls

**What Doesn't Work**:
- ⚠️ Custom native modules
- ⚠️ Some third-party libraries
- ⚠️ Background tasks (limited)

For full native features, you'll need to build a development build or use Android Studio emulator.

---

## 🚀 When You're Ready for Production

Later, when you want to build an APK:

```powershell
# Install EAS CLI
npm install -g eas-cli

# Login
eas login

# Build APK
eas build --platform android --profile preview
```

---

**Your app is ready to test with Expo Go!** 📱

Just scan the QR code and start testing!
