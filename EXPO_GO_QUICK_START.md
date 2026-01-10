# 📱 EXPO GO - QUICK START (2 Minutes!)

## ✅ Your Fastest Solution to Test the App

Since the Android emulator isn't connecting, **Expo Go** is the fastest way to test your app on a real device.

---

## 🎯 Step-by-Step Instructions

### **Step 1: Install Expo Go on Your Phone** (1 minute)

1. Open **Google Play Store** on your Android phone
2. Search for **"Expo Go"**
3. Install the app (it's free, ~50MB)
4. Open the Expo Go app

---

### **Step 2: Connect to Same WiFi** (30 seconds)

**CRITICAL**: Your phone and computer MUST be on the same WiFi network!

- **Computer**: Check your WiFi connection (you should be connected)
- **Phone**: Settings → WiFi → Connect to the **same network** as your computer

---

### **Step 3: Your Development Server is Already Running!**

You should see this in your terminal:

```
▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
█ ▄▄▄▄▄ █▀▀ ██ █ ▄█ ▄▄▄▄▄ █
█ █   █ █▄▀██▀██ ▀█ █   █ █
█ █▄▄▄█ █ ▄ █ ▀▀ ██ █▄▄▄█ █
[QR CODE]

› Metro waiting on exp://192.168.1.7:8081
› Scan the QR code above with Expo Go (Android)
```

---

### **Step 4: Scan QR Code** (30 seconds)

#### **Method A: Scan with Expo Go (Recommended)**
1. Open **Expo Go** app on your phone
2. Tap **"Scan QR Code"** button
3. Point your camera at the QR code in the terminal
4. Wait 10-30 seconds for the app to load

#### **Method B: Manual Connection (If QR doesn't work)**
1. In Expo Go app, tap **"Enter URL manually"**
2. Type the URL shown in your terminal (e.g., `exp://192.168.1.7:8081`)
3. Tap **"Connect"**

---

### **Step 5: Your App is Running! 🎉**

You should now see your **Enrollment System** app on your phone!

**What you can do:**
- ✅ Navigate through all screens
- ✅ Test all features
- ✅ Upload documents
- ✅ View courses
- ✅ Edit profile

---

## 🔄 Making Changes (Hot Reload)

1. Edit your code in VS Code
2. Save the file (Ctrl+S)
3. **App automatically reloads on your phone!**
4. See changes instantly (usually 1-2 seconds)

---

## 🚨 Troubleshooting

### Problem 1: "Unable to connect to Metro"

**Solution A: Check WiFi**
- Make sure phone and computer are on the **same WiFi network**
- Disable VPN if you have one running
- Try restarting your WiFi router

**Solution B: Use Tunnel Mode**
```powershell
# Stop current server (Ctrl+C in terminal)
cd C:\Enrollment-System\enrollment-app
npx expo start --tunnel
# Scan the NEW QR code
```

**Solution C: Find Your Computer's IP**
```powershell
ipconfig
# Look for "IPv4 Address" under your WiFi adapter
# Example: 192.168.1.7
```
Then in Expo Go, enter: `exp://YOUR_IP:8081`

---

### Problem 2: "Network response timed out"

**Solution:**
```powershell
# Stop server (Ctrl+C)
# Clear cache and restart
cd C:\Enrollment-System\enrollment-app
npx expo start --clear
```

---

### Problem 3: "Something went wrong"

**Solution:**
1. Close Expo Go app completely (swipe away from recent apps)
2. In terminal, stop server (Ctrl+C)
3. Restart with cache cleared:
   ```powershell
   npx expo start --clear
   ```
4. Scan QR code again

---

### Problem 4: QR Code Not Scanning

**Solution:**
1. Make sure QR code is fully visible in terminal
2. Increase terminal font size if needed
3. Use **Method B** (manual URL entry) instead
4. Or use tunnel mode: `npx expo start --tunnel`

---

## 📊 Current Status

✅ **Packages Updated** (after npm install completes):
- expo: ~54.0.27
- expo-router: ~6.0.17
- All other expo packages updated to compatible versions

✅ **Development Server**: Running on port 8081

✅ **Metro Bundler**: Ready and waiting for connections

---

## 🎯 What to Do Now

1. **Install Expo Go** on your phone (if not done)
2. **Connect to same WiFi** as your computer
3. **Scan QR code** from your terminal
4. **Start testing** your app!

---

## 💡 Pro Tips

1. **Shake your phone** to open the developer menu
2. **Enable Fast Refresh** for instant updates
3. **Keep the terminal open** while testing
4. **Check terminal logs** if something goes wrong
5. **Use tunnel mode** if on different networks (slower but works)

---

## 🔄 Restarting the Server

If you need to restart:

```powershell
# Stop current server
Ctrl+C

# Navigate to project
cd C:\Enrollment-System\enrollment-app

# Start again
npx expo start

# Or with cache cleared
npx expo start --clear
```

---

## 📱 Alternative: Test in Web Browser

If you can't use your phone right now:

1. In the terminal, press **`w`**
2. Browser opens at http://localhost:8081
3. Test basic functionality (some mobile features won't work)

---

## ⚠️ Limitations of Expo Go

**What Works:**
- ✅ All React Native components
- ✅ Expo SDK features
- ✅ Navigation
- ✅ State management
- ✅ API calls
- ✅ Document picker
- ✅ Most app features

**What Doesn't Work:**
- ⚠️ Custom native modules (not used in this app)
- ⚠️ Some third-party libraries with native code
- ⚠️ Background tasks (limited)

**For this Enrollment System app, Expo Go works perfectly!**

---

## 🚀 Next Steps After Testing

Once you've tested and everything works:

### Option A: Build APK for Distribution
```powershell
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Build APK
eas build --platform android --profile preview
```

### Option B: Set Up Android Emulator (Later)
- Follow `ANDROID_TROUBLESHOOTING.md` for full setup
- Takes 15-30 minutes
- Good for long-term development

---

## ✅ Success Indicators

You'll know everything is working when:

- ✅ Expo Go connects without errors
- ✅ App loads and shows the home screen
- ✅ You can navigate between tabs
- ✅ Hot reload works (edit code, see changes)
- ✅ All features are functional

---

## 🆘 Still Having Issues?

1. **Check WiFi**: Both devices on same network?
2. **Check Firewall**: Windows Firewall might be blocking
3. **Try Tunnel Mode**: `npx expo start --tunnel`
4. **Restart Everything**: Phone, computer, router
5. **Check Terminal Logs**: Look for error messages

---

## 📞 Common Error Messages

### "Could not connect to development server"
→ Check WiFi connection, try tunnel mode

### "Network request failed"
→ Restart Metro bundler with `--clear` flag

### "Unable to resolve module"
→ Run `npm install` again

### "Bundling failed"
→ Check terminal for syntax errors in your code

---

**You're all set! Just scan the QR code and start testing!** 🎉

The app should load in 10-30 seconds on your phone.

---

## 📚 Additional Resources

- **Expo Go Docs**: https://docs.expo.dev/get-started/expo-go/
- **Troubleshooting Guide**: See `ANDROID_TROUBLESHOOTING.md`
- **Full Setup**: See `EXPO_SETUP.md`

---

**Happy Testing!** 📱✨
