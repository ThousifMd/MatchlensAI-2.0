import { NextRequest, NextResponse } from 'next/server';
import {
    sendRedditConversion,
    trackRedditPurchase,
    trackRedditLead,
    trackRedditInitiateCheckout,
    trackRedditCompleteRegistration,
    hashUserData,
    RedditConversionData
} from '@/lib/redditConversionAPI';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            event_type,
            user_data,
            custom_data,
            email,
            phone,
            value,
            currency = 'USD',
            package_name,
            transaction_id
        } = body;

        // Get client IP and user agent
        const clientIP = request.headers.get('x-forwarded-for') ||
            request.headers.get('x-real-ip') ||
            '127.0.0.1';
        const userAgent = request.headers.get('user-agent') || '';

        // Hash user data if email/phone provided
        const hashedUserData = hashUserData(email, phone);

        // Combine with additional user data
        const finalUserData = {
            ...hashedUserData,
            client_ip_address: clientIP,
            client_user_agent: userAgent,
            ...user_data
        };

        let success = false;

        switch (event_type) {
            case 'purchase':
                success = await trackRedditPurchase(
                    value || 0,
                    currency,
                    finalUserData,
                    {
                        content_name: package_name,
                        content_category: 'pricing_package',
                        order_id: transaction_id,
                        ...custom_data
                    }
                );
                break;

            case 'lead':
                success = await trackRedditLead(
                    finalUserData,
                    {
                        content_name: package_name || 'CTA Click',
                        content_category: 'lead_generation',
                        ...custom_data
                    }
                );
                break;

            case 'initiate_checkout':
                success = await trackRedditInitiateCheckout(
                    finalUserData,
                    {
                        content_name: package_name || 'Checkout Started',
                        content_category: 'checkout_initiation',
                        ...custom_data
                    }
                );
                break;

            case 'complete_registration':
                success = await trackRedditCompleteRegistration(
                    finalUserData,
                    {
                        content_name: 'Onboarding Form',
                        content_category: 'form_completion',
                        ...custom_data
                    }
                );
                break;

            default:
                // Custom event
                const conversionData: RedditConversionData = {
                    event_type: event_type as any,
                    event_time: Math.floor(Date.now() / 1000),
                    user_data: finalUserData,
                    custom_data: custom_data,
                    action_source: 'website'
                };
                success = await sendRedditConversion(conversionData);
        }

        return NextResponse.json({
            success,
            message: success ? 'Reddit conversion tracked successfully' : 'Failed to track Reddit conversion'
        });

    } catch (error) {
        console.error('Reddit Conversion API Error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}


