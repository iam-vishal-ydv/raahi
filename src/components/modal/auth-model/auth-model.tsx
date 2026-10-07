"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { X } from "lucide-react";
import LoginForm from "./login";
import RegisterForm from "./register-form";
import OtpForm from "./otp-form";
import logo from "@/assets/logo.png";
import Image from "next/image";

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export type AuthMode = "login" | "register" | "otp";

export default function AuthModal({ isOpen, setIsOpen }: Props) {
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");

  if (!isOpen) return null;

  const closeModal = () => {
    setIsOpen(false);
    setMode("login");
    setEmail("");
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
      onClick={closeModal}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[550px] overflow-hidden rounded-3xl bg-white shadow-2xl"
      >
        <div className="px-7 pt-7">
          <Image
            src={logo}
            alt="Raahi"
            width={100}
            height={40}
            priority
            className="h-auto w-[90px] object-contain"
          />
        </div>

        <button
          onClick={closeModal}
          className="absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 transition hover:bg-violet-50 hover:text-[#6D28D9]"
        >
          <X size={18} />
        </button>

        {mode === "login" && (
          <LoginForm setMode={setMode} setIsOpen={setIsOpen} />
        )}

        {mode === "register" && (
          <RegisterForm setMode={setMode} setEmail={setEmail} />
        )}

        {mode === "otp" && (
          <OtpForm setMode={setMode} email={email} setIsOpen={setIsOpen} />
        )}
      </div>
    </div>
  );
}
