# Turnkey Site

The independent official website, documentation portal, tutorial center, and
learning book for [Turnkey](https://github.com/lijrjyan/turnkey).

## Local development

```bash
corepack enable
pnpm install
pnpm test
pnpm dev
```

The production site is configured for
`https://lijrjyan.github.io/turnkey-site/`. Use `pnpm build` to run Astro's
diagnostics and create the static `dist/` tree.

## Content map

- `src/content/docs/start/`: installation and first-run orientation;
- `src/content/docs/learn/`: continuous, ordered learning book;
- `src/content/docs/tutorials/`: task-focused walkthroughs;
- `src/content/docs/guides/`: goal and operations guidance;
- `src/content/docs/concepts/`: stable mental models;
- `src/content/docs/reference/`: precise contracts and release status;
- `public/notebooks/`: downloadable notebook editions with provenance.

See [CONTRIBUTING.md](CONTRIBUTING.md) before changing content. Development
commits belong on `dev`; `main` is the deployed branch.

## License

Apache License 2.0. See [LICENSE](LICENSE).
