# Design Tokens — bestoliveoils.org/search

All tokens are HSL triplets used inside `hsl(var(--token) / <alpha>)`. The site forces dark mode; we mirror that.

## Color tokens (extracted from getComputedStyle on `:root.dark`)

| Token | HSL | Approximate hex |
| --- | --- | --- |
| --background | 222 47% 7% | #0a101e |
| --foreground | 210 30% 96% | #f0f3f5 |
| --primary | 210 30% 85% | #d2dadf |
| --primary-foreground | 222 47% 10% | #0e1729 |
| --secondary | 222 35% 14% | #181f2f |
| --secondary-foreground | 210 30% 96% | #f0f3f5 |
| --muted | 222 35% 12% | #141b29 |
| --muted-foreground | 215 20% 55% | #7b8597 |
| --accent | 38 92% 55% | #f3a425 (amber) |
| --accent-foreground | 222 47% 10% | #0e1729 |
| --card | 222 40% 11% | #111827 |
| --card-foreground | 210 30% 96% | #f0f3f5 |
| --border | 222 30% 18% | #1f2638 |
| --input | 222 30% 18% | #1f2638 |
| --ring | 38 92% 55% | #f3a425 |
| --radius | 0.25rem | — |

## Brand-specific (literal Tailwind arbitrary values)

- Card image plinth (dark mode): `hsl(222 35% 16%)` ≈ #1a2236
- Card hover info panel: `#22345e`
- Map View button: amber-600 (#d97706) → amber-700 hover (#b45309)
- Gold medal badge gradient: amber-400 → amber-500 (#fbbf24 → #f59e0b)
- Silver medal badge gradient: gray-300 → gray-400 (#d1d5db → #9ca3af)

## Typography

- Family: `system-ui, -apple-system, "system-ui", "Segoe UI", Roboto, Helvetica, Arial, sans-serif`
- Body: 16 px / 24 px line-height
- Tagline: `text-sm tracking-widest` (muted)
- Eyebrow ("2026 EDITION"): `text-xs uppercase tracking-widest font-bold text-primary`
- Page title: `text-3xl md:text-4xl font-bold` (in `text-primary`)
- Card title (h3): `text-base font-semibold leading-tight` (foreground → primary on hover)
- Card subtitle: `text-xs text-muted-foreground` (only at lg breakpoint and below)
- Hover overlay title (h4): `text-xl font-bold text-white`
- Hover overlay rank: `text-xs text-white/50`

## Spacing / layout

- Container: `max-w-7xl mx-auto px-4`
- Page padding (results area): `py-12`
- Card grid gap: `gap-6` (24 px)
- Header height: 67 px desktop / 83 px mobile (py 23 / 31)
