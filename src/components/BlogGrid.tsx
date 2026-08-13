"use client";

import { useState } from "react";
import Link from "next/link";
import { BlogPost } from "@/db/schema";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MotionReveal from "./MotionReveal";

interface Props {
  posts: BlogPost[];
  limit?: number;
  showMoreBtn?: boolean;
  enablePagination?: boolean;
}

export default function BlogGrid({ posts, limit, showMoreBtn, enablePagination }: Props) {
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 12;
  const totalPages = enablePagination ? Math.ceil(posts.length / pageSize) : 1;

  const displayedPosts = limit
    ? posts.slice(0, limit)
    : enablePagination
    ? posts.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : posts;

  return (
    <section id="wydarzenia" className="section">
      <div className="container">
        <MotionReveal>
          <div className="section-header">
            <div>
              <p className="eyebrow">Galeria · Blog</p>
              <h2>Życie naszej wspólnoty</h2>
            </div>
            {showMoreBtn ? (
              <Link href="/blog" className="btn btn-primary">
                Wszystkie wydarzenia →
              </Link>
            ) : (
              <p>Zdjęcia, wspomnienia i relacje z wydarzeń w naszej parafii.</p>
            )}
          </div>
        </MotionReveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "20px",
          }}
        >
          {displayedPosts.map((post, idx) => (
            <MotionReveal key={post.id} delay={idx * 0.05}>
              <Link
                href={`/blog/${post.slug}`}
                style={{
                  position: "relative",
                  height: "320px",
                  overflow: "hidden",
                  borderRadius: "var(--radius-card)",
                  background: "var(--graphite)",
                  display: "block",
                }}
              >
                <img
                  src={post.coverImage}
                  alt={post.title}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.4s ease",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: "auto 16px 16px 16px",
                    padding: "20px",
                    borderRadius: "12px",
                    background: "rgba(20,20,24,0.65)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    color: "#fff",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                >
                  <p className="eyebrow" style={{ marginBottom: "4px", color: "rgba(255,255,255,0.75)", fontSize: "12px" }}>
                    {post.date}
                  </p>
                  <h3 style={{ margin: 0, color: "#fff", fontSize: "20px", lineHeight: 1.2 }}>
                    {post.title}
                  </h3>
                </div>
              </Link>
            </MotionReveal>
          ))}
        </div>

        {/* Pagination bar for 12 items/page */}
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

        {showMoreBtn && displayedPosts.length > 0 && (
          <MotionReveal delay={0.3}>
            <div style={{ marginTop: "32px", textAlign: "center" }}>
              <Link href="/blog" className="btn btn-primary">
                Przeglądaj wszystkie artykuły i galerię →
              </Link>
            </div>
          </MotionReveal>
        )}
      </div>
    </section>
  );
}
