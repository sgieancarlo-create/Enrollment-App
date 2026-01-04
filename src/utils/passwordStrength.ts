import { PasswordStrength, PasswordStrengthResult } from '../types';

/**
 * Calculate password strength based on various criteria
 * @param password - The password to evaluate
 * @returns PasswordStrengthResult with strength level, score, and feedback
 */
export function calculatePasswordStrength(password: string): PasswordStrengthResult {
  const criteria = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    numbers: /[0-9]/.test(password),
    special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
  };

  // Calculate score (0-100)
  let score = 0;
  const feedback: string[] = [];

  // Length scoring (0-40 points)
  if (password.length === 0) {
    score += 0;
    feedback.push('Password is required');
  } else if (password.length < 6) {
    score += 10;
    feedback.push('Password is too short (minimum 6 characters)');
  } else if (password.length < 8) {
    score += 20;
    feedback.push('Password should be at least 8 characters');
  } else if (password.length < 12) {
    score += 30;
  } else {
    score += 40;
  }

  // Character variety scoring (60 points total)
  if (criteria.lowercase) {
    score += 10;
  } else if (password.length > 0) {
    feedback.push('Add lowercase letters');
  }

  if (criteria.uppercase) {
    score += 15;
  } else if (password.length > 0) {
    feedback.push('Add uppercase letters');
  }

  if (criteria.numbers) {
    score += 15;
  } else if (password.length > 0) {
    feedback.push('Add numbers');
  }

  if (criteria.special) {
    score += 20;
  } else if (password.length > 0) {
    feedback.push('Add special characters (!@#$%^&*)');
  }

  // Determine strength level
  let strength: PasswordStrength;
  if (score < 30) {
    strength = 'weak';
  } else if (score < 60) {
    strength = 'medium';
  } else if (score < 85) {
    strength = 'strong';
  } else {
    strength = 'very-strong';
  }

  // Add positive feedback for strong passwords
  if (score >= 85) {
    feedback.unshift('Excellent! Very strong password');
  } else if (score >= 60) {
    feedback.unshift('Good! Strong password');
  } else if (score >= 30) {
    feedback.unshift('Fair password, but could be stronger');
  }

  return {
    strength,
    score,
    feedback,
    criteria,
  };
}

/**
 * Get color for password strength indicator
 * @param strength - The password strength level
 * @returns Color string for the strength level
 */
export function getStrengthColor(strength: PasswordStrength): string {
  switch (strength) {
    case 'weak':
      return '#e74c3c'; // Red
    case 'medium':
      return '#f39c12'; // Orange
    case 'strong':
      return '#3498db'; // Blue
    case 'very-strong':
      return '#27ae60'; // Green
    default:
      return '#95a5a6'; // Gray
  }
}

/**
 * Get label for password strength
 * @param strength - The password strength level
 * @returns Human-readable label
 */
export function getStrengthLabel(strength: PasswordStrength): string {
  switch (strength) {
    case 'weak':
      return 'Weak';
    case 'medium':
      return 'Medium';
    case 'strong':
      return 'Strong';
    case 'very-strong':
      return 'Very Strong';
    default:
      return 'Unknown';
  }
}
