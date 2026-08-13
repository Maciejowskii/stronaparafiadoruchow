"use client";

import { Tv, Radio, Globe, ExternalLink, Play, Youtube } from "lucide-react";
import MotionReveal from "./MotionReveal";

export default function MediaSection() {
  return (
    <section
      id="media"
      className="section"
      style={{
        background: "var(--paper)",
        borderTop: "1px solid var(--mist)",
        borderBottom: "1px solid var(--mist)",
      }}
    >
      <div className="container">
        <MotionReveal>
          <div className="section-header">
            <div>
              <p className="eyebrow">Wspólnota Kościoła Kaliskiego</p>
              <h2>Media Diecezjalne</h2>
            </div>
            <p style={{ color: "var(--ash)" }}>
              Bądź na bieżąco z wydarzeniami w Diecezji Kaliskiej. Oglądaj telewizję internetową, słuchaj radia oraz czytaj komunikaty kurialne.
            </p>
          </div>
        </MotionReveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "24px",
            alignItems: "stretch",
          }}
        >
          {/* DOM JÓZEFA TV CARD */}
          <MotionReveal delay={0.1} style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <div
              className="card"
              style={{
                padding: "28px",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                background: "var(--linen)",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                  <span
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background: "rgba(197,34,31,0.12)",
                      color: "#c5221f",
                      display: "grid",
                      placeItems: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Tv size={22} />
                  </span>
                  <div>
                    <h3 style={{ margin: 0, fontSize: "20px" }}>Dom Józefa TV</h3>
                    <span style={{ fontSize: "12px", color: "var(--ash)" }}>Telewizja Internetowa Diecezji Kaliskiej</span>
                  </div>
                </div>

                {/* Branded TV Player Box with Rich Image Preview */}
                <a
                  href="https://www.youtube.com/@DOMJOZEFATV"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "210px",
                    borderRadius: "12px",
                    overflow: "hidden",
                    marginBottom: "20px",
                    background: `
                      linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.85) 100%),
                      url("/zdjecia/oltarz.jpg") center / cover no-repeat
                    `,
                    border: "1px solid rgba(197,34,31,0.4)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "16px",
                    color: "#fff",
                    textDecoration: "none",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
                    transition: "transform 0.3s ease",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span
                      style={{
                        background: "#c5221f",
                        color: "#fff",
                        fontSize: "11px",
                        fontWeight: 700,
                        padding: "4px 9px",
                        borderRadius: "4px",
                        textTransform: "uppercase",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "5px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                      }}
                    >
                      <Youtube size={14} /> Na Żywo & VOD
                    </span>
                    <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>@DOMJOZEFATV</span>
                  </div>

                  {/* Big Centered Play Button */}
                  <div style={{ textAlign: "center" }}>
                    <span
                      style={{
                        width: "56px",
                        height: "56px",
                        borderRadius: "50%",
                        background: "#c5221f",
                        color: "#fff",
                        display: "inline-grid",
                        placeItems: "center",
                        boxShadow: "0 4px 20px rgba(197,34,31,0.6)",
                      }}
                    >
                      <Play size={24} style={{ marginLeft: "4px" }} />
                    </span>
                  </div>

                  <div>
                    <strong style={{ display: "block", fontSize: "16px", color: "#fff", textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}>
                      Telewizja Dom Józefa TV
                    </strong>
                    <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.85)" }}>
                      Kliknij, aby otworzyć transmisje i filtry na YouTube
                    </span>
                  </div>
                </a>

                <p style={{ fontSize: "14px", color: "var(--ash)", lineHeight: 1.6, marginBottom: "20px" }}>
                  Oficjalna telewizja internetowa Diecezji Kaliskiej. Transmisje Mszy Świętych na żywo, uroczystości odpustowe, relacje z życia parafii oraz katolickie programy informacyjne.
                </p>
              </div>

              <a
                href="https://www.youtube.com/@DOMJOZEFATV"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ marginTop: "auto", justifyContent: "center", width: "100%", borderColor: "#c5221f", color: "#c5221f" }}
              >
                <Play size={16} color="#c5221f" /> Oglądaj Dom Józefa TV na YouTube <ExternalLink size={14} />
              </a>
            </div>
          </MotionReveal>

          {/* RIGHT COLUMN: DIECEZJA KALISKA & RADIO RODZINA (EQUAL HEIGHT TILES) */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px", height: "100%" }}>
            {/* PORTAL DIECEZJALNY */}
            <MotionReveal delay={0.2} style={{ flex: 1, display: "flex" }}>
              <div
                className="card"
                style={{
                  padding: "28px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  width: "100%",
                  background: "var(--linen)",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                    <span
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        background: "rgba(65,161,207,0.12)",
                        color: "var(--blue)",
                        display: "grid",
                        placeItems: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Globe size={22} />
                    </span>
                    <div>
                      <h3 style={{ margin: 0, fontSize: "20px" }}>Diecezja Kaliska</h3>
                      <span style={{ fontSize: "12px", color: "var(--ash)" }}>Oficjalny Portal Diecezjalny</span>
                    </div>
                  </div>
                  <p style={{ fontSize: "14px", color: "var(--ash)", lineHeight: 1.6, marginBottom: "20px" }}>
                    Oficjalny serwis informacyjny Kurii Diecezjalnej w Kaliszu. Komunikaty Biskupa Kaliskiego, ważne wydarzenia oraz aktualności duszpasterskie z całej diecezji.
                  </p>
                </div>
                <a
                  href="https://www.diecezja.kalisz.pl/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                  style={{ alignSelf: "flex-start", marginTop: "auto" }}
                >
                  Odwiedź diecezja.kalisz.pl <ExternalLink size={14} />
                </a>
              </div>
            </MotionReveal>

            {/* RADIO RODZINA KALISZ */}
            <MotionReveal delay={0.3} style={{ flex: 1, display: "flex" }}>
              <div
                className="card"
                style={{
                  padding: "28px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  width: "100%",
                  background: "var(--linen)",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                    <span
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        background: "rgba(44,44,44,0.08)",
                        color: "var(--graphite)",
                        display: "grid",
                        placeItems: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Radio size={22} />
                    </span>
                    <div>
                      <h3 style={{ margin: 0, fontSize: "20px" }}>Radio Rodzina Kalisz</h3>
                      <span style={{ fontSize: "12px", color: "var(--ash)" }}>Diecezjalna Rozgłośnia Radiowa</span>
                    </div>
                  </div>
                  <p style={{ fontSize: "14px", color: "var(--ash)", lineHeight: 1.6, marginBottom: "20px" }}>
                    Diecezjalne radio ewangelizacyjne. Transmisje codziennych modlitw, nabożeństw, audycje formacyjne, wartościowa muzyka oraz rozmowy z gośćmi.
                  </p>
                </div>
                <a
                  href="https://www.radiorodzina.kalisz.pl/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                  style={{ alignSelf: "flex-start", marginTop: "auto" }}
                >
                  Słuchaj radiorodzina.kalisz.pl <ExternalLink size={14} />
                </a>
              </div>
            </MotionReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
