import mongoose, { Document } from "mongoose";

interface User extends Document {
  name: string;
  email: string;
  role: "user" | "patner" | "admin";
  password?: string;
  createdAt: Date;
  updatedAt: Date;
  otp?: string;
  isEmailVerified?: boolean;
  otpExpiersAt?: Date;
}

const userSchema = new mongoose.Schema<User>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "patner", "admin"],
    },
    password: {
      type: String,
    },
    otp: {
      type: String,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    otpExpiersAt: {
      type: Date,
    },
  },
  { timestamps: true },
);

const user = mongoose.models.User || mongoose.model("User", userSchema);

export default user;
