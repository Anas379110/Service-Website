import { defineConfig } from 'astro/config';
import tailwind from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
const mode = JSON.parse(fs.readFileSync(new URL('./release-mode.json', import.meta.url), 'utf8'));
if (mode.production) {
 process.env.SERVICE_ORIGIN = 'https://service-reader-staging.onrender.com';
 process.env.SERVICE_CONTACT_EMAIL = 'homsi434q@gmail.com';
 process.env.SERVICE_PRODUCTION = '1';
 execFileSync(process.execPath, ['--experimental-strip-types','scripts/check-release.mjs'], {stdio:'inherit',env:process.env});
}

export default defineConfig({
  output: 'static',
  build: { inlineStylesheets: 'never' },
  site: process.env.SERVICE_ORIGIN || undefined,
  vite: { build: { assetsInlineLimit: 0 }, css: { postcss: { plugins: [tailwind(), autoprefixer()] } } },
});
