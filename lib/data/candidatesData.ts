export interface Candidate {
  id: string;
  name: string;
  email: string;
  role: string;
  duties: string;
}

export const SUCCESSFUL_APPLICANTS: Candidate[] = [
  {
    id: "aondosoo-raphael",
    name: "Aondosoo Raphael",
    email: "aftorkumaraphael@gmail.com",
    role: "Assistant Social Media Manager",
    duties:
      "This role requires you to support the management and growth of our social media channels, assist in content planning, monitor community interactions, support brand messaging, and execute directives from the Social Media Lead and Founder.",
  },
  {
    id: "oluwatomisin-adekeye",
    name: "Oluwatomisin Adekeye",
    email: "adekeyeoluwatomisin4@gmail.com",
    role: "Content Writer",
    duties:
      "This role requires you to craft compelling, inspiring, and engaging written content for our newsletters, articles, website, promotional materials, and community communications, upholding the high standards and authentic voice of The Relevant Woman.",
  },
  {
    id: "victoria-adeoye",
    name: "Victoria Adeoye",
    email: "victoriaadeoye92@gmail.com",
    role: "Video Editor",
    duties:
      "This role requires you to edit and produce high-quality video content, reels, event recaps, and visual narratives across our platforms that creatively engage our audience and elevate the brand's visual identity.",
  },
  {
    id: "adekemi-adeyanju",
    name: "Adekemi Adeyanju",
    email: "adeyanjuadekemi08@gmail.com",
    role: "Project Manager",
    duties:
      "This role requires you to plan, coordinate, and oversee organizational projects and initiatives, manage timelines, align cross-functional team efforts, ensure deliverables are achieved with excellence, and report directly on project milestones.",
  },
  {
    id: "precious-innocent",
    name: "Precious Innocent",
    email: "aishpresh@gmail.com",
    role: "Project Manager",
    duties:
      "This role requires you to plan, coordinate, and oversee organizational projects and initiatives, manage timelines, align cross-functional team efforts, ensure deliverables are achieved with excellence, and report directly on project milestones.",
  },
  {
    id: "roseline-ukorebi-asuquo",
    name: "Roseline Ukorebi Asuquo",
    email: "roselineukorebi@gmail.com",
    role: "Programs Coordinator",
    duties:
      "This role requires you to design, coordinate, and facilitate educational, mentorship, and community programs for The Relevant Woman, ensuring seamless execution, positive participant engagement, and program impact evaluation.",
  },
  {
    id: "ihuoma-ezurike",
    name: "Ihuoma Ezurike",
    email: "ihuomaezu@gmail.com",
    role: "Partnership Coordinator",
    duties:
      "This role requires you to identify, initiate, and nurture strategic relationships and partnerships with organizations, sponsors, and collaborators that support the mission, events, and expansion of The Relevant Woman.",
  },
  {
    id: "boluwatife-ebenezer-paul",
    name: "Boluwatife Ebenezer Paul",
    email: "paulbolu2005@gmail.com",
    role: "Accountant",
    duties:
      "This role requires you to maintain accurate financial records, oversee budget tracking and expense reconciliation, prepare financial summaries, and uphold financial integrity and transparency across all organizational activities.",
  },
];

export const EMPLOYEES_WHATSAPP_LINK =
  "https://chat.whatsapp.com/KFznFZHmjHHI8iIzxB6kUa?s=cl&p=a&mlu=4&ilr=4&iam=0";

export const AUDIT_CONFIRMATION_EMAILS = [
  "luzzylugard@gmail.com",
  "therelevantw@gmail.com",
];

export function generateAppointmentLetterHtml(
  candidate: Candidate,
  dateStr: string = "22nd November 2026"
): string {
  const firstName = candidate.name.split(" ")[0];
  const refCode = `TRW/APPT/2026/${candidate.id
    .replace(/-/g, "")
    .slice(0, 6)
    .toUpperCase()}`;
  const handbookDownloadUrl =
    "https://www.drelevantwoman.com/assets/docs/The_Relevant_Woman_Team_Member_Handbook.pdf";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Letter of Appointment — The Relevant Woman</title>
</head>
<body style="margin:0; padding:0; background-color:#f6f5f7; font-family:'Segoe UI', Tahoma, Geneva, Verdana, Arial, sans-serif; color:#2d2d2d; line-height:1.6;">
  <div style="width:100%; max-width:680px; margin:24px auto; background-color:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 6px 24px rgba(0,0,0,0.08); border:1px solid #e7e2ed;">

    <!-- Letterhead Header -->
    <div style="background:linear-gradient(135deg, #2c144c 0%, #3a225c 50%, #5b1364 100%); padding:32px 36px 24px 36px; text-align:center; border-bottom:3px solid #fc98ac;">
      <div style="font-size:26px; font-weight:800; color:#ffffff; letter-spacing:2px; text-transform:uppercase;">
        THE RELEVANT <span style="color:#f9f871;">WOMAN</span>
      </div>
      <p style="color:#fc98ac; font-size:12px; letter-spacing:1px; margin:6px 0 0 0; text-transform:uppercase; font-weight:600;">
        Empowering & Transforming Lives
      </p>
    </div>

    <!-- Letter Meta -->
    <div style="padding:24px 36px 0 36px;">
      <table style="width:100%; font-size:13px; color:#666666; border-collapse:collapse;">
        <tr>
          <td style="padding:4px 0;"><strong>Our Ref:</strong> ${refCode}</td>
          <td style="padding:4px 0; text-align:right;"><strong>Date:</strong> ${dateStr}</td>
        </tr>
      </table>
      <div style="margin-top:20px; font-size:16px; color:#1a1a1a;">
        <strong>${candidate.name}</strong>
      </div>
    </div>

    <!-- Letter Content -->
    <div style="padding:16px 36px 28px 36px; font-size:15px; color:#333333; line-height:1.75;">
      <p style="margin-top:10px;">Dear <strong>${firstName}</strong>,</p>

      <div style="text-align:center; margin:24px 0 20px 0;">
        <span style="display:inline-block; font-size:18px; font-weight:800; color:#3a225c; letter-spacing:1.5px; border-bottom:2px solid #3a225c; padding-bottom:4px; text-transform:uppercase;">
          LETTER OF APPOINTMENT
        </span>
      </div>

      <p>
        I am pleased to appoint you as <strong>${candidate.role}</strong> for <strong>The Relevant Woman</strong>. This appointment takes immediate effect.
      </p>

      <p>
        I am confident that you will perform your duties with honesty, commitment, and loyalty while ensuring the interest of The Relevant Woman are always served.
      </p>

      <div style="background:#f9f6fc; border-left:4px solid #5b1364; padding:14px 18px; border-radius:0 8px 8px 0; color:#2c144c; margin:20px 0;">
        <strong style="color:#3a225c;">Role Responsibilities:</strong><br>
        <span style="color:#4a3560;">${candidate.duties}</span>
      </div>

      <p>
        Although you receive no monetary compensation or stipends from this appointment, I hope you will fulfill your duties with diligence, integrity, and commitment to the organization&apos;s guiding principle.
      </p>

      <!-- Signature Block -->
      <div style="margin-top:28px; padding-top:12px;">
        <p style="margin:0 0 12px 0;">Yours Faithfully,</p>
        <div style="font-family:'Brush Script MT', cursive, Georgia, serif; font-size:24px; color:#3a225c; margin:6px 0;">
          Lyam Iveren Ann
        </div>
        <p style="margin:4px 0 0 0; font-weight:700; color:#3a225c; font-size:15px;">
          Lyam Iveren Ann
        </p>
        <p style="margin:2px 0 0 0; color:#666666; font-size:13px;">
          Founder of The Relevant Woman
        </p>
      </div>

      <hr style="border:none; border-top:1px solid #e7e2ed; margin:32px 0 24px 0;">

      <!-- WhatsApp Group Card -->
      <div style="background:linear-gradient(135deg, #075e54 0%, #128c7e 50%, #25D366 100%); border-radius:12px; padding:24px; text-align:center; color:#ffffff; box-shadow:0 4px 14px rgba(37,211,102,0.25);">
        <div style="font-size:26px; margin-bottom:8px;">💬</div>
        <h3 style="margin:0 0 8px 0; font-size:18px; font-weight:700; color:#ffffff;">
          Join the Team WhatsApp Group
        </h3>
        <p style="margin:0 0 18px 0; font-size:14px; color:#eafbee; line-height:1.5;">
          Please join our official team WhatsApp group immediately to connect with the team, receive your onboarding orientation schedule, and begin your journey with us:
        </p>
        <a href="${EMPLOYEES_WHATSAPP_LINK}" target="_blank" rel="noopener noreferrer" style="display:inline-block; background-color:#ffffff; color:#075e54; font-weight:800; font-size:15px; padding:12px 28px; border-radius:8px; text-decoration:none; box-shadow:0 2px 8px rgba(0,0,0,0.15);">
          👉 Join Team WhatsApp Group
        </a>
      </div>

      <!-- Handbook Notice -->
      <div style="margin-top:20px; background:#fbf9fd; border:1px dashed #5b1364; border-radius:10px; padding:16px 20px;">
        <table style="width:100%; border-collapse:collapse;">
          <tr>
            <td style="width:36px; vertical-align:top; font-size:24px;">📖</td>
            <td style="vertical-align:top; padding-left:10px;">
              <strong style="color:#3a225c; font-size:14px;">The Relevant Woman Team Member Handbook</strong>
              <p style="margin:4px 0 6px 0; font-size:13px; color:#666666;">
                Attached to this email is your copy of our official Team Member Handbook (PDF). Please review it thoroughly before our onboarding meeting.
              </p>
              <a href="${handbookDownloadUrl}" style="color:#5b1364; font-size:12px; font-weight:bold; text-decoration:underline;">
                Direct Download Link (PDF)
              </a>
            </td>
          </tr>
        </table>
      </div>

    </div>

    <!-- Letterhead Footer -->
    <div style="background-color:#2c144c; padding:22px 36px; color:#ffffff; font-size:12px; text-align:center; border-top:1px solid rgba(255,255,255,0.1);">
      <p style="margin:0 0 6px 0; color:#fc98ac; font-weight:bold; font-size:13px;">
        The Relevant Woman
      </p>
      <p style="margin:0 0 4px 0; color:rgba(255,255,255,0.75);">
        ✉️ <a href="mailto:therelevantw@gmail.com" style="color:#f9f871; text-decoration:none;">therelevantw@gmail.com</a>
        &nbsp;|&nbsp; 📞 +234 812 3553 150
        &nbsp;|&nbsp; 📸 @the_relevantwoman
      </p>
      <p style="margin:6px 0 0 0; color:rgba(255,255,255,0.4); font-size:11px;">
        © ${new Date().getFullYear()} The Relevant Woman. All rights reserved.
      </p>
    </div>

  </div>
</body>
</html>`;
}
