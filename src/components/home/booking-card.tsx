import { Bike, Car, MapPin, Navigation, Search } from "lucide-react";

export default function BookingCard() {
  return (
    <div className="relative mx-auto w-full max-w-[440px]">
      <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-[#FB7185]/20 blur-xl" />

      <div className="relative rounded-[28px] border border-zinc-200/80 bg-white p-5 shadow-[0_25px_70px_rgba(24,24,27,0.10)] sm:p-6">
        <div className="mb-6">
          <p className="text-xs font-bold uppercase tracking-wider text-[#6D28D9]">
            Book a ride
          </p>

          <h2 className="mt-1 text-xl font-extrabold tracking-tight">
            Where are you going?
          </h2>
        </div>

        {/* Location */}
        <div className="space-y-3">
          <LocationInput
            icon={<MapPin size={17} />}
            label="Pickup location"
            placeholder="Enter pickup point"
          />

          <LocationInput
            icon={<Navigation size={17} />}
            label="Destination"
            placeholder="Where do you want to go?"
          />
        </div>

        {/* Ride types */}
        <div className="mt-6">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-bold">Choose your ride</span>

            <button className="text-xs font-semibold text-[#6D28D9]">
              View all
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <RideOption
              icon={<Bike size={21} />}
              title="Bike"
              price="₹49"
              active
            />

            <RideOption icon={<Car size={21} />} title="Auto" price="₹79" />

            <RideOption icon={<Car size={21} />} title="Car" price="₹129" />
          </div>
        </div>

        {/* Search */}
        <button className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#6D28D9] text-sm font-bold text-white shadow-lg shadow-violet-200 transition hover:bg-[#5B21B6]">
          <Search size={17} />
          Find a ride
        </button>

        {/* Rental */}
        <div className="mt-4 flex items-center justify-between rounded-xl bg-[#FFF1F2] px-4 py-3">
          <div>
            <p className="text-xs font-bold text-[#BE123C]">
              Need a car longer?
            </p>

            <p className="mt-0.5 text-[11px] text-zinc-500">
              Explore daily rentals
            </p>
          </div>

          <button className="text-xs font-bold text-[#E11D48]">
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
}: {
  icon: React.ReactNode;
  label: string;
  placeholder: string;
}) {
  return (
    <div className="group flex items-center gap-3 rounded-xl border border-zinc-200 bg-zinc-50/70 px-3.5 py-3 transition hover:border-violet-200 hover:bg-violet-50/30">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-[#6D28D9]">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-bold uppercase tracking-wide text-zinc-400">
          {label}
        </p>

        <p className="mt-0.5 truncate text-sm font-semibold text-zinc-700">
          {placeholder}
        </p>
      </div>
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
      className={`rounded-xl border p-3 text-left transition ${
        active
          ? "border-[#6D28D9] bg-violet-50 text-[#6D28D9]"
          : "border-zinc-200 bg-white text-zinc-600 hover:border-violet-200 hover:bg-violet-50/50"
      }`}
    >
      <div className="flex items-center justify-between">
        <span>{icon}</span>

        {active && <span className="h-1.5 w-1.5 rounded-full bg-[#FB7185]" />}
      </div>

      <p className="mt-3 text-xs font-bold">{title}</p>

      <p className="mt-0.5 text-[11px] text-zinc-400">From {price}</p>
    </button>
  );
}
