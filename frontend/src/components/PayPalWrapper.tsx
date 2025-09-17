"use client";

import { useState, useEffect } from 'react';
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

interface PayPalWrapperProps {
    selectedPackage?: {
        id: string;
        name: string;
        price: number;
    };
    onPaymentSuccess?: () => void;
    onError?: (error: any) => void;
    onCancel?: (data: any) => void;
}

export default function PayPalWrapper({
    selectedPackage,
    onPaymentSuccess,
    onError,
    onCancel
}: PayPalWrapperProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Set a timeout to show PayPal buttons even if script takes time to load
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const handleError = (err: any) => {
        console.error('PayPal Error:', err);
        setError('PayPal error occurred. Please try again.');
        if (onError) {
            onError(err);
        }
    };

    const handleCancel = (data: any) => {
        console.log('Payment cancelled:', data);
        if (onCancel) {
            onCancel(data);
        }
    };

    const handleApprove = async (data: any, actions: any) => {
        console.log("✅ Order approved:", data.orderID);

        try {
            if (actions.order) {
                const details = await actions.order.capture();
                console.log("✅ Payment captured successfully:", details);

                if (onPaymentSuccess) {
                    onPaymentSuccess();
                }
            } else {
                throw new Error("PayPal order actions not available");
            }
        } catch (error) {
            console.error("❌ Payment capture failed:", error);
            handleError(error);
        }
    };

    const createOrder = async (data: any, actions: any) => {
        try {
            console.log('🔄 Creating PayPal order...');

            const order = await actions.order.create({
                purchase_units: [{
                    amount: {
                        currency_code: "USD",
                        value: "1.00" // Fixed amount for testing
                    },
                    description: selectedPackage?.name || "Live Testing Payment",
                    custom_id: selectedPackage?.id || "live-test-payment"
                }],
                intent: "CAPTURE"
            });

            console.log('✅ PayPal order created:', order);
            return order;
        } catch (error) {
            console.error('❌ Error creating order:', error);
            handleError(error);
            throw error;
        }
    };

    if (!process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID) {
        return (
            <div className="text-center p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-red-400 text-sm">
                    PayPal configuration error. Please check environment variables.
                </p>
                <p className="text-red-300 text-xs mt-1">
                    Client ID: Missing - Add NEXT_PUBLIC_PAYPAL_CLIENT_ID to .env.local
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-red-400 text-sm">{error}</p>
                <button
                    onClick={() => {
                        setError(null);
                        setIsLoaded(false);
                        setTimeout(() => setIsLoaded(true), 1000);
                    }}
                    className="mt-3 px-4 py-2 bg-[#d4ae36] text-black rounded-lg text-sm font-medium hover:bg-[#c19d2f] transition-colors"
                >
                    Retry PayPal
                </button>
            </div>
        );
    }

    if (!isLoaded) {
        return (
            <div className="text-center p-6 bg-white/5 border border-white/10 rounded-lg">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#d4ae36] mx-auto mb-3"></div>
                <p className="text-white/70 text-sm">Loading payment options...</p>
            </div>
        );
    }

    const isLiveMode = process.env.NEXT_PUBLIC_PAYPAL_ENVIRONMENT === 'production';

    return (
        <PayPalScriptProvider
            options={{
                clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
                currency: "USD",
                intent: "capture",
                enableFunding: "paypal,venmo,card",
                components: "buttons",
                debug: process.env.NODE_ENV === 'development' && !isLiveMode, // Don't debug in live mode
                // Add environment-specific options
                ...(isLiveMode && {
                    // Live mode specific options
                    vault: false,
                    buyNow: false,
                    enableNativeCheckout: true
                })
            }}
        >
            <PayPalButtons
                style={{
                    layout: "vertical",
                    color: "gold",
                    shape: "rect",
                    label: "paypal",
                    height: 48
                }}
                createOrder={createOrder}
                onApprove={handleApprove}
                onError={handleError}
                onCancel={handleCancel}
            />
        </PayPalScriptProvider>
    );
}
