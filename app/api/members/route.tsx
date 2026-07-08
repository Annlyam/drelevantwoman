import { NextResponse } from "next/server";

export async function GET(request: Request) {
    return NextResponse.json({ message: "Hello World" });
}

export async function POST(request: Request) {
    const body = await request.json();
    const { firstName, lastName, email, phone, country } = body;

    if (!firstName || !lastName || !email || !phone || !country) {
        return NextResponse.json({ message: "All fields are required" });
    }
    try {
        const member = {
            firstName,
            lastName,
            email,
            phone,
            country,
        }
        console.log(member);
        return NextResponse.json({ message: `${firstName} ${lastName} has been added to the database`, member });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Something went wrong" });
    }
}
