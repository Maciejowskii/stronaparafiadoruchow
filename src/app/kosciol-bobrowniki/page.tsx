import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Calendar, Church, MapPin, ShieldCheck, Clock, Bookmark } from "lucide-react";
import MotionReveal from "@/components/MotionReveal";
import { db } from "@/db";
import { siteSettings } from "@/db/schema";
import { MassScheduleItem } from "@/lib/types";

export const revalidate = 0;

export const metadata = {
  title: "Kościół św. Barbary w Bobrownikach | Parafia Doruchów",
  description: "Zabytkowy drewniany kościół filialny pw. św. Barbary w Bobrownikach z XVII wieku. Historia, architektura, polichromie oraz porządek Mszy Świętych.",
};

export default async function BobrownikiPage() {
  const settingsRows = await db.select().from(siteSettings);
  let massSchedule: MassScheduleItem[] = [];
  const massRow = settingsRows.find((r) => r.key === "mass_schedule");
  if (massRow) {
    try {
      massSchedule = JSON.parse(massRow.value);
    } catch {}
  }

  // Filter dynamic schedule items for Bobrowniki
  const bobrownikiItems = massSchedule.filter((item) =>
    item.location?.toLowerCase().includes("bobrownik")
  );

  return (
    <>
      <Navigation />
      <main style={{ minHeight: "100vh", paddingTop: "110px", paddingBottom: "88px" }}>
        {/* HERO SECTION */}
        <section
          style={{
            position: "relative",
            minHeight: "460px",
            overflow: "hidden",
            display: "flex",
            alignItems: "flex-end",
            padding: "48px 0",
            background: `
              linear-gradient(180deg, rgba(20,25,27,0.3) 0%, rgba(20,25,27,0.75) 100%),
              url("/zdjecia/zzewnatrz5.jpg") center / cover no-repeat
            `,
            color: "#fff",
            marginBottom: "60px",
          }}
        >
          <div className="container" style={{ position: "relative", zIndex: 2 }}>
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                color: "rgba(255,255,255,0.85)",
                fontSize: "14px",
                marginBottom: "20px",
                textDecoration: "none",
              }}
            >
              ← Powrót do strony głównej
            </Link>
            <p className="eyebrow" style={{ color: "rgba(255,255,255,0.85)" }}>
              Kościół Filialny · Parafia Doruchów
            </p>
            <h1
              style={{
                fontSize: "clamp(36px, 5.5vw, 58px)",
                color: "#fff",
                lineHeight: 1.1,
                margin: "0 0 16px",
                maxWidth: "800px",
              }}
            >
              Kościół pw. świętej Barbary w Bobrownikach
            </h1>
            <p style={{ maxWidth: "620px", fontSize: "18px", color: "rgba(255,255,255,0.9)", margin: 0, lineHeight: 1.5 }}>
              Zabytkowa drewniana świątynia wzniesiona w połowie XVII wieku. Perła architektury sakralnej ziemi ostrzeszowskiej.
            </p>
          </div>
        </section>

        <div className="container">
          {/* KEY FACTS GRID */}
          <MotionReveal>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "16px",
                marginBottom: "56px",
              }}
            >
              <div className="card" style={{ padding: "20px" }}>
                <span style={{ color: "var(--blue)", display: "block", marginBottom: "6px" }}><Church size={20} /></span>
                <strong style={{ display: "block", fontSize: "15px", color: "var(--graphite)" }}>Drewniany z XVII w.</strong>
                <span style={{ fontSize: "13px", color: "var(--ash)" }}>Konstrukcja zrębowa, kryta gontem</span>
              </div>

              <div className="card" style={{ padding: "20px" }}>
                <span style={{ color: "var(--blue)", display: "block", marginBottom: "6px" }}><Calendar size={20} /></span>
                <strong style={{ display: "block", fontSize: "15px", color: "var(--graphite)" }}>Wspomnienie patronalne</strong>
                <span style={{ fontSize: "13px", color: "var(--ash)" }}>4 grudnia (Św. Barbara)</span>
              </div>

              <div className="card" style={{ padding: "20px" }}>
                <span style={{ color: "var(--blue)", display: "block", marginBottom: "6px" }}><ShieldCheck size={20} /></span>
                <strong style={{ display: "block", fontSize: "15px", color: "var(--graphite)" }}>Rejestr Zabytków</strong>
                <span style={{ fontSize: "13px", color: "var(--ash)" }}>nr 704/Wlkp/A z 1969 i 2008 r.</span>
              </div>

              <div className="card" style={{ padding: "20px" }}>
                <span style={{ color: "var(--blue)", display: "block", marginBottom: "6px" }}><MapPin size={20} /></span>
                <strong style={{ display: "block", fontSize: "15px", color: "var(--graphite)" }}>Miejscowość</strong>
                <span style={{ fontSize: "13px", color: "var(--ash)" }}>Bobrowniki, pow. ostrzeszowski</span>
              </div>
            </div>
          </MotionReveal>

          {/* DYNAMIC MASS TIMES IN BOBROWNIKI FROM ADMIN SETTINGS */}
          <MotionReveal delay={0.1}>
            <div
              style={{
                marginBottom: "60px",
                padding: "32px",
                background: "#eef7fc",
                border: "1px solid #c2e2f3",
                borderRadius: "var(--radius-large)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--blue)", fontWeight: 600, fontSize: "14px", textTransform: "uppercase", marginBottom: "12px" }}>
                <Clock size={16} /> Msze Święte w Kościele Filialnym w Bobrownikach
              </div>

              {bobrownikiItems.length === 0 ? (
                <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
                  <span style={{ fontSize: "18px", color: "var(--graphite)", fontWeight: 500 }}>Niedziele i Święta:</span>
                  <span style={{ padding: "10px 20px", background: "#fff", border: "1px solid var(--blue)", borderRadius: "10px", fontSize: "20px", fontWeight: 700, color: "var(--blue)" }}>09:15</span>
                  <span style={{ padding: "10px 20px", background: "#fff", border: "1px solid var(--blue)", borderRadius: "10px", fontSize: "20px", fontWeight: 700, color: "var(--blue)" }}>11:00</span>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {bobrownikiItems.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "16px",
                        paddingBottom: idx < bobrownikiItems.length - 1 ? "14px" : 0,
                        borderBottom: idx < bobrownikiItems.length - 1 ? "1px solid #d4ebf7" : "none",
                      }}
                    >
                      <div>
                        <h4 style={{ margin: "0 0 4px", fontSize: "20px", color: "var(--graphite)" }}>
                          {item.label}
                        </h4>
                        <p style={{ margin: 0, color: "var(--ash)", fontSize: "14px" }}>
                          Eucharystia w kościele św. Barbary
                        </p>
                      </div>

                      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                        {item.times.map((time, tidx) => (
                          <span
                            key={tidx}
                            style={{
                              padding: "10px 22px",
                              background: "#fff",
                              border: "1px solid var(--blue)",
                              borderRadius: "10px",
                              fontSize: "20px",
                              fontWeight: 700,
                              color: "var(--blue)",
                              boxShadow: "0 2px 8px rgba(65,161,207,0.12)",
                            }}
                          >
                            {time}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </MotionReveal>

          {/* MAIN CONTENT GRID: HISTORIA & ARCHITEKTURA */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "48px",
              marginBottom: "64px",
            }}
          >
            {/* HISTORIA */}
            <MotionReveal delay={0.2}>
              <div>
                <span className="eyebrow" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                  <Bookmark size={14} /> Rys Historyczny
                </span>
                <h2 style={{ fontSize: "36px", marginBottom: "20px" }}>Historia Świątyni</h2>
                <div style={{ fontSize: "16px", lineHeight: 1.8, color: "var(--charcoal)" }}>
                  <p style={{ marginBottom: "16px" }}>
                    Kościół świętej Barbary w Bobrownikach to rzymskokatolicki kościół filialny należący do parafii św. Stanisława Kostki w Doruchowie (dekanat Ostrzeszów diecezji kaliskiej). Świątynia — pierwotnie nosząca wezwanie Świętego Bartłomieja Apostoła — została wzniesiona <strong>około połowy XVII wieku</strong>.
                  </p>
                  <p style={{ marginBottom: "16px" }}>
                    W XVII wieku przez pewien czas kościół był własnością <strong>Braci Czeskich</strong>. W 1832 roku budowla została gruntownie wyremontowana przez Hipolita Bielinę.
                  </p>
                  <p style={{ marginBottom: "16px" }}>
                    W kolejnych dziesięcioleciach kościół był wielokrotnie odnawiany i konserwowany:
                  </p>
                  <ul style={{ paddingLeft: "20px", margin: "0 0 16px" }}>
                    <li style={{ marginBottom: "8px" }}><strong>1910 r.</strong> – odnowienie obiektu,</li>
                    <li style={{ marginBottom: "8px" }}><strong>1956 r.</strong> – wymiana gontów na dachu,</li>
                    <li style={{ marginBottom: "8px" }}><strong>1957 r.</strong> – wykonanie polichromii ściennej,</li>
                    <li style={{ marginBottom: "8px" }}><strong>1972 i 1975 r.</strong> – ponowna wymiana gontów oraz przebudowa prezbiterium,</li>
                    <li style={{ marginBottom: "8px" }}><strong>1979 r.</strong> – odnowienie polichromii przez Edwarda Haladyna,</li>
                    <li style={{ marginBottom: "8px" }}><strong>1992, 1996 i 1999 r.</strong> – prace konserwatorskie i wymiana pokrycia gontowego dachu.</li>
                  </ul>
                </div>
              </div>
            </MotionReveal>

            {/* ARCHITEKTURA I WNĘTRZE */}
            <MotionReveal delay={0.3}>
              <div>
                <span className="eyebrow" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                  <Church size={14} /> Sztuka i Wyposażenie
                </span>
                <h2 style={{ fontSize: "36px", marginBottom: "20px" }}>Architektura i Wnętrze</h2>
                <div style={{ fontSize: "16px", lineHeight: 1.8, color: "var(--charcoal)" }}>
                  <p style={{ marginBottom: "16px" }}>
                    Budowla jest drewniana, jednonawowa, wybudowana w tradycyjnej <strong>konstrukcji zrębowej (wieńcowej)</strong>. Kościół jest orientowany, nie posiada wieży frontowej.
                  </p>
                  <p style={{ marginBottom: "16px" }}>
                    Prezbiterium świątyni jest mniejsze w stosunku do nawy i zamknięte trójbocznie, z boku umieszczona jest zakrystia. Wejście znajduje się z boku i osłonięte jest daszkiem podpartym dwoma słupami.
                  </p>
                  <p style={{ marginBottom: "16px" }}>
                    Dach świątyni jest jednokalenicowy, pokryty gontem. Umieszczono na nim sześciokątną wieżyczkę na sygnaturkę, zwieńczoną gontowym stożkowym dachem hełmowym. Wnętrze nakrywa płaski strop.
                  </p>
                  <div style={{ background: "var(--linen)", padding: "20px", borderRadius: "12px", border: "1px solid var(--mist)" }}>
                    <strong style={{ display: "block", marginBottom: "8px", color: "var(--graphite)" }}>Cenne zabytki wnętrza:</strong>
                    <ul style={{ paddingLeft: "18px", margin: 0, fontSize: "15px" }}>
                      <li style={{ marginBottom: "6px" }}>Barokowy ołtarz główny (z II połowy XVII w.)</li>
                      <li style={{ marginBottom: "6px" }}>Ambona i konfesjonał (z połowy XVII w.)</li>
                      <li style={{ marginBottom: "6px" }}>Barokowo-ludowy krucyfiks w nawie (z II połowy XVII w.)</li>
                      <li>Polichromia ścienna przedstawiająca sceny z życia św. Barbary</li>
                    </ul>
                  </div>
                </div>
              </div>
            </MotionReveal>
          </div>

          {/* GOOGLE MAPS FOR BOBROWNIKI */}
          <MotionReveal delay={0.4}>
            <div style={{ marginTop: "48px" }}>
              <div style={{ marginBottom: "16px" }}>
                <span className="eyebrow">Dojazd i Mapa</span>
                <h3 style={{ fontSize: "28px", margin: "4px 0 0" }}>Lokalizacja Kościoła w Bobrownikach</h3>
              </div>
              <div
                style={{
                  position: "relative",
                  minHeight: "420px",
                  overflow: "hidden",
                  border: "1px solid var(--mist)",
                  borderRadius: "var(--radius-large)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                }}
              >
                <iframe
                  title="Lokalizacja Kościoła św. Barbary w Bobrownikach"
                  src="https://maps.google.com/maps?q=Ko%C5%9Bci%C3%B3%C5%82+pw.+%C5%9Bw.+Barbary+Bobrowniki+powiat+ostrzeszowski&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="420"
                  style={{ border: 0, display: "block" }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </MotionReveal>
        </div>
      </main>
      <Footer />
    </>
  );
}
