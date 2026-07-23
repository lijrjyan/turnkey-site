import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, stat } from 'node:fs/promises';
import test from 'node:test';

const text = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('the homepage exposes the complete product and learning entry points', async () => {
  const home = await text('src/content/docs/index.mdx');

  for (const phrase of [
    'Bring Your Own Detector',
    'Run',
    'Build',
    'Debug',
    'Audit',
    'Start learning',
    'Explore the reference',
  ]) {
    assert.match(home, new RegExp(phrase));
  }
});

test('installation copy reflects the published PyPI release', async () => {
  const home = await text('src/content/docs/index.mdx');
  const install = await text('src/content/docs/start/install.md');

  for (const content of [home, install]) {
    assert.match(content, /0\.1\.0/);
    assert.match(content, /pip install turnkey/);
    assert.doesNotMatch(content, /namespace reservation/i);
  }
});

test('the learning book contains four ordered chapters and notebook downloads', async () => {
  const config = await text('astro.config.mjs');
  const chapters = [
    ['learn/quickstart.md', '00_quickstart.ipynb'],
    ['learn/build-your-own-detector.md', '01_build_your_own_detector.ipynb'],
    ['learn/debug-a-missed-case.md', '02_debug_a_missed_case.ipynb'],
    ['learn/typed-signals.md', '03_typed_signals.ipynb'],
  ];

  let previous = -1;
  for (const [chapter, notebook] of chapters) {
    const chapterText = await text(`src/content/docs/${chapter}`);
    assert.match(chapterText, new RegExp(notebook.replaceAll('.', '\\.')));
    await stat(new URL(`../public/notebooks/${notebook}`, import.meta.url));

    const position = config.indexOf(chapter.replace(/\.md$/, ''));
    assert.ok(position > previous, `${chapter} must appear in course order`);
    previous = position;
  }
});

test('published notebooks carry exact product commit and checksum provenance', async () => {
  const provenance = JSON.parse(await text('public/notebooks/provenance.json'));
  const source = JSON.parse(await text('sources/product.json'));
  assert.match(provenance.product_commit, /^[0-9a-f]{40}$/);
  assert.equal(provenance.product_commit, source.commit);

  for (const item of provenance.notebooks) {
    const bytes = await readFile(new URL(`../public/notebooks/${item.file}`, import.meta.url));
    const digest = createHash('sha256').update(bytes).digest('hex');
    assert.equal(digest, item.sha256, `${item.file} checksum drifted`);
  }
});

test('GitHub Pages deploys only main with least-privilege permissions', async () => {
  const workflow = await text('.github/workflows/pages.yml');
  assert.match(workflow, /branches:\s*\[main\]/);
  assert.match(workflow, /contents:\s*read/);
  assert.match(workflow, /pages:\s*write/);
  assert.match(workflow, /id-token:\s*write/);
  assert.match(workflow, /actions\/upload-pages-artifact@[0-9a-f]{40}\s+# v4/);
  assert.match(workflow, /actions\/deploy-pages@[0-9a-f]{40}\s+# v4/);
  assert.match(workflow, /path:\s*\.\/dist/);
});

test('all third-party workflow actions are pinned to full commit SHAs', async () => {
  for (const file of ['.github/workflows/ci.yml', '.github/workflows/pages.yml']) {
    const workflow = await text(file);
    const uses = [...workflow.matchAll(/uses:\s*([^\s#]+)(?:\s+#\s*(\S+))?/g)];
    assert.ok(uses.length > 0, `${file} must use tracked actions`);
    for (const match of uses) {
      assert.match(match[1], /@[0-9a-f]{40}$/, `${match[1]} must be immutable`);
      assert.match(match[2] ?? '', /^v\d+$/, `${match[1]} needs a readable major-version comment`);
    }
  }
});

test('site configuration preserves the GitHub project base path', async () => {
  const config = await text('astro.config.mjs');
  assert.match(config, /site:\s*['"]https:\/\/lijrjyan\.github\.io['"]/);
  assert.match(config, /base:\s*['"]\/turnkey-site\/?['"]/);
});

test('repository-level documentation is intentionally minimal', async () => {
  assert.match(await text('README.md'), /# Turnkey Site/);
  assert.match(await text('LICENSE'), /Apache License\s+Version 2\.0/);

  for (const file of [
    'AGENTS.md',
    'CONTRIBUTING.md',
    'CODE_OF_CONDUCT.md',
    'SECURITY.md',
    'SUPPORT.md',
    'GOVERNANCE.md',
    'CHANGELOG.md',
    'NOTICE',
    'RELEASING.md',
    '.githooks',
    '.github/CODEOWNERS',
    '.github/dependabot.yml',
    '.github/ISSUE_TEMPLATE',
    '.github/PULL_REQUEST_TEMPLATE.md',
    'scripts/install-git-hooks.sh',
    'docs/repository-settings.md',
  ]) {
    await assert.rejects(text(file), undefined, `${file} belongs in the workspace`);
  }
});

test('documentation lanes are explicit and product claims are pinned', async () => {
  const source = JSON.parse(await text('sources/product.json'));
  assert.match(source.commit, /^[0-9a-f]{40}$/);
  assert.equal(source.source_version, '0.1.0');
  assert.equal(source.pypi_version, '0.1.0');
});

test('continuous integration includes browser and accessibility gates', async () => {
  for (const file of ['.github/workflows/ci.yml', '.github/workflows/pages.yml']) {
    const workflow = await text(file);
    assert.match(workflow, /playwright install --with-deps chromium/);
    assert.match(workflow, /pnpm test:e2e/);
    assert.match(workflow, /timeout-minutes:/);
  }
});
