"use client";

import { Announcement } from "@/db/schema";
import { useState } from "react";
import { X, Calendar, ChevronRight, Sparkles, ChevronLeft } from "lucide-react";
import Link from "next/link";
import MotionReveal from "./MotionReveal";

interface Props {
  announcements: Announcement[];
  limit?: number;
  showMoreBtn?: boolean;
  enablePagination?: boolean;
}

export default function Announcements({ announcements, limit, showMoreBtn, enablePagination }: Props) {
  const [selected, setSelected] = useState<Announcement | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 12;
  const totalPages = enablePagination ? Math.ceil(announcements.length / pageSize) : 1;

  const displayedList = limit
    ? announcements.slice(0, limit)
    : enablePagination
    ? announcements.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : announcements;

  return (
    <section id="ogloszenia" className="section">
      <div className="container">
        <MotionReveal>
          <div className="section-header">
            <div>
              <p className="eyebrow">Aktualności Duszpasterskie</p>
              <h2>Ogłoszenia Parafialne</h2>
            </div>
            {showMoreBtn && (
              <Link href="/ogloszenia" className="btn btn-primary">
                Wszystkie ogłoszenia →
              </Link>
            )}
          </div>
        </MotionReveal>

        {displayedList.length === 0 ? (
          <p style={{ padding: "30px 0", color: "var(--ash)" }}>Brak opublikowanych ogłoszeń.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {displayedList.map((item, idx) => {
              const isFirst = idx === 0 && currentPage === 1;

              return (
                <MotionReveal key={item.id} delay={idx * 0.05}>
                  <div
                    className="card"
                    style={{
                      padding: "28px",
                      border: isFirst ? "1px solid var(--blue)" : "1px solid var(--mist)",
                      background: isFirst ? "var(--paper)" : "var(--paper)",
                      boxShadow: isFirst
                        ? "0 4px 20px rgba(65,161,207,0.12)"
                        : "0 1px 2px rgba(0,0,0,0.05)",
                      borderRadius: "var(--radius-card)",
                      position: "relative",
                      transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    }}
                  >
                    {/* Header bar focusing on Date and Sunday */}
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "12px",
                        marginBottom: "16px",
                        paddingBottom: "14px",
                        borderBottom: "1px solid var(--mist)",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                        {isFirst && (
                          <span
                            style={{
                              background: "var(--blue)",
                              color: "#fff",
                              fontSize: "11px",
                              fontWeight: 600,
                              padding: "4px 10px",
                              borderRadius: "4px",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "4px",
                              textTransform: "uppercase",
                            }}
                          >
                            <Sparkles size={13} /> Aktualne Ogłoszenia Niedzielne
                          </span>
                        )}

                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            padding: "4px 12px",
                            background: "var(--linen)",
                            border: "1px solid var(--mist)",
                            borderRadius: "20px",
                            color: "var(--graphite)",
                            fontSize: "13px",
                            fontWeight: 500,
                          }}
                        >
                          <Calendar size={14} color="var(--blue)" />
                          {item.date}
                        </span>
                      </div>
                    </div>

                    {/* Liturgical Title & Main Content Preview */}
                    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "20px", alignItems: "flex-start" }}>
                      <div style={{ flex: "1 1 280px" }}>
                        <h3
                          style={{
                            fontSize: "clamp(24px, 3.5vw, 32px)",
                            marginBottom: "12px",
                            color: "var(--graphite)",
                            lineHeight: 1.1,
                          }}
                        >
                          {item.title}
                        </h3>

                        <p
                          style={{
                            color: "var(--charcoal)",
                            fontSize: "15px",
                            lineHeight: 1.6,
                            margin: 0,
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {item.content}
                        </p>
                      </div>

                      <button
                        onClick={() => setSelected(item)}
                        className="btn btn-primary"
                        style={{
                          whiteSpace: "nowrap",
                          alignSelf: "center",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        Pełna treść <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </MotionReveal>
              );
            })}
          </div>
        )}

        {/* Pagination Bar for 12 items/page */}
        {enablePagination && totalPages > 1 && (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", marginTop: "40px" }}>
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="btn"
              style={{ opacity: currentPage === 1 ? 0.5 : 1 }}
            >
              <ChevronLeft size={16} /> Poprzednie
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "8px",
                  border: "1px solid var(--mist)",
                  background: currentPage === page ? "var(--twilight)" : "var(--paper)",
                  color: currentPage === page ? "#fff" : "var(--charcoal)",
                  fontWeight: 600,
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="btn"
              style={{ opacity: currentPage === totalPages ? 0.5 : 1 }}
            >
              Następne <ChevronRight size={16} />
            </button>
          </div>
        )}

        {showMoreBtn && displayedList.length > 0 && (
          <MotionReveal delay={0.3}>
            <div style={{ marginTop: "36px", textAlign: "center" }}>
              <Link href="/ogloszenia" className="btn btn-dark">
                Zobacz wszystkie ogłoszenia i archiwum niedzielne →
              </Link>
            </div>
          </MotionReveal>
        )}
      </div>

      {/* Modal dialog for full announcement */}
      {selected && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            background: "rgba(0,0,0,0.65)",
            backdropFilter: "blur(8px)",
            display: "grid",
            placeItems: "center",
            padding: "20px",
          }}
          onClick={() => setSelected(null)}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "16px",
              maxWidth: "720px",
              width: "100%",
              maxHeight: "85vh",
              overflowY: "auto",
              padding: "36px",
              boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
              border: "1px solid var(--mist)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
              <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "var(--blue)", fontSize: "13px", fontWeight: 500, marginBottom: "6px" }}>
                  <Calendar size={15} /> {selected.date}
                </div>
                <h2 style={{ fontSize: "32px", margin: 0, color: "var(--graphite)" }}>{selected.title}</h2>
              </div>
              <button
                onClick={() => setSelected(null)}
                style={{
                  background: "var(--linen)",
                  border: "1px solid var(--mist)",
                  borderRadius: "50%",
                  width: "36px",
                  height: "36px",
                  display: "grid",
                  placeItems: "center",
                  cursor: "pointer",
                  color: "var(--charcoal)",
                }}
              >
                <X size={18} />
              </button>
            </div>

            <div
              style={{
                whiteSpace: "pre-wrap",
                color: "var(--charcoal)",
                fontSize: "16px",
                lineHeight: 1.75,
                borderTop: "1px solid var(--mist)",
                paddingTop: "24px",
              }}
            >
              {selected.content}
            </div>

            <div style={{ marginTop: "32px", textAlign: "right" }}>
              <button onClick={() => setSelected(null)} className="btn btn-dark">
                Zamknij ogłoszenia
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
