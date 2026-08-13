import { checkIsAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getStoreData } from "@/lib/store";
import fs from "fs/promises";
import path from "path";
import AdminDashboardClient from "./AdminDashboardClient";

export default async function AdminPage() {
  const isAdmin = checkIsAdmin();
  if (!isAdmin) {
    redirect("/admin/login");
  }

  const store = await getStoreData();

  // Load available local photos
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
      initialAnnouncements={store.announcements}
      initialBlogPosts={store.blogPosts}
      initialSettings={store.siteSettings}
      initialPhotos={photos}
    />
  );
}
