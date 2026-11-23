import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const guides = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
    country: z.enum(['سوريا', 'السعودية', 'الإمارات', 'قطر', 'الكويت']),
    serviceType: z.enum(['توثيق', 'تعليم', 'إقامة_وجوازات', 'أخرى']),
    officialSourceUrl: z.url({ protocol: /^https$/ }).refine(value => { const url = new URL(value); return !url.username && !url.password; }, 'Official sources must use HTTPS without credentials'),
    lastVerifiedDate: z.date(), // يقود منطق "بحاجة تحقق"
    reviewedBy: z.string(),
    reviewedAt: z.date().optional(),
    aiGenerated: z.boolean().default(false),
    sources: z.array(z.string()).min(1),
    excerpt: z.string().max(160),
  }),
});

export const collections = { guides };
