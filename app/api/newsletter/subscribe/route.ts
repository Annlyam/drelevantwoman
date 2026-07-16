import { NextRequest, NextResponse } from 'next/server';
import { subscribeToNewsletter } from '@/lib/email';

/**
 * Newsletter Subscription API Endpoint using Brevo
 */
export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email existence
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    console.log('[Newsletter] Attempting subscription for:', email);

    // Call Brevo subscription service
    await subscribeToNewsletter(email);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully subscribed to our newsletter! 💜' 
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('[Newsletter API Error]:', error);
    
    // Check if it's already registered or has another specific error message
    const errorMessage = error.message || '';
    if (errorMessage.toLowerCase().includes('already exist') || errorMessage.toLowerCase().includes('duplicate')) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'This email is already subscribed to our newsletter!' 
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        error: 'An error occurred while processing your subscription. Please try again later.' 
      },
      { status: 500 }
    );
  }
}
