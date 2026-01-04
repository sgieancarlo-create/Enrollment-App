# Senior High School Enrollment System - Feature Requirements

## System Overview
A comprehensive enrollment system for Senior High School (Grade 11-12) in the Philippines with student mobile app and admin web panel.

---

## STUDENT MOBILE APP FEATURES

### 1. Authentication & Registration
- **Register** (with email validation)
  - Personal Information Form
  - Email verification required
  - Data transfers to profile after registration
- **Login/Logout**
- **Forgot Password** (with OTP via email)

### 2. Dashboard (Home Tab)
- **Enrollment Status Card**
  - Progress indicator (X of Y steps completed)
  - Status badge (Incomplete/Complete)
- **Documents Card**
  - Count of uploaded documents
  - Quick upload button
- **Subjects Card** (renamed from Courses)
  - Count of registered subjects
  - Quick view button
- **Verification Card**
  - Status badge (Pending/Verified/Rejected)
  - Admin review status

### 3. Document Upload Tab
- **Upload Requirements Checklist**
  - High School Certificate
  - ID Proof
  - Character Certificate
  - Medical Certificate
  - Status indicators (Completed/Pending)
- **Upload Form**
  - Document type selector
  - Description field (optional)
  - File picker (PDF, DOC, DOCX, JPG, PNG - Max 10MB)
  - Upload progress indicator
- **Upload History**
  - List of uploaded documents
  - Verification status per document
  - Upload date and time

### 4. Subjects Tab (renamed from Courses)
- **Subject List Display**
  - Subject name
  - Teacher's name
  - Schedule (time and date)
  - Grade level (Grade 11 or Grade 12)
- **Subject Details**
  - Full subject information
  - Teacher contact info
  - Class schedule
  - Room/location

### 5. Profile Tab
**Personal Information:**
- Last Name
- First Name
- Middle Initial (if applicable)
- Birthdate
- Birth Place
- Email
- Phone Number
- Phone Number 2 (optional)
- Home Address 1
- Home Address 2 (optional)

**Family Information:**
- Mother's Name
- Father's Name
- Guardian's Name
- Guardian's Contact Number
- Guardian's Occupation

**Academic Information:**
- Learner Reference Number (LRN) - renamed from Student ID
- Strand (admin-editable only):
  - HUMSS (Humanities and Social Sciences)
  - STEM (Science, Technology, Engineering, and Mathematics)
  - ABM (Accountancy, Business, and Management)
  - ALS (Alternative Learning System)
- Grade Level:
  - 1st Year (Grade 11)
  - 2nd Year (Grade 12)
- GPA (renamed from GWA)

**Removed Fields:**
- Program (replaced with Strand)
- Current Semester
- Credits Earned
- Fees & Payments section
- Recent Payments section

### 6. Announcements Tab (NEW)
- **Official Announcements**
  - Synchronized with School's Official Facebook Page
  - Push notifications for new announcements
  - In-app alerts
  - Individual announcements (targeted to specific students)
  - General announcements (for all students)
- **Announcement Details**
  - Title
  - Content
  - Date posted
  - Attachments (if any)
  - Read/Unread status

### 7. Settings Tab
- Account settings
- Notification preferences
- Privacy settings
- App information
- Logout option

---

## ADMIN WEB PANEL FEATURES

### 1. Dashboard
- Overview statistics
- Recent activities
- Pending verifications
- System alerts

### 2. Student Registration
- Register new students
- Bulk import students
- Assign LRN
- Set initial credentials

### 3. Student Management
- View all students
- Search and filter students
- Edit student information
- View student profiles
- Manage student status (Active/Inactive/Graduated)
- Assign strand (HUMSS/STEM/ABM/ALS)
- Set grade level (Grade 11/Grade 12)

### 4. Subject Management
- Create/Edit/Delete subjects
- Set subject details:
  - Subject name
  - Subject code
  - Description
  - Grade level
- Assign teachers to subjects
- Set class schedules (time and date)

### 5. Teacher Management
- Add/Edit/Delete teachers
- Teacher profiles
- Assign subjects to teachers
- View teacher schedules
- Contact information

### 6. Class Management
- Create class sections
- Assign students to classes
- Assign subjects to classes
- Set class schedules
- Manage class capacity

### 7. Strand Management
- Manage available strands
- Set strand requirements
- Assign students to strands
- View strand statistics

### 8. Grade Level Management
- Manage grade levels (Grade 11, Grade 12)
- Set requirements per grade level
- Track student progression

### 9. User Management
- Manage admin accounts
- Set user roles and permissions
- View user activity logs
- Account security settings

### 10. Document Verification
- View uploaded documents
- Verify/Reject documents
- Add verification notes
- Track verification history

### 11. Announcement Management
- Create announcements
- Individual announcements (target specific students)
- General announcements (all students)
- Schedule announcements
- Attach files to announcements
- Sync with Facebook Page (optional)
- View announcement analytics

### 12. Re-Enrollment
- Process re-enrollment for returning students
- Update student information
- Assign new grade level
- Generate re-enrollment reports

### 13. Dropping
- Process student dropping requests
- Record drop reasons
- Update student status
- Generate dropping reports

### 14. Reports
- Enrollment statistics
- Student demographics
- Subject enrollment reports
- Document verification reports
- Strand distribution
- Grade level distribution
- Teacher workload reports
- Custom report generation

### 15. Profile
- Admin profile management
- Change password
- Notification settings

---

## TECHNICAL REQUIREMENTS

### Backend
- RESTful API or Firebase
- Authentication with role-based access (Student/Admin)
- Database for all entities
- File storage for documents
- Email service for notifications
- Push notification service

### Frontend (Mobile)
- React Native with Expo
- State management (Context API/Redux)
- Offline support
- Real-time updates
- Push notifications

### Frontend (Admin Panel)
- React web application
- Responsive design
- Data tables with search/filter
- Charts and analytics
- Export functionality (PDF/Excel)

### Integration
- Facebook Graph API (for announcement sync)
- Email service (SendGrid/AWS SES)
- Push notification service (Expo Notifications/Firebase Cloud Messaging)

---

## DATA MODELS

### Student
- LRN (Learner Reference Number)
- Personal info (name, birthdate, birthplace, addresses, phones)
- Family info (parents, guardian)
- Academic info (strand, grade level, GPA)
- Email (for authentication)
- Password (hashed)
- Status (Active/Inactive/Graduated)
- Enrollment status
- Created/Updated timestamps

### Subject
- Subject code
- Subject name
- Description
- Grade level (11/12)
- Teacher ID
- Schedule (time, date, room)
- Capacity
- Enrolled students count

### Teacher
- Teacher ID
- Name
- Email
- Phone
- Subjects assigned
- Schedule

### Document
- Student ID
- Document type
- File URL
- Upload date
- Verification status
- Verified by (admin ID)
- Verification date
- Notes

### Announcement
- Title
- Content
- Type (Individual/General)
- Target students (if individual)
- Attachments
- Posted by (admin ID)
- Posted date
- Read by (student IDs)

### Strand
- Code (HUMSS/STEM/ABM/ALS)
- Full name
- Description
- Requirements

---

## CUSTOMIZATION FEATURES

### Theme System
- Customizable colors
- Logo upload
- School branding

### Configurable Fields
- Add/remove profile fields
- Custom document types
- Custom announcement categories

### Modular Architecture
- Reusable components
- API service layer
- Easy feature addition
- Plugin system for extensions

---

## SECURITY & COMPLIANCE

- Secure authentication (JWT tokens)
- Password encryption
- Role-based access control
- Data privacy compliance
- Secure file storage
- Audit logs
- Session management

---

## DEPLOYMENT

### Mobile App
- Expo Go (development)
- Standalone APK (production)
- Google Play Store (optional)

### Admin Panel
- Web hosting (Vercel/Netlify)
- Custom domain support

### Backend
- Cloud hosting (Firebase/AWS/Heroku)
- Database backup
- CDN for file storage

---

This system is designed to be highly customizable, scalable, and easy to maintain while meeting all the specific requirements for a Philippine Senior High School enrollment system.
