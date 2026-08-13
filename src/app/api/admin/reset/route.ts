import { NextResponse } from "next/server";
import { checkIsAdmin } from "@/lib/auth";
import { defaultSeedData, saveStoreData, getStoreData } from "@/lib/store";
import { db } from "@/db";
import { announcements, blogPosts } from "@/db/schema";
import { revalidatePath } from "next/cache";

export async function POST() {
  if (!checkIsAdmin()) {
    return NextResponse.json({ error: "Brak uprawnień" }, { status: 401 });
  }

  try {
    const store = await getStoreData();
    // Wipe all demo announcements and demo blog posts
    store.announcements = [];
    store.blogPosts = [];
    store.siteSettings = store.siteSettings || defaultSeedData.siteSettings;

    try {
      await db.delete(announcements);
      await db.delete(blogPosts);
    } catch {}

    await saveStoreData(store);
    revalidatePath("/", "layout");

    return NextResponse.json({ success: true, message: "Wyczyszczono wszystkie wpisy do stanu początkowego!" });
  } catch (err) {
    console.error("Failed to reset store:", err);
    return NextResponse.json({ error: "Błąd podczas resetowania bazy" }, { status: 500 });
  }
}
