import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Theme, ThemeMode } from '../types';

// Storage key for theme preference
const THEME_STORAGE_KEY = '@theme';

// Define color schemes for light and dark modes
const lightTheme: Theme = {
  mode: 'light',
  colors: {
    primary: '#3498db',
    secondary: '#2ecc71',
    background: '#f5f7fa',
    surface: '#ffffff',
    text: '#2c3e50',
    textSecondary: '#7f8c8d',
    border: '#ecf0f1',
    error: '#e74c3c',
    success: '#27ae60',
    warning: '#f39c12',
    info: '#3498db',
  },
};

const darkTheme: Theme = {
  mode: 'dark',
  colors: {
    primary: '#3498db',
    secondary: '#2ecc71',
    background: '#1a1a1a',
    surface: '#2c2c2c',
    text: '#ecf0f1',
    textSecondary: '#95a5a6',
    border: '#34495e',
    error: '#e74c3c',
    success: '#27ae60',
    warning: '#f39c12',
    info: '#3498db',
  },
};

interface ThemeContextType {
  theme: Theme;
  themeMode: ThemeMode;
  toggleTheme: () => void;
  setThemeMode: (mode: ThemeMode) => void;
  isLoading: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeMode, setThemeModeState] = useState<ThemeMode>('light');
  const [isLoading, setIsLoading] = useState(true);

  // Load theme preference from AsyncStorage on mount
  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme === 'light' || savedTheme === 'dark') {
        setThemeModeState(savedTheme);
      }
    } catch (error) {
      console.error('[ThemeProvider] Failed to load theme preference:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setThemeMode = async (mode: ThemeMode) => {
    try {
      setThemeModeState(mode);
      await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
      console.log('[ThemeProvider] Theme changed to:', mode);
    } catch (error) {
      console.error('[ThemeProvider] Failed to save theme preference:', error);
    }
  };

  const toggleTheme = () => {
    const newMode = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(newMode);
  };

  const theme = themeMode === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeMode,
        toggleTheme,
        setThemeMode,
        isLoading,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook to access theme context
 * @returns Theme context with current theme, mode, and toggle function
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

/**
 * Get theme colors (convenience function)
 * @returns Current theme colors
 */
export function useThemeColors() {
  const { theme } = useTheme();
  return theme.colors;
}
