import type { MetadataRoute } from "next";

const SITE_URL = "https://decrakerubo.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/services",
    "/case-studies",
    "/insights",
    "/contact",
    "/talk",
    "/start",
    "/book",
    "/the-1000",
    "/entrora",
  ];

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
