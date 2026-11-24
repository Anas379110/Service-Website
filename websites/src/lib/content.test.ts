import { describe, it, expect } from 'vitest';
import { isPublished, sortByVerifiedDesc, needsRecheck, filterByCountry } from './content';
import type { CollectionEntry } from 'astro:content';

function makeEntry(overrides: Partial<CollectionEntry<'guides'>['data']> & { id?: string }) {
  const { id = 'test-id', ...data } = overrides;
  return {
    id,
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
  it('rejects a label without a matching review ledger entry', () => { expect(isPublished(makeEntry({reviewedBy:'reviewer'}))).toBe(false); });
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
    const sa = makeEntry({ id: 'sa', country: 'السعودية' });
    const ae = makeEntry({ id: 'ae', country: 'الإمارات' });
    const result = filterByCountry([sa, ae], 'السعودية');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('sa');
  });
});

describe('sortByVerifiedDesc', () => {
  it('الأحدث تحققًا أولًا', () => {
    const old = makeEntry({ id: 'old', lastVerifiedDate: new Date('2025-01-01') });
    const recent = makeEntry({ id: 'recent', lastVerifiedDate: new Date('2026-06-01') });
    expect(sortByVerifiedDesc([old, recent])[0].id).toBe('recent');
  });
});
