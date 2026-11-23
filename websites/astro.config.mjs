import { defineConfig } from 'astro/config';
import tailwind from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  output: 'static',
  build: { inlineStylesheets: 'never' },
  site: process.env.SERVICE_ORIGIN || undefined,
  vite: { build: { assetsInlineLimit: 0 }, css: { postcss: { plugins: [tailwind(), autoprefixer()] } } },
});
