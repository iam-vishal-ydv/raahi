import { ArrowUpRight, Globe } from "lucide-react";
import Image from "next/image";

import logo from "@/assets/logo.png";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#080808] text-white">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[400px] w-[400px] rounded-full bg-[#C8FF00]/[0.07] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5 lg:gap-10">
          <div className="lg:col-span-2">
            <div className="inline-flex rounded-2xl bg-white px-3 py-2">
              <Image
                src={logo}
                alt="Raahi"
                width={110}
                height={42}
                className="h-auto w-[105px] object-contain"
              />
            </div>

            <p className="mt-5 max-w-sm text-sm leading-6 text-zinc-400">
              Your everyday mobility companion. Book a bike, auto or car, or
              rent a vehicle for your journey.
            </p>

            <div className="mt-6 flex items-center gap-2">
              <SocialButton icon={<Globe size={16} />} />
            </div>

            <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-[#C8FF00] shadow-[0_0_8px_rgba(200,255,0,0.7)]" />

              <span className="text-[11px] font-semibold text-zinc-400">
                Moving cities, one ride at a time.
              </span>
            </div>
          </div>

          <FooterColumn
            title="Services"
            links={["Bike", "Auto", "Car", "Rentals"]}
          />

          <FooterColumn
            title="Company"
            links={["About", "Careers", "Contact", "Help"]}
          />

          <FooterColumn title="Legal" links={["Privacy", "Terms", "Safety"]} />
        </div>

        <div className="mt-14 border-t border-white/[0.08] pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-zinc-500">
              © 2026 Raahi. All rights reserved.
            </p>

            <div className="flex items-center gap-2 text-xs font-medium text-zinc-500">
              <span>Your journey, your way.</span>

              <span className="h-1.5 w-1.5 rounded-full bg-[#C8FF00]" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h3 className="text-xs font-extrabold uppercase tracking-[0.14em] text-white">
        {title}
      </h3>

      <div className="mt-5 space-y-3">
        {links.map((link) => (
          <a
            key={link}
            href="#"
            className="group flex w-fit items-center gap-1.5 text-sm text-zinc-400 transition-colors duration-200 hover:text-white"
          >
            {link}

            <ArrowUpRight
              size={12}
              className="opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
            />
          </a>
        ))}
      </div>
    </div>
  );
}

function SocialButton({ icon }: { icon: React.ReactNode }) {
  return (
    <button
      type="button"
      className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-zinc-400 transition-all duration-200 hover:border-[#C8FF00]/40 hover:bg-[#C8FF00] hover:text-black"
    >
      {icon}
    </button>
  );
}
