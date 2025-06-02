
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SignInForm } from './SignInForm';

interface AuthScreenProps {
  onAuthenticated: () => void;
}

export function AuthScreen({ onAuthenticated }: AuthScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Welcome to RemitFlow</CardTitle>
          <CardDescription>
            Secure international money transfers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignInForm onSignIn={onAuthenticated} />
        </CardContent>
      </Card>
    </div>
  );
}
