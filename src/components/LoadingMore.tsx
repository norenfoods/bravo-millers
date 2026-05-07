export function LoadingMore() {
  return (
    <div className="mt-20 flex justify-center w-full py-8">
      <div className="flex flex-col items-center gap-3 text-muted-foreground">
        <div
          className="h-8 w-8 rounded-full border-2 border-muted border-t-accent animate-spin"
          aria-hidden
        />
        <p className="text-sm">Loading more winners…</p>
      </div>
    </div>
  );
}
