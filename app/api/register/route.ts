import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { sendVerificationCode } from "@/lib/mailer";
import { ratelimit } from "@/lib/ratelimit";
import { headers } from "next/headers";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function isValidEmail(email: string) {
  return EMAIL_REGEX.test(email);
}

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); 
    const { name, email, password } = body;

    const ip = (await headers()).get("x-forwarded-for")?.split(",")[0] ?? "127.0.0.1";
    
    if (ratelimit) {
        const { success } = await ratelimit.limit(ip);
        if (!success) {
            return NextResponse.json({ error: "TOO_MANY_REQUESTS" }, { status: 429 });
        }
    }

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: "INVALID_EMAIL" }, { status: 400 });
    }

    if (!password || password.length < 8) {
      return NextResponse.json({ error: "PASSWORD_TOO_SHORT" }, { status: 400 });
    }

    const exists = await db.user.findUnique({ where: { email } });
    if (exists) {

      return NextResponse.json({ error: "EMAIL_EXISTS" }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const code = generateCode();
    const codeHash = await bcrypt.hash(code, 10);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); 

    await db.$transaction([
        db.emailVerificationCode.deleteMany({ where: { email } }),
        db.emailVerificationCode.create({
            data: {
                email,
                name: name || undefined,
                passwordHash,
                codeHash,
                expiresAt,
            },
        })
    ]);

    await sendVerificationCode(email, code);

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Register error:", e);
    return NextResponse.json({ error: "INTERNAL_ERROR" }, { status: 500 });
  }
}