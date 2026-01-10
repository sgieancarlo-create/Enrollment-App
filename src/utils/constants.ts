// App Constants

// Validation Constants
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  PHONE_LENGTH: 11, // Philippine mobile number format
  LRN_LENGTH: 12, // Learner Reference Number length
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB in bytes
  ALLOWED_FILE_TYPES: ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  ALLOWED_FILE_EXTENSIONS: ['.pdf', '.jpg', '.jpeg', '.png', '.doc', '.docx']
};

// Error Messages
export const ERROR_MESSAGES = {
  // Authentication
  AUTH_INVALID_EMAIL: 'Please enter a valid email address',
  AUTH_WEAK_PASSWORD: `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters`,
  AUTH_PASSWORDS_DONT_MATCH: 'Passwords do not match',
  AUTH_EMAIL_IN_USE: 'This email is already registered',
  AUTH_USER_NOT_FOUND: 'No account found with this email',
  AUTH_WRONG_PASSWORD: 'Incorrect password',
  AUTH_TOO_MANY_REQUESTS: 'Too many failed attempts. Please try again later',
  
  // Required Fields
  REQUIRED_FIELD: 'This field is required',
  REQUIRED_EMAIL: 'Email is required',
  REQUIRED_PASSWORD: 'Password is required',
  REQUIRED_NAME: 'Name is required',
  REQUIRED_PHONE: 'Phone number is required',
  REQUIRED_ADDRESS: 'Address is required',
  REQUIRED_LRN: 'LRN is required',
  
  // Validation
  INVALID_EMAIL: 'Invalid email format',
  INVALID_PHONE: 'Phone number must be 11 digits',
  INVALID_LRN: 'LRN must be 12 digits',
  INVALID_DATE: 'Invalid date',
  INVALID_FILE_TYPE: 'Invalid file type. Only PDF, JPG, PNG, DOC, DOCX allowed',
  INVALID_FILE_SIZE: 'File size must be less than 10MB',
  
  // Network
  NETWORK_ERROR: 'Network error. Please check your connection',
  SERVER_ERROR: 'Server error. Please try again later',
  
  // Generic
  SOMETHING_WENT_WRONG: 'Something went wrong. Please try again'
};

// Success Messages
export const SUCCESS_MESSAGES = {
  REGISTRATION_SUCCESS: 'Registration successful! Please log in',
  LOGIN_SUCCESS: 'Welcome back!',
  LOGOUT_SUCCESS: 'Logged out successfully',
  PASSWORD_RESET_EMAIL_SENT: 'Password reset email sent. Please check your inbox',
  PASSWORD_RESET_SUCCESS: 'Password reset successful',
  PROFILE_UPDATE_SUCCESS: 'Profile updated successfully',
  DOCUMENT_UPLOAD_SUCCESS: 'Document uploaded successfully',
  DOCUMENT_DELETE_SUCCESS: 'Document deleted successfully',
  VERIFICATION_SUCCESS: 'Document verified successfully'
};

// Storage Keys (AsyncStorage)
export const STORAGE_KEYS = {
  USER_TOKEN: '@user_token',
  USER_DATA: '@user_data',
  REMEMBER_ME: '@remember_me',
  THEME: '@theme'
};

// Collection Names (Firestore)
export const COLLECTIONS = {
  USERS: 'users',
  STUDENTS: 'students',
  SUBJECTS: 'subjects',
  DOCUMENTS: 'documents',
  ENROLLMENTS: 'enrollments',
  STRANDS: 'strands',
  ANNOUNCEMENTS: 'announcements'
};

// Routes
export const ROUTES = {
  // Auth
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  
  // Student
  DASHBOARD: '/(tabs)',
  PROFILE: '/(tabs)/profile',
  SUBJECTS: '/(tabs)/subjects',
  UPLOAD: '/(tabs)/upload',
  SETTINGS: '/(tabs)/settings',
  
  // Admin
  ADMIN_DASHBOARD: '/(admin)/dashboard',
  ADMIN_STUDENTS: '/(admin)/students',
  ADMIN_SUBJECTS: '/(admin)/subjects',
  ADMIN_DOCUMENTS: '/(admin)/documents'
};

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  DISPLAY_LONG: 'MMMM dd, yyyy',
  DISPLAY_WITH_TIME: 'MMM dd, yyyy hh:mm a',
  INPUT: 'yyyy-MM-dd',
  TIMESTAMP: 'yyyy-MM-dd HH:mm:ss'
};

// Enrollment Steps
export const ENROLLMENT_STEPS = [
  { id: 1, name: 'Registration', description: 'Create your account' },
  { id: 2, name: 'Profile Completion', description: 'Fill in your details' },
  { id: 3, name: 'Document Upload', description: 'Upload required documents' },
  { id: 4, name: 'Verification', description: 'Wait for admin approval' }
];

// Days of the Week
export const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];

// Time Slots (for scheduling)
export const TIME_SLOTS = [
  '7:00 AM - 8:00 AM',
  '8:00 AM - 9:00 AM',
  '9:00 AM - 10:00 AM',
  '10:00 AM - 11:00 AM',
  '11:00 AM - 12:00 PM',
  '12:00 PM - 1:00 PM',
  '1:00 PM - 2:00 PM',
  '2:00 PM - 3:00 PM',
  '3:00 PM - 4:00 PM',
  '4:00 PM - 5:00 PM',
  '5:00 PM - 6:00 PM'
];

// Theme Colors
export const COLORS = {
  primary: '#3498db',
  secondary: '#2ecc71',
  danger: '#e74c3c',
  warning: '#f39c12',
  info: '#667eea',
  success: '#27ae60',
  dark: '#2c3e50',
  light: '#ecf0f1',
  gray: '#7f8c8d',
  white: '#ffffff',
  background: '#f5f7fa',
  
  // Status Colors
  pending: '#f39c12',
  verified: '#27ae60',
  rejected: '#e74c3c',
  incomplete: '#f39c12',
  enrolled: '#27ae60'
};

// App Info
export const APP_INFO = {
  NAME: 'SHS Enrollment System',
  VERSION: '1.0.0',
  DESCRIPTION: 'Senior High School Enrollment and Management System',
  SUPPORT_EMAIL: 'support@school.edu.ph',
  SUPPORT_PHONE: '09XX-XXX-XXXX'
};
