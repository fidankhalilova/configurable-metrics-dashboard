# Configurable Metrics Dashboard

A React + TypeScript dashboard where users add, remove, reorder, and hide metric cards, each fetching its own mock data independently. Built to satisfy the "Configurable Metrics Dashboard" spec — must-haves, bonuses, and the implementation notes' explicit constraints.

## Stack

- Vite + React + TypeScript
- React Router v7
- Tailwind CSS
- **@dnd-kit** (`@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`) for drag-and-drop — chosen over `react-beautiful-dnd` per the spec's own recommendation, since that library is unmaintained and has a known incompatibility with React 18 StrictMode.

## Must-have features

- **Add/Remove Cards** — `CardManagerPanel` lists every card in the catalog; not-yet-added cards show an "+ Add" button, added cards show hide/show and remove controls.
- **Reorder via Drag-and-Drop** — `CardGrid` wraps visible cards in a dnd-kit `SortableContext`. Dragging is done via a dedicated handle icon on each card (not the whole card body), so drag never conflicts with a card's own interactive elements (e.g. its Retry button).
- **Persistent Layout** — the full state (theme, layout order, hidden list) is saved to `localStorage` automatically on every change.

## Bonus features

- ✅ **Theming (dark/light/system)** — CSS custom properties, a blocking inline bootstrap script to prevent a flash of the wrong theme on load, and a live `matchMedia` listener that keeps following the OS while `system` mode is active.
- ❌ **Resizing cards** — not implemented; cards are a fixed size in the responsive grid.
- ⚠️ **Animation during drag** — dnd-kit provides a default transform-based drag animation out of the box (visible in `SortableCard`'s `transform`/`transition` styling); no additional custom animation was layered on top.

## Architecture

src/
state/
types.ts — AppState shape: { version, theme, layout, hidden }
defaults.ts — fallback state (some cards visible, some hidden, by default)
validateState.ts — field-by-field validator for parsed JSON (used on load AND on import)
storage.ts — the only file that touches localStorage; versioned, try/catch, validated
reducer.ts — every state transition, one switch statement
StateContext.tsx — useReducer + context; syncs data-theme, meta theme-color, live system-theme listener
features/
metric-cards/
cardCatalog.ts — static list of all possible cards (id, title, icon, mock value range)
mockApi.ts — simulated fetch, ~15% random failure rate
useMetricData.ts — per-card loading/error/retry hook, local state only, never persisted
MetricCard.tsx — renders one card's three visual states
SortableCard.tsx — wraps MetricCard with a dnd-kit drag handle
CardGrid.tsx — the sortable grid + drag-end handler + empty state
CardManagerPanel.tsx — add / remove / show / hide controls
theme/
ThemeToggle.tsx — cycles light → dark → system
sidebar/
TopNav.tsx — simple top navigation (this spec doesn't require a collapsible sidebar)
debug/
DebugPanel.tsx — export/import state as a validated JSON file
app/
App.tsx — shell: TopNav + routed pages
Loader.tsx — initial loading state shown while state hydrates
routes/
DashboardPage.tsx — CardManagerPanel + DebugPanel + CardGrid
SettingsPage.tsx — static, UI-only settings (not wired to real logic)
NotFoundPage.tsx
theme.css — light/dark CSS variable tokens, reduced-motion rule
index.html — blocking inline theme-bootstrap script + <meta name="theme-color">


## State structure

```json
{
  "version": 1,
  "theme": "dark",
  "layout": ["pageViews", "followers", "revenue"],
  "hidden": ["activeUsers", "conversionRate", "bounceRate"]
}
```

This matches the spec's literal example shape. `layout` is an ordered list of visible card ids; `hidden` holds ids that exist but aren't shown. A card id absent from both arrays has never been added. Card *content* (title, icon, mock-value range) is intentionally kept separate, in `cardCatalog.ts` — reordering or hiding a card never touches its definition.

## How persistence works

All `localStorage` access is isolated to `state/storage.ts`.

- On load, the saved JSON is parsed and passed through `validateAppState`, which checks every field's presence and type individually (not just "did JSON.parse succeed"). Any invalid, missing, or version-mismatched data silently falls back to `defaultState` rather than crashing.
- On import (via the Debug Panel), the same validator runs against the uploaded file. A malformed import shows a specific error message describing exactly which field is wrong, instead of failing silently or crashing.
- Saving happens automatically via a `useEffect` in `StateContext` on every state change — no feature needs to remember to persist manually.
- Fetched metric *values* are never persisted — only layout/theme/visibility preferences are. Metric values are always refetched fresh on mount via `useMetricData`.

## How the drag system works

- Built with **@dnd-kit**, using `DndContext` + `SortableContext` + `rectSortingStrategy` (grid-appropriate reordering).
- Three sensors are configured: `PointerSensor` (mouse), `TouchSensor` (touch, with a short activation delay so a quick tap doesn't accidentally start a drag), and `KeyboardSensor` (arrow-key reordering, for accessibility).
- The reorder is only committed in `onDragEnd` — never during intermediate drag-move frames — so `localStorage` is written once per completed drag, not continuously.
- Each card's drag handle is a small, dedicated icon separate from the card's own content, so dragging can never intercept clicks meant for the card itself (e.g. its Retry button).
- Card ids are used directly as React `key`s (never array indices), so cards don't unexpectedly remount when reordered.

## Accessibility

- Keyboard-only reordering is fully supported via dnd-kit's `KeyboardSensor`.
- Add/remove/hide controls are real `<button>` elements with descriptive `aria-label`s.
- The theme toggle exposes its current state via `aria-label`.
- `prefers-reduced-motion` is respected globally via a CSS media query.