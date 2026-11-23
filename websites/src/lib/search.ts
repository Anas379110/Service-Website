export interface GuideSearchItem {
  title: string;
  excerpt: string;
  country: string;
  serviceType: string;
}

export interface GuideSearchFilters {
  query: string;
  country: string;
  serviceType: string;
}

export function normalizeSearch(value: string): string {
  return value.normalize('NFKC').toLocaleLowerCase('ar')
    .replace(/[\u0610-\u061a\u064b-\u065f\u0670\u06d6-\u06ed\u0640]/g, '')
    .replace(/[أإآٱ]/g, 'ا').replace(/ى/g, 'ي').replace(/\s+/g, ' ').trim();
}

export function matchesGuide(item: GuideSearchItem, filters: GuideSearchFilters): boolean {
  if (filters.country && item.country !== filters.country) return false;
  if (filters.serviceType && item.serviceType !== filters.serviceType) return false;
  const haystack = normalizeSearch(`${item.title} ${item.excerpt}`);
  return normalizeSearch(filters.query).split(' ').filter(Boolean).every(word => haystack.includes(word));
}

export function filterGuides<T extends GuideSearchItem>(items: readonly T[], filters: GuideSearchFilters): T[] {
  return items.filter(item => matchesGuide(item, filters));
}
