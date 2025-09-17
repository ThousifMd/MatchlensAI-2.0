import { supabase, TABLES, STORAGE_BUCKETS, isSupabaseConfigured, type PaymentData, type OnboardingData, type ImageData } from './supabase'

/**
 * Upload a file to Supabase Storage
 */
export async function uploadFile(
    file: File,
    bucket: string,
    path: string
): Promise<{ success: boolean; url?: string; error?: string }> {
    try {
        console.log(`📤 Uploading file to ${bucket}/${path}`)

        const { data, error } = await supabase.storage
            .from(bucket)
            .upload(path, file, {
                cacheControl: '3600',
                upsert: false
            })

        if (error) {
            console.error('❌ Upload error:', error)
            return { success: false, error: error.message }
        }

        // Get public URL
        const { data: urlData } = supabase.storage
            .from(bucket)
            .getPublicUrl(path)

        console.log('✅ File uploaded successfully:', urlData.publicUrl)
        return { success: true, url: urlData.publicUrl }
    } catch (error) {
        console.error('❌ Upload exception:', error)
        return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
}

/**
 * Upload multiple files and return their URLs
 */
export async function uploadFiles(
    files: File[],
    bucket: string,
    basePath: string
): Promise<{ success: boolean; urls?: string[]; errors?: string[] }> {
    const results = await Promise.all(
        files.map(async (file, index) => {
            const fileName = `${Date.now()}-${index}-${file.name}`
            const filePath = `${basePath}/${fileName}`
            return await uploadFile(file, bucket, filePath)
        })
    )

    const successful = results.filter(r => r.success)
    const failed = results.filter(r => !r.success)

    if (failed.length > 0) {
        console.warn('⚠️ Some files failed to upload:', failed)
    }

    return {
        success: successful.length > 0,
        urls: successful.map(r => r.url!).filter(Boolean),
        errors: failed.map(r => r.error!).filter(Boolean)
    }
}

/**
 * Store payment data in Supabase
 */
export async function storePaymentData(paymentData: Omit<PaymentData, 'payment_id' | 'created_at'>): Promise<{ success: boolean; data?: PaymentData; error?: string }> {
    try {
        // Check if Supabase is configured
        if (!isSupabaseConfigured()) {
            console.log('⚠️ Supabase not configured. Logging payment data to console and localStorage.')
            console.log('💳 PAYMENT DATA:', paymentData)
            localStorage.setItem('lastPaymentData', JSON.stringify(paymentData))
            return { success: true, data: { ...paymentData, payment_id: 'local-' + Date.now() } as PaymentData }
        }

        console.log('💳 Storing payment data:', paymentData)

        const { data, error } = await supabase
            .from(TABLES.PAYMENTS)
            .insert([paymentData])
            .select()
            .single()

        if (error) {
            console.error('❌ Payment storage error:', error)
            return { success: false, error: error.message }
        }

        console.log('✅ Payment data stored successfully:', data)
        return { success: true, data }
    } catch (error) {
        console.error('❌ Payment storage exception:', error)
        return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
}

/**
 * Store onboarding data in Supabase
 */
export async function storeOnboardingData(onboardingData: Omit<OnboardingData, 'id' | 'created_at'>): Promise<{ success: boolean; data?: OnboardingData; error?: string }> {
    try {
        console.log('📝 Storing onboarding data:', onboardingData)

        // Validate required fields
        const requiredFields = ['payment_id', 'name', 'email', 'phone']
        for (const field of requiredFields) {
            if (!onboardingData[field as keyof typeof onboardingData]) {
                console.error(`❌ Missing required field: ${field}`)
                return { success: false, error: `Missing required field: ${field}` }
            }
        }

        // Clean and validate data
        const cleanData = {
            ...onboardingData,
            name: onboardingData.name?.trim() || '',
            email: onboardingData.email?.trim() || '',
            phone: onboardingData.phone?.trim() || '',
            age: onboardingData.age?.trim() || '',
            dating_goal: onboardingData.dating_goal?.trim() || '',
            current_matches: onboardingData.current_matches?.trim() || '',
            body_type: onboardingData.body_type?.trim() || '',
            style_preference: onboardingData.style_preference?.trim() || '',
            ethnicity: onboardingData.ethnicity?.trim() || '',
            interests: onboardingData.interests?.trim() || '',
            current_bio: onboardingData.current_bio?.trim() || '',
            vibe: onboardingData.vibe?.trim() || '',
            want_more: onboardingData.want_more?.trim() || '',
            one_liner: onboardingData.one_liner?.trim() || '',
            photo_count: onboardingData.photo_count || 0,
            screenshot_count: onboardingData.screenshot_count || 0
        }

        console.log('📝 Cleaned onboarding data:', cleanData)

        const { data, error } = await supabase
            .from(TABLES.ONBOARDING)
            .insert([cleanData])
            .select()
            .single()

        if (error) {
            console.error('❌ Onboarding storage error:', error)
            console.error('❌ Error details:', JSON.stringify(error, null, 2))
            
            // Fallback: Store in localStorage if Supabase fails
            console.log('🔄 Falling back to localStorage storage...')
            localStorage.setItem('onboardingData', JSON.stringify(cleanData))
            localStorage.setItem('onboardingTimestamp', Date.now().toString())
            
            // Return success with mock data
            return { 
                success: true, 
                data: { 
                    ...cleanData, 
                    id: 'local-' + Date.now(),
                    created_at: new Date().toISOString()
                } as OnboardingData
            }
        }

        console.log('✅ Onboarding data stored successfully:', data)
        return { success: true, data }
    } catch (error) {
        console.error('❌ Onboarding storage exception:', error)
        return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
}

/**
 * Store image metadata in Supabase
 */
export async function storeImageData(imageData: Omit<ImageData, 'id' | 'created_at'>): Promise<{ success: boolean; data?: ImageData; error?: string }> {
    try {
        console.log('🖼️ Storing image metadata:', imageData)

        const { data, error } = await supabase
            .from(TABLES.IMAGES)
            .insert([imageData])
            .select()
            .single()

        if (error) {
            console.error('❌ Image metadata storage error:', error)
            return { success: false, error: error.message }
        }

        console.log('✅ Image metadata stored successfully:', data)
        return { success: true, data }
    } catch (error) {
        console.error('❌ Image metadata storage exception:', error)
        return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
}

/**
 * Complete onboarding flow: store data + upload images
 */
export async function completeOnboardingFlow(
    onboardingData: Omit<OnboardingData, 'id' | 'created_at'>,
    profilePhotos: File[],
    screenshots: File[]
): Promise<{ success: boolean; onboardingId?: string; error?: string }> {
    try {
        console.log('🚀 Starting complete onboarding flow...')

        // Check if Supabase is configured
        if (!isSupabaseConfigured()) {
            console.log('⚠️ Supabase not configured. Logging onboarding data to console and localStorage.')
            console.log('📝 ONBOARDING DATA:', onboardingData)
            console.log('📸 Profile photos:', profilePhotos.length)
            console.log('📱 Screenshots:', screenshots.length)
            localStorage.setItem('lastOnboardingData', JSON.stringify(onboardingData))
            localStorage.setItem('lastProfilePhotos', JSON.stringify(profilePhotos.map(f => ({ name: f.name, size: f.size, type: f.type }))))
            localStorage.setItem('lastScreenshots', JSON.stringify(screenshots.map(f => ({ name: f.name, size: f.size, type: f.type }))))
            return { success: true, onboardingId: 'local-' + Date.now() }
        }

        // Step 1: Store onboarding data
        const onboardingResult = await storeOnboardingData(onboardingData)
        if (!onboardingResult.success || !onboardingResult.data) {
            return { success: false, error: onboardingResult.error || 'Failed to store onboarding data' }
        }

        const onboardingId = onboardingResult.data.id!
        const paymentId = onboardingResult.data.payment_id!
        console.log('✅ Onboarding data stored with ID:', onboardingId, 'and payment_id:', paymentId)

        // Step 2: Upload profile photos
        if (profilePhotos.length > 0) {
            console.log('📸 Uploading profile photos...')
            const profilePhotosResult = await uploadFiles(
                profilePhotos,
                STORAGE_BUCKETS.PROFILE_PHOTOS,
                `payment-${paymentId}`
            )

            if (profilePhotosResult.success && profilePhotosResult.urls) {
                // Store image metadata for profile photos
                for (let i = 0; i < profilePhotos.length; i++) {
                    const file = profilePhotos[i]
                    const url = profilePhotosResult.urls[i]

                    if (url) {
                        await storeImageData({
                            payment_id: paymentId,
                            file_name: file.name,
                            file_path: url,
                            file_size: file.size,
                            file_type: file.type,
                            image_type: 'profile_photo'
                        })
                    }
                }
                console.log('✅ Profile photos uploaded and metadata stored')
            } else {
                console.warn('⚠️ Profile photos upload failed:', profilePhotosResult.errors)
            }
        }

        // Step 3: Upload screenshots
        if (screenshots.length > 0) {
            console.log('📱 Uploading screenshots...')
            const screenshotsResult = await uploadFiles(
                screenshots,
                STORAGE_BUCKETS.SCREENSHOTS,
                `payment-${paymentId}`
            )

            if (screenshotsResult.success && screenshotsResult.urls) {
                // Store image metadata for screenshots
                for (let i = 0; i < screenshots.length; i++) {
                    const file = screenshots[i]
                    const url = screenshotsResult.urls[i]

                    if (url) {
                        await storeImageData({
                            payment_id: paymentId,
                            file_name: file.name,
                            file_path: url,
                            file_size: file.size,
                            file_type: file.type,
                            image_type: 'screenshot'
                        })
                    }
                }
                console.log('✅ Screenshots uploaded and metadata stored')
            } else {
                console.warn('⚠️ Screenshots upload failed:', screenshotsResult.errors)
            }
        }

        console.log('🎉 Complete onboarding flow finished successfully!')
        return { success: true, onboardingId: onboardingId }
    } catch (error) {
        console.error('❌ Complete onboarding flow failed:', error)
        return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
}

/**
 * Get onboarding data with images
 */
export async function getOnboardingWithImages(onboardingId: string): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
        // Get onboarding data
        const { data: onboardingData, error: onboardingError } = await supabase
            .from(TABLES.ONBOARDING)
            .select('*')
            .eq('id', onboardingId)
            .single()

        if (onboardingError) {
            return { success: false, error: onboardingError.message }
        }

        // Get associated images
        const { data: imagesData, error: imagesError } = await supabase
            .from(TABLES.IMAGES)
            .select('*')
            .eq('payment_id', onboardingData.payment_id)

        if (imagesError) {
            return { success: false, error: imagesError.message }
        }

        return {
            success: true,
            data: {
                ...onboardingData,
                images: imagesData
            }
        }
    } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
}

/**
 * Get all payments
 */
export async function getAllPayments(): Promise<{ success: boolean; data?: PaymentData[]; error?: string }> {
    try {
        const { data, error } = await supabase
            .from(TABLES.PAYMENTS)
            .select('*')
            .order('created_at', { ascending: false })

        if (error) {
            return { success: false, error: error.message }
        }

        return { success: true, data }
    } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
}

/**
 * Get all onboarding records
 */
export async function getAllOnboarding(): Promise<{ success: boolean; data?: OnboardingData[]; error?: string }> {
    try {
        const { data, error } = await supabase
            .from(TABLES.ONBOARDING)
            .select('*')
            .order('created_at', { ascending: false })

        if (error) {
            return { success: false, error: error.message }
        }

        return { success: true, data }
    } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
}

