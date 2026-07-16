import { brevo } from './client';

type Recipient = {
    email: string;
    name?: string;
}

type sendEmailOptions = {
    to: Recipient[];
    subject: string;
    htmlContent?: string;
    textContent?: string;
}

export async function sendEmail({
    to,
    subject,
    htmlContent,
    textContent,
}: sendEmailOptions) {
    return brevo.transactionalEmails.sendTransacEmail({
        sender: {
            name: "The Relevant Woman",
            email: process.env.EMAIL_FROM!,
        },
        to,
        subject,
        htmlContent,
        textContent
    });
}