'use client';

import { SignIn, SignUp, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

// Check if Clerk is configured
const isClerkConfigured = () => {
  return process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && 
         process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY !== 'pk_test_placeholder';
};

export default function AuthPage() {
    const { isSignedIn, isLoaded } = useUser();
    const router = useRouter();
    const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      // User is signed in, redirect to checkout
      router.push('/checkout');
    }
  }, [isLoaded, isSignedIn, router]);

  // If Clerk is not configured, show setup message
  if (!isClerkConfigured()) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
        <div className="container mx-auto px-4 py-6">
          <Button
            variant="ghost"
            onClick={() => router.push('/')}
            className="text-white hover:text-white flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </div>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto text-center">
            <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-6">
              <h1 className="text-2xl font-bold text-yellow-400 mb-4">Setup Required</h1>
              <p className="text-yellow-300 mb-4">
                Clerk authentication is not configured yet. Please set up your Clerk account and add the environment variables.
              </p>
              <Button
                onClick={() => router.push('/checkout')}
                className="bg-[#d4ae36] hover:bg-[#c19d2f] text-black font-semibold"
              >
                Continue to Checkout (Skip Auth)
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show loading while Clerk is initializing
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFD700] mx-auto mb-4"></div>
          <div className="text-white text-xl">Loading authentication...</div>
          <div className="text-gray-400 text-sm mt-2">This may take a moment</div>
        </div>
      </div>
    );
  }

  // If user is already signed in, redirect (this will be handled by useEffect)
  if (isSignedIn) {
    return null;
  }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
            {/* Header */}
            <div className="container mx-auto px-4 py-6">
                <Button
                    variant="ghost"
                    onClick={() => router.push('/')}
                    className="text-white hover:text-white flex items-center gap-2"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Home
                </Button>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-md mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">
                            {isSignUp ? 'Create Your Account' : 'Welcome Back'}
                        </h1>
            <p className="text-gray-300">
              {isSignUp 
                ? 'Sign up to get started with your profile optimization' 
                : 'Sign in to get started with your profile optimization'
              }
            </p>
                    </div>

                    {/* Auth Component */}
                    <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
                        {isSignUp ? (
                            <SignUp
                                appearance={{
                                    elements: {
                                        formButtonPrimary: 'bg-[#d4ae36] hover:bg-[#c19d2f] text-black font-semibold',
                                        card: 'bg-transparent shadow-none',
                                        headerTitle: 'text-white',
                                        headerSubtitle: 'text-gray-300',
                                        socialButtonsBlockButton: 'bg-white/10 hover:bg-white/20 text-white border-white/20',
                                        formFieldInput: 'bg-white/10 border-white/20 text-white placeholder-gray-400',
                                        formFieldLabel: 'text-white',
                                        footerActionLink: 'text-[#d4ae36] hover:text-[#c19d2f]',
                                        identityPreviewText: 'text-gray-300',
                                        formResendCodeLink: 'text-[#d4ae36] hover:text-[#c19d2f]',
                                    }
                                }}
                redirectUrl="/checkout"
                            />
                        ) : (
                            <SignIn
                                appearance={{
                                    elements: {
                                        formButtonPrimary: 'bg-[#d4ae36] hover:bg-[#c19d2f] text-black font-semibold',
                                        card: 'bg-transparent shadow-none',
                                        headerTitle: 'text-white',
                                        headerSubtitle: 'text-gray-300',
                                        socialButtonsBlockButton: 'bg-white/10 hover:bg-white/20 text-white border-white/20',
                                        formFieldInput: 'bg-white/10 border-white/20 text-white placeholder-gray-400',
                                        formFieldLabel: 'text-white',
                                        footerActionLink: 'text-[#d4ae36] hover:text-[#c19d2f]',
                                        identityPreviewText: 'text-gray-300',
                                        formResendCodeLink: 'text-[#d4ae36] hover:text-[#c19d2f]',
                                    }
                                }}
                redirectUrl="/checkout"
                            />
                        )}
                    </div>

                    {/* Toggle between Sign In and Sign Up */}
                    <div className="text-center mt-6">
                        <button
                            onClick={() => setIsSignUp(!isSignUp)}
                            className="text-[#d4ae36] hover:text-[#c19d2f] font-medium"
                        >
                            {isSignUp
                                ? 'Already have an account? Sign in'
                                : "Don't have an account? Sign up"
                            }
                        </button>
                    </div>

          {/* Welcome Message */}
          <div className="mt-8 p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg">
            <div className="flex items-center gap-2 text-blue-400">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">Get Started!</span>
            </div>
            <p className="text-blue-300 text-sm mt-1">
              Sign in or create an account to begin your profile optimization journey.
            </p>
          </div>
                </div>
            </div>
        </div>
    );
}
