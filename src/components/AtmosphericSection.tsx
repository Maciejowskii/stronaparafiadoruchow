"use client";

import MotionReveal from "./MotionReveal";

export default function AtmosphericSection() {
  return (
    <section style={{ padding: "88px 0" }}>
      <div className="container">
        <MotionReveal>
          <div
            style={{
              position: "relative",
              minHeight: "560px",
              overflow: "hidden",
              borderRadius: "var(--radius-large)",
              background: `
                linear-gradient(180deg, rgba(0,0,0,0.15), rgba(0,0,0,0.7)),
                url("/zdjecia/zzewnatrz3.jpg") center / cover no-repeat
              `,
              display: "flex",
              alignItems: "flex-end",
              padding: "36px",
            }}
          >
            <div
              style={{
                maxWidth: "580px",
                padding: "32px",
                border: "1px solid rgba(255,255,255,0.28)",
                borderRadius: "var(--radius-large)",
                background: "rgba(15,30,35,0.45)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                color: "#fff",
              }}
            >
              <p className="eyebrow" style={{ color: "rgba(255,255,255,0.8)" }}>
                Życie wspólnoty
              </p>
              <h2 style={{ marginBottom: "14px", color: "#fff", fontSize: "clamp(32px, 4vw, 44px)" }}>
                Razem tworzymy parafię.
              </h2>
              <p style={{ color: "rgba(255,255,255,0.88)", fontSize: "16px", marginBottom: "24px" }}>
                Zobacz najważniejsze wydarzenia, uroczystości i chwile z życia naszej wspólnoty w kościele w Doruchowie.
              </p>
              <a
                href="#wydarzenia"
                className="btn"
                style={{ color: "#fff", borderColor: "rgba(255,255,255,0.7)", background: "rgba(255,255,255,0.15)" }}
              >
                Zobacz wydarzenia
                <span className="arrow">→</span>
              </a>
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
