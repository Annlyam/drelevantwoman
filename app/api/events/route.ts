import { NextRequest, NextResponse } from 'next/server';
import eventData from '@/lib/data/eventData.json';
export async function GET(request: NextRequest)  {
    try {
    const { searchParams } = new URL(request.url);
const status = searchParams.get('status');

const events = eventData
  .filter((event: any) => !event.hidden)
  .filter((event: any) => {
    if (status === 'upcoming' || status === 'past') {
      return event.status === status;
    }
    return true;
  });
return NextResponse.json ({success: true, events });
} catch (error) {
    console.error ('[Events Api Error]:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}
