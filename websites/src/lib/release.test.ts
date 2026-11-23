import { describe, expect, it } from 'vitest';
import { validateRelease, type ReleaseGuide } from './release';
const now = new Date('2026-11-23T12:00:00Z');
const countries = ['سوريا', 'السعودية', 'الإمارات', 'قطر', 'الكويت'];
const urls = ['https://mofaex.gov.sy/services','https://moe.gov.sa/','https://u.ae/','https://www.sharek.gov.qa/','https://www.moe.edu.kw/'];
const guides: ReleaseGuide[] = Array.from({length:30},(_,i)=>({id:`fixture-${i}`,country:countries[i%5],officialSourceUrl:urls[i%5],reviewedBy:'Fictional test reviewer',reviewedAt:'2026-11-23T10:00:00Z',lastVerifiedDate:'2026-11-23',contentHash:`fictional-${i}`}));
const config = { origin:'https://test.example.org',contact:'fictional@example.org', approvals:guides.map(g=>({contentHash:g.contentHash!,reviewer:g.reviewedBy,approvedAt:g.reviewedAt!,evidence:'Test-only fixture, not editorial permission'})) };
describe('production release checks, synthetic unit fixtures only',()=>{
 it('accepts complete structurally matched fixtures',()=>expect(validateRelease(guides,config,now)).toEqual([]));
 it('blocks empty catalog and unknown origin/contact',()=>expect(validateRelease([],{origin:'',contact:'',approvals:[]},now).length).toBeGreaterThan(5));
 it('blocks reviewer-name-only approval',()=>expect(validateRelease(guides,{...config,approvals:[]},now).some(e=>e.includes('editorial'))).toBe(true));
 it('blocks changed content after review',()=>expect(validateRelease([{...guides[0],contentHash:'changed'},...guides.slice(1)],config,now).some(e=>e.includes('editorial'))).toBe(true));
 it('blocks future or stale verification',()=>{for(const date of ['2026-12-01','2026-01-01','not-date'])expect(validateRelease([{...guides[0],lastVerifiedDate:date},...guides.slice(1)],config,now).some(e=>e.includes('stale'))).toBe(true);});
 it('blocks lookalike/executable or credentialed source URLs',()=>{for(const url of ['https://u.ae.attacker.invalid/','javascript:alert(1)','https://user@u.ae/'])expect(validateRelease([{...guides[2],officialSourceUrl:url},...guides.slice(3)],config,now).some(e=>e.includes('host')||e.includes('source'))).toBe(true);});
 it('accepts verified specific Saudi and Dubai authority hosts',()=>{for(const [i,url] of [[1,'https://www.moe.gov.sa/ar/services/'],[2,'https://web.khda.gov.ae/en/Services/']] as const)expect(validateRelease(guides.map((g,j)=>j===i?{...g,officialSourceUrl:url}:g),config,now)).toEqual([]);});
 it('blocks omitted country and duplicate ids',()=>{expect(validateRelease(guides.filter(g=>g.country!=='سوريا'),config,now).some(e=>e.includes('country'))).toBe(true);expect(validateRelease([...guides,guides[0]],config,now).some(e=>e.includes('Duplicate'))).toBe(true);});
});
