import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: NextRequest) {
    try {
        console.log('🧪 Testing Supabase connection in deployed environment...');
        
        // Try multiple environment variable names
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || 'https://gykvrhhbxbzhvizivyfu.supabase.co';
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
        
        console.log('🔧 Supabase URL:', supabaseUrl);
        console.log('🔧 Supabase Key exists:', !!supabaseKey);
        console.log('🔧 Supabase Key (first 20 chars):', supabaseKey ? supabaseKey.substring(0, 20) + '...' : 'NOT FOUND');
        
        if (!supabaseUrl || !supabaseKey) {
            return NextResponse.json({
                success: false,
                error: 'Missing Supabase credentials',
                details: {
                    url: !!supabaseUrl,
                    key: !!supabaseKey
                }
            }, { status: 500 });
        }
        
        const supabase = createClient(supabaseUrl, supabaseKey);
        
        // Test connection
        const { data, error } = await supabase
            .from('payments')
            .select('count')
            .limit(1);
        
        if (error) {
            console.error('❌ Supabase connection failed:', error);
            return NextResponse.json({
                success: false,
                error: 'Supabase connection failed',
                details: error.message
            }, { status: 500 });
        }
        
        // Test data insertion
        const testData = {
            order_id: `test_deployed_${Date.now()}`,
            amount: 1.00,
            currency: 'USD',
            package_id: 'test_package',
            package_name: 'Deployed Test Package',
            customer_email: 'test@deployed.com',
            customer_name: 'Deployed Test User',
            status: 'completed'
        };
        
        const { data: insertData, error: insertError } = await supabase
            .from('payments')
            .insert([testData])
            .select()
            .single();
        
        if (insertError) {
            console.error('❌ Data insertion failed:', insertError);
            return NextResponse.json({
                success: false,
                error: 'Data insertion failed',
                details: insertError.message
            }, { status: 500 });
        }
        
        console.log('✅ Test successful! Payment ID:', insertData.payment_id);
        
        // Clean up test data
        await supabase.from('payments').delete().eq('payment_id', insertData.payment_id);
        
        return NextResponse.json({
            success: true,
            message: 'Supabase connection and data writing works in deployed environment!',
            testPaymentId: insertData.payment_id,
            environment: {
                url: supabaseUrl,
                keyExists: !!supabaseKey
            }
        });
        
    } catch (error) {
        console.error('❌ Test failed:', error);
        return NextResponse.json({
            success: false,
            error: 'Test failed',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}
