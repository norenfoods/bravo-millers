"use client";

import { useRef, useState } from "react";

export interface PosterPricing {
  saleCny: number;
  originalCny?: number;
  discountPct?: number;
}

export interface PosterData {
  name: string;
  subtitle?: string;
  imagePath?: string;
  awards: string[];
  pricing?: PosterPricing;
}

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export function ProductPosterButton(props: PosterData) {
  const posterRef = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState(false);
  const topAwards = props.awards.slice(0, 3);

  async function generate() {
    if (!posterRef.current || busy) return;
    setBusy(true);
    try {
      const { default: html2canvas } = await import("html2canvas");
      const canvas = await html2canvas(posterRef.current, {
        backgroundColor: "#0a0a0a",
        useCORS: true,
        scale: 1,
        logging: false,
        width: 1080,
        height: 1920,
      });
      const link = document.createElement("a");
      link.download = `${slug(props.name)}-poster.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("Poster generation failed", err);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={generate}
        disabled={busy}
        className="inline-flex items-center justify-center gap-2 h-9 px-5 rounded-full border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-sm font-medium text-amber-200 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <span aria-hidden>📥</span>
        {busy ? "Generating…" : "Download Poster"}
      </button>

      {/* Off-screen poster (1080x1920). Position fixed off-screen so it renders into the DOM but is invisible. */}
      <div
        aria-hidden
        ref={posterRef}
        style={{
          position: "fixed",
          top: -100000,
          left: -100000,
          width: 1080,
          height: 1920,
          background: "linear-gradient(180deg, #0a0d14 0%, #14181f 100%)",
          color: "#f4f4f5",
          fontFamily:
            'system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          padding: "70px 80px",
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
          pointerEvents: "none",
        }}
      >
        {/* Top branding */}
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: 44,
              fontWeight: 800,
              letterSpacing: 12,
              color: "#facc15",
              fontFamily: '"Times New Roman", serif',
            }}
          >
            BRAVO MILLERS
          </div>
          <div
            style={{
              marginTop: 14,
              fontSize: 18,
              color: "rgba(250, 204, 21, 0.75)",
              letterSpacing: 4,
            }}
          >
            FLOS OLEI 2025 · BEST IMPORTER OF THE YEAR
          </div>
          <div
            style={{
              marginTop: 18,
              height: 1,
              background:
                "linear-gradient(90deg, transparent 0%, rgba(250,204,21,0.4) 50%, transparent 100%)",
            }}
          />
        </div>

        {/* Bottle image */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 30,
            marginBottom: 10,
          }}
        >
          {props.imagePath ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={props.imagePath}
              alt=""
              crossOrigin="anonymous"
              style={{
                maxHeight: 820,
                maxWidth: 700,
                objectFit: "contain",
                filter: "drop-shadow(0 40px 60px rgba(0, 0, 0, 0.65))",
              }}
            />
          ) : (
            <div
              style={{
                width: 400,
                height: 600,
                background: "#1a1f2a",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 16,
              }}
            />
          )}
        </div>

        {/* Product name */}
        <div style={{ textAlign: "center", marginTop: 8 }}>
          <h1
            style={{
              fontSize: 56,
              fontWeight: 600,
              lineHeight: 1.1,
              margin: 0,
              fontFamily: '"Times New Roman", serif',
              color: "#fafafa",
            }}
          >
            {props.name}
          </h1>
          {props.subtitle && (
            <div
              style={{
                marginTop: 14,
                fontSize: 18,
                color: "rgba(255,255,255,0.55)",
                letterSpacing: 1,
              }}
            >
              {props.subtitle}
            </div>
          )}
        </div>

        {/* Awards */}
        {topAwards.length > 0 && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
              marginTop: 28,
              maxWidth: 880,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {topAwards.map((a) => (
              <div
                key={a}
                style={{
                  padding: "10px 22px",
                  borderRadius: 999,
                  border: "1px solid rgba(250, 204, 21, 0.45)",
                  background: "rgba(250, 204, 21, 0.08)",
                  color: "#fde68a",
                  fontSize: 20,
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                  textAlign: "center",
                }}
              >
                {a}
              </div>
            ))}
          </div>
        )}

        {/* Price (sale badge style) */}
        {props.pricing && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: 32,
            }}
          >
            <div
              style={{
                background: "#dc2626",
                color: "#fff",
                padding: "18px 32px",
                borderRadius: 18,
                textAlign: "center",
                boxShadow: "0 14px 32px rgba(220, 38, 38, 0.35)",
                minWidth: 260,
              }}
            >
              {props.pricing.discountPct != null && (
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 800,
                    letterSpacing: 3,
                    marginBottom: 8,
                  }}
                >
                  −{props.pricing.discountPct}%
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "center",
                  gap: 14,
                }}
              >
                <span style={{ fontSize: 60, fontWeight: 800, lineHeight: 1 }}>
                  ¥{props.pricing.saleCny.toLocaleString("en-US")}
                </span>
                {props.pricing.originalCny != null && (
                  <span
                    style={{
                      fontSize: 28,
                      textDecoration: "line-through",
                      opacity: 0.75,
                      fontWeight: 500,
                    }}
                  >
                    ¥{props.pricing.originalCny.toLocaleString("en-US")}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* QR code + branding footer (centered, stacked vertically) */}
        <div
          style={{
            marginTop: 44,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 18,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: 14,
              borderRadius: 14,
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/wechat.png"
              alt=""
              crossOrigin="anonymous"
              style={{
                width: 200,
                height: 200,
                objectFit: "contain",
                display: "block",
              }}
            />
          </div>
          <div>
            <div style={{ fontSize: 26, fontWeight: 700, color: "#fafafa" }}>
              微信扫码下单
            </div>
            <div
              style={{
                marginTop: 6,
                fontSize: 16,
                color: "rgba(255, 255, 255, 0.55)",
                letterSpacing: 1,
              }}
            >
              Scan to order
            </div>
            <div
              style={{
                marginTop: 18,
                fontSize: 20,
                fontWeight: 700,
                color: "#facc15",
                letterSpacing: 2,
              }}
            >
              Bravo Millers · Norenfoods
            </div>
            <div
              style={{
                marginTop: 4,
                fontSize: 14,
                color: "rgba(255, 255, 255, 0.45)",
                letterSpacing: 1,
              }}
            >
              Premium Italian Olive Oils · Shanghai
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
