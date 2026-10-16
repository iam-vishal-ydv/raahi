import { ShieldCheck, Sparkles, Star } from "lucide-react";

import BookingCard from "./booking-card";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#F4F4F1]">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-[#C8FF00]/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[450px] w-[450px] rounded-full bg-black/[0.035] blur-3xl" />

      <div className="pointer-events-none absolute left-[42%] top-[20%] h-[220px] w-[220px] rounded-full bg-[#C8FF00]/[0.06] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-12 lg:px-8 lg:pb-20 lg:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_540px] lg:gap-14">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white/70 px-3.5 py-2 text-xs font-bold text-zinc-700 shadow-sm backdrop-blur-xl">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#C8FF00] text-black">
                <Sparkles size={12} strokeWidth={2.5} />
              </span>
              Your journey, your way
            </div>

            <h1 className="text-[42px] font-extrabold leading-[1.04] tracking-[-0.06em] text-zinc-950 sm:text-5xl lg:text-[64px]">
              Move around the city,
              <span className="mt-1 block text-zinc-950">
                your{" "}
                <span className="relative inline-block">
                  way.
                  <span className="absolute -bottom-1 left-0 h-2 w-full rounded-full bg-[#C8FF00]/70" />
                </span>
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-zinc-500 sm:text-lg">
              Book a bike, auto or car in just a few taps. Need a vehicle for
              longer? Explore flexible rental options with Raahi.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                className="group h-[52px] rounded-2xl bg-black px-7 text-sm font-extrabold text-white shadow-xl shadow-black/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-zinc-800"
              >
                Book a ride
                <span className="ml-2 inline-block text-[#C8FF00] transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </button>

              <button
                type="button"
                className="h-[52px] rounded-2xl border border-zinc-200 bg-white/80 px-7 text-sm font-extrabold text-zinc-800 shadow-sm backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-400 hover:bg-white"
              >
                Explore rentals
              </button>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3">
              <div className="flex items-center gap-2.5 text-sm font-medium text-zinc-500">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#C8FF00] text-black">
                  <ShieldCheck size={15} strokeWidth={2.5} />
                </span>
                Verified drivers
              </div>

              <div className="flex items-center gap-2.5 text-sm font-medium text-zinc-500">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-[#C8FF00]">
                  <Star size={14} fill="currentColor" />
                </span>
                4.8+ rated rides
              </div>

              <div className="flex items-center gap-2.5 text-sm font-medium text-zinc-500">
                <span className="h-2 w-2 rounded-full bg-[#C8FF00]" />
                Quick & reliable
              </div>
            </div>

            <div className="mt-10 hidden items-center gap-3 sm:flex">
              <div className="flex -space-x-2">
                <div className="h-8 w-8 rounded-full border-2 border-[#F4F4F1] bg-zinc-800" />
                <div className="h-8 w-8 rounded-full border-2 border-[#F4F4F1] bg-zinc-500" />
                <div className="h-8 w-8 rounded-full border-2 border-[#F4F4F1] bg-zinc-300" />
              </div>

              <p className="text-xs font-semibold text-zinc-500">
                Trusted by riders across the city
              </p>
            </div>
          </div>

          <div className="relative w-full lg:justify-self-end">
            <BookingCard />
          </div>
        </div>
      </div>
    </section>
  );
}
