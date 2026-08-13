import { NextResponse } from "next/server";
import { checkIsAdmin } from "@/lib/auth";
import { getStoreData, saveStoreData } from "@/lib/store";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  if (!checkIsAdmin()) {
    return NextResponse.json({ error: "Brak uprawnień" }, { status: 401 });
  }

  const id = params.id;
  if (!id) return NextResponse.json({ error: "Błędne ID" }, { status: 400 });

  try {
    const { title, slug, date, excerpt, content, coverImage, galleryImages, isPublished } = await req.json();
    const store = await getStoreData();

    const idx = store.blogPosts.findIndex((p) => String(p.id) === String(id) || p.slug === id);
    if (idx !== -1) {
      store.blogPosts[idx] = {
        ...store.blogPosts[idx],
        title: title ?? store.blogPosts[idx].title,
        slug: slug ?? store.blogPosts[idx].slug,
        date: date ?? store.blogPosts[idx].date,
        excerpt: excerpt ?? store.blogPosts[idx].excerpt,
        content: content ?? store.blogPosts[idx].content,
        coverImage: coverImage ?? store.blogPosts[idx].coverImage,
        galleryImages: Array.isArray(galleryImages) ? JSON.stringify(galleryImages) : galleryImages ?? store.blogPosts[idx].galleryImages,
        isPublished: isPublished !== undefined ? (isPublished ? 1 : 0) : store.blogPosts[idx].isPublished,
      };
    }

    try {
      const numericId = parseInt(id, 10);
      if (!isNaN(numericId)) {
        await db
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
          .where(eq(blogPosts.id, numericId));
      }
    } catch {}

    const saved = await saveStoreData(store);
    if (!saved && process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json({ error: "Błąd podczas zapisu w chmurze" }, { status: 500 });
    }

    revalidatePath("/", "layout");
    return NextResponse.json(store.blogPosts[idx] || { id });
  } catch (err) {
    console.error("Failed update blog post:", err);
    return NextResponse.json({ error: "Błąd bazy danych" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  if (!checkIsAdmin()) {
    return NextResponse.json({ error: "Brak uprawnień" }, { status: 401 });
  }

  const id = params.id;
  if (!id) return NextResponse.json({ error: "Błędne ID" }, { status: 400 });

  try {
    const store = await getStoreData();
    store.blogPosts = store.blogPosts.filter((p) => String(p.id) !== String(id) && p.slug !== id);

    try {
      const numericId = parseInt(id, 10);
      if (!isNaN(numericId)) {
        await db.delete(blogPosts).where(eq(blogPosts.id, numericId));
      }
    } catch {}

    const saved = await saveStoreData(store);
    if (!saved && process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json({ error: "Błąd podczas usuwania w chmurze" }, { status: 500 });
    }

    revalidatePath("/", "layout");
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed delete blog post:", err);
    return NextResponse.json({ error: "Błąd bazy danych" }, { status: 500 });
  }
}
