"use client";

import MotionReveal from "./MotionReveal";

export default function AboutSection() {
  return (
    <section className="section">
      <div className="container">
        <MotionReveal>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "60px",
              alignItems: "center",
            }}
          >
            <div>
              <p className="eyebrow">O parafii</p>
              <h2>Nasza parafia</h2>
              <p style={{ color: "var(--ash)", fontSize: "16px", lineHeight: 1.7, marginBottom: "16px" }}>
                Parafia pw. św. Stanisława Kostki w Doruchowie jest miejscem modlitwy, żywej wiary i budowania serdecznej wspólnoty chrześcijańskiej.
              </p>
              <p style={{ color: "var(--ash)", fontSize: "16px", lineHeight: 1.7 }}>
                Zabytkowa świątynia parafialna urzeka pięknym wnętrzem, odnowionymi ołtarzami oraz bogatą historią posługi duszpasterskiej w tym regionie Wielkopolski.
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  marginTop: "36px",
                  borderTop: "1px solid var(--mist)",
                }}
              >
                <div style={{ padding: "18px 0", borderBottom: "1px solid var(--mist)" }}>
                  <span style={{ display: "block", marginBottom: "3px", color: "var(--ash)", fontSize: "12px" }}>
                    Patron
                  </span>
                  <span style={{ color: "var(--graphite)", fontSize: "15px", fontWeight: 500 }}>
                    Św. Stanisław Kostka
                  </span>
                </div>
                <div style={{ padding: "18px 0", borderBottom: "1px solid var(--mist)" }}>
                  <span style={{ display: "block", marginBottom: "3px", color: "var(--ash)", fontSize: "12px" }}>
                    Miejscowość
                  </span>
                  <span style={{ color: "var(--graphite)", fontSize: "15px", fontWeight: 500 }}>
                    Doruchów
                  </span>
                </div>
                <div style={{ padding: "18px 0", borderBottom: "1px solid var(--mist)" }}>
                  <span style={{ display: "block", marginBottom: "3px", color: "var(--ash)", fontSize: "12px" }}>
                    Wspólnota
                  </span>
                  <span style={{ color: "var(--graphite)", fontSize: "15px", fontWeight: 500 }}>
                    Parafia rzymskokatolicka
                  </span>
                </div>
                <div style={{ padding: "18px 0", borderBottom: "1px solid var(--mist)" }}>
                  <span style={{ display: "block", marginBottom: "3px", color: "var(--ash)", fontSize: "12px" }}>
                    Świątynia
                  </span>
                  <span style={{ color: "var(--graphite)", fontSize: "15px", fontWeight: 500 }}>
                    Kościół parafialny
                  </span>
                </div>
              </div>
            </div>

            <div
              style={{
                minHeight: "460px",
                overflow: "hidden",
                borderRadius: "var(--radius-large)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
              }}
            >
              <img
                src="/zdjecia/wewnatrz.jpg"
                alt="Wnętrze kościoła parafialnego w Doruchowie"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
