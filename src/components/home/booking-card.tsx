import { Bike, Car, MapPin, Navigation, Search } from "lucide-react";

export default function BookingCard() {
  return (
    <div className="relative mx-auto w-full ">
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#C8FF00]/20 blur-3xl" />

      <div className="relative overflow-hidden rounded-[26px] border border-black/[0.08] bg-white/90 p-4 shadow-[0_20px_55px_rgba(0,0,0,0.1)] backdrop-blur-2xl sm:p-5">
        <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-[#C8FF00]/10 blur-3xl" />

        <div className="relative mb-4">
          <div className="mb-1.5 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#C8FF00]" />

            <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-zinc-500">
              Book a ride
            </p>
          </div>

          <h2 className="text-[22px] font-extrabold tracking-[-0.04em] text-zinc-950">
            Where are you going?
          </h2>

          <p className="mt-1 text-[11px] font-medium text-zinc-500">
            Your ride, just a few taps away.
          </p>
        </div>

        <div className="relative space-y-2">
          <LocationInput
            icon={<MapPin size={16} strokeWidth={2.3} />}
            label="Pickup location"
            placeholder="Enter pickup point"
          />

          <div className="ml-[19px] h-2 border-l border-dashed border-zinc-300" />

          <LocationInput
            icon={<Navigation size={16} strokeWidth={2.3} />}
            label="Destination"
            placeholder="Where do you want to go?"
            destination
          />
        </div>

        <div className="mt-5">
          <div className="mb-2.5 flex items-center justify-between">
            <div>
              <span className="text-sm font-extrabold text-zinc-950">
                Choose your ride
              </span>

              <p className="mt-0.5 text-[10px] font-medium text-zinc-400">
                Pick what suits you
              </p>
            </div>

            <button
              type="button"
              className="text-[11px] font-bold text-zinc-500 transition hover:text-black"
            >
              View all →
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <RideOption
              icon={<Bike size={19} strokeWidth={2} />}
              title="Bike"
              price="₹49"
              active
            />

            <RideOption
              icon={<Car size={19} strokeWidth={2} />}
              title="Auto"
              price="₹79"
            />

            <RideOption
              icon={<Car size={19} strokeWidth={2} />}
              title="Car"
              price="₹129"
            />
          </div>
        </div>

        <button
          type="button"
          className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-black text-sm font-extrabold text-white shadow-[0_8px_20px_rgba(0,0,0,0.14)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-zinc-800 active:translate-y-0"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#C8FF00] text-black">
            <Search size={14} strokeWidth={2.5} />
          </span>
          Find a ride
        </button>

        <div className="mt-3 flex items-center justify-between rounded-xl border border-[#C8FF00]/30 bg-[#C8FF00]/10 px-3.5 py-2.5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#C8FF00] text-black">
              <Car size={15} strokeWidth={2.2} />
            </div>

            <div>
              <p className="text-[11px] font-extrabold text-zinc-900">
                Need a car longer?
              </p>

              <p className="mt-0.5 text-[10px] font-medium text-zinc-500">
                Explore daily rentals
              </p>
            </div>
          </div>

          <button
            type="button"
            className="text-[11px] font-extrabold text-zinc-900 transition hover:translate-x-0.5"
          >
            Explore →
          </button>
        </div>
      </div>
    </div>
  );
}

function LocationInput({
  icon,
  label,
  placeholder,
  destination = false,
}: {
  icon: React.ReactNode;
  label: string;
  placeholder: string;
  destination?: boolean;
}) {
  return (
    <div className="group flex items-center gap-3 rounded-xl border border-zinc-200 bg-zinc-50/80 px-3 py-2.5 transition-all duration-200 hover:border-zinc-300 hover:bg-white hover:shadow-[0_5px_18px_rgba(0,0,0,0.05)]">
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition ${
          destination ? "bg-black text-[#C8FF00]" : "bg-[#C8FF00] text-black"
        }`}
      >
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[8px] font-extrabold uppercase tracking-[0.12em] text-zinc-400">
          {label}
        </p>

        <p className="mt-0.5 truncate text-[13px] font-bold text-zinc-800">
          {placeholder}
        </p>
      </div>

      <div
        className={`h-2 w-2 shrink-0 rounded-full ${
          destination ? "bg-black" : "bg-[#C8FF00]"
        }`}
      />
    </div>
  );
}

function RideOption({
  icon,
  title,
  price,
  active = false,
}: {
  icon: React.ReactNode;
  title: string;
  price: string;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      className={`relative rounded-xl border p-2.5 text-left transition-all duration-200 ${
        active
          ? "border-black bg-black text-white shadow-[0_7px_18px_rgba(0,0,0,0.13)]"
          : "border-zinc-200 bg-white text-zinc-600 hover:-translate-y-0.5 hover:border-zinc-400 hover:shadow-[0_7px_18px_rgba(0,0,0,0.06)]"
      }`}
    >
      <div className="flex items-center justify-between">
        <span
          className={
            active
              ? "flex h-7 w-7 items-center justify-center rounded-lg bg-[#C8FF00] text-black"
              : "flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-100 text-zinc-700"
          }
        >
          {icon}
        </span>

        {active && (
          <span className="h-1.5 w-1.5 rounded-full bg-[#C8FF00] shadow-[0_0_7px_rgba(200,255,0,0.7)]" />
        )}
      </div>

      <p
        className={`mt-2 text-[11px] font-extrabold ${
          active ? "text-white" : "text-zinc-800"
        }`}
      >
        {title}
      </p>

      <p className="mt-0.5 text-[10px] font-medium text-zinc-400">
        From {price}
      </p>
    </button>
  );
}
