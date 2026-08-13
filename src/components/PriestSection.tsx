"use client";

import { PriestInfo } from "@/lib/types";
import MotionReveal from "./MotionReveal";

interface Props {
  priest?: PriestInfo;
}

export default function PriestSection({ priest }: Props) {
  const info: PriestInfo = priest || {
    name: "Ks. Ireneusz Powaga",
    title: "Proboszcz parafii",
    bio: "Duszpasterz naszej wspólnoty parafialnej w Doruchowie. Dba o rozwój duchowy parafian, opiekuje się zabytkowym kościołem oraz prowadzi duszpasterstwo dzieci, młodzieży i rodzin.",
    image: "/zdjecia/zzewnatrz5.jpg",
  };

  return (
    <section
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
              alignItems: "center",
            }}
          >
            <div
              style={{
                aspectRatio: "4 / 5",
                maxHeight: "480px",
                overflow: "hidden",
                borderRadius: "var(--radius-card)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              }}
            >
              <img
                src="/zdjecia/zzewnatrz5.jpg"
                alt={info.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            <div>
              <p className="eyebrow">Posługa kapłańska</p>
              <h2 style={{ marginBottom: "6px" }}>{info.title}</h2>
              <p
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: "clamp(30px, 4vw, 42px)",
                  color: "var(--graphite)",
                  margin: "0 0 20px",
                }}
              >
                {info.name}
              </p>
              <p
                style={{
                  maxWidth: "580px",
                  color: "var(--ash)",
                  fontSize: "16px",
                  lineHeight: 1.7,
                  marginBottom: "28px",
                }}
              >
                {info.bio}
              </p>
              <a href="#kancelaria" className="text-link">
                Kontakt z ks. Proboszczem →
              </a>
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
