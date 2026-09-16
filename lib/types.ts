export interface Booking {
  id?: string;
  name: string;
  email: string;
  organization?: string;
  website?: string;
  industry?: string;
  team_size?: string;
  primary_challenge: string;
  desired_outcome: string;
  consultation_type: string;
  scheduled_at: string;
  google_event_id?: string;
  meet_link?: string;
  status?: "pending" | "confirmed" | "cancelled";
  created_at?: string;
}

export interface Lead {
  id?: string;
  name: string;
  email: string;
  organization?: string;
  source: string;
  created_at?: string;
}

export interface Subscriber {
  id?: string;
  email: string;
  name?: string;
  created_at?: string;
}

export interface ConsultationType {
  id: string;
  label: string;
  duration: number;
  description: string;
  price: number; // KES. 0 = free.
}

export const CONSULTATION_TYPES: ConsultationType[] = [
  {
    id: "discovery",
    label: "Discovery",
    duration: 35,
    description: "A focused call to see if we're a fit, with priority scheduling.",
    price: 3000,
  },
  {
    id: "lpms-demo",
    label: "LPMS Demo",
    duration: 30,
    description: "A walkthrough of the Legal Practice Management System.",
    price: 0,
  },
];

/** Shared booking time slots (East Africa Time), used by /book and any inline booking form. */
export const TIME_SLOTS: { label: string; value: string }[] = [
  { label: "09:00 AM", value: "09:00" },
  { label: "10:00 AM", value: "10:00" },
  { label: "11:00 AM", value: "11:00" },
  { label: "02:00 PM", value: "14:00" },
  { label: "03:00 PM", value: "15:00" },
  { label: "04:00 PM", value: "16:00" },
];
export const timeSlotLabel = (value: string) => TIME_SLOTS.find(s => s.value === value)?.label || value;
