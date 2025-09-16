// Google Forms Integration Utilities

interface GoogleFormSubmission {
    formId: string;
    data: Record<string, string>;
}

/**
 * Submit data to Google Forms
 * @param formId - The Google Form ID (extracted from the form URL)
 * @param data - Object containing form field names and values
 */
export async function submitToGoogleForm(formId: string, data: Record<string, string>): Promise<boolean> {
    try {
        // Convert data to FormData format that Google Forms expects
        const formData = new FormData();

        // Add each field to the form data
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value);
        });

        // Submit to Google Forms
        const response = await fetch(`https://docs.google.com/forms/d/${formId}/formResponse`, {
            method: 'POST',
            body: formData,
            mode: 'no-cors' // Required for Google Forms
        });

        // Note: Due to CORS, we can't check the response status
        // But if no error is thrown, we assume success
        return true;
    } catch (error) {
        console.error('Error submitting to Google Form:', error);
        return false;
    }
}

/**
 * Submit payment data to Google Forms
 */
export async function submitPaymentData(paymentData: {
    orderId: string;
    paymentId: string;
    amount: number;
    currency: string;
    packageId: string;
    packageName: string;
    customerEmail: string;
    customerName: string;
    status: string;
    timestamp: string;
}): Promise<boolean> {
    // TEMPORARY: Log data to console and localStorage for testing
    console.log('💳 PAYMENT DATA SUBMITTED:', paymentData);
    localStorage.setItem('lastPaymentData', JSON.stringify(paymentData));

    // Replace with your actual Google Form ID
    const PAYMENT_FORM_ID = 'YOUR_PAYMENT_FORM_ID';

    if (PAYMENT_FORM_ID === 'YOUR_PAYMENT_FORM_ID') {
        console.log('⚠️ Google Form not configured yet. Data logged to console and localStorage.');
        return true; // Return true for testing
    }

    const formData = {
        'entry.ORDER_ID': paymentData.orderId,
        'entry.PAYMENT_ID': paymentData.paymentId,
        'entry.AMOUNT': paymentData.amount.toString(),
        'entry.CURRENCY': paymentData.currency,
        'entry.PACKAGE_ID': paymentData.packageId,
        'entry.PACKAGE_NAME': paymentData.packageName,
        'entry.CUSTOMER_EMAIL': paymentData.customerEmail,
        'entry.CUSTOMER_NAME': paymentData.customerName,
        'entry.STATUS': paymentData.status,
        'entry.TIMESTAMP': paymentData.timestamp,
    };

    return await submitToGoogleForm(PAYMENT_FORM_ID, formData);
}

/**
 * Submit onboarding data to Google Forms
 */
export async function submitOnboardingData(onboardingData: {
    name: string;
    age: string;
    datingGoal: string;
    currentMatches: string;
    bodyType: string;
    stylePreference: string;
    ethnicity: string;
    interests: string;
    currentBio: string;
    email: string;
    phone: string;
    vibe: string;
    wantMore: string;
    oneLiner: string;
    photoCount: number;
    screenshotCount: number;
    timestamp: string;
}): Promise<boolean> {
    // TEMPORARY: Log data to console and localStorage for testing
    console.log('📝 ONBOARDING DATA SUBMITTED:', onboardingData);
    localStorage.setItem('lastOnboardingData', JSON.stringify(onboardingData));

    // Replace with your actual Google Form ID
    const ONBOARDING_FORM_ID = 'YOUR_ONBOARDING_FORM_ID';

    if (ONBOARDING_FORM_ID === 'YOUR_ONBOARDING_FORM_ID') {
        console.log('⚠️ Google Form not configured yet. Data logged to console and localStorage.');
        return true; // Return true for testing
    }

    const formData = {
        'entry.NAME': onboardingData.name,
        'entry.AGE': onboardingData.age,
        'entry.DATING_GOAL': onboardingData.datingGoal,
        'entry.CURRENT_MATCHES': onboardingData.currentMatches,
        'entry.BODY_TYPE': onboardingData.bodyType,
        'entry.STYLE_PREFERENCE': onboardingData.stylePreference,
        'entry.ETHNICITY': onboardingData.ethnicity,
        'entry.INTERESTS': onboardingData.interests,
        'entry.CURRENT_BIO': onboardingData.currentBio,
        'entry.EMAIL': onboardingData.email,
        'entry.PHONE': onboardingData.phone,
        'entry.VIBE': onboardingData.vibe,
        'entry.WANT_MORE': onboardingData.wantMore,
        'entry.ONE_LINER': onboardingData.oneLiner,
        'entry.PHOTO_COUNT': onboardingData.photoCount.toString(),
        'entry.SCREENSHOT_COUNT': onboardingData.screenshotCount.toString(),
        'entry.TIMESTAMP': onboardingData.timestamp,
    };

    return await submitToGoogleForm(ONBOARDING_FORM_ID, formData);
}

/**
 * Get Google Form field names from form URL
 * This is a helper function to find the correct field names
 */
export function getFormFieldNames(formUrl: string): Promise<string[]> {
    // This would require server-side implementation to parse the form
    // For now, you'll need to manually inspect the form HTML
    console.log('To get field names, inspect the form HTML source and look for entry.XXXXXXX');
    return Promise.resolve([]);
}
