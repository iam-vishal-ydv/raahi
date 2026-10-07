"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import { Lock, Mail } from "lucide-react";
import { AuthMode } from "./auth-model";
import AuthInput from "./auth-Input";
import GoogleButton from "./google-button";
import { signIn, useSession } from "next-auth/react";

interface Props {
  setMode: Dispatch<SetStateAction<AuthMode>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function LoginForm({ setMode, setIsOpen }: Props) {
  const [showPassword, setShowPassword] = useState(false);

  const [value, setValue] = useState({ email: "", password: "" });
  const { data } = useSession();

  async function handleSubmit() {
    try {
      const res = await signIn("credentials", {
        email: value.email,
        password: value.password,
        redirect: false,
      });
      setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target.value;
    const name = e.target.name;
    setValue({ ...value, [name]: input });
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
      <div className="px-7 pb-5 pt-4">
        <h2 className="text-2xl font-extrabold text-[#18181B]">
          Welcome back 👋
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Login to continue your journey with Raahi.
        </p>
      </div>
      <div className="px-7 pb-8">
        <div className="space-y-4">
          <AuthInput
            icon={<Mail size={18} />}
            label="Email"
            placeholder="Enter your email"
            type="email"
            name="email"
            onChange={handleChange}
            value={value.email}
          />
          <div>
            <div className="relative">
              <AuthInput
                icon={<Lock size={18} />}
                label="Pssword"
                placeholder="Enter your password"
                type="password"
                name="password"
                onChange={handleChange}
                value={value.password}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button className="text-sm font-semibold text-[#6D28D9] hover:underline">
              Forgot password?
            </button>
          </div>

          <button
            onClick={handleSubmit}
            className="h-12 w-full rounded-xl bg-[#6D28D9] text-sm font-bold text-white shadow-lg shadow-violet-200 transition hover:bg-[#5B21B6]"
          >
            Login
          </button>

          <div className="flex items-center gap-3 py-1">
            <div className="h-px flex-1 bg-zinc-200" />

            <span className="text-xs font-medium text-zinc-400">OR</span>

            <div className="h-px flex-1 bg-zinc-200" />
          </div>
          <GoogleButton onSubmit={loginWithGoogle} />

          <p className="pt-2 text-center text-sm text-zinc-500">
            Don't have an account?{" "}
            <button
              onClick={() => setMode("register")}
              className="font-bold text-[#6D28D9] hover:underline"
            >
              Create account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
