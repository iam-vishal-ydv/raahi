"use client";

import { Handshake, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";

import logo from "@/assets/logo.png";
import AuthModal from "../modal/auth-model/auth-model";
import UserMenuPopover, { type UserMenuItem } from "../global/userMenu-popover";
import { useCurrentUser } from "../hooks/useCurrentUser";

export default function Header() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const { user, loading } = useCurrentUser();

  const isLoggedIn = !!user;

  const navItems = ["Rides", "Rentals", "About", "Help"];

  const userMenuItems: UserMenuItem[] = [
    {
      label: "Become a Partner",
      href: "/partner/onboarding/vehicle",
      icon: Handshake,
    },
    {
      label: "Logout",
      icon: LogOut,
      onClick: () => signOut({ callbackUrl: "/" }),
    },
  ];

  const openAuthModal = () => {
    setIsMobileOpen(false);
    setIsAuthOpen(true);
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-black/[0.07] bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link href="/" className="group flex items-center">
            <Image
              src={logo}
              alt="Raahi"
              width={110}
              height={42}
              priority
              className="h-auto w-[100px] object-contain transition-transform duration-200 group-hover:scale-[1.02] sm:w-[110px]"
            />
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="group relative text-sm font-semibold text-zinc-600 transition-colors duration-200 hover:text-black"
              >
                {item}

                <span className="absolute -bottom-2 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-[#C8FF00] transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            {loading ? (
              <div className="h-10 w-10 animate-pulse rounded-full bg-zinc-100" />
            ) : isLoggedIn ? (
              <UserMenuPopover
                name={user?.name}
                email={user?.email}
                image={user?.image}
                items={userMenuItems}
              />
            ) : (
              <>
                <button
                  type="button"
                  onClick={openAuthModal}
                  className="rounded-xl px-4 py-2.5 text-sm font-bold text-zinc-700 transition-all duration-200 hover:bg-zinc-100 hover:text-black"
                >
                  Login
                </button>

                <button
                  type="button"
                  onClick={openAuthModal}
                  className="rounded-xl bg-black px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-black/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-zinc-800"
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
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-800 transition-all duration-200 hover:border-black hover:bg-black hover:text-white md:hidden"
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
          className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-[3px] md:hidden"
        />
      )}

      <aside
        aria-hidden={!isMobileOpen}
        className={`fixed right-0 top-0 z-[70] flex h-dvh w-[86%] max-w-[380px] flex-col border-l border-black/10 bg-[#f7f7f5] shadow-2xl transition-transform duration-300 ease-out md:hidden ${
          isMobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-black/[0.07] px-5">
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
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-700 transition-all duration-200 hover:border-black hover:bg-black hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex min-h-0 flex-1 flex-col overflow-y-auto px-5 py-5">
          <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.16em] text-zinc-400">
            Explore
          </p>

          <div className="space-y-1">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsMobileOpen(false)}
                className="flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-semibold text-zinc-800 transition-all duration-200 hover:bg-black hover:text-white"
              >
                <span>{item}</span>

                <span className="text-xs text-zinc-400">→</span>
              </a>
            ))}
          </div>

          <div className="mt-5 rounded-[20px] bg-black p-4 text-white">
            <div className="mb-2.5 flex h-8 w-8 items-center justify-center rounded-lg bg-[#C8FF00] text-xs font-black text-black">
              R
            </div>

            <p className="text-sm font-extrabold leading-5">
              Your journey,
              <br />
              your way.
            </p>

            <p className="mt-1.5 text-[11px] leading-4 text-zinc-400">
              Ride across the city with Raahi.
            </p>
          </div>
        </nav>

        <div className="shrink-0 border-t border-black/[0.07] bg-[#f7f7f5] p-5">
          {loading ? (
            <div className="h-12 w-full animate-pulse rounded-xl bg-zinc-200" />
          ) : isLoggedIn ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3 rounded-2xl border border-black/[0.06] bg-white p-3">
                <div className="relative shrink-0">
                  <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border-2 border-[#C8FF00] bg-black text-sm font-extrabold uppercase text-[#C8FF00] shadow-[0_0_0_3px_rgba(200,255,0,0.12)]">
                    {user?.image ? (
                      <Image
                        src={user.image}
                        alt={user?.name || "User"}
                        width={44}
                        height={44}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      user?.name?.trim()?.charAt(0) || "U"
                    )}
                  </div>

                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-[#C8FF00]" />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-zinc-900">
                    {user?.name || "User"}
                  </p>

                  <p className="truncate text-xs text-zinc-500">
                    {user?.email}
                  </p>
                </div>
              </div>

              <Link
                href="/partner/onboarding/vehicle"
                onClick={() => setIsMobileOpen(false)}
                className="flex w-full items-center gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-3.5 text-sm font-bold text-zinc-700 transition-all duration-200 hover:border-black hover:bg-black hover:text-white"
              >
                <Handshake size={18} />
                Become a Partner
              </Link>

              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex w-full items-center gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-3.5 text-sm font-bold text-zinc-700 transition-all duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={openAuthModal}
                className="mb-3 w-full rounded-xl border border-zinc-300 bg-white py-3.5 text-sm font-bold text-zinc-800 transition-all duration-200 hover:border-black hover:bg-black hover:text-white"
              >
                Login
              </button>

              <button
                type="button"
                onClick={openAuthModal}
                className="w-full rounded-xl bg-black py-3.5 text-sm font-bold text-white shadow-lg shadow-black/10 transition-all duration-200 hover:bg-zinc-800"
              >
                Get Started
              </button>
            </>
          )}

          <p className="mt-3 text-center text-[11px] font-medium text-zinc-400">
            Your Journey, Your Way
          </p>
        </div>
      </aside>

      <AuthModal isOpen={isAuthOpen} setIsOpen={setIsAuthOpen} />
    </>
  );
}
