import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User as FirebaseUser } from 'firebase/auth';
import { authService } from '../services/auth.service';
import { databaseService } from '../services/database.service';
import type { User, ApiResponse } from '../types';

interface AuthContextType {
  // State
  user: User | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;

  // Actions
  login: (email: string, password: string) => Promise<ApiResponse<User>>;
  register: (data: any) => Promise<ApiResponse<User>>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<ApiResponse<void>>;
  refreshUser: () => Promise<void>;

  // Helpers
  isAuthenticated: boolean;
  isAdmin: boolean;
  isStudent: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const USER_STORAGE_KEY = '@enrollment_user';

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Check for stored user data
        const storedUser = await AsyncStorage.getItem(USER_STORAGE_KEY);
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }

        // Listen to Firebase auth state changes
        const unsubscribe = authService.onAuthStateChanged(async (fbUser) => {
          setFirebaseUser(fbUser);

          if (fbUser) {
            // User is signed in, fetch user data from Firestore
            try {
              const userData = await databaseService.getUser(fbUser.uid);
              if (userData) {
                setUser(userData);
                await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
              }
            } catch (error) {
              console.error('Error fetching user data:', error);
            }
          } else {
            // User is signed out
            setUser(null);
            await AsyncStorage.removeItem(USER_STORAGE_KEY);
          }

          setLoading(false);
        });

        return () => unsubscribe();
      } catch (error) {
        console.error('Error initializing auth:', error);
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // Login
  const login = async (email: string, password: string): Promise<ApiResponse<User>> => {
    try {
      setLoading(true);
      const result = await authService.login(email, password);

      if (result.success && result.data) {
        setUser(result.data);
        await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(result.data));
      }

      return result;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Login failed'
      };
    } finally {
      setLoading(false);
    }
  };

  // Register
  const register = async (data: any): Promise<ApiResponse<User>> => {
    try {
      setLoading(true);
      const result = await authService.register(data);

      if (result.success && result.data) {
        setUser(result.data);
        await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(result.data));
      }

      return result;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Registration failed'
      };
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async (): Promise<void> => {
    try {
      setLoading(true);
      await authService.logout();
      setUser(null);
      setFirebaseUser(null);
      await AsyncStorage.removeItem(USER_STORAGE_KEY);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Reset Password
  const resetPassword = async (email: string): Promise<ApiResponse<void>> => {
    try {
      return await authService.resetPassword(email);
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Password reset failed'
      };
    }
  };

  // Refresh user data
  const refreshUser = async (): Promise<void> => {
    if (firebaseUser) {
      try {
        const userData = await databaseService.getUser(firebaseUser.uid);
        if (userData) {
          setUser(userData);
          await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
        }
      } catch (error) {
        console.error('Error refreshing user data:', error);
      }
    }
  };

  // Helper computed values
  const isAuthenticated = !!user && !!firebaseUser;
  const isAdmin = user?.role === 'admin';
  const isStudent = user?.role === 'student';

  const value: AuthContextType = {
    user,
    firebaseUser,
    loading,
    login,
    register,
    logout,
    resetPassword,
    refreshUser,
    isAuthenticated,
    isAdmin,
    isStudent
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
