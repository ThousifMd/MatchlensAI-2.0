"use client";

import { useState, useEffect } from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

interface PayPalButtonProps {
    selectedPackage?: {
        id: string;
        name: string;
        price: number;
    };
    onPaymentSuccess?: () => void;
    onPaymentError?: (error: any) => void;
    onPaymentCancel?: () => void;
}

export default function PayPalButton({ selectedPackage, onPaymentSuccess, onPaymentError, onPaymentCancel }: PayPalButtonProps) {
    const [isClient, setIsClient] = useState(false);
    const [isPayPalReady, setIsPayPalReady] = useState(false);

    useEffect(() => {
        setIsClient(true);

        // Add a small delay to ensure PayPal script is ready
        const timer = setTimeout(() => {
            setIsPayPalReady(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    if (!isClient || !isPayPalReady) {
        return (
            <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#d4ae36]"></div>
                <span className="ml-3 text-white">Loading PayPal...</span>
            </div>
        );
    }

    const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "Aa3Qhzd--_8MNtB9U8LctWUzDXw3eO7XPw2cyHUzwa9e_sYlD1pXnQK_K3iXNIXD2i64F8AUfPiWL-AT";

    return (
        <PayPalScriptProvider
            options={{
                clientId: paypalClientId,
                currency: "USD",
                intent: "capture",
                components: "buttons",
                enableFunding: "paypal,card",
                disableFunding: "venmo,paylater",
                dataSdkIntegration: "react-paypal-js"
            }}
        >
            <PayPalButtons
                style={{
                    layout: "vertical",
                    color: "gold",
                    shape: "rect",
                    label: "paypal",
                    height: 45
                }}
                createOrder={async (data, actions) => {
                    try {
                        console.log('🔄 Creating PayPal order...');
                        console.log('📦 Package data:', { selectedPackage, amount: "1.00" });

                        const order = await actions.order.create({
                            purchase_units: [{
                                amount: {
                                    currency_code: "USD",
                                    value: "1.00"
                                },
                                description: selectedPackage?.name || "Test Payment",
                                custom_id: selectedPackage?.id || "test-payment"
                            }],
                            intent: "CAPTURE"
                        });

                        console.log('✅ PayPal order created:', order);
                        return order;
                    } catch (error) {
                        console.error('❌ Error creating PayPal order:', error);
                        throw error;
                    }
                }}
                onApprove={async (data, actions) => {
                    try {
                        console.log('🔄 Approving PayPal order...', data);

                        const details = await actions.order?.capture();
                        console.log('✅ PayPal order captured:', details);

                        if (onPaymentSuccess) {
                            onPaymentSuccess();
                        }
                    } catch (error) {
                        console.error('❌ Error capturing PayPal order:', error);
                        if (onPaymentError) {
                            onPaymentError(error);
                        }
                    }
                }}
                onError={(error) => {
                    console.error('❌ PayPal error:', error);
                    if (onPaymentError) {
                        onPaymentError(error);
                    }
                }}
                onCancel={(data) => {
                    console.log('❌ PayPal payment cancelled:', data);
                    if (onPaymentCancel) {
                        onPaymentCancel();
                    }
                }}
            />
        </PayPalScriptProvider>
    );
}
