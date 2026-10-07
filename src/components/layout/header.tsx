"use client";

import { CarFront, LayoutDashboard, Menu, UserRound, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import logo from "@/assets/logo.png";
import Link from "next/link";
import AuthModal from "../modal/auth-model/auth-model";
import UserMenuPopover, { type UserMenuItem } from "../global/userMenu-popover";
import { useSession } from "next-auth/react";

export default function Header() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";

  const navItems = ["Rides", "Rentals", "About", "Help"];

  const userMenuItems: UserMenuItem[] = [
    {
      label: "My Profile",
      href: "/profile",
      icon: UserRound,
    },
    {
      label: "My Rides",
      href: "/my-rides",
      icon: CarFront,
    },
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
  ];

  const openAuthModal = () => {
    setIsMobileOpen(false);
    setIsAuthOpen(true);
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-zinc-200/70 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link href="/" className="flex items-center">
            <Image
              src={logo}
              alt="Raahi"
              width={110}
              height={42}
              priority
              className="h-auto w-[100px] object-contain sm:w-[110px]"
            />
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-semibold text-zinc-600 transition hover:text-[#6D28D9]"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            {status === "loading" ? (
              <div className="h-11 w-11 animate-pulse rounded-full bg-zinc-100" />
            ) : isLoggedIn ? (
              <UserMenuPopover
                name={session.user?.name}
                email={session.user?.email}
                image={session.user?.image}
                items={userMenuItems}
              />
            ) : (
              <>
                <button
                  type="button"
                  onClick={openAuthModal}
                  className="rounded-xl px-4 py-2.5 text-sm font-bold text-zinc-700 transition hover:bg-violet-50 hover:text-[#6D28D9]"
                >
                  Login
                </button>

                <button
                  type="button"
                  onClick={openAuthModal}
                  className="rounded-xl bg-[#6D28D9] px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-violet-200 transition hover:bg-[#5B21B6]"
                >
                  Get Started
                </button>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => setIsMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={isMobileOpen}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-700 transition hover:border-violet-200 hover:text-[#6D28D9] md:hidden"
          >
            <Menu size={21} />
          </button>
        </div>
      </header>

      {isMobileOpen && (
        <button
          type="button"
          aria-label="Close menu overlay"
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-[2px] md:hidden"
        />
      )}

      <aside
        aria-hidden={!isMobileOpen}
        className={`fixed right-0 top-0 z-[70] flex h-dvh w-[82%] max-w-[360px] flex-col bg-white shadow-2xl transition-transform duration-300 ease-out md:hidden ${
          isMobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-[72px] items-center justify-between border-b border-zinc-200 px-5">
          <Link href="/" onClick={() => setIsMobileOpen(false)}>
            <Image
              src={logo}
              alt="Raahi"
              width={110}
              height={42}
              className="h-auto w-[100px] object-contain"
            />
          </Link>

          <button
            type="button"
            onClick={() => setIsMobileOpen(false)}
            aria-label="Close menu"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 text-zinc-600 transition hover:border-violet-200 hover:bg-violet-50 hover:text-[#6D28D9]"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col px-5 py-6">
          <p className="mb-3 px-3 text-xs font-bold uppercase tracking-wider text-zinc-400">
            Menu
          </p>

          <div className="space-y-1">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsMobileOpen(false)}
                className="block rounded-xl px-4 py-3.5 text-base font-semibold text-zinc-700 transition hover:bg-violet-50 hover:text-[#6D28D9]"
              >
                {item}
              </a>
            ))}
          </div>
        </nav>

        <div className="border-t border-zinc-200 p-5">
          {status === "loading" ? (
            <div className="h-12 w-full animate-pulse rounded-xl bg-zinc-100" />
          ) : isLoggedIn ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3 rounded-xl bg-violet-50 p-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-100 text-sm font-bold uppercase text-[#6D28D9]">
                  {session.user?.name?.trim()?.charAt(0) || "U"}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-zinc-900">
                    {session.user?.name || "User"}
                  </p>

                  <p className="truncate text-xs text-zinc-500">
                    {session.user?.email}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={openAuthModal}
                className="mb-3 w-full rounded-xl border border-zinc-200 py-3.5 text-sm font-bold text-zinc-700 transition hover:border-violet-200 hover:bg-violet-50 hover:text-[#6D28D9]"
              >
                Login
              </button>

              <button
                type="button"
                onClick={openAuthModal}
                className="w-full rounded-xl bg-[#6D28D9] py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-200 transition hover:bg-[#5B21B6]"
              >
                Get Started
              </button>
            </>
          )}

          <p className="mt-4 text-center text-xs text-zinc-400">
            Your Journey, Your Way
          </p>
        </div>
      </aside>

      <AuthModal isOpen={isAuthOpen} setIsOpen={setIsAuthOpen} />
    </>
  );
}
