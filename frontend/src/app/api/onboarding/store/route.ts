import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Use environment variables from Vercel (no hardcoded values)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: NextRequest) {
    try {
        console.log('🚀 API Route: Storing onboarding data...');

        const body = await request.json();
        console.log('📝 Received data:', body);

        // Log environment variables for debugging
        console.log('🔧 All environment variables:');
        console.log('  NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
        console.log('  SUPABASE_URL:', process.env.SUPABASE_URL);
        console.log('  NEXT_PUBLIC_SUPABASE_ANON_KEY exists:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
        console.log('  SUPABASE_ANON_KEY exists:', !!process.env.SUPABASE_ANON_KEY);
        console.log('🔧 Using URL:', supabaseUrl);
        console.log('🔧 Using Key exists:', !!supabaseKey);

        // Check if Supabase credentials are available
        if (!supabaseUrl || !supabaseKey || supabaseUrl === '' || supabaseKey === '') {
            console.error('❌ Missing Supabase credentials');
            return NextResponse.json(
                {
                    success: false,
                    error: 'Missing Supabase credentials',
                    details: {
                        url: !!supabaseUrl,
                        key: !!supabaseKey,
                        envVars: {
                            NEXT_PUBLIC_SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
                            SUPABASE_URL: !!process.env.SUPABASE_URL,
                            NEXT_PUBLIC_SUPABASE_ANON_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
                            SUPABASE_ANON_KEY: !!process.env.SUPABASE_ANON_KEY
                        }
                    }
                },
                { status: 500 }
            );
        }

        // Remove legacy key detection - let Supabase handle it

        // Validate required fields (phone is optional)
        const requiredFields = ['payment_id', 'name', 'email'];
        for (const field of requiredFields) {
            if (!body[field]) {
                console.error(`❌ Missing required field: ${field}`);
                return NextResponse.json(
                    { success: false, error: `Missing required field: ${field}` },
                    { status: 400 }
                );
            }
        }

        // Clean and validate data
        const cleanData = {
            ...body,
            name: body.name?.trim() || '',
            email: body.email?.trim() || '',
            phone: body.phone?.trim() || '',
            age: body.age?.trim() || '',
            dating_goal: body.dating_goal?.trim() || '',
            current_matches: body.current_matches?.trim() || '',
            body_type: body.body_type?.trim() || '',
            style_preference: body.style_preference?.trim() || '',
            ethnicity: body.ethnicity?.trim() || '',
            interests: body.interests?.trim() || '',
            current_bio: body.current_bio?.trim() || '',
            vibe: body.vibe?.trim() || '',
            want_more: body.want_more?.trim() || '',
            one_liner: body.one_liner?.trim() || '',
            photo_count: body.photo_count || 0,
            screenshot_count: body.screenshot_count || 0
        };

        console.log('📝 Cleaned data:', cleanData);
        console.log('📝 Data to insert:', JSON.stringify(cleanData, null, 2));

        // Insert into Supabase
        const { data, error } = await supabase
            .from('onboarding')
            .insert([cleanData])
            .select()
            .single();

        if (error) {
            console.error('❌ Supabase error:', error);
            console.error('❌ Error details:', JSON.stringify(error, null, 2));
            return NextResponse.json(
                {
                    success: false,
                    error: error.message,
                    details: error,
                    dataSent: cleanData
                },
                { status: 500 }
            );
        }

        console.log('✅ Data stored successfully:', data);
        return NextResponse.json({
            success: true,
            data: data,
            message: 'Onboarding data stored successfully'
        });

    } catch (error) {
        console.error('❌ API Route error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
