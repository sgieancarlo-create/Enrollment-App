# 🚀 VS Code + Yarn Setup (5 Minutes)

## ✅ This is the MOST RELIABLE method

Follow these exact steps:

---

## Step 1: Open Project in VS Code (1 minute)

1. **Open VS Code**
2. **Click "File" → "Open Folder"**
3. **Navigate to:** `C:\Enrollment-System\enrollment-app`
4. **Click "Select Folder"**

✅ You should now see the project files in the left sidebar

---

## Step 2: Open Terminal in VS Code (30 seconds)

1. **Click "Terminal" → "New Terminal"**
   - OR press **Ctrl + `** (backtick key)

2. **Verify you're in the right place:**
   - Terminal should show: `PS C:\Enrollment-System\enrollment-app>`
   - If not, type: `cd C:\Enrollment-System\enrollment-app`

---

## Step 3: Install Yarn (1 minute)

Copy and paste this command:

```powershell
npm install -g yarn
```

Press Enter and wait for installation.

✅ You should see: "added 1 package"

---

## Step 4: Install Dependencies with Yarn (2 minutes)

Copy and paste this command:

```powershell
yarn install
```

Press Enter and wait (~2-3 minutes).

✅ You should see:
```
✔ Done in X.XXs
```

---

## Step 5: Start Development Server (30 seconds)

Copy and paste this command:

```powershell
yarn start
```

Press Enter.

✅ You should see:
```
› Metro waiting on exp://...
› Scan the QR code above with Expo Go
[QR CODE APPEARS]
```

---

## 🎉 Success!

If you see the QR code, you're ready to test!

### **Next Steps:**

1. **Install Expo Go** on your Android phone (from Play Store)
2. **Scan the QR code** with Expo Go app
3. **Wait 10-30 seconds** for app to load
4. **Follow CRITICAL_PATH_TESTING.md** for testing

---

## 🐛 If You Still Get Errors

### **Error: "yarn: command not found"**

Run this first:
```powershell
npm install -g yarn
```

Then try `yarn install` again.

---

### **Error: "Cannot find module"**

Delete everything and start fresh:
```powershell
Remove-Item -Path "node_modules" -Recurse -Force
Remove-Item yarn.lock -Force
yarn install
yarn start
```

---

### **Error: Still npm cache issues**

Use npx instead:
```powershell
npx expo start --clear
```

---

## 📱 Testing Options

Once server is running:

### **Option A: Expo Go (Recommended)**
1. Install "Expo Go" from Play Store
2. Open Expo Go app
3. Tap "Scan QR Code"
4. Point at QR code in terminal
5. App loads on your phone

### **Option B: Web Browser**
1. Press `w` in the terminal
2. Browser opens at localhost:8081
3. Test in browser

### **Option C: Android Emulator**
1. Start Android emulator first
2. Press `a` in the terminal
3. App installs on emulator

---

## ✅ Verification Checklist

Before proceeding to testing:

- [ ] VS Code opened with correct folder
- [ ] Terminal shows correct path
- [ ] Yarn installed successfully
- [ ] Dependencies installed (yarn install completed)
- [ ] Development server running (yarn start)
- [ ] QR code visible in terminal
- [ ] No error messages

---

## 🧪 Ready for Testing!

Once the server is running successfully:

1. **Open:** `CRITICAL_PATH_TESTING.md`
2. **Follow the checklist** step by step
3. **Test for ~30 minutes**
4. **Report results**

---

## 📊 What You'll Test

1. ✅ User Registration (10 min)
2. ✅ User Login (5 min)
3. ✅ Form Validation (5 min)
4. ✅ Firebase Integration (5 min)
5. ✅ Auth Persistence (5 min)

**Total: ~30 minutes**

---

## 🎯 Success Criteria

Testing is successful if:
- ✅ Can register new user
- ✅ Can login with credentials
- ✅ Form validation works
- ✅ Data saves to Firebase
- ✅ Auth persists after restart

---

**Start with Step 1 and work through each step carefully!** 🚀

Let me know once the server is running or if you encounter any issues.
