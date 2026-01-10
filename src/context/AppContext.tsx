import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { LoadingState } from '../types';

interface AppContextType {
  // Global loading state
  globalLoading: LoadingState;
  setGlobalLoading: (loading: LoadingState) => void;

  // App-wide error handling
  showError: (error: string) => void;
  clearError: () => void;

  // Success messages
  showSuccess: (message: string) => void;
  clearSuccess: () => void;

  // Refresh triggers
  refreshTrigger: number;
  triggerRefresh: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [globalLoading, setGlobalLoading] = useState<LoadingState>({
    isLoading: false,
    error: null
  });

  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Error handling
  const showError = (error: string) => {
    setGlobalLoading({
      isLoading: false,
      error
    });
  };

  const clearError = () => {
    setGlobalLoading(prev => ({
      ...prev,
      error: null
    }));
  };

  // Success messages
  const showSuccess = (message: string) => {
    // You can implement a toast notification system here
    console.log('Success:', message);
  };

  const clearSuccess = () => {
    // Clear success message if implemented
  };

  // Refresh trigger
  const triggerRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const value: AppContextType = {
    globalLoading,
    setGlobalLoading,
    showError,
    clearError,
    showSuccess,
    clearSuccess,
    refreshTrigger,
    triggerRefresh
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use app context
export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export default AppContext;
