import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Secure Checkout - Matchlens AI",
    description: "Complete your secure payment for Matchlens AI services",
    robots: "noindex, nofollow", // Don't index checkout pages
    other: {
        'X-Frame-Options': 'DENY',
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
    },
};

export default function CheckoutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-black">
            {/* Security headers for payment processing */}
            <head>
                <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests; frame-ancestors 'none';" />
                <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
                <meta httpEquiv="X-Frame-Options" content="DENY" />
                <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
                <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
            </head>
            {children}
        </div>
    );
}
