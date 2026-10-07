"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import { Lock, Mail, User } from "lucide-react";
import Divider from "./divider";

import { AuthMode } from "./auth-model";
import AuthInput from "./auth-Input";
import axios from "axios";
import Loader from "@/components/loader/loader";

interface Props {
  setMode: Dispatch<SetStateAction<AuthMode>>;
  setEmail: Dispatch<SetStateAction<string>>;
}

type User = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterForm({ setMode, setEmail }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [value, setValue] = useState<User>({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>();

  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target.value;
    const name = e.target.name;
    setValue({
      ...value,
      [name]: input,
    });
    console.log(e.target.value);
    console.log(e.target.name);
  }

  async function handleSubmit() {
    try {
      setLoading(true);
      const payload = {
        name: value.name,
        email: value.email,
        password: value.password,
      };
      await axios.post("/api/auth/register", payload);
      setMode("otp");
      setEmail(value.email);
    } catch (error: any) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="px-7 pb-5 pt-4">
        <h2 className="text-2xl font-extrabold text-[#18181B]">
          Create your account
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Join Raahi and start your journey.
        </p>
      </div>

      <div className="px-7 pb-8">
        <div className="space-y-4">
          <AuthInput
            icon={<User size={18} />}
            label="Full name"
            placeholder="Enter your name"
            name="name"
            onChange={handleChange}
            value={value.name}
          />

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
              />
            </div>
          </div>

          <p className="py-2 text-red-400">{error && error}</p>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="h-12 w-full rounded-xl bg-[#6D28D9] text-sm font-bold text-white shadow-lg shadow-violet-200 transition hover:bg-[#5B21B6] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? <Loader label="Submit..." /> : "Submit"}
          </button>

          <Divider />

          <p className="pt-2 text-center text-sm text-zinc-500">
            Already have an account?{" "}
            <button
              onClick={() => setMode("login")}
              className="font-bold text-[#6D28D9] hover:underline"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
