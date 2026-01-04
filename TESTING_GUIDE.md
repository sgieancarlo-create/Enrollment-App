# 🧪 Testing Guide - Enrollment System

## 📋 Overview

This guide provides comprehensive testing instructions for the Senior High School Enrollment System. Follow these steps to test all implemented features.

---

## ✅ What Has Been Implemented

### **1. Core Infrastructure** ✅
- Firebase configuration with your credentials
- TypeScript types for all data models
- Utility functions (validation, formatting, constants)
- Service layer architecture (Auth, Database, Storage)
- State management (AuthContext, AppContext)

### **2. Authentication System** ✅
- **Login Screen** (`app/(auth)/login.tsx`)
  - Email/password authentication
  - Form validation
  - Error handling
  - "Remember me" functionality
  - Password reset link

- **Registration Screen** (`app/(auth)/register.tsx`)
  - Comprehensive student registration form
  - All required fields (personal, contact, family, academic)
  - Form validation with Philippine standards
  - LRN validation (12 digits)
  - Phone number validation (09XXXXXXXXX)
  - Password strength requirements

### **3. Services** ✅
- **Auth Service** (`src/services/auth.service.ts`)
  - Login, Register, Logout
  - Password reset
  - Auth state management

- **Database Service** (`src/services/database.service.ts`)
  - User CRUD operations
  - Subject management
  - Document management
  - Admin operations

- **Storage Service** (`src/services/storage.service.ts`)
  - File upload to Firebase Storage
  - File deletion
  - URL generation

### **4. Context Providers** ✅
- **AuthContext** - Authentication state management
- **AppContext** - Global app state management

---

## 🚀 Testing Prerequisites

### **Before You Start:**

1. **Firebase Setup** ✅ (Already configured)
   - Project: encab-3i-s-group-6
   - Authentication enabled
   - Firestore database ready
   - Storage bucket ready

2. **Development Environment** ✅
   - Node.js installed
   - Expo CLI ready
   - Dependencies installed

3. **Testing Device**
   - Option A: Expo Go app on Android phone
   - Option B: Android emulator
   - Option C: Web browser

---

## 📱 Testing Instructions

### **Step 1: Start the Development Server**

```powershell
cd "C:\Users\Giean Carlo\Desktop\Enrollment-System\enrollment-app"
npx expo start --clear
```

**Expected Output:**
- Metro bundler starts
- QR code appears
- No error messages

---

### **Step 2: Launch the App**

#### **Option A: Expo Go (Recommended)**
1. Install "Expo Go" from Google Play Store
2. Connect phone to same WiFi as computer
3. Scan QR code from terminal
4. App loads in 10-30 seconds

#### **Option B: Web Browser**
1. Press `w` in terminal
2. Browser opens at http://localhost:8081
3. Test basic functionality

#### **Option C: Android Emulator**
1. Start Android emulator
2. Press `a` in terminal
3. App installs and launches

---

### **Step 3: Test Registration Flow**

#### **Test Case 1: Valid Registration**

1. **Navigate to Registration**
   - App should show login screen first
   - Tap "Sign Up" or "Create Account" link

2. **Fill Out Form** (Use test data):
   ```
   Personal Information:
   - Last Name: Dela Cruz
   - First Name: Juan
   - Middle Initial: P
   - Birthdate: 2005-01-15
   - Birth Place: Manila, Philippines

   Contact Information:
   - Email: juan.delacruz@test.com
   - Phone: 09171234567
   - Phone 2: 09281234567 (optional)
   - Home Address 1: 123 Main St, Quezon City
   - Home Address 2: Metro Manila (optional)

   Family Information:
   - Mother's Name: Maria Dela Cruz
   - Father's Name: Pedro Dela Cruz
   - Guardian's Name: Maria Dela Cruz
   - Guardian's Contact: 09171234567
   - Guardian's Occupation: Teacher

   Academic Information:
   - LRN: 123456789012

   Account Security:
   - Password: Test@123456
   - Confirm Password: Test@123456
   ```

3. **Submit Form**
   - Tap "Create Account" button
   - Loading indicator should appear

4. **Verify Success**
   - Success alert should appear
   - Redirected to login screen

5. **Check Firebase Console**
   - Open https://console.firebase.google.com
   - Go to Authentication → Users
   - Verify new user created
   - Go to Firestore Database → users collection
   - Verify student data saved

**Expected Results:**
- ✅ Form validates all fields
- ✅ User created in Firebase Auth
- ✅ Student data saved to Firestore
- ✅ Success message displayed
- ✅ Redirected to login

#### **Test Case 2: Invalid Registration (Validation)**

Test each validation rule:

1. **Empty Fields**
   - Leave required fields empty
   - Try to submit
   - Should show "This field is required"

2. **Invalid Email**
   - Enter: "notanemail"
   - Should show "Invalid email address"

3. **Invalid Phone**
   - Enter: "12345"
   - Should show "Invalid phone number format"

4. **Invalid LRN**
   - Enter: "123" (less than 12 digits)
   - Should show "LRN must be exactly 12 digits"

5. **Password Mismatch**
   - Password: "Test@123456"
   - Confirm: "Different@123"
   - Should show "Passwords must match"

6. **Weak Password**
   - Enter: "weak"
   - Should show password requirements

**Expected Results:**
- ✅ All validation rules work
- ✅ Error messages display correctly
- ✅ Form doesn't submit with invalid data

---

### **Step 4: Test Login Flow**

#### **Test Case 3: Valid Login**

1. **Navigate to Login**
   - Should be on login screen after registration

2. **Enter Credentials**
   - Email: juan.delacruz@test.com
   - Password: Test@123456

3. **Submit**
   - Tap "Sign In" button
   - Loading indicator appears

4. **Verify Success**
   - Should redirect to main app
   - User should be authenticated

**Expected Results:**
- ✅ Login successful
- ✅ Redirected to dashboard/home
- ✅ User data loaded

#### **Test Case 4: Invalid Login**

1. **Wrong Password**
   - Email: juan.delacruz@test.com
   - Password: WrongPassword123
   - Should show "Invalid credentials" error

2. **Non-existent User**
   - Email: nonexistent@test.com
   - Password: Test@123456
   - Should show "User not found" error

3. **Empty Fields**
   - Leave fields empty
   - Should show validation errors

**Expected Results:**
- ✅ Appropriate error messages
- ✅ No access granted
- ✅ Form validation works

---

### **Step 5: Test Password Reset**

#### **Test Case 5: Password Reset**

1. **Navigate to Reset**
   - Tap "Forgot Password?" link

2. **Enter Email**
   - Email: juan.delacruz@test.com

3. **Submit**
   - Tap "Reset Password" button

4. **Check Email**
   - Check inbox for reset email
   - Follow link to reset password

**Expected Results:**
- ✅ Reset email sent
- ✅ Success message displayed
- ✅ Can reset password via email

---

### **Step 6: Test Authentication State**

#### **Test Case 6: Auth Persistence**

1. **Login Successfully**
   - Login with valid credentials

2. **Close App**
   - Close the app completely

3. **Reopen App**
   - Open app again

4. **Verify State**
   - Should still be logged in
   - User data should be loaded

**Expected Results:**
- ✅ Auth state persists
- ✅ No need to login again
- ✅ User data available

#### **Test Case 7: Logout**

1. **Navigate to Settings/Profile**
   - Find logout button

2. **Tap Logout**
   - Confirm logout

3. **Verify**
   - Redirected to login screen
   - Auth state cleared

**Expected Results:**
- ✅ Successfully logged out
- ✅ Redirected to login
- ✅ Cannot access protected screens

---

## 🐛 Common Issues & Solutions

### **Issue 1: App Won't Load**
**Solution:**
```powershell
# Clear cache and restart
npx expo start --clear
```

### **Issue 2: Firebase Connection Error**
**Solution:**
- Check internet connection
- Verify Firebase credentials in `src/config/firebase.ts`
- Check Firebase Console for project status

### **Issue 3: Validation Not Working**
**Solution:**
- Check console for errors
- Verify validation schemas in `src/utils/validation.ts`

### **Issue 4: Can't Connect with Expo Go**
**Solution:**
- Ensure same WiFi network
- Try tunnel mode: `npx expo start --tunnel`
- Manually enter URL in Expo Go

---

## ✅ Testing Checklist

### **Authentication**
- [ ] Registration with valid data works
- [ ] Registration validation catches errors
- [ ] Login with valid credentials works
- [ ] Login with invalid credentials fails appropriately
- [ ] Password reset sends email
- [ ] Auth state persists after app restart
- [ ] Logout works correctly

### **Firebase Integration**
- [ ] User data saves to Firestore
- [ ] User data loads from Firestore
- [ ] Authentication users created in Firebase Auth
- [ ] No console errors related to Firebase

### **UI/UX**
- [ ] All forms display correctly
- [ ] Loading indicators show during operations
- [ ] Error messages are clear and helpful
- [ ] Success messages display appropriately
- [ ] Navigation works smoothly

### **Data Validation**
- [ ] Email validation works
- [ ] Phone number validation works
- [ ] LRN validation works (12 digits)
- [ ] Password strength requirements enforced
- [ ] Required fields validated
- [ ] Optional fields work correctly

---

## 📊 Test Results Template

Use this template to document your testing:

```
## Test Session: [Date/Time]

### Environment:
- Device: [Expo Go / Emulator / Web]
- OS: [Android / iOS / Web Browser]
- Network: [WiFi / Mobile Data]

### Test Results:

#### Registration:
- Valid Registration: [✅ Pass / ❌ Fail]
- Validation: [✅ Pass / ❌ Fail]
- Firebase Save: [✅ Pass / ❌ Fail]
- Notes: [Any observations]

#### Login:
- Valid Login: [✅ Pass / ❌ Fail]
- Invalid Login: [✅ Pass / ❌ Fail]
- Auth Persistence: [✅ Pass / ❌ Fail]
- Notes: [Any observations]

#### Issues Found:
1. [Issue description]
2. [Issue description]

#### Screenshots:
[Attach screenshots if needed]
```

---

## 🎯 Next Steps After Testing

Once testing is complete:

1. **Report Results**
   - Document all test results
   - List any bugs or issues found
   - Provide screenshots if needed

2. **If Tests Pass:**
   - Proceed to implement remaining features
   - Update existing screens (Dashboard, Profile, etc.)
   - Add admin functionality

3. **If Tests Fail:**
   - Document specific failures
   - Provide error messages
   - Share console logs
   - I'll fix the issues

---

## 📞 Support

If you encounter any issues during testing:

1. Check the console for error messages
2. Review the troubleshooting section above
3. Check Firebase Console for backend issues
4. Provide detailed error information for assistance

---

**Happy Testing!** 🚀

Remember: Thorough testing now will save time later!
