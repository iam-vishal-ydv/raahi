import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDb from "@/lib/db";
import User from "@/models/user.model";
import { generateOTP } from "@/lib/generateOTP";
import { sendEmail } from "@/lib/sendMail";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!name?.trim() || !email?.trim() || !password) {
      return NextResponse.json(
        { message: "Name, email and password are required" },
        { status: 400 },
      );
    }

    if (typeof password !== "string" || password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters" },
        { status: 400 },
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    await connectDb();

    let user = await User.findOne({ email: normalizedEmail });

    if (user?.isEmailVerified) {
      return NextResponse.json(
        { message: "Email already exists!" },
        { status: 400 },
      );
    }

    const otp = generateOTP(6);
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
    const hashedPassword = await bcrypt.hash(password, 10);

    if (user) {
      user.name = name.trim();
      user.password = hashedPassword;
      user.otp = otp;
      user.otpExpiresAt = otpExpiresAt;

      await user.save();
    } else {
      user = await User.create({
        name: name.trim(),
        email: normalizedEmail,
        password: hashedPassword,
        otp,
        otpExpiresAt,
        isEmailVerified: false,
      });
    }

    try {
      await sendEmail({
        to: normalizedEmail,
        subject: "Verify your Raahi account",
        text: `Your verification OTP is ${otp}. It expires in 10 minutes.`,
      });
    } catch (error) {
      console.error("OTP email sending failed:", error);

      return NextResponse.json(
        { message: "Failed to send OTP. Please try again." },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        message: "OTP sent successfully. Please verify your email.",
        email: normalizedEmail,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Registration error:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
