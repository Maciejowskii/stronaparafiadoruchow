import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        padding: "80px 0 32px",
        background: "var(--paper)",
        borderTop: "1px solid var(--mist)",
      }}
    >
      <div className="container">
        <div
          style={{
            maxWidth: "850px",
            marginBottom: "60px",
            fontFamily: "var(--serif)",
            fontSize: "clamp(36px, 5vw, 64px)",
            lineHeight: 1.05,
            letterSpacing: "-0.04em",
            color: "var(--graphite)",
          }}
        >
          Miejsce modlitwy,<br />
          spotkania i wspólnoty.
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
            paddingTop: "24px",
            borderTop: "1px solid var(--mist)",
            color: "var(--ash)",
            fontSize: "13px",
          }}
        >
          <div>
            © {new Date().getFullYear()} Parafia pw. św. Stanisława Kostki w Doruchowie
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", alignItems: "center" }}>
            <Link href="/">Strona Główna</Link>
            <Link href="/ogloszenia">Ogłoszenia</Link>
            <Link href="/#msze">Msze Święte</Link>
            <Link href="/blog">Wydarzenia</Link>
            <Link href="/kosciol-bobrowniki">Kościół w Bobrownikach</Link>
            <Link href="/#kancelaria">Kancelaria</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
