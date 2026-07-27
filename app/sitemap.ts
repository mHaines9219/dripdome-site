import { MetadataRoute } from "next";
import { blogPosts } from "./blog/data";

// Redesign launch date. Bump per-route when a page meaningfully changes;
// a constantly-churning lastModified teaches crawlers to ignore the field.
const REDESIGN_DATE = new Date("2026-07-11");

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.dripdome.com";

  // Static pages with their priorities and change frequencies.
  // Archive routes (/portfolio, /services, /rentals, /video-photo) are
  // linked only from the footer, so they carry demoted priorities.
  const routes = [
    {
      path: "",
      priority: 1.0,
      changeFrequency: "weekly" as const,
      lastModified: REDESIGN_DATE,
    },
    {
      path: "/about-us",
      priority: 0.8,
      changeFrequency: "monthly" as const,
      lastModified: REDESIGN_DATE,
    },
    {
      path: "/podcast-studios",
      priority: 0.9,
      changeFrequency: "monthly" as const,
      lastModified: REDESIGN_DATE,
    },
    {
      path: "/brand-activations",
      priority: 0.9,
      changeFrequency: "monthly" as const,
      lastModified: REDESIGN_DATE,
    },
    {
      path: "/interior-office-design",
      priority: 0.9,
      changeFrequency: "monthly" as const,
      lastModified: REDESIGN_DATE,
    },
    {
      path: "/blog",
      priority: 0.8,
      changeFrequency: "weekly" as const,
      lastModified: REDESIGN_DATE,
    },
    {
      path: "/portfolio",
      priority: 0.5,
      changeFrequency: "monthly" as const,
      lastModified: REDESIGN_DATE,
    },
    {
      path: "/services",
      priority: 0.5,
      changeFrequency: "monthly" as const,
      lastModified: REDESIGN_DATE,
    },
    {
      path: "/rentals",
      priority: 0.4,
      changeFrequency: "monthly" as const,
      lastModified: REDESIGN_DATE,
    },
    {
      path: "/video-photo",
      priority: 0.3,
      changeFrequency: "monthly" as const,
      lastModified: REDESIGN_DATE,
    },
    {
      path: "/privacy",
      priority: 0.3,
      changeFrequency: "yearly" as const,
      lastModified: new Date("2025-01-01"),
    },
  ];

  const staticPages = routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: route.lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const blogPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedDate || post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages];
}
