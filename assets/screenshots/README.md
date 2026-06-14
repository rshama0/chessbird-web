# Screenshot assets & rotation

This folder holds WebP screenshots for the homepage hero and gallery. **Rotation is not automatic from the filesystem** — read the sections below before adding or renaming files.

---

## How rotation works (architecture)

- **Source of truth:** `screenshotGroups` in **`js/main.js`**. Each key is an **ordered array of image URLs** (paths like `assets/screenshots/the-invitation/1.webp`).
- **No folder auto-scan:** Dropping a file into a subfolder does **nothing** until that URL appears in the matching array in `main.js`.
- **Flexible count:** There is **no hardcoded maximum** per group. Rotation uses `array.length` only.
- **Two DOM layers per device:** Each rotating phone has **exactly two** `<img class="screenshot-rotator__layer">` inside `.screenshot-rotator__screen`. Add more URLs to `screenshotGroups` — do not add extra `<img>` tags.
- **Do not use `loading="lazy"`** on rotator layers — lazy loading breaks crossfade when `main.js` swaps `src` (notably in Microsoft Edge).
- **Invalid paths:** A bad URL shows a broken frame for that step; fix the path or add the missing file.

---

## Folder layout & showcase moments

```
assets/screenshots/
  home/              → hero only (lobby / start)
  the-invitation/    → The Invitation
  at-the-board/      → At the Board
  settings/          → Your Board, Your Style
  result/            → The Final Move
```

Folder names match **`data-screenshot-group`** keys on the homepage.

### Where each group appears

| Key / folder | Showcase title | Role |
| ------------ | -------------- | ---- |
| `home/` | — | **Hero phone only** — not repeated in the showcase grid. |
| `the-invitation/` | The Invitation | Create room, invite, join. |
| `at-the-board/` | At the Board | Live game — board, voice, in-play UI. |
| `settings/` | Your Board, Your Style | Boards, pieces, themes, settings. |
| `result/` | The Final Move | Endgame / result screens worth sharing. |

Showcase order: **the-invitation → at-the-board → settings → result** (matches the app journey after the hero).

---

## Maintainer workflow

1. Add or replace **`.webp`** files under the correct subfolder.
2. Update **`screenshotGroups`** in **`js/main.js`**: list every image URL for that group, in rotation order.
3. Align the **initial** `src` on the two layer `<img>` elements for that figure in **`index.html`** with the first two URLs.
4. Deploy paths are **case-sensitive** on Linux / GitHub Pages.

**Do not** remove one of the two layer `<img>` elements — rotation expects at least two layers per rotator.

---

## Naming conventions

- **Recommended:** numeric names (`1.webp`, `2.webp`, …) and **lowercase** folder names.
- **`result/`:** Replace placeholder shots with dedicated endgame/share captures when available.

---

## Image format

Prefer **WebP**. The CSS frame targets **1080 × 2273** portrait; matching that aspect avoids letterboxing.

---

## Reduced motion

If the visitor has **`prefers-reduced-motion: reduce`**, auto-rotation stops and only the **first** image in each group is shown.

---

## Quick reference

| Question | Answer |
| -------- | ------ |
| Where do I list images? | `screenshotGroups` in **`js/main.js`**. |
| Max images per group? | None (array length). |
| How many `<img>` layers per rotator? | Always **two**. |
| Does the folder alone register new shots? | **No** — update the array. |
