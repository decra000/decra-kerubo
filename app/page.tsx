import { Hero } from "@/components/home/Hero";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { InsightsPreview } from "@/components/home/InsightsPreview";
import { AboutPreview } from "@/components/home/AboutPreview";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <InsightsPreview />
      <AboutPreview />
      <FinalCTA />
    </>
  );
}
