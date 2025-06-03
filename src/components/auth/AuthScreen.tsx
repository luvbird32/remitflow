
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';

/**
 * Props interface for the AuthScreen component
 */
interface AuthScreenProps {
  onAuthenticated: (user: { name: string; email: string }) => void;
}

/**
 * Authentication screen component with sign in and sign up forms
 * @param onAuthenticated - Callback function called when user is authenticated
 * @returns JSX element containing the authentication interface
 */
export function AuthScreen({ onAuthenticated }: AuthScreenProps) {
  const [activeTab, setActiveTab] = useState('signin');

  return (
    <div className="min-h-screen flex items-center justify-center gradient-bg p-4">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl mb-4 shadow-xl shadow-teal-500/25">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold gradient-text mb-2">
            RemitFlow
          </h1>
          <p className="text-slate-600">
            Your trusted partner for international money transfers
          </p>
        </div>

        <Card className="modern-card">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-slate-800">
              Welcome
            </CardTitle>
            <CardDescription className="text-slate-600">
              Sign in to your account or create a new one to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-slate-100/50 rounded-lg p-1">
                <TabsTrigger 
                  value="signin" 
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md transition-all duration-200"
                >
                  Sign In
                </TabsTrigger>
                <TabsTrigger 
                  value="signup" 
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md transition-all duration-200"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>
              
              <div className="mt-6">
                <TabsContent value="signin" className="space-y-4">
                  <SignInForm onSuccess={onAuthenticated} />
                </TabsContent>
                
                <TabsContent value="signup" className="space-y-4">
                  <SignUpForm onSuccess={onAuthenticated} />
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="modern-card p-4">
            <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-xs font-medium text-slate-700">Secure</p>
          </div>
          <div className="modern-card p-4">
            <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <svg className="w-4 h-4 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <p className="text-xs font-medium text-slate-700">Fast</p>
          </div>
          <div className="modern-card p-4">
            <div className="w-8 h-8 bg-coral-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <svg className="w-4 h-4 text-coral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <p className="text-xs font-medium text-slate-700">Low Cost</p>
          </div>
        </div>
      </div>
    </div>
  );
}
