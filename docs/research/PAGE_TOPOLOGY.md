# bestoliveoils.org/search — Page Topology

URL: https://bestoliveoils.org/search
Total page height (desktop, fully loaded): ~102,000 px
Theme: forced dark mode (HTML element has `dark` class). No light variant rendered.
Stack: React SPA (Vite build → assets/index-BqJ1WVpd.js), Tailwind CSS, lucide-react icons, Plausible analytics.

## Layout chain

`html.dark > body > #root > div > section > div.min-h-screen.bg-background.flex.flex-col.font-sans` (the app root)

Inside the app root:

1. **Header** — `<header>` sticky top-0 z-50, `bg-background`, border-bottom, py-23px desktop / py-31px mobile. Renders the logo (left), a centered tagline link "The World's Best Olive Oils" (md+ only), and a right-side action cluster (Search, My Lists, Language picker, Menu). Sticky on scroll, no shrink behavior.
2. **Filter bar** — `<main>` first child: `div.w-full.bg-card.border-b.border-border/60.py-3.shadow-sm.relative.z-30`. Renders an inline search `<input>` with leading magnifier icon, then below it a 6-pill filter tray (Hemisphere, Country, Variety, Intensity, Organic toggle, Marketplace toggle). Not sticky — scrolls away with the page. Filter tray is wrapped in a height-animatable `overflow-hidden transition-all duration-150` div (hidden behind the search bar at narrow widths).
3. **Results area** — `<main>` second child: `div.bg-gray-200.dark:bg-background.min-h-screen` containing `div.container.mx-auto.px-4.max-w-7xl.py-12`. The container holds five blocks in order:
   - **3a. Page header row** — flex row: left side has an Award icon + "2026 Edition" eyebrow above an `<h2>` "Official Results"; right side has muted text "Showing 721 certified 2026 winners" and an amber pill "Map View" button.
   - **3b. 2026 Winners grid** — `div.mb-16` wrapping `div.grid.grid-cols-1.sm:grid-cols-2.lg:grid-cols-3.xl:grid-cols-4.gap-6` with 721 winner cards (Card component). Cards are 294×532 px in the desktop 4-col layout.
   - **3c. Previous Year divider** — `div.mt-16.mb-8` with a horizontal "card" panel: top/bottom hairline gradients, centered eyebrow "Previous Year", H3 "2025 Edition", and small caption "Award-winning oils from last year's competition".
   - **3d. 2025 Winners grid** — same `div.grid.grid-cols-1.sm:grid-cols-2.lg:grid-cols-3.xl:grid-cols-4.gap-6.opacity-80` (rendered initially empty / 0 px tall — populates as user scrolls into the lazy-loaded chunk).
   - **3e. Loading spinner** — `div.mt-20.flex.justify-center.w-full.py-8` showing a circular spinner + caption "Loading more winners…".
4. **Footer** — Not present in DOM at first paint; appears after the lazy-load completes (out of scope for this clone since we can't easily get to it through the lazy mechanism — we render a static "Loading more winners…" footer block to match the visible final state).

## Z-index layers

- z-50: header (sticky)
- z-30: filter bar
- z-30: medal badge anchor on each card (top-left)
- z-20: medal indicator dot on each card (top-right `-top-2`)
- z-10: hover-overlay panel inside each card

## Interaction model per section

| Section | Model |
| --- | --- |
| Header | static (sticky positioning only — no scroll-shrink) |
| Filter bar | click-driven (filter pills open dropdowns; toggles flip on click). For this clone we render the static visual state — dropdowns are out of scope. |
| Page header / Map View | static |
| Card | hover-driven. On hover: medal dot enlarges from 16px to 72px and rotates 360°, the bottom info panel slides up from `opacity-0 translate-y-8` → `opacity-100 translate-y-0` over 500ms. Card title turns `text-primary`. |
| 2025 divider + grid | scroll-driven (the second grid populates lazily when scrolled into view — we'll mock this with a simple second list). |
| Loading spinner | time-driven (CSS spin) |
