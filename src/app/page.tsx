import Hero from "@/components/home/Hero";
import HomeMenu from "@/components/home/HomeMenu";
import AboutSection from "@/components/home/AboutSection";

// Pastikan TIDAK ADA <Header /> di sini
export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <AboutSection />
    </>
  );
}
