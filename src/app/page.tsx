import { db } from "@/db";
import { announcements, blogPosts, siteSettings } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import QuickInfo from "@/components/QuickInfo";
import MassSchedule from "@/components/MassSchedule";
import Announcements from "@/components/Announcements";
import AtmosphericSection from "@/components/AtmosphericSection";
import BlogGrid from "@/components/BlogGrid";
import PriestSection from "@/components/PriestSection";
import AboutSection from "@/components/AboutSection";
import OfficeSection from "@/components/OfficeSection";
import Footer from "@/components/Footer";
import OfficeAlertBanner from "@/components/OfficeAlertBanner";

export const revalidate = 0; // ISR / Server render fresh settings

export default async function HomePage() {
  // Fetch data
  const publishedAnnouncements = await db
    .select()
    .from(announcements)
    .where(eq(announcements.isPublished, 1))
    .orderBy(desc(announcements.createdAt));

  const publishedBlogPosts = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.isPublished, 1))
    .orderBy(desc(blogPosts.createdAt));

  const settingsRows = await db.select().from(siteSettings);
  const settings: Record<string, any> = {};

  for (const row of settingsRows) {
    try {
      settings[row.key] = JSON.parse(row.value);
    } catch {
      settings[row.key] = row.value;
    }
  }

  return (
    <>
      <OfficeAlertBanner vacationInfo={settings.office_vacation} />
      <Navigation hasBanner={Boolean(settings.office_vacation?.enabled)} />
      <main>
        <Hero />
        <QuickInfo />
        <MassSchedule schedule={settings.mass_schedule} />
        <Announcements announcements={publishedAnnouncements} limit={3} showMoreBtn={true} />
        <AtmosphericSection />
        <BlogGrid posts={publishedBlogPosts} limit={3} showMoreBtn={true} />
        <PriestSection priest={settings.priest_info} />
        <AboutSection />
        <OfficeSection
          officeHours={settings.office_hours}
          vacationInfo={settings.office_vacation}
          contactInfo={settings.contact_info}
        />
      </main>
      <Footer />
    </>
  );
}
