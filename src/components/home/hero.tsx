import { ShieldCheck, Sparkles, Star } from "lucide-react";

import BookingCard from "./booking-card";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-violet-200/40 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-rose-200/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-12 lg:px-8 lg:pb-24 lg:pt-20">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_460px]">
          {/* Content */}
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3.5 py-2 text-xs font-bold text-violet-700">
              <Sparkles size={14} />
              Your journey, your way
            </div>

            <h1 className="text-[42px] font-extrabold leading-[1.08] tracking-[-0.055em] text-zinc-950 sm:text-5xl lg:text-[64px]">
              Move around the city,
              <span className="block text-[#6D28D9]">your way.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-zinc-500 sm:text-lg">
              Book a bike, auto or car in just a few taps. Need a vehicle for
              longer? Explore our flexible rental options with Raahi.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button className="h-13 rounded-xl bg-[#6D28D9] px-7 text-sm font-bold text-white shadow-xl shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-[#5B21B6]">
                Book a ride →
              </button>

              <button className="h-13 rounded-xl border border-zinc-200 bg-white px-7 text-sm font-bold text-zinc-700 transition hover:border-violet-200 hover:bg-violet-50 hover:text-[#6D28D9]">
                Explore rentals
              </button>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3">
              <div className="flex items-center gap-2 text-sm text-zinc-500">
                <ShieldCheck size={17} className="text-emerald-500" />
                Verified drivers
              </div>

              <div className="flex items-center gap-2 text-sm text-zinc-500">
                <Star size={17} fill="#FB7185" className="text-[#FB7185]" />
                4.8+ rated rides
              </div>
            </div>
          </div>

          <BookingCard />
        </div>
      </div>
    </section>
  );
}
