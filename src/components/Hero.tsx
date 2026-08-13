export default function Hero() {
  return (
    <header
      id="start"
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "flex-end",
        padding: "120px 0 64px",
        background: `
          linear-gradient(180deg, rgba(20,25,27,0.2) 0%, rgba(20,25,27,0.1) 40%, rgba(20,25,27,0.7) 100%),
          url("/zdjecia/zzewnatrz3.jpg") center / cover no-repeat
        `,
      }}
    >
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div
          style={{
            maxWidth: "720px",
            padding: "36px",
            border: "1px solid rgba(255,255,255,0.35)",
            borderRadius: "var(--radius-large)",
            background: "rgba(20,25,28,0.42)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            color: "#fff",
            boxShadow: "0 10px 40px rgba(0,0,0,0.25)",
          }}
        >
          <p className="eyebrow" style={{ color: "rgba(255,255,255,0.85)" }}>
            Doruchów · Parafia rzymskokatolicka
          </p>
          <h1
            style={{
              maxWidth: "680px",
              marginBottom: "18px",
              color: "#fff",
              fontSize: "clamp(42px, 6vw, 68px)",
              lineHeight: 1.05,
            }}
          >
            Parafia pw. św. Stanisława Kostki
          </h1>
          <p
            style={{
              maxWidth: "540px",
              marginBottom: "28px",
              color: "rgba(255,255,255,0.9)",
              fontSize: "17px",
              lineHeight: 1.5,
            }}
          >
            Miejsce modlitwy, spotkania i wspólnoty. Zapraszamy do wspólnego przeżywania wiary i udziału w życiu naszej parafii w Doruchowie.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
            <a
              href="#ogloszenia"
              className="btn btn-primary"
              style={{ color: "#fff", borderColor: "var(--blue)", background: "rgba(65,161,207,0.25)" }}
            >
              Ogłoszenia parafialne
              <span className="arrow">→</span>
            </a>
            <a
              href="#msze"
              className="btn"
              style={{ color: "#fff", borderColor: "rgba(255,255,255,0.6)", background: "rgba(255,255,255,0.1)" }}
            >
              Msze Święte
              <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
