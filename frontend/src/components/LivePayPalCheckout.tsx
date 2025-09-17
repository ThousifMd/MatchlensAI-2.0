"use client";

import React from 'react';
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
  
  const paypalOptions = {
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
    currency: "USD",
    intent: "capture" as const,
    enableFunding: "paypal,venmo,card",
    components: "buttons" as const,
    debug: false
  };

  const createOrder = async (data: any, actions: any) => {
    return actions.order.create({
      purchase_units: [{
        amount: {
          currency_code: "USD",
          value: selectedPackage?.price.toString() || "97.00"
        },
        description: selectedPackage?.name || "Matchlens AI Service"
      }]
    });
  };

  const onApprove = async (data: any, actions: any) => {
    const details = await actions.order.capture();
    if (onPaymentSuccess) {
      onPaymentSuccess(details);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-white mb-2">Complete Payment</h3>
        <p className="text-gray-300 text-sm">Secure payment powered by PayPal</p>
      </div>
      
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
          onError={onPaymentError}
          onCancel={onPaymentCancel}
        />
      </PayPalScriptProvider>
      
      <div className="text-center mt-4">
        <p className="text-gray-400 text-xs">Powered by PayPal</p>
      </div>
    </div>
  );
}
