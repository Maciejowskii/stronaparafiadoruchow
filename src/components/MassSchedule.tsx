"use client";

import { MassScheduleItem } from "@/lib/types";
import { Church, MapPin } from "lucide-react";
import Link from "next/link";
import MotionReveal from "./MotionReveal";

interface Props {
  schedule?: MassScheduleItem[];
}

export default function MassSchedule({ schedule }: Props) {
  const items = schedule || [
    { location: "Kościół parafialny w Doruchowie", label: "Dni powszednie", times: ["18:00"] },
    { location: "Kościół parafialny w Doruchowie", label: "Niedziele i Święta", times: ["07:00", "08:30", "10:00", "11:30"] },
    { location: "Kościół filialny pw. św. Barbary w Bobrownikach", label: "Niedziele i Święta", times: ["09:15", "11:00"] },
  ];

  return (
    <section
      id="msze"
      className="section"
      style={{
        background: "var(--paper)",
        borderTop: "1px solid var(--mist)",
        borderBottom: "1px solid var(--mist)",
      }}
    >
      <div className="container">
        <MotionReveal>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "60px",
              alignItems: "flex-start",
            }}
          >
            <div>
              <p className="eyebrow">Eucharystia</p>
              <h2>Porządek Mszy Świętych</h2>
              <p style={{ maxWidth: "460px", color: "var(--ash)", fontSize: "16px", lineHeight: 1.6, marginBottom: "24px" }}>
                Zapraszamy do wspólnej modlitwy i uczestnictwa w Eucharystii w kościele parafialnym w Doruchowie oraz w kościele filialnym w Bobrownikach.
              </p>

              <div
                style={{
                  padding: "16px 20px",
                  background: "var(--linen)",
                  border: "1px solid var(--mist)",
                  borderRadius: "var(--radius-card)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--blue)", fontWeight: 600, fontSize: "14px", marginBottom: "4px" }}>
                  <Church size={16} /> Kościół Filialny w Bobrownikach
                </div>
                <p style={{ margin: 0, fontSize: "13px", color: "var(--ash)" }}>
                  Zapoznaj się z historią, zabytkową architekturą i opisem kościoła św. Barbary w Bobrownikach.
                </p>
                <Link href="/kosciol-bobrowniki" className="text-link" style={{ marginTop: "10px", fontSize: "13px" }}>
                  Zobacz stronę Kościoła w Bobrownikach →
                </Link>
              </div>
            </div>

            <div style={{ borderTop: "1px solid var(--mist)" }}>
              {items.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: "20px 0",
                    borderBottom: "1px solid var(--mist)",
                  }}
                >
                  {item.location && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "12px",
                        fontWeight: 600,
                        color: item.location.includes("Bobrownik") ? "var(--blue)" : "var(--ash)",
                        textTransform: "uppercase",
                        marginBottom: "6px",
                        letterSpacing: "0.03em",
                      }}
                    >
                      <MapPin size={13} />
                      {item.location}
                    </div>
                  )}

                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                      gap: "12px",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ color: "var(--charcoal)", fontSize: "15px", fontWeight: 500 }}>
                      {item.label}
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {item.times.map((t, tidx) => (
                        <span
                          key={tidx}
                          style={{
                            padding: "6px 14px",
                            border: "1px solid var(--mist)",
                            borderRadius: "8px",
                            background: item.location?.includes("Bobrownik") ? "#eef7fc" : "var(--linen)",
                            color: item.location?.includes("Bobrownik") ? "var(--blue)" : "var(--graphite)",
                            fontSize: "15px",
                            fontWeight: 600,
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
