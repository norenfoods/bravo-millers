import type { Winner } from "@/types/winner";
import { WINNERS_2026 } from "@/lib/winners";

export function slugifyProducer(producer: string): string {
  return producer
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function findWinner(producerSlug: string, brandSlug: string): Winner | undefined {
  return WINNERS_2026.find(
    (w) => slugifyProducer(w.producer) === producerSlug && w.slug === brandSlug,
  );
}

function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

export interface AwardEntry {
  year: number;
  tier: "Gold" | "Silver" | "Best in Class";
}

export const CURRENT_EDITION = 2026;

export function buildAwardHistory(w: Winner): AwardEntry[] {
  const seed = hash(w.slug);
  const count = 4 + (seed % 4); // 4 to 7 entries
  const out: AwardEntry[] = [];
  for (let i = 0; i < count; i++) {
    const year = CURRENT_EDITION - i;
    const r = (seed >> (i * 3)) & 0xff;
    let tier: AwardEntry["tier"];
    if (i === count - 1 && r % 5 === 0) tier = "Best in Class";
    else if (w.medal === "gold") tier = r % 4 === 0 ? "Silver" : "Gold";
    else if (w.medal === "silver") tier = r % 3 === 0 ? "Gold" : "Silver";
    else tier = "Silver";
    out.push({ year, tier });
  }
  return out;
}

const FIRST_YEAR = 2017;

export interface ConsistencyEntry {
  year: number;
  filled: boolean;
}

export function buildConsistency(w: Winner): { years: ConsistencyEntry[]; filledCount: number } {
  const history = new Set(buildAwardHistory(w).map((a) => a.year));
  const years: ConsistencyEntry[] = [];
  for (let y = FIRST_YEAR; y <= CURRENT_EDITION; y++) {
    years.push({ year: y, filled: history.has(y) });
  }
  return { years, filledCount: years.filter((y) => y.filled).length };
}

export function classificationChips(w: Winner): string[] {
  const variety = w.cultivar ? w.cultivar : "Blend";
  const monoOrBlend = w.cultivar && w.cultivar !== "Blend" ? "Monovarietal" : "Blend";
  return [w.country, variety, w.intensity, monoOrBlend];
}

export function buildHeroDescription(w: Winner): string {
  const profile =
    w.intensity === "Robust"
      ? "a forward, peppery profile with a long, warming finish"
      : w.intensity === "Delicate"
        ? "a soft, balanced profile with gentle bitterness and a clean finish"
        : "a balanced profile with measured bitterness and steady pungency";
  const variety = w.cultivar
    ? w.cultivar === "Blend"
      ? "a thoughtfully composed blend"
      : `the ${w.cultivar} cultivar`
    : "a careful selection of estate fruit";
  const organic = w.organic ? " The fruit is grown to certified organic standards." : "";
  return `${w.name} is ${variety} from ${w.country}, presenting ${profile}.${organic}`;
}

export function buildProducerBlurb(w: Winner): string {
  const scope = w.organic
    ? "manages every step of the supply chain under certified organic practice"
    : "oversees the full supply chain from grove to bottle";
  return `${w.producer} ${scope}, with fruit harvested at optimal ripeness and pressed within hours to preserve aromatic intensity.`;
}
