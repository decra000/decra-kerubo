"use client";
import { useState } from "react";
import { IntentPopup } from "@/components/home/IntentPopup";
import { Hero } from "@/components/home/Hero";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { Collaborators } from "@/components/home/Collaborators";
import { AlsoBuilding } from "@/components/home/AlsoBuilding";
import { BookingCTA } from "@/components/home/BookingCTA";

type Intent = "legal" | "founder" | "exploring" | null;

export default function Home() {
  const [intent, setIntent] = useState<Intent>(null);
  const [popupDone, setPopupDone] = useState(false);

  const handleIntent = (i: Intent) => {
    setIntent(i);
    setPopupDone(true);
  };

  return (
    <>
      {!popupDone && <IntentPopup onSelect={handleIntent} />}
      <Hero intent={intent} />
      <Collaborators />
      <ServicesPreview intent={intent} />
      <AlsoBuilding />
      <BookingCTA />
    </>
  );
}
