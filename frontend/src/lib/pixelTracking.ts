// Combined Pixel Tracking Utilities (Meta + Reddit)

import {
    trackMetaPixelEvent,
    trackLead,
    trackInitiateCheckout,
    trackCompleteRegistration,
    trackPurchase,
    trackSubscribe,
    trackTransactionSuccessful,
    trackAddToCart,
    trackViewContent,
    trackCTAClick,
    trackFormStep
} from './metaPixel';

import {
    trackRedditPixelEvent,
    trackRedditLead,
    trackRedditInitiateCheckout,
    trackRedditCompleteRegistration,
    trackRedditPurchase,
    trackRedditTransactionSuccessful,
    trackRedditAddToCart,
    trackRedditViewContent,
    trackRedditCTAClick,
    trackRedditFormStep
} from './redditPixel';

// Combined tracking functions that fire both Meta and Reddit pixels
export const trackLeadCombined = (source?: string) => {
    trackLead(source);
    trackRedditLead(source);
};

export const trackInitiateCheckoutCombined = (formType?: string) => {
    trackInitiateCheckout(formType);
    trackRedditInitiateCheckout(formType);
};

export const trackCompleteRegistrationCombined = (formData?: any) => {
    trackCompleteRegistration(formData);
    trackRedditCompleteRegistration(formData);
};

export const trackPurchaseCombined = (value: number, currency: string = 'USD', packageName?: string) => {
    trackPurchase(value, currency, packageName);
    trackRedditPurchase(value, currency, packageName);
};

export const trackSubscribeCombined = (value: number, currency: string = 'USD', packageName?: string) => {
    trackSubscribe(value, currency, packageName);
    trackRedditPurchase(value, currency, packageName); // Reddit doesn't have Subscribe, use Purchase
};

export const trackTransactionSuccessfulCombined = (value: number, currency: string = 'USD', packageName?: string, transactionId?: string) => {
    trackTransactionSuccessful(value, currency, packageName, transactionId);
    trackRedditTransactionSuccessful(value, currency, packageName, transactionId);
};

export const trackAddToCartCombined = (packageName?: string, price?: number) => {
    trackAddToCart(packageName, price);
    trackRedditAddToCart(packageName, price);
};

export const trackViewContentCombined = (contentName?: string, contentType?: string) => {
    trackViewContent(contentName, contentType);
    trackRedditViewContent(contentName, contentType);
};

export const trackCTAClickCombined = (ctaName?: string, location?: string) => {
    trackCTAClick(ctaName, location);
    trackRedditCTAClick(ctaName, location);
};

export const trackFormStepCombined = (step: number, stepName: string) => {
    trackFormStep(step, stepName);
    trackRedditFormStep(step, stepName);
};

// Custom event tracking for both pixels
export const trackCustomEventCombined = (eventName: string, data?: any) => {
    trackMetaPixelEvent('CustomEvent', {
        event_name: eventName,
        ...data
    });
    trackRedditPixelEvent('CustomEvent', {
        event_name: eventName,
        ...data
    });
};

// Server-side Reddit Conversion API tracking functions
export const trackRedditConversionServer = async (
    eventType: 'purchase' | 'lead' | 'initiate_checkout' | 'complete_registration' | 'page_view',
    data: {
        email?: string;
        phone?: string;
        value?: number;
        currency?: string;
        package_name?: string;
        transaction_id?: string;
        custom_data?: any;
    } = {}
) => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
        console.warn('Reddit Conversion API: Not available in server environment');
        return false;
    }

    try {
        const response = await fetch('/api/reddit-conversion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                event_type: eventType,
                ...data
            })
        });

        if (!response.ok) {
            console.warn(`Reddit Conversion API: HTTP ${response.status} - ${response.statusText}`);
            return false;
        }

        const result = await response.json();
        if (result && result.success) {
            console.log(`✅ Reddit Conversion API: ${eventType} tracked successfully`);
            return true;
        } else {
            console.warn(`Reddit Conversion API: Failed to track ${eventType}`, result?.error || 'Unknown error');
            return false;
        }
    } catch (error) {
        console.warn(`Reddit Conversion API Exception for ${eventType}:`, error);
        return false;
    }
};

// Combined client-side + server-side tracking functions
export const trackPurchaseCombinedFull = async (
    value: number,
    currency: string = 'USD',
    packageName?: string,
    transactionId?: string,
    email?: string
) => {
    // Client-side tracking
    trackPurchaseCombined(value, currency, packageName);

    // Server-side Reddit tracking (non-blocking)
    try {
        await trackRedditConversionServer('purchase', {
            email,
            value,
            currency,
            package_name: packageName,
            transaction_id: transactionId
        });
    } catch (error) {
        console.warn('Reddit tracking failed (non-blocking):', error);
    }
};

export const trackSubscribeCombinedFull = async (
    value: number,
    currency: string = 'USD',
    packageName?: string,
    transactionId?: string,
    email?: string
) => {
    // Client-side tracking
    trackSubscribeCombined(value, currency, packageName);

    // Server-side Reddit tracking (non-blocking)
    try {
        await trackRedditConversionServer('purchase', {
            email,
            value,
            currency,
            package_name: packageName,
            transaction_id: transactionId
        });
    } catch (error) {
        // Silently handle Reddit tracking errors to not block the payment flow
        console.warn('Reddit tracking failed (non-blocking):', error);
    }
};

export const trackLeadCombinedFull = async (
    source?: string,
    email?: string,
    phone?: string
) => {
    // Client-side tracking
    trackLeadCombined(source);

    // Server-side Reddit tracking (non-blocking)
    try {
        await trackRedditConversionServer('lead', {
            email,
            phone,
            custom_data: { lead_source: source }
        });
    } catch (error) {
        console.warn('Reddit tracking failed (non-blocking):', error);
    }
};

export const trackInitiateCheckoutCombinedFull = async (
    formType?: string,
    email?: string,
    packageName?: string
) => {
    // Client-side tracking
    trackInitiateCheckoutCombined(formType);

    // Server-side Reddit tracking (non-blocking)
    try {
        await trackRedditConversionServer('initiate_checkout', {
            email,
            package_name: packageName,
            custom_data: { form_type: formType }
        });
    } catch (error) {
        console.warn('Reddit tracking failed (non-blocking):', error);
    }
};

export const trackCompleteRegistrationCombinedFull = async (
    formData?: any,
    email?: string,
    phone?: string
) => {
    // Client-side tracking
    trackCompleteRegistrationCombined(formData);

    // Server-side Reddit tracking (non-blocking)
    try {
        await trackRedditConversionServer('complete_registration', {
            email,
            phone,
            custom_data: formData
        });
    } catch (error) {
        console.warn('Reddit tracking failed (non-blocking):', error);
    }
};
