// Test creating payment first, then onboarding
const SUPABASE_URL = 'https://gykvrhhbxbzhvizivyfu.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5a3ZyaGhieGJ6aHZpeml2eWZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwNDIxNDgsImV4cCI6MjA3MzYxODE0OH0.TsfbJg68UPrGgQpLqoTAs9jMVks4YmCaJseH6vdamH0'

async function createPaymentAndOnboarding() {
    try {
        // Step 1: Create payment record
        console.log('💳 Creating payment record...')

        const paymentData = {
            order_id: `test_order_${Date.now()}`,
            amount: 100,
            currency: "USD",
            package_id: "test_package",
            package_name: "Test Package",
            customer_email: "john.doe@example.com",
            customer_name: "John Doe",
            status: "completed"
        }

        const paymentResponse = await fetch(`${SUPABASE_URL}/rest/v1/payments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
            },
            body: JSON.stringify(paymentData)
        })

        const paymentResult = await paymentResponse.json()

        if (!paymentResponse.ok) {
            console.error('❌ Payment creation failed:', paymentResult)
            return
        }

        console.log('✅ Payment created:', paymentResult)
        const paymentId = paymentResult.payment_id

        // Step 2: Create onboarding record with the payment_id
        console.log('📝 Creating onboarding record...')

        const onboardingData = {
            payment_id: paymentId,
            name: "John Doe",
            age: "25",
            dating_goal: "relationship",
            current_matches: "3-5",
            body_type: "athletic",
            style_preference: "casual",
            ethnicity: "mixed",
            interests: "fitness, travel, music",
            current_bio: "Love to travel and meet new people",
            email: "john.doe@example.com",
            phone: "+1234567890",
            photo_count: 5,
            screenshot_count: 3,
            vibe: "fun and outgoing",
            want_more: "meaningful connections",
            one_liner: "Adventure seeker looking for my partner in crime"
        }

        const onboardingResponse = await fetch(`${SUPABASE_URL}/rest/v1/onboarding`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
            },
            body: JSON.stringify(onboardingData)
        })

        const onboardingResult = await onboardingResponse.json()

        if (onboardingResponse.ok) {
            console.log('✅ Onboarding created successfully:', onboardingResult)
        } else {
            console.error('❌ Onboarding creation failed:', onboardingResult)
        }

    } catch (error) {
        console.error('❌ Exception:', error)
    }
}

// Run the test
createPaymentAndOnboarding()
