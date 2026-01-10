# 🔄 Clear Cache and Restart - Fix "Missing Default Export" Error

## ❌ Problem

Expo Router is showing "missing default export" errors even though all files have default exports. This is a **Metro bundler cache issue**.

---

## ✅ Solution: Clear Cache and Restart

### **Step 1: Stop All Running Servers**

1. Find the terminal where `yarn start` is running
2. Press **Ctrl+C** to stop it
3. Wait for it to fully stop

If there are multiple terminals running Expo:
- Stop all of them with Ctrl+C

---

### **Step 2: Clear Metro Cache**

Run this command:

```powershell
cd C:\Enrollment-System\enrollment-app
yarn start --clear
```

Or if you prefer npm:

```powershell
npx expo start --clear
```

**The `--clear` flag will:**
- Clear Metro bundler cache
- Clear watchman cache
- Clear temp files
- Force a fresh build

---

### **Step 3: Wait for Server to Start**

You should see:

```
Starting Metro Bundler
› Metro waiting on exp://172.20.10.1:8081
› Scan the QR code above with Expo Go

› Press a │ open Android
› Press w │ open web
```

---

### **Step 4: Launch the App**

Once the server is running:

**Option A: Expo Go (Recommended)**
- Open Expo Go on your phone
- Scan the QR code
- Wait for app to load

**Option B: Android Emulator**
- Make sure emulator is running
- Press `a` in terminal

**Option C: Web Browser**
- Press `w` in terminal

---

## 🔍 Why This Happens

### **Metro Bundler Cache Issue**

Metro bundler caches JavaScript files for faster rebuilds. Sometimes when you:
- Create new files
- Modify exports
- Change route structure

The cache becomes stale and shows incorrect errors like "missing default export" even when the export exists.

### **The `--clear` Flag**

Using `--clear` forces Metro to:
1. Delete all cached files
2. Re-read all source files
3. Rebuild from scratch
4. Generate fresh bundle

This resolves cache-related errors.

---

## ✅ Verification

After restarting with `--clear`, you should see:

✅ **No "missing default export" errors**
✅ **No "Component auth has not been registered" errors**
✅ **App launches successfully**
✅ **Login screen appears**

---

## 🆘 If Still Having Issues

### **Issue: Port already in use**

If you see "Port 8081 is being used":

**Option 1: Use different port**
- Type `Y` when prompted
- Server will use port 8083 instead

**Option 2: Kill the process**
```powershell
# Find process using port 8081
netstat -ano | findstr :8081

# Kill it (replace PID with actual process ID)
taskkill /PID <PID> /F

# Then restart
yarn start --clear
```

---

### **Issue: Still shows cache errors**

Try more aggressive cache clearing:

```powershell
# Stop server
Ctrl+C

# Delete node_modules and reinstall
Remove-Item -Recurse -Force node_modules
Remove-Item -Force yarn.lock
yarn install

# Clear all caches
yarn start --clear --reset-cache
```

---

### **Issue: "Cannot find module"**

```powershell
# Reinstall dependencies
yarn install

# Clear cache and restart
yarn start --clear
```

---

## 📋 Quick Checklist

- [ ] Stop all running Expo servers (Ctrl+C)
- [ ] Run `yarn start --clear`
- [ ] Wait for Metro bundler to start
- [ ] See QR code and menu
- [ ] Launch app (Expo Go, emulator, or web)
- [ ] Verify no errors in terminal
- [ ] App loads successfully

---

## 🎯 What to Do Now

1. **Stop the current server** (Ctrl+C in terminal)
2. **Run:** `yarn start --clear`
3. **Wait** for server to start
4. **Launch** the app
5. **Report** if it works or if you see new errors

---

**This should resolve the "missing default export" errors!**
