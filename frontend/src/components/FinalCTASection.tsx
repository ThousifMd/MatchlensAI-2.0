"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { usePackage } from "@/contexts/PackageContext";
import AuthModal from "./AuthModal";
import { trackCTAClickCombined, trackAddToCartCombined } from "@/lib/pixelTracking";

export const FinalCTASection: React.FC = () => {
    const router = useRouter();
    const { setSelectedPackage } = usePackage();
    const [showAuthModal, setShowAuthModal] = React.useState(false);

    const handleCTAClick = () => {
        // Track CTA click
        trackCTAClickCombined("Make Me A Match Magnet", "Final CTA Section");
        
        // Auto-select the "Most Attention" package ($69)
        const mostAttentionPackage = {
            id: "most-matches",
            name: "Most Attention",
            price: 69,
            originalPrice: 99,
            description: "Most popular choice",
            features: [
                "10 enhanced photos",
                "6 style variations",
                "Bio optimization",
                "Profile strategy guide",
                "Private and secure"
            ],
            buttonText: "Make my profile irresistible",
            popular: true,
            mobileOrder: 1
        };

        setSelectedPackage(mostAttentionPackage);
        
        // Track package selection
        trackAddToCartCombined("Most Attention", 69);
        
        // Store in localStorage for checkout page
        localStorage.setItem('selectedPackage', 'most-matches');

        // Scroll to pricing section
        const pricingSection = document.getElementById('pricing-section');
        if (pricingSection) {
            const elementRect = pricingSection.getBoundingClientRect();
            const absoluteElementTop = elementRect.top + window.pageYOffset;
            const middle = absoluteElementTop - (window.innerHeight / 2) + (elementRect.height / 2);
            window.scrollTo({ top: middle, behavior: 'smooth' });
        }

        // Show auth modal immediately
        setShowAuthModal(true);
    };

    return (
        <section className="py-24 px-4 max-w-6xl mx-auto">
            {/* Main Container with Glass Morphism */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">

                {/* Header */}
                <div className="text-center">
                    <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-8">
                        "Don't be invisible. Be the person people actually notice online"
                    </h2>

                    {/* CTA Button */}
                    <button
                        type="button"
                        onClick={handleCTAClick}
                        className="relative bg-white/5 backdrop-blur-md border border-white/20 hover:bg-white/10 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#FFD700]/20 overflow-hidden group text-xl font-bold px-12 py-6 rounded-2xl"
                        aria-label="Upgrade my photos"
                    >
                        {/* Glass morphism background with flowing colors */}
                        <div className="absolute inset-0 rounded-2xl overflow-hidden">
                            {/* Gold wave from left */}
                            <div className="absolute top-0 left-0 w-full h-full">
                                <div className="w-full h-full bg-gradient-to-r from-[#FFD700]/60 via-[#FFD700]/40 to-transparent opacity-90"
                                    style={{
                                        animation: 'flowingWaveLeft 3s ease-in-out infinite'
                                    }}>
                                </div>
                            </div>

                            {/* Pink wave from right */}
                            <div className="absolute top-0 right-0 w-full h-full">
                                <div className="w-full h-full bg-gradient-to-l from-[#FF69B4]/60 via-[#FF69B4]/40 to-transparent opacity-90"
                                    style={{
                                        animation: 'flowingWaveRight 3s ease-in-out infinite'
                                    }}>
                                </div>
                            </div>
                        </div>

                        <span className="relative z-20 text-white font-bold drop-shadow-lg">
                            Upgrade my photos
                        </span>
                    </button>
                </div>
            </div>

            {/* Auth Modal */}
            <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                onSuccess={() => {
                    setShowAuthModal(false);
                    // Redirect to checkout after successful auth
                    window.location.href = '/checkout';
                }}
            />
        </section>
    );
};
