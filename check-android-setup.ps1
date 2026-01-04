# Android Setup Verification Script
# Run this to check if your Android development environment is properly configured

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Android Setup Verification Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$allGood = $true

# Check 1: ANDROID_HOME
Write-Host "1. Checking ANDROID_HOME environment variable..." -ForegroundColor Yellow
if ($env:ANDROID_HOME) {
    Write-Host "   ✓ ANDROID_HOME is set: $env:ANDROID_HOME" -ForegroundColor Green
    if (Test-Path $env:ANDROID_HOME) {
        Write-Host "   ✓ Android SDK directory exists" -ForegroundColor Green
    } else {
        Write-Host "   ✗ Android SDK directory not found!" -ForegroundColor Red
        $allGood = $false
    }
} else {
    Write-Host "   ✗ ANDROID_HOME is not set!" -ForegroundColor Red
    Write-Host "   → Set it to: C:\Users\$env:USERNAME\AppData\Local\Android\Sdk" -ForegroundColor Yellow
    $allGood = $false
}
Write-Host ""

# Check 2: ADB
Write-Host "2. Checking Android Debug Bridge (ADB)..." -ForegroundColor Yellow
try {
    $adbVersion = adb --version 2>&1 | Select-Object -First 1
    Write-Host "   ✓ ADB is installed: $adbVersion" -ForegroundColor Green
} catch {
    Write-Host "   ✗ ADB not found in PATH!" -ForegroundColor Red
    Write-Host "   → Add %ANDROID_HOME%\platform-tools to PATH" -ForegroundColor Yellow
    $allGood = $false
}
Write-Host ""

# Check 3: Connected Devices
Write-Host "3. Checking for connected Android devices/emulators..." -ForegroundColor Yellow
try {
    $devices = adb devices 2>&1 | Select-Object -Skip 1 | Where-Object { $_ -match "device$" }
    if ($devices) {
        Write-Host "   ✓ Found connected device(s):" -ForegroundColor Green
        $devices | ForEach-Object { Write-Host "     - $_" -ForegroundColor Green }
    } else {
        Write-Host "   ⚠ No devices connected" -ForegroundColor Yellow
        Write-Host "   → Start an emulator or connect a physical device" -ForegroundColor Yellow
        Write-Host "   → Run: emulator -avd <your_avd_name>" -ForegroundColor Yellow
    }
} catch {
    Write-Host "   ✗ Cannot check devices (ADB not working)" -ForegroundColor Red
    $allGood = $false
}
Write-Host ""

# Check 4: Node.js
Write-Host "4. Checking Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "   ✓ Node.js is installed: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "   ✗ Node.js not found!" -ForegroundColor Red
    $allGood = $false
}
Write-Host ""

# Check 5: Expo CLI
Write-Host "5. Checking Expo CLI..." -ForegroundColor Yellow
try {
    $expoVersion = npx expo --version 2>&1
    Write-Host "   ✓ Expo CLI is available: $expoVersion" -ForegroundColor Green
} catch {
    Write-Host "   ✗ Expo CLI not found!" -ForegroundColor Red
    $allGood = $false
}
Write-Host ""

# Check 6: Project Dependencies
Write-Host "6. Checking project dependencies..." -ForegroundColor Yellow
if (Test-Path ".\node_modules") {
    Write-Host "   ✓ node_modules folder exists" -ForegroundColor Green
    if (Test-Path ".\node_modules\expo") {
        Write-Host "   ✓ Expo package is installed" -ForegroundColor Green
    } else {
        Write-Host "   ⚠ Expo package not found in node_modules" -ForegroundColor Yellow
        Write-Host "   → Run: npm install" -ForegroundColor Yellow
    }
} else {
    Write-Host "   ✗ node_modules not found!" -ForegroundColor Red
    Write-Host "   → Run: npm install" -ForegroundColor Yellow
    $allGood = $false
}
Write-Host ""

# Check 7: Package.json versions
Write-Host "7. Checking package versions..." -ForegroundColor Yellow
if (Test-Path ".\package.json") {
    $packageJson = Get-Content ".\package.json" | ConvertFrom-Json
    $expoVersion = $packageJson.dependencies.expo
    $expoRouterVersion = $packageJson.dependencies.'expo-router'
    
    Write-Host "   Current versions:" -ForegroundColor Cyan
    Write-Host "   - expo: $expoVersion" -ForegroundColor Cyan
    Write-Host "   - expo-router: $expoRouterVersion" -ForegroundColor Cyan
    
    if ($expoVersion -match "54.0.26" -or $expoVersion -match "54.0.25") {
        Write-Host "   ✓ Expo version is up to date" -ForegroundColor Green
    } else {
        Write-Host "   ⚠ Consider updating expo to ~54.0.26" -ForegroundColor Yellow
    }
} else {
    Write-Host "   ✗ package.json not found!" -ForegroundColor Red
    $allGood = $false
}
Write-Host ""

# Summary
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Summary" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

if ($allGood) {
    Write-Host "✓ All critical checks passed!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Make sure an emulator is running (or connect a device)" -ForegroundColor White
    Write-Host "2. Run: npx expo start" -ForegroundColor White
    Write-Host "3. Press 'a' to launch on Android" -ForegroundColor White
} else {
    Write-Host "✗ Some issues found. Please fix them before proceeding." -ForegroundColor Red
    Write-Host ""
    Write-Host "Refer to ANDROID_STUDIO_SETUP.md for detailed setup instructions." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Offer to start emulator
Write-Host "Would you like to:" -ForegroundColor Cyan
Write-Host "1. List available emulators" -ForegroundColor White
Write-Host "2. Check ADB devices again" -ForegroundColor White
Write-Host "3. Start Expo development server" -ForegroundColor White
Write-Host "4. Exit" -ForegroundColor White
Write-Host ""

$choice = Read-Host "Enter your choice (1-4)"

switch ($choice) {
    "1" {
        Write-Host ""
        Write-Host "Available emulators:" -ForegroundColor Yellow
        emulator -list-avds
    }
    "2" {
        Write-Host ""
        Write-Host "Checking devices..." -ForegroundColor Yellow
        adb devices
    }
    "3" {
        Write-Host ""
        Write-Host "Starting Expo development server..." -ForegroundColor Yellow
        npx expo start
    }
    "4" {
        Write-Host "Goodbye!" -ForegroundColor Cyan
    }
    default {
        Write-Host "Invalid choice. Exiting." -ForegroundColor Red
    }
}
