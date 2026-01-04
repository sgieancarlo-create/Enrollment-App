# 🚀 Restart Metro Bundler - Manual Steps

## Current Situation
- Old Metro server still running on port 8081
- New server trying to start on port 8083
- Terminal is asking: "Use port 8083 instead? » (Y/n)"

## Quick Fix - Do This Now:

### Step 1: Answer the Prompt
In the terminal that's asking about port 8083:
1. Type: **Y**
2. Press: **Enter**

This will start Metro on port 8083.

### Step 2: Stop Old Server (Optional but Recommended)
Find the terminal running on port 8081 and press **Ctrl+C** to stop it.

---

## Alternative: Kill All and Start Fresh

If you prefer to start completely fresh:

### 1. Close All Terminals
- Press **Ctrl+C** in all terminal windows
- Or close all terminal tabs

### 2. Kill Any Remaining Processes
```powershell
# Kill any node processes
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force

# Kill any expo processes
Get-Process expo -ErrorAction SilentlyContinue | Stop-Process -Force
```

### 3. Start Fresh
```powershell
cd C:\Enrollment-System\enrollment-app
npx expo start --clear
```

---

## What to Expect After Metro Starts

You should see:
```
✓ Metro bundler is ready
✓ Bundler cache cleared

› Metro waiting on exp://192.168.x.x:8083
› Scan the QR code above with Expo Go (Android) or the Camera app (iOS)

› Press a │ open Android
› Press w │ open web
```

---

## Next: Testing Steps

Once Metro is running, we'll test:

### Test 1: App Launch ✓
- Press **`w`** to open in web browser
- Verify login screen appears
- Check console for errors

### Test 2: Navigation ✓
- Click "Sign Up" link → Should go to register screen
- Click "Sign In" link → Should go back to login screen

### Test 3: Firebase Auth ✓
- Try to register a new account
- Try to login with that account
- Verify redirect to tabs screen

### Test 4: Hot Reload ✓
- Make a small change to login.tsx
- Save the file
- Verify change appears in browser

---

## Ready?

**Action Required**: 
1. Type **Y** in the terminal asking about port 8083
2. Press **Enter**
3. Wait for Metro to start
4. Let me know when you see the QR code and menu options

Then we'll proceed with testing!
