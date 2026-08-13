import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BlogPostGallery from "@/components/BlogPostGallery";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const posts = await db.select().from(blogPosts).where(eq(blogPosts.slug, params.slug));
  if (!posts.length) return { title: "Nie znaleziono artykułu" };
  return {
    title: `${posts[0].title} | Parafia Doruchów`,
    description: posts[0].excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const posts = await db.select().from(blogPosts).where(eq(blogPosts.slug, params.slug));

  if (!posts.length) {
    notFound();
  }

  const post = posts[0];
  let gallery: string[] = [];
  try {
    gallery = JSON.parse(post.galleryImages || "[]");
  } catch {}

  return (
    <>
      <Navigation />
      <article style={{ minHeight: "100vh", paddingTop: "120px", paddingBottom: "88px" }}>
        <div className="container" style={{ maxWidth: "860px" }}>
          <Link
            href="/blog"
            className="text-link"
            style={{ marginBottom: "24px", display: "inline-flex" }}
          >
            ← Powrót do wydarzeń
          </Link>

          <p className="eyebrow" style={{ marginTop: "12px", marginBottom: "8px" }}>
            {post.date} · Wydarzenie w parafii
          </p>

          <h1
            style={{
              fontSize: "clamp(36px, 5vw, 54px)",
              lineHeight: 1.1,
              marginBottom: "24px",
              color: "var(--graphite)",
            }}
          >
            {post.title}
          </h1>

          <div
            style={{
              height: "460px",
              overflow: "hidden",
              borderRadius: "var(--radius-large)",
              marginBottom: "40px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
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
              color: "var(--charcoal)",
              whiteSpace: "pre-wrap",
              marginBottom: "48px",
            }}
          >
            {post.content}
          </div>

          {/* Paginated Lightbox Gallery */}
          <BlogPostGallery images={gallery} />
        </div>
      </article>
      <Footer />
    </>
  );
}
