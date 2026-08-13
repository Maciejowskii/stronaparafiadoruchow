"use client";

import { OfficeHourItem, OfficeVacationInfo, ContactInfo } from "@/lib/types";
import ContactForm from "./ContactForm";
import MotionReveal from "./MotionReveal";

interface Props {
  officeHours?: OfficeHourItem[];
  vacationInfo?: OfficeVacationInfo;
  contactInfo?: ContactInfo;
}

export default function OfficeSection({ officeHours, vacationInfo, contactInfo }: Props) {
  const hours = officeHours || [
    { day: "Poniedziałek", hours: "16:00–17:00" },
    { day: "Środa", hours: "16:00–17:00" },
    { day: "Piątek", hours: "16:00–17:00" },
  ];

  const contact = contactInfo || {
    phone: "+48 62 730 11 22",
    email: "kancelaria@parafia-doruchow.pl",
    address: "ul. Kępińska 1, 63-505 Doruchów",
  };

  return (
    <section
      id="kancelaria"
      className="section"
      style={{ background: "var(--paper)", borderTop: "1px solid var(--mist)" }}
    >
      <div id="kontakt" className="container">
        <MotionReveal>
          <div className="section-header">
            <div>
              <p className="eyebrow">Kontakt i Kancelaria</p>
              <h2>Jesteśmy tutaj.</h2>
            </div>
            <p style={{ color: "var(--ash)" }}>
              Masz pytania lub chcesz załatwić sprawę w kancelarii parafialnej? Napisz do nas lub odwiedź nas w podanych godzinach.
            </p>
          </div>
        </MotionReveal>

        {/* Office Vacation Notice */}
        {vacationInfo?.enabled && (
          <MotionReveal delay={0.1}>
            <div
              style={{
                marginBottom: "36px",
                padding: "20px 24px",
                background: "#fff9e6",
                border: "1px solid #f0d58c",
                borderRadius: "var(--radius-card)",
                color: "#7a5600",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                <span
                  style={{
                    background: "#d99000",
                    color: "#fff",
                    fontSize: "11px",
                    fontWeight: 700,
                    padding: "3px 8px",
                    borderRadius: "4px",
                    textTransform: "uppercase",
                  }}
                >
                  Uwaga: Przerwa w pracy kancelarii
                </span>
                <strong style={{ fontSize: "16px" }}>{vacationInfo.title}</strong>
              </div>
              {vacationInfo.period && (
                <p style={{ margin: "0 0 6px", fontWeight: 600, fontSize: "14px" }}>
                  Okres obowiązywania: {vacationInfo.period}
                </p>
              )}
              <p style={{ margin: 0, fontSize: "14px", lineHeight: 1.5 }}>
                {vacationInfo.message}
              </p>
            </div>
          </MotionReveal>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "60px",
          }}
        >
          <MotionReveal delay={0.1}>
            <div>
              <div style={{ paddingBottom: "24px", borderBottom: "1px solid var(--mist)" }}>
                <h3 style={{ margin: "0 0 20px" }}>Godziny otwarcia kancelarii</h3>

                <div style={{ borderTop: "1px solid var(--mist)" }}>
                  {hours.map((h, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "14px 0",
                        borderBottom: "1px solid var(--mist)",
                        fontSize: "14px",
                      }}
                    >
                      <span style={{ fontWeight: 500 }}>{h.day}</span>
                      <span style={{ color: "var(--graphite)", fontWeight: 500 }}>{h.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: "28px" }}>
                <p style={{ marginBottom: "16px", color: "var(--ash)", fontSize: "14px" }}>
                  <strong style={{ display: "block", color: "var(--graphite)", fontWeight: 500, marginBottom: "2px" }}>
                    Telefon kancelarii
                  </strong>
                  {contact.phone}
                </p>
                <p style={{ marginBottom: "16px", color: "var(--ash)", fontSize: "14px" }}>
                  <strong style={{ display: "block", color: "var(--graphite)", fontWeight: 500, marginBottom: "2px" }}>
                    Adres E-mail
                  </strong>
                  {contact.email}
                </p>
                <p style={{ marginBottom: "16px", color: "var(--ash)", fontSize: "14px" }}>
                  <strong style={{ display: "block", color: "var(--graphite)", fontWeight: 500, marginBottom: "2px" }}>
                    Adres Parafii
                  </strong>
                  {contact.address}
                </p>
              </div>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.2}>
            <div>
              <ContactForm />
            </div>
          </MotionReveal>
        </div>

        {/* Interactive Google Map */}
        <MotionReveal delay={0.3}>
          <div
            style={{
              position: "relative",
              minHeight: "420px",
              marginTop: "60px",
              overflow: "hidden",
              border: "1px solid var(--mist)",
              borderRadius: "var(--radius-card)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            }}
          >
            <iframe
              title="Lokalizacja Parafii w Doruchowie"
              src="https://maps.google.com/maps?q=Parafia+pw.+%C5%9Bw.+Stanis%C5%82awa+Kostki+Doruch%C3%B3w+ul.+K%C4%99pi%C5%84ska+1&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="420"
              style={{ border: 0, display: "block" }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
