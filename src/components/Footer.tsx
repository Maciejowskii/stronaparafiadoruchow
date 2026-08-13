import Link from "next/link";
import { ExternalLink } from "lucide-react";

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
            marginBottom: "48px",
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

        {/* DIOCESAN LINKS BAR */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "20px",
            padding: "24px 0",
            borderTop: "1px solid var(--mist)",
            borderBottom: "1px solid var(--mist)",
            marginBottom: "32px",
          }}
        >
          <div>
            <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--ash)", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
              Telewizja Diecezjalna
            </span>
            <a
              href="https://www.youtube.com/@DOMJOZEFATV"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--graphite)", fontWeight: 500, fontSize: "14px", display: "inline-flex", alignItems: "center", gap: "4px" }}
            >
              Dom Józefa TV (YouTube) <ExternalLink size={13} color="var(--ash)" />
            </a>
          </div>

          <div>
            <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--ash)", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
              Oficjalny Portal
            </span>
            <a
              href="https://www.diecezja.kalisz.pl/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--graphite)", fontWeight: 500, fontSize: "14px", display: "inline-flex", alignItems: "center", gap: "4px" }}
            >
              Diecezja Kaliska <ExternalLink size={13} color="var(--ash)" />
            </a>
          </div>

          <div>
            <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--ash)", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
              Radio Diecezjalne
            </span>
            <a
              href="https://www.radiorodzina.kalisz.pl/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--graphite)", fontWeight: 500, fontSize: "14px", display: "inline-flex", alignItems: "center", gap: "4px" }}
            >
              Radio Rodzina Kalisz <ExternalLink size={13} color="var(--ash)" />
            </a>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
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
