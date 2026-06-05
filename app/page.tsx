import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { AboutPreview } from "@/components/home/AboutPreview";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { InsightsPreview } from "@/components/home/InsightsPreview";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <AboutPreview />
      <ServicesPreview />
      <InsightsPreview />
      <NewsletterSection />
      <FinalCTA />
    </>
  );
}
