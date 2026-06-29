import { NextRequest, NextResponse } from "next/server";
import eventData from '@/lib/data/eventData.json'
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();
    const { name, email, phone } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { success: false, error: 'name, email and phone are required' },
        { status: 400 }
      );
    }
    const event = eventData.find((e: any) => e.id === slug);

    if (!event) {
      return NextResponse.json(
        { success: false, error: 'Event not found' },
        { status: 404 }
      );
    }

    if (event.registered >= event.capacity) {
      return NextResponse.json(
        { success: false, error: 'This event is fully booked' },
        { status: 400 }
      );
    }

    // TODO: Implement duplicate registration check once database is connected
    // For now, this is a placeholder until Supabase/PostgreSQL is set up

    const confirmationNumber = `TRW-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    return NextResponse.json(
      {
        success: true,
        message: 'Registration successful!',
        confirmationNumber,
        event: {
          title: event.title,
          date: event.date,
          time: event.time,
        },
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('[Event Registration API Error]:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process registration' },
      { status: 500 }
    );
  }
}