# Supabase Setup Guide for Matchlens AI

This guide will help you set up Supabase to store payment data, onboarding information, and images for your Matchlens AI application.

## 🚀 Step 1: Create Supabase Project

### 1.1 Sign Up for Supabase
1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up with GitHub, Google, or email
4. Create a new organization (if needed)

### 1.2 Create New Project
1. Click "New Project"
2. Choose your organization
3. Enter project details:
   - **Name**: `matchlens-ai`
   - **Database Password**: Choose a strong password (save this!)
   - **Region**: Choose closest to your users
4. Click "Create new project"
5. Wait for project to be ready (2-3 minutes)

### 1.3 Get Project Credentials
1. Go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (looks like: `https://xyz.supabase.co`)
   - **anon public** key (long string starting with `eyJ...`)

## 🔧 Step 2: Configure Environment Variables

### 2.1 Create Environment File
1. In your project root, create `.env.local` file
2. Add your Supabase credentials:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# PayPal Configuration (existing)
NEXT_PUBLIC_PAYPAL_CLIENT_ID=Aa3Qhzd--_8MNtB9U8LctWUzDXw3eO7XPw2cyHUzwa9e_sYlD1pXnQK_K3iXNIXD2i64F8AUfPiWL-AT
```

### 2.2 Replace Placeholder Values
- Replace `https://your-project-id.supabase.co` with your actual Project URL
- Replace `your-anon-key-here` with your actual anon public key

## 🗄️ Step 3: Set Up Database Tables

### 3.1 Open SQL Editor
1. In Supabase dashboard, go to **SQL Editor**
2. Click "New query"

### 3.2 Create Payments Table
Copy and paste this SQL:

```sql
-- Create payments table
CREATE TABLE payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id TEXT NOT NULL,
  payment_id TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  package_id TEXT NOT NULL,
  package_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'completed',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_payments_customer_email ON payments(customer_email);
CREATE INDEX idx_payments_created_at ON payments(created_at);
```

### 3.3 Create Onboarding Table
Copy and paste this SQL:

```sql
-- Create onboarding table
CREATE TABLE onboarding (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  payment_id TEXT NOT NULL,
  name TEXT NOT NULL,
  age TEXT NOT NULL,
  dating_goal TEXT NOT NULL,
  current_matches TEXT NOT NULL,
  body_type TEXT NOT NULL,
  style_preference TEXT NOT NULL,
  ethnicity TEXT NOT NULL,
  interests TEXT NOT NULL,
  current_bio TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  vibe TEXT NOT NULL,
  want_more TEXT NOT NULL,
  one_liner TEXT NOT NULL,
  photo_count INTEGER NOT NULL DEFAULT 0,
  screenshot_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_onboarding_email ON onboarding(email);
CREATE INDEX idx_onboarding_created_at ON onboarding(created_at);
```

### 3.4 Create Images Table
Copy and paste this SQL:

```sql
-- Create images table
CREATE TABLE images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  payment_id TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  file_type TEXT NOT NULL,
  image_type TEXT NOT NULL CHECK (image_type IN ('profile_photo', 'screenshot')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_images_payment_id ON images(payment_id);
CREATE INDEX idx_images_type ON images(image_type);
```

## 📁 Step 4: Set Up File Storage

### 4.1 Create Storage Buckets
1. Go to **Storage** in Supabase dashboard
2. Click "Create a new bucket"
3. Create two buckets:

**Bucket 1: Profile Photos**
- **Name**: `profile-photos`
- **Public**: ✅ Yes (so images can be accessed via URL)
- **File size limit**: 10MB
- **Allowed MIME types**: `image/jpeg,image/png,image/webp`

**Bucket 2: Screenshots**
- **Name**: `screenshots`
- **Public**: ✅ Yes
- **File size limit**: 10MB
- **Allowed MIME types**: `image/jpeg,image/png,image/webp`

### 4.2 Set Storage Policies
1. Go to **Storage** → **Policies**
2. For each bucket, create a policy:

**Policy Name**: `Allow public uploads`
**Policy Definition**:
```sql
-- For profile-photos bucket
INSERT INTO storage.objects (bucket_id, name, owner, metadata)
SELECT 'profile-photos', name, auth.uid(), metadata
FROM (SELECT name, metadata) AS data;

-- For screenshots bucket  
INSERT INTO storage.objects (bucket_id, name, owner, metadata)
SELECT 'screenshots', name, auth.uid(), metadata
FROM (SELECT name, metadata) AS data;
```

## 🔐 Step 5: Set Up Row Level Security (RLS)

### 5.1 Enable RLS on Tables
Run this SQL in the SQL Editor:

```sql
-- Enable RLS on all tables
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE onboarding ENABLE ROW LEVEL SECURITY;
ALTER TABLE images ENABLE ROW LEVEL SECURITY;

-- Create policies to allow all operations (for now)
-- You can make these more restrictive later

-- Payments policies
CREATE POLICY "Allow all operations on payments" ON payments
FOR ALL USING (true);

-- Onboarding policies  
CREATE POLICY "Allow all operations on onboarding" ON onboarding
FOR ALL USING (true);

-- Images policies
CREATE POLICY "Allow all operations on images" ON images
FOR ALL USING (true);
```

## 🧪 Step 6: Test Your Setup

### 6.1 Test Database Connection
1. Restart your development server: `npm run dev`
2. Check browser console for any Supabase connection errors
3. Look for successful connection messages

### 6.2 Test Data Insertion
1. Complete a test payment flow
2. Check Supabase dashboard → **Table Editor** → **payments**
3. Verify data appears in the table

### 6.3 Test Image Upload
1. Complete onboarding with images
2. Check Supabase dashboard → **Storage** → **profile-photos**
3. Verify images are uploaded and accessible

## 📊 Step 7: View Your Data

### 7.1 Supabase Dashboard
- **Table Editor**: View and edit your data
- **Storage**: Manage uploaded images
- **SQL Editor**: Run custom queries
- **API**: View auto-generated API documentation

### 7.2 Data Relationships
- Each onboarding record can have multiple images
- Images are linked to onboarding via `onboarding_id`
- Payments and onboarding are separate but can be linked by email

## 🚀 Step 8: Go Live

### 8.1 Production Setup
1. Update environment variables for production
2. Test complete flow in production
3. Monitor Supabase dashboard for data

### 8.2 Monitoring
- Check **Logs** for any errors
- Monitor **Storage** usage
- Review **Database** performance

## 🔧 Troubleshooting

### Common Issues:
1. **Connection Errors**: Check environment variables
2. **Permission Errors**: Verify RLS policies
3. **Upload Errors**: Check storage bucket policies
4. **Data Not Appearing**: Check browser console for errors

### Debug Tips:
1. Use Supabase dashboard to inspect data
2. Check browser console for detailed error messages
3. Use SQL Editor to run test queries
4. Verify all environment variables are set correctly

## 🎯 Benefits of This Setup

- ✅ **No Backend Required**: Everything runs client-side
- ✅ **Real Database**: PostgreSQL with relationships
- ✅ **Image Storage**: Built-in file storage with CDN
- ✅ **Real-time Updates**: Live data synchronization
- ✅ **Free Tier**: 1GB storage, 500MB database
- ✅ **Easy Management**: Beautiful dashboard interface
- ✅ **Scalable**: Grows with your business

Your Matchlens AI application now has a professional database and file storage system without needing any backend infrastructure!
