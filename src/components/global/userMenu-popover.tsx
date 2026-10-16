"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ChevronRight } from "lucide-react";

export type UserMenuItem = {
  label: string;
  href?: string;
  icon: LucideIcon;
  onClick?: () => void;
};

interface UserMenuPopoverProps {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  items: UserMenuItem[];
}

export default function UserMenuPopover({
  name,
  email,
  image,
  items,
}: UserMenuPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);

  const firstLetter = name?.trim()?.charAt(0)?.toUpperCase() || "U";

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Open user menu"
        aria-expanded={isOpen}
        className="relative flex h-11 w-11 items-center justify-center overflow-visible rounded-full border-2 border-[#C8FF00] bg-black text-sm font-extrabold uppercase text-[#C8FF00] shadow-[0_0_0_3px_rgba(200,255,0,0.12)] transition-all duration-200 hover:scale-105"
      >
        <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full">
          {image ? (
            <Image
              src={image}
              alt={name || "User"}
              width={44}
              height={44}
              className="h-full w-full object-cover"
            />
          ) : (
            firstLetter
          )}
        </div>

        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-[#C8FF00]" />
      </button>

      {isOpen && (
        <>
          <button
            type="button"
            aria-label="Close user menu"
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 cursor-default"
          />

          <div className="absolute right-0 top-14 z-50 w-[290px] overflow-hidden rounded-[22px] border border-black/[0.08] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.14)]">
            <div className="border-b border-black/[0.07] bg-[#F7F7F5] px-4 py-4">
              <div className="flex items-center gap-3">
                <div className="relative shrink-0">
                  <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border-2 border-[#C8FF00] bg-black text-sm font-extrabold uppercase text-[#C8FF00]">
                    {image ? (
                      <Image
                        src={image}
                        alt={name || "User"}
                        width={44}
                        height={44}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      firstLetter
                    )}
                  </div>

                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-[#C8FF00]" />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-extrabold text-zinc-950">
                    {name || "User"}
                  </p>

                  <p className="mt-0.5 truncate text-xs text-zinc-500">
                    {email || ""}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-2">
              {items.map((item) => {
                const Icon = item.icon;

                if (item.href) {
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-zinc-700 transition-all duration-200 hover:bg-black hover:text-white"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-700 transition-colors duration-200 group-hover:bg-[#C8FF00] group-hover:text-black">
                        <Icon size={17} />
                      </span>

                      <span className="flex-1">{item.label}</span>

                      <ChevronRight
                        size={16}
                        className="text-zinc-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-white"
                      />
                    </Link>
                  );
                }

                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      item.onClick?.();
                      setIsOpen(false);
                    }}
                    className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold text-zinc-700 transition-all duration-200 hover:bg-black hover:text-white"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-700 transition-colors duration-200 group-hover:bg-[#C8FF00] group-hover:text-black">
                      <Icon size={17} />
                    </span>

                    <span className="flex-1">{item.label}</span>

                    <ChevronRight
                      size={16}
                      className="text-zinc-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-white"
                    />
                  </button>
                );
              })}
            </div>

            <div className="border-t border-black/[0.06] px-4 py-3">
              <div className="flex items-center justify-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C8FF00]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-400">
                  Your journey, your way
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
