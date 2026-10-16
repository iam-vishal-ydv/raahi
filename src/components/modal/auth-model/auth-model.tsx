"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { ArrowLeft, X } from "lucide-react";
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

  const handleBack = () => {
    if (mode === "otp") {
      setMode("register");
      return;
    }

    if (mode === "register") {
      setMode("login");
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-md"
      onClick={closeModal}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[92vh] w-full max-w-[520px] overflow-y-auto rounded-[28px] border border-white/20 bg-white shadow-[0_30px_100px_rgba(0,0,0,0.25)]"
      >
        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[#C8FF00]/10 blur-3xl" />

        <div className="relative flex items-center justify-between px-6 pb-2 pt-6 sm:px-8 sm:pt-7">
          <div className="flex items-center gap-3">
            {mode !== "login" && (
              <button
                type="button"
                onClick={handleBack}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-600 transition-all duration-200 hover:border-black hover:bg-black hover:text-white"
                aria-label="Go back"
              >
                <ArrowLeft size={17} />
              </button>
            )}

            <div className="rounded-xl bg-white">
              <Image
                src={logo}
                alt="Raahi"
                width={100}
                height={40}
                priority
                className="h-auto w-[90px] object-contain"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={closeModal}
            aria-label="Close"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-500 transition-all duration-200 hover:border-black hover:bg-black hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <div className="relative">
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

        <div className="px-6 pb-5 sm:px-8">
          <div className="flex items-center justify-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C8FF00]" />

            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400">
              Your journey, your way
            </p>

            <span className="h-1.5 w-1.5 rounded-full bg-black" />
          </div>
        </div>
      </div>
    </div>
  );
}
