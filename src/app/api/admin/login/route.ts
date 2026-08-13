import { NextResponse } from "next/server";
import { authenticateAdmin, createSessionToken, COOKIE_NAME } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { password } = await req.json();

    if (!authenticateAdmin(password)) {
      return NextResponse.json({ error: "Nieprawidłowe hasło administratora" }, { status: 401 });
    }

    const token = createSessionToken();
    const response = NextResponse.json({ success: true, message: "Zalogowano pomyślnie" });

    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}
