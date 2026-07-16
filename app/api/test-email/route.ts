import { NextResponse } from "next/server";
import { brevo } from "@/lib/brevo/client";


export async function GET() {
    try {
        const response = await brevo.transactionalEmails.sendTransacEmail({
            sender: {
                name: "The Relevant woman",
                email: process.env.EMAIL_FROM!,
            },
            to: [
                {
                    email: "olatunjirauf081@gmail.com",
                },
            ],
            subject: "Brevo Test",
            textContent: "if you're reading this, Brevo is working!"
        });
       
        return NextResponse.json({
            success: true,
            response
        });

    } catch(error) {
        console.error(error);

        return NextResponse.json(
        {
            success: false,
            error
        },
        {
            status: 500,
        });
    }
}