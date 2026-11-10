import { NextRequest, NextResponse } from "next/server";
import { subscribeToNewsletter } from "@/lib/email";

const BREVO_API_KEY = process.env.BREVO_API_KEY!;
const EMAIL_FROM = process.env.EMAIL_FROM || "noreply@drelevantwoman.com";
const ORG_EMAIL = process.env.ADMIN_EMAIL || "therelevantw@gmail.com";

/** Send a confirmation email to the registrant */
async function sendConfirmationEmail(
  email: string,
  firstName: string,
  event: {
    title: string;
    date: string;
    time?: string;
    endTime?: string;
    venue?: string;
    whatsappGroup?: string;
  }
) {
  if (!BREVO_API_KEY) return;

  const eventDate = event.date || "TBA";

  const formatTime = (t?: string) => {
    if (!t) return "";
    const [h, m] = t.split(":");
    const hour = parseInt(h);
    const ampm = hour >= 12 ? "PM" : "AM";
    return `${hour % 12 || 12}:${m} ${ampm}`;
  };

  const timeDisplay = event.time
    ? `${formatTime(event.time)}${event.endTime ? " – " + formatTime(event.endTime) : ""}`
    : "TBA";

  const whatsappSection = event.whatsappGroup
    ? `
    <div style="text-align:center; margin: 28px 0; padding: 24px; background: rgba(37,211,102,0.1); border: 1px solid rgba(37,211,102,0.3); border-radius: 12px;">
      <p style="color:#fff; font-size:16px; font-weight:bold; margin:0 0 8px 0;">📱 Join Our WhatsApp Group</p>
      <p style="color:rgba(255,255,255,0.7); font-size:14px; margin:0 0 16px 0;">Stay updated with event details, reminders and connect with fellow attendees.</p>
      <a href="${event.whatsappGroup}" style="display:inline-block; background-color:#25D366; color:#fff; text-decoration:none; padding:12px 28px; border-radius:8px; font-weight:bold; font-size:15px;">
        💬 Join WhatsApp Group →
      </a>
    </div>`
    : "";

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>You're Registered – ${event.title}</title>
    </head>
    <body style="margin:0; padding:0; background-color:#f6f5f7; font-family:Arial,sans-serif;">
      <div style="width:100%; background-color:#f6f5f7; padding:40px 20px; box-sizing:border-box;">
        <div style="max-width:600px; margin:0 auto; background-color:#3a225c; border-radius:16px; overflow:hidden; border:2px solid #fc98ac; box-shadow:0 4px 20px rgba(0,0,0,0.15);">

          <!-- Header -->
          <div style="padding:40px 20px; text-align:center; background:linear-gradient(135deg,#2c144c,#3a225c,#5b1364); border-bottom:1px solid rgba(255,255,255,0.1);">
            <div style="font-size:22px; font-weight:bold; color:#fff; letter-spacing:1px; text-transform:uppercase;">
              The Relevant <span style="color:#f9f871;">Woman</span>
            </div>
            <div style="margin-top:16px; display:inline-block; background-color:#f9f871; color:#3a225c; padding:6px 18px; border-radius:20px; font-size:13px; font-weight:bold;">
              🎉 You're Registered!
            </div>
          </div>

          <!-- Body -->
          <div style="padding:36px 32px; color:#fff; line-height:1.7;">
            <h1 style="color:#f9f871; font-size:22px; margin-top:0; margin-bottom:6px;">
              Hello, ${firstName}! 👋
            </h1>
            <p style="color:#e5e0eb; font-size:15px; margin-bottom:24px;">
              Your spot has been successfully reserved. We can't wait to see you there!
            </p>

            <!-- Event Details Card -->
            <div style="background:rgba(255,255,255,0.07); border:1px solid rgba(252,152,172,0.3); border-radius:12px; padding:24px; margin-bottom:24px;">
              <h2 style="color:#fc98ac; font-size:18px; margin:0 0 16px 0;">📅 Event Details</h2>
              <p style="color:#e5e0eb; margin:0 0 10px 0; font-size:15px;">
                <strong style="color:#f9f871;">Event:</strong> ${event.title}
              </p>
              <p style="color:#e5e0eb; margin:0 0 10px 0; font-size:15px;">
                <strong style="color:#f9f871;">Date:</strong> ${eventDate}
              </p>
              <p style="color:#e5e0eb; margin:0 0 10px 0; font-size:15px;">
                <strong style="color:#f9f871;">Time:</strong> ${timeDisplay}
              </p>
              ${event.venue ? `<p style="color:#e5e0eb; margin:0 0 10px 0; font-size:15px;"><strong style="color:#f9f871;">📍 Venue:</strong> ${event.venue}</p>` : ""}
            </div>

            ${whatsappSection}

            <!-- Community Links -->
            <div style="background:rgba(249,248,113,0.07); border:1px solid rgba(249,248,113,0.2); border-radius:12px; padding:24px; margin-bottom:24px;">
              <h2 style="color:#f9f871; font-size:16px; margin:0 0 14px 0;">🌍 Join Our Community</h2>
              <p style="color:#e5e0eb; font-size:14px; margin:0 0 14px 0;">Stay connected with our community across all platforms:</p>
              <div>
                <a href="https://t.me/TheRelevantWoman" style="display:inline-block; margin:5px 5px 5px 0; background:#0088CC; color:#fff; padding:8px 16px; border-radius:6px; text-decoration:none; font-size:13px; font-weight:bold;">✈️ Telegram</a>
                <a href="https://www.instagram.com/the_relevantwoman" style="display:inline-block; margin:5px 5px 5px 0; background:linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888); color:#fff; padding:8px 16px; border-radius:6px; text-decoration:none; font-size:13px; font-weight:bold;">📸 Instagram</a>
                <a href="https://www.facebook.com/share/188LaQRkQK/" style="display:inline-block; margin:5px 5px 5px 0; background:#1877F2; color:#fff; padding:8px 16px; border-radius:6px; text-decoration:none; font-size:13px; font-weight:bold;">👍 Facebook</a>
              </div>
            </div>

            <p style="color:#e5e0eb; font-size:14px;">
              If you have any questions, reach out at
              <a href="mailto:therelevantw@gmail.com" style="color:#fc98ac;">therelevantw@gmail.com</a>
              or call <a href="tel:+2348123553150" style="color:#fc98ac;">+234 812 355 3150</a>.
            </p>
            <p style="color:#e5e0eb; font-size:15px; margin-top:24px;">
              With love & empowerment,<br>
              <strong>The Relevant Woman Team 💜</strong>
            </p>
          </div>

          <!-- Footer -->
          <div style="padding:24px 32px; text-align:center; background:#2c144c; border-top:1px solid rgba(255,255,255,0.1);">
            <p style="color:rgba(255,255,255,0.5); font-size:12px; margin:0 0 8px 0;">
              © ${new Date().getFullYear()} The Relevant Woman. All rights reserved.
            </p>
            <p style="color:rgba(255,255,255,0.5); font-size:12px; margin:0;">
              <a href="mailto:therelevantw@gmail.com" style="color:#fc98ac;">therelevantw@gmail.com</a> | +234 812 355 3150
            </p>
          </div>

        </div>
      </div>
    </body>
    </html>
  `;

  await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": BREVO_API_KEY,
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      sender: { name: "The Relevant Woman", email: EMAIL_FROM },
      to: [{ email, name: firstName }],
      subject: `You're Registered: ${event.title} 🎉`,
      htmlContent,
    }),
  });
}

/** Send registration details to the organisation */
async function sendOrgNotificationEmail(
  eventTitle: string,
  fields: Record<string, string>
) {
  if (!BREVO_API_KEY) return;

  const rows = Object.entries(fields)
    .map(
      ([key, val]) =>
        `<tr><td style="padding:8px 12px; color:#f9f871; font-weight:bold; white-space:nowrap; vertical-align:top;">${key}</td><td style="padding:8px 12px; color:#e5e0eb;">${val || "—"}</td></tr>`
    )
    .join("");

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="margin:0;padding:0;background:#f6f5f7;font-family:Arial,sans-serif;">
      <div style="max-width:600px;margin:40px auto;background:#3a225c;border-radius:16px;overflow:hidden;border:2px solid #fc98ac;">
        <div style="padding:28px 32px;background:linear-gradient(135deg,#2c144c,#3a225c);border-bottom:1px solid rgba(255,255,255,0.1);">
          <div style="font-size:18px;font-weight:bold;color:#fff;">🎟 New Registration — <span style="color:#f9f871;">${eventTitle}</span></div>
        </div>
        <div style="padding:28px 32px;">
          <table style="width:100%;border-collapse:collapse;background:rgba(255,255,255,0.05);border-radius:10px;overflow:hidden;">
            ${rows}
          </table>
        </div>
        <div style="padding:16px 32px;text-align:center;background:#2c144c;border-top:1px solid rgba(255,255,255,0.1);">
          <p style="color:rgba(255,255,255,0.5);font-size:12px;margin:0;">© ${new Date().getFullYear()} The Relevant Woman</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": BREVO_API_KEY,
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      sender: { name: "TRW Registration System", email: EMAIL_FROM },
      to: [{ email: ORG_EMAIL, name: "The Relevant Woman" }],
      subject: `New Registration: ${eventTitle}`,
      htmlContent,
    }),
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { formType, eventTitle } = body;

    if (formType === "founders-table") {
      /* ---- Founder's Table registration ---- */
      const { name, sex, email, country, state, whatYouDo, expectations, category, eventDate, eventTime, eventEndTime, eventVenue } = body;

      if (!name || !sex || !email || !country || !state || !whatYouDo || !expectations || !category) {
        return NextResponse.json({ success: false, error: "All fields are required." }, { status: 400 });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json({ success: false, error: "Invalid email format." }, { status: 400 });
      }

      const normalizedEmail = email.toLowerCase().trim();

      // 1. Newsletter subscription (non-fatal)
      try { await subscribeToNewsletter(normalizedEmail); } catch {}

      // 2. Confirmation email to registrant
      try {
        await sendConfirmationEmail(normalizedEmail, name.split(" ")[0] || name, {
          title: eventTitle || "The Founder's Table",
          date: eventDate || "26th - 27th November 2026",
          time: eventTime,
          endTime: eventEndTime,
          venue: eventVenue,
          whatsappGroup: "https://chat.whatsapp.com/DN7hdkN33rgE9TU2P7g63N?s=cl&p=i&mlu=4&ilr=4&iam=2",
        });
      } catch (err) {
        console.error("[Event Register] Confirmation email failed:", err);
      }

      // 3. Notify the organisation
      try {
        await sendOrgNotificationEmail(eventTitle || "The Founder's Table", {
          "Full Name": name,
          "Sex": sex,
          "Email": normalizedEmail,
          "Country": country,
          "State": state,
          "What They Do": whatYouDo,
          "Expectations": expectations,
          "Category": category,
          "Event Date": eventDate || "26th - 27th November 2026",
        });
      } catch (err) {
        console.error("[Event Register] Org notification email failed:", err);
      }

      return NextResponse.json(
        { success: true, message: "Registration successful! Check your email for details." },
        { status: 200 }
      );

    } else {
      /* ---- Generic event registration ---- */
      const { firstName, lastName, email, country, eventDate, eventTime, eventEndTime, eventVenue } = body;

      if (!firstName || !lastName || !email || !country) {
        return NextResponse.json({ success: false, error: "All fields are required." }, { status: 400 });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json({ success: false, error: "Invalid email format." }, { status: 400 });
      }

      const normalizedEmail = email.toLowerCase().trim();

      // 1. Newsletter subscription (non-fatal)
      try { await subscribeToNewsletter(normalizedEmail); } catch {}

      // 2. Confirmation email to registrant
      try {
        await sendConfirmationEmail(normalizedEmail, firstName, {
          title: eventTitle || "Event",
          date: eventDate || "",
          time: eventTime,
          endTime: eventEndTime,
          venue: eventVenue,
        });
      } catch (err) {
        console.error("[Event Register] Confirmation email failed:", err);
      }

      // 3. Notify the organisation
      try {
        await sendOrgNotificationEmail(eventTitle || "Event", {
          "First Name": firstName,
          "Last Name": lastName,
          "Email": normalizedEmail,
          "Country": country,
          "Event Date": eventDate || "",
        });
      } catch (err) {
        console.error("[Event Register] Org notification email failed:", err);
      }

      return NextResponse.json(
        { success: true, message: "Registration successful! Check your email for details." },
        { status: 200 }
      );
    }

  } catch (error: any) {
    console.error("[Event Register API Error]:", error);
    return NextResponse.json({ success: false, error: "An error occurred. Please try again." }, { status: 500 });
  }
}
