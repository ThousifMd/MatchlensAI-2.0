import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Secure Checkout - Matchlens AI",
    description: "Complete your secure payment for Matchlens AI services",
    robots: "noindex, nofollow", // Don't index checkout pages
    other: {
        'X-Frame-Options': 'DENY',
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Content-Security-Policy': "upgrade-insecure-requests; frame-ancestors 'none';",
    },
    viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
};

export default function CheckoutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-black">
            {children}
        </div>
    );
}
