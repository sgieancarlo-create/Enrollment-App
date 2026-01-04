// User and Authentication Types
export interface User {
  uid: string;
  email: string;
  role: 'student' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

// Student Types
export interface Student {
  id: string;
  userId: string;
  
  // Personal Information
  lrn: string; // Learner Reference Number
  lastName: string;
  firstName: string;
  middleInitial?: string;
  birthdate: Date;
  birthPlace: string;
  
  // Contact Information
  email: string;
  phone: string;
  phone2?: string;
  homeAddress1: string;
  homeAddress2?: string;
  
  // Family Information
  motherName: string;
  fatherName: string;
  guardianName: string;
  guardianContact: string;
  guardianOccupation: string;
  
  // Academic Information
  strand: Strand;
  gradeLevel: GradeLevel;
  gpa?: number;
  enrollmentStatus: EnrollmentStatus;
  
  // Profile
  profilePicture?: string;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

// Strand Types
export type Strand = 'HUMSS' | 'STEM' | 'ABM' | 'ALS';

export interface StrandInfo {
  code: Strand;
  fullName: string;
  description: string;
}

export const STRANDS: Record<Strand, StrandInfo> = {
  HUMSS: {
    code: 'HUMSS',
    fullName: 'Humanities and Social Sciences',
    description: 'Focus on human behavior, societal issues, and cultural studies'
  },
  STEM: {
    code: 'STEM',
    fullName: 'Science, Technology, Engineering, and Mathematics',
    description: 'Focus on scientific and mathematical concepts'
  },
  ABM: {
    code: 'ABM',
    fullName: 'Accountancy, Business, and Management',
    description: 'Focus on business, entrepreneurship, and financial management'
  },
  ALS: {
    code: 'ALS',
    fullName: 'Alternative Learning System',
    description: 'Alternative education pathway for out-of-school youth and adults'
  }
};

// Grade Level Types
export type GradeLevel = 11 | 12;

export interface GradeLevelInfo {
  level: GradeLevel;
  name: string;
  description: string;
}

export const GRADE_LEVELS: Record<GradeLevel, GradeLevelInfo> = {
  11: {
    level: 11,
    name: '1st Year (Grade 11)',
    description: 'First year of Senior High School'
  },
  12: {
    level: 12,
    name: '2nd Year (Grade 12)',
    description: 'Second year of Senior High School'
  }
};

// Enrollment Status
export type EnrollmentStatus = 'incomplete' | 'pending' | 'enrolled' | 'rejected';

// Subject Types
export interface Subject {
  id: string;
  code: string;
  name: string;
  description: string;
  gradeLevel: GradeLevel;
  
  // Teacher Information
  teacherName: string;
  teacherContact?: string;
  
  // Schedule
  schedule: SubjectSchedule;
  
  // Capacity
  capacity: number;
  enrolledCount: number;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

export interface SubjectSchedule {
  day: string; // e.g., "Monday", "Tuesday"
  time: string; // e.g., "8:00 AM - 9:30 AM"
  room: string; // e.g., "Room 101"
}

// Enrollment (Student-Subject relationship)
export interface Enrollment {
  id: string;
  studentId: string;
  subjectId: string;
  enrolledAt: Date;
  status: 'active' | 'dropped';
}

// Document Types
export type DocumentType = 
  | 'high_school_certificate'
  | 'id_proof'
  | 'character_certificate'
  | 'medical_certificate'
  | 'birth_certificate'
  | 'other';

export interface Document {
  id: string;
  studentId: string;
  type: DocumentType;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  uploadDate: Date;
  verificationStatus: VerificationStatus;
  verifiedBy?: string;
  verificationDate?: Date;
  notes?: string;
}

export type VerificationStatus = 'pending' | 'verified' | 'rejected';

export interface DocumentRequirement {
  type: DocumentType;
  name: string;
  description: string;
  required: boolean;
}

export const DOCUMENT_REQUIREMENTS: DocumentRequirement[] = [
  {
    type: 'high_school_certificate',
    name: 'High School Certificate',
    description: 'Certificate of completion from previous school',
    required: true
  },
  {
    type: 'id_proof',
    name: 'ID Proof',
    description: 'Valid government-issued ID',
    required: true
  },
  {
    type: 'character_certificate',
    name: 'Character Certificate',
    description: 'Good moral character certificate',
    required: true
  },
  {
    type: 'medical_certificate',
    name: 'Medical Certificate',
    description: 'Recent medical examination certificate',
    required: true
  },
  {
    type: 'birth_certificate',
    name: 'Birth Certificate',
    description: 'PSA-issued birth certificate',
    required: true
  }
];

// Form Types for Registration
export interface RegistrationFormData {
  // Personal Information
  lastName: string;
  firstName: string;
  middleInitial?: string;
  birthdate: string;
  birthPlace: string;
  
  // Contact Information
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  phone2?: string;
  homeAddress1: string;
  homeAddress2?: string;
  
  // Family Information
  motherName: string;
  fatherName: string;
  guardianName: string;
  guardianContact: string;
  guardianOccupation: string;
  
  // Academic Information (will be set by admin)
  lrn: string;
}

// Login Form
export interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

// Forgot Password Form
export interface ForgotPasswordFormData {
  email: string;
}

// Reset Password Form
export interface ResetPasswordFormData {
  otp: string;
  newPassword: string;
  confirmPassword: string;
}

// Profile Edit Form
export interface ProfileEditFormData {
  // Personal Information
  lastName: string;
  firstName: string;
  middleInitial?: string;
  birthdate: string;
  birthPlace: string;
  
  // Contact Information
  phone: string;
  phone2?: string;
  homeAddress1: string;
  homeAddress2?: string;
  
  // Family Information
  motherName: string;
  fatherName: string;
  guardianName: string;
  guardianContact: string;
  guardianOccupation: string;
}

// Admin Types
export interface AdminDashboardStats {
  totalStudents: number;
  pendingVerifications: number;
  totalSubjects: number;
  enrolledStudents: number;
  grade11Count: number;
  grade12Count: number;
  strandDistribution: Record<Strand, number>;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Loading States
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}
