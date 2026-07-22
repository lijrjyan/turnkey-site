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

test('installation copy accurately distinguishes PyPI reservation and source preview', async () => {
  const home = await text('src/content/docs/index.mdx');
  const install = await text('src/content/docs/start/install.md');

  for (const content of [home, install]) {
    assert.match(content, /0\.0\.1/);
    assert.match(content, /namespace reservation/i);
    assert.match(content, /0\.1\.0/);
    assert.match(content, /source preview/i);
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
  assert.match(provenance.product_commit, /^[0-9a-f]{40}$/);
  assert.equal(provenance.product_commit, '86d71e3290fffa7f0dc03afee7064fc79191f579');

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

test('the repository ships a complete public contribution boundary', async () => {
  for (const file of [
    'CONTRIBUTING.md',
    'CODE_OF_CONDUCT.md',
    'SECURITY.md',
    'SUPPORT.md',
    'GOVERNANCE.md',
    'CHANGELOG.md',
    'LICENSE',
    'NOTICE',
    '.github/PULL_REQUEST_TEMPLATE.md',
  ]) {
    const content = await text(file);
    assert.ok(content.trim().length > 100, `${file} must contain a real policy`);
  }
});

test('documentation lanes are explicit and product claims are pinned', async () => {
  const contributing = await text('CONTRIBUTING.md');
  for (const lane of ['Learn', 'Tutorials', 'Guides', 'Concepts', 'Reference']) {
    assert.match(contributing, new RegExp(`\\*\\*${lane}\\*\\*`));
  }

  const source = JSON.parse(await text('sources/product.json'));
  assert.equal(source.commit, '86d71e3290fffa7f0dc03afee7064fc79191f579');
  assert.equal(source.source_version, '0.1.0');
  assert.equal(source.pypi_version, '0.0.1');
});

test('continuous integration includes browser and accessibility gates', async () => {
  for (const file of ['.github/workflows/ci.yml', '.github/workflows/pages.yml']) {
    const workflow = await text(file);
    assert.match(workflow, /playwright install --with-deps chromium/);
    assert.match(workflow, /pnpm test:e2e/);
    assert.match(workflow, /timeout-minutes:/);
  }
});

test('repository governance is reviewable and dependency updates are automated', async () => {
  const codeowners = await text('.github/CODEOWNERS');
  const dependabot = await text('.github/dependabot.yml');
  const settings = await text('docs/repository-settings.md');
  const releasing = await text('RELEASING.md');

  assert.match(codeowners, /^\*\s+@lijrjyan/m);
  assert.match(dependabot, /package-ecosystem:\s*"npm"/);
  assert.match(dependabot, /package-ecosystem:\s*"github-actions"/);
  assert.match(settings, /Require a pull request before merging/i);
  assert.match(settings, /GitHub Actions/i);
  assert.match(releasing, /dev.*main/is);
  assert.match(releasing, /product commit/i);
});
