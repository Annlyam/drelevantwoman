import { NextRequest, NextResponse } from "next/server";
import { subscribeToNewsletter } from "@/lib/email";

const BREVO_API_KEY = process.env.BREVO_API_KEY!;
const EMAIL_FROM = process.env.EMAIL_FROM || "noreply@drelevantwoman.com";

async function sendEventConfirmationEmail(
  email: string,
  firstName: string,
  event: {
    title: string;
    date: string;
    time: string;
    endTime?: string;
    zoomLink?: string;
    venue?: string;
  }
) {
  if (!BREVO_API_KEY) return;

  // Format date nicely
  const eventDate = event.date
    ? new Date(event.date + "T00:00:00").toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "TBA";

  const formatTime = (t?: string) => {
    if (!t) return "";
    const [h, m] = t.split(":");
    const hour = parseInt(h);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${m} ${ampm}`;
  };

  const timeDisplay = event.time
    ? `${formatTime(event.time)}${event.endTime ? " – " + formatTime(event.endTime) : ""}`
    : "TBA";

  const zoomSection = event.zoomLink
    ? `
    <div style="text-align:center; margin: 28px 0;">
      <a href="${event.zoomLink}" style="display:inline-block; background-color:#f9f871; color:#3a225c; text-decoration:none; padding:14px 32px; border-radius:8px; font-weight:bold; font-size:16px;">
        🎥 Join via Zoom
      </a>
    </div>
    <p style="text-align:center; color:rgba(255,255,255,0.6); font-size:13px; margin-top:-12px;">
      Or copy link: <a href="${event.zoomLink}" style="color:#fc98ac;">${event.zoomLink}</a>
    </p>`
    : event.venue
    ? `<p style="color:#e5e0eb;"><strong style="color:#f9f871;">📍 Venue:</strong> ${event.venue}</p>`
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
              Your spot has been successfully reserved for the upcoming event. We can't wait to see you there!
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
              ${zoomSection}
            </div>

            <!-- Community Links -->
            <div style="background:rgba(249,248,113,0.07); border:1px solid rgba(249,248,113,0.2); border-radius:12px; padding:24px; margin-bottom:24px;">
              <h2 style="color:#f9f871; font-size:16px; margin:0 0 14px 0;">🌍 Join Our Community</h2>
              <p style="color:#e5e0eb; font-size:14px; margin:0 0 14px 0;">Stay connected with our community across all platforms:</p>
              <div>
                <a href="https://chat.whatsapp.com/HCZm9H60ZFXLWKcwz1TXRJ" style="display:inline-block; margin:5px 5px 5px 0; background:#25D366; color:#fff; padding:8px 16px; border-radius:6px; text-decoration:none; font-size:13px; font-weight:bold;">💬 WhatsApp Group</a>
                <a href="https://t.me/TheRelevantWoman" style="display:inline-block; margin:5px 5px 5px 0; background:#0088CC; color:#fff; padding:8px 16px; border-radius:6px; text-decoration:none; font-size:13px; font-weight:bold;">✈️ Telegram</a>
                <a href="https://www.instagram.com/the_relevantwoman" style="display:inline-block; margin:5px 5px 5px 0; background:linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888); color:#fff; padding:8px 16px; border-radius:6px; text-decoration:none; font-size:13px; font-weight:bold;">📸 Instagram</a>
                <a href="https://www.facebook.com/share/188LaQRkQK/" style="display:inline-block; margin:5px 5px 5px 0; background:#1877F2; color:#fff; padding:8px 16px; border-radius:6px; text-decoration:none; font-size:13px; font-weight:bold;">👍 Facebook</a>
              </div>
            </div>

            <p style="color:#e5e0eb; font-size:14px;">
              If you have any questions before the event, feel free to reach out to us at
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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, country, age, eventId, eventTitle, eventDate, eventTime, eventEndTime, eventZoomLink, eventVenue } = body;

    if (!firstName || !lastName || !email || !phone || !country || !age) {
      return NextResponse.json({ success: false, error: "All fields are required." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, error: "Invalid email format." }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // 1. Add to Brevo newsletter list
    try {
      await subscribeToNewsletter(normalizedEmail);
    } catch (subErr) {
      console.error("[Event Register] Newsletter subscribe failed (non-fatal):", subErr);
    }

    // 2. Send confirmation email
    try {
      await sendEventConfirmationEmail(normalizedEmail, firstName, {
        title: eventTitle || "Event",
        date: eventDate || "",
        time: eventTime || "",
        endTime: eventEndTime,
        zoomLink: eventZoomLink,
        venue: eventVenue,
      });
    } catch (emailErr) {
      console.error("[Event Register] Confirmation email failed (non-fatal):", emailErr);
    }

    return NextResponse.json(
      { success: true, message: "Registration successful! Check your email for details." },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[Event Register API Error]:", error);
    return NextResponse.json({ success: false, error: "An error occurred. Please try again." }, { status: 500 });
  }
}
