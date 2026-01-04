# ✅ Critical-Path Testing Checklist (30 Minutes)

## 🎯 Goal
Test the core functionality of the enrollment system to ensure the main features work correctly.

---

## 📋 Pre-Testing Setup

### **Step 1: Fix npm Cache & Start Server**

Run in PowerShell (as Administrator):
```powershell
npm cache clean --force
cd "C:\Enrollment-System\enrollment-app"
Remove-Item package-lock.json -Force -ErrorAction SilentlyContinue
Remove-Item -Path "node_modules" -Recurse -Force -ErrorAction SilentlyContinue
npm install
npx expo start --clear
```

**Expected:** QR code appears, Metro bundler running

### **Step 2: Launch App**

**Option A: Expo Go (Recommended)**
- Install Expo Go from Play Store
- Scan QR code
- App loads

**Option B: Web Browser**
- Press `w` in terminal
- Browser opens at localhost:8081

---

## 🧪 Critical Test Cases (30 Minutes)

### **Test 1: User Registration** (10 minutes)

#### **1.1 Navigate to Registration**
- [ ] App loads successfully
- [ ] Login screen appears
- [ ] "Sign Up" or "Create Account" link visible
- [ ] Tap link → Registration screen appears

#### **1.2 Fill Registration Form**
Use this test data:
```
Personal Information:
- Last Name: TestUser
- First Name: Juan
- Middle Initial: A
- Birthdate: 2005-06-15
- Birth Place: Manila

Contact Information:
- Email: test.user@example.com
- Phone: 09171234567
- Home Address 1: 123 Test Street, Manila

Family Information:
- Mother's Name: Maria TestUser
- Father's Name: Pedro TestUser
- Guardian's Name: Maria TestUser
- Guardian's Contact: 09171234567
- Guardian's Occupation: Teacher

Academic Information:
- LRN: 123456789012

Account Security:
- Password: Test@123456
- Confirm Password: Test@123456
```

#### **1.3 Submit & Verify**
- [ ] Tap "Create Account" button
- [ ] Loading indicator appears
- [ ] Success message displays
- [ ] Redirected to login screen

#### **1.4 Verify in Firebase Console**
- [ ] Open https://console.firebase.google.com
- [ ] Go to your project (encab-3i-s-group-6)
- [ ] Authentication → Users → New user exists
- [ ] Firestore Database → users collection → User data saved

**✅ PASS if:** User created, data saved, redirected to login
**❌ FAIL if:** Error occurs, data not saved, or app crashes

---

### **Test 2: User Login** (5 minutes)

#### **2.1 Login with Valid Credentials**
- [ ] Enter email: test.user@example.com
- [ ] Enter password: Test@123456
- [ ] Tap "Sign In" button
- [ ] Loading indicator appears
- [ ] Successfully logged in
- [ ] Redirected to main app/dashboard

#### **2.2 Verify Authentication State**
- [ ] User data loaded
- [ ] Can navigate app
- [ ] No errors in console

**✅ PASS if:** Login successful, user authenticated, app accessible
**❌ FAIL if:** Login fails, errors occur, or stuck on login screen

---

### **Test 3: Form Validation** (5 minutes)

#### **3.1 Test Invalid Email**
- [ ] Go back to registration/login
- [ ] Enter invalid email: "notanemail"
- [ ] Try to submit
- [ ] Error message appears: "Invalid email address"

#### **3.2 Test Invalid Phone**
- [ ] Enter phone: "12345"
- [ ] Error message appears: "Invalid phone number format"

#### **3.3 Test Invalid LRN**
- [ ] Enter LRN: "123" (less than 12 digits)
- [ ] Error message appears: "LRN must be exactly 12 digits"

#### **3.4 Test Password Mismatch**
- [ ] Password: "Test@123456"
- [ ] Confirm: "Different@123"
- [ ] Error message appears: "Passwords must match"

**✅ PASS if:** All validation errors display correctly
**❌ FAIL if:** Invalid data accepted or no error messages

---

### **Test 4: Firebase Integration** (5 minutes)

#### **4.1 Check Firebase Console**

**Authentication:**
- [ ] Open Firebase Console → Authentication
- [ ] User appears in users list
- [ ] Email matches test.user@example.com
- [ ] User ID exists

**Firestore Database:**
- [ ] Open Firebase Console → Firestore Database
- [ ] "users" collection exists
- [ ] Document with user ID exists
- [ ] User data fields present:
  - [ ] firstName, lastName
  - [ ] email, phone
  - [ ] lrn
  - [ ] role: "student"
  - [ ] createdAt timestamp

**✅ PASS if:** All data saved correctly in Firebase
**❌ FAIL if:** Data missing or incorrect

---

### **Test 5: Auth Persistence** (5 minutes)

#### **5.1 Test Session Persistence**
- [ ] While logged in, close the app completely
- [ ] Reopen the app
- [ ] User still logged in (no login screen)
- [ ] User data still available

#### **5.2 Test Logout**
- [ ] Find logout button (in settings/profile)
- [ ] Tap logout
- [ ] Confirm logout
- [ ] Redirected to login screen
- [ ] Cannot access protected screens

**✅ PASS if:** Auth state persists and logout works
**❌ FAIL if:** User logged out unexpectedly or logout doesn't work

---

## 📊 Test Results Summary

### **Overall Results:**

| Test Case | Status | Notes |
|-----------|--------|-------|
| 1. Registration | ⬜ Pass / ⬜ Fail | |
| 2. Login | ⬜ Pass / ⬜ Fail | |
| 3. Validation | ⬜ Pass / ⬜ Fail | |
| 4. Firebase Integration | ⬜ Pass / ⬜ Fail | |
| 5. Auth Persistence | ⬜ Pass / ⬜ Fail | |

### **Issues Found:**
1. _[List any issues here]_
2. _[List any issues here]_

### **Screenshots:**
_[Attach screenshots if needed]_

---

## ✅ Success Criteria

**All Tests Pass If:**
- ✅ User can register successfully
- ✅ User can login with credentials
- ✅ Form validation works correctly
- ✅ Data saves to Firebase
- ✅ Auth state persists

**Critical Failures:**
- ❌ Cannot register users
- ❌ Cannot login
- ❌ Firebase not saving data
- ❌ App crashes during testing

---

## 🐛 Common Issues & Quick Fixes

### **Issue: "Firebase not initialized"**
**Fix:** Check `src/config/firebase.ts` has correct credentials

### **Issue: "Network request failed"**
**Fix:** Check internet connection, verify Firebase project active

### **Issue: "Validation not working"**
**Fix:** Check console for errors, verify validation schemas loaded

### **Issue: "Cannot connect to Metro"**
**Fix:** Restart server with `npx expo start --clear`

---

## 📞 After Testing

### **If All Tests Pass ✅**
Report back with:
- "All critical tests passed"
- Any minor issues noticed
- Ready to proceed with remaining features

### **If Tests Fail ❌**
Report back with:
- Which test(s) failed
- Error messages (exact text)
- Screenshots of errors
- Console logs if available

---

## 🎯 Next Steps After Critical Testing

Once critical-path testing is complete:

1. **If tests pass:** Proceed to implement remaining features
   - Dashboard enhancements
   - Profile management
   - Document upload
   - Admin features

2. **If tests fail:** Fix issues first
   - Debug and resolve errors
   - Re-test failed cases
   - Ensure core functionality works

---

## ⏱️ Time Estimate

- Setup & Start Server: 5 minutes
- Test 1 (Registration): 10 minutes
- Test 2 (Login): 5 minutes
- Test 3 (Validation): 5 minutes
- Test 4 (Firebase): 5 minutes
- Test 5 (Auth Persistence): 5 minutes
- **Total: ~35 minutes**

---

**Ready to begin critical-path testing!** 🚀

Start with fixing the npm cache, then follow this checklist step by step.
