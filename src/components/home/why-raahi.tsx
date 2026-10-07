import { ShieldCheck } from "lucide-react";

export default function WhyRaahi() {
  return (
    <section id="about" className="bg-[#FAFAFF] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-[#6D28D9]">
              Why Raahi
            </p>

            <h2 className="mt-3 max-w-lg text-3xl font-extrabold tracking-[-0.04em] sm:text-4xl">
              Simple rides.
              <span className="block text-[#6D28D9]">Better journeys.</span>
            </h2>

            <p className="mt-5 max-w-lg text-sm leading-7 text-zinc-500 sm:text-base">
              We are building a mobility experience that makes getting around
              easier, safer and more convenient.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Feature
              title="Quick booking"
              description="Find and book your ride in just a few taps."
            />

            <Feature
              title="Verified drivers"
              description="Ride with verified and trusted drivers."
            />

            <Feature
              title="Transparent pricing"
              description="Know your estimated fare before you ride."
            />

            <Feature
              title="Flexible rentals"
              description="Rent vehicles for hours, days or longer."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Feature({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5">
      <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-violet-100 text-[#6D28D9]">
        <ShieldCheck size={18} />
      </div>

      <h3 className="text-sm font-extrabold">{title}</h3>

      <p className="mt-2 text-xs leading-5 text-zinc-500">{description}</p>
    </div>
  );
}
