import { config } from "@/config";
import type { MetadataRoute } from "next";
import urlJoin from "url-join";

const staticPaths = [
  { path: "about", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "services", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "gallery", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "hire-us", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "why-hire-us", priority: 0.8, changeFrequency: "monthly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = staticPaths.map((item) => ({
    url: urlJoin(config.baseUrl, item.path),
    lastModified: new Date(),
    priority: item.priority,
    changeFrequency: item.changeFrequency,
  }));
  return paths;
}
