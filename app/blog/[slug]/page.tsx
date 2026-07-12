import { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts, getPostBySlug } from "../data";
import BlogPostContent from "./BlogPostContent";
import Footer from "../../ui/Footer";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} | DripDome Blog`,
    description: post.excerpt,
    keywords: post.tags.join(", "),
    alternates: {
      canonical: `https://www.dripdome.com/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://www.dripdome.com/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updatedDate || post.date,
      authors: [post.author.name],
      tags: post.tags,
      locale: "en_US",
      siteName: "DripDome",
      images: [
        {
          url: post.image.url,
          width: post.image.width,
          height: post.image.height,
          alt: post.image.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image.url],
    },
  };
}

function BlogPostingJsonLd({ slug }: { slug: string }) {
  const post = getPostBySlug(slug);
  if (!post) return null;

  const wordCount = post.content.split(/\s+/).length;

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.updatedDate || post.date,
    author: {
      "@type": "Person",
      name: post.author.name,
      ...(post.author.role && { jobTitle: post.author.role }),
    },
    publisher: {
      "@type": "Organization",
      name: "DripDome",
      logo: {
        "@type": "ImageObject",
        url: "https://dripdome-site.s3.us-east-2.amazonaws.com/dripdome_logo.png",
      },
    },
    image: {
      "@type": "ImageObject",
      url: post.image.url,
      width: post.image.width,
      height: post.image.height,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.dripdome.com/blog/${post.slug}`,
    },
    wordCount,
    articleSection: post.category,
    keywords: post.tags.join(", "),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.dripdome.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://www.dripdome.com/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `https://www.dripdome.com/blog/${post.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <BlogPostingJsonLd slug={slug} />
      <BlogPostContent slug={slug} />
      <Footer />
    </>
  );
}
