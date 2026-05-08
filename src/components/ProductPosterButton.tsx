"use client";

import QRCode from "qrcode";
import { useEffect, useRef, useState } from "react";

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
  producerSlug: string;
  brandSlug: string;
}

const SITE_BASE = "https://www.norenfoods.com";

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export function ProductPosterButton(props: PosterData) {
  const posterRef = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState(false);
  const [detailQrDataUrl, setDetailQrDataUrl] = useState<string | null>(null);
  const topAwards = props.awards.slice(0, 3);
  const detailUrl = `${SITE_BASE}/producer/${props.producerSlug}/brand/${props.brandSlug}`;

  useEffect(() => {
    let cancelled = false;
    QRCode.toDataURL(detailUrl, {
      width: 320,
      margin: 1,
      color: { dark: "#0a0d14", light: "#ffffff" },
      errorCorrectionLevel: "M",
    })
      .then((url) => {
        if (!cancelled) setDetailQrDataUrl(url);
      })
      .catch((err) => console.error("QR generation failed", err));
    return () => {
      cancelled = true;
    };
  }, [detailUrl]);

  async function generate() {
    if (!posterRef.current || busy) return;
    setBusy(true);
    try {
      const domtoimage = (await import("dom-to-image-more")).default;
      const dataUrl = await domtoimage.toPng(posterRef.current, {
        width: 1080,
        height: 2200,
        scale: 2,
        bgcolor: "#0a0a0a",
      });
      const link = document.createElement("a");
      link.download = `${slug(props.name)}-poster.png`;
      link.href = dataUrl;
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

      {/* Off-screen poster (1080x2200). Position fixed off-screen so it renders into the DOM but is invisible. */}
      <div
        aria-hidden
        ref={posterRef}
        className="poster-root"
        style={{
          position: "fixed",
          top: -100000,
          left: -100000,
          width: 1080,
          height: 2200,
          background: "linear-gradient(180deg, #0a0d14 0%, #14181f 100%)",
          color: "#f4f4f5",
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
          textRendering: "geometricPrecision",
          padding: "80px 80px 140px",
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
          pointerEvents: "none",
          outline: "none",
          border: "none",
        }}
      >
        {/* Reset every nested element: kill the Tailwind/preflight border + any inherited outline so the captured PNG has no stray section rectangles. */}
        <style
          dangerouslySetInnerHTML={{
            __html:
              ".poster-root *, .poster-root { border: 0 !important; border-width: 0 !important; outline: 0 !important; outline-width: 0 !important; }",
          }}
        />
        {/* Top branding */}
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: 44,
              fontWeight: 800,
              letterSpacing: 12,
              color: "#facc15",
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
              WebkitFontSmoothing: "antialiased",
              MozOsxFontSmoothing: "grayscale",
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
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
              WebkitFontSmoothing: "antialiased",
              MozOsxFontSmoothing: "grayscale",
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
              fontSize: 40,
              fontWeight: 400,
              lineHeight: 1.15,
              margin: 0,
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
              color: "#fafafa",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              padding: "0 20px",
              WebkitFontSmoothing: "antialiased",
              MozOsxFontSmoothing: "grayscale",
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
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                WebkitFontSmoothing: "antialiased",
                MozOsxFontSmoothing: "grayscale",
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
                  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                  WebkitFontSmoothing: "antialiased",
                  MozOsxFontSmoothing: "grayscale",
                }}
              >
                {a}
              </div>
            ))}
          </div>
        )}

        {/* Price (plain text — no background) */}
        {props.pricing && (
          <div style={{ textAlign: "center", marginTop: 32 }}>
            {props.pricing.discountPct != null && (
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  letterSpacing: 4,
                  color: "#ffffff",
                  marginBottom: 8,
                  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                  WebkitFontSmoothing: "antialiased",
                  MozOsxFontSmoothing: "grayscale",
                }}
              >
                −{props.pricing.discountPct}% OFF
              </div>
            )}
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "center",
                gap: 20,
              }}
            >
              <span
                style={{
                  fontSize: 80,
                  fontWeight: 800,
                  color: "#f0a500",
                  letterSpacing: 1,
                  lineHeight: 1,
                  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                  WebkitFontSmoothing: "antialiased",
                  MozOsxFontSmoothing: "grayscale",
                }}
              >
                ¥{props.pricing.saleCny.toLocaleString("en-US")}
              </span>
              {props.pricing.originalCny != null && (
                <span
                  style={{
                    fontSize: 36,
                    color: "#888888",
                    textDecoration: "line-through",
                    fontWeight: 500,
                    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                    WebkitFontSmoothing: "antialiased",
                    MozOsxFontSmoothing: "grayscale",
                  }}
                >
                  ¥{props.pricing.originalCny.toLocaleString("en-US")}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Two QR codes side-by-side (centered) + shared branding */}
        <div
          style={{
            marginTop: 44,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              gap: 60,
            }}
          >
            {/* Left: detail-page QR */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div
                style={{
                  background: "#fff",
                  padding: 12,
                  borderRadius: 12,
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
                }}
              >
                {detailQrDataUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={detailQrDataUrl}
                    alt=""
                    style={{
                      width: 240,
                      height: 240,
                      objectFit: "contain",
                      display: "block",
                    }}
                  />
                )}
              </div>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: "#fafafa",
                  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                  WebkitFontSmoothing: "antialiased",
                  MozOsxFontSmoothing: "grayscale",
                }}
              >
                Scan for details
              </div>
              <div
                style={{
                  fontSize: 15,
                  color: "rgba(255, 255, 255, 0.55)",
                  letterSpacing: 1,
                  marginTop: -4,
                  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                  WebkitFontSmoothing: "antialiased",
                  MozOsxFontSmoothing: "grayscale",
                }}
              >
                扫码查看详情
              </div>
            </div>

            {/* Right: WeChat QR */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div
                style={{
                  background: "#fff",
                  padding: 12,
                  borderRadius: 12,
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/wechat.png"
                  alt=""
                  crossOrigin="anonymous"
                  style={{
                    width: 320,
                    height: 320,
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              </div>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#fafafa",
                  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                  WebkitFontSmoothing: "antialiased",
                  MozOsxFontSmoothing: "grayscale",
                }}
              >
                微信扫码下单
              </div>
              <div
                style={{
                  fontSize: 15,
                  color: "rgba(255, 255, 255, 0.55)",
                  letterSpacing: 1,
                  marginTop: -4,
                  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                  WebkitFontSmoothing: "antialiased",
                  MozOsxFontSmoothing: "grayscale",
                }}
              >
                Scan to order
              </div>
            </div>
          </div>

          {/* Shared branding line */}
          <div style={{ marginTop: 12 }}>
            <div
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: "#facc15",
                letterSpacing: 2,
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                WebkitFontSmoothing: "antialiased",
                MozOsxFontSmoothing: "grayscale",
              }}
            >
              Bravo Millers · Norenfoods
            </div>
            <div
              style={{
                marginTop: 6,
                fontSize: 15,
                color: "rgba(255, 255, 255, 0.45)",
                letterSpacing: 1,
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                WebkitFontSmoothing: "antialiased",
                MozOsxFontSmoothing: "grayscale",
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
