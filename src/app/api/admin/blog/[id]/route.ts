import { NextResponse } from "next/server";
import { checkIsAdmin } from "@/lib/auth";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  if (!checkIsAdmin()) {
    return NextResponse.json({ error: "Brak uprawnień" }, { status: 401 });
  }

  const id = parseInt(params.id, 10);
  if (isNaN(id)) return NextResponse.json({ error: "Błędne ID" }, { status: 400 });

  try {
    const { title, slug, date, excerpt, content, coverImage, galleryImages, isPublished } = await req.json();

    const updated = await db
      .update(blogPosts)
      .set({
        title,
        slug,
        date,
        excerpt,
        content,
        coverImage,
        galleryImages: Array.isArray(galleryImages) ? JSON.stringify(galleryImages) : galleryImages,
        isPublished: isPublished ? 1 : 0,
      })
      .where(eq(blogPosts.id, id))
      .returning();

    return NextResponse.json(updated[0]);
  } catch (err) {
    console.error("Failed update blog post:", err);
    return NextResponse.json({ error: "Błąd bazy danych" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  if (!checkIsAdmin()) {
    return NextResponse.json({ error: "Brak uprawnień" }, { status: 401 });
  }

  const id = parseInt(params.id, 10);
  if (isNaN(id)) return NextResponse.json({ error: "Błędne ID" }, { status: 400 });

  try {
    await db.delete(blogPosts).where(eq(blogPosts.id, id));
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed delete blog post:", err);
    return NextResponse.json({ error: "Błąd bazy danych" }, { status: 500 });
  }
}
