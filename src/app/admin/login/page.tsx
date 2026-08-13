"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.error || "Błędne hasło");
      }
    } catch {
      setError("Wystąpił błąd logowania");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "var(--parchment)",
        padding: "20px",
      }}
    >
      <div
        style={{
          maxWidth: "420px",
          width: "100%",
          padding: "clamp(24px, 5vw, 36px)",
          background: "var(--paper)",
          border: "1px solid var(--mist)",
          borderRadius: "var(--radius-large)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <span
            style={{
              display: "inline-grid",
              placeItems: "center",
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              border: "1px solid var(--twilight)",
              fontSize: "20px",
              fontFamily: "var(--serif)",
              marginBottom: "12px",
            }}
          >
            †
          </span>
          <p className="eyebrow" style={{ marginBottom: "4px" }}>
            Parafia Doruchów
          </p>
          <h1 style={{ fontSize: "clamp(22px, 5vw, 28px)", margin: 0 }}>Panel Administratora</h1>
        </div>

        <form onSubmit={handleLogin}>
          <div className="field">
            <label htmlFor="password">Hasło dostępu</label>
            <input
              id="password"
              type="password"
              placeholder="Wprowadź hasło admina"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <div
              style={{
                marginBottom: "16px",
                padding: "10px",
                background: "#fce8e6",
                color: "#c5221f",
                borderRadius: "6px",
                fontSize: "14px",
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-dark"
            style={{ width: "100%", justifyContent: "center" }}
            disabled={loading}
          >
            {loading ? "Logowanie..." : "Zaloguj się"}
          </button>
        </form>

        <div style={{ marginTop: "24px", textAlign: "center" }}>
          <Link href="/" className="text-link" style={{ fontSize: "13px" }}>
            ← Powrót do strony parafii
          </Link>
        </div>
      </div>
    </div>
  );
}
