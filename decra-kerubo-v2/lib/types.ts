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
}

export const CONSULTATION_TYPES: ConsultationType[] = [
  {
    id: "discovery",
    label: "Discovery Call",
    duration: 15,
    description: "A quick call to understand your needs and explore how I can help.",
  },
  {
    id: "strategy",
    label: "Strategy Session",
    duration: 30,
    description: "A focused session to map out a strategic direction for your challenge.",
  },
  {
    id: "advisory",
    label: "Advisory Consultation",
    duration: 60,
    description: "An in-depth consultation for complex challenges requiring detailed guidance.",
  },
  {
    id: "ai-strategy",
    label: "AI Strategy Consultation",
    duration: 60,
    description: "Deep dive into AI readiness, adoption strategy, and implementation planning.",
  },
  {
    id: "tech-law",
    label: "Technology Law Consultation",
    duration: 60,
    description: "Legal advisory on technology, IP, data privacy, and startup law.",
  },
  {
    id: "entrepreneurial-legal",
    label: "Entrepreneurial Legal Consultation",
    duration: 60,
    description: "Legal guidance for founders on incorporation, IP, tax structuring, and governance.",
  },
];
