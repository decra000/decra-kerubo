import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { engineeringProjects } from "@/lib/engineering-projects";
import { SERVICE_GROUPS } from "@/lib/services";

// Only URLs that return 200 belong here. /about, /contact, /talk, /insights
// and /case-studies are redirect() stubs pointing at homepage anchors, and
// listing them was telling Google to crawl five redirects — which is what
// Search Console kept reporting as "Page with redirect". /engineering and
// /partner are real pages that were missing instead.
const routes: { path: string; priority: number; changeFrequency: "weekly" | "monthly" }[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/engineering", priority: 0.8, changeFrequency: "monthly" },
  { path: "/partner", priority: 0.7, changeFrequency: "monthly" },
  { path: "/start", priority: 0.7, changeFrequency: "monthly" },
  { path: "/book", priority: 0.7, changeFrequency: "monthly" },
  { path: "/the-1000", priority: 0.7, changeFrequency: "weekly" },
  { path: "/entrora", priority: 0.6, changeFrequency: "monthly" },
  { path: "/art", priority: 0.5, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticEntries = routes.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));

  // One page per lifecycle stage. These carry the service names people
  // actually search for, so they matter more than most of the static list.
  const stageEntries = SERVICE_GROUPS.map((g) => ({
    url: `${SITE_URL}/services/${g.id}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Each project has its own page and its own canonical, so each is worth
  // crawling in its own right rather than only via the grid.
  const projectEntries = engineeringProjects
    .filter((p) => p.slug)
    .map((p) => ({
      url: `${SITE_URL}/engineering/${p.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  return [...staticEntries, ...stageEntries, ...projectEntries];
}
