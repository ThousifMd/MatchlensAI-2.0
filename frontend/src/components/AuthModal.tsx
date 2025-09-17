"use client";

import React, { useState } from 'react';
import { SignIn, SignUp } from '@clerk/nextjs';
import { X } from 'lucide-react';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
    const [isSignUp, setIsSignUp] = useState(false);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-md bg-[#1a1a1a] border border-[#374151] rounded-xl shadow-2xl">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-white transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Header */}
                <div className="p-6 pb-4">
                    <h2 className="text-2xl font-bold text-white mb-2">
                        {isSignUp ? 'Create Account' : 'Sign In'}
                    </h2>
                    <p className="text-gray-400 text-sm">
                        {isSignUp
                            ? 'Join thousands who have transformed their profiles'
                            : 'Welcome back! Sign in to continue'
                        }
                    </p>
                </div>

                {/* Toggle buttons */}
                <div className="px-6 pb-4">
                    <div className="flex bg-[#2a2a2a] rounded-lg p-1">
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
                </div>

                {/* Clerk Components */}
                <div className="px-6 pb-6">
                    {isSignUp ? (
                        <SignUp
                            routing="hash"
                            appearance={{
                                variables: {
                                    colorPrimary: "#d4ae36",
                                    colorBackground: "#000000",
                                    colorInputBackground: "#2a2a2a",
                                    colorInputText: "#ffffff",
                                    colorText: "#ffffff",
                                    colorTextSecondary: "#9ca3af",
                                    colorDanger: "#ef4444",
                                    colorSuccess: "#10b981",
                                    colorWarning: "#f59e0b",
                                    borderRadius: "0.5rem",
                                    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                                    fontSize: "0.95rem"
                                },
                                elements: {
                                    card: "bg-transparent border-none shadow-none",
                                    headerTitle: "text-white font-semibold text-xl",
                                    headerSubtitle: "text-[#9ca3af] text-sm",
                                    formButtonPrimary: "bg-[#d4ae36] hover:bg-[#c19d2f] text-black font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl",
                                    formFieldInput: "bg-[#2a2a2a] border border-[#374151] text-white placeholder-[#9ca3af] focus:border-[#d4ae36] focus:ring-2 focus:ring-[#d4ae36]/20 rounded-lg py-3 px-4 transition-all duration-200",
                                    formFieldLabel: "text-white font-medium text-sm mb-2",
                                    socialButtonsBlockButton: "bg-[#2a2a2a] hover:bg-[#374151] text-white border border-[#d4ae36] hover:border-[#c19d2f] rounded-lg py-3 px-4 transition-all duration-200 flex-1",
                                    socialButtonsBlockButton__tiktok: "bg-black hover:bg-[#1a1a1a] text-white border border-[#d4ae36] hover:border-[#c19d2f] rounded-lg py-3 px-4 transition-all duration-200 flex-1",
                                    socialButtonsBlock: "flex gap-2 justify-between items-stretch",
                                    footerActionLink: "text-[#d4ae36] hover:text-[#c19d2f] font-medium transition-colors duration-200",
                                    formResendCodeLink: "text-[#d4ae36] hover:text-[#c19d2f] font-medium transition-colors duration-200",
                                    identityPreviewText: "text-[#9ca3af] text-sm",
                                    userPreviewMainIdentifier: "text-white font-semibold",
                                    userPreviewSecondaryIdentifier: "text-[#9ca3af] text-sm"
                                },
                                layout: {
                                    socialButtonsPlacement: "bottom",
                                    socialButtonsVariant: "blockButton",
                                    showOptionalFields: true
                                }
                            }}
                        />
                    ) : (
                        <SignIn
                            routing="hash"
                            appearance={{
                                variables: {
                                    colorPrimary: "#d4ae36",
                                    colorBackground: "#000000",
                                    colorInputBackground: "#2a2a2a",
                                    colorInputText: "#ffffff",
                                    colorText: "#ffffff",
                                    colorTextSecondary: "#9ca3af",
                                    colorDanger: "#ef4444",
                                    colorSuccess: "#10b981",
                                    colorWarning: "#f59e0b",
                                    borderRadius: "0.5rem",
                                    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                                    fontSize: "0.95rem"
                                },
                                elements: {
                                    card: "bg-transparent border-none shadow-none",
                                    headerTitle: "text-white font-semibold text-xl",
                                    headerSubtitle: "text-[#9ca3af] text-sm",
                                    formButtonPrimary: "bg-[#d4ae36] hover:bg-[#c19d2f] text-black font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl",
                                    formFieldInput: "bg-[#2a2a2a] border border-[#374151] text-white placeholder-[#9ca3af] focus:border-[#d4ae36] focus:ring-2 focus:ring-[#d4ae36]/20 rounded-lg py-3 px-4 transition-all duration-200",
                                    formFieldLabel: "text-white font-medium text-sm mb-2",
                                    socialButtonsBlockButton: "bg-[#2a2a2a] hover:bg-[#374151] text-white border border-[#d4ae36] hover:border-[#c19d2f] rounded-lg py-3 px-4 transition-all duration-200 flex-1",
                                    socialButtonsBlockButton__tiktok: "bg-black hover:bg-[#1a1a1a] text-white border border-[#d4ae36] hover:border-[#c19d2f] rounded-lg py-3 px-4 transition-all duration-200 flex-1",
                                    socialButtonsBlock: "flex gap-2 justify-between items-stretch",
                                    footerActionLink: "text-[#d4ae36] hover:text-[#c19d2f] font-medium transition-colors duration-200",
                                    formResendCodeLink: "text-[#d4ae36] hover:text-[#c19d2f] font-medium transition-colors duration-200",
                                    identityPreviewText: "text-[#9ca3af] text-sm",
                                    userPreviewMainIdentifier: "text-white font-semibold",
                                    userPreviewSecondaryIdentifier: "text-[#9ca3af] text-sm"
                                },
                                layout: {
                                    socialButtonsPlacement: "bottom",
                                    socialButtonsVariant: "blockButton",
                                    showOptionalFields: true
                                }
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
