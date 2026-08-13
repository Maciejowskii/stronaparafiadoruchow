import { checkIsAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { announcements, blogPosts, siteSettings } from "@/db/schema";
import { desc } from "drizzle-orm";
import fs from "fs/promises";
import path from "path";
import AdminDashboardClient from "./AdminDashboardClient";

export default async function AdminPage() {
  const isAdmin = checkIsAdmin();
  if (!isAdmin) {
    redirect("/admin/login");
  }

  // Load data server-side
  const announcementsList = await db.select().from(announcements).orderBy(desc(announcements.createdAt));
  const blogPostsList = await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
  const settingsRows = await db.select().from(siteSettings);

  const settingsMap: Record<string, any> = {};
  for (const row of settingsRows) {
    try {
      settingsMap[row.key] = JSON.parse(row.value);
    } catch {
      settingsMap[row.key] = row.value;
    }
  }

  // Load available photos
  let photos: string[] = [];
  try {
    const dirPath = path.join(process.cwd(), "public", "zdjecia");
    const files = await fs.readdir(dirPath);
    photos = files
      .filter((f) => /\.(jpg|jpeg|png|webp|jfif|gif)$/i.test(f))
      .map((f) => `/zdjecia/${f}`);
  } catch (e) {
    console.error("Failed to load zdjecia directory:", e);
  }

  return (
    <AdminDashboardClient
      initialAnnouncements={announcementsList}
      initialBlogPosts={blogPostsList}
      initialSettings={settingsMap}
      initialPhotos={photos}
    />
  );
}
