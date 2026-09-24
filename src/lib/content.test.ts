import { describe, it, expect } from 'vitest';
import { isPublished, sortByVerifiedDesc, needsRecheck, filterByCountry } from './content';
import type { CollectionEntry } from 'astro:content';

function makeEntry(overrides: Partial<CollectionEntry<'guides'>['data']> & { slug?: string }) {
  const { slug = 'test-slug', ...data } = overrides;
  return {
    slug,
    data: {
      title: 'دليل تجريبي',
      country: 'السعودية' as const,
      serviceType: 'توثيق' as const,
      officialSourceUrl: 'https://example.gov.sa',
      lastVerifiedDate: new Date('2026-01-01'),
      reviewedBy: '',
      aiGenerated: false,
      sources: ['مصدر رسمي'],
      excerpt: 'ملخص',
      ...data,
    },
  } as unknown as CollectionEntry<'guides'>;
}

describe('isPublished', () => {
  it('يرفض بلا reviewedBy', () => {
    expect(isPublished(makeEntry({ reviewedBy: '' }))).toBe(false);
  });
});

describe('needsRecheck — عتبة 60 يومًا', () => {
  it('دليل بعمر 30 يومًا لا يحتاج تحقق', () => {
    const now = new Date('2026-01-31');
    expect(needsRecheck(makeEntry({ lastVerifiedDate: new Date('2026-01-01') }), now)).toBe(false);
  });

  it('دليل بعمر 61 يومًا يحتاج تحقق', () => {
    const now = new Date('2026-03-03'); // 61 يومًا بعد 2026-01-01
    expect(needsRecheck(makeEntry({ lastVerifiedDate: new Date('2026-01-01') }), now)).toBe(true);
  });
});

describe('filterByCountry', () => {
  it('يفلتر حسب الدولة بدقة، لا خلط بين الدول (US2 بـ SRS.md)', () => {
    const sa = makeEntry({ slug: 'sa', country: 'السعودية' });
    const ae = makeEntry({ slug: 'ae', country: 'الإمارات' });
    const result = filterByCountry([sa, ae], 'السعودية');
    expect(result).toHaveLength(1);
    expect(result[0].slug).toBe('sa');
  });
});

describe('sortByVerifiedDesc', () => {
  it('الأحدث تحققًا أولًا', () => {
    const old = makeEntry({ slug: 'old', lastVerifiedDate: new Date('2025-01-01') });
    const recent = makeEntry({ slug: 'recent', lastVerifiedDate: new Date('2026-06-01') });
    expect(sortByVerifiedDesc([old, recent])[0].slug).toBe('recent');
  });
});
