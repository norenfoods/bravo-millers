# Behaviors — bestoliveoils.org/search

## Global

- **Theme:** forced dark mode. `<html>` has class `dark`. No theme toggle in the UI we cloned.
- **Font:** system-ui stack — `system-ui, -apple-system, "system-ui", "Segoe UI", Roboto, Helvetica, Arial, sans-serif`. No web font loaded.
- **Body:** `bg: rgb(10,10,10)` (nearly pitch black behind the app), but the app root paints `--background` (HSL 222 47% 7%) over everything.
- **Smooth scroll:** none detected. Native browser scroll.
- **No carousel / autoplay / scroll-snap.**
- **Viewport meta:** `width=device-width, initial-scale=1.0, maximum-scale=1`.

## Header

- Sticky to top of viewport. `transition-all duration-300` is declared but no scroll-driven CSS change actually fires (height stays 67 px at all scroll positions).
- Layout: `container mx-auto px-4 max-w-7xl flex items-center justify-center relative`.
  - Logo absolutely positioned `left-4`.
  - Tagline link "The World's Best Olive Oils" centered (md+ only, hidden on mobile).
  - Right cluster `absolute right-4 flex items-center gap-2`.

## Filter bar

- Not sticky. Scrolls away with the page.
- Wrapped in a height-animatable container with `transition-all duration-150 ease-in-out`.
- Filter pills are buttons with right-side chevron icons. Two pills (Organic, Marketplace) have a trailing toggle switch.

## Card hover behavior (most important interactive piece)

When `.group` is hovered (the inner card wrapper):

1. **Medal badge dot (top-right, `.absolute.-top-2.right-4`):**
   - Default size: w-4 h-4 (16 × 16 px) circle, dot color depending on award (gold = `from-amber-400 to-amber-500`, silver = `from-gray-300 to-gray-400`).
   - On hover the same element grows to `w-[72px] h-[72px]`, shifts to `-top-6`, and rotates `360deg`.
   - Transition: `transition-all duration-500 ease-out`.
   - Inner `<span>` text (e.g. "Gold", "Silver") fades in from `opacity-0` → `opacity-100` only after the rotation completes.
2. **Bottom info panel (`.absolute.bottom-0.left-0.right-0.mx-2.bg-[#22345e].rounded-xl.px-4.py-4.shadow-2xl`):**
   - Default: `opacity-0 translate-y-8`.
   - Hover: `group-hover:opacity-100 group-hover:translate-y-0`.
   - Transition: `transition-all duration-500 ease-out`.
   - Panel always exists in the DOM, just visually hidden.
3. **Card title (h3):** `group-hover:text-primary transition-colors duration-300`.
4. **Hover area is the whole `<a>` link** — wraps to `/producer/<slug>/brand/<brand>`.

## Map View button

- `flex items-center gap-1.5 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 px-3 sm:px-4 py-2 rounded-full shadow-md hover:shadow-lg`.
- Leading map-pin icon (lucide MapPin).

## Responsive

- The full filter pill row collapses on narrow widths via the `transition-all duration-150` overflow wrapper. We render the desktop arrangement and let the flex wrap on tablet.
- Grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4` (Tailwind defaults: sm 640, lg 1024, xl 1280).
- Header tagline is hidden below md (768).
- "My Lists" button is hidden below sm (640).

## Lazy loading / infinite scroll

The 2025 grid is empty on first paint and the spinner sits at the bottom. As you scroll, more cards stream in (network-driven). For this clone we render a static second list (12 mock 2025 cards) followed by the same spinner block.
