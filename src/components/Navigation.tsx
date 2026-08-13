"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ChevronRight, PhoneCall } from "lucide-react";

interface Props {
  hasBanner?: boolean;
}

export default function Navigation({ hasBanner }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const topOffset = hasBanner ? (scrolled ? "12px" : "62px") : "16px";

  return (
    <header style={{ position: "relative", zIndex: 100 }}>
      <nav
        style={{
          position: "fixed",
          zIndex: 100,
          top: topOffset,
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(calc(100% - 24px), 960px)",
          padding: "8px 14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "8px",
          border: scrolled ? "1px solid rgba(255,255,255,0.4)" : "1px solid rgba(255,255,255,0.32)",
          borderRadius: "50px",
          background: scrolled ? "rgba(20,22,26,0.88)" : "rgba(30,32,38,0.72)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          color: "#fff",
          boxShadow: "0 4px 20px rgba(0,0,0,0.18)",
          transition: "top 0.3s ease, background 0.3s ease, border 0.3s ease",
        }}
        aria-label="Główna nawigacja"
      >
        <Link
          href="/"
          onClick={() => setMobileMenuOpen(false)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "6px 10px",
            fontSize: "14px",
            fontWeight: 500,
            whiteSpace: "nowrap",
          }}
        >
          <span
            style={{
              width: "28px",
              height: "28px",
              display: "grid",
              placeItems: "center",
              border: "1px solid rgba(255,255,255,0.7)",
              borderRadius: "50%",
              fontFamily: "var(--serif)",
              fontSize: "14px",
            }}
          >
            †
          </span>
          <span style={{ fontSize: "clamp(13px, 3.5vw, 15px)" }}>Parafia Doruchów</span>
        </Link>

        {/* Desktop Links */}
        <div
          className="desktop-only"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <Link href="/ogloszenia" style={{ padding: "8px 12px", borderRadius: "30px", fontSize: "13px", fontWeight: 500 }}>
            Ogłoszenia
          </Link>
          <Link href="/#msze" style={{ padding: "8px 12px", borderRadius: "30px", fontSize: "13px", fontWeight: 500 }}>
            Msze
          </Link>
          <Link href="/blog" style={{ padding: "8px 12px", borderRadius: "30px", fontSize: "13px", fontWeight: 500 }}>
            Wydarzenia
          </Link>
          <Link href="/kosciol-bobrowniki" style={{ padding: "8px 12px", borderRadius: "30px", fontSize: "13px", fontWeight: 500 }}>
            Bobrowniki
          </Link>
          <Link href="/#kancelaria" style={{ padding: "8px 12px", borderRadius: "30px", fontSize: "13px", fontWeight: 500 }}>
            Kancelaria
          </Link>
        </div>

        {/* Desktop CTA */}
        <div className="desktop-only">
          <Link
            href="/#kontakt"
            style={{
              padding: "8px 14px",
              border: "1px solid var(--blue)",
              borderRadius: "var(--radius-button)",
              color: "#fff",
              fontSize: "13px",
              fontWeight: 500,
              whiteSpace: "nowrap",
              background: "rgba(65,161,207,0.15)",
            }}
          >
            Napisz do nas →
          </Link>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          className="mobile-only-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Otwórz menu"
          style={{
            background: "rgba(255,255,255,0.12)",
            border: "1px solid rgba(255,255,255,0.25)",
            color: "#fff",
            borderRadius: "50%",
            width: "38px",
            height: "38px",
            placeItems: "center",
            cursor: "pointer",
          }}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Drawer Menu Overlay */}
      {mobileMenuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99,
            background: "rgba(18,20,24,0.95)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            paddingTop: "90px",
            paddingLeft: "24px",
            paddingRight: "24px",
            paddingBottom: "36px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            color: "#fff",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: "22px",
                fontWeight: 500,
                padding: "12px 0",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              Strona główna <ChevronRight size={18} opacity={0.5} />
            </Link>
            <Link
              href="/ogloszenia"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: "22px",
                fontWeight: 500,
                padding: "12px 0",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              Ogłoszenia parafialne <ChevronRight size={18} opacity={0.5} />
            </Link>
            <Link
              href="/#msze"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: "22px",
                fontWeight: 500,
                padding: "12px 0",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              Porządek Mszy Świętych <ChevronRight size={18} opacity={0.5} />
            </Link>
            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: "22px",
                fontWeight: 500,
                padding: "12px 0",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              Wydarzenia i Blog <ChevronRight size={18} opacity={0.5} />
            </Link>
            <Link
              href="/kosciol-bobrowniki"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: "22px",
                fontWeight: 500,
                padding: "12px 0",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              Kościół w Bobrownikach <ChevronRight size={18} opacity={0.5} />
            </Link>
            <Link
              href="/#kancelaria"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: "22px",
                fontWeight: 500,
                padding: "12px 0",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              Kancelaria i Kontakt <ChevronRight size={18} opacity={0.5} />
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "32px" }}>
            <Link
              href="/#kontakt"
              onClick={() => setMobileMenuOpen(false)}
              className="btn btn-primary"
              style={{ textAlign: "center", padding: "14px", fontSize: "16px", borderRadius: "12px" }}
            >
              Napisz wiadomość do parafii
            </Link>
            <a
              href="tel:+48627301122"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "14px",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#fff",
                fontSize: "15px",
                textAlign: "center",
              }}
            >
              <PhoneCall size={18} /> Zadzwoń: +48 62 730 11 22
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
