# 🧪 Testing Guide - Ready to Test!

## ✅ Status: Metro Bundler Starting...

Metro is rebuilding the bundle cache. This will take about 1-2 minutes.

---

## 📋 Once Metro is Ready

You'll see output like this:
```
▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
█ ▄▄▄▄▄ █ [QR CODE] █
...

› Metro waiting on exp://...
› Press w │ open web
› Press a │ open Android
```

---

## 🎯 Testing Steps

### Step 1: Launch the App

**Option A: Web Browser (Easiest)**
1. Press `w` in the Metro terminal
2. Browser will open at http://localhost:8081

**Option B: Expo Go on Phone**
1. Open Expo Go app
2. Scan the QR code

**Option C: Android Emulator**
1. Make sure emulator is running
2. Press `a` in the Metro terminal

---

### Step 2: Verify Login Screen

**Expected:**
- ✅ Login screen appears
- ✅ Two input fields (Email, Password)
- ✅ "Sign In" button
- ✅ "Don't have an account? Sign Up" link
- ✅ No errors in console

**If you see errors:**
- Check Metro terminal for error messages
- Take a screenshot and share it

---

### Step 3: Test Navigation

1. Click "Don't have an account? Sign Up"
2. Should navigate to Register screen
3. Click "Already have an account? Sign In"
4. Should navigate back to Login screen

**Expected:**
- ✅ Smooth navigation
- ✅ No errors
- ✅ Screens load instantly

---

### Step 4: Test Registration

1. Go to Register screen
2. Enter email: `test@example.com`
3. Enter password: `password123`
4. Click "Sign Up" button

**Expected:**
- ✅ Button shows loading spinner
- ✅ After ~500ms, redirects to tabs screen
- ✅ No errors

**If it fails:**
- Check what error message appears
- Verify you entered valid credentials

---

### Step 5: Test Login

1. Reload the app (press `r` in Metro terminal)
2. Should show Login screen again
3. Enter email: `test@example.com`
4. Enter password: `password123`
5. Click "Sign In" button

**Expected:**
- ✅ Button shows loading spinner
- ✅ After ~500ms, redirects to tabs screen
- ✅ No errors

---

### Step 6: Test Validation

Try these to verify error handling:

**Test A: Empty Fields**
1. Leave fields empty
2. Click "Sign In"
3. Should show: "Please fill in all fields"

**Test B: Wrong Password**
1. Enter email: `test@example.com`
2. Enter password: `wrongpassword`
3. Click "Sign In"
4. Should show: "Invalid email or password"

**Test C: Short Password (Register)**
1. Go to Register screen
2. Enter email: `new@example.com`
3. Enter password: `12345` (only 5 chars)
4. Click "Sign Up"
5. Should show: "Password should be at least 6 characters"

**Test D: Duplicate Email (Register)**
1. Go to Register screen
2. Enter email: `test@example.com` (already registered)
3. Enter password: `password123`
4. Click "Sign Up"
5. Should show: "Email already in use"

---

## ✅ Success Criteria

All tests pass if:
- ✅ App launches without errors
- ✅ Login screen appears
- ✅ Navigation works smoothly
- ✅ Can create new account
- ✅ Can login with created account
- ✅ Redirects to tabs after auth
- ✅ Validation errors show correctly
- ✅ No console errors
- ✅ Loading states work

---

## 🐛 Common Issues & Solutions

### Issue 1: "Cannot find module 'mockAuth'"
**Solution:** Metro cache issue, restart with:
```bash
npx expo start --clear
```

### Issue 2: App shows blank screen
**Solution:** Check Metro terminal for errors, look for:
- Import errors
- Syntax errors
- Missing files

### Issue 3: Navigation doesn't work
**Solution:** Check if tabs route exists:
```bash
# Should have these files:
app/(tabs)/_layout.tsx
app/(tabs)/index.tsx
```

### Issue 4: "Cannot read property 'replace' of undefined"
**Solution:** Router not initialized, check app/_layout.tsx

---

## 📊 What to Report

After testing, please share:

1. **Which test option you used:**
   - [ ] Web browser
   - [ ] Expo Go
   - [ ] Android emulator

2. **Test results:**
   - [ ] Step 2: Login screen appeared
   - [ ] Step 3: Navigation worked
   - [ ] Step 4: Registration worked
   - [ ] Step 5: Login worked
   - [ ] Step 6: Validation worked

3. **Any errors:**
   - Screenshot of error
   - Error message from Metro terminal
   - Which step failed

4. **Overall status:**
   - [ ] ✅ All tests passed
   - [ ] ⚠️ Some tests failed
   - [ ] ❌ App didn't launch

---

## 🎉 If All Tests Pass

Congratulations! The app is working correctly:
- ✅ Routing is fixed
- ✅ Authentication flow works
- ✅ Mock auth system works
- ✅ No Firebase errors
- ✅ Ready for next phase

**Next steps:**
- Add more features
- Integrate real Firebase (optional)
- Build for production
- Deploy

---

**Current Status:** Waiting for Metro to finish bundling...
**ETA:** ~1-2 minutes
