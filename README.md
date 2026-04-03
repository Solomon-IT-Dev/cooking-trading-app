# Cooking Trading App

Frontend project for Explore screen with high-performance SSE updates (`/kitchen/stove`).

## Current Focus

- Desktop Explore/Home UI
- Authenticated SSE integration
- Smooth rendering under heavy update flow
- Virtualized token columns for large datasets

## Required Environment

Create `.env.local`:

```bash
VITE_API_BASE_URL=http://api.dev.cooking.gg
VITE_STOVE_TOKEN=<JWT>
```

## Run

```bash
npm install
npm run dev
```

## Scripts

```bash
npm run build
npm run preview
npm run lint
npm run lint:fix
npm run format
```

## Docs

- `docs/ARCHITECTURE.md` — SSE architecture and performance strategy
- `docs/DEV_GUIDE.md` — implementation rules and quality checklist
