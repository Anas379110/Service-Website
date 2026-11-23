import fs from 'node:fs';
import path from 'node:path';

/** Match the guide loader's recursive Markdown scope. Reject links rather than
 * following content outside the catalog or silently omitting it from review. */
export function collectGuideFiles(root) {
  const files = [];
  const walk = (directory, prefix) => {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const relative = prefix ? `${prefix}/${entry.name}` : entry.name;
      if (entry.isSymbolicLink()) throw new Error(`Guide catalog contains unsupported symbolic link: ${relative}`);
      if (entry.isDirectory()) walk(path.join(directory, entry.name), relative);
      else if (entry.isFile() && entry.name.endsWith('.md') && !entry.name.startsWith('_')) files.push(relative);
    }
  };
  walk(root, '');
  return files.sort();
}
