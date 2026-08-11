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
];
