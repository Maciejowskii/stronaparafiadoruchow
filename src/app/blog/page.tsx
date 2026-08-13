import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BlogGrid from "@/components/BlogGrid";
import Link from "next/link";
import { getStoreData } from "@/lib/store";

export const revalidate = 0;

export const metadata = {
  title: "Wydarzenia i Aktualności | Parafia Doruchów",
  description: "Aktualności i kronika wydarzeń z życia parafii św. Stanisława Kostki w Doruchowie.",
};

export default async function BlogPage() {
  const store = await getStoreData();
  const publishedBlogPosts = store.blogPosts.filter((p) => Boolean(p.isPublished));

  return (
    <>
      <Navigation />
      <main style={{ minHeight: "100vh", paddingTop: "120px", paddingBottom: "80px" }}>
        <div className="container">
          <div style={{ marginBottom: "32px" }}>
            <Link href="/" style={{ color: "var(--ash)", fontSize: "14px", marginBottom: "12px", display: "inline-block" }}>
              ← Powrót do strony głównej
            </Link>
          </div>
          <BlogGrid posts={publishedBlogPosts} enablePagination={true} />
        </div>
      </main>
      <Footer />
    </>
  );
}
