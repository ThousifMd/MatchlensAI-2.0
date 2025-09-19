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
    enableFunding: "paypal,card",
    components: "buttons" as const,
    debug: false
  };

  const createOrder = async (data: any, actions: any) => {
    // Hardcoded to $1.00 for testing purposes
    const amount = 1.00;

    return actions.order.create({
      purchase_units: [{
        amount: {
          currency_code: "USD",
          value: amount.toString()
        },
        description: `Matchlens AI Service - ${selectedPackage?.name || 'Most Attention'} Package (Test Payment)`
      }]
    });
  };

  const onApprove = async (data: any, actions: any) => {
    console.log('🎉 PayPal payment approved:', data);
    try {
      const details = await actions.order.capture();
      console.log('✅ PayPal payment captured:', details);
      if (onPaymentSuccess) {
        console.log('🚀 Calling onPaymentSuccess callback...');
        onPaymentSuccess(details);
      } else {
        console.error('❌ onPaymentSuccess callback not provided');
      }
    } catch (error) {
      console.error('❌ PayPal payment capture failed:', error);
      if (onPaymentError) {
        onPaymentError(error);
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-white mb-2">Complete Payment</h3>
        <p className="text-gray-300 text-sm">Secure payment powered by PayPal</p>
        {selectedPackage && (
          <div className="mt-3 p-3 bg-white/5 rounded-lg border border-white/10">
            <p className="text-white font-medium">{selectedPackage.name}</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">Regular Price: <span className="line-through">${selectedPackage.price}</span></p>
                <p className="text-[#d4ae36] text-xl font-bold">Test Price: $1.00</p>
              </div>
              <div className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded">
                TEST MODE
              </div>
            </div>
          </div>
        )}
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
