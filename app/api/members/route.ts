import { NextResponse } from "next/server";
import { checkEmail, getAllMembers, RegisterMemberModel } from "./supabase.model";
import { sendWelcomeEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, phone, country } = await request.json();

    // Validate fields
    if (!firstName || !lastName || !email || !phone || !country) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email format" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if the email already exists in Supabase
    const existingCheck = await checkEmail(normalizedEmail);
    
    // If it's a Supabase error object (not an array)
    if (existingCheck && !Array.isArray(existingCheck)) {
      throw new Error((existingCheck as any).message || "Database query failed");
    }

    // Check if any matching member rows were found
    if (Array.isArray(existingCheck) && existingCheck.length > 0) {
      return NextResponse.json(
        { success: false, error: "This email is already registered as a member." },
        { status: 400 }
      );
    }

    // Store new member in Supabase
    const memberResult = await RegisterMemberModel(firstName, lastName, normalizedEmail, phone, country);

    if (memberResult && !Array.isArray(memberResult)) {
      throw new Error((memberResult as any).message || "Database registration failed");
    }

    console.log("[Members API] Successfully registered new member in DB:", normalizedEmail);

    // Send welcome email to user in background (non-blocking)
    try {
      await sendWelcomeEmail(normalizedEmail, firstName, lastName);
      console.log("[Members API] Successfully sent welcome email to:", normalizedEmail);
    } catch (emailErr) {
      // Log the error but do not fail the registration response
      console.error("[Members API Warning] Welcome email failed to send:", emailErr);
    }

    return NextResponse.json(
      { 
        success: true, 
        message: "Successfully registered as a member!",
        member: memberResult 
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error("[Members API Error]:", error);
    return NextResponse.json(
      { success: false, error: error.message || "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const data = await getAllMembers();
    
    if (data && !Array.isArray(data)) {
      throw new Error((data as any).message || "Failed to fetch members from database");
    }

    return NextResponse.json(
      { 
        success: true, 
        members: data 
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("[Members GET API Error]:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || "Failed to fetch members" 
      },
      { status: 500 }
    );
  }
}
