import { db } from "@/db";
import { announcements } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Announcements from "@/components/Announcements";
import Link from "next/link";

export const metadata = {
  title: "Ogłoszenia Parafialne | Parafia Doruchów",
  description: "Pełne archiwum ogłoszeń parafialnych i komunikatów duszpasterskich Parafii pw. św. Stanisława Kostki w Doruchowie.",
};

export const revalidate = 0;

export default async function OgloszeniaPage() {
  const allAnnouncements = await db
    .select()
    .from(announcements)
    .where(eq(announcements.isPublished, 1))
    .orderBy(desc(announcements.createdAt));

  return (
    <>
      <Navigation />
      <main style={{ minHeight: "100vh", paddingTop: "120px" }}>
        <div className="container" style={{ marginBottom: "16px" }}>
          <Link href="/" className="text-link">
            ← Strona główna
          </Link>
        </div>
        <Announcements announcements={allAnnouncements} enablePagination={true} />
      </main>
      <Footer />
    </>
  );
}
