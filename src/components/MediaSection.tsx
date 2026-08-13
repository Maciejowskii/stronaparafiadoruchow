"use client";

import { Tv, Radio, Globe, ExternalLink, Play } from "lucide-react";
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
          {/* DOM JÓZEFA TV EMBED PLAYER */}
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
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
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

              {/* YouTube Responsive Embed */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  paddingTop: "56.25%", // 16:9 Aspect Ratio
                  borderRadius: "12px",
                  overflow: "hidden",
                  marginBottom: "16px",
                  background: "#000",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
                }}
              >
                <iframe
                  title="Dom Józefa TV - Najnowsze transmisje"
                  src="https://www.youtube-nocookie.com/embed?listType=playlist&list=PL4fL_A4XyP2WJ5K_N2nL"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    border: 0,
                  }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <p style={{ fontSize: "14px", color: "var(--ash)", marginBottom: "16px" }}>
                Oficjalny kanał telewizyjny z transmisjami mszy, uroczystości diecezjalnych oraz magazynami religijnymi.
              </p>

              <a
                href="https://www.youtube.com/@DOMJOZEFATV"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ marginTop: "auto", justifyContent: "center", width: "100%" }}
              >
                <Play size={16} color="#c5221f" /> Oglądaj na YouTube @DOMJOZEFATV <ExternalLink size={14} />
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
