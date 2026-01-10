# Phase 1 Implementation Plan - SHS Enrollment System

## Overview
Implementing core features with Firebase backend, mobile app with admin mode, and separate admin web panel.

---

## Phase 1 Scope (3-4 hours)

### ✅ What Will Be Implemented

#### 1. Firebase Backend Setup
- Firebase project configuration
- Firestore database structure
- Firebase Authentication
- Firebase Storage for documents
- Security rules

#### 2. Mobile App - Authentication
- **Register Screen**
  - Personal information form (all required fields)
  - Email validation
  - Password requirements
  - Form validation
- **Login Screen**
  - Email/password login
  - Remember me option
  - Error handling
- **Forgot Password**
  - Email input
  - OTP generation and verification
  - Password reset

#### 3. Mobile App - Profile Tab (Updated)
**Personal Information:**
- Last Name, First Name, Middle Initial
- Birthdate, Birth Place
- Email, Phone Number, Phone Number 2 (optional)
- Home Address 1, Home Address 2 (optional)

**Family Information:**
- Mother's Name, Father's Name
- Guardian's Name, Contact Number, Occupation

**Academic Information:**
- LRN (Learner Reference Number)
- Strand (HUMSS/STEM/ABM/ALS) - admin editable only
- Grade Level (Grade 11/Grade 12)
- GPA

**Features:**
- View profile
- Edit personal info (students)
- Read-only academic info (admin editable)
- Profile picture upload

#### 4. Mobile App - Subjects Tab (Renamed from Courses)
- **Subject List**
  - Subject name
  - Teacher name
  - Schedule (time and date)
  - Grade level indicator
- **Subject Details**
  - Full information
  - Teacher contact
  - Class schedule
  - Room/location
- **Real-time updates** from Firebase

#### 5. Mobile App - Document Upload (Functional)
- **File picker integration**
  - PDF, DOC, DOCX, JPG, PNG support
  - File size validation (max 10MB)
- **Upload to Firebase Storage**
  - Progress indicator
  - Success/error handling
- **Document management**
  - View uploaded documents
  - Delete documents
  - Track verification status
- **Requirements checklist**
  - Dynamic from Firebase
  - Status tracking

#### 6. Mobile App - Dashboard (Updated)
- **Remove:**
  - Fees & Payments card
  - Recent Payments section
- **Keep & Make Functional:**
  - Enrollment Status (real data)
  - Documents count (real data)
  - Subjects count (real data)
  - Verification status (real data)

#### 7. Mobile App - Admin Mode (In-App)
- **Admin Login**
  - Separate admin credentials
  - Role-based access
- **Admin Dashboard**
  - Student statistics
  - Pending verifications
  - Recent activities
- **Student Management**
  - View all students
  - Search students
  - Edit student info
  - Assign strand
  - Set grade level
- **Document Verification**
  - View uploaded documents
  - Approve/Reject
  - Add notes
- **Subject Management**
  - Create/Edit subjects
  - Assign teachers
  - Set schedules

#### 8. State Management
- Context API for global state
- User authentication state
- Profile data state
- Subjects data state
- Documents state

#### 9. API Service Layer
- Firebase service wrapper
- Authentication service
- Database service
- Storage service
- Error handling
- Offline support

---

## Phase 2 (Future Implementation)

### Features for Next Phase:
1. **Announcements Tab**
   - Create/view announcements
   - Push notifications
   - Facebook sync
2. **Admin Web Panel** (Separate React app)
   - Full admin dashboard
   - Advanced reporting
   - Bulk operations
3. **Advanced Features**
   - Re-enrollment process
   - Dropping process
   - Reports and analytics
   - Email notifications
4. **Enhancements**
   - Offline mode
   - Data export
   - Advanced search
   - Batch uploads

---

## Technical Architecture

### Database Structure (Firestore)

```
users/
  {userId}/
    - email
    - role (student/admin)
    - createdAt
    - updatedAt

students/
  {studentId}/
    - userId (reference)
    - lrn
    - lastName
    - firstName
    - middleInitial
    - birthdate
    - birthPlace
    - email
    - phone
    - phone2
    - homeAddress1
    - homeAddress2
    - motherName
    - fatherName
    - guardianName
    - guardianContact
    - guardianOccupation
    - strand (HUMSS/STEM/ABM/ALS)
    - gradeLevel (11/12)
    - gpa
    - enrollmentStatus
    - profilePicture
    - createdAt
    - updatedAt

subjects/
  {subjectId}/
    - code
    - name
    - description
    - gradeLevel
    - teacherName
    - teacherContact
    - schedule
      - day
      - time
      - room
    - capacity
    - enrolledCount
    - createdAt
    - updatedAt

documents/
  {documentId}/
    - studentId (reference)
    - type
    - fileName
    - fileUrl
    - fileSize
    - uploadDate
    - verificationStatus (pending/verified/rejected)
    - verifiedBy
    - verificationDate
    - notes

enrollments/
  {enrollmentId}/
    - studentId (reference)
    - subjectId (reference)
    - enrolledAt
    - status

strands/
  {strandCode}/
    - code (HUMSS/STEM/ABM/ALS)
    - fullName
    - description
```

### File Structure

```
enrollment-app/
├── src/
│   ├── config/
│   │   └── firebase.ts
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── database.service.ts
│   │   ├── storage.service.ts
│   │   └── api.service.ts
│   ├── context/
│   │   ├── AuthContext.tsx
│   │   ├── ProfileContext.tsx
│   │   └── AppContext.tsx
│   ├── types/
│   │   ├── student.types.ts
│   │   ├── subject.types.ts
│   │   ├── document.types.ts
│   │   └── index.ts
│   ├── utils/
│   │   ├── validation.ts
│   │   ├── formatters.ts
│   │   └── constants.ts
│   ├── components/
│   │   ├── common/
│   │   ├── forms/
│   │   └── cards/
│   └── screens/
│       ├── auth/
│       │   ├── LoginScreen.tsx
│       │   ├── RegisterScreen.tsx
│       │   └── ForgotPasswordScreen.tsx
│       ├── student/
│       │   └── (existing tabs)
│       └── admin/
│           ├── AdminDashboard.tsx
│           ├── StudentManagement.tsx
│           └── DocumentVerification.tsx
├── app/
│   ├── (auth)/
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   └── forgot-password.tsx
│   ├── (tabs)/
│   │   └── (existing)
│   └── (admin)/
│       ├── dashboard.tsx
│       ├── students.tsx
│       └── documents.tsx
└── assets/
```

---

## Dependencies to Install

```json
{
  "firebase": "^10.7.1",
  "@react-native-async-storage/async-storage": "^1.21.0",
  "react-hook-form": "^7.49.2",
  "yup": "^1.3.3",
  "@hookform/resolvers": "^3.3.3",
  "date-fns": "^3.0.6"
}
```

---

## Implementation Steps

### Step 1: Firebase Setup (30 min)
1. Create Firebase project
2. Enable Authentication (Email/Password)
3. Create Firestore database
4. Enable Storage
5. Configure security rules
6. Add Firebase config to app

### Step 2: Project Structure (20 min)
1. Create folder structure
2. Set up TypeScript types
3. Create service layer
4. Set up Context providers

### Step 3: Authentication (60 min)
1. Create auth service
2. Build login screen
3. Build register screen
4. Build forgot password screen
5. Implement auth context
6. Add navigation guards

### Step 4: Profile Implementation (45 min)
1. Update profile types
2. Create profile service
3. Update profile screen UI
4. Implement edit functionality
5. Add profile picture upload
6. Connect to Firebase

### Step 5: Subjects Implementation (40 min)
1. Create subject types
2. Create subject service
3. Update subjects screen
4. Add real-time listeners
5. Implement subject details
6. Connect to Firebase

### Step 6: Documents Implementation (45 min)
1. Create document types
2. Create storage service
3. Update upload screen
4. Implement file picker
5. Add upload progress
6. Connect to Firebase Storage

### Step 7: Dashboard Update (30 min)
1. Remove payment sections
2. Connect to real data
3. Add loading states
4. Implement refresh
5. Add error handling

### Step 8: Admin Mode (40 min)
1. Create admin screens
2. Implement role checking
3. Add student management
4. Add document verification
5. Add subject management

### Step 9: Testing & Polish (30 min)
1. Test all features
2. Fix bugs
3. Add loading indicators
4. Improve error messages
5. Test on emulator

---

## Success Criteria

### Phase 1 Complete When:
- ✅ Users can register with email validation
- ✅ Users can login/logout
- ✅ Password reset works
- ✅ Profile shows all required fields
- ✅ Students can edit personal info
- ✅ Subjects display with teacher and schedule
- ✅ Documents can be uploaded to Firebase
- ✅ Dashboard shows real data
- ✅ Admin can login and manage students
- ✅ Admin can verify documents
- ✅ Admin can manage subjects
- ✅ All data persists in Firebase
- ✅ App works on emulator

---

## Next Steps After Phase 1

1. **User Testing**
   - Test with real users
   - Gather feedback
   - Fix issues

2. **Phase 2 Planning**
   - Announcements feature
   - Admin web panel
   - Advanced features

3. **Deployment**
   - Build production APK
   - Deploy admin web panel
   - Set up production Firebase

---

This plan ensures a solid foundation with core features working before adding advanced functionality.
