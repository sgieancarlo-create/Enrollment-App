import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { mockAuth } from '../config/mockAuth';

interface User {
  email: string;
  uid: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
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

  const signUp = async (email: string, password: string) => {
    const operationKey = `signup:${email}`;
    
    if (operationsInProgress.current.has(operationKey)) {
      console.log('[AuthProvider] Sign up already in progress, ignoring duplicate call');
      return;
    }
    
    operationsInProgress.current.add(operationKey);
    
    try {
      const user = await mockAuth.createUserWithEmailAndPassword(email, password);
      setUser(user);
    } finally {
      operationsInProgress.current.delete(operationKey);
    }
  };

  const signOut = async () => {
    await mockAuth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
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
