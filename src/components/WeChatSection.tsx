import Image from "next/image";

export function WeChatSection() {
  return (
    <section className="bg-background border-t border-border">
      <div className="container mx-auto px-4 max-w-7xl py-16 md:py-20">
        <div className="flex flex-col items-center text-center gap-6">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-foreground">
              WeChat Order
            </h2>
            <p className="mt-2 text-sm text-muted-foreground tracking-wide">
              微信扫码下单 · Scan to order
            </p>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow-2xl">
            <Image
              src="/images/mmqrcode1778288129256.PNG"
              alt="WeChat QR code for Norenfoods"
              width={160}
              height={160}
              className="h-40 w-40 object-contain"
              priority
            />
          </div>
          <p className="text-xs text-muted-foreground max-w-sm">
            Open WeChat on your phone, tap the scan icon, and point it at the code above to start a
            conversation with our trade team.
          </p>
        </div>
      </div>
    </section>
  );
}
