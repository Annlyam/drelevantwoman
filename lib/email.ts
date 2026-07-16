/**
 * Email & Subscription Service using Brevo (formerly Sendinblue)
 */

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_NEWSLETTER_LIST_ID = process.env.BREVO_NEWSLETTER_LIST_ID;
const EMAIL_FROM = process.env.EMAIL_FROM || "noreply@drelevantwoman.com";

/**
 * Subscribes an email to the Brevo newsletter list.
 */
export async function subscribeToNewsletter(email: string) {
  if (!BREVO_API_KEY) {
    console.warn("[Brevo Warning]: BREVO_API_KEY is not configured.");
    return { success: true, message: "Mock subscription successful (API Key missing)." };
  }

  const listId = parseInt(BREVO_NEWSLETTER_LIST_ID || "1", 10);

  try {
    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": BREVO_API_KEY,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        updateEnabled: true,
        listIds: [listId],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      // If the email is already in the list or has another error
      throw new Error(data.message || `Brevo returned status code ${response.status}`);
    }

    return { success: true, data };
  } catch (error) {
    console.error("[Brevo Newsletter Error]:", error);
    throw error;
  }
}

/**
 * Sends a welcome email to a newly registered member.
 */
export async function sendWelcomeEmail(email: string, firstName: string, lastName: string) {
  if (!BREVO_API_KEY) {
    console.warn("[Brevo Warning]: BREVO_API_KEY is not configured. Skipping welcome email.");
    return { success: true, message: "Mock email sent successful (API Key missing)." };
  }

  const name = `${firstName} ${lastName}`;
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to The Relevant Woman</title>
        <style>
          body {
            font-family: 'Inter', Arial, sans-serif;
            background-color: #f6f5f7;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
          }
          .wrapper {
            width: 100%;
            background-color: #f6f5f7;
            padding: 40px 20px;
            box-sizing: border-box;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #3a225c;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            border: 2px solid #fc98ac;
          }
          .header {
            padding: 40px 20px;
            text-align: center;
            background-image: linear-gradient(to bottom right, #2c144c, #3a225c);
            border-bottom: 1px solid rgba(255,255,255,0.1);
          }
          .logo {
            font-size: 24px;
            font-weight: bold;
            color: #ffffff;
            letter-spacing: 1px;
            text-transform: uppercase;
          }
          .logo span {
            color: #f9f871;
          }
          .content {
            padding: 40px 30px;
            color: #ffffff;
            line-height: 1.6;
          }
          h1 {
            color: #f9f871;
            font-size: 24px;
            margin-top: 0;
            margin-bottom: 20px;
            font-weight: bold;
          }
          p {
            color: #e5e0eb;
            font-size: 16px;
            margin-bottom: 20px;
          }
          .cta-btn {
            display: inline-block;
            background-color: #f9f871;
            color: #3a225c !important;
            text-decoration: none;
            padding: 14px 28px;
            border-radius: 8px;
            font-weight: bold;
            font-size: 16px;
            margin-top: 15px;
            margin-bottom: 25px;
            text-align: center;
            box-shadow: 0 4px 10px rgba(249, 248, 113, 0.2);
            transition: background-color 0.3s;
          }
          .cta-btn:hover {
            background-color: #e6e567;
          }
          .footer {
            padding: 30px;
            text-align: center;
            background-color: #2c144c;
            border-top: 1px solid rgba(255,255,255,0.1);
            color: rgba(255,255,255,0.6);
            font-size: 13px;
          }
          .footer a {
            color: #fc98ac;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="wrapper">
          <div class="container">
            <div class="header">
              <div class="logo">The Relevant <span>Woman</span></div>
            </div>
            <div class="content">
              <h1>Hello, ${firstName}! 👋</h1>
              <p>Welcome to <strong>The Relevant Woman</strong>! We are absolutely thrilled to welcome you to our community of mentorship, growth, and empowerment.</p>
              <p>You have officially registered as a member. By joining us, you are stepping into a supportive sisterhood committed to helping young women master self-leadership, identify their calling, and build impactful careers.</p>
              <p>Here are your next steps to get started:</p>
              <ul style="color: #e5e0eb; padding-left: 20px; margin-bottom: 25px;">
                <li style="margin-bottom: 10px;">Browse our certified programs in the <strong>Academy</strong>.</li>
                <li style="margin-bottom: 10px;">Check out upcoming webinars and fireside chats under <strong>Events</strong>.</li>
                <li style="margin-bottom: 10px;">Access PDF guides and worksheets in our <strong>Resource Library</strong>.</li>
              </ul>
              <div style="text-align: center;">
                <a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://www.drelevantwoman.com"}/academy" class="cta-btn">Explore the Academy</a>
              </div>
              <p>If you have any questions or would like to share your goals with us, feel free to reply to this email at any time.</p>
              <p>With love and empowerment,<br><strong>The Relevant Woman Team</strong> 💜</p>
            </div>
            <div class="footer">
              <p>© 2026 The Relevant Woman. All rights reserved.</p>
              <p>Phone: +234 812 355 3150 | Email: <a href="mailto:therelevantw@gmail.com">therelevantw@gmail.com</a></p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": BREVO_API_KEY,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: "The Relevant Woman",
          email: EMAIL_FROM,
        },
        to: [
          {
            email: email.trim().toLowerCase(),
            name: name.trim(),
          },
        ],
        subject: "Welcome to The Relevant Woman Community! 💜",
        htmlContent: htmlContent,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `Brevo returned status code ${response.status}`);
    }

    return { success: true, data };
  } catch (error) {
    console.error("[Brevo Transactional Email Error]:", error);
    throw error;
  }
}
