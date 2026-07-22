# Turnkey Site authoring contract

This repository is the official website, documentation portal, tutorial center,
and ordered learning book for Turnkey. Write public content in clear English by
default; keep examples concise, reproducible, and honest about release state.

## Content ownership

- Product behavior is sourced from the sibling `../turnkey` checkout or an
  explicit public product commit.
- `Learn` is continuous and concept-progressive; `Tutorials` are task-complete;
  `Guides` are goal-oriented; `Concepts` explain mental models; `Reference` is
  exact and exhaustive.
- Do not move runtime implementation, private operations, raw experiments,
  internal datasets, or agent conversation history into this repository.
- Simplified examples must preserve the product's real component and artifact
  boundaries. Label fake/local paths separately from real integrations.

## Verification

Run `pnpm verify`. For UI changes, inspect desktop, 375px mobile, dark mode,
focus navigation, overflow, links, and browser console errors. Treat axe WCAG
violations as failures, not warnings. Scan the tracked tree for secrets before
publishing.

Commit active work on `dev`. Never commit directly on `main`; promotion to the
deployed branch requires owner approval.
