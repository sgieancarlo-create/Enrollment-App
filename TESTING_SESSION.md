# 🧪 Critical-Path Testing Session

## ✅ Pre-Test Checklist
- [x] Development server running
- [x] Android emulator running (emulator-5554)
- [x] All critical errors fixed
- [ ] App launched on emulator
- [ ] Testing in progress

---

## 📱 Test Session Started

**Date:** Now
**Testing Type:** Critical-Path Testing (30 minutes)
**Device:** Android Emulator (emulator-5554)
**Tester:** User

---

## 🎯 Test Cases (5 Total)

### **Test 1: App Launch & Navigation** ⏳
**Time:** 5 minutes
**Status:** Not Started

**Steps:**
1. [ ] Launch app on emulator (press 'a' in terminal)
2. [ ] Wait for app to install and open
3. [ ] Verify login screen appears
4. [ ] Check for any error messages
5. [ ] Tap "Sign Up" link
6. [ ] Verify registration screen appears
7. [ ] Tap "Sign In" link
8. [ ] Verify returns to login screen

**Expected Results:**
- ✅ App launches without crashes
- ✅ Login screen displays correctly
- ✅ Navigation between screens works
- ✅ No error messages in console

**Actual Results:**
- [ ] Pass / [ ] Fail
- Notes: _____________________

---

### **Test 2: User Registration** ⏳
**Time:** 10 minutes
**Status:** Not Started

**Test Data to Use:**
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

**Steps:**
1. [ ] Navigate to registration screen
2. [ ] Fill in all required fields with test data above
3. [ ] Try submitting with invalid email (test validation)
4. [ ] Try submitting with invalid phone (test validation)
5. [ ] Try submitting with mismatched passwords
6. [ ] Fill in all fields correctly
7. [ ] Submit the form
8. [ ] Wait for success message
9. [ ] Verify redirect to login screen

**Expected Results:**
- ✅ Form validation catches invalid inputs
- ✅ Error messages display for invalid fields
- ✅ Valid data submits successfully
- ✅ Success message appears
- ✅ Redirects to login after registration

**Actual Results:**
- [ ] Pass / [ ] Fail
- Notes: _____________________

---

### **Test 3: User Login** ⏳
**Time:** 5 minutes
**Status:** Not Started

**Steps:**
1. [ ] On login screen, enter registered email
2. [ ] Enter registered password
3. [ ] Tap "Sign In" button
4. [ ] Wait for authentication
5. [ ] Verify redirect to main app
6. [ ] Check if user data loads

**Test Invalid Login:**
7. [ ] Logout (if logged in)
8. [ ] Try login with wrong password
9. [ ] Verify error message appears
10. [ ] Try login with non-existent email
11. [ ] Verify error message appears

**Expected Results:**
- ✅ Valid credentials log in successfully
- ✅ Invalid credentials show error
- ✅ Redirects to main app after login
- ✅ User data loads correctly

**Actual Results:**
- [ ] Pass / [ ] Fail
- Notes: _____________________

---

### **Test 4: Firebase Integration** ⏳
**Time:** 5 minutes
**Status:** Not Started

**Steps:**
1. [ ] Open Firebase Console (https://console.firebase.google.com)
2. [ ] Navigate to project: encab-3i-s-group-6
3. [ ] Go to Authentication section
4. [ ] Verify test user appears in user list
5. [ ] Check user email: test.user@example.com
6. [ ] Go to Firestore Database
7. [ ] Navigate to 'users' collection
8. [ ] Find user document by UID
9. [ ] Verify all user data is saved correctly
10. [ ] Check data structure matches schema

**Expected Results:**
- ✅ User appears in Firebase Authentication
- ✅ User data saved in Firestore
- ✅ All fields populated correctly
- ✅ Data structure is correct

**Actual Results:**
- [ ] Pass / [ ] Fail
- Notes: _____________________

---

### **Test 5: Auth Persistence** ⏳
**Time:** 5 minutes
**Status:** Not Started

**Steps:**
1. [ ] Ensure user is logged in
2. [ ] Close the app completely
3. [ ] Reopen the app
4. [ ] Verify user is still logged in
5. [ ] Verify user data still loads
6. [ ] Navigate to settings/profile
7. [ ] Find and tap logout button
8. [ ] Verify logout successful
9. [ ] Verify redirects to login screen
10. [ ] Try to access main app (should redirect to login)

**Expected Results:**
- ✅ User remains logged in after app restart
- ✅ Auth state persists correctly
- ✅ Logout works properly
- ✅ After logout, can't access protected routes

**Actual Results:**
- [ ] Pass / [ ] Fail
- Notes: _____________________

---

## 📊 Test Results Summary

### Overall Status: ⏳ In Progress

**Tests Completed:** 0 / 5
**Tests Passed:** 0
**Tests Failed:** 0
**Critical Issues Found:** 0

---

## 🐛 Issues Found

### Issue #1
- **Severity:** [ ] Critical / [ ] High / [ ] Medium / [ ] Low
- **Test Case:** _____________________
- **Description:** _____________________
- **Steps to Reproduce:** _____________________
- **Expected:** _____________________
- **Actual:** _____________________
- **Status:** [ ] Open / [ ] Fixed / [ ] Won't Fix

---

## ✅ Test Completion Checklist

- [ ] All 5 test cases executed
- [ ] Results documented
- [ ] Issues logged (if any)
- [ ] Screenshots taken (if needed)
- [ ] Firebase data verified
- [ ] Console logs checked
- [ ] Performance acceptable
- [ ] Ready for production

---

## 📝 Additional Notes

**Observations:**
_____________________

**Recommendations:**
_____________________

**Next Steps:**
_____________________

---

## 🎯 Success Criteria

For testing to be considered successful:
- ✅ All 5 test cases pass
- ✅ No critical bugs found
- ✅ Firebase integration working
- ✅ Auth flow complete
- ✅ No crashes or errors

---

**Testing Session Status:** 🟡 Ready to Begin

**Next Action:** Launch app on emulator (press 'a' in terminal)
