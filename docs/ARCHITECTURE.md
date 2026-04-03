# Cooking Frontend Architecture

## Goal

Desktop Explore screen with SSE-driven updates from `/kitchen/stove` and smooth rendering under high update frequency.

## Folder Layout

```text
src/
  app/
    providers/
    router/
  modules/
    explore/
      api/
        stoveSse.client.ts
        stoveSse.errors.ts
        stoveSse.mappers.ts
        stoveSse.types.ts
      constants/
        explore.constants.ts
      fixtures/
        dataexample.json
      hooks/
        useExploreStream.ts
      lib/
        exploreToken.mapper.ts
      model/
        store.ts
        explore.selectors.ts
        explore.types.ts
      ui/
        ExplorePage.tsx
        explorePage.types.ts
        components/
        layout/
  styles/
    index.css
```

## Data Flow (SSE)

1. `stoveSse.client` opens authenticated stream via fetch-based SSE.
2. Incoming frames are parsed into typed payloads.
3. Store receives snapshot/update events.
4. Updates are buffered and applied in batches on animation frame scheduling (only when new data arrives).
5. UI subscribes via narrow selectors to avoid full-tree rerenders.
6. UI view-model tokens are derived in `exploreToken.mapper` with `WeakMap` caching.

## Performance Decisions

- Normalized entity storage (`Record` by id + stable order array) for cheap merges.
- Selector-based subscriptions (`zustand` or equivalent) to reduce render fan-out.
- `React.memo` for heavy rows/cards.
- Virtualization for long lists (`@tanstack/react-virtual`).
- Stream batches are throttled by `FLUSH_INTERVAL_MS`.
- Derived UI values are computed in mapper layer and token objects are cached by entity reference.

## Runtime Resilience

- Reconnect with exponential backoff + jitter.
- Stream heartbeat tolerance (backend sends heartbeats globally).
- Stop stream on unmount or route switch via `AbortController`.
- Surface connection state in UI: `connecting`, `live`, `reconnecting`, `error`.
