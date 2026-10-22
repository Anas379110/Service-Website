import { defineCollection, z } from 'astro:content';

const guides = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    country: z.enum(['سوريا', 'السعودية', 'الإمارات', 'قطر', 'الكويت']),
    serviceType: z.enum(['توثيق', 'تعليم', 'إقامة_وجوازات', 'أخرى']),
    officialSourceUrl: z.string().url(),
    lastVerifiedDate: z.date(), // يقود منطق "بحاجة تحقق"
    reviewedBy: z.string(),
    reviewedAt: z.date().optional(),
    aiGenerated: z.boolean().default(false),
    sources: z.array(z.string()).min(1),
    excerpt: z.string().max(160),
  }),
});

export const collections = { guides };
