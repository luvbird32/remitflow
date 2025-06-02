
import { useState } from 'react';
import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';

/**
 * Props for the AuthScreen component
 */
interface AuthScreenProps {
  onAuthenticated: (user: { id: string; name: string; email: string }) => void;
}

/**
 * Authentication screen component that toggles between sign in and sign up forms
 * @param onAuthenticated - Callback function called when user successfully authenticates
 * @returns JSX element containing authentication forms
 */
export function AuthScreen({ onAuthenticated }: AuthScreenProps) {
  const [isSignUp, setIsSignUp] = useState(false);

  /**
   * Handles user sign in with mock authentication
   * @param email - User's email address
   * @param password - User's password
   */
  const handleSignIn = (email: string, password: string) => {
    // Mock authentication - in a real app, this would call your backend
    const mockUser = {
      id: '1',
      name: email.split('@')[0],
      email: email
    };
    
    // Store user in localStorage for persistence
    localStorage.setItem('user', JSON.stringify(mockUser));
    onAuthenticated(mockUser);
  };

  /**
   * Handles user registration with mock authentication
   * @param name - User's full name
   * @param email - User's email address
   * @param password - User's password
   */
  const handleSignUp = (name: string, email: string, password: string) => {
    // Mock registration - in a real app, this would call your backend
    const mockUser = {
      id: Date.now().toString(),
      name: name,
      email: email
    };
    
    // Store user in localStorage for persistence
    localStorage.setItem('user', JSON.stringify(mockUser));
    onAuthenticated(mockUser);
  };

  /**
   * Toggles between sign in and sign up modes
   */
  const toggleMode = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-700 mb-2">RemitFlow</h1>
          <p className="text-blue-600 text-lg">
            Fast, secure, and affordable international money transfers
          </p>
        </div>
        
        {isSignUp ? (
          <SignUpForm onToggleMode={toggleMode} onSignUp={handleSignUp} />
        ) : (
          <SignInForm onToggleMode={toggleMode} onSignIn={handleSignIn} />
        )}
      </div>
    </div>
  );
}
