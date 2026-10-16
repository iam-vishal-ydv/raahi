"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import { Lock, Mail } from "lucide-react";
import { signIn } from "next-auth/react";

import { AuthMode } from "./auth-model";
import AuthInput from "./auth-Input";
import GoogleButton from "./google-button";

interface Props {
  setMode: Dispatch<SetStateAction<AuthMode>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function LoginForm({ setMode, setIsOpen }: Props) {
  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  async function handleSubmit() {
    try {
      const res = await signIn("credentials", {
        email: value.email,
        password: value.password,
        redirect: false,
      });

      if (res?.ok) {
        setIsOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value: inputValue } = e.target;

    setValue((prev) => ({
      ...prev,
      [name]: inputValue,
    }));
  }

  async function loginWithGoogle() {
    try {
      await signIn("google", {
        callbackUrl: "/",
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="px-6 pb-5 pt-4 sm:px-8">
        <div className="mb-3 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#C8FF00]" />

          <span className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-zinc-400">
            Welcome to Raahi
          </span>
        </div>

        <h2 className="text-2xl font-extrabold tracking-[-0.04em] text-zinc-950">
          Welcome back 👋
        </h2>

        <p className="mt-1.5 text-sm leading-6 text-zinc-500">
          Login to continue your journey with Raahi.
        </p>
      </div>

      <div className="px-6 pb-7 sm:px-8">
        <div className="space-y-4">
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

          <div className="flex justify-end">
            <button
              type="button"
              className="text-xs font-bold text-zinc-600 transition hover:text-black hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-black text-sm font-extrabold text-white shadow-[0_10px_25px_rgba(0,0,0,0.14)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-zinc-800 active:translate-y-0"
          >
            Login
            <span className="text-[#C8FF00] transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </button>

          <div className="flex items-center gap-3 py-1">
            <div className="h-px flex-1 bg-zinc-200" />

            <span className="text-[10px] font-bold tracking-wider text-zinc-400">
              OR
            </span>

            <div className="h-px flex-1 bg-zinc-200" />
          </div>

          <GoogleButton onSubmit={loginWithGoogle} />

          <p className="pt-1 text-center text-sm text-zinc-500">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => setMode("register")}
              className="font-extrabold text-zinc-900 underline decoration-[#C8FF00] decoration-2 underline-offset-4 transition hover:text-black"
            >
              Create account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
