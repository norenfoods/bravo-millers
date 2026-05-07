export type Medal = "gold" | "silver" | "bronze";

export interface Winner {
  id: string;
  slug: string;
  name: string;
  producer: string;
  country: string;
  cultivar?: string;
  intensity: "Delicate" | "Medium" | "Robust";
  organic: boolean;
  rank: number;
  medal: Medal;
  imageId: string;
}
