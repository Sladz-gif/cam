# cam

Information Console — Display System

A display console built with **Next.js 16 (App Router)**, **TypeScript**, and
**Tailwind CSS**. The layout fills the whole viewport with a two-column
chassis: a slim **left-hand navigation sidebar** (branding, channel buttons,
system status) and a **dominant right-hand display area** (header bar + screen
cell). Four channels are supported: Home, Date (with a day-picker modal),
Play Video, and a Logs view with the last 4 entries.

All channel content fits inside the display area with **no vertical scrolling**.

---

## ✨ Features

- **Full-viewport chassis, NOT centered** — the console fills the viewport
  from edge to edge; no floating card in the middle.
- **Display area is the largest element** — a narrow ~200px left sidebar,
  everything else belongs to the screen. Header bar is thin, so the display
  cell dominates the view.
- **Four vertical navigation buttons (Home / Date / Play Video / Logs)**
  - 44px minimum touch targets
  - Default (white/slate) vs Primary (navy fill) variants
  - Selected channel rendered in Primary with a dot indicator
  - Tactile press behaviour: `translateY(1px) + inset shadow collapse` on
    `:active`, `onMouseDown`, `onTouchStart`
  - Inline SVG icons only — no icon library
  - Persistent active state via `aria-pressed="true"`
- **Home screen** — neutral label, page title, 4-up channel summary cards
  (one per channel), notice panel with operating status, classification bar.
- **Date screen — NO TIME, date only** — weekday, large date, and a 3-up
  Timezone / Offset / Selected grid. The entire date card is clickable and
  opens a **modal day-picker** (month grid, prev/next, today button, cancel,
  click-outside to close).
- **Video Broadcast screen** — ON AIR pill, black broadcast frame, standard
  HTML5 `<video controls autoPlay muted playsInline>`.
- **Logs screen — 4 entries** (L-001 … L-004), severity-coloured level
  pills, timestamp, source, and message. Fits the screen with room to spare.
- **No vertical scrolling** inside any channel — every screen fits entirely
  within the display area (`min-h-0` / `overflow-hidden` throughout).
- **Fully responsive** — stacks vertically on mobile (top nav / below
  display), no horizontal scrolling at any width.
- **Accessible** — real `<button>` elements, proper `aria-label`s, visible
  focus ring via `:focus-visible`, `aria-pressed` on the active button,
  labelled regions for nav / display, modal uses `role="dialog"` +
  `aria-modal="true"` + `aria-label`, `prefers-reduced-motion` disables the
  transition.
- **Clean TypeScript + ESLint** — strict mode, zero `any`, zero unused
  imports/variables, build exits 0 with 0 errors / 0 warnings.
- **Minimal dependencies** — only the Next.js App Router default stack
  (react, react-dom, next, tailwindcss, typescript, eslint). No UI
  libraries, no date pickers, no icon libs.
- **Themable** — the entire palette is declared as CSS variables in
  `src/app/globals.css`.

---

## 🚀 Quick start

> Requires Node.js 18.17+ (or 20+ recommended).

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server at http://localhost:3000
npm run dev

# 3. Production build — exits 0 only with 0 errors AND 0 warnings
npm run build

# 4. Serve the production build locally
npm run start
```

---

## 🎥 Adding a video

`Play Video` looks for a local file at:

```
public/videos/sample.mp4
```

The repo ships without a binary sample MP4 to keep the download small.
Browsers show the native frame with no stream if the file is missing (no
runtime crash).

To add a video:

1. Copy any royalty-free MP4 into `public/videos/sample.mp4`.
   Good free options:
   - **Big Buck Bunny**: https://peach.blender.org/download/
   - **Google sample videos**: https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4
   - Any file you have the rights to use.
2. Or replace the `<source src="/videos/sample.mp4" ...>` line in
   `src/components/VideoPlayer.tsx` with an absolute/remote URL.

The video element uses `autoPlay muted playsInline` — browsers require
`muted` for autoplay without a gesture; the user can unmute via controls.

---

## 🎨 Folder structure

```
src/
├── app/
│   ├── layout.tsx       # <html> + next/font (Inter / JetBrains Mono) + SEO
│   ├── globals.css      # Tailwind imports, palette vars, overlays/animations
│   └── page.tsx         # "/" route — mounts the chassis
└── components/
    ├── RetroDisplayApp.tsx   # 2-column chassis: narrow left aside / big display right
    ├── DisplayArea.tsx       # Slate bezel + white screen, 4 channels, power-on keyframe
    ├── ButtonPanel.tsx       # Vertical nav with 4 channels: Home / Date / Play Video / Logs
    ├── VintageButton.tsx     # Reusable tactile button (default / primary variants)
    ├── HomeContent.tsx       # Home — 4 channel cards, notice panel, classification bar
    ├── DateDisplay.tsx       # Date-only + click opens a day-picker modal (month grid)
    ├── VideoPlayer.tsx       # Video Broadcast
    └── LogsContent.tsx       # 4 system-log entries
public/
└── videos/
    └── sample.mp4        # (drop a real video here)
```

---

## 🧩 State & view switching

No routes / no React Router. Everything is a single page driven by React
state in `RetroDisplayApp.tsx`:

```ts
const [activeView, setActiveView] = useState<'home' | 'date' | 'video' | 'logs'>('home');
```

Pressing any button calls `setActiveView(...)`. In `DisplayArea.tsx` the
screen content wrapper re-mounts with `key={activeView}` so the muted
`.power-on` transition re-plays on each channel change.

---

## 📅 Date modal

The Date channel has **no live time** — only weekday + long date and a
Timezone / Offset / Selected info row. Clicking anywhere on the date card
opens a modal day-picker:

- Month title + prev / next arrows
- 7-col day-name header
- Day grid with Today (soft navy outline) and Selected (solid navy fill)
- Close (X), Cancel, Today action buttons
- Clicking the backdrop dimissses the modal
- `role="dialog"` + `aria-modal="true"` + labelled close/today/prev/next
  buttons for accessibility.

---

## ♿ Accessibility checklist

- [x] All interactive controls are semantic `<button>` elements
- [x] Every button has an `aria-label` matching its function
- [x] Active button has `aria-pressed="true"`
- [x] Buttons have visible `:focus-visible` outline ring for keyboard nav
- [x] Display area labelled via `aria-label="Display area"` with `role=region`
- [x] Button list labelled via `role="navigation"` + aria-label
- [x] Day-picker modal uses `role="dialog"` + `aria-modal="true"` + close labelled
- [x] `prefers-reduced-motion: reduce` disables the power-on transition
- [x] All colour pairs meet WCAG AA (navy on white, slate-900 on screen)
- [x] Touch targets ≥ 44×44px
- [x] Channel content fits without vertical scrolling in the display area

---

## 🔧 Theming

Open `src/app/globals.css` and change these variables in the `:root` block
to rebrand the whole console:

```css
:root {
  /* Primary brand */
  --color-primary:        #0b3d91; /* fill, focus rings, accents           */
  --color-primary-hover:  #174ea6;
  --color-primary-active: #092f70;

  /* Chassis neutrals — light slate */
  --color-chassis:        #e6e9ef;
  --color-chassis-light:  #f4f6fa;
  --color-chassis-dark:   #c9cfd9;
  --color-chassis-shadow: #98a2b3;
  --color-chassis-border: #b7bfcc;

  /* Display screen */
  --color-screen:         #f8fafc; /* bright screen surface                 */
  --color-screen-bezel:   #1e293b; /* dark slate bezel                      */

  /* Typography */
  --color-text:           #0f172a;
  --color-text-muted:     #475569;
  --color-text-subtle:    #64748b;
  --color-text-invert:    #ffffff;

  /* Status colours */
  --color-success:        #0f766e; /* Live / Synchronised / Services Online */
  --color-warning:        #b45309;
  --color-danger:         #b91c1c;
}
```

---

## ✅ Build quality

`npm run build` must exit with **zero errors AND zero warnings**. If not:

1. Run `npm install` to ensure the lockfile matches `node_modules`.
2. Delete `.next/` and re-run `npm run build` to clear stale Next.js caches.
3. Ensure Node 18.17 / 20+.

---

## 📜 License

Use freely. Swap the palette, labels, and log entries to brand the console
for your own deployments.
