# 🔧 Simple Fix - Step by Step

## ❌ Problems Found:
1. You're in the wrong directory (C:\WINDOWS\system32)
2. npm cache is still compromised

---

## ✅ Simple Solution

### **Copy and paste these commands ONE AT A TIME:**

```powershell
# Step 1: Navigate to the correct directory
cd C:\Enrollment-System\enrollment-app
```

Press Enter, then:

```powershell
# Step 2: Clear npm cache (as Administrator)
npm cache clean --force
```

Press Enter, then:

```powershell
# Step 3: Delete the cache folder manually
Remove-Item -Path "$env:APPDATA\npm-cache" -Recurse -Force -ErrorAction SilentlyContinue
```

Press Enter, then:

```powershell
# Step 4: Verify you're in the right place
dir package.json
```

You should see package.json listed. If yes, continue:

```powershell
# Step 5: Delete lock file
Remove-Item package-lock.json -Force -ErrorAction SilentlyContinue
```

Press Enter, then:

```powershell
# Step 6: Delete node_modules
Remove-Item -Path "node_modules" -Recurse -Force -ErrorAction SilentlyContinue
```

Press Enter, then:

```powershell
# Step 7: Install dependencies
npm install
```

Wait for installation to complete (~2-3 minutes), then:

```powershell
# Step 8: Start the server
npx expo start --clear
```

---

## 🎯 Alternative: Use VS Code Terminal

This is easier and avoids directory issues:

1. **Open VS Code**
2. **File → Open Folder**
3. **Navigate to:** `C:\Enrollment-System\enrollment-app`
4. **Click "Select Folder"**
5. **Terminal → New Terminal** (or press Ctrl + `)
6. **Run these commands in VS Code terminal:**

```powershell
npm cache clean --force
Remove-Item package-lock.json -Force -ErrorAction SilentlyContinue
Remove-Item -Path "node_modules" -Recurse -Force -ErrorAction SilentlyContinue
npm install
npx expo start --clear
```

---

## 🚀 Even Simpler: Use Yarn

If npm keeps having issues, use Yarn instead:

```powershell
# In VS Code terminal (after opening the project folder)
npm install -g yarn
yarn install
yarn start
```

---

## ✅ Success Indicators

You'll know it's working when you see:
```
✔ Dependencies installed
✔ Metro bundler starting...
✔ QR code displayed
› Metro waiting on exp://...
```

---

## 📞 If Still Having Issues

Try this nuclear option (deletes everything and starts fresh):

```powershell
# Navigate to project
cd C:\Enrollment-System\enrollment-app

# Delete EVERYTHING
Remove-Item -Path "node_modules" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item package-lock.json -Force -ErrorAction SilentlyContinue
Remove-Item -Path "$env:APPDATA\npm-cache" -Recurse -Force -ErrorAction SilentlyContinue

# Fresh install with Yarn
npm install -g yarn
yarn install
yarn start
```

---

**Use VS Code terminal - it's the easiest way!** 🚀
