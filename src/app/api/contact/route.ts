import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Uzupełnij wymagane pola" }, { status: 400 });
    }

    console.log("Wiadomość z formularza kontaktowego:", { name, email, subject, message });

    return NextResponse.json({ success: true, message: "Wiadomość została przyjęta" });
  } catch (error) {
    console.error("Error contact submission:", error);
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}
