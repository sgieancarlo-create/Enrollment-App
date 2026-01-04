# Expo + Android Emulator - Automated Fix Script
# Run this script to fix common Expo Go connection issues

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Expo + Android Emulator Fix Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$allGood = $true

# Step 1: Check ADB
Write-Host "Step 1: Checking ADB..." -ForegroundColor Yellow
$adbPath = "C:\Users\Giean Carlo\AppData\Local\Android\Sdk\platform-tools\adb.exe"

if (Test-Path $adbPath) {
    Write-Host "   ✓ ADB found at: $adbPath" -ForegroundColor Green
    
    # Get ADB version
    $adbVersion = & $adbPath version 2>&1 | Select-String "Version" | Out-String
    Write-Host "   ✓ $($adbVersion.Trim())" -ForegroundColor Green
} else {
    Write-Host "   ✗ ADB not found!" -ForegroundColor Red
    $allGood = $false
}
Write-Host ""

# Step 2: Restart ADB Server
Write-Host "Step 2: Restarting ADB server..." -ForegroundColor Yellow
try {
    & $adbPath kill-server 2>&1 | Out-Null
    Start-Sleep -Seconds 1
    & $adbPath start-server 2>&1 | Out-Null
    Write-Host "   ✓ ADB server restarted" -ForegroundColor Green
} catch {
    Write-Host "   ✗ Failed to restart ADB server" -ForegroundColor Red
    $allGood = $false
}
Write-Host ""

# Step 3: Check for connected devices
Write-Host "Step 3: Checking for connected devices..." -ForegroundColor Yellow
$devices = & $adbPath devices 2>&1 | Select-String "device$" | Where-Object { $_ -notmatch "List of devices" }

if ($devices) {
    Write-Host "   ✓ Found connected device(s):" -ForegroundColor Green
    $devices | ForEach-Object { Write-Host "     - $_" -ForegroundColor Green }
} else {
    Write-Host "   ⚠ No devices connected" -ForegroundColor Yellow
    Write-Host "   → You need to start an Android emulator" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "   To start emulator:" -ForegroundColor Cyan
    Write-Host "   1. Open Android Studio" -ForegroundColor White
    Write-Host "   2. Tools → Device Manager" -ForegroundColor White
    Write-Host "   3. Click Play button on your emulator" -ForegroundColor White
    Write-Host "   4. Wait 2-3 minutes for it to boot" -ForegroundColor White
    Write-Host "   5. Run this script again" -ForegroundColor White
}
Write-Host ""

# Step 4: Check if in correct directory
Write-Host "Step 4: Checking project directory..." -ForegroundColor Yellow
$projectPath = "C:\Enrollment-System\enrollment-app"

if (Test-Path "$projectPath\package.json") {
    Write-Host "   ✓ Project found at: $projectPath" -ForegroundColor Green
} else {
    Write-Host "   ✗ Project not found!" -ForegroundColor Red
    $allGood = $false
}
Write-Host ""

# Step 5: Check Node.js
Write-Host "Step 5: Checking Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "   ✓ Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "   ✗ Node.js not found!" -ForegroundColor Red
    $allGood = $false
}
Write-Host ""

# Summary
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Summary" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

if ($devices) {
    Write-Host "✓ Setup looks good! Ready to start Expo." -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Navigate to project:" -ForegroundColor White
    Write-Host "   cd C:\Enrollment-System\enrollment-app" -ForegroundColor Gray
    Write-Host ""
    Write-Host "2. Start Expo with clean cache:" -ForegroundColor White
    Write-Host "   npx expo start --clear" -ForegroundColor Gray
    Write-Host ""
    Write-Host "3. Press 'a' to launch on Android" -ForegroundColor White
    Write-Host ""
    Write-Host "4. Login with default credentials:" -ForegroundColor White
    Write-Host "   Email: newtest@example.com" -ForegroundColor Gray
    Write-Host "   Password: password123" -ForegroundColor Gray
} else {
    Write-Host "⚠ Emulator not running" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Please start your Android emulator first:" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Option A: From Android Studio" -ForegroundColor White
    Write-Host "  1. Open Android Studio" -ForegroundColor Gray
    Write-Host "  2. Tools → Device Manager" -ForegroundColor Gray
    Write-Host "  3. Click Play button" -ForegroundColor Gray
    Write-Host "  4. Wait for emulator to boot" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Option B: From command line" -ForegroundColor White
    Write-Host "  List emulators:" -ForegroundColor Gray
    Write-Host "  & 'C:\Users\Giean Carlo\AppData\Local\Android\Sdk\emulator\emulator.exe' -list-avds" -ForegroundColor DarkGray
    Write-Host ""
    Write-Host "  Start emulator (replace with your AVD name):" -ForegroundColor Gray
    Write-Host "  & 'C:\Users\Giean Carlo\AppData\Local\Android\Sdk\emulator\emulator.exe' -avd Pixel_5_API_33" -ForegroundColor DarkGray
    Write-Host ""
    Write-Host "Then run this script again to verify connection." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Offer to start Expo if device is connected
if ($devices) {
    $response = Read-Host "Would you like to start Expo now? (y/n)"
    
    if ($response -eq 'y' -or $response -eq 'Y') {
        Write-Host ""
        Write-Host "Starting Expo with clean cache..." -ForegroundColor Cyan
        Set-Location $projectPath
        npx expo start --clear
    }
}
