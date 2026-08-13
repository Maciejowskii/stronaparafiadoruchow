"use client";

import { OfficeVacationInfo } from "@/lib/types";
import { AlertTriangle, Info } from "lucide-react";

interface Props {
  vacationInfo?: OfficeVacationInfo;
}

export default function OfficeAlertBanner({ vacationInfo }: Props) {
  if (!vacationInfo || !vacationInfo.enabled) return null;

  return (
    <div
      style={{
        position: "relative",
        zIndex: 110,
        background: "#fff8e6",
        borderBottom: "1px solid #f0d58c",
        color: "#7a5600",
        padding: "12px 0",
        fontSize: "14px",
      }}
    >
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              background: "#d99000",
              color: "#fff",
              fontSize: "11px",
              fontWeight: 700,
              padding: "4px 10px",
              borderRadius: "4px",
              textTransform: "uppercase",
              letterSpacing: "0.02em",
            }}
          >
            <AlertTriangle size={13} /> Komunikat Kancelarii
          </span>
          <strong style={{ color: "#5c4100", fontSize: "14px" }}>{vacationInfo.title}</strong>
          {vacationInfo.period && <span style={{ fontWeight: 600 }}>({vacationInfo.period}):</span>}
          <span>{vacationInfo.message}</span>
        </div>
      </div>
    </div>
  );
}
