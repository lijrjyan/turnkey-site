---
title: Contributing
description: Improve Turnkey documentation without crossing product or privacy boundaries.
---

The complete contributor workflow is in
[`CONTRIBUTING.md`](https://github.com/lijrjyan/turnkey-site/blob/main/CONTRIBUTING.md).

Choose a content lane before writing: Learn for ordered progression, Tutorials
for task completion, Guides for goal-oriented decisions, Concepts for mental
models, and Reference for exact contracts. Runtime changes belong in the
product repository.

Every procedural page needs a reproducible command, expected result, and first
debugging surface. Every release claim needs a version or commit. Before review,
run `pnpm verify`; it covers content contracts, notebook provenance, the static
build, narrow-screen behavior, local links, WCAG A/AA, and dependency advisories.
