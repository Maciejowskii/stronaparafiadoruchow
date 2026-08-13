"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
        setMessage("Dziękujemy. Wiadomość została wysłana do kancelarii.");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
        setMessage("Wystąpił błąd podczas wysyłania. Spróbuj ponownie.");
      }
    } catch {
      setStatus("error");
      setMessage("Wystąpił błąd połączenia. Spróbuj ponownie.");
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px 16px" }}>
      <div className="field">
        <label htmlFor="name">Imię i nazwisko</label>
        <input id="name" name="name" type="text" placeholder="Twoje imię" required />
      </div>

      <div className="field">
        <label htmlFor="email">Adres E-mail</label>
        <input id="email" name="email" type="email" placeholder="twoj@email.pl" required />
      </div>

      <div className="field" style={{ gridColumn: "1 / -1" }}>
        <label htmlFor="subject">Temat wiadomości</label>
        <input id="subject" name="subject" type="text" placeholder="W czym możemy pomóc?" required />
      </div>

      <div className="field" style={{ gridColumn: "1 / -1" }}>
        <label htmlFor="message">Treść wiadomości</label>
        <textarea id="message" name="message" placeholder="Napisz wiadomość do kancelarii..." required />
      </div>

      {status === "success" && (
        <div style={{ gridColumn: "1 / -1", padding: "12px", background: "#e6f4ea", color: "#137333", borderRadius: "6px", fontSize: "14px" }}>
          {message}
        </div>
      )}

      {status === "error" && (
        <div style={{ gridColumn: "1 / -1", padding: "12px", background: "#fce8e6", color: "#c5221f", borderRadius: "6px", fontSize: "14px" }}>
          {message}
        </div>
      )}

      <div className="field" style={{ gridColumn: "1 / -1" }}>
        <button className="btn btn-dark" type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Wysyłanie..." : "Wyślij wiadomość"}
          <span className="arrow">→</span>
        </button>
      </div>
    </form>
  );
}
