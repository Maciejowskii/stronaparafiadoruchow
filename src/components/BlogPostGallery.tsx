"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X, Maximize2, Image as ImageIcon } from "lucide-react";
import MotionReveal from "./MotionReveal";

interface Props {
  images: string[];
  pageSize?: number;
}

export default function BlogPostGallery({ images, pageSize = 12 }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!images || images.length === 0) return null;

  const totalPages = Math.ceil(images.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentImages = images.slice(startIndex, startIndex + pageSize);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : images.length - 1));
      }
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev !== null && prev < images.length - 1 ? prev + 1 : 0));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, images.length]);

  return (
    <div style={{ marginTop: "48px", borderTop: "1px solid var(--mist)", paddingTop: "36px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h3 style={{ margin: "0 0 4px", fontSize: "28px" }}>Galeria zdjęć</h3>
          <p style={{ color: "var(--ash)", margin: 0, fontSize: "14px" }}>
            Łącznie {images.length} zdjęć w tej relacji
          </p>
        </div>

        {totalPages > 1 && (
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "13px", color: "var(--ash)" }}>
              Strona {currentPage} z {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="btn"
              style={{ padding: "4px 10px", fontSize: "12px", opacity: currentPage === 1 ? 0.5 : 1 }}
            >
              <ChevronLeft size={16} /> Poprzednie
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="btn"
              style={{ padding: "4px 10px", fontSize: "12px", opacity: currentPage === totalPages ? 0.5 : 1 }}
            >
              Następne <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Grid of Thumbnails with Lazy Loading */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "16px",
        }}
      >
        {currentImages.map((imgUrl, localIdx) => {
          const globalIdx = startIndex + localIdx;
          return (
            <MotionReveal key={imgUrl + globalIdx} delay={localIdx * 0.05}>
              <div
                onClick={() => setLightboxIndex(globalIdx)}
                style={{
                  position: "relative",
                  height: "210px",
                  overflow: "hidden",
                  borderRadius: "var(--radius-card)",
                  border: "1px solid var(--mist)",
                  cursor: "pointer",
                  background: "var(--linen)",
                }}
              >
                <img
                  src={imgUrl}
                  alt={`Zdjęcie ${globalIdx + 1}`}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.3s ease",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(0,0,0,0.25)",
                    display: "grid",
                    placeItems: "center",
                    opacity: 0,
                    transition: "opacity 0.2s ease",
                    color: "#fff",
                  }}
                  className="hover-overlay"
                >
                  <Maximize2 size={24} />
                </div>
              </div>
            </MotionReveal>
          );
        })}
      </div>

      {/* Bottom Pagination controls */}
      {totalPages > 1 && (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", marginTop: "32px" }}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                border: "1px solid var(--mist)",
                background: currentPage === page ? "var(--twilight)" : "var(--paper)",
                color: currentPage === page ? "#fff" : "var(--charcoal)",
                fontWeight: 600,
                fontSize: "13px",
                cursor: "pointer",
              }}
            >
              {page}
            </button>
          ))}
        </div>
      )}

      {/* LIGHTBOX MODAL */}
      {lightboxIndex !== null && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 300,
            background: "rgba(0,0,0,0.92)",
            backdropFilter: "blur(10px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "24px",
          }}
          onClick={() => setLightboxIndex(null)}
        >
          {/* Top Bar */}
          <div
            style={{
              width: "100%",
              maxWidth: "1200px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "#fff",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px" }}>
              <ImageIcon size={18} />
              <span>
                Zdjęcie {lightboxIndex + 1} z {images.length}
              </span>
            </div>
            <button
              onClick={() => setLightboxIndex(null)}
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.3)",
                color: "#fff",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                display: "grid",
                placeItems: "center",
                cursor: "pointer",
              }}
            >
              <X size={22} />
            </button>
          </div>

          {/* Main Photo View */}
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "1100px",
              maxHeight: "75vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[lightboxIndex]}
              alt={`Zdjęcie ${lightboxIndex + 1}`}
              style={{
                maxWidth: "100%",
                maxHeight: "75vh",
                objectFit: "contain",
                borderRadius: "8px",
                boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
              }}
            />

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setLightboxIndex((prev) =>
                      prev !== null && prev > 0 ? prev - 1 : images.length - 1
                    )
                  }
                  style={{
                    position: "absolute",
                    left: "-20px",
                    background: "rgba(0,0,0,0.5)",
                    border: "1px solid rgba(255,255,255,0.3)",
                    color: "#fff",
                    borderRadius: "50%",
                    width: "48px",
                    height: "48px",
                    display: "grid",
                    placeItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={() =>
                    setLightboxIndex((prev) =>
                      prev !== null && prev < images.length - 1 ? prev + 1 : 0
                    )
                  }
                  style={{
                    position: "absolute",
                    right: "-20px",
                    background: "rgba(0,0,0,0.5)",
                    border: "1px solid rgba(255,255,255,0.3)",
                    color: "#fff",
                    borderRadius: "50%",
                    width: "48px",
                    height: "48px",
                    display: "grid",
                    placeItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>

          {/* Bottom Counter Bar */}
          <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px" }}>
            Użyj strzałek na klawiaturze lub przycisków do nawigacji
          </div>
        </div>
      )}
    </div>
  );
}
