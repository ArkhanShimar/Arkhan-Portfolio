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

function validatePayload(payload: Payload) {
  if (!payload.name || !payload.email || !payload.message) {
    throw new Error("Please provide your name, email, and message.");
  }
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Payload;
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

    await transporter.sendMail({
      from: env.SMTP_USER,
      to: env.CONTACT_INBOX,
      replyTo: payload.email,
      subject: `Portfolio inquiry from ${payload.name}`,
      text: payload.message,
      html: `
        <div style="font-family:Inter,Arial,sans-serif;padding:24px;background:#0f172a;color:#e2e8f0;">
          <h2 style="color:#00ffff;margin-bottom:16px;">New portfolio inquiry</h2>
          <p><strong>Name:</strong> ${payload.name}</p>
          <p><strong>Email:</strong> ${payload.email}</p>
          <p style="white-space:pre-wrap;margin-top:16px;">${payload.message}</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
