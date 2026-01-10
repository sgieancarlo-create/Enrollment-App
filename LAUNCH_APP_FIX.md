# 🔧 How to Launch the App - Directory Fix

## ❌ Problem
You're in the wrong directory: `C:\WINDOWS\system32`

## ✅ Solution

### **Option 1: Use the Existing Terminal (Recommended)**

The terminal where `yarn start` is running should still be active. 

**Steps:**
1. Look for the terminal window/tab where you see:
   ```
   › Metro waiting on exp://172.20.10.4:8081
   › Press a │ open Android
   ```
2. Click on that terminal to focus it
3. Press the letter `a` (lowercase)
4. The app will launch

---

### **Option 2: Open New Terminal in Correct Directory**

If you can't find the running terminal:

1. **Open VS Code**
2. **Open Terminal** (Ctrl + `)
3. **Navigate to project:**
   ```powershell
   cd C:\Enrollment-System\enrollment-app
   ```
4. **Check if server is running:**
   ```powershell
   # If server is NOT running, start it:
   yarn start
   
   # Wait for QR code to appear, then press 'a'
   ```

---

### **Option 3: Use VS Code Terminal**

1. **In VS Code**, click **Terminal** menu → **New Terminal**
2. The terminal should open in the correct directory automatically
3. If server is running, just press `a`
4. If not, run `yarn start` first

---

## 🎯 Quick Check

**To verify you're in the correct directory:**

```powershell
# Run this command:
pwd

# Should show:
C:\Enrollment-System\enrollment-app
```

**If you see `C:\WINDOWS\system32`, you're in the wrong place!**

---

## 📱 Correct Launch Sequence

1. **Be in:** `C:\Enrollment-System\enrollment-app`
2. **Server running:** `yarn start` (should already be running)
3. **Wait for:** QR code and menu to appear
4. **Press:** `a` (to launch on Android)

---

## 🆘 Still Having Issues?

### **If you closed the server terminal:**

1. Open new terminal in VS Code
2. Navigate to project:
   ```powershell
   cd C:\Enrollment-System\enrollment-app
   ```
3. Start server:
   ```powershell
   yarn start
   ```
4. Wait for QR code
5. Press `a`

---

## ✅ What You Should See

When in the correct terminal with server running:

```
▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
█ ▄▄▄▄▄ █ ██▀▀█▀▄██ ▄▄▄▄▄ █
[QR CODE]

› Metro waiting on exp://172.20.10.4:8081
› Press a │ open Android
› Press w │ open web
```

**Then press `a` to launch!**

---

**Let me know once you've found the correct terminal and pressed 'a'!**
