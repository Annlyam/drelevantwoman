import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { firstName, email, phone, subject, message } = await request.json();
         if (!firstName || !email || !phone || !subject || message) {
            return NextResponse.json({ message: "All fields are required" });
        }

    } catch(error) {
        return NextResponse.json(
        { success: false, error: 'Failed to fetch events' },
        { status: 500 }
        );
    }
}