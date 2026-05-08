"use client";

import QRCode from "qrcode";
import { useEffect, useRef, useState } from "react";

const SITE_URL = "https://www.norenfoods.com";
const FONT_STACK = "'Helvetica Neue', Helvetica, Arial, sans-serif";

export function AboutPosterButton() {
  const posterRef = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    QRCode.toDataURL(SITE_URL, {
      width: 480,
      margin: 1,
      color: { dark: "#0a0d14", light: "#ffffff" },
      errorCorrectionLevel: "M",
    })
      .then((url) => {
        if (!cancelled) setQrDataUrl(url);
      })
      .catch((err) => console.error("QR generation failed", err));
    return () => {
      cancelled = true;
    };
  }, []);

  async function generate() {
    if (!posterRef.current || busy) return;
    setBusy(true);
    try {
      const domtoimage = (await import("dom-to-image-more")).default;
      const dataUrl = await domtoimage.toPng(posterRef.current, {
        width: 1080,
        height: 1920,
        scale: 2,
        bgcolor: "#0a0a0a",
      });
      const link = document.createElement("a");
      link.download = "bravo-millers-about.png";
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
        className="inline-flex items-center justify-center gap-2 h-10 px-6 rounded-full border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-sm font-medium text-amber-200 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <span aria-hidden>📥</span>
        {busy ? "Generating…" : "Download Poster"}
      </button>

      <div
        aria-hidden
        ref={posterRef}
        className="poster-root"
        style={{
          position: "fixed",
          top: -100000,
          left: -100000,
          width: 1080,
          height: 1920,
          background: "linear-gradient(180deg, #0a0d14 0%, #14181f 100%)",
          color: "#f4f4f5",
          fontFamily: FONT_STACK,
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
          textRendering: "geometricPrecision",
          padding: "70px 70px 90px",
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
          pointerEvents: "none",
          outline: "none",
          border: "none",
        }}
      >
        <style
          dangerouslySetInnerHTML={{
            __html:
              ".poster-root *, .poster-root { border: 0 !important; border-width: 0 !important; outline: 0 !important; outline-width: 0 !important; }",
          }}
        />

        {/* Header */}
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: 40,
              fontWeight: 800,
              letterSpacing: 10,
              color: "#facc15",
              fontFamily: FONT_STACK,
              WebkitFontSmoothing: "antialiased",
              MozOsxFontSmoothing: "grayscale",
            }}
          >
            BRAVO MILLERS · NORENFOODS
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

        {/* Award ceremony photo */}
        <div
          style={{
            marginTop: 40,
            width: "100%",
            height: 560,
            borderRadius: 16,
            overflow: "hidden",
            background: "#1a1f2a",
            boxShadow: "0 30px 60px rgba(0, 0, 0, 0.55)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/award-ceremony.jpg"
            alt=""
            crossOrigin="anonymous"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>

        {/* Certificate + text block */}
        <div
          style={{
            marginTop: 36,
            display: "flex",
            alignItems: "center",
            gap: 32,
          }}
        >
          <div
            style={{
              flexShrink: 0,
              width: 240,
              height: 320,
              background: "#fff",
              borderRadius: 8,
              padding: 10,
              boxShadow: "0 18px 40px rgba(0, 0, 0, 0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/flos-olei-certificate.png"
              alt=""
              crossOrigin="anonymous"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
                display: "block",
              }}
            />
          </div>

          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: "#facc15",
                lineHeight: 1.2,
                fontFamily: FONT_STACK,
                WebkitFontSmoothing: "antialiased",
                MozOsxFontSmoothing: "grayscale",
              }}
            >
              Flos Olei 2025 · Importer of the Year
            </div>
            <div
              style={{
                marginTop: 18,
                fontSize: 20,
                lineHeight: 1.5,
                color: "rgba(255, 255, 255, 0.78)",
                fontFamily: FONT_STACK,
                WebkitFontSmoothing: "antialiased",
                MozOsxFontSmoothing: "grayscale",
              }}
            >
              We are a Shanghai-based importer and distributor of premium Italian extra virgin
              olive oils and specialty foods.
            </div>
            <div
              style={{
                marginTop: 22,
                fontSize: 22,
                fontWeight: 600,
                color: "#fde68a",
                letterSpacing: 1,
                fontFamily: FONT_STACK,
                WebkitFontSmoothing: "antialiased",
                MozOsxFontSmoothing: "grayscale",
              }}
            >
              norenfoods.com
            </div>
          </div>
        </div>

        {/* WeChat QR */}
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: 14,
              borderRadius: 12,
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
            }}
          >
            {qrDataUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={qrDataUrl}
                alt=""
                style={{
                  width: 200,
                  height: 200,
                  objectFit: "contain",
                  display: "block",
                }}
              />
            )}
          </div>
          <div
            style={{
              fontSize: 20,
              fontWeight: 600,
              color: "#fafafa",
              letterSpacing: 1,
              fontFamily: FONT_STACK,
              WebkitFontSmoothing: "antialiased",
              MozOsxFontSmoothing: "grayscale",
            }}
          >
            微信扫码下单 · Scan to order
          </div>
        </div>
      </div>
    </>
  );
}
