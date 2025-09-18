# Clerk Webhook Setup for Sign-Up Tracking

This document explains how to set up Clerk webhooks to track user sign-ups server-side.

## Overview

We've implemented comprehensive sign-up tracking that includes:

1. **Client-side tracking** - When users click sign-up buttons or complete sign-up forms
2. **Server-side tracking** - Via Clerk webhooks when users are actually created
3. **Onboarding completion tracking** - When users complete the onboarding form

## Webhook Setup

### 1. Configure Clerk Webhook

1. Go to your [Clerk Dashboard](https://dashboard.clerk.com/)
2. Navigate to **Webhooks** in the left sidebar
3. Click **Add Endpoint**
4. Set the endpoint URL to: `https://yourdomain.com/api/clerk-webhook`
5. Select the **user.created** event
6. Copy the webhook secret

### 2. Environment Variables

Add the webhook secret to your environment variables:

```bash
# .env.local
CLERK_WEBHOOK_SECRET=your_webhook_secret_here
```

### 3. Deploy the Webhook

The webhook endpoint is already implemented at `/api/clerk-webhook/route.ts` and will:

- Receive Clerk webhook events
- Track sign-up completion to Reddit server-side
- Log user creation events

## Tracking Events

### Client-Side Events

| Event | Trigger | Tracking |
|-------|---------|----------|
| Sign Up Button Click | User clicks "Sign Up" on auth page | Meta Pixel, Reddit Pixel |
| Sign Up Required | User needs to sign up to continue | Meta Pixel, Reddit Pixel |
| Auth Page Visit | User visits `/auth` page | Meta Pixel, Reddit Pixel |

### Server-Side Events

| Event | Trigger | Tracking |
|-------|---------|----------|
| User Created | Clerk webhook fires | Reddit Server-Side API |

### Onboarding Events

| Event | Trigger | Tracking |
|-------|---------|----------|
| Form Step Completion | User completes each step | Meta Pixel, Reddit Pixel |
| Complete Registration | User submits onboarding form | Meta Pixel, Reddit Pixel, Reddit Server-Side |

## Testing

### Test Client-Side Tracking

1. Open browser dev tools
2. Go to `/auth` page
3. Click "Sign Up" button
4. Check console for tracking events

### Test Server-Side Tracking

1. Set up webhook in Clerk dashboard
2. Create a new user account
3. Check server logs for webhook events
4. Verify Reddit server-side tracking

## Files Modified

- `frontend/src/app/auth/[[...rest]]/page.tsx` - Added sign-up button tracking
- `frontend/src/components/PricingSection.tsx` - Added sign-up required tracking
- `frontend/src/components/TrackedSignUpButton.tsx` - New component for tracked sign-up buttons
- `frontend/src/app/api/clerk-webhook/route.ts` - New webhook endpoint
- `CLERK_WEBHOOK_SETUP.md` - This documentation

## Complete Sign-Up Funnel

Now you have complete visibility into your sign-up funnel:

1. **Interest** → User visits site, sees pricing
2. **Intent** → User clicks "Get Started" or "Sign Up"
3. **Sign-Up** → User creates account via Clerk
4. **Onboarding** → User completes onboarding form
5. **Purchase** → User completes payment

Each step is tracked to both Meta Pixel and Reddit Pixel for comprehensive analytics.
