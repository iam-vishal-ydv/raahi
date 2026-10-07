import Hero from "@/components/home/hero";
import RideCategories from "@/components/home/ride-categories";
import WhyRaahi from "@/components/home/why-raahi";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <RideCategories />
        <WhyRaahi />
      </main>

      <Footer />
    </>
  );
}
