"use client";

import { SignUpButton } from '@clerk/nextjs';
import { trackCTAClick, trackLead } from '@/lib/metaPixel';
import { trackRedditLead } from '@/lib/redditPixel';

interface TrackedSignUpButtonProps {
    children: React.ReactNode;
    className?: string;
    trackingSource?: string;
}

export default function TrackedSignUpButton({
    children,
    className,
    trackingSource = "Unknown"
}: TrackedSignUpButtonProps) {
    const handleSignUpClick = () => {
        // Track sign-up button click
        trackCTAClick("Sign Up Button", trackingSource);
        trackLead(`${trackingSource} Sign Up`);
        trackRedditLead(`${trackingSource} Sign Up`);
    };

    return (
        <div onClick={handleSignUpClick}>
            <SignUpButton className={className}>
                {children}
            </SignUpButton>
        </div>
    );
}
