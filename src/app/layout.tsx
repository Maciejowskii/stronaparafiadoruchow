import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Parafia pw. św. Stanisława Kostki | Doruchów",
  description: "Oficjalna strona Parafii rzymskokatolickiej pw. św. Stanisława Kostki w Doruchowie. Ogłoszenia parafialne, porządek Mszy Świętych, aktualności i kontakt.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}
