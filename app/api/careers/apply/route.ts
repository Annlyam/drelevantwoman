import { NextRequest, NextResponse } from "next/server";

const BREVO_API_KEY = process.env.BREVO_API_KEY!;
const EMAIL_FROM = process.env.EMAIL_FROM || "noreply@drelevantwoman.com";
const TARGET_EMAIL = "therelevantw@gmail.com"; // Based on the flyer

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const country = formData.get("country") as string;
    const role = formData.get("role") as string;
    const portfolio = formData.get("portfolio") as string;
    const resumeFile = formData.get("resume") as File;
    const coverLetterFile = formData.get("coverLetter") as File;

    if (!fullName || !email || !phone || !country || !role || !resumeFile || !coverLetterFile) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    // Convert the Files to Base64 strings for Brevo attachments
    const resumeBuffer = await resumeFile.arrayBuffer();
    const resumeBase64 = Buffer.from(resumeBuffer).toString("base64");
    
    const coverLetterBuffer = await coverLetterFile.arrayBuffer();
    const coverLetterBase64 = Buffer.from(coverLetterBuffer).toString("base64");

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-w-600px; color: #333;">
        <h2 style="color: #3a225c; border-bottom: 2px solid #fc98ac; padding-bottom: 8px;">New Job Application Received</h2>
        <p><strong>Applicant Name:</strong> ${fullName}</p>
        <p><strong>Email Address:</strong> ${email}</p>
        <p><strong>Phone Number:</strong> ${phone}</p>
        <p><strong>Country:</strong> ${country}</p>
        <p><strong>Applying For:</strong> ${role}</p>
        ${portfolio ? `<p><strong>Portfolio/LinkedIn:</strong> <a href="${portfolio}">${portfolio}</a></p>` : ''}
        
        <p style="margin-top: 24px; font-size: 14px; color: #666;"><em>The applicant's CV and Cover Letter are attached to this email.</em></p>
      </div>
    `;

    // Send email using Brevo
    if (BREVO_API_KEY) {
      const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "api-key": BREVO_API_KEY,
          "content-type": "application/json",
          "accept": "application/json",
        },
        body: JSON.stringify({
          sender: { email: EMAIL_FROM, name: "TRW Careers Website" },
          to: [{ email: TARGET_EMAIL, name: "The Relevant Woman HR" }],
          subject: `New Application: ${role} - ${fullName}`,
          htmlContent: emailHtml,
          replyTo: { email: email, name: fullName },
          attachment: [
            {
              name: resumeFile.name,
              content: resumeBase64
            },
            {
              name: coverLetterFile.name,
              content: coverLetterBase64
            }
          ]
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Brevo API error:", errorText);
        return NextResponse.json({ error: "Failed to send email to HR." }, { status: 500 });
      }
    } else {
      console.warn("No BREVO_API_KEY found, skipping email send.");
      // If we don't have the key in dev, we can still return success to test the frontend
    }

    return NextResponse.json({ success: true, message: "Application submitted." }, { status: 200 });

  } catch (error) {
    console.error("Error processing application:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your application." },
      { status: 500 }
    );
  }
}
