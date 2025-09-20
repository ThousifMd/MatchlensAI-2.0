import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: NextRequest) {
    try {
        console.log('🚀 API Route: Storing onboarding data...');

        const body = await request.json();
        console.log('📝 Received data:', body);
        
        // Log environment variables for debugging
        console.log('🔧 Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
        console.log('🔧 Supabase Key exists:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

        // Validate required fields
        const requiredFields = ['payment_id', 'name', 'email', 'phone'];
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

        // Insert into Supabase
        const { data, error } = await supabase
            .from('onboarding')
            .insert([cleanData])
            .select()
            .single();

        if (error) {
            console.error('❌ Supabase error:', error);
            return NextResponse.json(
                { success: false, error: error.message },
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
