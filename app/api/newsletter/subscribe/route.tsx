import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json();
    const { email } = body;
    if (!email) {
        return NextResponse.json({ message: "Email is required" });
    }
    try {
        const newsletter = {
            email,
        }
        return NextResponse.json({ message: `${email} has been added to the newsletter` });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Something went wrong" });
    }
}