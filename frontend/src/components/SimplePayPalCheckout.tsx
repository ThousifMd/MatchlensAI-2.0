"use client";

import { useState, useEffect } from "react";
import { storePaymentData } from "@/lib/supabaseUtils";
import PayPalWrapper from "./PayPalWrapper";

// Custom styles for PayPal buttons
const paypalStyles = `
  .paypal-button-container {
    width: 100% !important;
    max-width: 600px !important;
    margin: 0 auto !important;
  }
  
  .paypal-button-container > div {
    width: 100% !important;
    border-radius: 12px !important;
    overflow: hidden !important;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
  }
  
  .paypal-button-container button {
    border-radius: 12px !important;
    margin: 0 !important;
    height: 48px !important;
    font-weight: 600 !important;
    transition: all 0.2s ease !important;
  }
  
  .paypal-button-container button:hover {
    transform: translateY(-1px) !important;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2) !important;
  }
`;

interface SimplePayPalCheckoutProps {
    selectedPackage?: {
        id: string;
        name: string;
        price: number;
    };
    showNotification?: (type: 'success' | 'error' | 'info', message: string) => void;
    onPaymentSuccess?: () => void;
    onboardingFormData?: any;
}

export default function SimplePayPalCheckout({ selectedPackage, showNotification, onPaymentSuccess, onboardingFormData }: SimplePayPalCheckoutProps) {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({});
    const [payPalError, setPayPalError] = useState<string | null>(null);
    const [hasPayPalError, setHasPayPalError] = useState(false);

    // Debug: Check if PayPal client ID is available
    useEffect(() => {
        console.log('PayPal Client ID:', process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID);
        console.log('PayPal Client ID exists:', !!process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID);
        console.log('Current protocol:', window.location.protocol);
        console.log('Is secure context:', window.isSecureContext);

        // Check if we're in a secure context
        if (!window.isSecureContext && window.location.protocol !== 'https:') {
            console.warn('⚠️ Not in secure context - PayPal may not work properly');
            setPayPalError('Secure connection required for payment processing. Please ensure you\'re using HTTPS.');
        }
    }, []);
    const handleNotification = (type: 'success' | 'error' | 'info', message: string) => {
        if (showNotification) {
            showNotification(type, message);
        }
    };

    const storePaymentAndOnboarding = async (paymentDetails: any) => {
        try {
            // Hardcoded to $1.00 for live testing
            const actualAmountPaid = "1.00";

            // Use passed form data or fallback to localStorage
            let formDataToUse = onboardingFormData;

            if (!formDataToUse) {
                const storedFormData = localStorage.getItem('onboardingFormData');
                if (storedFormData) {
                    formDataToUse = JSON.parse(storedFormData);
                }
            }

            // Retrieve photos from window object (stored separately to avoid localStorage quota issues)
            let originalPhotos: any[] = [];
            let screenshotPhotos: any[] = [];

            if (typeof window !== 'undefined') {
                const windowAny = window as any;
                originalPhotos = windowAny.onboardingPhotos || [];
                screenshotPhotos = windowAny.onboardingScreenshots || [];
            }

            console.log('📸 Retrieved photos:', {
                originalPhotos: originalPhotos.length,
                screenshotPhotos: screenshotPhotos.length
            });

            // Convert File objects to base64 for upload
            const convertFilesToBase64 = async (files: File[]): Promise<string[]> => {
                const base64Promises = files.map(file => {
                    return new Promise<string>((resolve) => {
                        const reader = new FileReader();
                        reader.onload = () => {
                            const result = reader.result as string;
                            // Remove data URL prefix to get just base64
                            const base64 = result.split(',')[1];
                            resolve(base64);
                        };
                        reader.readAsDataURL(file);
                    });
                });
                return Promise.all(base64Promises);
            };

            // Convert photos to base64
            const originalPhotosBase64 = await convertFilesToBase64(originalPhotos);
            const screenshotPhotosBase64 = await convertFilesToBase64(screenshotPhotos);

            // Add photos to form data
            formDataToUse = {
                ...formDataToUse,
                originalPhotos: originalPhotosBase64,
                screenshotPhotos: screenshotPhotosBase64
            };

            // STEP 1: Store payment data in Supabase
            const paymentData = {
                order_id: paymentDetails.id,
                amount: parseFloat(actualAmountPaid), // Use the actual amount paid
                currency: 'USD',
                package_id: selectedPackage?.id || '',
                package_name: selectedPackage?.name || 'Payment',
                customer_email: formDataToUse?.email || '',
                customer_name: formDataToUse?.name || '',
                status: 'completed'
            };

            console.log("💳 Storing payment data in Supabase:", paymentData);

            const paymentResult = await storePaymentData(paymentData);

            if (!paymentResult.success) {
                console.error("❌ Failed to store payment data in Supabase:", paymentResult.error);
                throw new Error("Failed to store payment data");
            }

            console.log("✅ Payment data stored in Supabase successfully:", paymentResult.data);

            // Set payment verification flag
            localStorage.setItem('paymentCompleted', 'true');
            localStorage.setItem('lastPaymentId', paymentResult.data?.payment_id || ''); // Store payment_id for onboarding

            // Clear stored data after successful payment
            localStorage.removeItem('onboardingFormData');
            if (typeof window !== 'undefined') {
                delete (window as any).onboardingPhotos;
                delete (window as any).onboardingScreenshots;
            }

            handleNotification("success", "Payment successful! Your data has been saved to the database.");
        } catch (error) {
            console.error("Error storing payment:", error);
            handleNotification("error", "Payment successful but failed to save data. Please contact support.");
        }
    };



    const handleStartPayment = () => {
        setShowForm(true);
    };


    // Auto-start payment process to reduce friction
    useEffect(() => {
        if (!showForm) {
            handleStartPayment();
        }
    }, [showForm]);

    return (
        <div className="w-full max-w-2xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-2 text-center text-white">Complete Your Order</h2>
            <p className="text-white/70 mb-6 text-center">
                {selectedPackage ? `${selectedPackage.name}: $1.00 (Live Testing)` : 'Payment: $1.00 (Live Testing)'}
            </p>

            {/* PayPal Integration */}
            <div className="mt-6 p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl">
                <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-white">Complete Payment</h3>
                </div>
                <p className="text-white/70 mb-6 text-center text-sm">Secure payment powered by PayPal</p>

                <div className="space-y-3">
                    <style dangerouslySetInnerHTML={{ __html: paypalStyles }} />
                    <div className="paypal-button-container">
                        <PayPalWrapper
                            selectedPackage={selectedPackage}
                            onPaymentSuccess={async () => {
                                // Store payment details AND onboarding data in database
                                const mockPaymentDetails = {
                                    id: `mock_${Date.now()}`,
                                    status: 'COMPLETED',
                                    purchase_units: [{
                                        payments: {
                                            captures: [{
                                                id: `capture_${Date.now()}`,
                                                amount: { currency_code: 'USD', value: '1.00' }
                                            }]
                                        }
                                    }]
                                };

                                await storePaymentAndOnboarding(mockPaymentDetails);
                                handleNotification("success", "Payment successful! Order ID: " + mockPaymentDetails.id);

                                // Call the payment success callback
                                if (onPaymentSuccess) {
                                    console.log('🚀 Calling onPaymentSuccess callback!');
                                    onPaymentSuccess();
                                } else {
                                    console.log('❌ onPaymentSuccess callback not provided!');
                                }
                            }}
                            onError={(error) => {
                                console.error("PayPal error:", error);
                                setPayPalError("PayPal error: " + JSON.stringify(error));
                                handleNotification("error", "PayPal error: " + JSON.stringify(error));
                            }}
                            onCancel={(data) => {
                                console.log("Payment cancelled:", data);
                                handleNotification("info", "Payment was cancelled");
                            }}
                        />

                        {payPalError && (
                            <div className="text-center p-4 bg-red-500/10 border border-red-500/20 rounded-lg mt-3">
                                <p className="text-red-400 text-sm">{payPalError}</p>
                                <div className="flex gap-2 mt-3 justify-center">
                                    <button
                                        onClick={() => {
                                            setPayPalError(null);
                                            setHasPayPalError(false);
                                        }}
                                        className="px-4 py-2 bg-[#d4ae36] text-black rounded-lg text-sm font-medium hover:bg-[#c19d2f] transition-colors"
                                    >
                                        Retry PayPal
                                    </button>
                                    {hasPayPalError && (
                                        <button
                                            onClick={() => {
                                                // Simulate successful payment for testing
                                                handleNotification("success", "Payment completed (fallback mode)");
                                                if (onPaymentSuccess) {
                                                    onPaymentSuccess();
                                                }
                                            }}
                                            className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                                        >
                                            Continue (Test Mode)
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
