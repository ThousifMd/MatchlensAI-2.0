"use client";

import React, { useState, useEffect } from 'react';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';

interface LivePayPalCheckoutProps {
  selectedPackage?: {
    id: string;
    name: string;
    price: number;
  };
  onPaymentSuccess?: (details: any) => void;
  onPaymentError?: (error: any) => void;
  onPaymentCancel?: (data: any) => void;
}

export default function LivePayPalCheckout({
  selectedPackage,
  onPaymentSuccess,
  onPaymentError,
  onPaymentCancel
}: LivePayPalCheckoutProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // PayPal configuration - use sandbox for localhost, live for production
  const isLocalhost = typeof window !== 'undefined' && window.location.hostname === 'localhost';
  const isLiveMode = process.env.NEXT_PUBLIC_PAYPAL_ENVIRONMENT === 'production' && !isLocalhost;
  
  const paypalOptions = {
    clientId: isLiveMode 
      ? process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!
      : "Aa3Qhzd--_8MNtB9U8LctWUzDXw3eO7XPw2cyHUzwa9e_sYlD1pXnQK_K3iXNIXD2i64F8AUfPiWL-AT", // Sandbox client ID
    currency: process.env.NEXT_PUBLIC_PAYPAL_CURRENCY || "USD",
    intent: "capture" as const,
    enableFunding: "paypal,venmo,card",
    components: "buttons" as const,
    debug: isLocalhost, // Debug only on localhost
    vault: false,
    buyNow: false,
    enableNativeCheckout: true
  };

  // Create PayPal order
  const createOrder = async (data: any, actions: any) => {
    try {
      console.log(`🔄 Creating PayPal order for ${isLiveMode ? 'LIVE' : 'SANDBOX'} transaction...`);
      
      const order = await actions.order.create({
        purchase_units: [{
          amount: {
            currency_code: paypalOptions.currency,
            value: selectedPackage?.price.toString() || "1.00"
          },
          description: selectedPackage?.name || "Matchlens AI Service",
          custom_id: selectedPackage?.id || "matchlens-ai-payment"
        }],
        intent: "CAPTURE"
      });

      console.log('✅ PayPal order created successfully:', order);
      return order;
    } catch (error) {
      console.error('❌ Error creating PayPal order:', error);
      setError('Failed to create payment order. Please try again.');
      throw error;
    }
  };

  // Handle successful payment approval
  const onApprove = async (data: any, actions: any) => {
    try {
      console.log('✅ Payment approved:', data.orderID);

      if (actions.order) {
        const details = await actions.order.capture();
        console.log('✅ Payment captured successfully:', details);

        // Call success callback
        if (onPaymentSuccess) {
          await onPaymentSuccess(details);
        }

        // Show success message
        setError(null);
      } else {
        throw new Error("PayPal order actions not available");
      }
    } catch (error) {
      console.error('❌ Payment capture failed:', error);
      setError('Payment processing failed. Please try again.');
      if (onPaymentError) {
        onPaymentError(error);
      }
    }
  };

  // Handle payment errors
  const onError = (err: any) => {
    console.error('❌ PayPal payment error:', err);
    setError('Payment failed. Please try again or use a different payment method.');
    if (onPaymentError) {
      onPaymentError(err);
    }
  };

  // Handle payment cancellation
  const onCancel = (data: any) => {
    console.log('⚠️ Payment cancelled by user:', data);
    if (onPaymentCancel) {
      onPaymentCancel(data);
    }
  };

  // Check if PayPal client ID is configured
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID) {
      setError('PayPal configuration error. Please contact support.');
      return;
    }

    // Set loaded state after a short delay
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Show error state
  if (error) {
    return (
      <div className="w-full max-w-md mx-auto p-6 bg-red-50 border border-red-200 rounded-lg">
        <div className="text-center">
          <div className="text-red-600 text-sm font-medium mb-2">
            Payment Error
          </div>
          <p className="text-red-500 text-xs mb-4">{error}</p>
          <button
            onClick={() => {
              setError(null);
              setIsLoaded(false);
              setTimeout(() => setIsLoaded(true), 1000);
            }}
            className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Show loading state
  if (!isLoaded) {
    return (
      <div className="w-full max-w-md mx-auto p-6 bg-gray-50 border border-gray-200 rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-3"></div>
          <p className="text-gray-600 text-sm">Loading payment options...</p>
        </div>
      </div>
    );
  }

  // Show PayPal buttons
  return (
    <div className="w-full max-w-md mx-auto">
      <PayPalScriptProvider options={paypalOptions}>
        <PayPalButtons
          style={{
            layout: "vertical",
            color: "gold",
            shape: "rect",
            label: "paypal",
            height: 48
          }}
          createOrder={createOrder}
          onApprove={onApprove}
          onError={onError}
          onCancel={onCancel}
        />
      </PayPalScriptProvider>
    </div>
  );
}
