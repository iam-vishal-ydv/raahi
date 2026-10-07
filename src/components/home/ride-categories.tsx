import { ArrowRight, Bike, Car } from "lucide-react";

export default function RideCategories() {
  return (
    <section
      id="rides"
      className="border-y border-zinc-200/70 bg-white py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-[#6D28D9]">
            One app. Every journey.
          </p>

          <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.04em] sm:text-4xl">
            Choose the way you want to move.
          </h2>

          <p className="mt-4 text-sm leading-6 text-zinc-500 sm:text-base">
            From quick city rides to longer rentals, Raahi gives you options
            that fit your journey.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <CategoryCard
            icon={<Bike />}
            title="Bike"
            description="Beat the traffic and reach faster."
          />

          <CategoryCard
            icon={<Car />}
            title="Auto"
            description="Affordable rides for everyday travel."
          />

          <CategoryCard
            icon={<Car />}
            title="Car"
            description="Comfortable rides for every occasion."
          />

          <CategoryCard
            icon={<Car />}
            title="Rentals"
            description="Keep a car for hours or days."
            accent
          />
        </div>
      </div>
    </section>
  );
}

function CategoryCard({
  icon,
  title,
  description,
  accent = false,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  accent?: boolean;
}) {
  return (
    <div className="group cursor-pointer rounded-2xl border border-zinc-200 bg-white p-5 transition duration-200 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-100/50">
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-xl ${
          accent ? "bg-rose-100 text-[#FB7185]" : "bg-violet-100 text-[#6D28D9]"
        } transition group-hover:scale-105`}
      >
        {icon}
      </div>

      <h3 className="mt-5 text-base font-extrabold">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-zinc-500">{description}</p>

      <div className="mt-5 flex items-center gap-1 text-xs font-bold text-[#6D28D9]">
        Explore
        <ArrowRight
          size={14}
          className="transition group-hover:translate-x-1"
        />
      </div>
    </div>
  );
}
