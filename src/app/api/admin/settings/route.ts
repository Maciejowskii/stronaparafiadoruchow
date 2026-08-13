import { NextResponse } from "next/server";
import { checkIsAdmin } from "@/lib/auth";
import { db } from "@/db";
import { siteSettings } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const rows = await db.select().from(siteSettings);
  const settings: Record<string, any> = {};

  for (const row of rows) {
    try {
      settings[row.key] = JSON.parse(row.value);
    } catch {
      settings[row.key] = row.value;
    }
  }

  return NextResponse.json(settings);
}

export async function POST(req: Request) {
  if (!checkIsAdmin()) {
    return NextResponse.json({ error: "Brak uprawnień" }, { status: 401 });
  }

  try {
    const body = await req.json(); // { key: string, value: any }

    for (const [key, val] of Object.entries(body)) {
      const stringVal = typeof val === "string" ? val : JSON.stringify(val);

      await db
        .insert(siteSettings)
        .values({ key, value: stringVal })
        .onConflictDoUpdate({
          target: siteSettings.key,
          set: { value: stringVal },
        });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to update settings:", err);
    return NextResponse.json({ error: "Błąd zapisywania ustawień" }, { status: 500 });
  }
}
