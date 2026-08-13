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

  const id = parseInt(params.id, 10);
  if (isNaN(id)) return NextResponse.json({ error: "Błędne ID" }, { status: 400 });

  try {
    const { title, slug, date, excerpt, content, coverImage, galleryImages, isPublished } = await req.json();
    const store = await getStoreData();

    const idx = store.blogPosts.findIndex((p) => p.id === id);
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
        .where(eq(blogPosts.id, id));
    } catch {}

    await saveStoreData(store);
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

  const id = parseInt(params.id, 10);
  if (isNaN(id)) return NextResponse.json({ error: "Błędne ID" }, { status: 400 });

  try {
    const store = await getStoreData();
    store.blogPosts = store.blogPosts.filter((p) => p.id !== id);

    try {
      await db.delete(blogPosts).where(eq(blogPosts.id, id));
    } catch {}

    await saveStoreData(store);
    revalidatePath("/", "layout");
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed delete blog post:", err);
    return NextResponse.json({ error: "Błąd bazy danych" }, { status: 500 });
  }
}
