import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';
import type { User, Subject, Document, ApiResponse } from '../types';

class DatabaseService {
  // Collections
  private usersCollection = 'users';
  private subjectsCollection = 'subjects';
  private documentsCollection = 'documents';

  // ==================== USER OPERATIONS ====================

  /**
   * Get user by ID
   */
  async getUser(userId: string): Promise<User | null> {
    try {
      const userDoc = await getDoc(doc(db, this.usersCollection, userId));
      
      if (userDoc.exists()) {
        const data = userDoc.data();
        return {
          id: userDoc.id,
          ...data
        } as unknown as User;
      }
      
      return null;
    } catch (error) {
      console.error('Error getting user:', error);
      throw error;
    }
  }

  /**
   * Create or update user
   */
  async saveUser(userId: string, userData: Partial<User>): Promise<ApiResponse<User>> {
    try {
      const userRef = doc(db, this.usersCollection, userId);
      
      const dataToSave = {
        ...userData,
        updatedAt: Timestamp.now()
      };

      await setDoc(userRef, dataToSave, { merge: true });

      const savedUser = await this.getUser(userId);
      
      return {
        success: true,
        data: savedUser!,
        message: 'User saved successfully'
      };
    } catch (error) {
      console.error('Error saving user:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to save user'
      };
    }
  }

  /**
   * Update user profile
   */
  async updateUser(userId: string, updates: Partial<User>): Promise<ApiResponse<User>> {
    try {
      const userRef = doc(db, this.usersCollection, userId);
      
      await updateDoc(userRef, {
        ...updates,
        updatedAt: Timestamp.now()
      });

      const updatedUser = await this.getUser(userId);
      
      return {
        success: true,
        data: updatedUser!,
        message: 'Profile updated successfully'
      };
    } catch (error) {
      console.error('Error updating user:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update profile'
      };
    }
  }

  /**
   * Get all students (admin only)
   */
  async getAllStudents(): Promise<ApiResponse<User[]>> {
    try {
      const q = query(
        collection(db, this.usersCollection),
        where('role', '==', 'student'),
        orderBy('createdAt', 'desc')
      );

      const querySnapshot = await getDocs(q);
      const students: User[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        students.push({
          id: doc.id,
          ...data
        } as unknown as User);
      });

      return {
        success: true,
        data: students
      };
    } catch (error) {
      console.error('Error getting students:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch students'
      };
    }
  }

  /**
   * Delete user (admin only)
   */
  async deleteUser(userId: string): Promise<ApiResponse<void>> {
    try {
      await deleteDoc(doc(db, this.usersCollection, userId));
      
      return {
        success: true,
        message: 'User deleted successfully'
      };
    } catch (error) {
      console.error('Error deleting user:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete user'
      };
    }
  }

  // ==================== SUBJECT OPERATIONS ====================

  /**
   * Get all subjects
   */
  async getSubjects(): Promise<ApiResponse<Subject[]>> {
    try {
      const querySnapshot = await getDocs(collection(db, this.subjectsCollection));
      const subjects: Subject[] = [];

      querySnapshot.forEach((doc) => {
        subjects.push({
          id: doc.id,
          ...doc.data()
        } as Subject);
      });

      return {
        success: true,
        data: subjects
      };
    } catch (error) {
      console.error('Error getting subjects:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch subjects'
      };
    }
  }

  /**
   * Get subject by ID
   */
  async getSubject(subjectId: string): Promise<Subject | null> {
    try {
      const subjectDoc = await getDoc(doc(db, this.subjectsCollection, subjectId));
      
      if (subjectDoc.exists()) {
        return {
          id: subjectDoc.id,
          ...subjectDoc.data()
        } as Subject;
      }
      
      return null;
    } catch (error) {
      console.error('Error getting subject:', error);
      throw error;
    }
  }

  /**
   * Create subject (admin only)
   */
  async createSubject(subjectData: Omit<Subject, 'id'>): Promise<ApiResponse<Subject>> {
    try {
      const subjectRef = doc(collection(db, this.subjectsCollection));
      
      await setDoc(subjectRef, {
        ...subjectData,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });

      const createdSubject = await this.getSubject(subjectRef.id);
      
      return {
        success: true,
        data: createdSubject!,
        message: 'Subject created successfully'
      };
    } catch (error) {
      console.error('Error creating subject:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create subject'
      };
    }
  }

  /**
   * Update subject (admin only)
   */
  async updateSubject(subjectId: string, updates: Partial<Subject>): Promise<ApiResponse<Subject>> {
    try {
      const subjectRef = doc(db, this.subjectsCollection, subjectId);
      
      await updateDoc(subjectRef, {
        ...updates,
        updatedAt: Timestamp.now()
      });

      const updatedSubject = await this.getSubject(subjectId);
      
      return {
        success: true,
        data: updatedSubject!,
        message: 'Subject updated successfully'
      };
    } catch (error) {
      console.error('Error updating subject:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update subject'
      };
    }
  }

  /**
   * Delete subject (admin only)
   */
  async deleteSubject(subjectId: string): Promise<ApiResponse<void>> {
    try {
      await deleteDoc(doc(db, this.subjectsCollection, subjectId));
      
      return {
        success: true,
        message: 'Subject deleted successfully'
      };
    } catch (error) {
      console.error('Error deleting subject:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete subject'
      };
    }
  }

  // ==================== DOCUMENT OPERATIONS ====================

  /**
   * Get documents for a user
   */
  async getUserDocuments(userId: string): Promise<ApiResponse<Document[]>> {
    try {
      const q = query(
        collection(db, this.documentsCollection),
        where('userId', '==', userId),
        orderBy('uploadedAt', 'desc')
      );

      const querySnapshot = await getDocs(q);
      const documents: Document[] = [];

      querySnapshot.forEach((doc) => {
        documents.push({
          id: doc.id,
          ...doc.data()
        } as Document);
      });

      return {
        success: true,
        data: documents
      };
    } catch (error) {
      console.error('Error getting user documents:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch documents'
      };
    }
  }

  /**
   * Get all documents (admin only)
   */
  async getAllDocuments(): Promise<ApiResponse<Document[]>> {
    try {
      const q = query(
        collection(db, this.documentsCollection),
        orderBy('uploadedAt', 'desc')
      );

      const querySnapshot = await getDocs(q);
      const documents: Document[] = [];

      querySnapshot.forEach((doc) => {
        documents.push({
          id: doc.id,
          ...doc.data()
        } as Document);
      });

      return {
        success: true,
        data: documents
      };
    } catch (error) {
      console.error('Error getting all documents:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch documents'
      };
    }
  }

  /**
   * Save document metadata
   */
  async saveDocument(documentData: Omit<Document, 'id'>): Promise<ApiResponse<Document>> {
    try {
      const docRef = doc(collection(db, this.documentsCollection));
      
      await setDoc(docRef, {
        ...documentData,
        uploadedAt: Timestamp.now()
      });

      const savedDoc = await getDoc(docRef);
      
      return {
        success: true,
        data: {
          id: savedDoc.id,
          ...savedDoc.data()
        } as Document,
        message: 'Document saved successfully'
      };
    } catch (error) {
      console.error('Error saving document:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to save document'
      };
    }
  }

  /**
   * Update document status (admin only)
   */
  async updateDocumentStatus(
    documentId: string,
    status: 'pending' | 'approved' | 'rejected',
    remarks?: string
  ): Promise<ApiResponse<Document>> {
    try {
      const docRef = doc(db, this.documentsCollection, documentId);
      
      await updateDoc(docRef, {
        status,
        remarks: remarks || '',
        verifiedAt: status !== 'pending' ? Timestamp.now() : null
      });

      const updatedDoc = await getDoc(docRef);
      
      return {
        success: true,
        data: {
          id: updatedDoc.id,
          ...updatedDoc.data()
        } as Document,
        message: 'Document status updated successfully'
      };
    } catch (error) {
      console.error('Error updating document status:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update document status'
      };
    }
  }

  /**
   * Delete document
   */
  async deleteDocument(documentId: string): Promise<ApiResponse<void>> {
    try {
      await deleteDoc(doc(db, this.documentsCollection, documentId));
      
      return {
        success: true,
        message: 'Document deleted successfully'
      };
    } catch (error) {
      console.error('Error deleting document:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete document'
      };
    }
  }
}

// Export singleton instance
export const databaseService = new DatabaseService();
export default databaseService;
