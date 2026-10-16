"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import { Lock, Mail, User } from "lucide-react";
import axios from "axios";

import { AuthMode } from "./auth-model";
import AuthInput from "./auth-Input";
import Loader from "@/components/loader/loader";

interface Props {
  setMode: Dispatch<SetStateAction<AuthMode>>;
  setEmail: Dispatch<SetStateAction<string>>;
}

type RegisterValues = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterForm({ setMode, setEmail }: Props) {
  const [value, setValue] = useState<RegisterValues>({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value: inputValue } = e.target;

    setValue((prev) => ({
      ...prev,
      [name]: inputValue,
    }));

    setError("");
  }

  async function handleSubmit() {
    if (!value.name.trim() || !value.email.trim() || !value.password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const payload = {
        name: value.name,
        email: value.email,
        password: value.password,
      };

      await axios.post("/api/auth/register", payload);

      setEmail(value.email);
      setMode("otp");
    } catch (error: any) {
      setError(
        error?.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="px-6 pb-5 pt-4 sm:px-8">
        <div className="mb-3 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#C8FF00]" />

          <span className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-zinc-400">
            Join Raahi
          </span>
        </div>

        <h2 className="text-2xl font-extrabold tracking-[-0.04em] text-zinc-950">
          Create your account
        </h2>

        <p className="mt-1.5 text-sm leading-6 text-zinc-500">
          Join Raahi and start your journey.
        </p>
      </div>

      <div className="px-6 pb-7 sm:px-8">
        <div className="space-y-4">
          <AuthInput
            icon={<User size={18} strokeWidth={2} />}
            label="Full name"
            placeholder="Enter your name"
            name="name"
            onChange={handleChange}
            value={value.name}
          />

          <AuthInput
            icon={<Mail size={18} strokeWidth={2} />}
            label="Email"
            placeholder="Enter your email"
            type="email"
            name="email"
            onChange={handleChange}
            value={value.email}
          />

          <AuthInput
            icon={<Lock size={18} strokeWidth={2} />}
            label="Password"
            placeholder="Enter your password"
            type="password"
            name="password"
            onChange={handleChange}
            value={value.password}
          />

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5">
              <p className="text-xs font-semibold text-red-600">{error}</p>
            </div>
          )}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-black text-sm font-extrabold text-white shadow-[0_10px_25px_rgba(0,0,0,0.14)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
          >
            {loading ? (
              <Loader label="Creating account..." />
            ) : (
              <>
                Create account
                <span className="text-[#C8FF00] transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </>
            )}
          </button>

          <div className="flex items-center gap-3 py-1">
            <div className="h-px flex-1 bg-zinc-200" />

            <span className="text-[10px] font-bold tracking-wider text-zinc-400">
              OR
            </span>

            <div className="h-px flex-1 bg-zinc-200" />
          </div>

          <p className="pt-1 text-center text-sm text-zinc-500">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => setMode("login")}
              className="font-extrabold text-zinc-900 underline decoration-[#C8FF00] decoration-2 underline-offset-4 transition hover:text-black"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
