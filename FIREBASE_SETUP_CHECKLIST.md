# Firebase Setup Checklist - Quick Reference

## ⏱️ Estimated Time: 15 minutes

Follow these steps in order. Check each box as you complete it.

---

## Step 1: Create Firebase Project (3 minutes)

- [ ] Go to https://console.firebase.google.com/
- [ ] Click "Add project" or "Create a project"
- [ ] Enter project name: `shs-enrollment-system`
- [ ] Disable Google Analytics (optional)
- [ ] Click "Create project"
- [ ] Wait for project to be created
- [ ] Click "Continue"

---

## Step 2: Add Web App (2 minutes)

- [ ] In Firebase Console, click the **Web icon** (</>)
- [ ] Enter app nickname: `SHS Enrollment App`
- [ ] **DO NOT** check "Also set up Firebase Hosting"
- [ ] Click "Register app"
- [ ] **COPY the firebaseConfig object** - you'll need this!

```javascript
// It looks like this:
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123...",
  appId: "1:123..."
};
```

- [ ] Click "Continue to console"

---

## Step 3: Enable Authentication (2 minutes)

- [ ] In left sidebar, click **"Build"** → **"Authentication"**
- [ ] Click **"Get started"**
- [ ] Click **"Sign-in method"** tab
- [ ] Click on **"Email/Password"**
- [ ] Toggle **"Enable"** to ON
- [ ] Click **"Save"**

---

## Step 4: Create Firestore Database (3 minutes)

- [ ] In left sidebar, click **"Build"** → **"Firestore Database"**
- [ ] Click **"Create database"**
- [ ] Select **"Start in test mode"**
- [ ] Click **"Next"**
- [ ] Choose location: **"asia-southeast1 (Singapore)"**
- [ ] Click **"Enable"**
- [ ] Wait for database to be created

---

## Step 5: Enable Storage (2 minutes)

- [ ] In left sidebar, click **"Build"** → **"Storage"**
- [ ] Click **"Get started"**
- [ ] Select **"Start in test mode"**
- [ ] Click **"Next"**
- [ ] Location should be **"asia-southeast1"** (same as Firestore)
- [ ] Click **"Done"**

---

## Step 6: Copy Your Configuration (1 minute)

- [ ] Go to **Project Settings** (gear icon in left sidebar)
- [ ] Scroll down to **"Your apps"** section
- [ ] Find your web app
- [ ] Click **"Config"** radio button (not "npm")
- [ ] Copy the entire `firebaseConfig` object

---

## ✅ You're Done!

Now provide me with your Firebase configuration in this format:

```
apiKey: YOUR_API_KEY
authDomain: YOUR_AUTH_DOMAIN
projectId: YOUR_PROJECT_ID
storageBucket: YOUR_STORAGE_BUCKET
messagingSenderId: YOUR_MESSAGING_SENDER_ID
appId: YOUR_APP_ID
```

---

## 🔒 Security Note

**IMPORTANT**: 
- Don't share your Firebase config publicly
- It's safe to use in your app (Firebase has security rules)
- But don't commit it to public GitHub repositories

---

## ❓ Need Help?

If you encounter any issues:

1. **Can't find Firebase Console**: Make sure you're logged in with your Google account
2. **Project creation failed**: Try a different project name
3. **Can't enable services**: Make sure you're on the correct project
4. **Lost your config**: Go to Project Settings → Your apps → Config

---

## 📱 After You Provide the Config

I will:
1. Update the Firebase configuration file
2. Continue implementing all features
3. Test the connection
4. Complete Phase 1 implementation

---

**Ready? Start with Step 1 and work your way down!**

When you're done, just paste your Firebase configuration here.
