"use client";

import QRCode from "qrcode";
import { useEffect, useRef, useState } from "react";

const SITE_URL = "https://www.norenfoods.com";
const FONT_STACK = "'Helvetica Neue', Helvetica, Arial, sans-serif";

const POSTER_W = 1080;
const POSTER_H = 1400;

export function AboutPosterButton() {
  const posterRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scaleRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    const container = containerRef.current;
    const scaleEl = scaleRef.current;
    if (!container || !scaleEl) return;

    const observer = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width;
      const scale = Math.min(1, w / POSTER_W);
      scaleEl.style.transform = `scale(${scale})`;
      container.style.height = `${POSTER_H * scale}px`;
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  async function generate() {
    if (!posterRef.current || busy) return;
    setBusy(true);
    try {
      const domtoimage = (await import("dom-to-image-more")).default;
      const dataUrl = await domtoimage.toPng(posterRef.current, {
        width: POSTER_W,
        height: POSTER_H,
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

  const text = (extra: React.CSSProperties = {}): React.CSSProperties => ({
    fontFamily: FONT_STACK,
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    ...extra,
  });

  return (
    <div className="flex flex-col items-center gap-6">
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
        ref={containerRef}
        style={{
          width: "100%",
          maxWidth: POSTER_W,
          margin: "0 auto",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <style
          dangerouslySetInnerHTML={{
            __html: `
              .about-poster-scale {
                width: ${POSTER_W}px;
                height: ${POSTER_H}px;
                transform-origin: top left;
              }
              .poster-root *, .poster-root {
                border: 0 !important;
                border-width: 0 !important;
                outline: 0 !important;
                outline-width: 0 !important;
              }
              .poster-root .cert-frame {
                border: 2px solid #C9A84C !important;
                border-width: 2px !important;
              }
            `,
          }}
        />
        <div ref={scaleRef} className="about-poster-scale">
          <div
            ref={posterRef}
            className="poster-root"
            style={{
              width: POSTER_W,
              height: POSTER_H,
              background: "linear-gradient(180deg, #0a0d14 0%, #14181f 100%)",
              color: "#f4f4f5",
              fontFamily: FONT_STACK,
              WebkitFontSmoothing: "antialiased",
              MozOsxFontSmoothing: "grayscale",
              textRendering: "geometricPrecision",
              display: "flex",
              flexDirection: "column",
              boxSizing: "border-box",
              outline: "none",
              border: "none",
            }}
          >
            {/* 1. Logo header */}
            <div
              style={{
                paddingTop: 40,
                paddingBottom: 24,
                display: "flex",
                justifyContent: "center",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/意园大匠_logo_标准组合_透明底.png"
                alt=""
                crossOrigin="anonymous"
                style={{
                  height: 60,
                  width: "auto",
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </div>

            {/* 2. Award ceremony photo — full width, no gap below */}
            <div
              style={{
                width: "100%",
                height: 380,
                overflow: "hidden",
                background: "#0a0e1a",
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

            {/* 3. Certificate section */}
            <div
              style={{
                background: "rgba(255, 255, 255, 0.04)",
                padding: 32,
                display: "flex",
                gap: 32,
                alignItems: "center",
              }}
            >
              <div
                style={{
                  flexShrink: 0,
                  width: 280,
                  height: 360,
                  background: "#fff",
                  borderRadius: 8,
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: "0 18px 40px rgba(0, 0, 0, 0.5)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/2_Flos Olei 2025 - The Importer of the Year.png"
                  alt=""
                  crossOrigin="anonymous"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                <div
                  className="cert-frame"
                  style={{
                    position: "absolute",
                    inset: 10,
                    border: "2px solid #C9A84C",
                    boxShadow: "inset 0 0 0 1px #e8c96d",
                    borderRadius: 2,
                    pointerEvents: "none",
                  }}
                />
              </div>

              <div style={{ flex: 1, paddingLeft: 0, textAlign: "left" }}>
                <div
                  style={text({
                    fontSize: 28,
                    fontWeight: 800,
                    color: "#facc15",
                    lineHeight: 1.15,
                  })}
                >
                  Flos Olei 2025
                </div>
                <div
                  style={text({
                    marginTop: 6,
                    fontSize: 20,
                    fontWeight: 500,
                    color: "#fafafa",
                  })}
                >
                  Importer of the Year
                </div>
                <div
                  style={{
                    marginTop: 14,
                    marginBottom: 14,
                    height: 1,
                    width: 80,
                    background: "rgba(250, 204, 21, 0.5)",
                  }}
                />
                <div
                  style={text({
                    fontSize: 13,
                    lineHeight: 1.8,
                    color: "rgba(255, 255, 255, 0.7)",
                  })}
                >
                  Founded in 2023, Norenfoods is Shanghai&apos;s premier importer of award-winning
                  Italian extra virgin olive oils and artisan specialty foods. With Noren Italia
                  S.R.L. in Tuscany, we source directly from estates. The only China-based
                  importer honored by Flos Olei.
                </div>
              </div>
            </div>

            {/* 4. Stat boxes */}
            <div
              style={{
                display: "flex",
                background: "rgba(0, 0, 0, 0.35)",
              }}
            >
              {[
                { num: "2023", label: "Founded" },
                { num: "10+", label: "Italian Estates" },
                { num: "#1", label: "Flos Olei China" },
              ].map((s, i) => (
                <div
                  key={s.num}
                  style={{
                    flex: 1,
                    padding: "26px 16px",
                    textAlign: "center",
                    borderLeft: i === 0 ? "none" : "1px solid rgba(250, 204, 21, 0.15)",
                  }}
                >
                  <div
                    style={text({
                      fontSize: 38,
                      fontWeight: 800,
                      color: "#facc15",
                      lineHeight: 1,
                    })}
                  >
                    {s.num}
                  </div>
                  <div
                    style={text({
                      marginTop: 8,
                      fontSize: 12,
                      letterSpacing: 2,
                      textTransform: "uppercase",
                      color: "rgba(255, 255, 255, 0.65)",
                    })}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* 5. WeChat QR + url */}
            <div
              style={{
                padding: "28px 0 18px",
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
                  borderRadius: 10,
                  boxShadow: "0 10px 24px rgba(0, 0, 0, 0.45)",
                }}
              >
                {qrDataUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={qrDataUrl}
                    alt=""
                    style={{
                      width: 160,
                      height: 160,
                      objectFit: "contain",
                      display: "block",
                    }}
                  />
                )}
              </div>
              <div
                style={text({
                  fontSize: 14,
                  color: "rgba(255, 255, 255, 0.7)",
                  letterSpacing: 1,
                })}
              >
                微信扫码下单 · Scan to order
              </div>
              <div
                style={text({
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#facc15",
                  letterSpacing: 1,
                })}
              >
                norenfoods.com
              </div>
            </div>

            {/* 6. Footer branding */}
            <div
              style={{
                padding: "18px 0 24px",
                borderTop: "1px solid rgba(250, 204, 21, 0.12)",
                textAlign: "center",
                background: "rgba(0, 0, 0, 0.25)",
              }}
            >
              <div
                style={text({
                  fontSize: 13,
                  letterSpacing: 4,
                  fontWeight: 700,
                  color: "#facc15",
                })}
              >
                BRAVO MILLERS · NORENFOODS
              </div>
              <div
                style={text({
                  marginTop: 4,
                  fontSize: 11,
                  letterSpacing: 2,
                  color: "rgba(255, 255, 255, 0.45)",
                })}
              >
                Premium Italian Olive Oils · Shanghai
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
