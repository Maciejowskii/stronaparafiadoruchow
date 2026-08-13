import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Announcements from "@/components/Announcements";
import Link from "next/link";
import { getStoreData } from "@/lib/store";

export const revalidate = 0;

export const metadata = {
  title: "Ogłoszenia Parafialne | Parafia Doruchów",
  description: "Ogłoszenia duszpasterskie parafii pw. św. Stanisława Kostki w Doruchowie.",
};

export default async function OgloszeniaPage() {
  const store = await getStoreData();
  const publishedAnnouncements = store.announcements.filter((a) => Boolean(a.isPublished));

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
          <Announcements announcements={publishedAnnouncements} enablePagination={true} />
        </div>
      </main>
      <Footer />
    </>
  );
}
