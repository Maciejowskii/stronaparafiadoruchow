import { NextResponse } from "next/server";
import { checkIsAdmin } from "@/lib/auth";
import { getStoreData, saveStoreData } from "@/lib/store";
import { db } from "@/db";
import { announcements } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  if (!checkIsAdmin()) {
    return NextResponse.json({ error: "Brak uprawnień" }, { status: 401 });
  }

  const id = params.id;
  if (!id) return NextResponse.json({ error: "Błędne ID" }, { status: 400 });

  try {
    const { title, date, content, isPublished } = await req.json();
    const store = await getStoreData();

    const idx = store.announcements.findIndex((a) => String(a.id) === String(id));
    if (idx !== -1) {
      store.announcements[idx] = {
        ...store.announcements[idx],
        title: title ?? store.announcements[idx].title,
        date: date ?? store.announcements[idx].date,
        content: content ?? store.announcements[idx].content,
        isPublished: isPublished !== undefined ? (isPublished ? 1 : 0) : store.announcements[idx].isPublished,
      };
    }

    try {
      const numericId = parseInt(id, 10);
      if (!isNaN(numericId)) {
        await db
          .update(announcements)
          .set({
            title,
            date,
            content,
            isPublished: isPublished ? 1 : 0,
          })
          .where(eq(announcements.id, numericId));
      }
    } catch {}

    const saved = await saveStoreData(store);
    if (!saved && process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json({ error: "Błąd podczas zapisu w chmurze" }, { status: 500 });
    }

    revalidatePath("/", "layout");
    return NextResponse.json(store.announcements[idx] || { id });
  } catch (err) {
    console.error("Failed update announcement:", err);
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
    store.announcements = store.announcements.filter((a) => String(a.id) !== String(id));

    try {
      const numericId = parseInt(id, 10);
      if (!isNaN(numericId)) {
        await db.delete(announcements).where(eq(announcements.id, numericId));
      }
    } catch {}

    const saved = await saveStoreData(store);
    if (!saved && process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json({ error: "Błąd podczas usuwania w chmurze" }, { status: 500 });
    }

    revalidatePath("/", "layout");
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed delete announcement:", err);
    return NextResponse.json({ error: "Błąd bazy danych" }, { status: 500 });
  }
}
