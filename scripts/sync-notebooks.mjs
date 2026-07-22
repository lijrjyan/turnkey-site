import { createHash } from 'node:crypto';
import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const productRoot = path.resolve(siteRoot, '..', 'turnkey');
const sourceRoot = path.join(productRoot, 'docs', 'notebooks');
const outputRoot = path.join(siteRoot, 'public', 'notebooks');
const provenancePath = path.join(outputRoot, 'provenance.json');
const checkOnly = process.argv.includes('--check');
const files = [
  '00_quickstart.ipynb',
  '01_build_your_own_detector.ipynb',
  '02_debug_a_missed_case.ipynb',
  '03_typed_signals.ipynb',
];

const sha256 = (bytes) => createHash('sha256').update(bytes).digest('hex');

async function readProvenance() {
  return JSON.parse(await readFile(provenancePath, 'utf8'));
}

async function verifyPublished() {
  const provenance = await readProvenance();
  if (!/^[0-9a-f]{40}$/.test(provenance.product_commit)) {
    throw new Error('provenance.product_commit must be a full Git commit');
  }
  if (provenance.notebooks.length !== files.length) {
    throw new Error(`expected ${files.length} notebook provenance rows`);
  }

  for (const file of files) {
    const row = provenance.notebooks.find((item) => item.file === file);
    if (!row) throw new Error(`missing provenance for ${file}`);
    const published = await readFile(path.join(outputRoot, file));
    if (sha256(published) !== row.sha256) {
      throw new Error(`${file} does not match its published SHA-256`);
    }

    try {
      const source = await readFile(path.join(sourceRoot, file));
      if (!source.equals(published)) {
        throw new Error(`${file} differs from the sibling product notebook`);
      }
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
  }

  process.stdout.write(`verified ${files.length} notebooks from ${provenance.product_commit}\n`);
}

async function sync() {
  const productCommit = execFileSync('git', ['-C', productRoot, 'rev-parse', 'HEAD'], {
    encoding: 'utf8',
  }).trim();
  await mkdir(outputRoot, { recursive: true });

  const notebooks = [];
  for (const file of files) {
    const source = path.join(sourceRoot, file);
    const target = path.join(outputRoot, file);
    await copyFile(source, target);
    notebooks.push({ file, sha256: sha256(await readFile(target)) });
  }

  const provenance = {
    schema_version: 1,
    product_repository: 'https://github.com/lijrjyan/turnkey',
    product_commit: productCommit,
    source_path: 'docs/notebooks',
    notebooks,
  };
  await writeFile(provenancePath, `${JSON.stringify(provenance, null, 2)}\n`);
  process.stdout.write(`synced ${files.length} notebooks from ${productCommit}\n`);
}

await (checkOnly ? verifyPublished() : sync());
