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
run `pnpm test`, `pnpm notebooks:check`, and `pnpm build`, then inspect narrow
screens, dark mode, keyboard focus, links, and browser console output.
