
import React, { createContext, useContext, useState, ReactNode } from 'react';

/**
 * User interface for authentication
 */
interface User {
  id: string;
  name: string;
  email: string;
}

/**
 * Authentication context interface
 */
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (user: User) => void;
  signOut: () => void;
}

/**
 * Authentication context with default values
 */
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  signIn: () => {},
  signOut: () => {},
});

/**
 * Props interface for AuthProvider component
 */
interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Authentication provider component that manages user authentication state
 * @param children - Child components to wrap with authentication context
 * @returns JSX element providing authentication context
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  /**
   * Signs in a user and updates the authentication state
   * @param userData - User data to sign in
   */
  const signIn = (userData: User) => {
    setUser(userData);
  };

  /**
   * Signs out the current user and clears authentication state
   */
  const signOut = () => {
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Custom hook to access authentication context
 * @returns Authentication context with user state and auth functions
 * @throws Error if used outside of AuthProvider
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
