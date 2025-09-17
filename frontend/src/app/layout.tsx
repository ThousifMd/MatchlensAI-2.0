import type { Metadata } from "next";
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

        {/* Fix hydration issues with browser extensions and hide Clerk development mode */}
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
                  
                  // Hide Clerk development mode
                  function hideDevelopmentMode() {
                    const elements = document.querySelectorAll('*');
                    elements.forEach(element => {
                      if (element.textContent && element.textContent.includes('Development mode')) {
                        element.style.display = 'none';
                        element.style.visibility = 'hidden';
                        element.style.opacity = '0';
                        element.style.height = '0';
                        element.style.overflow = 'hidden';
                      }
                    });
                  }
                  
                  // Run immediately and on mutations
                  hideDevelopmentMode();
                  
                  // Watch for dynamic content changes
                  const observer = new MutationObserver(hideDevelopmentMode);
                  observer.observe(document.body, {
                    childList: true,
                    subtree: true,
                    characterData: true
                  });
                });
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
        <ClerkProvider
          publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || 'pk_test_placeholder'}
          afterSignInUrl="/onboarding"
          afterSignUpUrl="/onboarding"
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
              colorAlphaShade: '#ffffff',
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
              animationDuration: '200ms',
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
              userButtonPopoverFooter: 'bg-gray-800 border-t border-[#FFD700]/20',
              userButtonPopoverFooterText: 'text-gray-400',
              userButtonPopoverFooterLink: 'text-[#FFD700] hover:text-[#FFA500]',
<<<<<<< HEAD
              
              // Hide development mode and footer elements
              footer: 'hidden !important',
              footerText: 'hidden !important',
              footerAction: 'hidden !important',
              footerActionText: 'hidden !important',
              footerActionLink: 'hidden !important',
              footerActionText__signIn: 'hidden !important',
              footerActionText__signUp: 'hidden !important',
              footerActionLink__signIn: 'hidden !important',
              footerActionLink__signUp: 'hidden !important',
              // Additional elements to hide development mode
              'footer[data-localization-key]': 'display: none !important',
              'div[data-localization-key*="footer"]': 'display: none !important',
              'span[data-localization-key*="footer"]': 'display: none !important',
              'p[data-localization-key*="footer"]': 'display: none !important',
=======

              // Hide development mode
              footer: 'hidden',
              footerText: 'hidden',
              footerAction: 'hidden',
              footerActionText: 'hidden',
              footerActionLink: 'hidden',
              footerActionText__signIn: 'hidden',
              footerActionText__signUp: 'hidden',
              footerActionLink__signIn: 'hidden',
              footerActionLink__signUp: 'hidden',
>>>>>>> 63e462b (Almost the flow is fixedgit add .)
            }
          }}
        >
          <PackageProvider>
            {children}
          </PackageProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
