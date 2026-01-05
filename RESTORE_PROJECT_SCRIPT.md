# 🔧 Project Restoration Script - Copy & Paste Ready

## Step-by-Step PowerShell Commands for Windows

---

## ⚠️ IMPORTANT: Run These Commands in Order

### Step 1: Close All Processes Using the Folder

```powershell
# Close VSCode (if open)
Stop-Process -Name "Code" -Force -ErrorAction SilentlyContinue

# Close Node processes
Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue

# Close Expo CLI processes
Get-Process | Where-Object {$_.ProcessName -like "*expo*"} | Stop-Process -Force -ErrorAction SilentlyContinue

# Wait a moment for processes to close
Start-Sleep -Seconds 3

Write-Host "✅ All processes closed" -ForegroundColor Green
```

---

### Step 2: Navigate to Parent Directory

```powershell
# Navigate to parent directory
cd C:\Enrollment-System

# Verify current location
Write-Host "Current directory: $(Get-Location)" -ForegroundColor Cyan
```

---

### Step 3: Backup Current Folder (If Needed)

```powershell
# Check if backup already exists
if (Test-Path "enrollment-app-backup") {
    Write-Host "⚠️ Backup folder already exists. Removing old backup..." -ForegroundColor Yellow
    Remove-Item "enrollment-app-backup" -Recurse -Force
}

# Rename current folder as backup
if (Test-Path "enrollment-app") {
    Write-Host "📦 Creating backup of current folder..." -ForegroundColor Cyan
    Rename-Item "enrollment-app" "enrollment-app-backup"
    Write-Host "✅ Backup created: enrollment-app-backup" -ForegroundColor Green
} else {
    Write-Host "⚠️ enrollment-app folder not found, skipping backup" -ForegroundColor Yellow
}
```

---

### Step 4: Clone Fresh Project from GitHub

```powershell
# Clone the repository
Write-Host "📥 Cloning project from GitHub..." -ForegroundColor Cyan
git clone https://github.com/sgieancarlo-create/Enrollment-App.git enrollment-app

# Verify clone was successful
if (Test-Path "enrollment-app") {
    Write-Host "✅ Project cloned successfully" -ForegroundColor Green
} else {
    Write-Host "❌ Clone failed! Check your internet connection and GitHub URL" -ForegroundColor Red
    exit 1
}
```

---

### Step 5: Navigate into New Project

```powershell
# Navigate into the new project folder
cd enrollment-app

# Verify we're in the right place
Write-Host "Current directory: $(Get-Location)" -ForegroundColor Cyan

# List key files to verify
Write-Host "`n📋 Checking for key files..." -ForegroundColor Cyan
if (Test-Path "package.json") {
    Write-Host "✅ package.json found" -ForegroundColor Green
} else {
    Write-Host "❌ package.json NOT found!" -ForegroundColor Red
}

if (Test-Path "app.json") {
    Write-Host "✅ app.json found" -ForegroundColor Green
} else {
    Write-Host "❌ app.json NOT found!" -ForegroundColor Red
}
```

---

### Step 6: Install Dependencies

```powershell
# Clean any existing node_modules (shouldn't exist in fresh clone)
if (Test-Path "node_modules") {
    Write-Host "🧹 Removing existing node_modules..." -ForegroundColor Yellow
    Remove-Item "node_modules" -Recurse -Force
}

if (Test-Path "package-lock.json") {
    Write-Host "🧹 Removing existing package-lock.json..." -ForegroundColor Yellow
    Remove-Item "package-lock.json" -Force
}

# Clear npm cache
Write-Host "`n🧹 Clearing npm cache..." -ForegroundColor Cyan
npm cache clean --force

# Install dependencies
Write-Host "`n📦 Installing dependencies (this may take 2-3 minutes)..." -ForegroundColor Cyan
npm install

# Verify installation
if (Test-Path "node_modules") {
    Write-Host "✅ Dependencies installed successfully" -ForegroundColor Green
    
    # Count installed packages
    $packageCount = (Get-ChildItem "node_modules" -Directory).Count
    Write-Host "📦 Installed $packageCount packages" -ForegroundColor Cyan
} else {
    Write-Host "❌ npm install failed!" -ForegroundColor Red
    exit 1
}
```

---

### Step 7: Clear Expo Cache

```powershell
# Clear Expo cache
Write-Host "`n🧹 Clearing Expo cache..." -ForegroundColor Cyan

# Remove .expo folder if it exists
if (Test-Path ".expo") {
    Remove-Item ".expo" -Recurse -Force
    Write-Host "✅ .expo folder removed" -ForegroundColor Green
}

# Clear Expo global cache
npx expo start --clear --no-dev --minify 2>&1 | Out-Null
Start-Sleep -Seconds 2
Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue

Write-Host "✅ Expo cache cleared" -ForegroundColor Green
```

---

### Step 8: Verify Project Structure

```powershell
Write-Host "`n📋 Verifying project structure..." -ForegroundColor Cyan

$requiredFiles = @(
    "package.json",
    "app.json",
    "tsconfig.json",
    "app/_layout.tsx",
    "app/(tabs)/profile.tsx",
    "app/(tabs)/settings.tsx",
    "src/context/ThemeProvider.tsx",
    "src/context/AuthProvider.tsx",
    "src/config/mockAuth.ts",
    "components/PasswordStrengthIndicator.tsx"
)

$allFilesExist = $true
foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "✅ $file" -ForegroundColor Green
    } else {
        Write-Host "❌ $file MISSING!" -ForegroundColor Red
        $allFilesExist = $false
    }
}

if ($allFilesExist) {
    Write-Host "`n✅ All critical files present!" -ForegroundColor Green
} else {
    Write-Host "`n⚠️ Some files are missing. Check your GitHub repository." -ForegroundColor Yellow
}
```

---

### Step 9: Start Expo Development Server

```powershell
Write-Host "`n🚀 Starting Expo development server..." -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop the server when needed" -ForegroundColor Yellow
Write-Host ""

# Start Expo with cleared cache
npx expo start --clear
```

---

## 🎯 All-in-One Script (Copy Everything Below)

```powershell
# ============================================
# COMPLETE PROJECT RESTORATION SCRIPT
# ============================================

Write-Host "🔧 Starting Project Restoration..." -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Close processes
Write-Host "Step 1: Closing processes..." -ForegroundColor Yellow
Stop-Process -Name "Code" -Force -ErrorAction SilentlyContinue
Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue
Get-Process | Where-Object {$_.ProcessName -like "*expo*"} | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 3
Write-Host "✅ Processes closed`n" -ForegroundColor Green

# Step 2: Navigate to parent directory
Write-Host "Step 2: Navigating to parent directory..." -ForegroundColor Yellow
cd C:\Enrollment-System
Write-Host "✅ Current directory: $(Get-Location)`n" -ForegroundColor Green

# Step 3: Backup current folder
Write-Host "Step 3: Creating backup..." -ForegroundColor Yellow
if (Test-Path "enrollment-app-backup") {
    Remove-Item "enrollment-app-backup" -Recurse -Force
}
if (Test-Path "enrollment-app") {
    Rename-Item "enrollment-app" "enrollment-app-backup"
    Write-Host "✅ Backup created: enrollment-app-backup`n" -ForegroundColor Green
}

# Step 4: Clone from GitHub
Write-Host "Step 4: Cloning from GitHub..." -ForegroundColor Yellow
git clone https://github.com/sgieancarlo-create/Enrollment-App.git enrollment-app
if (Test-Path "enrollment-app") {
    Write-Host "✅ Project cloned successfully`n" -ForegroundColor Green
} else {
    Write-Host "❌ Clone failed!`n" -ForegroundColor Red
    exit 1
}

# Step 5: Navigate into project
Write-Host "Step 5: Navigating into project..." -ForegroundColor Yellow
cd enrollment-app
Write-Host "✅ Current directory: $(Get-Location)`n" -ForegroundColor Green

# Step 6: Install dependencies
Write-Host "Step 6: Installing dependencies..." -ForegroundColor Yellow
if (Test-Path "node_modules") { Remove-Item "node_modules" -Recurse -Force }
if (Test-Path "package-lock.json") { Remove-Item "package-lock.json" -Force }
npm cache clean --force
npm install
if (Test-Path "node_modules") {
    $packageCount = (Get-ChildItem "node_modules" -Directory).Count
    Write-Host "✅ Installed $packageCount packages`n" -ForegroundColor Green
} else {
    Write-Host "❌ npm install failed!`n" -ForegroundColor Red
    exit 1
}

# Step 7: Clear Expo cache
Write-Host "Step 7: Clearing Expo cache..." -ForegroundColor Yellow
if (Test-Path ".expo") { Remove-Item ".expo" -Recurse -Force }
Write-Host "✅ Expo cache cleared`n" -ForegroundColor Green

# Step 8: Verify structure
Write-Host "Step 8: Verifying project structure..." -ForegroundColor Yellow
$requiredFiles = @("package.json", "app.json", "tsconfig.json", "app/_layout.tsx")
$allFilesExist = $true
foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "✅ $file" -ForegroundColor Green
    } else {
        Write-Host "❌ $file MISSING!" -ForegroundColor Red
        $allFilesExist = $false
    }
}

if ($allFilesExist) {
    Write-Host "`n✅ Project restoration complete!`n" -ForegroundColor Green
    Write-Host "=================================" -ForegroundColor Cyan
    Write-Host "🚀 Ready to start Expo!" -ForegroundColor Cyan
    Write-Host "=================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Run this command to start:" -ForegroundColor Yellow
    Write-Host "npx expo start --clear" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host "`n⚠️ Some files are missing!`n" -ForegroundColor Yellow
}
```

---

## 📝 Quick Reference Commands

### If you need to start over:
```powershell
cd C:\Enrollment-System
Remove-Item enrollment-app -Recurse -Force
git clone https://github.com/sgieancarlo-create/Enrollment-App.git enrollment-app
cd enrollment-app
npm install
npx expo start --clear
```

### If npm install fails:
```powershell
npm cache clean --force
Remove-Item node_modules -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item package-lock.json -Force -ErrorAction SilentlyContinue
npm install
```

### If Expo won't start:
```powershell
Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue
Remove-Item .expo -Recurse -Force -ErrorAction SilentlyContinue
npx expo start --clear
```

---

## ✅ Success Indicators

After running the script, you should see:
- ✅ `enrollment-app` folder exists
- ✅ `package.json` file present
- ✅ `node_modules` folder with 700+ packages
- ✅ No error messages
- ✅ Expo server starts successfully

---

## 🆘 Troubleshooting

### "Access Denied" or "File in Use" errors:
1. Close VSCode completely
2. Close all terminal windows
3. Restart PowerShell as Administrator
4. Run the script again

### Git clone fails:
1. Check internet connection
2. Verify GitHub URL is correct
3. Try: `git clone https://github.com/sgieancarlo-create/Enrollment-App.git enrollment-app`

### npm install fails:
1. Check Node.js is installed: `node --version`
2. Update npm: `npm install -g npm@latest`
3. Try again with: `npm install --legacy-peer-deps`

---

## 🎯 Next Steps After Restoration

Once the project is restored and running:

1. **Open in VSCode:**
   ```powershell
   code .
   ```

2. **Start Expo:**
   ```powershell
   npx expo start --clear
   ```

3. **Follow Testing Checklist:**
   - Open `POST_MERGE_TESTING_CHECKLIST.md`
   - Follow the testing procedures
   - Verify all features work

---

**Ready to restore your project!** 🚀

Copy and paste the "All-in-One Script" section into PowerShell and press Enter.
