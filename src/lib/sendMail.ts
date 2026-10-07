import "server-only";
import { createTransport } from "nodemailer";

const host = process.env.SMTP_HOST;
const port = Number(process.env.SMTP_PORT || 587);
const user = process.env.SMTP_USERNAME;
const pass = process.env.SMTP_PASSWORD;
const from = process.env.SMTP_FROM_ADDRESS || user;

console.log("SMTP Config:", {
  host,
  port,
  user,
  pass,
  from,
});

if (!host || !user || !pass || !from) {
  throw new Error("Missing SMTP environment variables");
}

const transport = createTransport({
  host,
  port,
  secure: port === 465,
  auth: {
    user,
    pass,
  },
});

type SendEmailOptions = {
  to: string;
  subject: string;
  text: string;
};

export async function sendEmail({ to, subject, text }: SendEmailOptions) {
  return transport.sendMail({
    from,
    to,
    subject,
    text,
  });
}
