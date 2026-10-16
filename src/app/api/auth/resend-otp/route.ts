import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/user.model";
import { generateOTP } from "@/lib/generateOTP";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 },
      );
    }
    await connectDB();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    if (user.isEmailVerified) {
      return NextResponse.json(
        { message: "Email is already verified!" },
        { status: 409 },
      );
    }
    const otp = generateOTP(6);
    const otpExpiresAt = Date.now() + 5 * 60 * 1000;
    user.otp = otp;
    user.otpExpiresAt = otpExpiresAt;
    await user.save();
    return NextResponse.json(
      { message: "OTP resent successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Resend OTP error:", error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
