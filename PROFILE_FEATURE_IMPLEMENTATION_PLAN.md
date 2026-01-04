# 📋 Profile & User Settings Feature - Implementation Plan

## 🎯 Goal
Add a Profile & User Settings feature that allows authenticated users to view and update their profile information (name, email, password) with AsyncStorage persistence.

---

## 📂 Files to Modify/Create

### 1. **src/config/mockAuth.ts** - Extend with profile update functionality
**Changes:**
- Add `name` field to User interface
- Add `updateProfile()` method
- Add `updatePassword()` method
- Store user names in AsyncStorage
- Update existing methods to handle name field

### 2. **src/context/AuthProvider.tsx** - Add update methods
**Changes:**
- Update User interface to include `name`
- Add `updateProfile()` method to context
- Add `updatePassword()` method to context
- Update state after profile changes

### 3. **app/(tabs)/profile.tsx** - Complete rewrite
**Changes:**
- Replace static UI with functional profile editor
- Add form state management
- Add validation logic
- Integrate with useAuth()
- Add loading states
- Add success/error alerts

---

## 🔧 Implementation Steps

### Step 1: Update mockAuth.ts

**Add to User interface:**
```typescript
interface User {
  email: string;
  uid: string;
  name?: string;  // NEW
}
```

**Add new methods:**
```typescript
updateProfile: async (email: string, updates: { name?: string }): Promise<User>
updatePassword: async (email: string, currentPassword: string, newPassword: string): Promise<void>
```

**Storage structure:**
```typescript
{
  "@mockAuth:users": {
    "user@example.com": {
      "password": "password123",
      "name": "John Doe"  // NEW
    }
  },
  "@mockAuth:currentUser": {
    "email": "user@example.com",
    "uid": "abc123",
    "name": "John Doe"  // NEW
  }
}
```

### Step 2: Update AuthProvider.tsx

**Add to AuthContextType:**
```typescript
interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name?: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: { name?: string }) => Promise<void>;  // NEW
  updatePassword: (currentPassword: string, newPassword: string) => Promise<void>;  // NEW
}
```

### Step 3: Implement Profile Screen

**Features:**
1. **Profile Information Section**
   - Email (read-only, from auth)
   - Name (editable TextInput)
   - Save Changes button

2. **Change Password Section**
   - Current Password input
   - New Password input
   - Confirm Password input
   - Change Password button

3. **Validation**
   - Name: optional, but if provided must be non-empty
   - Current password: required, must match stored password
   - New password: min 6 characters
   - Confirm password: must match new password

4. **UI States**
   - Loading indicator during updates
   - Success alerts
   - Error alerts
   - Disabled buttons during loading

---

## 🎨 UI/UX Design

### Layout Structure:
```
┌─────────────────────────────────┐
│  Profile & Settings             │
│  ─────────────────────────────  │
│                                 │
│  📧 Email (read-only)           │
│  user@example.com               │
│                                 │
│  👤 Name                        │
│  [John Doe____________]         │
│                                 │
│  [Save Changes]                 │
│                                 │
│  ─────────────────────────────  │
│  Change Password                │
│  ─────────────────────────────  │
│                                 │
│  🔒 Current Password            │
│  [••••••••••••________]         │
│                                 │
│  🔑 New Password                │
│  [••••••••••••________]         │
│                                 │
│  ✓ Confirm Password             │
│  [••••••••••••________]         │
│                                 │
│  [Change Password]              │
│                                 │
└─────────────────────────────────┘
```

---

## ✅ Testing Checklist

### Test 1: Update Name
- [ ] Enter new name
- [ ] Click Save Changes
- [ ] Verify success alert
- [ ] Refresh page
- [ ] Verify name persists

### Test 2: Change Password
- [ ] Enter current password
- [ ] Enter new password (min 6 chars)
- [ ] Confirm new password
- [ ] Click Change Password
- [ ] Verify success alert
- [ ] Sign out
- [ ] Try old password → should fail
- [ ] Try new password → should succeed

### Test 3: Validation - Invalid Current Password
- [ ] Enter wrong current password
- [ ] Enter new password
- [ ] Click Change Password
- [ ] Verify error alert

### Test 4: Validation - Password Too Short
- [ ] Enter current password
- [ ] Enter new password (< 6 chars)
- [ ] Click Change Password
- [ ] Verify error alert

### Test 5: Validation - Passwords Don't Match
- [ ] Enter current password
- [ ] Enter new password
- [ ] Enter different confirm password
- [ ] Click Change Password
- [ ] Verify error alert

### Test 6: Auth Guard
- [ ] Sign out
- [ ] Try to navigate to profile
- [ ] Verify redirect to login

### Test 7: Empty Name
- [ ] Clear name field
- [ ] Click Save Changes
- [ ] Verify error alert (name required)

### Test 8: Loading States
- [ ] Click Save Changes
- [ ] Verify button disabled during save
- [ ] Verify loading indicator appears

---

## 🔐 Security Considerations

**Current Implementation (Mock):**
- ✅ Passwords stored in plain text (development only)
- ✅ No encryption (mock system)
- ✅ Local storage only

**For Production:**
- ⚠️ Use proper password hashing (bcrypt)
- ⚠️ Implement secure token storage
- ⚠️ Add rate limiting
- ⚠️ Add password strength requirements
- ⚠️ Add email verification
- ⚠️ Use HTTPS for all requests

---

## 📊 Data Flow

### Update Profile Flow:
```
User enters name
  ↓
Clicks "Save Changes"
  ↓
Validation (name not empty)
  ↓
AuthProvider.updateProfile()
  ↓
mockAuth.updateProfile()
  ↓
Update in-memory users map
  ↓
Save to AsyncStorage
  ↓
Update current user in AsyncStorage
  ↓
Update AuthProvider state
  ↓
Show success alert
  ↓
UI reflects new name
```

### Change Password Flow:
```
User enters passwords
  ↓
Clicks "Change Password"
  ↓
Validation:
  - Current password correct?
  - New password >= 6 chars?
  - Passwords match?
  ↓
AuthProvider.updatePassword()
  ↓
mockAuth.updatePassword()
  ↓
Verify current password
  ↓
Update password in users map
  ↓
Save to AsyncStorage
  ↓
Show success alert
  ↓
Clear password fields
```

---

## 🚀 Implementation Order

1. **Update mockAuth.ts** (backend logic)
   - Add name to User interface
   - Implement updateProfile()
   - Implement updatePassword()
   - Update storage structure

2. **Update AuthProvider.tsx** (state management)
   - Add name to User interface
   - Add updateProfile() to context
   - Add updatePassword() to context
   - Update signUp() to accept name

3. **Implement profile.tsx** (UI)
   - Create form state
   - Add validation logic
   - Integrate with useAuth()
   - Add loading states
   - Add alerts

4. **Test thoroughly**
   - Run all test scenarios
   - Verify persistence
   - Verify validation
   - Verify auth guard

---

## 📝 Code Style Guidelines

- Use TypeScript for all files
- Use async/await for async operations
- Use try/catch for error handling
- Use Alert.alert for user feedback
- Use consistent naming conventions
- Add console.log for debugging
- Add comments for complex logic

---

## 🎉 Expected Outcome

A fully functional Profile & User Settings screen where users can:
- ✅ View their email (read-only)
- ✅ Edit their name
- ✅ Change their password
- ✅ See immediate updates
- ✅ Have changes persist across reloads
- ✅ Get proper validation and error messages
- ✅ Experience smooth loading states

All while maintaining:
- ✅ Session persistence
- ✅ Auth guard functionality
- ✅ Expo Go compatibility
- ✅ TypeScript type safety
- ✅ Clean, maintainable code

---

**Ready to implement!** 🚀
