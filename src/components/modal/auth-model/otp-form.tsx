"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ArrowLeft, Mail } from "lucide-react";
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

      setMessage(res.data.message || "OTP verified successfully");

      setTimeout(() => {
        setIsOpen(false);
      }, 700);
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
      <div className="px-6 pb-5 pt-5 sm:px-8">
        <button
          type="button"
          onClick={() => setMode("register")}
          className="mb-5 flex items-center gap-2 text-xs font-bold text-zinc-500 transition hover:text-black"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 transition hover:border-black hover:bg-black hover:text-white">
            <ArrowLeft size={15} />
          </span>
          Back
        </button>

        <div className="mb-3 flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#C8FF00] text-black">
            <Mail size={14} strokeWidth={2.5} />
          </span>

          <span className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-zinc-400">
            Email verification
          </span>
        </div>

        <h2 className="text-2xl font-extrabold tracking-[-0.04em] text-zinc-950">
          Verify your account
        </h2>

        <p className="mt-1.5 text-sm leading-6 text-zinc-500">
          Enter the 6-digit OTP sent to
          <span className="ml-1 font-bold text-zinc-800">{email}</span>
        </p>
      </div>

      <div className="px-6 pb-7 sm:px-8">
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
              className="h-12 w-11 rounded-xl border border-zinc-200 bg-zinc-50 text-center text-lg font-extrabold text-zinc-950 outline-none transition-all duration-200 hover:border-zinc-300 hover:bg-white focus:border-black focus:bg-white focus:ring-2 focus:ring-[#C8FF00]/40 sm:h-14 sm:w-12"
            />
          ))}
        </div>

        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-center">
            <p className="text-xs font-semibold text-red-600">{error}</p>
          </div>
        )}

        {message && (
          <div className="mb-4 rounded-xl border border-[#C8FF00]/40 bg-[#C8FF00]/10 px-3 py-2.5 text-center">
            <p className="text-xs font-semibold text-zinc-800">{message}</p>
          </div>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-black text-sm font-extrabold text-white shadow-[0_10px_25px_rgba(0,0,0,0.14)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {loading ? (
            "Verifying..."
          ) : (
            <>
              Verify OTP
              <span className="text-[#C8FF00] transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </>
          )}
        </button>

        <div className="mt-7 text-center">
          <p className="text-sm text-zinc-500">
            Didn't receive the code?{" "}
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={resendTimer > 0 || resendLoading}
              className="font-extrabold text-zinc-900 underline decoration-[#C8FF00] decoration-2 underline-offset-4 transition hover:text-black disabled:cursor-not-allowed disabled:no-underline disabled:opacity-40"
            >
              {resendLoading
                ? "Sending..."
                : resendTimer > 0
                  ? `Resend in ${resendTimer}s`
                  : "Resend OTP"}
            </button>
          </p>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-zinc-50 px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C8FF00]" />

            <p className="text-[10px] font-bold text-zinc-400">
              OTP is valid for 5 minutes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
