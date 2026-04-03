# Cooking Frontend Dev Guide

## Rules

1. Keep project modular and focused on current task scope.
2. Put business logic in `src/modules/explore/*`.
3. Keep app bootstrap concerns in `src/app/*`.
4. Add abstractions only when they remove real duplication.
5. Keep code comments in English and only where needed.

## SSE Integration Rules

1. Do not use native `EventSource` for this endpoint (headers are required).
2. Use fetch-based SSE client with:
   - `Authorization: Bearer <JWT>`
   - `Accept: text/event-stream`
   - `Cache-Control: no-cache`
   - query param `chain=solana|bsc|base` (required by backend)
3. Always support reconnect with backoff.
4. Cancel stream on unmount via `AbortController`.

## Performance Rules (High-Volume Data)

1. Normalize updates by entity id before writing to UI state.
2. Batch stream updates and commit once per animation frame.
3. Subscribe components with narrow selectors.
4. Memoize expensive row/card components.
5. Virtualize long lists.
6. Avoid inline object/array recreation in hot render paths.
7. Do not read/write `ref.current` in render logic.

## Quality Checklist Before Done

- Stream reconnect tested (network off/on).
- No visible frame drops during burst updates.
- `chain` query param is present in SSE request.
- Lint passes.
- Empty/error/loading states are present.
