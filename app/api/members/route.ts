import { NextResponse } from "next/server";
import { checkEmail, getAllMembers, RegisterMemberModel } from "./supabase.model";
import { sendWelcomeEmail } from "@/lib/brevo/welcome";

// Register member
export async function POST(request: Request) {
    try {
        const { firstName, lastName, email, phone, country } = await request.json();
        if (!firstName || !lastName || !email || !phone || !country) {
            return NextResponse.json({ message: "All fields are required" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({status: 400, message: "Invalid email format" })
        }

        const normalizedEmail = email.toLowerCase().trim();

        // SQL Query to check if email exist in the database
        const rows  = await checkEmail(normalizedEmail);
        const existingUser = rows;

        if (existingUser) {
        return NextResponse.json({ existingUser: true });
        }

        // SQL Query to store RegisterMember
        const member = await RegisterMemberModel(firstName, lastName, normalizedEmail, phone, country);
        
        // Send welcome email to newly registered members
        await sendWelcomeEmail(firstName, normalizedEmail)
        return NextResponse.json({status: 201,success: true, member: member});

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Something went wrong" });
    }
}

//Get all Registered members
export async function GET() {
    try {
        // SQL Query GetAllMember
        const data = await getAllMembers();
        return NextResponse.json({ status: 200, success: true, members: data});

    } catch (error) {
        return NextResponse.json({status: 500, success: false, message: "Failed to fetch members"}
        );
    }
}
