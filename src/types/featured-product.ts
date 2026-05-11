export type ProductIntensity =
  | "Delicate"
  | "Light"
  | "Light-Medium"
  | "Medium"
  | "Medium-Robust"
  | "Robust"
  | "Extreme"
  | "Traditional";
export type ProductCategory = "olive-oil" | "balsamic";

export interface ProductPricing {
  originalCny?: number;
  saleCny: number;
  discountPct?: number;
}

export interface FeaturedProduct {
  slug: string;
  name: string;
  producer: string;
  producerSlug: string;
  region: string;
  country: string;
  cultivar: string;
  intensity: ProductIntensity;
  category: ProductCategory;
  organic: boolean;
  signatureAward: string;
  awardYear: number;
  imagePath?: string;
  tastingNotes: string[];
  pairings: string[];
  description: string;
  descriptionZh?: string;
  producerBlurb: string;
  producerBlurbZh?: string;
  pricing?: ProductPricing;
  statusBadge?: string;
  harvestBadge?: string;
  freshnessTag?: {
    bestBefore: string;
    storage: string[];
    guarantee?: string;
  };
  awards?: string[];
  cardAwards?: string[];
  tags?: string[];
  subtitle?: string;
  tastingProse?: string;
  classificationOverride?: { label: string; value: string }[];
  cardImageScale?: number;
  cardImageOriginY?: string;
}
