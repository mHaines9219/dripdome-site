import { Metadata } from "next";
import { blogPosts } from "./data";
import BlogContent from "./BlogContent";
import Footer from "../ui/Footer";

export const metadata: Metadata = {
  title: "Blog | DripDome - Set Design, Fabrication & Experiential Design Insights",
  description:
    "Insights from DripDome's production design studio — behind-the-scenes looks at set builds, fabrication techniques, pop-up activations, and experiential design in NYC and LA.",
  keywords:
    "set design blog, production design insights, fabrication techniques, pop-up activation tips, experiential design, brand activation, custom fabrication, NYC set design",
  alternates: {
    canonical: "https://www.dripdome.com/blog",
    types: {
      "application/rss+xml": "https://www.dripdome.com/blog/feed.xml",
    },
  },
  openGraph: {
    title: "Blog | DripDome - Set Design & Experiential Design Insights",
    description:
      "Behind-the-scenes looks at set builds, fabrication techniques, and experiential design from DripDome's production design studio.",
    url: "https://www.dripdome.com/blog",
    type: "website",
    locale: "en_US",
    siteName: "DripDome",
    images: [
      {
        url: "https://dripdome-site.s3.us-east-2.amazonaws.com/NLL/IMG_3.JPG",
        width: 1200,
        height: 630,
        alt: "DripDome Blog - Set Design, Fabrication & Experiential Design Insights",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | DripDome - Set Design & Experiential Design Insights",
    description:
      "Behind-the-scenes looks at set builds, fabrication techniques, and experiential design from DripDome's production design studio.",
    images: [
      "https://dripdome-site.s3.us-east-2.amazonaws.com/NLL/IMG_3.JPG",
    ],
  },
};

function BlogJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "DripDome Blog",
    description:
      "Insights from DripDome's production design studio — set builds, fabrication techniques, pop-up activations, and experiential design.",
    url: "https://www.dripdome.com/blog",
    publisher: {
      "@type": "Organization",
      name: "DripDome",
      logo: {
        "@type": "ImageObject",
        url: "https://dripdome-site.s3.us-east-2.amazonaws.com/dripdome_logo.png",
      },
    },
    blogPost: blogPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      url: `https://www.dripdome.com/blog/${post.slug}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function BlogPage() {
  return (
    <>
      <BlogJsonLd />
      <BlogContent />
      <Footer />
    </>
  );
}
