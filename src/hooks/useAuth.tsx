
import { useState, useEffect, createContext, useContext } from 'react';

/**
 * User interface representing authenticated user data
 */
interface User {
  id: string;
  name: string;
  email: string;
}

/**
 * Authentication context type definition
 */
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (user: User) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Authentication provider component that manages user authentication state
 * @param children - React children components
 * @returns JSX element providing authentication context
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  /**
   * Effect to check for stored user data on app initialization
   */
  useEffect(() => {
    // Check for stored user on app load
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('user');
      }
    }
  }, []);

  /**
   * Signs in a user and stores their data in localStorage
   * @param user - User object containing authentication data
   */
  const signIn = (user: User) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  /**
   * Signs out the current user and removes their data from localStorage
   */
  const signOut = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Custom hook to access authentication context
 * @returns Authentication context with user data and auth methods
 * @throws Error if used outside of AuthProvider
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
