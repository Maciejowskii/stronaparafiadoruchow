import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BlogGrid from "@/components/BlogGrid";
import Link from "next/link";

export const metadata = {
  title: "Wydarzenia i Blog | Parafia Doruchów",
  description: "Relacje, zdjęcia i wspomnienia z życia wspólnoty parafialnej w Doruchowie.",
};

export const revalidate = 0;

export default async function BlogPage() {
  const allBlogPosts = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.isPublished, 1))
    .orderBy(desc(blogPosts.createdAt));

  return (
    <>
      <Navigation />
      <main style={{ minHeight: "100vh", paddingTop: "120px" }}>
        <div className="container" style={{ marginBottom: "16px" }}>
          <Link href="/" className="text-link">
            ← Strona główna
          </Link>
        </div>
        <BlogGrid posts={allBlogPosts} enablePagination={true} />
      </main>
      <Footer />
    </>
  );
}
