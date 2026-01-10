import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  uploadBytesResumable,
  type UploadTaskSnapshot
} from 'firebase/storage';
import { storage } from '../config/firebase';
import type { ApiResponse } from '../types';

/**
 * Storage Service
 * Handles all Firebase Storage operations for file uploads
 */
class StorageService {
  /**
   * Upload document to Firebase Storage
   */
  async uploadDocument(
    file: any,
    studentId: string,
    fileName: string,
    onProgress?: (progress: number) => void
  ): Promise<ApiResponse<{ downloadUrl: string; filePath: string; fileSize: number }>> {
    try {
      // Create file path: documents/{studentId}/{timestamp}_{fileName}
      const timestamp = Date.now();
      const filePath = `documents/${studentId}/${timestamp}_${fileName}`;
      const storageRef = ref(storage, filePath);

      // Upload file with progress tracking
      const uploadTask = uploadBytesResumable(storageRef, file);

      return new Promise((resolve) => {
        uploadTask.on(
          'state_changed',
          (snapshot: UploadTaskSnapshot) => {
            // Calculate progress
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            if (onProgress) {
              onProgress(progress);
            }
          },
          (error) => {
            console.error('Upload error:', error);
            resolve({
              success: false,
              error: error.message || 'Failed to upload file'
            });
          },
          async () => {
            try {
              // Get download URL
              const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);

              resolve({
                success: true,
                data: {
                  downloadUrl,
                  filePath,
                  fileSize: uploadTask.snapshot.totalBytes
                },
                message: 'File uploaded successfully'
              });
            } catch (error: any) {
              console.error('Get download URL error:', error);
              resolve({
                success: false,
                error: 'Failed to get download URL'
              });
            }
          }
        );
      });
    } catch (error: any) {
      console.error('Upload document error:', error);
      return {
        success: false,
        error: error.message || 'Failed to upload document'
      };
    }
  }

  /**
   * Upload profile picture
   */
  async uploadProfilePicture(
    file: any,
    userId: string,
    onProgress?: (progress: number) => void
  ): Promise<ApiResponse<{ downloadUrl: string; filePath: string; fileSize: number }>> {
    try {
      // Create file path: profiles/{userId}/profile.jpg
      const filePath = `profiles/${userId}/profile.jpg`;
      const storageRef = ref(storage, filePath);

      // Upload file with progress tracking
      const uploadTask = uploadBytesResumable(storageRef, file);

      return new Promise((resolve) => {
        uploadTask.on(
          'state_changed',
          (snapshot: UploadTaskSnapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            if (onProgress) {
              onProgress(progress);
            }
          },
          (error) => {
            console.error('Profile picture upload error:', error);
            resolve({
              success: false,
              error: error.message || 'Failed to upload profile picture'
            });
          },
          async () => {
            try {
              const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);

              resolve({
                success: true,
                data: {
                  downloadUrl,
                  filePath,
                  fileSize: uploadTask.snapshot.totalBytes
                },
                message: 'Profile picture uploaded successfully'
              });
            } catch (error: any) {
              console.error('Get profile picture URL error:', error);
              resolve({
                success: false,
                error: 'Failed to get profile picture URL'
              });
            }
          }
        );
      });
    } catch (error: any) {
      console.error('Upload profile picture error:', error);
      return {
        success: false,
        error: error.message || 'Failed to upload profile picture'
      };
    }
  }

  /**
   * Delete file from storage
   */
  async deleteFile(filePath: string): Promise<ApiResponse<null>> {
    try {
      const fileRef = ref(storage, filePath);
      await deleteObject(fileRef);

      return {
        success: true,
        message: 'File deleted successfully'
      };
    } catch (error: any) {
      console.error('Delete file error:', error);

      // If file doesn't exist, consider it a success
      if (error.code === 'storage/object-not-found') {
        return {
          success: true,
          message: 'File deleted successfully'
        };
      }

      return {
        success: false,
        error: error.message || 'Failed to delete file'
      };
    }
  }

  /**
   * Get download URL for existing file
   */
  async getDownloadUrl(filePath: string): Promise<string | null> {
    try {
      const fileRef = ref(storage, filePath);
      return await getDownloadURL(fileRef);
    } catch (error) {
      console.error('Get download URL error:', error);
      return null;
    }
  }

  /**
   * Validate file before upload
   */
  validateFile(file: any, allowedTypes: string[], maxSize: number): { isValid: boolean; error?: string } {
    // Check file type
    if (!allowedTypes.includes(file.type)) {
      return {
        isValid: false,
        error: `Invalid file type. Allowed types: ${allowedTypes.join(', ')}`
      };
    }

    // Check file size
    if (file.size > maxSize) {
      const maxSizeMB = maxSize / (1024 * 1024);
      return {
        isValid: false,
        error: `File size too large. Maximum size: ${maxSizeMB}MB`
      };
    }

    return { isValid: true };
  }

  /**
   * Get file extension from filename
   */
  getFileExtension(fileName: string): string {
    return fileName.split('.').pop()?.toLowerCase() || '';
  }

  /**
   * Generate unique filename
   */
  generateUniqueFileName(originalName: string): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    const extension = this.getFileExtension(originalName);
    return `${timestamp}_${random}.${extension}`;
  }

  /**
   * Convert file to blob (for React Native)
   */
  async fileToBlob(file: any): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result instanceof ArrayBuffer) {
          const blob = new Blob([reader.result], { type: file.type });
          resolve(blob);
        } else {
          reject(new Error('Failed to convert file to blob'));
        }
      };
      reader.onerror = () => reject(new Error('File reading error'));
      reader.readAsArrayBuffer(file);
    });
  }

  /**
   * Get file metadata
   */
  getFileMetadata(file: any) {
    return {
      name: file.name || 'unknown',
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
      extension: this.getFileExtension(file.name || '')
    };
  }

  /**
   * Check if file exists
   */
  async fileExists(filePath: string): Promise<boolean> {
    try {
      const fileRef = ref(storage, filePath);
      await getDownloadURL(fileRef);
      return true;
    } catch (error: any) {
      if (error.code === 'storage/object-not-found') {
        return false;
      }
      throw error;
    }
  }

  /**
   * Get file metadata from storage
   */
  async getFileMetadataFromStorage(filePath: string): Promise<any> {
    try {
      const fileRef = ref(storage, filePath);
      // Note: Firebase Storage doesn't provide direct metadata access
      // This would need to be stored in Firestore along with the file record
      const downloadUrl = await getDownloadURL(fileRef);
      return {
        downloadUrl,
        filePath,
        exists: true
      };
    } catch (error) {
      console.error('Get file metadata error:', error);
      return {
        exists: false,
        error: error.message
      };
    }
  }
}

// Export singleton instance
export default new StorageService();
