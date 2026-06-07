import { Hero } from "@/components/home/Hero";
import { StatsBar } from "@/components/home/StatsBar";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { InsightsPreview } from "@/components/home/InsightsPreview";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <ServicesPreview />
      <InsightsPreview />
      <FinalCTA />
    </>
  );
}
