"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

export function MobileWeChatBar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="md:hidden fixed bottom-0 inset-x-0 z-40 flex items-center justify-between gap-3 px-4 py-3 bg-[#07C160] text-white shadow-[0_-4px_16px_rgba(0,0,0,0.3)]"
        aria-label="Open WeChat QR code"
      >
        <span className="flex items-center gap-2 font-semibold text-base">
          <WeChatGlyph className="h-5 w-5" />
          微信扫码询价
        </span>
        <span className="rounded-md bg-white p-1">
          <Image
            src="/wechat.png"
            alt=""
            width={36}
            height={36}
            className="h-9 w-9 object-contain"
          />
        </span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="WeChat QR code"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6"
        >
          <div
            className="relative rounded-2xl bg-white p-6 shadow-2xl max-w-sm w-full flex flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute top-2 right-2 inline-flex items-center justify-center h-8 w-8 rounded-full text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
            <Image
              src="/wechat.png"
              alt="WeChat QR code"
              width={280}
              height={280}
              className="h-64 w-64 object-contain"
              priority
            />
            <div className="text-center">
              <p className="text-base font-semibold text-zinc-900">微信扫码询价</p>
              <p className="text-sm text-zinc-600 mt-1">
                Open WeChat &middot; Scan &middot; Contact us
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function WeChatGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M9.5 4C5.36 4 2 6.91 2 10.5c0 2.04 1.1 3.86 2.83 5.07L4 18l2.6-1.4c.9.22 1.86.34 2.86.34 0 0 .07-.01.21-.02-.45-.94-.71-2-.71-3.13 0-3.41 3.34-6.18 7.46-6.18.5 0 .98.04 1.46.12C16.95 5.59 13.5 4 9.5 4Zm-2.5 4a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm5 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm4.5 2.5c-3.59 0-6.5 2.46-6.5 5.5s2.91 5.5 6.5 5.5c.85 0 1.65-.13 2.39-.36L20.5 22l-.59-1.97A5.27 5.27 0 0 0 23 16c0-3.04-2.91-5.5-6.5-5.5Zm-2 3a.85.85 0 1 1 0 1.7.85.85 0 0 1 0-1.7Zm4 0a.85.85 0 1 1 0 1.7.85.85 0 0 1 0-1.7Z" />
    </svg>
  );
}
