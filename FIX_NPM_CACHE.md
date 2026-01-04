# 🔧 Fix npm Cache Compromised Error

## ❌ Current Error:
```
npm error code ECOMPROMISED
npm error Lock compromised
```

This error means the npm cache is corrupted and needs to be completely cleared.

---

## ✅ Solution Steps

### **Step 1: Clear npm Cache (Run as Administrator)**

Open PowerShell **as Administrator** and run:

```powershell
# Force clear the cache
npm cache clean --force

# Verify cache is clean
npm cache verify
```

If that doesn't work, try:

```powershell
# Delete cache directory manually
Remove-Item -Path "$env:APPDATA\npm-cache" -Recurse -Force -ErrorAction SilentlyContinue

# Recreate cache directory
New-Item -Path "$env:APPDATA\npm-cache" -ItemType Directory -Force

# Verify
npm cache verify
```

---

### **Step 2: Delete package-lock.json**

```powershell
# Navigate to project
cd "C:\Enrollment-System\enrollment-app"

# Delete lock file
Remove-Item package-lock.json -Force

# Also delete node_modules if it exists
Remove-Item -Path "node_modules" -Recurse -Force -ErrorAction SilentlyContinue
```

---

### **Step 3: Reinstall Dependencies**

```powershell
# Install fresh
npm install
```

---

### **Step 4: Start Development Server**

```powershell
# Start with clean cache
npx expo start --clear
```

---

## 🚀 Alternative: Use Yarn Instead

If npm continues to have issues, use Yarn:

```powershell
# Install Yarn globally
npm install -g yarn

# Navigate to project
cd "C:\Enrollment-System\enrollment-app"

# Install dependencies with Yarn
yarn install

# Start with Yarn
yarn start
```

---

## 📋 Complete Fix Script

Copy and paste this entire script into PowerShell (as Administrator):

```powershell
# Fix npm cache issue
Write-Host "Fixing npm cache..." -ForegroundColor Yellow

# Step 1: Clear cache
npm cache clean --force
npm cache verify

# Step 2: Navigate to project
cd "C:\Enrollment-System\enrollment-app"

# Step 3: Remove lock file and node_modules
Write-Host "Removing lock files..." -ForegroundColor Yellow
Remove-Item package-lock.json -Force -ErrorAction SilentlyContinue
Remove-Item -Path "node_modules" -Recurse -Force -ErrorAction SilentlyContinue

# Step 4: Reinstall
Write-Host "Reinstalling dependencies..." -ForegroundColor Yellow
npm install

# Step 5: Start server
Write-Host "Starting development server..." -ForegroundColor Green
npx expo start --clear
```

---

## ✅ Verification

After running the fix, you should see:

```
✔ Cache verified successfully
✔ Dependencies installed
✔ Metro bundler starting...
✔ QR code displayed
```

---

## 🆘 If Still Not Working

### **Option 1: Use Different npm Registry**

```powershell
# Set registry to official npm
npm config set registry https://registry.npmjs.org/

# Try again
npm cache clean --force
npm install
```

### **Option 2: Reinstall Node.js**

1. Uninstall Node.js from Windows Settings
2. Download latest LTS from https://nodejs.org
3. Install fresh
4. Try again

### **Option 3: Use npx without cache**

```powershell
# Start without using cache
npx --yes expo start --clear
```

---

## 📞 Quick Commands Reference

```powershell
# Clear cache (as Administrator)
npm cache clean --force

# Delete lock and modules
Remove-Item package-lock.json -Force
Remove-Item -Path "node_modules" -Recurse -Force

# Fresh install
npm install

# Start server
npx expo start --clear
```

---

## ⚡ Fastest Solution

If you want the quickest fix, run this ONE command in PowerShell (as Administrator):

```powershell
npm cache clean --force; cd "C:\Enrollment-System\enrollment-app"; Remove-Item package-lock.json -Force -ErrorAction SilentlyContinue; Remove-Item -Path "node_modules" -Recurse -Force -ErrorAction SilentlyContinue; npm install; npx expo start --clear
```

---

**After fixing the cache, the enrollment system will be ready to test!** 🚀
