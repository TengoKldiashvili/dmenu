import nodemailer from "nodemailer";

interface EmailConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
  from: string;
}

const config: EmailConfig = {
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: Number(process.env.EMAIL_PORT) || 465,
  user: process.env.EMAIL_USER!,
  pass: process.env.EMAIL_PASS!,
  from: process.env.EMAIL_FROM || process.env.EMAIL_USER!,
};

if (!config.user || !config.pass) {
  throw new Error(
    "⚠️ CRITICAL: Email credentials are missing. Check your .env file."
  );
}

const transporter = nodemailer.createTransport({
  host: config.host,
  port: config.port,
  secure: config.port === 465, 
  auth: {
    user: config.user,
    pass: config.pass,
  },
});

const getVerificationEmailTemplate = (code: string) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
    <h2 style="color: #333; text-align: center;">Verify your Email</h2>
    <p style="font-size: 16px; color: #555;">Hello,</p>
    <p style="font-size: 16px; color: #555;">Use the code below to complete your verification process:</p>
    <div style="background-color: #f4f4f4; padding: 15px; text-align: center; border-radius: 5px; margin: 20px 0;">
      <span style="font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #000;">${code}</span>
    </div>
    <p style="font-size: 14px; color: #888; text-align: center;">This code will expire in 10 minutes.</p>
    <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
    <p style="font-size: 12px; color: #aaa; text-align: center;">If you didn't request this, please ignore this email.</p>
  </div>
`;

export async function sendVerificationCode(email: string, code: string) {
  try {
    const info = await transporter.sendMail({
      from: config.from,
      to: email,
      subject: "🔐 Your Verification Code",
      html: getVerificationEmailTemplate(code),
    });

    console.info(`✅ Verification email sent to ${email}. ID: ${info.messageId}`);
    return { success: true, messageId: info.messageId };

  } catch (error) {
    console.error("❌ Failed to send verification email:", error);
    
    throw new Error("Could not send verification email. Please try again later.");
  }
}