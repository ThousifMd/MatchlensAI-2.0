// Test Supabase API directly without going through the app
const SUPABASE_URL = 'https://gykvrhhbxbzhvizivyfu.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5a3ZyaGhieGJ6aHZpeml2eWZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwNDIxNDgsImV4cCI6MjA3MzYxODE0OH0.TsfbJg68UPrGgQpLqoTAs9jMVks4YmCaJseH6vdamH0'

const testData = {
    payment_id: `test_payment_${Date.now()}`,
    name: "Test User",
    age: "28",
    dating_goal: "relationship",
    current_matches: "5-10",
    body_type: "athletic",
    style_preference: "casual",
    ethnicity: "mixed",
    interests: "fitness, travel, music, cooking",
    current_bio: "Love to travel and meet new people. Looking for someone to share adventures with.",
    email: "test.user@example.com",
    phone: "+1234567890",
    photo_count: 8,
    screenshot_count: 5,
    vibe: "fun and outgoing",
    want_more: "meaningful connections",
    one_liner: "Adventure seeker looking for my partner in crime"
}

async function testSupabaseAPI() {
    try {
        console.log('🧪 Testing Supabase API...')
        console.log('📝 Test data:', testData)

        const response = await fetch(`${SUPABASE_URL}/rest/v1/onboarding`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
            },
            body: JSON.stringify(testData)
        })

        const result = await response.json()

        if (response.ok) {
            console.log('✅ Success! Data stored:', result)
        } else {
            console.error('❌ Error:', response.status, result)
        }
    } catch (error) {
        console.error('❌ Exception:', error)
    }
}

// Run the test
testSupabaseAPI()
