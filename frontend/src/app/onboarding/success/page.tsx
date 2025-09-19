"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, Sparkles, Clock, Mail, Shield, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function OnboardingSuccessPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    // Auto-redirect after 10 seconds
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          router.push('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* Success Animation */}
        <div className="relative">
          <div className="w-32 h-32 mx-auto bg-gradient-to-r from-[#d4ae36] to-[#e6c04a] rounded-full flex items-center justify-center mb-6 animate-pulse">
            <CheckCircle className="w-16 h-16 text-black" />
          </div>
          <div className="absolute -top-2 -right-2">
            <Sparkles className="w-8 h-8 text-[#d4ae36] animate-bounce" />
          </div>
        </div>

        {/* Main Message */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Your Transformation Has Begun! 🚀
          </h1>
          <p className="text-xl text-gray-300 max-w-lg mx-auto">
            We've received your photos and preferences. Our AI is now working its magic to create your irresistible profile.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-white mb-6">What Happens Next?</h2>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg">
              <div className="w-8 h-8 bg-[#d4ae36] rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-sm">1</span>
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-white">AI Analysis</h3>
                <p className="text-gray-400 text-sm">Our AI analyzes your photos and preferences</p>
              </div>
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>

            <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg">
              <div className="w-8 h-8 bg-[#d4ae36] rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-sm">2</span>
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-white">Photo Enhancement</h3>
                <p className="text-gray-400 text-sm">Creating your optimized photos (24 hours)</p>
              </div>
              <Clock className="w-6 h-6 text-[#d4ae36] animate-pulse" />
            </div>

            <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg">
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">3</span>
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-white">Delivery</h3>
                <p className="text-gray-400 text-sm">We'll email you when everything is ready</p>
              </div>
              <Mail className="w-6 h-6 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Security & Privacy */}
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
          <Shield className="w-4 h-4" />
          <span>Your photos are secure and will never be shared</span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => router.push('/')}
            className="bg-[#d4ae36] hover:bg-[#c19d2f] text-black font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105"
          >
            Back to Home
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          
          <Button
            variant="outline"
            onClick={() => window.open('mailto:support@matchlensai.com', '_blank')}
            className="border-white/20 text-white hover:bg-white/10 px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105"
          >
            Contact Support
          </Button>
        </div>

        {/* Auto-redirect notice */}
        <p className="text-sm text-gray-500">
          Redirecting to homepage in {countdown} seconds...
        </p>
      </div>
    </div>
  );
}
