import { NextResponse } from "next/server";
import { checkEmail, memberModel } from "./model";


export async function GET(request: Request) {
    return NextResponse.json({ message: "Hello World" });
}

export async function POST(request: Request) {
    try {
        const { firstName, lastName, email, phone, country } = await request.json();
        if (!firstName || !lastName || !email || !phone || !country) {
            return NextResponse.json({ message: "All fields are required" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({message: "Invalid email format" }, { status: 400 })
        }

        const normalizedEmail = email.toLowerCase().trim();
        const rows  = await checkEmail(normalizedEmail);
        const existingUser = rows;   
        console.log(`This is the existing user => ...${existingUser}`);
        
        if (existingUser) {
        return NextResponse.json({ existingUser: true });
        }

        // SQL Query to store member
        const member = await memberModel(firstName,lastName,normalizedEmail,phone,country);
        return NextResponse.json({status: 201,success: true, member: member});

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Something went wrong" });
    }
}
