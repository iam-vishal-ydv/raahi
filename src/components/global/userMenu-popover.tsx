"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface UserMenuItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

interface UserMenuPopoverProps {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  items: UserMenuItem[];
}

export default function UserMenuPopover({
  name,
  email,

  items,
}: UserMenuPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((previous) => !previous)}
        aria-label="Open user menu"
        aria-expanded={isOpen}
        className="flex h-11 items-center gap-2 rounded-full border border-zinc-200 bg-white p-1.5 pr-3 transition hover:border-violet-300 hover:bg-violet-50"
      >
        <div className="space-y-3">
          <div className="flex items-center gap-3 rounded-xl bg-violet-50 p-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-100 text-sm font-bold uppercase text-[#6D28D9]">
              {name?.trim()?.charAt(0) || "U"}
            </div>
          </div>
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-[80] mt-3 w-64 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xl">
          <div className="border-b border-zinc-100 px-4 py-4">
            <p className="truncate text-sm font-bold text-zinc-900">
              {name || "User"}
            </p>
            <p className="mt-1 truncate text-xs text-zinc-500">{email}</p>
          </div>

          <nav className="p-2">
            {items.map(({ label, href, icon: Icon }) => (
              <Link
                key={`${label}-${href}`}
                href={href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-violet-50 hover:text-[#6D28D9]"
              >
                <Icon size={18} />
                {label}
              </Link>
            ))}
          </nav>

          <div className="border-t border-zinc-100 p-2">
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
