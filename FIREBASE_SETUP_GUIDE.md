# Firebase Setup Guide

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"**
3. Enter project name: `shs-enrollment-system` (or your preferred name)
4. Disable Google Analytics (optional for this project)
5. Click **"Create project"**

---

## Step 2: Register Your App

1. In Firebase Console, click the **Web icon** (</>) to add a web app
2. Enter app nickname: `SHS Enrollment App`
3. Check **"Also set up Firebase Hosting"** (optional)
4. Click **"Register app"**
5. **Copy the Firebase configuration** - you'll need this!

It will look like this:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

---

## Step 3: Enable Authentication

1. In Firebase Console, go to **Build** → **Authentication**
2. Click **"Get started"**
3. Go to **"Sign-in method"** tab
4. Enable **"Email/Password"**
   - Click on "Email/Password"
   - Toggle **"Enable"**
   - Click **"Save"**

---

## Step 4: Create Firestore Database

1. In Firebase Console, go to **Build** → **Firestore Database**
2. Click **"Create database"**
3. Select **"Start in test mode"** (we'll add security rules later)
4. Choose location: **asia-southeast1** (Singapore - closest to Philippines)
5. Click **"Enable"**

---

## Step 5: Enable Storage

1. In Firebase Console, go to **Build** → **Storage**
2. Click **"Get started"**
3. Select **"Start in test mode"**
4. Click **"Next"**
5. Choose location: **asia-southeast1**
6. Click **"Done"**

---

## Step 6: Configure Your App

1. Open `src/config/firebase.ts`
2. Replace the placeholder values with your Firebase configuration:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",              // Replace with your apiKey
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",  // Replace with your authDomain
  projectId: "YOUR_PROJECT_ID",        // Replace with your projectId
  storageBucket: "YOUR_PROJECT_ID.appspot.com",   // Replace with your storageBucket
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",  // Replace with your messagingSenderId
  appId: "YOUR_APP_ID"                 // Replace with your appId
};
```

3. Save the file

---

## Step 7: Set Up Firestore Security Rules

1. In Firebase Console, go to **Firestore Database** → **Rules**
2. Replace the default rules with these:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }
    
    function isAdmin() {
      return isAuthenticated() && 
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Users collection
    match /users/{userId} {
      allow read: if isAuthenticated();
      allow create: if isAuthenticated();
      allow update: if isOwner(userId) || isAdmin();
      allow delete: if isAdmin();
    }
    
    // Students collection
    match /students/{studentId} {
      allow read: if isAuthenticated();
      allow create: if isAuthenticated();
      allow update: if isOwner(studentId) || isAdmin();
      allow delete: if isAdmin();
    }
    
    // Subjects collection
    match /subjects/{subjectId} {
      allow read: if isAuthenticated();
      allow write: if isAdmin();
    }
    
    // Documents collection
    match /documents/{documentId} {
      allow read: if isAuthenticated();
      allow create: if isAuthenticated();
      allow update: if isAdmin() || 
                      (isAuthenticated() && 
                       resource.data.studentId == request.auth.uid);
      allow delete: if isAdmin() || 
                      (isAuthenticated() && 
                       resource.data.studentId == request.auth.uid);
    }
    
    // Enrollments collection
    match /enrollments/{enrollmentId} {
      allow read: if isAuthenticated();
      allow create: if isAuthenticated();
      allow update, delete: if isAdmin();
    }
    
    // Strands collection
    match /strands/{strandId} {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    // Announcements collection
    match /announcements/{announcementId} {
      allow read: if isAuthenticated();
      allow write: if isAdmin();
    }
  }
}
```

3. Click **"Publish"**

---

## Step 8: Set Up Storage Security Rules

1. In Firebase Console, go to **Storage** → **Rules**
2. Replace the default rules with these:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isAdmin() {
      return request.auth != null && 
             firestore.get(/databases/(default)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    function isValidFileType() {
      return request.resource.contentType.matches('image/.*') ||
             request.resource.contentType == 'application/pdf' ||
             request.resource.contentType == 'application/msword' ||
             request.resource.contentType == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    }
    
    function isValidFileSize() {
      return request.resource.size < 10 * 1024 * 1024; // 10MB
    }
    
    // Documents folder
    match /documents/{userId}/{fileName} {
      allow read: if isAuthenticated();
      allow write: if isAuthenticated() && 
                     request.auth.uid == userId && 
                     isValidFileType() && 
                     isValidFileSize();
      allow delete: if isAuthenticated() && 
                      (request.auth.uid == userId || isAdmin());
    }
    
    // Profile pictures folder
    match /profiles/{userId}/{fileName} {
      allow read: if true;
      allow write: if isAuthenticated() && 
                     request.auth.uid == userId && 
                     request.resource.contentType.matches('image/.*') && 
                     isValidFileSize();
      allow delete: if isAuthenticated() && 
                      (request.auth.uid == userId || isAdmin());
    }
  }
}
```

3. Click **"Publish"**

---

## Step 9: Create Initial Admin Account

### Option A: Using Firebase Console

1. Go to **Authentication** → **Users**
2. Click **"Add user"**
3. Enter email: `admin@school.edu.ph` (or your preferred admin email)
4. Enter password: (create a strong password)
5. Click **"Add user"**
6. Copy the **User UID**
7. Go to **Firestore Database**
8. Click **"Start collection"**
9. Collection ID: `users`
10. Document ID: (paste the User UID)
11. Add fields:
    - `email` (string): `admin@school.edu.ph`
    - `role` (string): `admin`
    - `createdAt` (timestamp): (current time)
    - `updatedAt` (timestamp): (current time)
12. Click **"Save"**

### Option B: Using the App (After First Run)

1. Register a normal account through the app
2. Go to Firebase Console → Firestore Database
3. Find the user document in the `users` collection
4. Edit the document and change `role` from `student` to `admin`
5. Log out and log back in

---

## Step 10: Initialize Firestore Collections

### Create Strands Collection

1. Go to **Firestore Database**
2. Click **"Start collection"**
3. Collection ID: `strands`
4. Create 4 documents with these IDs and data:

**Document ID: HUMSS**
```
code: "HUMSS"
fullName: "Humanities and Social Sciences"
description: "Focus on human behavior, societal issues, and cultural studies"
```

**Document ID: STEM**
```
code: "STEM"
fullName: "Science, Technology, Engineering, and Mathematics"
description: "Focus on scientific and mathematical concepts"
```

**Document ID: ABM**
```
code: "ABM"
fullName: "Accountancy, Business, and Management"
description: "Focus on business, entrepreneurship, and financial management"
```

**Document ID: ALS**
```
code: "ALS"
fullName: "Alternative Learning System"
description: "Alternative education pathway for out-of-school youth and adults"
```

---

## Step 11: Test the Connection

1. Start your Expo development server:
   ```bash
   cd C:\Enrollment-System\enrollment-app
   npx expo start
   ```

2. The app should now connect to Firebase
3. Try registering a new account
4. Check Firebase Console → Authentication to see if the user was created
5. Check Firestore Database to see if the user and student documents were created

---

## Step 12: Add Sample Subjects (Optional)

1. Go to **Firestore Database**
2. Create collection: `subjects`
3. Add sample subjects:

**Example Subject:**
```
code: "ENG11"
name: "English for Academic and Professional Purposes"
description: "Develop communication skills for academic and professional contexts"
gradeLevel: 11
teacherName: "Ms. Maria Santos"
teacherContact: "09171234567"
schedule: {
  day: "Monday",
  time: "8:00 AM - 9:30 AM",
  room: "Room 101"
}
capacity: 40
enrolledCount: 0
createdAt: (current timestamp)
updatedAt: (current timestamp)
```

---

## Troubleshooting

### Error: "Firebase: Error (auth/configuration-not-found)"
- Make sure you've enabled Email/Password authentication in Firebase Console

### Error: "Missing or insufficient permissions"
- Check your Firestore security rules
- Make sure you're authenticated before accessing data

### Error: "Storage object not found"
- Make sure you've enabled Firebase Storage
- Check your Storage security rules

### Can't connect to Firebase
- Check your internet connection
- Verify your Firebase configuration in `src/config/firebase.ts`
- Make sure your Firebase project is active

---

## Next Steps

After completing this setup:

1. ✅ Firebase project created
2. ✅ Authentication enabled
3. ✅ Firestore database created
4. ✅ Storage enabled
5. ✅ Security rules configured
6. ✅ Admin account created
7. ✅ Initial data added

You're now ready to use the app with full backend functionality!

---

## Important Notes

- **Never commit your Firebase configuration to public repositories**
- Consider using environment variables for production
- Regularly backup your Firestore data
- Monitor Firebase usage in the Console
- Update security rules as needed
- Keep your Firebase SDK updated

---

## Firebase Console Quick Links

- **Authentication**: https://console.firebase.google.com/project/YOUR_PROJECT/authentication
- **Firestore**: https://console.firebase.google.com/project/YOUR_PROJECT/firestore
- **Storage**: https://console.firebase.google.com/project/YOUR_PROJECT/storage
- **Usage**: https://console.firebase.google.com/project/YOUR_PROJECT/usage

Replace `YOUR_PROJECT` with your actual project ID.
