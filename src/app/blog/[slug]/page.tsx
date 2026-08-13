import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";
import Link from "next/link";
import BlogPostGallery from "@/components/BlogPostGallery";
import { getStoreData } from "@/lib/store";

export const revalidate = 0;

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props) {
  const store = await getStoreData();
  const post = store.blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return { title: "Wpis nie znaleziony | Parafia Doruchów" };
  }

  return {
    title: `${post.title} | Parafia Doruchów`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const store = await getStoreData();
  const post = store.blogPosts.find((p) => p.slug === params.slug);

  if (!post || !post.isPublished) {
    notFound();
  }

  let gallery: string[] = [];
  try {
    gallery = JSON.parse(post.galleryImages || "[]");
  } catch {
    gallery = [];
  }

  return (
    <>
      <Navigation />
      <main style={{ minHeight: "100vh", paddingTop: "120px", paddingBottom: "88px" }}>
        <article className="container" style={{ maxWidth: "800px" }}>
          <Link
            href="/blog"
            style={{
              display: "inline-block",
              marginBottom: "24px",
              fontSize: "14px",
              color: "var(--ash)",
            }}
          >
            ← Powrót do artykułów
          </Link>

          <p className="eyebrow">{post.date}</p>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", margin: "0 0 24px", lineHeight: 1.15 }}>
            {post.title}
          </h1>

          <div
            style={{
              width: "100%",
              height: "400px",
              borderRadius: "var(--radius-large)",
              overflow: "hidden",
              marginBottom: "40px",
            }}
          >
            <img
              src={post.coverImage}
              alt={post.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          <div
            style={{
              fontSize: "18px",
              lineHeight: 1.8,
              color: "var(--graphite)",
              whiteSpace: "pre-wrap",
            }}
          >
            {post.content}
          </div>

          {/* GALLERY OF PHOTOS WITH PAGINATION */}
          <BlogPostGallery images={gallery} />
        </article>
      </main>
      <Footer />
    </>
  );
}
