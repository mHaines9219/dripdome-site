import { MetadataRoute } from "next";
import { blogPosts } from "./blog/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.dripdome.com";

  // Static pages with their priorities and change frequencies
  const routes = [
    {
      path: "",
      priority: 1.0,
      changeFrequency: "weekly" as const,
    },
    {
      path: "/about-us",
      priority: 0.8,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/portfolio",
      priority: 0.9,
      changeFrequency: "weekly" as const,
    },
    {
      path: "/services",
      priority: 0.9,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/brand-activations",
      priority: 0.9,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/podcast-studios",
      priority: 0.9,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/video-photo",
      priority: 0.7,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/rentals",
      priority: 0.8,
      changeFrequency: "weekly" as const,
    },
    {
      path: "/blog",
      priority: 0.8,
      changeFrequency: "weekly" as const,
    },
    {
      path: "/privacy",
      priority: 0.3,
      changeFrequency: "yearly" as const,
    },
  ];

  const staticPages = routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
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
