import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  userType: 'citizen' | 'worker' | 'admin';
  profession?: string;
  experience?: string;
  verified: boolean;
  certified: boolean;
  hiremeCoin: number;
  rating: number;
  reviewsCount: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (identifier: string, password: string) => Promise<boolean>;
  signup: (userData: any, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStoredUser();
  }, []);

  const loadStoredUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('@user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error loading stored user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (identifier: string, password: string): Promise<boolean> => {
    try {
      // Admin check
      const adminEmails = ['mohmax25210@gmail.com', 'mohmax2@yahoo.com', 'mohmax25221@gmail.com'];
      const adminPhone = '+213672456386';
      
      if (adminEmails.includes(identifier) || identifier === adminPhone) {
        const adminUser: User = {
          id: 'admin-1',
          name: 'المدير العام',
          email: identifier.includes('@') ? identifier : 'mohmax25210@gmail.com',
          phone: identifier.includes('@') ? '+213672456386' : identifier,
          userType: 'admin',
          verified: true,
          certified: true,
          hiremeCoin: 999999,
          rating: 5.0,
          reviewsCount: 0,
        };
        
        setUser(adminUser);
        await AsyncStorage.setItem('@user', JSON.stringify(adminUser));
        return true;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock successful login
      const mockUser: User = {
        id: '1',
        name: 'أحمد محمد',
        email: identifier.includes('@') ? identifier : 'ahmed@example.com',
        phone: identifier.includes('@') ? '+213555123456' : identifier,
        userType: 'citizen',
        verified: false,
        certified: false,
        hiremeCoin: 500,
        rating: 0,
        reviewsCount: 0,
      };

      setUser(mockUser);
      await AsyncStorage.setItem('@user', JSON.stringify(mockUser));
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const signup = async (userData: any, password: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      const newUser: User = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        userType: userData.userType,
        profession: userData.profession,
        experience: userData.experience,
        verified: false,
        certified: false,
        hiremeCoin: userData.userType === 'worker' ? 500 : 0,
        rating: 0,
        reviewsCount: 0,
      };

      setUser(newUser);
      await AsyncStorage.setItem('@user', JSON.stringify(newUser));
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      await AsyncStorage.removeItem('@user');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateUser = async (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      await AsyncStorage.setItem('@user', JSON.stringify(updatedUser));
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};