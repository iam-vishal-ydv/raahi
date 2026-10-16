import { ArrowUpRight, Bike, CalendarRange, CarFront, Zap } from "lucide-react";

export default function RideCategories() {
  return (
    <section
      id="rides"
      className="border-y border-black/[0.07] bg-white py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div className="mb-3 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#C8FF00]" />

              <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-zinc-500">
                One app. Every journey.
              </p>
            </div>

            <h2 className="text-3xl font-extrabold tracking-[-0.05em] text-zinc-950 sm:text-4xl lg:text-[42px]">
              Choose how you want
              <span className="block">
                to <span className="text-zinc-500">move.</span>
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-6 text-zinc-500 sm:text-base">
              From quick city rides to longer rentals, Raahi gives you flexible
              options that fit your journey.
            </p>
          </div>

          <button
            type="button"
            className="group hidden items-center gap-2 text-sm font-bold text-zinc-700 transition hover:text-black sm:flex"
          >
            Explore all rides
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white transition-all duration-200 group-hover:border-black group-hover:bg-black group-hover:text-white">
              <ArrowUpRight size={15} />
            </span>
          </button>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <CategoryCard
            icon={<Bike size={24} strokeWidth={1.8} />}
            number="01"
            title="Bike"
            description="Beat the traffic and reach faster."
          />

          <CategoryCard
            icon={<CarFront size={24} strokeWidth={1.8} />}
            number="02"
            title="Auto"
            description="Affordable rides for everyday travel."
          />

          <CategoryCard
            icon={<CarFront size={24} strokeWidth={1.8} />}
            number="03"
            title="Car"
            description="Comfortable rides for every occasion."
          />

          <CategoryCard
            icon={<CalendarRange size={24} strokeWidth={1.8} />}
            number="04"
            title="Rentals"
            description="Keep a vehicle for hours or days."
            accent
          />
        </div>
      </div>
    </section>
  );
}

function CategoryCard({
  icon,
  number,
  title,
  description,
  accent = false,
}: {
  icon: React.ReactNode;
  number: string;
  title: string;
  description: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-[22px] border p-5 transition-all duration-300 hover:-translate-y-1 ${
        accent
          ? "border-[#C8FF00]/40 bg-[#C8FF00]/[0.07] hover:border-[#C8FF00]/70 hover:bg-[#C8FF00]/[0.12]"
          : "border-zinc-200/80 bg-zinc-50/60 hover:border-zinc-300 hover:bg-white"
      } hover:shadow-[0_18px_40px_rgba(0,0,0,0.08)]`}
    >
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#C8FF00]/10 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex items-start justify-between">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-105 ${
            accent
              ? "bg-[#C8FF00] text-black shadow-[0_8px_20px_rgba(200,255,0,0.2)]"
              : "bg-black text-white group-hover:bg-[#C8FF00] group-hover:text-black"
          }`}
        >
          {icon}
        </div>

        <span className="text-[10px] font-extrabold tracking-[0.12em] text-zinc-300">
          {number}
        </span>
      </div>

      <div className="relative mt-7">
        <h3 className="text-[17px] font-extrabold tracking-[-0.02em] text-zinc-950">
          {title}
        </h3>

        <p className="mt-2 min-h-[48px] text-sm leading-6 text-zinc-500">
          {description}
        </p>
      </div>

      <div className="relative mt-5 flex items-center justify-between border-t border-black/[0.06] pt-4">
        <span className="text-xs font-bold text-zinc-500 transition-colors group-hover:text-black">
          Explore
        </span>

        <span
          className={`flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ${
            accent
              ? "bg-black text-white"
              : "bg-white text-zinc-700 shadow-sm group-hover:bg-black group-hover:text-white"
          }`}
        >
          <ArrowUpRight
            size={15}
            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </span>
      </div>
    </div>
  );
}
