import { NextRequest, NextResponse } from "next/server";
import { sendCampaignEmail } from "@/lib/email";
import { toHTML } from "@portabletext/to-html";

// Secret to verify the webhook comes from Sanity
// In Sanity Webhooks dashboard, you will add a secret and set it here in .env
const SANITY_WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET || "";

export async function POST(req: NextRequest) {
  try {
    const signature = req.headers.get("sanity-webhook-signature");
    // Verify signature logic would go here if SANITY_WEBHOOK_SECRET is set

    const body = await req.json();

    // Check if the document type is campaignEmail and status is "ready"
    if (body._type === "campaignEmail" && body.status === "ready") {
      const { _id, subject, body: portableTextBody } = body;

      if (!subject || !portableTextBody) {
        return NextResponse.json(
          { message: "Subject or body missing. Cannot send." },
          { status: 400 }
        );
      }

      // Convert portable text to HTML
      const htmlContent = toHTML(portableTextBody, {
        components: {
          /* Add custom block renderers here if needed */
        },
      });

      // Wrap in a basic email template
      const fullHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            ${htmlContent}
          </div>
        </body>
        </html>
      `;

      // Send the campaign
      const result = await sendCampaignEmail(subject, fullHtml);

      // Update the status in Sanity to "sent" so it doesn't get triggered again
      try {
        const { client } = await import("@/sanity/lib/client");
        // We need a client with a token that has write access to mutate data.
        // Usually, client has useCdn: true and no token by default.
        // If they don't have a write token configured, this might fail, 
        // but we'll try catching it.
        const writeClient = client.withConfig({
          token: process.env.SANITY_API_WRITE_TOKEN,
          useCdn: false,
        });

        await writeClient
          .patch(_id)
          .set({ status: "sent", sentAt: new Date().toISOString() })
          .commit();
      } catch (patchError) {
        console.error("Failed to update document status in Sanity:", patchError);
        // We don't fail the whole request since the email WAS sent
      }

      return NextResponse.json(
        { message: "Campaign created and sent successfully!", data: result },
        { status: 200 }
      );
    }

    return NextResponse.json({ message: "No action taken." }, { status: 200 });
  } catch (error: any) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { message: "Webhook error", error: error.message },
      { status: 500 }
    );
  }
}
