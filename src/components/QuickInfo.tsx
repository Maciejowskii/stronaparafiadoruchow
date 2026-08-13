"use client";

import MotionReveal from "./MotionReveal";

export default function QuickInfo() {
  return (
    <section className="section">
      <div className="container">
        <MotionReveal>
          <div className="section-header">
            <div>
              <p className="eyebrow">Na dziś</p>
              <h2>Najważniejsze informacje</h2>
            </div>
            <p>
              Wszystko, czego potrzebujesz, aby być na bieżąco z życiem naszej wspólnoty w Doruchowie.
            </p>
          </div>
        </MotionReveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "16px",
          }}
        >
          <MotionReveal delay={0.1}>
            <article
              className="card"
              style={{
                padding: "28px",
                display: "flex",
                flexDirection: "column",
                minHeight: "220px",
              }}
            >
              <span style={{ marginBottom: "auto", color: "var(--fog)", fontSize: "13px", fontWeight: 500 }}>01</span>
              <h3 style={{ margin: "20px 0 8px" }}>Ogłoszenia</h3>
              <p style={{ marginBottom: "20px", color: "var(--ash)", fontSize: "14px" }}>
                Najnowsze komunikaty duszpasterskie i informacje parafialne.
              </p>
              <a className="text-link" href="#ogloszenia">
                Czytaj ogłoszenia →
              </a>
            </article>
          </MotionReveal>

          <MotionReveal delay={0.2}>
            <article
              className="card"
              style={{
                padding: "28px",
                display: "flex",
                flexDirection: "column",
                minHeight: "220px",
              }}
            >
              <span style={{ marginBottom: "auto", color: "var(--fog)", fontSize: "13px", fontWeight: 500 }}>02</span>
              <h3 style={{ margin: "20px 0 8px" }}>Msze Święte</h3>
              <p style={{ marginBottom: "20px", color: "var(--ash)", fontSize: "14px" }}>
                Sprawdź godziny odprawiania Eucharystii w niedziele i powszednie dni.
              </p>
              <a className="text-link" href="#msze">
                Zobacz godziny →
              </a>
            </article>
          </MotionReveal>

          <MotionReveal delay={0.3}>
            <article
              className="card"
              style={{
                padding: "28px",
                display: "flex",
                flexDirection: "column",
                minHeight: "220px",
              }}
            >
              <span style={{ marginBottom: "auto", color: "var(--fog)", fontSize: "13px", fontWeight: 500 }}>03</span>
              <h3 style={{ margin: "20px 0 8px" }}>Kancelaria</h3>
              <p style={{ marginBottom: "20px", color: "var(--ash)", fontSize: "14px" }}>
                Godziny otwarcia, kontakt oraz aktualne powiadomienia kancelarii.
              </p>
              <a className="text-link" href="#kancelaria">
                Sprawdź kancelarię →
              </a>
            </article>
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}
