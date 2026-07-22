# Turnkey Site

The independent official website, documentation portal, tutorial center, and
learning book for [Turnkey](https://github.com/lijrjyan/turnkey).

## Local development

```bash
corepack enable
pnpm install
pnpm exec playwright install chromium
pnpm test
pnpm dev
```

The production site is configured for
`https://lijrjyan.github.io/turnkey-site/`. Use `pnpm build` to run Astro's
diagnostics and create the static `dist/` tree.

Run `pnpm verify` before review to check content contracts, notebook
provenance, the production build, desktop/mobile browser behavior, full-site
local links, WCAG A/AA, and high-severity dependency advisories.

## Content map

- `src/content/docs/start/`: installation and first-run orientation;
- `src/content/docs/learn/`: continuous, ordered learning book;
- `src/content/docs/tutorials/`: task-focused walkthroughs;
- `src/content/docs/guides/`: goal and operations guidance;
- `src/content/docs/concepts/`: stable mental models;
- `src/content/docs/reference/`: precise contracts and release status;
- `public/notebooks/`: downloadable notebook editions with provenance.

Development commits belong on `dev`; `main` is the deployed branch. Keep
runtime implementation in the product repository and run `pnpm verify` before
proposing documentation changes.

## License

Apache License 2.0. See [LICENSE](LICENSE).
