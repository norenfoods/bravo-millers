export function PreviousYearDivider() {
  return (
    <div className="mt-16 mb-8">
      <div className="relative py-8 px-6 rounded-xl bg-gradient-to-r from-muted/50 via-muted to-muted/50 border border-border/30">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
            Previous Year
          </p>
          <h3 className="text-2xl md:text-3xl font-bold text-foreground/80">2025 Edition</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Award-winning oils from last year&rsquo;s competition
          </p>
        </div>
      </div>
    </div>
  );
}
