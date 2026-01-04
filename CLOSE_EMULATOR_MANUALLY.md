# 🔧 Close Emulator Manually - Step by Step

## ❌ Problem
The emulator processes are running but protected from force termination. They need to be closed properly.

---

## ✅ Solution: Close Emulator Window

### **Step 1: Find the Emulator Window**

Look for a window that looks like an Android phone. It might be:
- Behind other windows (use Alt+Tab to find it)
- Minimized in taskbar
- On another monitor

**The window title will say:** "Medium_Phone_API_36.1" or "Android Emulator"

---

### **Step 2: Close the Emulator**

**Option A: Click the X button**
- Find the emulator window
- Click the **X** (close button) in the top-right corner
- Wait 5-10 seconds for it to fully close

**Option B: Right-click taskbar**
- Find the emulator in the taskbar
- Right-click on it
- Select "Close window"

**Option C: Use emulator menu**
- Click on the emulator window
- Press **Alt+F4**
- Or click the three dots (⋮) → "Close"

---

### **Step 3: Verify It's Closed**

After closing, wait 10 seconds, then run this command:

```powershell
Get-Process | Where-Object {$_.ProcessName -like "*emulator*" -or $_.ProcessName -like "*qemu*"}
```

**Should show:** Nothing (empty result)

**If still showing processes:** The emulator is still running somewhere. Keep looking for the window.

---

### **Step 4: Clean Up Lock Files**

Once the emulator is fully closed:

```powershell
Remove-Item "$env:USERPROFILE\.android\avd\Medium_Phone_API_36.1.avd\*.lock" -Force -ErrorAction SilentlyContinue
```

---

### **Step 5: Restart ADB**

```powershell
adb kill-server
adb start-server
```

---

### **Step 6: Start Emulator Fresh**

**Option A: From Android Studio (Recommended)**
1. Open Android Studio
2. Click "More Actions" or three dots
3. Select "Virtual Device Manager"
4. Find "Medium_Phone_API_36.1"
5. Click the ▶ Play button
6. Wait 2-3 minutes for boot

**Option B: From Command Line**
```powershell
emulator -avd Medium_Phone_API_36.1
```

---

### **Step 7: Verify Emulator is Running**

```powershell
adb devices
```

**Should show:**
```
List of devices attached
emulator-5554   device
```

---

### **Step 8: Launch Your App**

1. Go to terminal where `yarn start` is running
2. Press `a`
3. App will install and launch

---

## 🆘 If You Can't Find the Emulator Window

### **Check Task Manager:**

1. Press **Ctrl+Shift+Esc** to open Task Manager
2. Look for:
   - "Android Emulator"
   - "qemu-system-x86_64"
   - "emulator.exe"
3. Right-click → "End Task"
4. If it says "Access Denied", you need to:
   - Close Android Studio first
   - Then try again

---

## 🔍 Alternative: Check if Emulator is Actually Running

The emulator might be running but not visible. Try this:

```powershell
adb devices
```

**If it shows `emulator-5554 device`:**
- The emulator IS running and connected!
- You can just press `a` in the yarn start terminal
- No need to restart it

**If it shows `emulator-5554 offline`:**
- The emulator is stuck
- You need to close and restart it

---

## ✅ Quick Checklist

- [ ] Find and close emulator window (X button)
- [ ] Wait 10 seconds
- [ ] Verify processes are gone
- [ ] Remove lock files
- [ ] Restart ADB
- [ ] Start emulator from Android Studio
- [ ] Wait for boot (2-3 min)
- [ ] Verify with `adb devices`
- [ ] Press `a` in yarn start terminal

---

## 💡 Pro Tip

**Always start the emulator from Android Studio's Device Manager** rather than command line. It's more reliable and handles cleanup better.

---

## 🎯 What to Do Now

1. **Look for the emulator window** (use Alt+Tab)
2. **Close it properly** (click X button)
3. **Wait 10 seconds**
4. **Let me know** when it's closed

Then I'll help you start it fresh and launch the app!

---

**Please close the emulator window and let me know when it's done!**
