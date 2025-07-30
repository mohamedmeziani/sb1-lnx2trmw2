import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ThemeContextType {
  isDarkMode: boolean;
  primaryColor: string;
  fontSize: 'small' | 'medium' | 'large';
  toggleTheme: () => Promise<void>;
  setPrimaryColor: (color: string) => Promise<void>;
  setFontSize: (size: 'small' | 'medium' | 'large') => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [primaryColor, setPrimaryColorState] = useState('#3B82F6');
  const [fontSize, setFontSizeState] = useState<'small' | 'medium' | 'large'>('medium');

  useEffect(() => {
    loadStoredTheme();
  }, []);

  const loadStoredTheme = async () => {
    try {
      const storedTheme = await AsyncStorage.getItem('@theme');
      const storedColor = await AsyncStorage.getItem('@primaryColor');
      const storedFontSize = await AsyncStorage.getItem('@fontSize');
      
      if (storedTheme) {
        setIsDarkMode(JSON.parse(storedTheme));
      }
      if (storedColor) {
        setPrimaryColorState(storedColor);
      }
      if (storedFontSize && ['small', 'medium', 'large'].includes(storedFontSize)) {
        setFontSizeState(storedFontSize as 'small' | 'medium' | 'large');
      }
    } catch (error) {
      console.error('Error loading stored theme:', error);
    }
  };

  const toggleTheme = async () => {
    try {
      const newTheme = !isDarkMode;
      setIsDarkMode(newTheme);
      await AsyncStorage.setItem('@theme', JSON.stringify(newTheme));
    } catch (error) {
      console.error('Error storing theme:', error);
    }
  };

  const setPrimaryColor = async (color: string) => {
    try {
      setPrimaryColorState(color);
      await AsyncStorage.setItem('@primaryColor', color);
    } catch (error) {
      console.error('Error storing primary color:', error);
    }
  };

  const setFontSize = async (size: 'small' | 'medium' | 'large') => {
    try {
      setFontSizeState(size);
      await AsyncStorage.setItem('@fontSize', size);
    } catch (error) {
      console.error('Error storing font size:', error);
    }
  };

  const value: ThemeContextType = {
    isDarkMode,
    primaryColor,
    fontSize,
    toggleTheme,
    setPrimaryColor,
    setFontSize,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};