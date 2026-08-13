import { NextResponse } from "next/server";
import { checkIsAdmin } from "@/lib/auth";
import { getStoreData, saveStoreData } from "@/lib/store";
import { db } from "@/db";
import { siteSettings } from "@/db/schema";

export async function GET() {
  const store = await getStoreData();
  return NextResponse.json(store.siteSettings);
}

export async function POST(req: Request) {
  if (!checkIsAdmin()) {
    return NextResponse.json({ error: "Brak uprawnień" }, { status: 401 });
  }

  try {
    const body = await req.json(); // { key: string, value: any } or object with key-values
    const store = await getStoreData();

    for (const [key, val] of Object.entries(body)) {
      store.siteSettings[key] = val;

      // Also attempt SQLite save if available
      try {
        const stringVal = typeof val === "string" ? val : JSON.stringify(val);
        await db
          .insert(siteSettings)
          .values({ key, value: stringVal })
          .onConflictDoUpdate({
            target: siteSettings.key,
            set: { value: stringVal },
          });
      } catch {}
    }

    const saved = await saveStoreData(store);
    if (!saved && process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json({ error: "Błąd podczas zapisu ustawień" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to update settings:", err);
    return NextResponse.json({ error: "Błąd zapisywania ustawień" }, { status: 500 });
  }
}
