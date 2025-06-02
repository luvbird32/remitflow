
import { useState } from 'react';
import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';

interface AuthScreenProps {
  onAuthenticated: (user: { id: string; name: string; email: string }) => void;
}

export function AuthScreen({ onAuthenticated }: AuthScreenProps) {
  const [isSignUp, setIsSignUp] = useState(false);

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
