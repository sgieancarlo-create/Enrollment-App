import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { mockAuth } from '../config/mockAuth';

interface User {
  email: string;
  uid: string;
  name?: string;
  profilePicture?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name?: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: { name?: string; profilePicture?: string }) => Promise<void>;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  updateProfilePicture: (uri: string) => Promise<void>;
  removeProfilePicture: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const operationsInProgress = useRef<Set<string>>(new Set());

  // Initialize and check for existing session
  useEffect(() => {
    const initAuth = async () => {
      try {
        console.log('[AuthProvider] Initializing auth...');
        await mockAuth.initialize();
        const currentUser = await mockAuth.currentUser();
        console.log('[AuthProvider] Current user after init:', currentUser?.email || 'none');
        setUser(currentUser);
      } catch (error) {
        console.error('[AuthProvider] Auth initialization error:', error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    const operationKey = `signin:${email}`;
    
    if (operationsInProgress.current.has(operationKey)) {
      console.log('[AuthProvider] Sign in already in progress, ignoring duplicate call');
      return;
    }
    
    operationsInProgress.current.add(operationKey);
    
    try {
      const user = await mockAuth.signInWithEmailAndPassword(email, password);
      setUser(user);
    } finally {
      operationsInProgress.current.delete(operationKey);
    }
  };

  const signUp = async (email: string, password: string, name?: string) => {
    const operationKey = `signup:${email}`;
    
    if (operationsInProgress.current.has(operationKey)) {
      console.log('[AuthProvider] Sign up already in progress, ignoring duplicate call');
      return;
    }
    
    operationsInProgress.current.add(operationKey);
    
    try {
      const user = await mockAuth.createUserWithEmailAndPassword(email, password, name);
      setUser(user);
    } finally {
      operationsInProgress.current.delete(operationKey);
    }
  };

  const signOut = async () => {
    await mockAuth.signOut();
    setUser(null);
  };

  const updateProfile = async (updates: { name?: string; profilePicture?: string }) => {
    if (!user) {
      throw new Error('No user logged in');
    }

    const operationKey = `updateProfile:${user.email}`;
    
    if (operationsInProgress.current.has(operationKey)) {
      console.log('[AuthProvider] Profile update already in progress, ignoring duplicate call');
      return;
    }
    
    operationsInProgress.current.add(operationKey);
    
    try {
      const updatedUser = await mockAuth.updateProfile(user.email, updates);
      setUser(updatedUser);
    } finally {
      operationsInProgress.current.delete(operationKey);
    }
  };

  const updatePassword = async (currentPassword: string, newPassword: string) => {
    if (!user) {
      throw new Error('No user logged in');
    }

    const operationKey = `updatePassword:${user.email}`;
    
    if (operationsInProgress.current.has(operationKey)) {
      console.log('[AuthProvider] Password update already in progress, ignoring duplicate call');
      return;
    }
    
    operationsInProgress.current.add(operationKey);
    
    try {
      await mockAuth.updatePassword(user.email, currentPassword, newPassword);
    } finally {
      operationsInProgress.current.delete(operationKey);
    }
  };

  const updateProfilePicture = async (uri: string) => {
    if (!user) {
      throw new Error('No user logged in');
    }

    const operationKey = `updateProfilePicture:${user.email}`;
    
    if (operationsInProgress.current.has(operationKey)) {
      console.log('[AuthProvider] Profile picture update already in progress, ignoring duplicate call');
      return;
    }
    
    operationsInProgress.current.add(operationKey);
    
    try {
      const updatedUser = await mockAuth.updateProfile(user.email, { profilePicture: uri });
      setUser(updatedUser);
    } finally {
      operationsInProgress.current.delete(operationKey);
    }
  };

  const removeProfilePicture = async () => {
    if (!user) {
      throw new Error('No user logged in');
    }

    const operationKey = `removeProfilePicture:${user.email}`;
    
    if (operationsInProgress.current.has(operationKey)) {
      console.log('[AuthProvider] Profile picture removal already in progress, ignoring duplicate call');
      return;
    }
    
    operationsInProgress.current.add(operationKey);
    
    try {
      const updatedUser = await mockAuth.updateProfile(user.email, { profilePicture: undefined });
      setUser(updatedUser);
    } finally {
      operationsInProgress.current.delete(operationKey);
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        signIn, 
        signUp, 
        signOut, 
        updateProfile, 
        updatePassword,
        updateProfilePicture,
        removeProfilePicture,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
