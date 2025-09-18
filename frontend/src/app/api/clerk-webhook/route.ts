import { NextRequest, NextResponse } from 'next/server';
import { trackRedditCompleteRegistration } from '@/lib/redditConversionAPI';

// Clerk webhook secret for verification
const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
    try {
        const body = await request.text();
        const signature = request.headers.get('svix-signature');
        const timestamp = request.headers.get('svix-timestamp');
        const webhookId = request.headers.get('svix-id');

        // Verify webhook signature (optional but recommended)
        if (CLERK_WEBHOOK_SECRET) {
            // Add signature verification logic here if needed
            console.log('🔐 Clerk webhook signature verification would go here');
        }

        const event = JSON.parse(body);
        console.log('📨 Clerk webhook received:', event.type);

        // Handle user.created event
        if (event.type === 'user.created') {
            const user = event.data;
            console.log('🎉 New user created via Clerk:', {
                id: user.id,
                email: user.email_addresses?.[0]?.email_address,
                name: `${user.first_name} ${user.last_name}`.trim()
            });

            // Track sign-up completion server-side
            const userData = {
                em: user.email_addresses?.[0]?.email_address ? [user.email_addresses[0].email_address] : undefined,
                ph: user.phone_numbers?.[0]?.phone_number ? [user.phone_numbers[0].phone_number] : undefined,
                client_ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
                client_user_agent: request.headers.get('user-agent') || 'unknown'
            };

            const customData = {
                content_name: 'User Registration',
                content_category: 'signup',
                content_type: 'user'
            };

            // Track to Reddit server-side
            try {
                await trackRedditCompleteRegistration(userData, customData);
                console.log('✅ Server-side sign-up tracking completed');
            } catch (error) {
                console.error('❌ Server-side sign-up tracking failed:', error);
            }
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('❌ Clerk webhook error:', error);
        return NextResponse.json(
            { error: 'Webhook processing failed' },
            { status: 500 }
        );
    }
}
