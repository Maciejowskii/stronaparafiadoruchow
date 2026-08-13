import { NextResponse } from "next/server";
import { checkIsAdmin } from "@/lib/auth";
import { getStoreData, saveStoreData } from "@/lib/store";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";

export async function GET() {
  const store = await getStoreData();
  return NextResponse.json(store.blogPosts);
}

export async function POST(req: Request) {
  if (!checkIsAdmin()) {
    return NextResponse.json({ error: "Brak uprawnień" }, { status: 401 });
  }

  try {
    const { title, slug, date, excerpt, content, coverImage, galleryImages, isPublished } = await req.json();

    if (!title || !slug || !content || !coverImage) {
      return NextResponse.json({ error: "Wypełnij wymagane pola" }, { status: 400 });
    }

    const store = await getStoreData();
    const newId = Date.now();
    const newPost = {
      id: newId,
      title,
      slug,
      date: date || new Date().toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" }),
      excerpt: excerpt || title,
      content,
      coverImage,
      galleryImages: Array.isArray(galleryImages) ? JSON.stringify(galleryImages) : galleryImages || "[]",
      isPublished: isPublished ? 1 : 0,
      createdAt: Date.now(),
    };

    store.blogPosts.unshift(newPost);

    try {
      await db.insert(blogPosts).values(newPost);
    } catch {}

    await saveStoreData(store);
    return NextResponse.json(newPost);
  } catch (err) {
    console.error("Failed to create blog post:", err);
    return NextResponse.json({ error: "Błąd podczas dodawania artykułu" }, { status: 500 });
  }
}
