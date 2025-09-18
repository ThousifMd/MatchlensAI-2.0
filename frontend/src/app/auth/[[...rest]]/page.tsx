"use client";

import { SignIn, SignUp, useUser } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import { trackCTAClick, trackLead, trackCompleteRegistration } from '@/lib/metaPixel';
import { trackRedditLead, trackRedditCompleteRegistration } from '@/lib/redditPixel';

export default function AuthPage() {
    const [isSignUp, setIsSignUp] = useState(false);
    const [hasTrackedSignUp, setHasTrackedSignUp] = useState(false);
    const { user, isLoaded } = useUser();

    // Track when user completes sign-up
    useEffect(() => {
        if (isLoaded && user && !hasTrackedSignUp) {
            // Check if this is a new user (created within last 30 seconds)
            const userCreatedAt = new Date(user.createdAt);
            const now = new Date();
            const timeDiff = now.getTime() - userCreatedAt.getTime();

            if (timeDiff < 30000) { // 30 seconds
                console.log('🎉 New user sign-up detected, tracking registration event');

                // Track sign-up completion
                const signUpData = {
                    user_id: user.id,
                    email: user.primaryEmailAddress?.emailAddress,
                    name: user.fullName,
                    signup_method: 'Clerk',
                    signup_source: 'Auth Page'
                };

                trackCompleteRegistration(signUpData);
                trackRedditCompleteRegistration(signUpData);

                setHasTrackedSignUp(true);
            }
        }
    }, [user, isLoaded, hasTrackedSignUp]);

    const handleSignUpClick = () => {
        // Track sign-up button click
        trackCTAClick("Sign Up Button", "Auth Page");
        trackLead("Auth Page Sign Up");
        trackRedditLead("Auth Page Sign Up");
        setIsSignUp(true);
    };

    const handleSignInClick = () => {
        // Track sign-in button click
        trackCTAClick("Sign In Button", "Auth Page");
        setIsSignUp(false);
    };

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
                        onClick={handleSignInClick}
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${!isSignUp
                            ? 'bg-[#d4ae36] text-black'
                            : 'text-gray-300 hover:text-white'
                            }`}
                    >
                        Sign In
                    </button>
                    <button
                        onClick={handleSignUpClick}
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
                        <SignUp />
                    ) : (
                        <SignIn />
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
