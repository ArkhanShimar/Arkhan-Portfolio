import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type Payload = {
  name?: string;
  email?: string;
  message?: string;
};

const requiredEnv = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "CONTACT_INBOX"] as const;

type RequiredEnv = (typeof requiredEnv)[number];

type EnvConfig = Record<RequiredEnv, string | undefined>;

function getEnvConfig(): EnvConfig {
  return {
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
    CONTACT_INBOX: process.env.CONTACT_INBOX,
  };
}

class PayloadError extends Error {}

function validatePayload(payload: Payload) {
  if (!payload.name || !payload.email || !payload.message) {
    throw new PayloadError("Please provide your name, email, and message.");
  }
}

export async function POST(request: Request) {
  try {
    let payload: Payload;
    try {
      payload = (await request.json()) as Payload;
    } catch {
      return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
    }

    validatePayload(payload);

    const env = getEnvConfig();
    const missing = requiredEnv.filter((key) => !env[key]);

    if (missing.length) {
      console.warn("Missing SMTP configuration", missing);
      return NextResponse.json(
        {
          error:
            "Contact service is not configured yet. Please try again later or reach out via email.",
        },
        { status: 503 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: Number(env.SMTP_PORT),
      secure: Number(env.SMTP_PORT) === 465,
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
      },
    });

    const from = env.SMTP_USER;
    if (!from) {
      return NextResponse.json(
        { error: "Contact service is not configured yet. Please try again later." },
        { status: 503 }
      );
    }

    await transporter.sendMail({
      from,
      to: env.CONTACT_INBOX,
      replyTo: payload.email,
      subject: `Portfolio inquiry from ${payload.name}`,
      text: payload.message,
      html: `
        <div style="font-family:Inter,Arial,sans-serif;padding:24px;background:#0f172a;color:#e2e8f0;">
          <h2 style="color:#22c55e;margin-bottom:16px;">New portfolio inquiry</h2>
          <p><strong>Name:</strong> ${payload.name}</p>
          <p><strong>Email:</strong> ${payload.email}</p>
          <p style="white-space:pre-wrap;margin-top:16px;">${payload.message}</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof PayloadError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (error instanceof Error) {
      console.error("Contact API failed to send email", { message: error.message });
      return NextResponse.json(
        { error: "Message delivery failed. Please try again later or email directly." },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { error: "Unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
