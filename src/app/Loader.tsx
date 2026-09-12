export function Loader() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-(--color-bg)">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-(--color-border) border-t-(--color-accent)" />
        <span className="text-sm text-(--color-text-muted)">Loading dashboard…</span>
      </div>
    </div>
  )
}