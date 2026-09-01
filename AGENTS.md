<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Portfolio project conventions

Before changing this portfolio's UI, read [`CLAUDE.md`](./CLAUDE.md). It is the
source of truth for the Toss design tokens, component inventory, content rules,
and project-detail layouts. Do not redesign a project page or introduce a
project-specific layout when its existing data-driven component supports the
required composition.

## Project detail rules

- Keep project content in `content/projects.ts`; `ProjectDetail` and its child
  components assemble the page from that data.
- A decision with `image` owns that image. Do not leave a matching decision
  screen in `screens[]` as a detached service-screen section.
- For a wide desktop decision image, preserve the three-row layout: S&T spans
  both columns; Action cards and image share the middle row; Result spans both
  columns below them.
- In that middle row, align the image vertically to the **center of the Action
  card group** with `self-center`. Do not top-align it or add compensating top
  padding. The image caption is outside this alignment calculation.
- Use `ProjectImage.prominent: true` only when the decision image needs the
  larger `11fr / 9fr` text-to-image split. It changes width only, never the
  center-alignment rule.
- Use `ProjectImage.narrow: true` only for tall phone mockups; it follows the
  existing fixed-width phone layout described in `CLAUDE.md`.
- If a process diagram becomes unreadable when scaled to the detail-column
  width, use `diagrams[]` to split it by meaningful stage. Keep its desktop
  node body copy at 12px or larger; do not solve this by forcing desktop users
  into horizontal scrolling.
- When a decision is about an internal process rather than a visible UI, use
  `decisions[].diagram` between S&T and Action instead of fabricating a
  performance screenshot. Put a real user-facing outcome screen in
  `showcaseScreen` within the overview.
- When an overview screenshot is taller than its information value, pair it
  with concise `showcasePoints[]` through `ImagePointsGrid`; do not render it
  as an oversized standalone image. Use `decisions[].order` when the actual
  process sequence differs from the source-data order.

After layout changes, run `npm run lint` and `npm run build`.
