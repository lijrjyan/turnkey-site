# Contributing to Turnkey Site

Thank you for improving Turnkey's official documentation and learning
experience.

## Repository boundary

This repository owns public narrative, learning order, tutorials, and website
presentation. Runtime code, Python API truth, and release behavior belong in
the [`turnkey`](https://github.com/lijrjyan/turnkey) product repository. When a
documentation change depends on unreleased runtime behavior, link the exact
product commit and do not describe it as released.

## Branches

- Create commits on `dev` or a branch based on `dev`.
- Open review toward `dev` during active development.
- Do not commit directly on `main`; it is the stable GitHub Pages source.
- Promotion from `dev` to `main` requires maintainer approval and a green build.

Local hooks enforce the direct-commit boundary:

```bash
bash scripts/install-git-hooks.sh
```

## Make a documentation change

1. Install Node 22 or newer and enable Corepack.
2. Run `pnpm install`.
3. Place content in the lane matching its purpose:
   - **Learn** for ordered conceptual progression;
   - **Tutorials** for a complete task with an observable result;
   - **Guides** for goal-oriented decisions and operations;
   - **Concepts** for stable mental models;
   - **Reference** for exact contracts and exhaustive facts.
4. Add the page to `astro.config.mjs` when it belongs in global navigation.
5. Run `pnpm check && pnpm build`.

## Writing contract

- Lead with what the reader will accomplish and state prerequisites.
- Keep code runnable and identify whether it targets a released package or a
  source preview.
- Separate interface existence, local/fake success, real integration wiring,
  and live service proof.
- Prefer one canonical explanation; link to it instead of copying prose.
- Include an expected result and a failure/debugging path for procedural work.
- Use descriptive links, semantic headings, alt text, and language-labelled
  code fences.
- Do not include credentials, private hostnames, internal datasets, raw run
  outputs, or private conversation history.

## Notebook updates

Canonical notebooks live in the sibling product checkout during coordinated
development. From the workspace, run:

```bash
pnpm notebooks:sync
pnpm notebooks:check
```

The sync command copies the four public notebooks and records their product
commit plus SHA-256 digests. Commit the notebooks and `provenance.json`
together. A standalone site clone can verify committed provenance without the
product checkout.

## Pull request checklist

- [ ] Scope is in this repository's ownership boundary.
- [ ] Commands and examples match the stated product version/commit.
- [ ] New pages are reachable from navigation or a deliberate parent page.
- [ ] `pnpm test`, `pnpm build`, and notebook provenance checks pass.
- [ ] Light/dark and narrow-screen reading remain usable.
- [ ] No secret, internal identifier, or private source material was added.
- [ ] License/attribution changes are included when required.
