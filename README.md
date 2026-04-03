# Cooking Trading App

Frontend project for Explore screen with high-performance SSE updates (`/kitchen/stove`).

## Current Focus

- Desktop Explore/Home UI (close to Figma, without pixel-perfect requirement)
- Authenticated SSE integration with Bearer token
- Smooth rendering under heavy update flow
- Virtualized token columns for large datasets

## Required Environment

Create `.env.local`:

```bash
VITE_API_BASE_URL=http://api.dev.cooking.gg
VITE_STOVE_TOKEN=<JWT>
```

## SSE Endpoint Notes

- Endpoint: `GET /kitchen/stove`
- Requires query param: `chain` (`solana | bsc | base`)
- Current client configuration uses `chain=solana`
- Requires header auth: `Authorization: Bearer <JWT>`
- Uses fetch-based SSE client (`@microsoft/fetch-event-source`), not native `EventSource`

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
