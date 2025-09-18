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
            const signUpData = {
                user_id: user.id,
                email: user.email_addresses?.[0]?.email_address,
                name: `${user.first_name} ${user.last_name}`.trim(),
                signup_method: 'Clerk',
                signup_source: 'Webhook',
                created_at: user.created_at
            };

            // Track to Reddit server-side
            try {
                await trackRedditCompleteRegistration(signUpData);
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
