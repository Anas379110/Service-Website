import type { CollectionEntry } from 'astro:content';

// حسب NFR بـ SRS.md: "آخر تحقق لا يتجاوز 60 يومًا" — عتبة إعادة التحقق
const RECHECK_AFTER_DAYS = 60;

export function isPublished(entry: CollectionEntry<'guides'>): boolean {
  return entry.data.reviewedBy.trim() !== '';
}

export function sortByVerifiedDesc(entries: CollectionEntry<'guides'>[]): CollectionEntry<'guides'>[] {
  return [...entries].sort((a, b) => b.data.lastVerifiedDate.valueOf() - a.data.lastVerifiedDate.valueOf());
}

/**
 * FR3/Error Flow بـ SRS.md: دليل تجاوز عتبة إعادة التحقق يُعرض بوسم "قيد إعادة التحقق"
 * بدل حذفه — لا يُخفى المحتوى، فقط يُنبَّه الزائر.
 */
export function needsRecheck(entry: CollectionEntry<'guides'>, now: Date = new Date()): boolean {
  const ageMs = now.valueOf() - entry.data.lastVerifiedDate.valueOf();
  const ageDays = ageMs / (1000 * 60 * 60 * 24);
  return ageDays > RECHECK_AFTER_DAYS;
}

export function filterByCountry(
  entries: CollectionEntry<'guides'>[],
  country: string
): CollectionEntry<'guides'>[] {
  return entries.filter((e) => e.data.country === country);
}
