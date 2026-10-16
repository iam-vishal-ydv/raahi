import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";

export async function POST(req: NextRequest) {
  const { email, otp } = await req.json();
  if (!email || !otp) {
    return NextResponse.json(
      { message: "Email and OTP are required" },
      { status: 400 },
    );
  }
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
  if (otp !== user.otp) {
    return NextResponse.json({ message: "Invalid OTP" }, { status: 400 });
  }
  if (Date.now() > user.otpExpiresAt) {
    return NextResponse.json({ message: "OTP expired" }, { status: 400 });
  }
  user.isEmailVerified = true;
  user.otp = null;
  user.otpExpiresAt = null;
  await user.save();
  return NextResponse.json(
    { message: "OTP verified successfully" },
    { status: 200 },
  );
}
