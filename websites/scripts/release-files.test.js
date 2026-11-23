import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { collectGuideFiles } from './release-files.mjs';

function withCatalog(run) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'service-release-test-'));
  try { run(root); } finally { fs.rmSync(root, { recursive: true, force: true }); }
}

describe('release catalog matches recursive loader scope', () => {
  it('includes root and deeply nested Markdown with unique relative paths', () => withCatalog(root => {
    fs.mkdirSync(path.join(root, 'sa/deep'), { recursive: true });
    fs.mkdirSync(path.join(root, 'qa'));
    for (const file of ['root.md', 'sa/guide.md', 'qa/guide.md', 'sa/deep/another.md']) fs.writeFileSync(path.join(root, file), 'test');
    expect(collectGuideFiles(root)).toEqual(['qa/guide.md', 'root.md', 'sa/deep/another.md', 'sa/guide.md']);
  }));
  it('excludes underscore Markdown and non-Markdown files', () => withCatalog(root => {
    for (const file of ['_private.md', '.gitkeep', 'notes.txt', 'guide.md']) fs.writeFileSync(path.join(root, file), 'test');
    expect(collectGuideFiles(root)).toEqual(['guide.md']);
  }));
  it('fails closed on symbolic links to files or directories', () => withCatalog(root => {
    fs.mkdirSync(path.join(root, 'real'));
    fs.symlinkSync(path.join(root, 'real'), path.join(root, 'alias'));
    expect(() => collectGuideFiles(root)).toThrow('symbolic link');
  }));
});
