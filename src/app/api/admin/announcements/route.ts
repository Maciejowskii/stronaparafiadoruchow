import { NextResponse } from "next/server";
import { checkIsAdmin } from "@/lib/auth";
import { getStoreData, saveStoreData } from "@/lib/store";
import { db } from "@/db";
import { announcements } from "@/db/schema";

export async function GET() {
  const store = await getStoreData();
  return NextResponse.json(store.announcements);
}

export async function POST(req: Request) {
  if (!checkIsAdmin()) {
    return NextResponse.json({ error: "Brak uprawnień" }, { status: 401 });
  }

  try {
    const { title, date, content, isPublished } = await req.json();

    if (!title || !date || !content) {
      return NextResponse.json({ error: "Wypełnij wymagane pola" }, { status: 400 });
    }

    const store = await getStoreData();
    const newId = Date.now();
    const newAnnouncement = {
      id: newId,
      title,
      date,
      content,
      isPublished: isPublished ? 1 : 0,
      createdAt: Date.now(),
    };

    store.announcements.unshift(newAnnouncement);

    // Attempt SQLite insert if available
    try {
      await db.insert(announcements).values(newAnnouncement);
    } catch {}

    await saveStoreData(store);

    return NextResponse.json(newAnnouncement);
  } catch (err) {
    console.error("Failed to create announcement:", err);
    return NextResponse.json({ error: "Błąd bazy danych" }, { status: 500 });
  }
}
