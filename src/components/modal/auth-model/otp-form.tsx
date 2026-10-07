"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import axios from "axios";

import { AuthMode } from "./auth-model";

interface Props {
  setMode: Dispatch<SetStateAction<AuthMode>>;
  email: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function OtpForm({ setMode, email, setIsOpen }: Props) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    if (resendTimer <= 0) return;
    const timer = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [resendTimer]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];

    newOtp[index] = value;

    setOtp(newOtp);

    setError("");
    setMessage("");

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };
  async function handleSubmit() {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setError("Please enter the 6-digit OTP");
      return;
    }
    try {
      setLoading(true);
      setError("");
      setMessage("");

      const res = await axios.post("/api/auth/verify-email", {
        email,
        otp: otpString,
      });
      console.log(res.data);
      setMessage(res.data.message || "OTP verified successfully");
      setIsOpen(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message || "Invalid OTP. Please try again.",
        );
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }
  async function handleResendOtp() {
    if (resendTimer > 0 || resendLoading) return;

    try {
      setResendLoading(true);
      setError("");
      setMessage("");

      const res = await axios.post("/api/auth/resend-otp", {
        email,
      });
      console.log(res.data);
      setMessage(res.data.message || "OTP sent successfully");
      setOtp(["", "", "", "", "", ""]);
      setResendTimer(60);
      document.getElementById("otp-0")?.focus();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Failed to resend OTP.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setResendLoading(false);
    }
  }

  return (
    <div>
      <div className="px-7 pb-5 pt-8">
        <button
          onClick={() => setMode("login")}
          className="mb-5 flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-[#6D28D9]"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <h2 className="text-2xl font-extrabold text-[#18181B]">
          Verify your account
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Enter the 6-digit OTP sent to your email.
        </p>
      </div>

      <div className="px-7 pb-8">
        {/* OTP Inputs */}
        <div className="mb-5 flex justify-center gap-2 sm:gap-3">
          {otp.map((value, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              value={value}
              maxLength={1}
              inputMode="numeric"
              autoComplete="one-time-code"
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="h-12 w-11 rounded-xl border border-zinc-200 bg-zinc-50 text-center text-lg font-bold outline-none transition focus:border-[#6D28D9] focus:bg-white focus:ring-4 focus:ring-violet-100 sm:h-14 sm:w-12"
            />
          ))}
        </div>
        {error && (
          <p className="mb-4 text-center text-sm font-medium text-red-500">
            {error}
          </p>
        )}
        {message && (
          <p className="mb-4 text-center text-sm font-medium text-green-600">
            {message}
          </p>
        )}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="h-12 my-8 w-full rounded-xl bg-[#6D28D9] text-sm font-bold text-white shadow-lg shadow-violet-200 transition hover:bg-[#5B21B6] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
        <p className="mt-12 text-center text-sm text-zinc-500">
          Didn't receive the code?{" "}
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={resendTimer > 0 || resendLoading}
            className="font-bold text-[#FB7185] hover:underline disabled:cursor-not-allowed disabled:no-underline disabled:opacity-50"
          >
            {resendLoading
              ? "Sending..."
              : resendTimer > 0
                ? `Resend in ${resendTimer}s`
                : "Resend OTP"}
          </button>
        </p>

        <p className="mt-2 text-center text-xs text-zinc-400">
          OTP is valid for 5 minutes
        </p>
      </div>
    </div>
  );
}
