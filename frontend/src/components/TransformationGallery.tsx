"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Card } from "@/components/ui/card";

interface TransformationCardProps {
  title: string;
  beforeImage: string;
  afterImage: string;
  alt: string;
}

const TransformationCard: React.FC<TransformationCardProps> = ({ title, beforeImage, afterImage, alt }) => {
  const [showAfter, setShowAfter] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState({ before: false, after: false });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const beforeImgRef = useRef<HTMLImageElement>(null);
  const afterImgRef = useRef<HTMLImageElement>(null);

  // Preload both images
  useEffect(() => {
    const preloadImage = (src: string, type: 'before' | 'after') => {
      const img = new Image();
      img.onload = () => {
        setImagesLoaded(prev => ({ ...prev, [type]: true }));
      };
      img.onerror = () => {
        console.warn(`Failed to load ${type} image:`, src);
      };
      img.src = src;
    };

    preloadImage(beforeImage, 'before');
    preloadImage(afterImage, 'after');
  }, [beforeImage, afterImage]);

  const handleTabChange = (newShowAfter: boolean) => {
    if (newShowAfter === showAfter) return;

    setIsTransitioning(true);
    setShowAfter(newShowAfter);

    // Reset transition state after animation
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <Card className="bg-black border border-[#d4ae36]/20 overflow-hidden">
      {/* Card Header with Tabs */}
      <div className="flex border-b border-[#d4ae36]/20">
        <button
          onClick={() => handleTabChange(false)}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${!showAfter
            ? 'bg-[#EDC967] text-black'
            : 'text-white hover:text-[#EDC967]'
            }`}
        >
          Before
        </button>
        <button
          onClick={() => handleTabChange(true)}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${showAfter
            ? 'bg-[#EDC967] text-black'
            : 'text-white hover:text-[#EDC967]'
            }`}
        >
          After
        </button>
      </div>

      {/* Card Title */}
      <div className="p-4 border-b border-[#d4ae36]/20">
        <h3 className="text-white font-semibold text-lg">{title}</h3>
      </div>

      {/* Image Container */}
      <div className="relative h-80 overflow-hidden">
        {/* Before Image */}
        <img
          ref={beforeImgRef}
          src={beforeImage}
          alt={`Before - ${alt}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${!showAfter ? 'opacity-100' : 'opacity-0'
            }`}
          style={{ objectPosition: 'center center' }}
        />

        {/* After Image */}
        <img
          ref={afterImgRef}
          src={afterImage}
          alt={`After - ${alt}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${showAfter ? 'opacity-100' : 'opacity-0'
            }`}
          style={{ objectPosition: 'center center' }}
        />

        {/* Loading State */}
        {(!imagesLoaded.before || !imagesLoaded.after) && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50">
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#d4ae36]"></div>
              <span className="text-white text-sm">Loading images...</span>
            </div>
          </div>
        )}

        {/* Slider Handle (only visible when showing after) */}
        {showAfter && imagesLoaded.after && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg border-2 border-[#d4ae36] flex items-center justify-center">
            <div className="w-2 h-2 bg-gradient-to-br from-[#d4ae36] to-[#c19d2f] rounded-full" />
          </div>
        )}
      </div>
    </Card>
  );
};

export const TransformationGallery: React.FC = () => {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      {/* Problem Framing Above Cards */}
      <div className="text-center mb-12">
        <p className="text-2xl font-semibold text-white">
          Look average → get ignored. Look like high-status → get matches.
        </p>
        <p className="text-lg text-white mt-2">
          Same person, different results.
        </p>
      </div>

      {/* Transformation Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <TransformationCard
          title="Urban Confidence"
          beforeImage="/images/1_before.jpeg"
          afterImage="/images/1_after.jpeg"
          alt="Urban confidence transformation"
        />
        <TransformationCard
          title="Fitness Edge"
          beforeImage="/images/2_before.jpg"
          afterImage="/images/2_after.jpeg"
          alt="Fitness edge transformation"
        />
      </div>

      {/* Caption */}
      <div className="text-center">
        <p className="text-2xl font-semibold text-white">
          Same person, 10x more matches
        </p>
        <p className="text-lg text-white mt-2">
          Professional quality photos that get results
        </p>
      </div>
    </section>
  );
};