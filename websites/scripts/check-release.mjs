import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { validateRelease } from '../src/lib/release.ts';
import { collectGuideFiles } from './release-files.mjs';

const dir = path.resolve('src/content/guides');
const files = collectGuideFiles(dir);
// Frontmatter uses this restricted scalar format for release fields.
const field = (text,key) => text.split('\n').find(l=>l.startsWith(key+':'))?.slice(key.length+1).trim().replace(/^['"]|['"]$/g,'') ?? '';
const guides = files.map(file=>{
  const text = fs.readFileSync(path.join(dir,file),'utf8');
  // Exclude review labels from hash so approvals bind the exact guide text and other metadata.
  const normalized = text.replace(/^reviewedBy:.*\r?\n/gm,'').replace(/^reviewedAt:.*\r?\n/gm,'');
  return {id:file,country:field(text,'country'),officialSourceUrl:field(text,'officialSourceUrl'),lastVerifiedDate:field(text,'lastVerifiedDate'),reviewedBy:field(text,'reviewedBy'),reviewedAt:field(text,'reviewedAt'),contentHash:crypto.createHash('sha256').update(normalized).digest('hex')};
});
const approvals = fs.existsSync('editorial-approvals.json') ? JSON.parse(fs.readFileSync('editorial-approvals.json','utf8')) : [];
const errors = validateRelease(guides,{origin:process.env.SERVICE_ORIGIN ?? '', contact:process.env.SERVICE_CONTACT_EMAIL ?? '', approvals});
if (errors.length) { console.error(errors.join('\n')); process.exitCode=1; } else console.log(`Release evidence checks passed for ${guides.length} guides. Does not replace human review or source reading.`);
