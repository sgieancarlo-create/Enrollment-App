# 🔧 Quick Start Fix Guide

## Issues Found:
1. ❌ Path error - Enrollment-System not in expected location
2. ❌ npm cache compromised

---

## ✅ Solution Steps

### **Step 1: Fix npm Cache (2 minutes)**

Run these commands in PowerShell (as Administrator):

```powershell
# Clear npm cache
npm cache clean --force

# Verify cache is clean
npm cache verify
```

---

### **Step 2: Find Correct Path (1 minute)**

The Enrollment-System folder is located at:
```
C:\Users\Giean Carlo\Desktop\..\..\Enrollment-System
```

To find the exact path, run:
```powershell
# Navigate to Desktop first
cd "C:\Users\Giean Carlo\Desktop"

# List directories to find Enrollment-System
dir

# Or search for it
Get-ChildItem -Path "C:\Users\Giean Carlo" -Filter "Enrollment-System" -Recurse -Directory -ErrorAction SilentlyContinue
```

---

### **Step 3: Navigate to Project (1 minute)**

Once you find the correct path, navigate to it:

**Option A: If it's in Desktop:**
```powershell
cd "C:\Users\Giean Carlo\Desktop\Enrollment-System\enrollment-app"
```

**Option B: If it's elsewhere (check the search result):**
```powershell
cd "C:\Users\Giean Carlo\[ACTUAL_PATH]\Enrollment-System\enrollment-app"
```

**Option C: Use relative path from current location:**
```powershell
# If you're in Desktop
cd Enrollment-System\enrollment-app

# If you're in parent directory
cd .\Enrollment-System\enrollment-app
```

---

### **Step 4: Verify You're in the Right Place**

```powershell
# Check if package.json exists
dir package.json

# Should show the package.json file
```

---

### **Step 5: Start the Development Server**

```powershell
# Clear cache and start
npx expo start --clear
```

If it asks to install expo, type `y` and press Enter.

---

## 🎯 Alternative: Use VS Code Terminal

1. **Open VS Code**
2. **Open the enrollment-app folder:**
   - File → Open Folder
   - Navigate to Enrollment-System\enrollment-app
   - Click "Select Folder"

3. **Open Terminal in VS Code:**
   - Terminal → New Terminal (or Ctrl + `)

4. **Run:**
   ```powershell
   npm cache clean --force
   npx expo start --clear
   ```

---

## 🔍 Quick Path Finder Script

Save this as `find-project.ps1` and run it:

```powershell
# Find Enrollment-System folder
$searchPath = "C:\Users\Giean Carlo"
$folderName = "Enrollment-System"

Write-Host "Searching for $folderName..." -ForegroundColor Yellow

$found = Get-ChildItem -Path $searchPath -Filter $folderName -Recurse -Directory -ErrorAction SilentlyContinue | Select-Object -First 1

if ($found) {
    Write-Host "Found at: $($found.FullName)" -ForegroundColor Green
    Write-Host "`nTo navigate there, run:" -ForegroundColor Cyan
    Write-Host "cd `"$($found.FullName)\enrollment-app`"" -ForegroundColor White
} else {
    Write-Host "Folder not found!" -ForegroundColor Red
}
```

---

## 📝 Summary of Commands

```powershell
# 1. Clear npm cache
npm cache clean --force

# 2. Find the project (one of these should work)
cd "C:\Users\Giean Carlo\Desktop\Enrollment-System\enrollment-app"
# OR
cd "C:\Users\Giean Carlo\Documents\Enrollment-System\enrollment-app"
# OR
cd "C:\Users\Giean Carlo\Enrollment-System\enrollment-app"

# 3. Verify location
dir package.json

# 4. Start server
npx expo start --clear
```

---

## ✅ Success Indicators

You'll know it's working when you see:
- ✅ "Metro waiting on exp://..."
- ✅ QR code displayed
- ✅ No error messages

---

## 🆘 Still Having Issues?

If you still can't find the path:

1. **Open File Explorer**
2. **Search for "Enrollment-System"** in the search bar
3. **Right-click the folder** → Properties
4. **Copy the "Location" path**
5. **Use that path in PowerShell:**
   ```powershell
   cd "[COPIED_PATH]\Enrollment-System\enrollment-app"
   ```

---

## 🎯 Next Steps After Fixing

Once the server starts successfully:
1. ✅ QR code appears
2. ✅ Scan with Expo Go app
3. ✅ Begin testing as per TESTING_GUIDE.md

---

**Let me know once you've successfully started the server!**
