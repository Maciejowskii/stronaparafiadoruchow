import { db } from "./index";
import { announcements, blogPosts, siteSettings } from "./schema";
import { sql } from "drizzle-orm";

async function main() {
  console.log("Creating tables if not existing...");

  await db.run(sql`
    CREATE TABLE IF NOT EXISTS announcements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      date TEXT NOT NULL,
      content TEXT NOT NULL,
      is_published INTEGER NOT NULL DEFAULT 1,
      created_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now') * 1000)
    );
  `);

  await db.run(sql`
    CREATE TABLE IF NOT EXISTS blog_posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      date TEXT NOT NULL,
      excerpt TEXT NOT NULL,
      content TEXT NOT NULL,
      cover_image TEXT NOT NULL,
      gallery_images TEXT NOT NULL DEFAULT '[]',
      is_published INTEGER NOT NULL DEFAULT 1,
      created_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now') * 1000)
    );
  `);

  await db.run(sql`
    CREATE TABLE IF NOT EXISTS site_settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );
  `);

  console.log("Clearing demo sample data...");

  // Clear demo items
  await db.delete(announcements);
  await db.delete(blogPosts);
  await db.delete(siteSettings);

  // Settings
  await db.insert(siteSettings).values([
    {
      key: "mass_schedule",
      value: JSON.stringify([
        { location: "Kościół parafialny w Doruchowie", label: "Dni powszednie", times: ["18:00"] },
        { location: "Kościół parafialny w Doruchowie", label: "Niedziele i Święta", times: ["07:00", "08:30", "10:00", "11:30"] },
        { location: "Kościół filialny pw. św. Barbary w Bobrownikach", label: "Niedziele i Święta", times: ["09:15", "11:00"] }
      ]),
    },
    {
      key: "office_hours",
      value: JSON.stringify([
        { day: "Poniedziałek", hours: "16:00–17:00" },
        { day: "Środa", hours: "16:00–17:00" },
        { day: "Piątek", hours: "16:00–17:00" }
      ]),
    },
    {
      key: "office_vacation",
      value: JSON.stringify({
        enabled: false,
        title: "Powiadomienie Kancelarii Parafialnej",
        message: "W sprawach pilnych (np. pogrzeb, wezwanie do chorego) prosimy o kontakt telefoniczny po Mszy Świętej wieczornej.",
        period: "15 - 30 sierpnia 2026"
      }),
    },
    {
      key: "priest_info",
      value: JSON.stringify({
        name: "Ks. Ireneusz Powaga",
        title: "Proboszcz parafii",
        bio: "Duszpasterz naszej wspólnoty parafialnej w Doruchowie. Dba o rozwój duchowy parafian, opiekuje się zabytkowym kościołem oraz prowadzi duszpasterstwo dzieci, młodzieży i rodzin.",
        image: "/zdjecia/zzewnatrz5.jpg"
      }),
    },
    {
      key: "contact_info",
      value: JSON.stringify({
        phone: "+48 62 730 11 22",
        email: "kancelaria@parafia-doruchow.pl",
        address: "ul. Kępińska 1, 63-505 Doruchów"
      }),
    }
  ]);

  console.log("Database reset to clean state successfully!");
}

main().catch((err) => {
  console.error("Failed to seed database:", err);
  process.exit(1);
});
