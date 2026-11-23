export interface ReleaseGuide {
  id: string;
  country: string;
  officialSourceUrl: string;
  reviewedBy: string;
  reviewedAt?: string;
  lastVerifiedDate: string;
  contentHash?: string;
}
export interface ReviewApproval { contentHash: string; reviewer: string; approvedAt: string; evidence: string }
const countries = ['سوريا', 'السعودية', 'الإمارات', 'قطر', 'الكويت'];
const hosts: Record<string, string[]> = {
  'سوريا': ['mofaex.gov.sy'], 'السعودية': ['moe.gov.sa', 'www.moe.gov.sa', 'my.gov.sa'],
  'الإمارات': ['u.ae', 'www.mofa.gov.ae', 'moe.gov.ae', 'www.moe.gov.ae', 'web.khda.gov.ae'], 'قطر': ['www.sharek.gov.qa', 'www.edu.gov.qa', 'eduservices.edu.gov.qa'],
  'الكويت': ['e.gov.kw', 'www.moe.edu.kw', 'eservices.moe.edu.kw', 'results.moe.edu.kw', 'stdservice.moe.edu.kw'],
};
export function validateRelease(guides: ReleaseGuide[], config: { origin: string; contact: string; approvals: ReviewApproval[] }, now = new Date()): string[] {
  const errors: string[] = [];
  let origin: URL | undefined;
  try { origin = new URL(config.origin); } catch { errors.push('Missing valid production origin'); }
  if (origin && (origin.protocol !== 'https:' || origin.username || origin.password || origin.pathname !== '/' || origin.search || origin.hash || origin.hostname.endsWith('.invalid'))) errors.push('Invalid production origin');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.contact) || config.contact === 'contact@service.anasnet.com') errors.push('Missing approved contact');
  if (guides.length < 30) errors.push('Fewer than30 reviewed guides');
  for (const country of countries) if (!guides.some(g => g.country === country)) errors.push(`Missing country ${country}`);
  const ids = new Set<string>();
  for (const g of guides) {
    if (ids.has(g.id)) errors.push(`Duplicate guide ${g.id}`); ids.add(g.id);
    let url: URL | undefined;
    try { url = new URL(g.officialSourceUrl); } catch { errors.push(`Invalid source ${g.id}`); }
    if (url && (url.protocol !== 'https:' || url.username || url.password || !(hosts[g.country] ?? []).includes(url.hostname))) errors.push(`Unverified source host ${g.id}`);
    const age = now.valueOf() - new Date(g.lastVerifiedDate).valueOf();
    if (!Number.isFinite(age) || age < 0 || age > 60*86400000) errors.push(`Source verification stale or invalid ${g.id}`);
    const approved = config.approvals.some(a => a.contentHash === g.contentHash && !!g.contentHash && a.reviewer === g.reviewedBy && a.approvedAt === g.reviewedAt && a.evidence.trim());
    if (!approved || !g.reviewedBy.trim()) errors.push(`No matching real editorial approval ${g.id}`);
    const reviewTime = new Date(g.reviewedAt ?? '').valueOf();
    if (!Number.isFinite(reviewTime) || reviewTime > now.valueOf()) errors.push(`Invalid review date ${g.id}`);
  }
  return errors;
}
