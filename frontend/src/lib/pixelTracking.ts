// Combined Pixel Tracking Utilities (Meta + Reddit)

import {
    trackMetaPixelEvent,
    trackLead,
    trackInitiateCheckout,
    trackCompleteRegistration,
    trackPurchase,
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
