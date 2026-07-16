import { sendEmail } from "./sendEmail";
import { welcomeTemplate } from "@/emails/templates/welcome";

export async function sendWelcomeEmail(
    firstName: string,
    email: string
) {
    return sendEmail({
        to: [{ email }],
        subject: "Welcome to The Relevant Woman",
        htmlContent: welcomeTemplate(firstName),
    });
}