---
title: ChessBird Web Docs
owner: web
repository: chessbird-web
lifecycle: Canonical
role: Map
status: Active
last_reviewed: 2026-07-19
---

# ChessBird Web Docs

Website documentation for **`chessbird-web`** (static hosting scope only).

**Hub Documentation Map:** [chessbird-docs](../../chessbird-docs/README.md) — [session and invite flow](../../chessbird-docs/architecture/session-and-rooms.md), [deployment topology](../../chessbird-docs/system/deployment-topology.md).

## Start here (I want to…)

| I want to… | Go to |
|------------|--------|
| Host / OG / favicon / manifest | [hosting/](./hosting/README.md) |
| Publish via GitHub Pages | [publishing/](./publishing/README.md) |
| Domain / DNS | [domain/](./domain/README.md) (details also in hub topology) |

## Folders

- `hosting/` — static hosting, **Open Graph / Twitter / favicon / manifest** (`CHESSBIRD_PUBLIC_ORIGIN`, `npm run inject:public-origin`), `/play/:roomId` invite landing
- `publishing/` — GitHub Pages workflow and configuration (pre-publish inject)
- `domain/` — DNS and domain mapping guidance (points to hub topology when appropriate)
