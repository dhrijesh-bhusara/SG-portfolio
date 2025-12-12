import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getServerSupabase, isSupabaseConfigured } from '@/lib/supabaseClient';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  phone: z.string().optional(),
  projectType: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validatedData = contactSchema.parse(body);

    // If Supabase is configured, store in database
    if (isSupabaseConfigured()) {
      const supabase = getServerSupabase();
      if (supabase) {
        const { error } = await supabase.from('contacts').insert([
          {
            name: validatedData.name,
            email: validatedData.email,
            message: validatedData.message,
            phone: validatedData.phone,
            project_type: validatedData.projectType,
            created_at: new Date().toISOString(),
          },
        ]);

        if (error) {
          console.error('Supabase insert error:', error);
          // Continue anyway - don't fail on database error
        }
      }
    } else {
      // Mock mode - log to console
      console.log('Contact form submission (mock mode):', validatedData);
    }

    // Optional: Send email notification if EMAIL_API_KEY is configured
    if (process.env.EMAIL_API_KEY) {
      try {
        // Example: Send email via service (implementation depends on email provider)
        await sendEmailNotification(validatedData);
      } catch (emailError) {
        console.error('Email notification error:', emailError);
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json(
      { success: true, message: 'Thank you for your message!' },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.errors },
        { status: 400 }
      );
    }

    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred. Please try again.' },
      { status: 500 }
    );
  }
}

// Placeholder for email notification - implement based on your email service
async function sendEmailNotification(data: {
  name: string;
  email: string;
  message: string;
}) {
  // Example: Use SendGrid, Resend, or other email service
  // const response = await fetch('https://api.emailservice.com/send', {
  //   method: 'POST',
  //   headers: {
  //     'Authorization': `Bearer ${process.env.EMAIL_API_KEY}`,
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     from: process.env.EMAIL_FROM,
  //     to: process.env.EMAIL_TO,
  //     subject: `New contact from ${data.name}`,
  //     text: `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`,
  //   }),
  // });

  console.log('Email notification sent (placeholder):', data);
}
