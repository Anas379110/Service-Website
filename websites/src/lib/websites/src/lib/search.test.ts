import { describe, it, expect } from 'vitest';
import { filterGuides, normalizeSearch, type GuideSearchFilters } from './search';

const items = [
  { title: 'إجراءات التعليم', excerpt: 'دليل التوثيق المدرسي', country: 'سوريا', serviceType: 'تعليم' },
  { title: 'خدمات الإقامة', excerpt: 'معلومات التوثيق', country: 'قطر', serviceType: 'إقامة_وجوازات' },
  { title: 'Application help', excerpt: 'Education information', country: 'قطر', serviceType: 'تعليم' },
];
const all: GuideSearchFilters = { query: '', country: '', serviceType: '' };

describe('reviewed guide search', () => {
  it('returns a copy in original order for an empty query', () => {
    expect(filterGuides(items, all)).toEqual(items);
    expect(filterGuides(items, all)).not.toBe(items);
  });
  it('normalizes Arabic accents, alef variants, tatweel and whitespace', () => {
    expect(normalizeSearch('  إِجْــرَاءات\n التَّعليم ')).toBe('اجراءات التعليم');
    expect(filterGuides(items, { ...all, query: 'اجراءات التَّعليم' })).toEqual([items[0]]);
  });
  it('matches excerpts and all query tokens, not just one', () => {
    expect(filterGuides(items, { ...all, query: 'التوثيق' })).toHaveLength(2);
    expect(filterGuides(items, { ...all, query: 'التوثيق المدرسي' })).toEqual([items[0]]);
    expect(filterGuides(items, { ...all, query: 'التوثيق مستحيل' })).toEqual([]);
  });
  it('combines country and service type without changing data', () => {
    const before = JSON.stringify(items);
    expect(filterGuides(items, { ...all, country: 'قطر', serviceType: 'تعليم' })).toEqual([items[2]]);
    expect(JSON.stringify(items)).toBe(before);
  });
  it('supports Latin case folding', () => {
    expect(filterGuides(items, { ...all, query: 'APPLICATION education' })).toEqual([items[2]]);
  });
  it('does not interpret script-like input or regex syntax', () => {
    for (const query of ['<script>alert(1)</script>', '.*', '[a-z]+']) {
      expect(filterGuides(items, { ...all, query })).toEqual([]);
    }
  });
  it('handles empty inventory and unknown filters', () => {
    expect(filterGuides([], all)).toEqual([]);
    expect(filterGuides(items, { ...all, country: 'unknown' })).toEqual([]);
    expect(filterGuides(items, { ...all, serviceType: 'unknown' })).toEqual([]);
  });
});
