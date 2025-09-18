// Reddit Conversion API - Server-Side Tracking

const REDDIT_ACCESS_TOKEN = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjpzS3dsMnlsV0VtMjVmcXhwTU40cWY4MXE2OWFFdWFyMnpLMUdhVGxjdWNZIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjo0OTEzOTc4MTA2Ljc2NzMwNiwiaWF0IjoxNzU4MjE4MTA2Ljc2NzMwNiwianRpIjoiT3dXVWJSSW9sZWtfaDViRTNhdVJXall2QlVoYlZBIiwiY2lkIjoiMVExRU96VFBXbll2ZXJocHR2Z1dzUSIsImxpZCI6InQyXzF5Mmc5bXc2amsiLCJhaWQiOiJ0Ml8xeTJnOW13NmprIiwibGNhIjoxNzU4MjE4MTA1MTgyLCJzY3AiOiJlSnlLVmtwTUtVN096eXRMTFNyT3pNOHJWb29GQkFBQV9fOUJGZ2J1IiwiZmxvIjoxMCwibGwiOnRydWV9.ldXmh1ztt-4iNHI5akKFw-MGvRYOJhgv0EeKwliebOCitYSQ7qySnnbM1TYSn4r9QDt5XHnwRE4cQ7BphHvr6AgdesKlcpuppPHHz7JatD-yFYogLsMhoKKGy71njvQNigmah3sWw5g5MsTNNkKP0koJCLsUiXAYrw7lSfxgZ5qmkf_TzXAEMQaYGPgEVxeG5vXlxFNYfSUZg2uEIL2ypmLf5Zm8fvSUrOcwqTl_CWRWYm1T7IInF_nMDyjWT8viuoyfLQ6y81sLJ37JOuHQ3pa67bDzH7IEV7u4a5jh6_eCV2gDRl-Z9Tut1HZcrR_KBMtWZihBmS4WOKpKQbutuQ';

const REDDIT_CONVERSION_API_URL = 'https://ads-api.reddit.com/api/v2.0/conversions';

export interface RedditConversionData {
  event_type: 'page_view' | 'lead' | 'purchase' | 'add_to_cart' | 'initiate_checkout' | 'complete_registration';
  event_time: number;
  user_data?: {
    em?: string[]; // email hashes
    ph?: string[]; // phone hashes
    client_ip_address?: string;
    client_user_agent?: string;
    fbc?: string; // Facebook click ID
    fbp?: string; // Facebook browser ID
  };
  custom_data?: {
    value?: number;
    currency?: string;
    content_name?: string;
    content_category?: string;
    content_ids?: string[];
    content_type?: string;
    order_id?: string;
    num_items?: number;
  };
  event_source_url?: string;
  action_source?: 'website' | 'app' | 'phone_call' | 'chat' | 'physical_store' | 'system_generated' | 'other';
}

export const sendRedditConversion = async (conversionData: RedditConversionData): Promise<boolean> => {
  try {
    const response = await fetch(REDDIT_CONVERSION_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${REDDIT_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
        'User-Agent': 'RedditConversionAPI/1.0'
      },
      body: JSON.stringify({
        data: [conversionData]
      })
    });

    if (response.ok) {
      console.log('✅ Reddit Conversion API: Event sent successfully');
      return true;
    } else {
      const errorText = await response.text();
      console.error('❌ Reddit Conversion API Error:', response.status, errorText);
      return false;
    }
  } catch (error) {
    console.error('❌ Reddit Conversion API Exception:', error);
    return false;
  }
};

// Helper functions for common events
export const trackRedditPageView = async (userData?: Partial<RedditConversionData['user_data']>) => {
  return sendRedditConversion({
    event_type: 'page_view',
    event_time: Math.floor(Date.now() / 1000),
    user_data: userData,
    action_source: 'website'
  });
};

export const trackRedditLead = async (userData?: Partial<RedditConversionData['user_data']>, customData?: Partial<RedditConversionData['custom_data']>) => {
  return sendRedditConversion({
    event_type: 'lead',
    event_time: Math.floor(Date.now() / 1000),
    user_data: userData,
    custom_data: customData,
    action_source: 'website'
  });
};

export const trackRedditPurchase = async (
  value: number, 
  currency: string = 'USD', 
  userData?: Partial<RedditConversionData['user_data']>,
  customData?: Partial<RedditConversionData['custom_data']>
) => {
  return sendRedditConversion({
    event_type: 'purchase',
    event_time: Math.floor(Date.now() / 1000),
    user_data: userData,
    custom_data: {
      value,
      currency,
      ...customData
    },
    action_source: 'website'
  });
};

export const trackRedditInitiateCheckout = async (userData?: Partial<RedditConversionData['user_data']>, customData?: Partial<RedditConversionData['custom_data']>) => {
  return sendRedditConversion({
    event_type: 'initiate_checkout',
    event_time: Math.floor(Date.now() / 1000),
    user_data: userData,
    custom_data: customData,
    action_source: 'website'
  });
};

export const trackRedditCompleteRegistration = async (userData?: Partial<RedditConversionData['user_data']>, customData?: Partial<RedditConversionData['custom_data']>) => {
  return sendRedditConversion({
    event_type: 'complete_registration',
    event_time: Math.floor(Date.now() / 1000),
    user_data: userData,
    custom_data: customData,
    action_source: 'website'
  });
};

// Utility function to hash email/phone for privacy
export const hashUserData = (email?: string, phone?: string) => {
  const crypto = require('crypto');
  
  const userData: RedditConversionData['user_data'] = {};
  
  if (email) {
    userData.em = [crypto.createHash('sha256').update(email.toLowerCase().trim()).digest('hex')];
  }
  
  if (phone) {
    // Remove all non-digits and hash
    const cleanPhone = phone.replace(/\D/g, '');
    userData.ph = [crypto.createHash('sha256').update(cleanPhone).digest('hex')];
  }
  
  return userData;
};


