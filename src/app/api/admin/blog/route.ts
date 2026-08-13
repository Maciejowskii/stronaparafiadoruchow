import { NextResponse } from "next/server";
import { checkIsAdmin } from "@/lib/auth";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  const items = await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
  return NextResponse.json(items);
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

    const inserted = await db.insert(blogPosts).values({
      title,
      slug,
      date: date || new Date().toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" }),
      excerpt: excerpt || title,
      content,
      coverImage,
      galleryImages: Array.isArray(galleryImages) ? JSON.stringify(galleryImages) : "[]",
      isPublished: isPublished ? 1 : 0,
      createdAt: Date.now(),
    }).returning();

    return NextResponse.json(inserted[0]);
  } catch (err) {
    console.error("Failed to create blog post:", err);
    return NextResponse.json({ error: "Błąd bazy danych (slug musi być unikalny)" }, { status: 500 });
  }
}
