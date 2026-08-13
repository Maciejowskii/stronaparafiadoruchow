import { checkIsAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getStoreData } from "@/lib/store";
import fs from "fs/promises";
import path from "path";
import { list } from "@vercel/blob";
import AdminDashboardClient from "./AdminDashboardClient";

export default async function AdminPage() {
  const isAdmin = checkIsAdmin();
  if (!isAdmin) {
    redirect("/admin/login");
  }

  const store = await getStoreData();

  // Load photos (both Vercel Blob cloud and local fallback)
  let blobPhotos: string[] = [];
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const { blobs } = await list({ prefix: "zdjecia/" });
      blobPhotos = blobs.map((b) => b.url);
    } catch (e) {
      console.error("Failed to fetch Vercel Blob photos:", e);
    }
  }

  let localPhotos: string[] = [];
  try {
    const dirPath = path.join(process.cwd(), "public", "zdjecia");
    const files = await fs.readdir(dirPath);
    localPhotos = files
      .filter((f) => /\.(jpg|jpeg|png|webp|jfif|gif)$/i.test(f))
      .map((f) => `/zdjecia/${f}`);
  } catch (e) {
    console.error("Failed to load zdjecia directory:", e);
  }

  const allPhotos = Array.from(new Set([...blobPhotos, ...localPhotos]));

  return (
    <AdminDashboardClient
      initialAnnouncements={store.announcements}
      initialBlogPosts={store.blogPosts}
      initialSettings={store.siteSettings}
      initialPhotos={allPhotos}
    />
  );
}
