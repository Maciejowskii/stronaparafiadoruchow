import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import QuickInfo from "@/components/QuickInfo";
import MassSchedule from "@/components/MassSchedule";
import Announcements from "@/components/Announcements";
import AtmosphericSection from "@/components/AtmosphericSection";
import BlogGrid from "@/components/BlogGrid";
import PriestSection from "@/components/PriestSection";
import AboutSection from "@/components/AboutSection";
import MediaSection from "@/components/MediaSection";
import OfficeSection from "@/components/OfficeSection";
import Footer from "@/components/Footer";
import OfficeAlertBanner from "@/components/OfficeAlertBanner";
import { getStoreData } from "@/lib/store";

export const revalidate = 0; // ISR / Server render fresh settings

export default async function HomePage() {
  const store = await getStoreData();

  const publishedAnnouncements = store.announcements.filter((a) => Boolean(a.isPublished));
  const publishedBlogPosts = store.blogPosts.filter((p) => Boolean(p.isPublished));
  const settings = store.siteSettings;

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
        <MediaSection />
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
