---
title: Domain docs
owner: web
repository: chessbird-web
lifecycle: Canonical
role: Map
status: Active
last_reviewed: 2026-07-19
---

# Domain Docs

Domain and DNS mapping guidance for **`chessbird-web`**.

## Canonical topology

Public hostname, Cloudflare, and how the marketing site relates to the session API are described in the hub:

→ [chessbird-docs/system/deployment-topology.md](../../../chessbird-docs/system/deployment-topology.md)

## Web-specific notes

- Custom domain for GitHub Pages / static hosting: see [../publishing/README.md](../publishing/README.md) and [../hosting/README.md](../hosting/README.md).
- Production marketing origin is typically **`https://chessbird.app`** (see hosting docs for OG inject when using Project Pages URLs).
