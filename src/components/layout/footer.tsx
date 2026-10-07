import logo from "@/assets/logo.png";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#18181B] text-white">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <Image
                src={logo}
                alt="Raahi"
                width={110}
                height={42}
                className="h-auto w-[100px] object-contain"
              />
            </div>

            <p className="mt-4 max-w-sm text-sm leading-6 text-zinc-400">
              Your everyday mobility companion. Book a bike, auto or car, or
              rent a vehicle for your journey.
            </p>
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

        <div className="mt-12 flex flex-col gap-4 border-t border-zinc-800 pt-6 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Raahi. All rights reserved.</p>

          <p>Your journey, your way.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h3 className="text-sm font-bold">{title}</h3>

      <div className="mt-4 space-y-3 text-sm text-zinc-400">
        {links.map((link) => (
          <a key={link} href="#" className="block transition hover:text-white">
            {link}
          </a>
        ))}
      </div>
    </div>
  );
}
