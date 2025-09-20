import type { Metadata } from "next";
import React from "react";
import "./globals.css";
import Script from "next/script";
import { PackageProvider } from "@/contexts/PackageContext";
import { Inter } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});


export const metadata: Metadata = {
  title: "Matchlens AI - Transform Your Profile in 24 Hours | Get 10x More Attention",
  description: "Transform your profile in 24 hours. Get 10x more attention with AI-powered photo enhancement and bio optimization. Perfect for LinkedIn, Instagram, dating apps, and all social platforms.",
  keywords: "profile optimization, AI photo enhancement, social media success, get more attention, profile makeover, bio optimization, LinkedIn optimization, Instagram success, professional photos",
  authors: [{ name: "Matchlens AI" }],
  creator: "Matchlens AI",
  publisher: "Matchlens AI",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://matchlens.ai",
    siteName: "Matchlens AI",
    title: "Matchlens AI - Transform Your Profile in 24 Hours | Get 10x More Attention",
    description: "Transform your profile in 24 hours. Get 10x more attention with AI-powered photo enhancement and bio optimization. Perfect for LinkedIn, Instagram, dating apps, and all social platforms.",
    images: [
      {
        url: "/logos/matchboost-logo.svg",
        width: 1200,
        height: 630,
        alt: "Matchlens AI - Profile Optimization",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Matchlens AI - Transform Your Profile in 24 Hours | Get 10x More Attention",
    description: "Transform your profile in 24 hours. Get 10x more attention with AI-powered photo enhancement and bio optimization. Perfect for LinkedIn, Instagram, dating apps, and all social platforms.",
    images: ["/logos/matchboost-logo.svg"],
    creator: "@matchlensai",
  },
  icons: {
    icon: [
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
        sizes: 'any',
      },
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
        sizes: '32x32',
      },
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
        sizes: '16x16',
      }
    ],
    apple: [
      {
        url: '/favicon.svg',
        sizes: '180x180',
        type: 'image/svg+xml',
      }
    ],
    shortcut: '/favicon.svg',
  },
  manifest: '/manifest.json',
  other: {
    'msapplication-TileColor': '#d4ae36',
    'theme-color': '#d4ae36',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Security headers for payment processing */}
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />

        {/* Meta Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1276626097276316');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1276626097276316&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Meta Pixel Code */}

        {/* Reddit Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(w,d){if(!w.rdt){var p=w.rdt=function(){p.sendEvent?p.sendEvent.apply(p,arguments):p.callQueue.push(arguments)};p.callQueue=[];var t=d.createElement("script");t.src="https://www.redditstatic.com/ads/pixel.js",t.async=!0;var s=d.getElementsByTagName("script")[0];s.parentNode.insertBefore(t,s)}}(window,document);
              rdt('init','a2_hp0yo1p5fwv8');
              rdt('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.reddit.com/i/adsct?bq=a2_hp0yo1p5fwv8&event=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Reddit Pixel Code */}

        {/* Microsoft Clarity Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "tdaqgbpm46");
            `,
          }}
        />
        {/* End Microsoft Clarity Code */}

        {/* Fix hydration issues with browser extensions */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Remove browser extension attributes that cause hydration mismatches
              if (typeof window !== 'undefined') {
                document.addEventListener('DOMContentLoaded', function() {
                  const body = document.body;
                  if (body) {
                    // Remove common browser extension attributes
                    body.removeAttribute('cz-shortcut-listen');
                    body.removeAttribute('data-new-gr-c-s-check-loaded');
                    body.removeAttribute('data-gr-ext-installed');
                  }
                });
              }
            `,
          }}
        />

        {/* Force avatar background to black */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined') {
                function forceAvatarBlack() {
                  // Find all avatar elements and force them to be black
                  const allElements = document.querySelectorAll('*');
                  allElements.forEach(el => {
                    // Check if this element looks like an avatar (circular with text inside)
                    const computedStyle = window.getComputedStyle(el);
                    const hasText = el.textContent && el.textContent.trim().length === 1;
                    const isCircular = computedStyle.borderRadius.includes('50%') || computedStyle.borderRadius.includes('100%');
                    const hasBackground = computedStyle.backgroundColor !== 'rgba(0, 0, 0, 0)' && computedStyle.backgroundColor !== 'transparent';
                    
                    if (hasText && isCircular && hasBackground) {
                      el.style.backgroundColor = '#000000';
                      el.style.background = '#000000';
                      el.style.backgroundImage = 'none';
                      el.style.setProperty('background-color', '#000000', 'important');
                      el.style.setProperty('background', '#000000', 'important');
                      el.style.setProperty('background-image', 'none', 'important');
                    }
                  });
                  
                  // Also target specific avatar classes
                  const avatars = document.querySelectorAll('[class*="avatar"], [class*="Avatar"], .cl-userButtonAvatarBox, .cl-avatarBox');
                  avatars.forEach(avatar => {
                    avatar.style.backgroundColor = '#000000';
                    avatar.style.background = '#000000';
                    avatar.style.backgroundImage = 'none';
                    avatar.style.setProperty('background-color', '#000000', 'important');
                    avatar.style.setProperty('background', '#000000', 'important');
                    avatar.style.setProperty('background-image', 'none', 'important');
                    // Target all children
                    const children = avatar.querySelectorAll('*');
                    children.forEach(child => {
                      child.style.backgroundColor = '#000000';
                      child.style.background = '#000000';
                      child.style.backgroundImage = 'none';
                      child.style.setProperty('background-color', '#000000', 'important');
                      child.style.setProperty('background', '#000000', 'important');
                      child.style.setProperty('background-image', 'none', 'important');
                    });
                  });
                  
                  // Remove the black square background behind the avatar
                  const allElementsForSquare = document.querySelectorAll('*');
                  allElementsForSquare.forEach(el => {
                    const computedStyle = window.getComputedStyle(el);
                    // Look for square elements that might be behind the avatar
                    const isSquare = !computedStyle.borderRadius.includes('50%') && !computedStyle.borderRadius.includes('100%');
                    const hasBlackBackground = computedStyle.backgroundColor === 'rgb(0, 0, 0)' || computedStyle.backgroundColor === 'rgba(0, 0, 0, 1)';
                    const hasChildWithAvatar = el.querySelector('[class*="avatar"], [class*="Avatar"]');
                    
                    if (isSquare && hasBlackBackground && hasChildWithAvatar) {
                      el.style.backgroundColor = 'transparent';
                      el.style.background = 'transparent';
                      el.style.setProperty('background-color', 'transparent', 'important');
                      el.style.setProperty('background', 'transparent', 'important');
                    }
                  });
                }

                function hideLastUsedText() {
                  // Find and hide only "Last used" text
                  const allElements = document.querySelectorAll('*');
                  allElements.forEach(el => {
                    if (el.textContent && el.textContent.trim() === 'Last used') {
                      el.style.display = 'none';
                      el.style.visibility = 'hidden';
                      el.style.opacity = '0';
                      el.style.height = '0';
                      el.style.overflow = 'hidden';
                    }
                  });
                }

                // Run immediately and on intervals
                forceAvatarBlack();
                hideLastUsedText();
                setInterval(forceAvatarBlack, 500);
                setInterval(hideLastUsedText, 500);
                
                // Run when DOM changes
                const observer = new MutationObserver(() => {
                  forceAvatarBlack();
                  hideLastUsedText();
                });
                observer.observe(document.body, { childList: true, subtree: true });
              }
            `,
          }}
        />

      </head>
      <body
        className="antialiased font-sans"
        suppressHydrationWarning={true}
      >
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
        />
        {process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY !== 'pk_test_placeholder' ? (
          <ClerkProvider
            publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
            signInFallbackRedirectUrl="/checkout"
            signUpFallbackRedirectUrl="/checkout"
            appearance={{
              baseTheme: undefined,
              variables: {
                colorPrimary: '#FFD700',
                colorBackground: '#111827',
                colorInputBackground: '#1f2937',
                colorInputText: '#ffffff',
                colorText: '#ffffff',
                colorTextSecondary: '#9ca3af',
                colorNeutral: '#374151',
                colorSuccess: '#10b981',
                colorWarning: '#f59e0b',
                colorDanger: '#ef4444',
                colorShimmer: '#374151',
                borderRadius: '0.5rem',
                fontFamily: 'inherit',
                fontSize: '14px',
                fontWeight: {
                  normal: 400,
                  medium: 500,
                  semibold: 600,
                  bold: 700,
                },
                spacingUnit: '1rem',
              },
              elements: {
                // Modal styling
                modalContent: 'bg-gray-900 border border-[#FFD700]/30 shadow-2xl',
                modalHeaderTitle: 'text-white text-xl font-semibold',
                modalHeaderSubtitle: 'text-gray-400 text-sm',
                modalCloseButton: 'text-gray-400 hover:text-white',

                // Form styling
                formButtonPrimary: 'bg-[#FFD700] hover:bg-[#FFA500] text-black font-semibold border-0 shadow-lg',
                formFieldInput: 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-[#FFD700] focus:ring-[#FFD700]/20',
                formFieldLabel: 'text-white text-sm font-medium',
                formFieldSuccessText: 'text-green-400',
                formFieldErrorText: 'text-red-400',
                formFieldWarningText: 'text-yellow-400',

                // Social buttons
                socialButtonsBlockButton: 'bg-gray-800 hover:bg-gray-700 text-white border-gray-700 hover:border-[#FFD700]/50',
                socialButtonsBlockButtonText: 'text-white',
                socialButtonsBlockButtonArrow: 'text-[#FFD700]',

                // Links and text
                footerActionLink: 'text-[#FFD700] hover:text-[#FFA500] font-medium',
                identityPreviewText: 'text-gray-400',
                formResendCodeLink: 'text-[#FFD700] hover:text-[#FFA500]',

                // Card styling
                card: 'bg-gray-900 border border-[#FFD700]/30 shadow-2xl',
                headerTitle: 'text-white',
                headerSubtitle: 'text-gray-400',

                // User button dropdown
                userButtonPopoverCard: 'bg-gray-900 border border-[#FFD700]/30 shadow-2xl',
                userButtonPopoverActionButton: 'text-white hover:bg-[#FFD700]/10 hover:text-[#FFD700] transition-colors',
                userButtonPopoverMain: 'bg-gray-900',
                userButtonPopoverActionButtonText: 'text-white',
                userButtonPopoverActionButtonIcon: 'text-[#FFD700]',
                userButtonPopoverHeaderTitle: 'text-white',
                userButtonPopoverHeaderSubtitle: 'text-gray-400',
                userButtonPopoverActionButtonText__manageAccount: 'text-white hover:text-[#FFD700]',
                userButtonPopoverActionButtonText__signOut: 'text-red-400 hover:text-red-300',
                userButtonPopoverActionButtonIcon__manageAccount: 'text-[#FFD700]',
                userButtonPopoverActionButtonIcon__signOut: 'text-red-400',
                // Hide development mode and footer elements
                footer: 'display: none !important',
                footerText: 'display: none !important',
                footerAction: 'display: none !important',
                userButtonPopoverFooter: 'display: none !important',
                userButtonPopoverFooterText: 'display: none !important',
                userButtonPopoverFooterAction: 'display: none !important',
                userButtonPopoverFooterActionLink: 'display: none !important',
                userButtonPopoverFooterActionText: 'display: none !important',
                userButtonPopoverFooterActionIcon: 'display: none !important',
                'p[data-localization-key*="footer"]': 'display: none !important',
              }
            }}
          >
            <PackageProvider>
              {children}
            </PackageProvider>
          </ClerkProvider>
        ) : (
          <PackageProvider>
            {children}
          </PackageProvider>
        )}
      </body>
    </html>
  );
}
