# 🧪 Execute Critical-Path Testing (30 Minutes)

## ✅ You Chose: Option A - Critical-Path Testing

This will test the 5 essential scenarios to verify core functionality works.

---

## 🚀 STEP 1: Restart Server with Clean Cache

### **Action Required:**

1. **Stop the old server:**
   - Go to the terminal where `yarn start` is running
   - Press **Ctrl+C**
   - Wait for it to fully stop

2. **Start fresh with cache cleared:**
   ```powershell
   cd C:\Enrollment-System\enrollment-app
   yarn start --clear
   ```

3. **Wait for Metro bundler to start:**
   - You should see: "Metro waiting on exp://..."
   - QR code appears
   - Menu shows: Press a | open Android, Press w | open web

**✅ Checkpoint:** Server running without errors

---

## 🚀 STEP 2: Launch the App

### **Choose ONE method:**

#### **Method A: Expo Go (Recommended)**
1. Open Expo Go app on your phone
2. Scan the QR code from terminal
3. Wait 10-30 seconds for app to load

#### **Method B: Android Emulator**
1. Make sure emulator is running (`adb devices` shows device)
2. Press `a` in terminal
3. Wait for app to install and launch

#### **Method C: Web Browser**
1. Press `w` in terminal
2. Browser opens at http://localhost:8081
3. Note: Some mobile features may not work

**✅ Checkpoint:** App launches and you see a screen (login or error)

---

## 🧪 TEST CASE 1: App Launch & Navigation (5 minutes)

### **What to Test:**

1. **App Launch:**
   - [ ] App opens without crashing
   - [ ] No error messages in terminal
   - [ ] Login screen is visible

2. **Navigation to Register:**
   - [ ] Tap "Sign Up" or "Create Account" button
   - [ ] Register screen appears
   - [ ] Form fields are visible (Name, Email, Password, etc.)

3. **Navigation to Forgot Password:**
   - [ ] Go back to login screen
   - [ ] Tap "Forgot Password?" link
   - [ ] Forgot password screen appears

4. **Navigation Back to Login:**
   - [ ] Use back button or "Sign In" link
   - [ ] Returns to login screen

### **Expected Results:**
✅ All navigation works smoothly
✅ No crashes or errors
✅ All screens render correctly

### **If Issues Found:**
❌ App crashes → Check terminal for error messages
❌ Screens don't appear → Check route configuration
❌ Navigation doesn't work → Check navigation setup

**Record Results:**
```
Test Case 1 Results:
- App Launch: PASS / FAIL
- Navigate to Register: PASS / FAIL
- Navigate to Forgot Password: PASS / FAIL
- Navigate Back: PASS / FAIL
- Issues Found: [describe any issues]
```

---

## 🧪 TEST CASE 2: User Registration (10 minutes)

### **What to Test:**

1. **Form Validation - Empty Fields:**
   - [ ] Leave all fields empty
   - [ ] Tap "Sign Up" button
   - [ ] Error messages appear for required fields

2. **Form Validation - Invalid Email:**
   - [ ] Enter invalid email (e.g., "notanemail")
   - [ ] Error message: "Invalid email format"

3. **Form Validation - Weak Password:**
   - [ ] Enter short password (e.g., "123")
   - [ ] Error message: "Password must be at least 6 characters"

4. **Form Validation - Password Mismatch:**
   - [ ] Enter different passwords in Password and Confirm Password
   - [ ] Error message: "Passwords do not match"

5. **Successful Registration:**
   - [ ] Fill all fields with valid data:
     - Name: "Test User"
     - Email: "test@example.com" (use unique email)
     - Password: "Test123!"
     - Confirm Password: "Test123!"
   - [ ] Tap "Sign Up"
   - [ ] Loading indicator appears
   - [ ] Success message or redirect to main app

6. **Verify in Firebase:**
   - [ ] Open Firebase Console (https://console.firebase.google.com)
   - [ ] Go to Authentication → Users
   - [ ] New user appears in list
   - [ ] Email matches what you entered

### **Expected Results:**
✅ All validations work correctly
✅ User account created in Firebase
✅ Success message or redirect occurs

### **If Issues Found:**
❌ Validation doesn't work → Check form validation logic
❌ Firebase error → Check Firebase configuration
❌ App crashes → Check error handling

**Record Results:**
```
Test Case 2 Results:
- Empty Field Validation: PASS / FAIL
- Email Validation: PASS / FAIL
- Password Validation: PASS / FAIL
- Password Match Validation: PASS / FAIL
- Successful Registration: PASS / FAIL
- Firebase User Created: PASS / FAIL
- Issues Found: [describe any issues]
```

---

## 🧪 TEST CASE 3: User Login (5 minutes)

### **What to Test:**

1. **Login with Invalid Credentials:**
   - [ ] Enter wrong email or password
   - [ ] Tap "Sign In"
   - [ ] Error message appears: "Invalid credentials" or similar

2. **Login with Valid Credentials:**
   - [ ] Enter the email and password you just registered
   - [ ] Tap "Sign In"
   - [ ] Loading indicator appears
   - [ ] Redirects to main app (tabs screen)

3. **Verify Main App:**
   - [ ] Tab bar is visible at bottom
   - [ ] Can navigate between tabs
   - [ ] Home screen shows content

### **Expected Results:**
✅ Invalid login shows error
✅ Valid login succeeds
✅ Redirects to main app
✅ User is authenticated

### **If Issues Found:**
❌ Login fails → Check Firebase Auth configuration
❌ No redirect → Check navigation logic
❌ Error messages → Check error handling

**Record Results:**
```
Test Case 3 Results:
- Invalid Login Error: PASS / FAIL
- Valid Login Success: PASS / FAIL
- Redirect to Main App: PASS / FAIL
- Tab Navigation: PASS / FAIL
- Issues Found: [describe any issues]
```

---

## 🧪 TEST CASE 4: Firebase Integration (5 minutes)

### **What to Test:**

1. **Check Firebase Console:**
   - [ ] Open Firebase Console
   - [ ] Go to Authentication → Users
   - [ ] Verify user is listed
   - [ ] Check user UID, email, creation date

2. **Check Authentication State:**
   - [ ] In the app, verify user is logged in
   - [ ] Check if user info is displayed (if applicable)
   - [ ] Verify auth token is valid

3. **Test Real-time Updates (if applicable):**
   - [ ] Make changes in Firebase Console
   - [ ] Verify app reflects changes

### **Expected Results:**
✅ User data in Firebase Console
✅ Auth state is correct
✅ Integration works properly

### **If Issues Found:**
❌ No user in Firebase → Check registration logic
❌ Auth state incorrect → Check AuthContext
❌ Data not syncing → Check Firebase config

**Record Results:**
```
Test Case 4 Results:
- User in Firebase Console: PASS / FAIL
- Auth State Correct: PASS / FAIL
- Data Syncing: PASS / FAIL
- Issues Found: [describe any issues]
```

---

## 🧪 TEST CASE 5: Auth Persistence (5 minutes)

### **What to Test:**

1. **Test Logout:**
   - [ ] Find logout button (usually in Settings or Profile)
   - [ ] Tap logout
   - [ ] Redirects to login screen
   - [ ] User is logged out

2. **Test Login Persistence:**
   - [ ] Login again with same credentials
   - [ ] Close the app completely
   - [ ] Reopen the app
   - [ ] User should still be logged in (no login screen)
   - [ ] Goes directly to main app

3. **Test Session Management:**
   - [ ] Verify AsyncStorage has auth token
   - [ ] Verify session persists across app restarts

### **Expected Results:**
✅ Logout works correctly
✅ Login persists after app restart
✅ Session management works

### **If Issues Found:**
❌ Logout doesn't work → Check logout logic
❌ Session doesn't persist → Check AsyncStorage
❌ Always shows login → Check auth initialization

**Record Results:**
```
Test Case 5 Results:
- Logout Works: PASS / FAIL
- Login Persists: PASS / FAIL
- Session Management: PASS / FAIL
- Issues Found: [describe any issues]
```

---

## 📊 FINAL RESULTS SUMMARY

After completing all 5 test cases, fill this out:

```
=== CRITICAL-PATH TESTING RESULTS ===

Test Case 1 - App Launch & Navigation: PASS / FAIL
Test Case 2 - User Registration: PASS / FAIL
Test Case 3 - User Login: PASS / FAIL
Test Case 4 - Firebase Integration: PASS / FAIL
Test Case 5 - Auth Persistence: PASS / FAIL

Overall Status: PASS / FAIL

Total Issues Found: [number]

Critical Issues (blocking):
1. [describe]
2. [describe]

Minor Issues (non-blocking):
1. [describe]
2. [describe]

Recommendations:
- [any recommendations]

Time Taken: [actual time]
```

---

## 🎯 What to Do After Testing

### **If All Tests PASS:**
✅ Task is complete!
✅ App is ready for use
✅ Document results
✅ Deploy if needed

### **If Some Tests FAIL:**
❌ Document the failures
❌ Report issues found
❌ I will fix the issues
❌ Re-test after fixes

---

## 📝 How to Report Results

After completing the tests, please provide:

1. **Overall Status:** Did all tests pass?
2. **Failed Tests:** Which tests failed and why?
3. **Error Messages:** Copy any error messages from terminal
4. **Screenshots:** If possible, share screenshots of issues
5. **Observations:** Any unexpected behavior?

---

## 🚀 Ready to Start?

1. **Stop old server** (Ctrl+C)
2. **Run:** `yarn start --clear`
3. **Launch app** (Expo Go, emulator, or web)
4. **Execute tests** (follow this guide)
5. **Report results**

**Let's begin testing!** 🧪
