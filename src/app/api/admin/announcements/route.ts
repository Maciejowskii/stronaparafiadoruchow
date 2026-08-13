import { NextResponse } from "next/server";
import { checkIsAdmin } from "@/lib/auth";
import { db } from "@/db";
import { announcements } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  const items = await db.select().from(announcements).orderBy(desc(announcements.createdAt));
  return NextResponse.json(items);
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

    const inserted = await db.insert(announcements).values({
      title,
      date,
      content,
      isPublished: isPublished ? 1 : 0,
      createdAt: Date.now(),
    }).returning();

    return NextResponse.json(inserted[0]);
  } catch (err) {
    console.error("Failed to create announcement:", err);
    return NextResponse.json({ error: "Błąd bazy danych" }, { status: 500 });
  }
}
