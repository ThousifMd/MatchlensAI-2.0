import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const paymentData = await request.json();
    
    console.log('💳 Creating payment record:', paymentData);

    const { data, error } = await supabase
      .from('payments')
      .insert([paymentData])
      .select()
      .single();

    if (error) {
      console.error('❌ Payment creation error:', error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }

    console.log('✅ Payment created successfully:', data);
    return NextResponse.json({ success: true, ...data });

  } catch (error) {
    console.error('❌ Payment creation exception:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
