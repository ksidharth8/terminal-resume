import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
	try {
		const { name, email, message } = await req.json();

		if (!name || name.trim().length < 2) {
			return NextResponse.json(
				{ field: "name", error: "Please enter a valid name." },
				{ status: 400 },
			);
		}

		if (!email.includes("@")) {
			return NextResponse.json(
				{ field: "email", error: "Please enter a valid email address." },
				{ status: 400 },
			);
		}

		if (message.length < 10) {
			return NextResponse.json(
				{
					field: "message",
					error: "Message must be at least 10 characters long.",
				},
				{ status: 400 },
			);
		}

		await resend.emails.send({
			from: "Terminal Resume <onboarding@resend.dev>",
			to: "kumarsidharth333@gmail.com",
			replyTo: email,
			subject: `New Contact Message from ${name}`,
			html: `
  <div style="
    font-family: Inter, system-ui, -apple-system, sans-serif;
    background-color: #0f172a;
    padding: 40px 20px;
  ">
    <div style="
      max-width: 600px;
      margin: auto;
      background: #111827;
      border-radius: 12px;
      padding: 30px;
      color: #e5e7eb;
      border: 1px solid #1f2937;
    ">
      <h2 style="
        margin: 0 0 20px 0;
        color: #38bdf8;
        font-size: 20px;
        letter-spacing: 0.5px;
      ">
        New Contact Message
      </h2>

      <div style="margin-bottom: 16px;">
        <p style="margin: 0; color: #9ca3af; font-size: 12px;">Name</p>
        <p style="margin: 4px 0 0 0; font-size: 14px;">${name}</p>
      </div>

      <div style="margin-bottom: 16px;">
        <p style="margin: 0; color: #9ca3af; font-size: 12px;">Email</p>
        <p style="margin: 4px 0 0 0; font-size: 14px;">
          <a href="mailto:${email}" style="color: #60a5fa; text-decoration: none;">
            ${email}
          </a>
        </p>
      </div>

      <div style="margin-bottom: 16px;">
        <p style="margin: 0; color: #9ca3af; font-size: 12px;">Message</p>
        <div style="
          margin-top: 6px;
          padding: 12px;
          background: #0f172a;
          border-radius: 8px;
          font-size: 14px;
          line-height: 1.5;
          border: 1px solid #1f2937;
        ">
          ${message}
        </div>
      </div>

      <div style="
        margin-top: 24px;
        font-size: 12px;
        color: #6b7280;
      ">
        Sent from Terminal Resume
      </div>
    </div>
  </div>
`,
		});

		return NextResponse.json({ success: true });
	} catch (err) {
		console.error("Contact error:", err);
		return NextResponse.json(
			{ error: "Failed to send message" },
			{ status: 500 },
		);
	}
}
