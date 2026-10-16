import { BadgeCheck, Banknote, Clock3, ShieldCheck } from "lucide-react";

export default function WhyRaahi() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#F4F4F1] py-16 lg:py-24"
    >
      <div className="pointer-events-none absolute -left-40 top-20 h-[400px] w-[400px] rounded-full bg-[#C8FF00]/10 blur-3xl" />

      <div className="pointer-events-none absolute -right-40 bottom-0 h-[350px] w-[350px] rounded-full bg-black/[0.035] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#C8FF00]" />

              <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-zinc-500">
                Why Raahi
              </p>
            </div>

            <h2 className="max-w-lg text-3xl font-extrabold tracking-[-0.05em] text-zinc-950 sm:text-4xl lg:text-[46px] lg:leading-[1.08]">
              Simple rides.
              <span className="mt-1 block text-zinc-500">Better journeys.</span>
            </h2>

            <p className="mt-5 max-w-lg text-sm leading-7 text-zinc-500 sm:text-base">
              We are building a mobility experience that makes getting around
              easier, safer and more convenient.
            </p>

            <div className="mt-7 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-[#C8FF00]">
                <ShieldCheck size={18} strokeWidth={2.2} />
              </div>

              <div>
                <p className="text-xs font-extrabold text-zinc-900">
                  Built around you
                </p>

                <p className="mt-0.5 text-[11px] text-zinc-500">
                  Simple, reliable and transparent.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Feature
              icon={<Clock3 size={19} strokeWidth={2} />}
              title="Quick booking"
              description="Find and book your ride in just a few taps."
              number="01"
            />

            <Feature
              icon={<BadgeCheck size={19} strokeWidth={2} />}
              title="Verified drivers"
              description="Ride with verified and trusted drivers."
              number="02"
            />

            <Feature
              icon={<Banknote size={19} strokeWidth={2} />}
              title="Transparent pricing"
              description="Know your estimated fare before you ride."
              number="03"
            />

            <Feature
              icon={<ShieldCheck size={19} strokeWidth={2} />}
              title="Flexible rentals"
              description="Rent vehicles for hours, days or longer."
              number="04"
              accent
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Feature({
  icon,
  title,
  description,
  number,
  accent = false,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  number: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-[20px] border p-5 transition-all duration-300 hover:-translate-y-1 ${
        accent
          ? "border-[#C8FF00]/40 bg-[#C8FF00]/[0.08] hover:border-[#C8FF00]/70 hover:bg-[#C8FF00]/[0.13]"
          : "border-black/[0.07] bg-white/80 hover:border-black/[0.14] hover:bg-white"
      } backdrop-blur-xl hover:shadow-[0_18px_40px_rgba(0,0,0,0.07)]`}
    >
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#C8FF00]/10 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex items-start justify-between">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-105 ${
            accent
              ? "bg-[#C8FF00] text-black"
              : "bg-black text-white group-hover:bg-[#C8FF00] group-hover:text-black"
          }`}
        >
          {icon}
        </div>

        <span className="text-[10px] font-extrabold tracking-[0.12em] text-zinc-300">
          {number}
        </span>
      </div>

      <h3 className="relative mt-5 text-sm font-extrabold text-zinc-950">
        {title}
      </h3>

      <p className="relative mt-2 text-xs leading-5 text-zinc-500">
        {description}
      </p>

      <div className="relative mt-4 h-1 w-8 overflow-hidden rounded-full bg-zinc-200 transition-all duration-300 group-hover:w-12">
        <div
          className={`h-full rounded-full ${
            accent ? "bg-black" : "bg-[#C8FF00]"
          }`}
        />
      </div>
    </div>
  );
}
