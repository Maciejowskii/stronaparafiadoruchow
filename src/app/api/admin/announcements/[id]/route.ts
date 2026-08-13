import { NextResponse } from "next/server";
import { checkIsAdmin } from "@/lib/auth";
import { db } from "@/db";
import { announcements } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  if (!checkIsAdmin()) {
    return NextResponse.json({ error: "Brak uprawnień" }, { status: 401 });
  }

  const id = parseInt(params.id, 10);
  if (isNaN(id)) return NextResponse.json({ error: "Błędne ID" }, { status: 400 });

  try {
    const { title, date, content, isPublished } = await req.json();

    const updated = await db
      .update(announcements)
      .set({
        title,
        date,
        content,
        isPublished: isPublished ? 1 : 0,
      })
      .where(eq(announcements.id, id))
      .returning();

    return NextResponse.json(updated[0]);
  } catch (err) {
    console.error("Failed update announcement:", err);
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
    await db.delete(announcements).where(eq(announcements.id, id));
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed delete announcement:", err);
    return NextResponse.json({ error: "Błąd bazy danych" }, { status: 500 });
  }
}
