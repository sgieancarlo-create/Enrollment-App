import { format, parseISO } from 'date-fns';
import { DATE_FORMATS } from './constants';
import type { Strand, GradeLevel, VerificationStatus, EnrollmentStatus } from '../types';

/**
 * Format date for display
 */
export const formatDate = (date: Date | string, formatStr: string = DATE_FORMATS.DISPLAY): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, formatStr);
  } catch (error) {
    return 'Invalid date';
  }
};

/**
 * Format date with time
 */
export const formatDateTime = (date: Date | string): string => {
  return formatDate(date, DATE_FORMATS.DISPLAY_WITH_TIME);
};

/**
 * Format date for input fields
 */
export const formatDateForInput = (date: Date | string): string => {
  return formatDate(date, DATE_FORMATS.INPUT);
};

/**
 * Format phone number for display (09XX-XXX-XXXX)
 */
export const formatPhoneNumber = (phone: string): string => {
  if (!phone || phone.length !== 11) return phone;
  return `${phone.slice(0, 4)}-${phone.slice(4, 7)}-${phone.slice(7)}`;
};

/**
 * Format LRN for display (XXXX-XXXX-XXXX)
 */
export const formatLRN = (lrn: string): string => {
  if (!lrn || lrn.length !== 12) return lrn;
  return `${lrn.slice(0, 4)}-${lrn.slice(4, 8)}-${lrn.slice(8)}`;
};

/**
 * Format name (Last Name, First Name Middle Initial)
 */
export const formatFullName = (
  lastName: string,
  firstName: string,
  middleInitial?: string
): string => {
  const mi = middleInitial ? ` ${middleInitial}.` : '';
  return `${lastName}, ${firstName}${mi}`;
};

/**
 * Format strand name
 */
export const formatStrandName = (strand: Strand): string => {
  const strandNames: Record<Strand, string> = {
    HUMSS: 'Humanities and Social Sciences',
    STEM: 'Science, Technology, Engineering, and Mathematics',
    ABM: 'Accountancy, Business, and Management',
    ALS: 'Alternative Learning System'
  };
  return strandNames[strand];
};

/**
 * Format grade level
 */
export const formatGradeLevel = (gradeLevel: GradeLevel): string => {
  return gradeLevel === 11 ? '1st Year (Grade 11)' : '2nd Year (Grade 12)';
};

/**
 * Format GPA
 */
export const formatGPA = (gpa: number): string => {
  return gpa.toFixed(2);
};

/**
 * Format verification status
 */
export const formatVerificationStatus = (status: VerificationStatus): string => {
  const statusMap: Record<VerificationStatus, string> = {
    pending: 'Pending Verification',
    verified: 'Verified',
    rejected: 'Rejected'
  };
  return statusMap[status];
};

/**
 * Format enrollment status
 */
export const formatEnrollmentStatus = (status: EnrollmentStatus): string => {
  const statusMap: Record<EnrollmentStatus, string> = {
    incomplete: 'Incomplete',
    pending: 'Pending Approval',
    enrolled: 'Enrolled',
    rejected: 'Rejected'
  };
  return statusMap[status];
};

/**
 * Get status color
 */
export const getStatusColor = (status: VerificationStatus | EnrollmentStatus): string => {
  const colorMap: Record<string, string> = {
    pending: '#f39c12',
    verified: '#27ae60',
    rejected: '#e74c3c',
    incomplete: '#f39c12',
    enrolled: '#27ae60'
  };
  return colorMap[status] || '#7f8c8d';
};

/**
 * Format file size
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

/**
 * Truncate text
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Capitalize first letter
 */
export const capitalizeFirst = (text: string): string => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

/**
 * Capitalize each word
 */
export const capitalizeWords = (text: string): string => {
  if (!text) return '';
  return text
    .split(' ')
    .map(word => capitalizeFirst(word))
    .join(' ');
};

/**
 * Format address
 */
export const formatAddress = (address1: string, address2?: string): string => {
  return address2 ? `${address1}, ${address2}` : address1;
};

/**
 * Format schedule
 */
export const formatSchedule = (day: string, time: string, room: string): string => {
  return `${day}, ${time} - ${room}`;
};

/**
 * Get initials from name
 */
export const getInitials = (firstName: string, lastName: string): string => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};

/**
 * Format percentage
 */
export const formatPercentage = (value: number, total: number): string => {
  if (total === 0) return '0%';
  const percentage = (value / total) * 100;
  return `${Math.round(percentage)}%`;
};

/**
 * Format count with label
 */
export const formatCount = (count: number, singular: string, plural?: string): string => {
  const label = count === 1 ? singular : (plural || `${singular}s`);
  return `${count} ${label}`;
};

/**
 * Parse date string to Date object
 */
export const parseDate = (dateString: string): Date | null => {
  try {
    return parseISO(dateString);
  } catch (error) {
    return null;
  }
};

/**
 * Check if date is in the past
 */
export const isDateInPast = (date: Date): boolean => {
  return date < new Date();
};

/**
 * Check if date is today
 */
export const isToday = (date: Date): boolean => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

/**
 * Get relative time (e.g., "2 hours ago", "3 days ago")
 */
export const getRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return 'Just now';
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
  }
  
  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks} ${diffInWeeks === 1 ? 'week' : 'weeks'} ago`;
  }
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} ${diffInMonths === 1 ? 'month' : 'months'} ago`;
  }
  
  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears} ${diffInYears === 1 ? 'year' : 'years'} ago`;
};
