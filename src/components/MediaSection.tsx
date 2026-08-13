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
            gap: "32px",
            alignItems: "stretch",
          }}
        >
          {/* DOM JÓZEFA TV CARD */}
          <MotionReveal delay={0.1}>
            <div
              className="card"
              style={{
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                background: "var(--linen)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                <span
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "rgba(197,34,31,0.1)",
                    color: "#c5221f",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <Tv size={20} />
                </span>
                <div>
                  <h3 style={{ margin: 0, fontSize: "20px" }}>Dom Józefa TV</h3>
                  <span style={{ fontSize: "12px", color: "var(--ash)" }}>Telewizja Internetowa Diecezji Kaliskiej</span>
                </div>
              </div>

              {/* Branded Interactive TV Screen Player Box */}
              <a
                href="https://www.youtube.com/@DOMJOZEFATV"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  position: "relative",
                  width: "100%",
                  height: "220px",
                  borderRadius: "12px",
                  overflow: "hidden",
                  marginBottom: "16px",
                  background: "linear-gradient(135deg, #1f1414 0%, #120a0a 100%)",
                  border: "1px solid rgba(197,34,31,0.3)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: "16px",
                  color: "#fff",
                  textDecoration: "none",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span
                    style={{
                      background: "#c5221f",
                      color: "#fff",
                      fontSize: "11px",
                      fontWeight: 700,
                      padding: "4px 8px",
                      borderRadius: "4px",
                      textTransform: "uppercase",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <Youtube size={14} /> Na Żywo & VOD
                  </span>
                  <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)" }}>@DOMJOZEFATV</span>
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
                      boxShadow: "0 4px 20px rgba(197,34,31,0.5)",
                      transition: "transform 0.2s ease",
                    }}
                  >
                    <Play size={24} style={{ marginLeft: "4px" }} />
                  </span>
                </div>

                <div>
                  <strong style={{ display: "block", fontSize: "16px", color: "#fff" }}>
                    Telewizja Dom Józefa TV
                  </strong>
                  <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)" }}>
                    Kliknij, aby otworzyć najnowsze transmisje i filmy na YouTube
                  </span>
                </div>
              </a>

              <p style={{ fontSize: "14px", color: "var(--ash)", marginBottom: "16px" }}>
                Oficjalny kanał telewizyjny Diecezji Kaliskiej. Transmisje Mszy Św., uroczystości odpustowych oraz rozmowy i magazyny katolickie.
              </p>

              <a
                href="https://www.youtube.com/@DOMJOZEFATV"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ marginTop: "auto", justifyContent: "center", width: "100%", borderColor: "#c5221f", color: "#c5221f" }}
              >
                <Play size={16} color="#c5221f" /> Oglądaj kanał Dom Józefa TV na YouTube <ExternalLink size={14} />
              </a>
            </div>
          </MotionReveal>

          {/* RIGHT COLUMN: DIECEZJA KALISKA & RADIO RODZINA */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* PORTAL DIECEZJALNY */}
            <MotionReveal delay={0.2}>
              <div
                className="card"
                style={{
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  background: "var(--linen)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <span
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "rgba(65,161,207,0.12)",
                      color: "var(--blue)",
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    <Globe size={20} />
                  </span>
                  <div>
                    <h3 style={{ margin: 0, fontSize: "18px" }}>Diecezja Kaliska</h3>
                    <span style={{ fontSize: "12px", color: "var(--ash)" }}>Oficjalny Portal Diecezjalny</span>
                  </div>
                </div>
                <p style={{ fontSize: "14px", color: "var(--ash)", marginBottom: "16px" }}>
                  Oficjalny serwis informacyjny Kurii Diecezjalnej w Kaliszu. Komunikaty biskupa, wydarzenia i duszpasterstwo.
                </p>
                <a
                  href="https://www.diecezja.kalisz.pl/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                  style={{ alignSelf: "flex-start" }}
                >
                  Odwiedź diecezja.kalisz.pl <ExternalLink size={14} />
                </a>
              </div>
            </MotionReveal>

            {/* RADIO RODZINA KALISZ */}
            <MotionReveal delay={0.3}>
              <div
                className="card"
                style={{
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  background: "var(--linen)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <span
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "rgba(44,44,44,0.08)",
                      color: "var(--graphite)",
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    <Radio size={20} />
                  </span>
                  <div>
                    <h3 style={{ margin: 0, fontSize: "18px" }}>Radio Rodzina Kalisz</h3>
                    <span style={{ fontSize: "12px", color: "var(--ash)" }}>Diecezjalna Rozgłośnia Radiowa</span>
                  </div>
                </div>
                <p style={{ fontSize: "14px", color: "var(--ash)", marginBottom: "16px" }}>
                  Audycje modlitewne, transmisje nabożeństw, muzyka religijna oraz rozmowy z gośćmi na falach Radia Rodzina.
                </p>
                <a
                  href="https://www.radiorodzina.kalisz.pl/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                  style={{ alignSelf: "flex-start" }}
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
