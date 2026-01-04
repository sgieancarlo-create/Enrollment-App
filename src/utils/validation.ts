import * as yup from 'yup';
import { VALIDATION, ERROR_MESSAGES } from './constants';

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone validation regex (Philippine format: 09XXXXXXXXX)
const phoneRegex = /^09\d{9}$/;

// LRN validation regex (12 digits)
const lrnRegex = /^\d{12}$/;

// Registration Form Validation Schema
export const registrationSchema = yup.object().shape({
  // Personal Information
  lastName: yup
    .string()
    .required(ERROR_MESSAGES.REQUIRED_NAME)
    .min(2, 'Last name must be at least 2 characters'),
  
  firstName: yup
    .string()
    .required(ERROR_MESSAGES.REQUIRED_NAME)
    .min(2, 'First name must be at least 2 characters'),
  
  middleInitial: yup
    .string()
    .max(1, 'Middle initial must be 1 character')
    .optional(),
  
  birthdate: yup
    .string()
    .required('Birthdate is required'),
  
  birthPlace: yup
    .string()
    .required('Birth place is required'),
  
  // Contact Information
  email: yup
    .string()
    .required(ERROR_MESSAGES.REQUIRED_EMAIL)
    .matches(emailRegex, ERROR_MESSAGES.INVALID_EMAIL),
  
  password: yup
    .string()
    .required(ERROR_MESSAGES.REQUIRED_PASSWORD)
    .min(VALIDATION.PASSWORD_MIN_LENGTH, ERROR_MESSAGES.AUTH_WEAK_PASSWORD),
  
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], ERROR_MESSAGES.AUTH_PASSWORDS_DONT_MATCH),
  
  phone: yup
    .string()
    .required(ERROR_MESSAGES.REQUIRED_PHONE)
    .matches(phoneRegex, ERROR_MESSAGES.INVALID_PHONE),
  
  phone2: yup
    .string()
    .matches(phoneRegex, ERROR_MESSAGES.INVALID_PHONE)
    .optional(),
  
  homeAddress1: yup
    .string()
    .required(ERROR_MESSAGES.REQUIRED_ADDRESS),
  
  homeAddress2: yup
    .string()
    .optional(),
  
  // Family Information
  motherName: yup
    .string()
    .required("Mother's name is required"),
  
  fatherName: yup
    .string()
    .required("Father's name is required"),
  
  guardianName: yup
    .string()
    .required("Guardian's name is required"),
  
  guardianContact: yup
    .string()
    .required("Guardian's contact is required")
    .matches(phoneRegex, ERROR_MESSAGES.INVALID_PHONE),
  
  guardianOccupation: yup
    .string()
    .required("Guardian's occupation is required"),
  
  // Academic Information
  lrn: yup
    .string()
    .required(ERROR_MESSAGES.REQUIRED_LRN)
    .matches(lrnRegex, ERROR_MESSAGES.INVALID_LRN)
});

// Login Form Validation Schema
export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required(ERROR_MESSAGES.REQUIRED_EMAIL)
    .matches(emailRegex, ERROR_MESSAGES.INVALID_EMAIL),
  
  password: yup
    .string()
    .required(ERROR_MESSAGES.REQUIRED_PASSWORD)
});

// Forgot Password Validation Schema
export const forgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .required(ERROR_MESSAGES.REQUIRED_EMAIL)
    .matches(emailRegex, ERROR_MESSAGES.INVALID_EMAIL)
});

// Reset Password Validation Schema
export const resetPasswordSchema = yup.object().shape({
  otp: yup
    .string()
    .required('OTP is required')
    .length(6, 'OTP must be 6 digits'),
  
  newPassword: yup
    .string()
    .required(ERROR_MESSAGES.REQUIRED_PASSWORD)
    .min(VALIDATION.PASSWORD_MIN_LENGTH, ERROR_MESSAGES.AUTH_WEAK_PASSWORD),
  
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('newPassword')], ERROR_MESSAGES.AUTH_PASSWORDS_DONT_MATCH)
});

// Profile Edit Validation Schema
export const profileEditSchema = yup.object().shape({
  // Personal Information
  lastName: yup
    .string()
    .required(ERROR_MESSAGES.REQUIRED_NAME)
    .min(2, 'Last name must be at least 2 characters'),
  
  firstName: yup
    .string()
    .required(ERROR_MESSAGES.REQUIRED_NAME)
    .min(2, 'First name must be at least 2 characters'),
  
  middleInitial: yup
    .string()
    .max(1, 'Middle initial must be 1 character')
    .optional(),
  
  birthdate: yup
    .string()
    .required('Birthdate is required'),
  
  birthPlace: yup
    .string()
    .required('Birth place is required'),
  
  // Contact Information
  phone: yup
    .string()
    .required(ERROR_MESSAGES.REQUIRED_PHONE)
    .matches(phoneRegex, ERROR_MESSAGES.INVALID_PHONE),
  
  phone2: yup
    .string()
    .matches(phoneRegex, ERROR_MESSAGES.INVALID_PHONE)
    .optional(),
  
  homeAddress1: yup
    .string()
    .required(ERROR_MESSAGES.REQUIRED_ADDRESS),
  
  homeAddress2: yup
    .string()
    .optional(),
  
  // Family Information
  motherName: yup
    .string()
    .required("Mother's name is required"),
  
  fatherName: yup
    .string()
    .required("Father's name is required"),
  
  guardianName: yup
    .string()
    .required("Guardian's name is required"),
  
  guardianContact: yup
    .string()
    .required("Guardian's contact is required")
    .matches(phoneRegex, ERROR_MESSAGES.INVALID_PHONE),
  
  guardianOccupation: yup
    .string()
    .required("Guardian's occupation is required")
});

// Subject Form Validation Schema (Admin)
export const subjectSchema = yup.object().shape({
  code: yup
    .string()
    .required('Subject code is required'),
  
  name: yup
    .string()
    .required('Subject name is required'),
  
  description: yup
    .string()
    .required('Description is required'),
  
  gradeLevel: yup
    .number()
    .required('Grade level is required')
    .oneOf([11, 12], 'Grade level must be 11 or 12'),
  
  teacherName: yup
    .string()
    .required('Teacher name is required'),
  
  teacherContact: yup
    .string()
    .matches(phoneRegex, ERROR_MESSAGES.INVALID_PHONE)
    .optional(),
  
  capacity: yup
    .number()
    .required('Capacity is required')
    .min(1, 'Capacity must be at least 1')
});

// Helper Functions

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  return emailRegex.test(email);
};

/**
 * Validate Philippine phone number format
 */
export const isValidPhone = (phone: string): boolean => {
  return phoneRegex.test(phone);
};

/**
 * Validate LRN format
 */
export const isValidLRN = (lrn: string): boolean => {
  return lrnRegex.test(lrn);
};

/**
 * Validate file type
 */
export const isValidFileType = (fileType: string): boolean => {
  return VALIDATION.ALLOWED_FILE_TYPES.includes(fileType);
};

/**
 * Validate file size
 */
export const isValidFileSize = (fileSize: number): boolean => {
  return fileSize <= VALIDATION.MAX_FILE_SIZE;
};

/**
 * Validate file extension
 */
export const isValidFileExtension = (fileName: string): boolean => {
  const extension = fileName.substring(fileName.lastIndexOf('.')).toLowerCase();
  return VALIDATION.ALLOWED_FILE_EXTENSIONS.includes(extension);
};

/**
 * Format file size for display
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

/**
 * Validate age (must be at least 15 years old for SHS)
 */
export const isValidAge = (birthdate: Date): boolean => {
  const today = new Date();
  const age = today.getFullYear() - birthdate.getFullYear();
  const monthDiff = today.getMonth() - birthdate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) {
    return age - 1 >= 15;
  }
  
  return age >= 15;
};

/**
 * Calculate age from birthdate
 */
export const calculateAge = (birthdate: Date): number => {
  const today = new Date();
  let age = today.getFullYear() - birthdate.getFullYear();
  const monthDiff = today.getMonth() - birthdate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) {
    age--;
  }
  
  return age;
};
