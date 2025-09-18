# Reddit Pixel Setup Guide

## 🎯 What I've Added

I've implemented Reddit pixel tracking alongside your existing Meta Pixel setup. Here's what's been added:

### 📁 New Files Created:
1. **`/frontend/src/lib/redditPixel.ts`** - Reddit pixel tracking utilities
2. **`/frontend/src/lib/pixelTracking.ts`** - Combined tracking for both Meta + Reddit pixels
3. **`REDDIT_PIXEL_SETUP.md`** - This setup guide

### 🔧 Files Modified:
1. **`/frontend/src/app/layout.tsx`** - Added Reddit pixel script
2. **`/frontend/src/components/HeroSection.tsx`** - Updated to use combined tracking

## 🚀 How to Complete Setup

### Step 1: Get Your Reddit Pixel ID
1. Go to [Reddit Ads Manager](https://ads.reddit.com/)
2. Create a new campaign or go to existing campaign
3. In the "Conversion Tracking" section, create a new pixel
4. Copy your **Pixel ID** (it looks like: `t2_abc123def456`)

### Step 2: Update the Pixel ID
Replace `YOUR_REDDIT_PIXEL_ID` in `/frontend/src/app/layout.tsx` with your actual Reddit pixel ID:

```javascript
// Find this line in layout.tsx (around line 127):
rdt('init','YOUR_REDDIT_PIXEL_ID');

// Replace with your actual pixel ID:
rdt('init','t2_your_actual_pixel_id');
```

### Step 3: Update Environment Variables (Optional)
You can also use environment variables for better security:

1. Add to your `.env.local`:
```
NEXT_PUBLIC_REDDIT_PIXEL_ID=your_actual_pixel_id
```

2. Update `layout.tsx` to use the environment variable:
```javascript
rdt('init','${process.env.NEXT_PUBLIC_REDDIT_PIXEL_ID}');
```

## 📊 What's Being Tracked

The combined tracking system now fires events to **both Meta Pixel and Reddit Pixel** for:

- ✅ **Page Views** - Automatic on page load
- ✅ **CTA Clicks** - "Upgrade my photos" button clicks
- ✅ **Lead Generation** - When users start the process
- ✅ **Checkout Initiation** - When users begin checkout
- ✅ **Purchase Completion** - When payments are successful
- ✅ **Form Steps** - Progress through onboarding
- ✅ **Custom Events** - Any other tracking you need

## 🎯 Reddit Pixel Events Available

```javascript
import { 
  trackRedditLead,
  trackRedditPurchase,
  trackRedditCTAClick,
  // ... and more
} from '@/lib/redditPixel';

// Or use combined tracking (recommended):
import { 
  trackCTAClickCombined,
  trackPurchaseCombined,
  // ... and more
} from '@/lib/pixelTracking';
```

## 🔍 Testing Your Setup

1. **Install Reddit Pixel Helper** (browser extension)
2. **Open your website** in the browser
3. **Check the extension** - you should see Reddit pixel events firing
4. **Test the CTA button** - should fire both Meta and Reddit events

## 🚨 Important Notes

- **Replace the placeholder ID** before going live
- **Test thoroughly** in development first
- **Reddit pixel** works similarly to Meta Pixel but has some differences
- **Both pixels** will now track the same events for better attribution

## 🆘 Need Help?

If you need help getting your Reddit pixel ID or have any issues:
1. Check Reddit Ads Manager documentation
2. Use Reddit Pixel Helper extension for debugging
3. Check browser console for any pixel errors

The setup is now ready - just add your actual Reddit pixel ID! 🎉
