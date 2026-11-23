import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { isPublished } from '../lib/content';

export async function GET({ site }: APIContext) {
  if (!site) return new Response('', { status: 404 });
  const guides = await getCollection('guides', isPublished);
  const countries = ['سوريا', 'السعودية', 'الإمارات', 'قطر', 'الكويت'];
  const paths = ['/', '/about', '/contact', '/privacy', '/terms', ...countries.map(c=>`/country/${encodeURIComponent(c)}`), ...guides.map(g=>`/guide/${encodeURIComponent(g.id)}`)];
  const urls = paths.map(path=>`<url><loc>${new URL(path, site).href.replaceAll('&','&amp;')}</loc></url>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
