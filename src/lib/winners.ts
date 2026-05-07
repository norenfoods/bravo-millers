import type { Winner } from "@/types/winner";

// Real winner data captured from bestoliveoils.org/search (2026 edition snapshot).
// Image IDs map to public/images/bottles/<id>.png — sourced from the original CDN.
export const WINNERS_2026: Winner[] = [
  { id: "10303", slug: "ptora-midnight-coratina", name: "Ptora Midnight Coratina", producer: "Tamir Farm", country: "Israel", cultivar: "Coratina", intensity: "Medium", organic: false, rank: 70, medal: "silver", imageId: "10303" },
  { id: "10130", slug: "nai-3-3-coratina", name: "Nai 3.3 Coratina", producer: "OPG Nives Morovic", country: "Croatia", cultivar: "Coratina", intensity: "Medium", organic: true, rank: 66, medal: "gold", imageId: "10130" },
  { id: "10379", slug: "jordan-olivenoel-bio", name: "Jordan Olivenoel Bio", producer: "Jordan Olivenoel", country: "Greece", cultivar: "Blend", intensity: "Medium", organic: true, rank: 98, medal: "silver", imageId: "10379" },
  { id: "10202", slug: "goya-unico", name: "Goya Único", producer: "Goya En España", country: "Spain", cultivar: "Blend", intensity: "Medium", organic: false, rank: 20, medal: "gold", imageId: "10202" },
  { id: "10524", slug: "guglielmi-dal-1954-coratina", name: "Guglielmi dal 1954 Coratina", producer: "Guglielmi dal 1954", country: "Italy", cultivar: "Coratina", intensity: "Medium", organic: false, rank: 92, medal: "gold", imageId: "10524" },
  { id: "10341", slug: "8k-organic-athinoelia", name: "8K Organic Athinoelia", producer: "8K Greek Olive Oils", country: "Greece", cultivar: "Athinolia", intensity: "Medium", organic: true, rank: 74, medal: "gold", imageId: "10341" },
  { id: "10125", slug: "queen-creek-olive-mill-robust", name: "Queen Creek Olive Mill Robust", producer: "Queen Creek Olive Mill", country: "United States", cultivar: "Koroneiki", intensity: "Medium", organic: false, rank: 66, medal: "silver", imageId: "10125" },
  { id: "10017", slug: "avistria-istrian-essence", name: "Avistria Istrian Essence", producer: "Avistria d.o.o.", country: "Croatia", cultivar: "Leccino", intensity: "Medium", organic: false, rank: 8, medal: "gold", imageId: "10017" },
  { id: "10473", slug: "ora", name: "Ora", producer: "Arsenio", country: "Italy", intensity: "Medium", organic: true, rank: 82, medal: "gold", imageId: "10473" },
  { id: "10327", slug: "fayton-ayvalik", name: "Fayton Ayvalık", producer: "Fayton Olive Oil", country: "Turkey", cultivar: "Ayvalik", intensity: "Delicate", organic: false, rank: 128, medal: "silver", imageId: "10327" },
  { id: "10381", slug: "esencija-selekcija-blago", name: "Esencija Selekcija Blago", producer: "Esencija Olive Oil", country: "Croatia", cultivar: "Frantoio", intensity: "Medium", organic: true, rank: 128, medal: "silver", imageId: "10381" },
  { id: "10586", slug: "cabeco-das-nogueiras-picual", name: "Cabeço das Nogueiras Picual Veronica Foods", producer: "Sociedade Agrícola Ouro Vegetal", country: "Portugal", cultivar: "Picual", intensity: "Medium", organic: false, rank: 10, medal: "gold", imageId: "10586" },
  { id: "10527", slug: "baio", name: "Baio", producer: "Monte Vale de Baio", country: "Portugal", cultivar: "Galega", intensity: "Delicate", organic: true, rank: 94, medal: "silver", imageId: "10527" },
  { id: "10222", slug: "ulje-ramljak", name: "Ul.je Ramljak", producer: "OPG Ramljak", country: "Bosnia and Herzegovina", intensity: "Medium", organic: false, rank: 97, medal: "silver", imageId: "10222" },
  { id: "10540", slug: "dolina-maslina-blend", name: "Dolina Maslina Blend", producer: "Dolina Maslina", country: "Croatia", cultivar: "Coratina", intensity: "Medium", organic: true, rank: 91, medal: "gold", imageId: "10540" },
  { id: "10025", slug: "gaea-planet", name: "Gaea Planet", producer: "Gaea Products SMSA", country: "Greece", cultivar: "Athinolia", intensity: "Delicate", organic: true, rank: 126, medal: "silver", imageId: "10025" },
  { id: "10414", slug: "cervar-bianchera", name: "Červar Bianchera", producer: "ZO Červar", country: "Croatia", cultivar: "Bianchera", intensity: "Medium", organic: true, rank: 66, medal: "gold", imageId: "10414" },
  { id: "9853", slug: "damya-robust", name: "Damya Robust", producer: "Massiva", country: "Tunisia", cultivar: "Chetoui", intensity: "Robust", organic: true, rank: 57, medal: "gold", imageId: "9853" },
  { id: "10161", slug: "apollo-mistral", name: "Apollo Mistral", producer: "Apollo Olive Oil", country: "United States", cultivar: "Blend", intensity: "Delicate", organic: true, rank: 25, medal: "gold", imageId: "10161" },
  { id: "10135", slug: "janiroc-koroneiki", name: "Janiroc Koroneiki", producer: "Pons", country: "Spain", cultivar: "Koroneiki", intensity: "Medium", organic: true, rank: 80, medal: "gold", imageId: "10135" },
  { id: "10596", slug: "hacienda-vadolivo", name: "Hacienda Vadolivo", producer: "Oliviers & Co", country: "Spain", cultivar: "Picual", intensity: "Medium", organic: false, rank: 5, medal: "gold", imageId: "10596" },
  { id: "10659", slug: "ravla-organik", name: "Ravla Organik", producer: "Ravla Tarım Gıda Sanayi", country: "Turkey", cultivar: "Memecik", intensity: "Medium", organic: true, rank: 127, medal: "gold", imageId: "10659" },
  { id: "10144", slug: "cobram-estate-picual", name: "Cobram Estate Picual", producer: "Cobram Estate (US)", country: "United States", cultivar: "Picual", intensity: "Medium", organic: false, rank: 15, medal: "silver", imageId: "10144" },
  { id: "10801", slug: "kosterina", name: "Kosterina", producer: "Kosterina", country: "Greece", cultivar: "Koroneiki", intensity: "Medium", organic: true, rank: 94, medal: "silver", imageId: "10801" },
  { id: "10185", slug: "morellana-picual", name: "Morellana Picual", producer: "Sucesores de Hermanos López", country: "Spain", cultivar: "Picual", intensity: "Medium", organic: true, rank: 19, medal: "gold", imageId: "10185" },
  { id: "10646", slug: "donika-premium-organic", name: "Donika Premium Organic", producer: "Donika Olive Oil", country: "Albania", cultivar: "Kalinjot", intensity: "Medium", organic: true, rank: 83, medal: "gold", imageId: "10646" },
  { id: "9787", slug: "bioorto-peranzana", name: "BioOrto Peranzana", producer: "BioOrto", country: "Italy", cultivar: "Peranzana", intensity: "Medium", organic: true, rank: 69, medal: "silver", imageId: "9787" },
  { id: "10622", slug: "domaine-de-panery-picholine", name: "Domaine de Panéry Picholine", producer: "Domaine de Panéry", country: "France", cultivar: "Picholine", intensity: "Medium", organic: true, rank: 125, medal: "silver", imageId: "10622" },
  { id: "10230", slug: "olio-presto", name: "Olio Presto", producer: "Brezza Tirrena Italia", country: "Italy", cultivar: "Itrana", intensity: "Medium", organic: true, rank: 77, medal: "gold", imageId: "10230" },
  { id: "10542", slug: "zaitique-carthage", name: "Zaitique Carthage", producer: "Heritage Olive Company", country: "Tunisia", cultivar: "Chetoui", intensity: "Medium", organic: true, rank: 126, medal: "silver", imageId: "10542" },
  { id: "9875", slug: "durant-mission", name: "Durant Olive Mill Mission", producer: "Durant Olive Mill", country: "United States", cultivar: "Mission", intensity: "Medium", organic: false, rank: 7, medal: "silver", imageId: "9875" },
  { id: "10071", slug: "carroccia-itrana", name: "Carroccia Campodimele Itrana", producer: "Azienda Agricola Carroccia", country: "Italy", cultivar: "Itrana", intensity: "Medium", organic: true, rank: 77, medal: "silver", imageId: "10071" },
  { id: "10384", slug: "in-memoriam-olival", name: "In Memoriam Olival do Pomar Organic", producer: "Casa de Santo Amaro", country: "Portugal", cultivar: "Madural", intensity: "Medium", organic: true, rank: 13, medal: "silver", imageId: "10384" },
  { id: "9867", slug: "licinius-aurum", name: "Licinius Aurum", producer: "Licinius", country: "Italy", cultivar: "Frantoio", intensity: "Medium", organic: false, rank: 127, medal: "gold", imageId: "9867" },
  { id: "10041", slug: "el-corral-de-saus", name: "El Corral de Saus", producer: "Sapega International", country: "Spain", intensity: "Medium", organic: true, rank: 125, medal: "gold", imageId: "10041" },
  { id: "10407", slug: "trebocconi", name: "Trebocconi", producer: "OPG Šime Stipaničev", country: "Croatia", cultivar: "Oblica", intensity: "Medium", organic: false, rank: 81, medal: "silver", imageId: "10407" },
  { id: "10188", slug: "il-fiorello-french-blend", name: "French Blend", producer: "IL Fiorello", country: "United States", cultivar: "Blend", intensity: "Robust", organic: true, rank: 19, medal: "gold", imageId: "10188" },
  { id: "9880", slug: "ol-bol", name: "Ol Bol", producer: "OPG Jasmin Marinković", country: "Croatia", cultivar: "Coratina", intensity: "Medium", organic: false, rank: 96, medal: "silver", imageId: "9880" },
  { id: "10528", slug: "vukoje-selekcija", name: "Vukoje Selekcija", producer: "Podrumi Vukoje 1982", country: "Bosnia and Herzegovina", intensity: "Medium", organic: true, rank: 70, medal: "gold", imageId: "10528" },
];

// 2025 list re-uses the same images / data (for the lazy-loaded preview row).
export const WINNERS_2025: Winner[] = WINNERS_2026.slice(0, 12).map((w) => ({
  ...w,
  id: `2025-${w.id}`,
  rank: Math.max(1, w.rank - 5),
}));

export const TOTAL_WINNERS_2026 = 721;
