import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updatePassword,
  User as FirebaseUser,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { COLLECTIONS, ERROR_MESSAGES, SUCCESS_MESSAGES } from '../utils/constants';
import type { User, RegistrationFormData, LoginFormData, ApiResponse } from '../types';

/**
 * Authentication Service
 * Handles all authentication-related operations
 */
class AuthService {
  /**
   * Register a new user
   */
  async register(data: RegistrationFormData): Promise<ApiResponse<User>> {
    try {
      // Create Firebase auth user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const firebaseUser = userCredential.user;

      // Create user document in Firestore
      const userData: User = {
        uid: firebaseUser.uid,
        email: data.email,
        role: 'student',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      await setDoc(doc(db, COLLECTIONS.USERS, firebaseUser.uid), userData);

      // Create student profile document
      const studentData = {
        userId: firebaseUser.uid,
        lrn: data.lrn,
        lastName: data.lastName,
        firstName: data.firstName,
        middleInitial: data.middleInitial || '',
        birthdate: new Date(data.birthdate),
        birthPlace: data.birthPlace,
        email: data.email,
        phone: data.phone,
        phone2: data.phone2 || '',
        homeAddress1: data.homeAddress1,
        homeAddress2: data.homeAddress2 || '',
        motherName: data.motherName,
        fatherName: data.fatherName,
        guardianName: data.guardianName,
        guardianContact: data.guardianContact,
        guardianOccupation: data.guardianOccupation,
        strand: 'HUMSS', // Default, will be set by admin
        gradeLevel: 11, // Default, will be set by admin
        enrollmentStatus: 'incomplete',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      await setDoc(doc(db, COLLECTIONS.STUDENTS, firebaseUser.uid), studentData);

      // Sign out after registration (user needs to login)
      await signOut(auth);

      return {
        success: true,
        data: userData,
        message: SUCCESS_MESSAGES.REGISTRATION_SUCCESS
      };
    } catch (error: any) {
      console.error('Registration error:', error);
      
      let errorMessage = ERROR_MESSAGES.SOMETHING_WENT_WRONG;
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = ERROR_MESSAGES.AUTH_EMAIL_IN_USE;
      } else if (error.code === 'auth/weak-password') {
        errorMessage = ERROR_MESSAGES.AUTH_WEAK_PASSWORD;
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = ERROR_MESSAGES.INVALID_EMAIL;
      }

      return {
        success: false,
        error: errorMessage
      };
    }
  }

  /**
   * Login user
   */
  async login(data: LoginFormData): Promise<ApiResponse<User>> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const firebaseUser = userCredential.user;

      // Get user data from Firestore
      const userDoc = await getDoc(doc(db, COLLECTIONS.USERS, firebaseUser.uid));

      if (!userDoc.exists()) {
        throw new Error('User data not found');
      }

      const userData = userDoc.data() as User;

      return {
        success: true,
        data: userData,
        message: SUCCESS_MESSAGES.LOGIN_SUCCESS
      };
    } catch (error: any) {
      console.error('Login error:', error);
      
      let errorMessage = ERROR_MESSAGES.SOMETHING_WENT_WRONG;
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = ERROR_MESSAGES.AUTH_USER_NOT_FOUND;
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = ERROR_MESSAGES.AUTH_WRONG_PASSWORD;
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = ERROR_MESSAGES.AUTH_TOO_MANY_REQUESTS;
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = ERROR_MESSAGES.INVALID_EMAIL;
      }

      return {
        success: false,
        error: errorMessage
      };
    }
  }

  /**
   * Logout user
   */
  async logout(): Promise<ApiResponse<null>> {
    try {
      await signOut(auth);
      
      return {
        success: true,
        message: SUCCESS_MESSAGES.LOGOUT_SUCCESS
      };
    } catch (error: any) {
      console.error('Logout error:', error);
      
      return {
        success: false,
        error: ERROR_MESSAGES.SOMETHING_WENT_WRONG
      };
    }
  }

  /**
   * Send password reset email
   */
  async forgotPassword(email: string): Promise<ApiResponse<null>> {
    try {
      await sendPasswordResetEmail(auth, email);
      
      return {
        success: true,
        message: SUCCESS_MESSAGES.PASSWORD_RESET_EMAIL_SENT
      };
    } catch (error: any) {
      console.error('Forgot password error:', error);
      
      let errorMessage = ERROR_MESSAGES.SOMETHING_WENT_WRONG;
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = ERROR_MESSAGES.AUTH_USER_NOT_FOUND;
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = ERROR_MESSAGES.INVALID_EMAIL;
      }

      return {
        success: false,
        error: errorMessage
      };
    }
  }

  /**
   * Update user password
   */
  async updatePassword(newPassword: string): Promise<ApiResponse<null>> {
    try {
      const user = auth.currentUser;
      
      if (!user) {
        throw new Error('No user logged in');
      }

      await updatePassword(user, newPassword);
      
      return {
        success: true,
        message: SUCCESS_MESSAGES.PASSWORD_RESET_SUCCESS
      };
    } catch (error: any) {
      console.error('Update password error:', error);
      
      return {
        success: false,
        error: ERROR_MESSAGES.SOMETHING_WENT_WRONG
      };
    }
  }

  /**
   * Get current user
   */
  getCurrentUser(): FirebaseUser | null {
    return auth.currentUser;
  }

  /**
   * Get current user data from Firestore
   */
  async getCurrentUserData(): Promise<User | null> {
    try {
      const user = this.getCurrentUser();
      
      if (!user) {
        return null;
      }

      const userDoc = await getDoc(doc(db, COLLECTIONS.USERS, user.uid));

      if (!userDoc.exists()) {
        return null;
      }

      return userDoc.data() as User;
    } catch (error) {
      console.error('Get current user data error:', error);
      return null;
    }
  }

  /**
   * Listen to auth state changes
   */
  onAuthStateChange(callback: (user: FirebaseUser | null) => void) {
    return onAuthStateChanged(auth, callback);
  }

  /**
   * Check if user is admin
   */
  async isAdmin(): Promise<boolean> {
    try {
      const userData = await this.getCurrentUserData();
      return userData?.role === 'admin';
    } catch (error) {
      console.error('Check admin error:', error);
      return false;
    }
  }

  /**
   * Check if user is student
   */
  async isStudent(): Promise<boolean> {
    try {
      const userData = await this.getCurrentUserData();
      return userData?.role === 'student';
    } catch (error) {
      console.error('Check student error:', error);
      return false;
    }
  }
}

// Export singleton instance
export default new AuthService();
