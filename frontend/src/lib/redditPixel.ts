// Reddit Pixel Event Tracking Utilities

declare global {
    interface Window {
        rdt: (action: string, event: string, data?: any) => void;
    }
}

// Reddit Pixel Event Types
export const REDDIT_PIXEL_EVENTS = {
    LEAD: 'Lead',
    INITIATE_CHECKOUT: 'InitiateCheckout',
    COMPLETE_REGISTRATION: 'CompleteRegistration',
    PURCHASE: 'Purchase',
    ADD_TO_CART: 'AddToCart',
    VIEW_CONTENT: 'ViewContent',
    CUSTOM_EVENT: 'CustomEvent'
} as const;

// Utility function to track Reddit Pixel events
export const trackRedditPixelEvent = (event: string, data?: any) => {
    if (typeof window !== 'undefined' && window.rdt) {
        try {
            window.rdt('track', event, data);
            console.log(`Reddit Pixel Event Tracked: ${event}`, data);
        } catch (error) {
            console.error('Error tracking Reddit Pixel event:', error);
        }
    }
};

// Specific event tracking functions
export const trackRedditLead = (source?: string) => {
    trackRedditPixelEvent(REDDIT_PIXEL_EVENTS.LEAD, {
        content_name: source || 'CTA Button Click',
        content_category: 'lead_generation'
    });
};

export const trackRedditInitiateCheckout = (formType?: string) => {
    trackRedditPixelEvent(REDDIT_PIXEL_EVENTS.INITIATE_CHECKOUT, {
        content_name: formType || 'Onboarding Form',
        content_category: 'form_start'
    });
};

export const trackRedditCompleteRegistration = (formData?: any) => {
    trackRedditPixelEvent(REDDIT_PIXEL_EVENTS.COMPLETE_REGISTRATION, {
        content_name: 'Onboarding Form Submission',
        content_category: 'form_completion',
        ...formData
    });
};

export const trackRedditPurchase = (value: number, currency: string = 'USD', packageName?: string) => {
    trackRedditPixelEvent(REDDIT_PIXEL_EVENTS.PURCHASE, {
        value: value,
        currency: currency,
        content_name: packageName || 'Pricing Package',
        content_category: 'purchase'
    });
};

export const trackRedditTransactionSuccessful = (value: number, currency: string = 'USD', packageName?: string, transactionId?: string) => {
    trackRedditPixelEvent(REDDIT_PIXEL_EVENTS.CUSTOM_EVENT, {
        event_name: 'TransactionSuccessful',
        value: value,
        currency: currency,
        content_name: packageName || 'Pricing Package',
        content_category: 'transaction_success',
        transaction_id: transactionId
    });
};

export const trackRedditAddToCart = (packageName?: string, price?: number) => {
    trackRedditPixelEvent(REDDIT_PIXEL_EVENTS.ADD_TO_CART, {
        content_name: packageName || 'Pricing Package',
        content_category: 'pricing_selection',
        value: price,
        currency: 'USD'
    });
};

export const trackRedditViewContent = (contentName?: string, contentType?: string) => {
    trackRedditPixelEvent(REDDIT_PIXEL_EVENTS.VIEW_CONTENT, {
        content_name: contentName || 'FAQ Section',
        content_category: contentType || 'faq_interaction'
    });
};

export const trackRedditCTAClick = (ctaName?: string, location?: string) => {
    trackRedditPixelEvent(REDDIT_PIXEL_EVENTS.CUSTOM_EVENT, {
        event_name: 'CTAClick',
        content_name: ctaName || 'CTA Button',
        content_category: location || 'unknown_location'
    });
};

// Form step tracking
export const trackRedditFormStep = (step: number, stepName: string) => {
    trackRedditPixelEvent('CustomEvent', {
        event_name: 'FormStep',
        step_number: step,
        step_name: stepName,
        content_category: 'form_progress'
    });
};
