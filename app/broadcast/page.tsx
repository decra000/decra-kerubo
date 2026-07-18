import { redirect } from "next/navigation";

// The broadcast tool now lives inside the admin dashboard, as its own tab.
export default function BroadcastPage() {
  redirect("/admin");
}
