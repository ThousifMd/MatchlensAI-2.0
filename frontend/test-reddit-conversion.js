// Test script for Reddit Conversion API
// Run with: node test-reddit-conversion.js

const testRedditConversion = async () => {
    try {
        console.log('🧪 Testing Reddit Conversion API...');

        // Test data
        const testData = {
            event_type: 'purchase',
            email: 'test@example.com',
            value: 69,
            currency: 'USD',
            package_name: 'Most Attention',
            transaction_id: 'test_txn_' + Date.now()
        };

        console.log('📤 Sending test data:', testData);

        const response = await fetch('http://localhost:3000/api/reddit-conversion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testData)
        });

        const result = await response.json();

        if (result.success) {
            console.log('✅ Reddit Conversion API test successful!');
            console.log('📊 Response:', result);
        } else {
            console.log('❌ Reddit Conversion API test failed!');
            console.log('📊 Response:', result);
        }

    } catch (error) {
        console.error('❌ Test error:', error);
    }
};

// Run the test
testRedditConversion();
