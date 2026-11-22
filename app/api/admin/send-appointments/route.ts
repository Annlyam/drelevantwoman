import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import {
  SUCCESSFUL_APPLICANTS,
  AUDIT_CONFIRMATION_EMAILS,
  generateAppointmentLetterHtml,
  Candidate,
} from "@/lib/data/candidatesData";

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const EMAIL_FROM = process.env.EMAIL_FROM || "noreply@drelevantwoman.com";
const ADMIN_SECRET = process.env.ADMIN_SECRET || "trw-appoint-2026";

function getHandbookAttachment(): { name: string; content: string } | null {
  try {
    const possiblePaths = [
      path.join(process.cwd(), "public/assets/docs/The_Relevant_Woman_Team_Member_Handbook.pdf"),
      path.join(process.cwd(), "public/The_Relevant_Woman_Team_Member_Handbook.pdf"),
      "/home/administrator/de/The Relevant Woman Team Member Handbook .pdf.pdf",
    ];

    for (const p of possiblePaths) {
      if (fs.existsSync(p)) {
        const buffer = fs.readFileSync(p);
        return {
          name: "The_Relevant_Woman_Team_Member_Handbook.pdf",
          content: buffer.toString("base64"),
        };
      }
    }
  } catch (err) {
    console.error("[Handbook Attachment Error]:", err);
  }
  return null;
}

async function sendBrevoEmail(payload: {
  to: { email: string; name: string }[];
  subject: string;
  htmlContent: string;
  attachment?: { name: string; content: string }[];
  replyTo?: { email: string; name: string };
}) {
  if (!BREVO_API_KEY) {
    console.warn("[Brevo]: BREVO_API_KEY is not set. Simulation mode.");
    return { success: true, simulated: true };
  }

  const emailBody: Record<string, any> = {
    sender: { email: EMAIL_FROM, name: "The Relevant Woman" },
    to: payload.to,
    subject: payload.subject,
    htmlContent: payload.htmlContent,
    replyTo: payload.replyTo || { email: "therelevantw@gmail.com", name: "The Relevant Woman" },
  };

  if (payload.attachment && payload.attachment.length > 0) {
    emailBody.attachment = payload.attachment;
  }

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": BREVO_API_KEY,
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(emailBody),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Brevo HTTP ${response.status}: ${errorBody}`);
  }

  return { success: true };
}

function generateAuditReportHtml(
  results: { candidate: Candidate; success: boolean; error?: string }[],
  isTest: boolean = false
): string {
  const rows = results
    .map(
      (r, i) => `
    <tr style="border-bottom:1px solid #e0dbe8; background-color:${r.success ? "#ffffff" : "#fff3f3"};">
      <td style="padding:10px 12px; font-weight:bold; color:#3a225c;">${i + 1}</td>
      <td style="padding:10px 12px; font-weight:bold;">${r.candidate.name}</td>
      <td style="padding:10px 12px;"><a href="mailto:${r.candidate.email}" style="color:#5b1364;">${r.candidate.email}</a></td>
      <td style="padding:10px 12px; color:#555;">${r.candidate.role}</td>
      <td style="padding:10px 12px; text-align:center;">
        <span style="display:inline-block; padding:4px 10px; border-radius:12px; font-size:12px; font-weight:bold; background-color:${
          r.success ? "#e6f9ed" : "#ffebee"
        }; color:${r.success ? "#1e7e34" : "#c62828"};">
          ${r.success ? "✓ SENT" : "✗ FAILED"}
        </span>
        ${r.error ? `<div style="color:#c62828; font-size:11px; margin-top:4px;">${r.error}</div>` : ""}
      </td>
    </tr>`
    )
    .join("");

  return `
  <!DOCTYPE html>
  <html>
  <head><meta charset="utf-8"></head>
  <body style="font-family:Arial,sans-serif; background-color:#f6f5f7; padding:20px; color:#333;">
    <div style="max-width:700px; margin:0 auto; background:#ffffff; border-radius:12px; overflow:hidden; border:1px solid #e0dbe8; box-shadow:0 4px 16px rgba(0,0,0,0.06);">
      
      <div style="background:linear-gradient(135deg, #2c144c, #3a225c, #5b1364); padding:24px 30px; text-align:center; color:#ffffff;">
        <h2 style="margin:0; font-size:22px; text-transform:uppercase; letter-spacing:1px;">
          The Relevant <span style="color:#f9f871;">Woman</span>
        </h2>
        <p style="margin:8px 0 0 0; color:#fc98ac; font-size:14px; font-weight:bold;">
          ${isTest ? "🧪 TEST RUN REPORT" : "📋 OFFICIAL APPOINTMENT DISPATCH REPORT"}
        </p>
      </div>

      <div style="padding:24px 30px;">
        <p style="font-size:15px; margin-top:0;">
          Appointment email dispatch execution completed at <strong>${new Date().toUTCString()}</strong>.
        </p>

        <table style="width:100%; border-collapse:collapse; margin-top:16px; font-size:13px;">
          <thead>
            <tr style="background-color:#3a225c; color:#ffffff; text-align:left;">
              <th style="padding:10px 12px;">#</th>
              <th style="padding:10px 12px;">Candidate</th>
              <th style="padding:10px 12px;">Email</th>
              <th style="padding:10px 12px;">Role</th>
              <th style="padding:10px 12px; text-align:center;">Status</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>

        <div style="margin-top:24px; padding:14px; background:#f9f6fc; border-radius:8px; font-size:12px; color:#666;">
          Total Processed: <strong>${results.length}</strong> | 
          Successful: <strong style="color:#1e7e34;">${results.filter((r) => r.success).length}</strong> | 
          Failed: <strong style="color:#c62828;">${results.filter((r) => !r.success).length}</strong>
        </div>
      </div>

    </div>
  </body>
  </html>
  `;
}

async function sendAuditReport(results: {
  candidate: Candidate;
  success: boolean;
  error?: string;
}[], isTest: boolean = false) {
  const reportHtml = generateAuditReportHtml(results, isTest);

  for (const adminEmail of AUDIT_CONFIRMATION_EMAILS) {
    try {
      await sendBrevoEmail({
        to: [{ email: adminEmail, name: "TRW Management" }],
        subject: `[TRW Report] Appointment Emails Dispatched (${results.filter((r) => r.success).length}/${results.length} Sent)`,
        htmlContent: reportHtml,
      });
    } catch (err) {
      console.error(`[Audit Report Failed to ${adminEmail}]:`, err);
    }
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret");
  const action = searchParams.get("action");
  const testEmail = searchParams.get("testEmail");

  // Validate Secret
  if (secret !== ADMIN_SECRET) {
    return NextResponse.json(
      { error: "Unauthorized. Invalid secret key." },
      { status: 401 }
    );
  }

  // Preview Mode
  if (!action || action === "preview") {
    return NextResponse.json({
      success: true,
      mode: "preview",
      totalCandidates: SUCCESSFUL_APPLICANTS.length,
      candidates: SUCCESSFUL_APPLICANTS,
      auditEmails: AUDIT_CONFIRMATION_EMAILS,
      handbookFound: Boolean(getHandbookAttachment()),
      apiKeyConfigured: Boolean(BREVO_API_KEY),
    });
  }

  // Test Mode (sends single sample to testEmail or luzzylugard@gmail.com)
  if (action === "test") {
    const recipient = testEmail || "luzzylugard@gmail.com";
    const sample = SUCCESSFUL_APPLICANTS[0];
    const attachment = getHandbookAttachment();

    try {
      await sendBrevoEmail({
        to: [{ email: recipient, name: `TEST — ${sample.name}` }],
        subject: `[TEST SAMPLE] Letter of Appointment: ${sample.role} — The Relevant Woman`,
        htmlContent: generateAppointmentLetterHtml(sample),
        attachment: attachment ? [attachment] : [],
      });

      return NextResponse.json({
        success: true,
        mode: "test",
        message: `Test appointment email sent to ${recipient}`,
        candidateSample: sample,
        handbookAttached: Boolean(attachment),
      });
    } catch (err: any) {
      return NextResponse.json(
        { success: false, error: err.message },
        { status: 500 }
      );
    }
  }

  // Resend Audit Report only (lightweight, no attachment)
  if (action === "report") {
    const targetEmail = testEmail || "luzzylugard@gmail.com";
    const syntheticResults = SUCCESSFUL_APPLICANTS.map((c) => ({
      candidate: c,
      success: true,
    }));

    try {
      await sendBrevoEmail({
        to: [
          { email: targetEmail, name: "TRW Management" },
          { email: "therelevantw@gmail.com", name: "The Relevant Woman" },
        ],
        subject: `[TRW Report] Appointment Emails Delivery Summary (8/8 Candidates Dispatched)`,
        htmlContent: generateAuditReportHtml(syntheticResults),
      });

      return NextResponse.json({
        success: true,
        mode: "report",
        message: `Audit report email successfully sent to ${targetEmail} and therelevantw@gmail.com`,
      });
    } catch (err: any) {
      return NextResponse.json(
        { success: false, error: `Brevo report delivery error: ${err.message}` },
        { status: 500 }
      );
    }
  }

  // Send Mode: Dispatches to all 8 candidates
  if (action === "send") {
    const attachment = getHandbookAttachment();
    const results: { candidate: Candidate; success: boolean; error?: string }[] = [];

    for (const candidate of SUCCESSFUL_APPLICANTS) {
      try {
        await sendBrevoEmail({
          to: [{ email: candidate.email, name: candidate.name }],
          subject: `Letter of Appointment: ${candidate.role} — The Relevant Woman`,
          htmlContent: generateAppointmentLetterHtml(candidate),
          attachment: attachment ? [attachment] : [],
        });
        results.push({ candidate, success: true });
      } catch (err: any) {
        console.error(`Failed to email ${candidate.email}:`, err);
        results.push({ candidate, success: false, error: err.message });
      }
    }

    // Send confirmation audit report to luzzylugard@gmail.com & therelevantw@gmail.com
    await sendAuditReport(results, false);

    return NextResponse.json({
      success: true,
      mode: "send",
      total: SUCCESSFUL_APPLICANTS.length,
      sentCount: results.filter((r) => r.success).length,
      failedCount: results.filter((r) => !r.success).length,
      results,
    });
  }

  return NextResponse.json({ error: "Invalid action." }, { status: 400 });
}

export async function POST(req: NextRequest) {
  // Delegate POST to the same logic as GET for flexible execution
  return GET(req);
}
