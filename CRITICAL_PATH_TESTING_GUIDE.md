# 🧪 Critical-Path Testing Guide - AsyncStorage Implementation

## Status: Ready to Test in Web Browser

Metro bundler is running with no errors. Follow these tests in order.

---

## Test 1: Registration with Persistence ✅

**Steps:**
1. You should see the **Login screen** (if not, refresh browser)
2. Click **"Don't have an account? Sign Up"** link
3. Enter email: `test@example.com`
4. Enter password: `password123`
5. Click **"Sign Up"** button
6. Wait ~500ms (loading spinner should show)

**Expected Results:**
- ✅ Loading spinner appears on button
- ✅ After ~500ms, redirects to tabs screen
- ✅ No errors in console

**If it fails:**
- Check browser console for errors
- Verify you entered valid email/password
- Try refreshing and testing again

---

## Test 2: Auto-Login (Most Important!) ✅

**Steps:**
1. While logged in (from Test 1), **refresh the browser** (F5 or Ctrl+R)
2. Watch what happens

**Expected Results:**
- ✅ Brief loading spinner appears
- ✅ Automatically redirects to tabs screen (NOT login screen)
- ✅ You stay logged in without entering credentials
- ✅ No login screen shown

**If it fails:**
- Check if AsyncStorage is supported in your browser
- Open browser DevTools → Application → Local Storage
- Look for keys: `@mockAuth:users` and `@mockAuth:currentUser`
- If keys are missing, AsyncStorage might not be working

---

## Test 3: Sign Out ✅

**Steps:**
1. While logged in, click **Settings tab** (bottom navigation)
2. Scroll down to find **"Sign Out"** button (blue button)
3. Click **"Sign Out"**
4. A confirmation dialog should appear
5. Click **"Sign Out"** in the dialog

**Expected Results:**
- ✅ Confirmation dialog appears with "Are you sure?"
- ✅ After confirming, redirects to login screen
- ✅ User email cleared from Settings
- ✅ Session cleared from AsyncStorage

**If it fails:**
- Check if dialog appears
- Check console for errors
- Verify you're on Settings tab

---

## Test 4: Sign In After Sign Out ✅

**Steps:**
1. After signing out (from Test 3), you should be on login screen
2. Enter email: `test@example.com`
3. Enter password: `password123`
4. Click **"Sign In"** button
5. Wait ~500ms

**Expected Results:**
- ✅ Loading spinner appears
- ✅ After ~500ms, redirects to tabs screen
- ✅ Successfully logged in with saved credentials
- ✅ Email shows in Settings tab

**If it fails:**
- Verify you entered correct credentials
- Check if user was saved in Test 1
- Try registering again if needed

---

## Test 5: Multiple Users ✅

**Steps:**
1. Sign out (if logged in)
2. Go to Register screen
3. Create second user:
   - Email: `user2@example.com`
   - Password: `password456`
4. Click "Sign Up"
5. After redirect, sign out
6. Sign in as first user:
   - Email: `test@example.com`
   - Password: `password123`
7. Sign out
8. Sign in as second user:
   - Email: `user2@example.com`
   - Password: `password456`

**Expected Results:**
- ✅ Both users can be created
- ✅ Both users can sign in
- ✅ Credentials are remembered for both
- ✅ No "Email already in use" error for different emails
- ✅ Each user's email shows correctly in Settings

**If it fails:**
- Check if first user was saved
- Verify different emails used
- Check AsyncStorage for both users

---

## Test 6: Invalid Credentials ✅

**Steps:**
1. Sign out (if logged in)
2. On login screen, enter:
   - Email: `test@example.com`
   - Password: `wrongpassword`
3. Click "Sign In"

**Expected Results:**
- ✅ Error alert appears: "Invalid email or password"
- ✅ Stays on login screen
- ✅ Does NOT redirect to tabs
- ✅ Session NOT saved

**Additional Tests:**
- Try empty email → "Please fill in all fields"
- Try empty password → "Please fill in all fields"
- Try non-existent email → "Invalid email or password"

**If it fails:**
- Check if error alert appears
- Verify validation logic works
- Check console for errors

---

## Quick Verification Checklist

After completing all tests, verify:

- [ ] Test 1: Can register new user
- [ ] Test 2: Auto-login works after refresh
- [ ] Test 3: Sign out clears session
- [ ] Test 4: Can sign in with saved credentials
- [ ] Test 5: Multiple users work
- [ ] Test 6: Invalid credentials show errors

---

## Browser DevTools Check

**To verify AsyncStorage persistence:**

1. Open browser DevTools (F12)
2. Go to **Application** tab (Chrome) or **Storage** tab (Firefox)
3. Look for **Local Storage** → `http://localhost:8081`
4. You should see:
   - `@mockAuth:users` - Contains registered users
   - `@mockAuth:currentUser` - Contains current session

**Example values:**
```json
// @mockAuth:users
{"test@example.com":"password123","user2@example.com":"password456"}

// @mockAuth:currentUser
{"email":"test@example.com","uid":"abc123xyz"}
```

---

## Common Issues & Solutions

### Issue 1: Auto-login doesn't work
**Solution:**
- Check if AsyncStorage keys exist in DevTools
- Try clearing browser cache and testing again
- Verify browser supports localStorage

### Issue 2: Sign out doesn't clear session
**Solution:**
- Check if `@mockAuth:currentUser` is removed from storage
- Verify signOut() is called correctly
- Check console for errors

### Issue 3: Multiple users don't persist
**Solution:**
- Check if `@mockAuth:users` contains all users
- Verify each user has unique email
- Try clearing storage and re-testing

### Issue 4: Validation errors don't show
**Solution:**
- Check if alert() is blocked by browser
- Look for error in console instead
- Verify validation logic in mockAuth

---

## Success Criteria

All tests pass if:

✅ Can register new users
✅ Auto-login works after browser refresh
✅ Sign out clears session properly
✅ Can sign in with saved credentials
✅ Multiple users can be created and used
✅ Invalid credentials show appropriate errors
✅ No console errors during any test
✅ AsyncStorage keys visible in DevTools

---

## Report Results

After testing, please report:

1. **Which tests passed?** (1-6)
2. **Which tests failed?** (if any)
3. **Any errors in console?**
4. **AsyncStorage keys visible in DevTools?**

This will help me fix any issues before final completion.

---

**Current Status:** Ready to test!
**Estimated Time:** 5-10 minutes
**Browser:** http://localhost:8081
