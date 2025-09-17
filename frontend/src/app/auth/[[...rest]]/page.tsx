"use client";

import { SignIn, SignUp } from '@clerk/nextjs';
import { useState } from 'react';

export default function AuthPage() {
    const [isSignUp, setIsSignUp] = useState(false);

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
            {/* Background elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0E0E0F] to-black"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#d4ae36]/5 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-[#d4ae36]/3 via-transparent to-transparent"></div>

            <div className="relative z-10 w-full max-w-md">
                {/* Toggle between Sign In and Sign Up */}
                <div className="flex mb-6 bg-[#1a1a1a] rounded-lg p-1 border border-[#374151]">
                    <button
                        onClick={() => setIsSignUp(false)}
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${!isSignUp
                            ? 'bg-[#d4ae36] text-black'
                            : 'text-gray-300 hover:text-white'
                            }`}
                    >
                        Sign In
                    </button>
                    <button
                        onClick={() => setIsSignUp(true)}
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${isSignUp
                            ? 'bg-[#d4ae36] text-black'
                            : 'text-gray-300 hover:text-white'
                            }`}
                    >
                        Sign Up
                    </button>
                </div>

                {/* Clerk Components */}
                <div className="bg-[#1a1a1a] border border-[#374151] rounded-xl p-6 shadow-2xl">
                    {isSignUp ? (
                        <SignUp afterSignUpUrl="/onboarding" />
                    ) : (
                        <SignIn afterSignInUrl="/onboarding" />
                    )}
                </div>

                {/* Back to home link */}
                <div className="text-center mt-6">
                    <a
                        href="/"
                        className="text-[#d4ae36] hover:text-[#c19d2f] font-medium transition-colors duration-200"
                    >
                        ← Back to Home
                    </a>
                </div>
            </div>
        </div>
    );
}
