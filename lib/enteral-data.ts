// HCPCS Enteral Nutrition Code Definitions and Product Classification Data
// Sources: CMS HCPCS Code Set, eMedNY/PDAC Product Classification List, manufacturer data

export interface HcpcsCode {
  code: string
  shortDescription: string
  longDescription: string
}

export type PackagingType = "can" | "carton" | "packet" | "bottle" | "pouch" | "box" | "tub"

export interface PackagingOption {
  type: "can" | "carton" | "packet" | "bottle" | "pouch" | "box" | "tub"
  label: string // e.g., "8 fl oz can", "32 fl oz carton", "7g packet"
  mlPerUnit?: number // mL per unit (for liquid packaging)
  gramsPerUnit?: number // grams per unit (for powder packaging)
  kcalPerUnit?: number // total kcal per unit (optional, for convenience)
}

export interface EnteralProduct {
  name: string
  manufacturer: string
  hcpcsCode: string
  kcalPerMl: number | null // kcal per mL of liquid (null = user must enter manually)
  kcalPerGram: number | null // kcal per gram of powder (for powder-based formulas)
  isPowder?: boolean // true for powder formulas where kcal/g is the primary density
  packaging?: PackagingOption[] // available packaging options
}

// ─── HCPCS Code Definitions ────────────────────────────────────────────────────

export const HCPCS_CODES: HcpcsCode[] = [
  {
    code: "B4149",
    shortDescription: "Blenderized food via tube",
    longDescription:
      "Enteral formula, manufactured blenderized natural foods with intact nutrients, includes proteins, fats, carbohydrates, vitamins and minerals, may include fiber, administered through an enteral feeding tube, 100 calories = 1 unit",
  },
  {
    code: "B4150",
    shortDescription: "Complete formula, intact nutrients",
    longDescription:
      "Enteral formula, nutritionally complete with intact nutrients, includes proteins, fats, carbohydrates, vitamins and minerals, may include fiber, administered through an enteral feeding tube, 100 calories = 1 unit",
  },
  {
    code: "B4152",
    shortDescription: "Calorically dense (>=1.5 kcal/mL)",
    longDescription:
      "Enteral formula, nutritionally complete, calorically dense (equal to or greater than 1.5 kcal/mL) with intact nutrients, includes proteins, fats, carbohydrates, vitamins and minerals, may include fiber, administered through an enteral feeding tube, 100 calories = 1 unit",
  },
  {
    code: "B4153",
    shortDescription: "Hydrolyzed proteins (semi-elemental)",
    longDescription:
      "Enteral formula, nutritionally complete, hydrolyzed proteins (amino acids and peptide chain), includes fats, carbohydrates, vitamins and minerals, may include fiber, administered through an enteral feeding tube, 100 calories = 1 unit",
  },
  {
    code: "B4154",
    shortDescription: "Special metabolic needs",
    longDescription:
      "Enteral formula, nutritionally complete, for special metabolic needs, excludes inherited disease of metabolism, includes altered composition of proteins, fats, carbohydrates, vitamins and/or minerals, may include fiber, administered through an enteral feeding tube, 100 calories = 1 unit",
  },
  {
    code: "B4155",
    shortDescription: "Modular nutrients (incomplete)",
    longDescription:
      "Enteral formula, nutritionally incomplete/modular nutrients, includes specific nutrients, carbohydrates (e.g., glucose polymers), proteins/amino acids (e.g., glutamine, arginine), fat (e.g., medium chain triglycerides) or combination, administered through an enteral feeding tube, 100 calories = 1 unit",
  },
  {
    code: "B4157",
    shortDescription: "Inherited disease of metabolism",
    longDescription:
      "Enteral formula, nutritionally complete, for special metabolic needs for inherited disease of metabolism, includes proteins, fats, carbohydrates, vitamins and minerals, may include fiber, administered through an enteral feeding tube, 100 calories = 1 unit",
  },
  {
    code: "B4158",
    shortDescription: "Pediatric, intact nutrients",
    longDescription:
      "Enteral formula, for pediatrics, nutritionally complete with intact nutrients, includes proteins, fats, carbohydrates, vitamins and minerals, may include fiber and/or iron, administered through an enteral feeding tube, 100 calories = 1 unit",
  },
  {
    code: "B4159",
    shortDescription: "Pediatric, soy-based",
    longDescription:
      "Enteral formula, for pediatrics, nutritionally complete soy based with intact nutrients, includes proteins, fats, carbohydrates, vitamins and minerals, may include fiber and/or iron, administered through an enteral feeding tube, 100 calories = 1 unit",
  },
  {
    code: "B4160",
    shortDescription: "Pediatric, calorically dense (>=0.7 kcal/mL)",
    longDescription:
      "Enteral formula, for pediatrics, nutritionally complete calorically dense (equal to or greater than 0.7 kcal/mL) with intact nutrients, includes proteins, fats, carbohydrates, vitamins and minerals, may include fiber, administered through an enteral feeding tube, 100 calories = 1 unit",
  },
  {
    code: "B4161",
    shortDescription: "Pediatric, hydrolyzed proteins",
    longDescription:
      "Enteral formula, for pediatrics, hydrolyzed/amino acids and peptide chain proteins, includes fats, carbohydrates, vitamins and minerals, may include fiber, administered through an enteral feeding tube, 100 calories = 1 unit",
  },
  {
    code: "B4162",
    shortDescription: "Pediatric, inherited disease of metabolism",
    longDescription:
      "Enteral formula, for pediatrics, special metabolic needs for inherited disease of metabolism, includes proteins, fats, carbohydrates, vitamins and minerals, may include fiber, administered through an enteral feeding tube, 100 calories = 1 unit",
  },
]

// ─── Product Classification Database ───────────────────────────────────────────
// Mapped from the PDAC/eMedNY Enteral Product Classification List
// kcalPerMl sourced from manufacturer data, Texas HHS comparison chart
// kcalPerGram sourced from manufacturer nutrition labels for powder products

export const ENTERAL_PRODUCTS: EnteralProduct[] = [
  // ══════════════════════════════════════════════════════════════════════════════
  // B4149: Blenderized food via tube
  // ══════════════════════════════════════════════════════════════════════════════
  { name: "Compleat Organic Blends (Chicken Garden)", manufacturer: "Nestle", hcpcsCode: "B4149", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "pouch", label: "10.1 fl oz pouch", mlPerUnit: 300, kcalPerUnit: 300 }] },
  { name: "Compleat Organic Blends (Plant-Based)", manufacturer: "Nestle", hcpcsCode: "B4149", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "pouch", label: "10.1 fl oz pouch", mlPerUnit: 300, kcalPerUnit: 300 }] },
  { name: "Compleat Organic Blends (Pediatric Chicken)", manufacturer: "Nestle", hcpcsCode: "B4149", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "pouch", label: "10.1 fl oz pouch", mlPerUnit: 300, kcalPerUnit: 300 }] },
  { name: "Compleat Organic Blends (Pediatric Plant)", manufacturer: "Nestle", hcpcsCode: "B4149", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "pouch", label: "10.1 fl oz pouch", mlPerUnit: 300, kcalPerUnit: 300 }] },
  { name: "Kate Farms Organic Standard 1.0 (Vanilla)", manufacturer: "Kate Farms", hcpcsCode: "B4149", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "carton", label: "11 fl oz carton", mlPerUnit: 325, kcalPerUnit: 325 }] },
  { name: "Kate Farms Organic Standard 1.0 (Chocolate)", manufacturer: "Kate Farms", hcpcsCode: "B4149", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "carton", label: "11 fl oz carton", mlPerUnit: 325, kcalPerUnit: 325 }] },
  { name: "Liquid Hope", manufacturer: "Functional Formularies", hcpcsCode: "B4149", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "pouch", label: "12 fl oz pouch", mlPerUnit: 355, kcalPerUnit: 355 }] },
  { name: "Liquid Hope Peptide", manufacturer: "Functional Formularies", hcpcsCode: "B4149", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "pouch", label: "12 fl oz pouch", mlPerUnit: 355, kcalPerUnit: 355 }] },
  { name: "Nourish", manufacturer: "Functional Formularies", hcpcsCode: "B4149", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "pouch", label: "12 fl oz pouch", mlPerUnit: 355, kcalPerUnit: 355 }] },
  { name: "Nourish Pediatric", manufacturer: "Functional Formularies", hcpcsCode: "B4149", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "pouch", label: "12 fl oz pouch", mlPerUnit: 355, kcalPerUnit: 355 }] },
  { name: "Real Food Blends (Salmon/Oats/Squash)", manufacturer: "Real Food Blends", hcpcsCode: "B4149", kcalPerMl: 0.7, kcalPerGram: null, packaging: [{ type: "pouch", label: "9.4 fl oz pouch", mlPerUnit: 278, kcalPerUnit: 195 }] },
  { name: "Real Food Blends (Beef/Potatoes/Spinach)", manufacturer: "Real Food Blends", hcpcsCode: "B4149", kcalPerMl: 0.7, kcalPerGram: null, packaging: [{ type: "pouch", label: "9.4 fl oz pouch", mlPerUnit: 278, kcalPerUnit: 195 }] },
  { name: "Real Food Blends (Eggs/Apples/Oats)", manufacturer: "Real Food Blends", hcpcsCode: "B4149", kcalPerMl: 0.7, kcalPerGram: null, packaging: [{ type: "pouch", label: "9.4 fl oz pouch", mlPerUnit: 278, kcalPerUnit: 195 }] },
  { name: "Real Food Blends (Turkey/Sweet Potatoes/Peaches)", manufacturer: "Real Food Blends", hcpcsCode: "B4149", kcalPerMl: 0.7, kcalPerGram: null, packaging: [{ type: "pouch", label: "9.4 fl oz pouch", mlPerUnit: 278, kcalPerUnit: 195 }] },
  { name: "Real Food Blends (Orange Chicken/Brown Rice/Carrots)", manufacturer: "Real Food Blends", hcpcsCode: "B4149", kcalPerMl: 0.7, kcalPerGram: null, packaging: [{ type: "pouch", label: "9.4 fl oz pouch", mlPerUnit: 278, kcalPerUnit: 195 }] },
  { name: "Real Food Blends (Quinoa/Kale/Hemp)", manufacturer: "Real Food Blends", hcpcsCode: "B4149", kcalPerMl: 0.7, kcalPerGram: null, packaging: [{ type: "pouch", label: "9.4 fl oz pouch", mlPerUnit: 278, kcalPerUnit: 195 }] },

  // ══════════════════════════════════════════════════════════════════════════════
  // B4150: Nutritionally complete, intact nutrients
  // ══════════════════════════════════════════════════════════════════════════════
  // Abbott
  { name: "Osmolite 1 Cal", manufacturer: "Abbott", hcpcsCode: "B4150", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "bottle", label: "8 fl oz bottle", mlPerUnit: 237, kcalPerUnit: 237 }, { type: "carton", label: "1000 mL carton", mlPerUnit: 1000, kcalPerUnit: 1000 }, { type: "carton", label: "1500 mL carton", mlPerUnit: 1500, kcalPerUnit: 1500 }] },
  { name: "Osmolite 1.2 Cal", manufacturer: "Abbott", hcpcsCode: "B4150", kcalPerMl: 1.2, kcalPerGram: null, packaging: [{ type: "bottle", label: "8 fl oz bottle", mlPerUnit: 237, kcalPerUnit: 284 }, { type: "carton", label: "1000 mL carton", mlPerUnit: 1000, kcalPerUnit: 1200 }, { type: "carton", label: "1500 mL carton", mlPerUnit: 1500, kcalPerUnit: 1800 }] },
  { name: "Jevity 1 Cal", manufacturer: "Abbott", hcpcsCode: "B4150", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "bottle", label: "8 fl oz bottle", mlPerUnit: 237, kcalPerUnit: 237 }, { type: "carton", label: "1000 mL carton", mlPerUnit: 1000, kcalPerUnit: 1000 }, { type: "carton", label: "1500 mL carton", mlPerUnit: 1500, kcalPerUnit: 1500 }] },
  { name: "Jevity 1.2 Cal", manufacturer: "Abbott", hcpcsCode: "B4150", kcalPerMl: 1.2, kcalPerGram: null, packaging: [{ type: "bottle", label: "8 fl oz bottle", mlPerUnit: 237, kcalPerUnit: 284 }, { type: "carton", label: "1000 mL carton", mlPerUnit: 1000, kcalPerUnit: 1200 }, { type: "carton", label: "1500 mL carton", mlPerUnit: 1500, kcalPerUnit: 1800 }] },
  { name: "Promote", manufacturer: "Abbott", hcpcsCode: "B4150", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "bottle", label: "8 fl oz bottle", mlPerUnit: 237, kcalPerUnit: 237 }, { type: "carton", label: "1000 mL carton", mlPerUnit: 1000, kcalPerUnit: 1000 }] },
  { name: "Promote with Fiber", manufacturer: "Abbott", hcpcsCode: "B4150", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "bottle", label: "8 fl oz bottle", mlPerUnit: 237, kcalPerUnit: 237 }, { type: "carton", label: "1000 mL carton", mlPerUnit: 1000, kcalPerUnit: 1000 }] },
  { name: "Ensure", manufacturer: "Abbott", hcpcsCode: "B4150", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "bottle", label: "8 fl oz bottle", mlPerUnit: 237, kcalPerUnit: 237 }, { type: "carton", label: "1000 mL carton", mlPerUnit: 1000, kcalPerUnit: 1000 }] },
  { name: "Ensure with Fiber", manufacturer: "Abbott", hcpcsCode: "B4150", kcalPerMl: 1.1, kcalPerGram: null, packaging: [{ type: "bottle", label: "8 fl oz bottle", mlPerUnit: 237, kcalPerUnit: 261 }, { type: "can", label: "8 fl oz can", mlPerUnit: 237, kcalPerUnit: 261 }] },
  { name: "Ensure High Protein", manufacturer: "Abbott", hcpcsCode: "B4150", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "bottle", label: "8 fl oz bottle", mlPerUnit: 237, kcalPerUnit: 237 }] },
  { name: "Ensure Original", manufacturer: "Abbott", hcpcsCode: "B4150", kcalPerMl: 1.06, kcalPerGram: null, packaging: [{ type: "bottle", label: "8 fl oz bottle", mlPerUnit: 237, kcalPerUnit: 250 }] },
  { name: "Ensure Clear", manufacturer: "Abbott", hcpcsCode: "B4150", kcalPerMl: 0.9, kcalPerGram: null, packaging: [{ type: "bottle", label: "10 fl oz bottle", mlPerUnit: 296, kcalPerUnit: 266 }] },
  { name: "Ensure Max Protein", manufacturer: "Abbott", hcpcsCode: "B4150", kcalPerMl: 0.68, kcalPerGram: null, packaging: [{ type: "bottle", label: "11 fl oz bottle", mlPerUnit: 325, kcalPerUnit: 150 }] },
  // Nestle
  { name: "Fibersource HN", manufacturer: "Nestle", hcpcsCode: "B4150", kcalPerMl: 1.2, kcalPerGram: null, packaging: [{ type: "carton", label: "250 mL carton", mlPerUnit: 250, kcalPerUnit: 300 }, { type: "carton", label: "1000 mL carton", mlPerUnit: 1000, kcalPerUnit: 1200 }, { type: "carton", label: "1500 mL carton", mlPerUnit: 1500, kcalPerUnit: 1800 }] },
  { name: "Isosource HN", manufacturer: "Nestle", hcpcsCode: "B4150", kcalPerMl: 1.2, kcalPerGram: null, packaging: [{ type: "carton", label: "250 mL carton", mlPerUnit: 250, kcalPerUnit: 300 }, { type: "carton", label: "1000 mL carton", mlPerUnit: 1000, kcalPerUnit: 1200 }, { type: "carton", label: "1500 mL carton", mlPerUnit: 1500, kcalPerUnit: 1800 }] },
  { name: "Nutren 1.0", manufacturer: "Nestle", hcpcsCode: "B4150", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "carton", label: "250 mL carton", mlPerUnit: 250, kcalPerUnit: 250 }, { type: "carton", label: "1000 mL carton", mlPerUnit: 1000, kcalPerUnit: 1000 }, { type: "carton", label: "1500 mL carton", mlPerUnit: 1500, kcalPerUnit: 1500 }] },
  { name: "Nutren 1.0 Fiber", manufacturer: "Nestle", hcpcsCode: "B4150", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "carton", label: "250 mL carton", mlPerUnit: 250, kcalPerUnit: 250 }, { type: "carton", label: "1000 mL carton", mlPerUnit: 1000, kcalPerUnit: 1000 }, { type: "carton", label: "1500 mL carton", mlPerUnit: 1500, kcalPerUnit: 1500 }] },
  { name: "Compleat Standard 1.0", manufacturer: "Nestle", hcpcsCode: "B4150", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "carton", label: "250 mL carton", mlPerUnit: 250, kcalPerUnit: 250 }, { type: "carton", label: "1000 mL carton", mlPerUnit: 1000, kcalPerUnit: 1000 }] },
  { name: "Compleat Standard 1.4", manufacturer: "Nestle", hcpcsCode: "B4150", kcalPerMl: 1.4, kcalPerGram: null, packaging: [{ type: "carton", label: "250 mL carton", mlPerUnit: 250, kcalPerUnit: 350 }, { type: "carton", label: "1000 mL carton", mlPerUnit: 1000, kcalPerUnit: 1400 }] },
  { name: "Impact (with Fiber)", manufacturer: "Nestle", hcpcsCode: "B4150", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "carton", label: "250 mL carton", mlPerUnit: 250, kcalPerUnit: 250 }, { type: "carton", label: "1000 mL carton", mlPerUnit: 1000, kcalPerUnit: 1000 }] },
  { name: "Impact 1.5", manufacturer: "Nestle", hcpcsCode: "B4150", kcalPerMl: 1.5, kcalPerGram: null, packaging: [{ type: "carton", label: "250 mL carton", mlPerUnit: 250, kcalPerUnit: 375 }, { type: "carton", label: "1000 mL carton", mlPerUnit: 1000, kcalPerUnit: 1500 }] },
  { name: "Boost", manufacturer: "Nestle", hcpcsCode: "B4150", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "bottle", label: "8 fl oz bottle", mlPerUnit: 237, kcalPerUnit: 237 }] },
  { name: "Boost High Protein", manufacturer: "Nestle", hcpcsCode: "B4150", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "bottle", label: "8 fl oz bottle", mlPerUnit: 237, kcalPerUnit: 240 }] },
  { name: "Boost Original", manufacturer: "Nestle", hcpcsCode: "B4150", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "bottle", label: "8 fl oz bottle", mlPerUnit: 237, kcalPerUnit: 240 }] },
  { name: "Boost Glucose Control", manufacturer: "Nestle", hcpcsCode: "B4150", kcalPerMl: 0.95, kcalPerGram: null, packaging: [{ type: "bottle", label: "8 fl oz bottle", mlPerUnit: 237, kcalPerUnit: 190 }] },
  { name: "Resource 2.0", manufacturer: "Nestle", hcpcsCode: "B4150", kcalPerMl: 2.0, kcalPerGram: null, packaging: [{ type: "bottle", label: "8 fl oz bottle", mlPerUnit: 237, kcalPerUnit: 474 }] },
  // Kate Farms
  { name: "Kate Farms Standard 1.0", manufacturer: "Kate Farms", hcpcsCode: "B4150", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "carton", label: "11 fl oz carton", mlPerUnit: 325, kcalPerUnit: 325 }] },
  { name: "Kate Farms Standard 1.4", manufacturer: "Kate Farms", hcpcsCode: "B4150", kcalPerMl: 1.4, kcalPerGram: null, packaging: [{ type: "carton", label: "11 fl oz carton", mlPerUnit: 325, kcalPerUnit: 455 }] },
  // Mead Johnson
  { name: "Sustacal", manufacturer: "Mead Johnson", hcpcsCode: "B4150", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "bottle", label: "8 fl oz bottle", mlPerUnit: 237, kcalPerUnit: 237 }] },
  { name: "Sustacal with Fiber", manufacturer: "Mead Johnson", hcpcsCode: "B4150", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "bottle", label: "8 fl oz bottle", mlPerUnit: 237, kcalPerUnit: 237 }] },

  // ══════════════════════════════════════════════════════════════════════════════
  // B4152: Calorically dense (>=1.5 kcal/mL)
  // ══════════════════════════════════════════════════════════════════════════════
  // Abbott
  { name: "Osmolite 1.5 Cal", manufacturer: "Abbott", hcpcsCode: "B4152", kcalPerMl: 1.5, kcalPerGram: null, packaging: [{ type: "bottle", label: "8 fl oz bottle", mlPerUnit: 237, kcalPerUnit: 355 }, { type: "carton", label: "1000 mL carton", mlPerUnit: 1000, kcalPerUnit: 1500 }, { type: "carton", label: "1500 mL carton", mlPerUnit: 1500, kcalPerUnit: 2250 }] },
  { name: "Jevity 1.5 Cal", manufacturer: "Abbott", hcpcsCode: "B4152", kcalPerMl: 1.5, kcalPerGram: null, packaging: [{ type: "bottle", label: "8 fl oz bottle", mlPerUnit: 237, kcalPerUnit: 355 }, { type: "carton", label: "1000 mL carton", mlPerUnit: 1000, kcalPerUnit: 1500 }, { type: "carton", label: "1500 mL carton", mlPerUnit: 1500, kcalPerUnit: 2250 }] },
  { name: "Ensure Plus", manufacturer: "Abbott", hcpcsCode: "B4152", kcalPerMl: 1.5, kcalPerGram: null, packaging: [{ type: "bottle", label: "8 fl oz bottle", mlPerUnit: 237, kcalPerUnit: 350 }] },
  { name: "Ensure Plus Calories", manufacturer: "Abbott", hcpcsCode: "B4152", kcalPerMl: 1.5, kcalPerGram: null, packaging: [{ type: "bottle", label: "8 fl oz bottle", mlPerUnit: 237, kcalPerUnit: 350 }] },
  { name: "Ensure Enlive", manufacturer: "Abbott", hcpcsCode: "B4152", kcalPerMl: 1.5, kcalPerGram: null, packaging: [{ type: "bottle", label: "8 fl oz bottle", mlPerUnit: 237, kcalPerUnit: 350 }] },
  { name: "Ensure Compact", manufacturer: "Abbott", hcpcsCode: "B4152", kcalPerMl: 2.2, kcalPerGram: null, packaging: [{ type: "bottle", label: "4 fl oz bottle", mlPerUnit: 118, kcalPerUnit: 220 }] },
  { name: "TwoCal HN", manufacturer: "Abbott", hcpcsCode: "B4152", kcalPerMl: 2.0, kcalPerGram: null, packaging: [{ type: "can", label: "8 fl oz can", mlPerUnit: 237, kcalPerUnit: 474 }, { type: "carton", label: "1000 mL carton", mlPerUnit: 1000, kcalPerUnit: 2000 }] },
  // Nestle
  { name: "Nutren 1.5", manufacturer: "Nestle", hcpcsCode: "B4152", kcalPerMl: 1.5, kcalPerGram: null, packaging: [{ type: "carton", label: "250 mL carton", mlPerUnit: 250, kcalPerUnit: 375 }, { type: "carton", label: "1000 mL carton", mlPerUnit: 1000, kcalPerUnit: 1500 }] },
  { name: "Nutren 2.0", manufacturer: "Nestle", hcpcsCode: "B4152", kcalPerMl: 2.0, kcalPerGram: null, packaging: [{ type: "carton", label: "250 mL carton", mlPerUnit: 250, kcalPerUnit: 500 }, { type: "carton", label: "1000 mL carton", mlPerUnit: 1000, kcalPerUnit: 2000 }] },
  { name: "Boost Plus", manufacturer: "Nestle", hcpcsCode: "B4152", kcalPerMl: 1.5, kcalPerGram: null, packaging: [{ type: "bottle", label: "8 fl oz bottle", mlPerUnit: 237, kcalPerUnit: 360 }] },
  { name: "Boost VHC (Very High Calorie)", manufacturer: "Nestle", hcpcsCode: "B4152", kcalPerMl: 2.3, kcalPerGram: null, packaging: [{ type: "bottle", label: "8 fl oz bottle", mlPerUnit: 237, kcalPerUnit: 530 }] },
  { name: "Boost Max", manufacturer: "Nestle", hcpcsCode: "B4152", kcalPerMl: 1.86, kcalPerGram: null, packaging: [{ type: "bottle", label: "11 fl oz bottle", mlPerUnit: 325, kcalPerUnit: 480 }] },
  { name: "Isosource 1.5 Cal", manufacturer: "Nestle", hcpcsCode: "B4152", kcalPerMl: 1.5, kcalPerGram: null, packaging: [{ type: "carton", label: "250 mL carton", mlPerUnit: 250, kcalPerUnit: 375 }, { type: "carton", label: "1000 mL carton", mlPerUnit: 1000, kcalPerUnit: 1500 }, { type: "carton", label: "1500 mL carton", mlPerUnit: 1500, kcalPerUnit: 2250 }] },
  // Kate Farms
  { name: "Kate Farms Standard 1.4", manufacturer: "Kate Farms", hcpcsCode: "B4152", kcalPerMl: 1.4, kcalPerGram: null, packaging: [{ type: "carton", label: "11 fl oz carton", mlPerUnit: 325, kcalPerUnit: 455 }] },

  // ══════════════════════════════════════════════════════════════════════════════
  // B4153: Hydrolyzed proteins / Semi-elemental / Elemental
  // ══════════════════════════════════════════════════════════════════════════════
  // Abbott - Adult
  { name: "Vital 1.0 Cal", manufacturer: "Abbott", hcpcsCode: "B4153", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "carton", label: "1000 mL carton", mlPerUnit: 1000, kcalPerUnit: 1000 }, { type: "carton", label: "1500 mL carton", mlPerUnit: 1500, kcalPerUnit: 1500 }] },
  { name: "Vital AF 1.2 Cal", manufacturer: "Abbott", hcpcsCode: "B4153", kcalPerMl: 1.2, kcalPerGram: null, packaging: [{ type: "carton", label: "1000 mL carton", mlPerUnit: 1000, kcalPerUnit: 1200 }, { type: "carton", label: "1500 mL carton", mlPerUnit: 1500, kcalPerUnit: 1800 }] },
  { name: "Vital 1.5 Cal", manufacturer: "Abbott", hcpcsCode: "B4153", kcalPerMl: 1.5, kcalPerGram: null, packaging: [{ type: "carton", label: "1000 mL carton", mlPerUnit: 1000, kcalPerUnit: 1500 }, { type: "carton", label: "1500 mL carton", mlPerUnit: 1500, kcalPerUnit: 2250 }] },
  { name: "Vital High Protein", manufacturer: "Abbott", hcpcsCode: "B4153", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "carton", label: "1000 mL carton", mlPerUnit: 1000, kcalPerUnit: 1000 }] },
  // Nestle - Adult
  { name: "Peptamen", manufacturer: "Nestle", hcpcsCode: "B4153", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "carton", label: "250 mL carton", mlPerUnit: 250, kcalPerUnit: 250 }, { type: "carton", label: "1000 mL carton", mlPerUnit: 1000, kcalPerUnit: 1000 }, { type: "carton", label: "1500 mL carton", mlPerUnit: 1500, kcalPerUnit: 1500 }] },
  { name: "Peptamen AF", manufacturer: "Nestle", hcpcsCode: "B4153", kcalPerMl: 1.2, kcalPerGram: null, packaging: [{ type: "carton", label: "250 mL carton", mlPerUnit: 250, kcalPerUnit: 300 }, { type: "carton", label: "1000 mL carton", mlPerUnit: 1000, kcalPerUnit: 1200 }] },
  { name: "Peptamen 1.5", manufacturer: "Nestle", hcpcsCode: "B4153", kcalPerMl: 1.5, kcalPerGram: null, packaging: [{ type: "carton", label: "250 mL carton", mlPerUnit: 250, kcalPerUnit: 375 }, { type: "carton", label: "1000 mL carton", mlPerUnit: 1000, kcalPerUnit: 1500 }] },
  { name: "Peptamen Intense VHP", manufacturer: "Nestle", hcpcsCode: "B4153", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "carton", label: "250 mL carton", mlPerUnit: 250, kcalPerUnit: 250 }, { type: "carton", label: "1000 mL carton", mlPerUnit: 1000, kcalPerUnit: 1000 }] },
  { name: "Peptamen with Prebio1", manufacturer: "Nestle", hcpcsCode: "B4153", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "carton", label: "250 mL carton", mlPerUnit: 250, kcalPerUnit: 250 }, { type: "carton", label: "1000 mL carton", mlPerUnit: 1000, kcalPerUnit: 1000 }] },
  { name: "Peptamen Bariatric", manufacturer: "Nestle", hcpcsCode: "B4153", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "carton", label: "250 mL carton", mlPerUnit: 250, kcalPerUnit: 250 }, { type: "carton", label: "1000 mL carton", mlPerUnit: 1000, kcalPerUnit: 1000 }] },
  { name: "Compleat Peptide 1.5", manufacturer: "Nestle", hcpcsCode: "B4153", kcalPerMl: 1.5, kcalPerGram: null, packaging: [{ type: "carton", label: "250 mL carton", mlPerUnit: 250, kcalPerUnit: 375 }, { type: "carton", label: "1000 mL carton", mlPerUnit: 1000, kcalPerUnit: 1500 }] },
  { name: "Impact Peptide 1.5", manufacturer: "Nestle", hcpcsCode: "B4153", kcalPerMl: 1.5, kcalPerGram: null, packaging: [{ type: "carton", label: "250 mL carton", mlPerUnit: 250, kcalPerUnit: 375 }, { type: "carton", label: "1000 mL carton", mlPerUnit: 1000, kcalPerUnit: 1500 }] },
  { name: "Tolerex", manufacturer: "Nestle", hcpcsCode: "B4153", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "packet", label: "2.82 oz packet (powder)", gramsPerUnit: 80 }] },
  { name: "Vivonex T.E.N.", manufacturer: "Nestle", hcpcsCode: "B4153", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "packet", label: "2.84 oz packet (powder)", gramsPerUnit: 80 }] },
  { name: "Vivonex Plus", manufacturer: "Nestle", hcpcsCode: "B4153", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "packet", label: "2.8 oz packet (powder)", gramsPerUnit: 79 }] },
  { name: "Vivonex RTF", manufacturer: "Nestle", hcpcsCode: "B4153", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "carton", label: "1000 mL carton", mlPerUnit: 1000, kcalPerUnit: 1000 }] },
  { name: "Vivonex Pediatric", manufacturer: "Nestle", hcpcsCode: "B4153", kcalPerMl: 0.8, kcalPerGram: null, packaging: [{ type: "packet", label: "1.7 oz packet (powder)", gramsPerUnit: 48 }] },
  // Kate Farms - Adult
  { name: "Kate Farms Peptide 1.0", manufacturer: "Kate Farms", hcpcsCode: "B4153", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "carton", label: "11 fl oz carton", mlPerUnit: 325, kcalPerUnit: 325 }] },
  { name: "Kate Farms Peptide 1.5", manufacturer: "Kate Farms", hcpcsCode: "B4153", kcalPerMl: 1.5, kcalPerGram: null, packaging: [{ type: "carton", label: "11 fl oz carton", mlPerUnit: 325, kcalPerUnit: 490 }] },
  // Nutricia - Elemental formulas
  { name: "Neocate Splash", manufacturer: "Nutricia", hcpcsCode: "B4153", kcalPerMl: 0.6763, kcalPerGram: null, packaging: [{ type: "carton", label: "8 fl oz carton", mlPerUnit: 237, kcalPerUnit: 159 }] },
  { name: "E028 Splash", manufacturer: "Nutricia", hcpcsCode: "B4153", kcalPerMl: 0.86, kcalPerGram: null, packaging: [{ type: "carton", label: "8.5 fl oz carton", mlPerUnit: 250, kcalPerUnit: 215 }] },
  // Mead Johnson
  { name: "Pregestimil", manufacturer: "Mead Johnson", hcpcsCode: "B4153", kcalPerMl: 0.6763, kcalPerGram: 5.1, isPowder: true, packaging: [{ type: "can", label: "16 oz can (powder)", gramsPerUnit: 454 }] },
  // Ajinomoto Cambrooke
  { name: "Essential Care Jr", manufacturer: "Ajinomoto Cambrooke", hcpcsCode: "B4153", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "carton", label: "8.5 fl oz carton", mlPerUnit: 250, kcalPerUnit: 250 }] },

  // ══════════════════════════════════════════════════════════════════════════════
  // B4154: Special metabolic needs (not inherited)
  // ══════════════════════════════════════════════════════════════════════════════
  // Abbott - Diabetes/Glucose Control
  { name: "Glucerna 1.0 Cal", manufacturer: "Abbott", hcpcsCode: "B4154", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "bottle", label: "8 fl oz bottle", mlPerUnit: 237, kcalPerUnit: 237 }, { type: "carton", label: "1000 mL carton", mlPerUnit: 1000, kcalPerUnit: 1000 }, { type: "carton", label: "1500 mL carton", mlPerUnit: 1500, kcalPerUnit: 1500 }] },
  { name: "Glucerna 1.2 Cal", manufacturer: "Abbott", hcpcsCode: "B4154", kcalPerMl: 1.2, kcalPerGram: null, packaging: [{ type: "carton", label: "1000 mL carton", mlPerUnit: 1000, kcalPerUnit: 1200 }, { type: "carton", label: "1500 mL carton", mlPerUnit: 1500, kcalPerUnit: 1800 }] },
  { name: "Glucerna 1.5 Cal", manufacturer: "Abbott", hcpcsCode: "B4154", kcalPerMl: 1.5, kcalPerGram: null, packaging: [{ type: "carton", label: "1000 mL carton", mlPerUnit: 1000, kcalPerUnit: 1500 }, { type: "carton", label: "1500 mL carton", mlPerUnit: 1500, kcalPerUnit: 2250 }] },
  { name: "Glucerna Hunger Smart", manufacturer: "Abbott", hcpcsCode: "B4154", kcalPerMl: 0.93, kcalPerGram: null, packaging: [{ type: "bottle", label: "10 fl oz bottle", mlPerUnit: 296, kcalPerUnit: 180 }] },
  // Abbott - Renal
  { name: "Nepro with Carb Steady", manufacturer: "Abbott", hcpcsCode: "B4154", kcalPerMl: 1.8, kcalPerGram: null, packaging: [{ type: "bottle", label: "8 fl oz bottle", mlPerUnit: 237, kcalPerUnit: 425 }, { type: "carton", label: "1000 mL carton", mlPerUnit: 1000, kcalPerUnit: 1800 }] },
  { name: "Suplena with Carb Steady", manufacturer: "Abbott", hcpcsCode: "B4154", kcalPerMl: 1.8, kcalPerGram: null, packaging: [{ type: "bottle", label: "8 fl oz bottle", mlPerUnit: 237, kcalPerUnit: 425 }, { type: "carton", label: "1000 mL carton", mlPerUnit: 1000, kcalPerUnit: 1800 }] },
  // Abbott - Pulmonary
  { name: "Pulmocare", manufacturer: "Abbott", hcpcsCode: "B4154", kcalPerMl: 1.5, kcalPerGram: null, packaging: [{ type: "can", label: "8 fl oz can", mlPerUnit: 237, kcalPerUnit: 355 }, { type: "carton", label: "1000 mL carton", mlPerUnit: 1000, kcalPerUnit: 1500 }] },
  { name: "Oxepa", manufacturer: "Abbott", hcpcsCode: "B4154", kcalPerMl: 1.5, kcalPerGram: null, packaging: [{ type: "carton", label: "500 mL carton", mlPerUnit: 500, kcalPerUnit: 750 }, { type: "carton", label: "1000 mL carton", mlPerUnit: 1000, kcalPerUnit: 1500 }] },
  // Abbott - Critical Care/Immune
  { name: "Perative", manufacturer: "Abbott", hcpcsCode: "B4154", kcalPerMl: 1.3, kcalPerGram: null, packaging: [{ type: "carton", label: "1000 mL carton", mlPerUnit: 1000, kcalPerUnit: 1300 }, { type: "carton", label: "1500 mL carton", mlPerUnit: 1500, kcalPerUnit: 1950 }] },
  { name: "Pivot 1.5 Cal", manufacturer: "Abbott", hcpcsCode: "B4154", kcalPerMl: 1.5, kcalPerGram: null, packaging: [{ type: "carton", label: "1000 mL carton", mlPerUnit: 1000, kcalPerUnit: 1500 }, { type: "carton", label: "1500 mL carton", mlPerUnit: 1500, kcalPerUnit: 2250 }] },
  // Nestle - Renal
  { name: "Novasource Renal", manufacturer: "Nestle", hcpcsCode: "B4154", kcalPerMl: 2.0, kcalPerGram: null, packaging: [{ type: "carton", label: "250 mL carton", mlPerUnit: 250, kcalPerUnit: 500 }, { type: "carton", label: "1000 mL carton", mlPerUnit: 1000, kcalPerUnit: 2000 }] },
  { name: "Nutren Renal", manufacturer: "Nestle", hcpcsCode: "B4154", kcalPerMl: 2.0, kcalPerGram: null, packaging: [{ type: "carton", label: "250 mL carton", mlPerUnit: 250, kcalPerUnit: 500 }, { type: "carton", label: "1000 mL carton", mlPerUnit: 1000, kcalPerUnit: 2000 }] },
  { name: "Renalcal", manufacturer: "Nestle", hcpcsCode: "B4154", kcalPerMl: 2.0, kcalPerGram: null, packaging: [{ type: "carton", label: "250 mL carton", mlPerUnit: 250, kcalPerUnit: 500 }] },
  // Nestle - Pulmonary
  { name: "Nutren Pulmonary", manufacturer: "Nestle", hcpcsCode: "B4154", kcalPerMl: 1.5, kcalPerGram: null, packaging: [{ type: "carton", label: "250 mL carton", mlPerUnit: 250, kcalPerUnit: 375 }, { type: "carton", label: "1000 mL carton", mlPerUnit: 1000, kcalPerUnit: 1500 }] },
  { name: "NutriHep", manufacturer: "Nestle", hcpcsCode: "B4154", kcalPerMl: 1.5, kcalPerGram: null, packaging: [{ type: "carton", label: "250 mL carton", mlPerUnit: 250, kcalPerUnit: 375 }] },
  // Nestle - Diabetes/Glucose Control
  { name: "Diabetisource AC", manufacturer: "Nestle", hcpcsCode: "B4154", kcalPerMl: 1.2, kcalPerGram: null, packaging: [{ type: "carton", label: "250 mL carton", mlPerUnit: 250, kcalPerUnit: 300 }, { type: "carton", label: "1000 mL carton", mlPerUnit: 1000, kcalPerUnit: 1200 }, { type: "carton", label: "1500 mL carton", mlPerUnit: 1500, kcalPerUnit: 1800 }] },
  { name: "Glytrol", manufacturer: "Nestle", hcpcsCode: "B4154", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "carton", label: "250 mL carton", mlPerUnit: 250, kcalPerUnit: 250 }, { type: "carton", label: "1000 mL carton", mlPerUnit: 1000, kcalPerUnit: 1000 }, { type: "carton", label: "1500 mL carton", mlPerUnit: 1500, kcalPerUnit: 1500 }] },
  // Nestle - Critical Care/Immune
  { name: "Impact Advanced Recovery", manufacturer: "Nestle", hcpcsCode: "B4154", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "carton", label: "250 mL carton", mlPerUnit: 250, kcalPerUnit: 250 }, { type: "carton", label: "1000 mL carton", mlPerUnit: 1000, kcalPerUnit: 1000 }] },
  { name: "Impact Glutamine", manufacturer: "Nestle", hcpcsCode: "B4154", kcalPerMl: 1.3, kcalPerGram: null, packaging: [{ type: "carton", label: "250 mL carton", mlPerUnit: 250, kcalPerUnit: 325 }, { type: "carton", label: "1000 mL carton", mlPerUnit: 1000, kcalPerUnit: 1300 }] },
  // Kate Farms
  { name: "Kate Farms Glucose Support 1.2", manufacturer: "Kate Farms", hcpcsCode: "B4154", kcalPerMl: 1.2, kcalPerGram: null, packaging: [{ type: "carton", label: "11 fl oz carton", mlPerUnit: 325, kcalPerUnit: 390 }] },
  { name: "Kate Farms Renal Support 1.8", manufacturer: "Kate Farms", hcpcsCode: "B4154", kcalPerMl: 1.8, kcalPerGram: null, packaging: [{ type: "carton", label: "11 fl oz carton", mlPerUnit: 325, kcalPerUnit: 585 }] },
  // Hormel
  { name: "Hormel Vital Cuisine", manufacturer: "Hormel", hcpcsCode: "B4154", kcalPerMl: 1.06, kcalPerGram: null, packaging: [{ type: "bottle", label: "8 fl oz bottle", mlPerUnit: 237, kcalPerUnit: 250 }] },
  // Mead Johnson - Enfaport (for chylothorax, fat malabsorption)
  { name: "Enfaport", manufacturer: "Mead Johnson", hcpcsCode: "B4154", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "bottle", label: "6 fl oz RTF bottle", mlPerUnit: 177, kcalPerUnit: 177 }, { type: "bottle", label: "8 fl oz RTF bottle", mlPerUnit: 237, kcalPerUnit: 237 }] },

  // ══════════════════════════════════════════════════════════════════════════════
  // B4155: Modular/Incomplete nutrients (Additives)
  // ══════════════════════════════════════════════════════════════════════════════
  // ─── Protein Modulars ─────────────────────────────────────────────────────────
  { name: "Beneprotein (Protein Powder)", manufacturer: "Nestle", hcpcsCode: "B4155", kcalPerMl: null, kcalPerGram: 3.6, isPowder: true, packaging: [{ type: "packet", label: "7g packet", gramsPerUnit: 7, kcalPerUnit: 25 }, { type: "tub", label: "8 oz canister", gramsPerUnit: 227 }] },
  { name: "Beneprotein (Instant Protein Powder)", manufacturer: "Nestle", hcpcsCode: "B4155", kcalPerMl: null, kcalPerGram: 3.6, isPowder: true, packaging: [{ type: "packet", label: "7g packet", gramsPerUnit: 7, kcalPerUnit: 25 }] },
  { name: "ProMod Liquid Protein", manufacturer: "Abbott", hcpcsCode: "B4155", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "bottle", label: "32 fl oz bottle", mlPerUnit: 946, kcalPerUnit: 946 }] },
  { name: "ProPass Protein Powder", manufacturer: "Hormel", hcpcsCode: "B4155", kcalPerMl: null, kcalPerGram: 3.0, isPowder: true, packaging: [{ type: "packet", label: "6.6g packet", gramsPerUnit: 6.6, kcalPerUnit: 20 }, { type: "tub", label: "7.5 oz canister", gramsPerUnit: 213 }] },
  { name: "Juven (Arginine/Glutamine/HMB)", manufacturer: "Abbott", hcpcsCode: "B4155", kcalPerMl: null, kcalPerGram: 3.3, isPowder: true, packaging: [{ type: "packet", label: "24g packet", gramsPerUnit: 24, kcalPerUnit: 80 }] },
  { name: "Arginaid", manufacturer: "Nestle", hcpcsCode: "B4155", kcalPerMl: null, kcalPerGram: 3.8, isPowder: true, packaging: [{ type: "packet", label: "9.2g packet", gramsPerUnit: 9.2, kcalPerUnit: 35 }] },
  { name: "Arginaid Extra", manufacturer: "Nestle", hcpcsCode: "B4155", kcalPerMl: 0.5, kcalPerGram: null, packaging: [{ type: "carton", label: "8 fl oz carton", mlPerUnit: 237, kcalPerUnit: 120 }] },
  { name: "Glutasolve", manufacturer: "Nestle", hcpcsCode: "B4155", kcalPerMl: null, kcalPerGram: 3.5, isPowder: true, packaging: [{ type: "packet", label: "22.5g packet", gramsPerUnit: 22.5, kcalPerUnit: 79 }] },
  { name: "Resource Glutamine", manufacturer: "Nestle", hcpcsCode: "B4155", kcalPerMl: null, kcalPerGram: 3.5, isPowder: true, packaging: [{ type: "packet", label: "5.9g packet", gramsPerUnit: 5.9, kcalPerUnit: 21 }] },
  { name: "Prosource Protein Powder", manufacturer: "Medtrition", hcpcsCode: "B4155", kcalPerMl: null, kcalPerGram: 3.0, isPowder: true, packaging: [{ type: "packet", label: "7.5g packet", gramsPerUnit: 7.5, kcalPerUnit: 23 }, { type: "tub", label: "9.7 oz tub", gramsPerUnit: 275 }] },
  { name: "Prosource Liquid Protein", manufacturer: "Medtrition", hcpcsCode: "B4155", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "bottle", label: "1 fl oz bottle", mlPerUnit: 30, kcalPerUnit: 100 }, { type: "bottle", label: "32 fl oz bottle", mlPerUnit: 946, kcalPerUnit: 946 }] },
  { name: "Prosource NoCarb", manufacturer: "Medtrition", hcpcsCode: "B4155", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "bottle", label: "1 fl oz bottle", mlPerUnit: 30, kcalPerUnit: 100 }] },
  { name: "Gelatein Plus", manufacturer: "Medtrition", hcpcsCode: "B4155", kcalPerMl: 0.88, kcalPerGram: null, packaging: [{ type: "bottle", label: "4 fl oz bottle", mlPerUnit: 118, kcalPerUnit: 104 }] },
  { name: "Proteinex", manufacturer: "Llorens Pharmaceutical", hcpcsCode: "B4155", kcalPerMl: 0.6763, kcalPerGram: null, packaging: [{ type: "bottle", label: "1 fl oz bottle", mlPerUnit: 30, kcalPerUnit: 75 }] },
  { name: "Proteinex 2G", manufacturer: "Llorens Pharmaceutical", hcpcsCode: "B4155", kcalPerMl: null, kcalPerGram: 3.5, isPowder: true, packaging: [{ type: "packet", label: "15g packet", gramsPerUnit: 15, kcalPerUnit: 53 }] },
  // ─── Carbohydrate Modulars ────────────────────────────────────────────────────
  { name: "Polycose (Liquid)", manufacturer: "Abbott", hcpcsCode: "B4155", kcalPerMl: 2.0, kcalPerGram: null, packaging: [{ type: "bottle", label: "4 fl oz bottle", mlPerUnit: 118, kcalPerUnit: 236 }] },
  { name: "Polycose (Powder)", manufacturer: "Abbott", hcpcsCode: "B4155", kcalPerMl: null, kcalPerGram: 3.8, isPowder: true, packaging: [{ type: "can", label: "12.3 oz can", gramsPerUnit: 350 }] },
  { name: "Moducal (Powder)", manufacturer: "Nestle", hcpcsCode: "B4155", kcalPerMl: null, kcalPerGram: 3.8, isPowder: true, packaging: [{ type: "can", label: "13 oz can", gramsPerUnit: 369 }] },
  { name: "SolCarb (Powder)", manufacturer: "Solace Nutrition", hcpcsCode: "B4155", kcalPerMl: null, kcalPerGram: 3.9, isPowder: true, packaging: [{ type: "can", label: "454g can", gramsPerUnit: 454 }] },
  // ─── Fat Modulars ─────────────────────────────────────────────────────────────
  { name: "MCT Oil", manufacturer: "Various", hcpcsCode: "B4155", kcalPerMl: 7.7, kcalPerGram: null, packaging: [{ type: "bottle", label: "32 fl oz bottle", mlPerUnit: 946, kcalPerUnit: 7284 }] },
  { name: "MCT Oil (Nestle)", manufacturer: "Nestle", hcpcsCode: "B4155", kcalPerMl: 7.7, kcalPerGram: null, packaging: [{ type: "bottle", label: "32 fl oz bottle", mlPerUnit: 946, kcalPerUnit: 7284 }] },
  { name: "MCT Oil (Nutricia)", manufacturer: "Nutricia", hcpcsCode: "B4155", kcalPerMl: 7.7, kcalPerGram: null, packaging: [{ type: "bottle", label: "500 mL bottle", mlPerUnit: 500, kcalPerUnit: 3850 }] },
  { name: "Microlipid", manufacturer: "Nestle", hcpcsCode: "B4155", kcalPerMl: 4.5, kcalPerGram: null, packaging: [{ type: "bottle", label: "3 fl oz bottle", mlPerUnit: 89, kcalPerUnit: 400 }] },
  { name: "Liquigen", manufacturer: "Nutricia", hcpcsCode: "B4155", kcalPerMl: 4.5, kcalPerGram: null, packaging: [{ type: "bottle", label: "250 mL bottle", mlPerUnit: 250, kcalPerUnit: 1125 }] },
  // ─── Combined Calorie Modulars (Fat + Carb) ───────────────────────────────────
  { name: "Duocal (Powder)", manufacturer: "Nutricia", hcpcsCode: "B4155", kcalPerMl: null, kcalPerGram: 4.9, isPowder: true, packaging: [{ type: "tub", label: "400g can", gramsPerUnit: 400 }] },
  { name: "Duocal Liquid", manufacturer: "Nutricia", hcpcsCode: "B4155", kcalPerMl: 1.5, kcalPerGram: null, packaging: [{ type: "bottle", label: "200 mL bottle", mlPerUnit: 200, kcalPerUnit: 300 }] },
  { name: "Duocal Super Soluble", manufacturer: "Nutricia", hcpcsCode: "B4155", kcalPerMl: null, kcalPerGram: 4.9, isPowder: true, packaging: [{ type: "tub", label: "400g can", gramsPerUnit: 400 }] },
  { name: "Benecalorie", manufacturer: "Nestle", hcpcsCode: "B4155", kcalPerMl: 7.2, kcalPerGram: null, packaging: [{ type: "bottle", label: "1.5 fl oz bottle", mlPerUnit: 44, kcalPerUnit: 330 }] },
  { name: "CaloriSmart", manufacturer: "Medtrition", hcpcsCode: "B4155", kcalPerMl: null, kcalPerGram: 4.0, isPowder: true, packaging: [{ type: "packet", label: "12.5g packet", gramsPerUnit: 12.5, kcalPerUnit: 50 }] },
  // ─── Fiber Modulars ───────────────────────────────────────────────────────────
  { name: "Resource Benefiber", manufacturer: "Nestle", hcpcsCode: "B4155", kcalPerMl: null, kcalPerGram: 2.0, isPowder: true, packaging: [{ type: "packet", label: "4g packet", gramsPerUnit: 4, kcalPerUnit: 8 }, { type: "tub", label: "8.6 oz tub", gramsPerUnit: 245 }] },
  { name: "Nutrisource Fiber (Powder)", manufacturer: "Nestle", hcpcsCode: "B4155", kcalPerMl: null, kcalPerGram: 1.0, isPowder: true, packaging: [{ type: "packet", label: "4g packet", gramsPerUnit: 4, kcalPerUnit: 4 }, { type: "can", label: "7.2 oz can", gramsPerUnit: 204 }] },
  { name: "FiberChoice", manufacturer: "Bayer", hcpcsCode: "B4155", kcalPerMl: null, kcalPerGram: null, packaging: [{ type: "bottle", label: "90 tablet bottle", gramsPerUnit: 180 }] },
  // ─── Specialty Modulars ───────────────────────────────────────────────────────
  { name: "Scandishake (Powder)", manufacturer: "Scandipharm", hcpcsCode: "B4155", kcalPerMl: null, kcalPerGram: 5.3, isPowder: true, packaging: [{ type: "packet", label: "3 oz packet", gramsPerUnit: 85, kcalPerUnit: 440 }] },
  { name: "Scandishake Mix", manufacturer: "Axcan Scandipharm", hcpcsCode: "B4155", kcalPerMl: null, kcalPerGram: 5.3, isPowder: true, packaging: [{ type: "packet", label: "3 oz packet", gramsPerUnit: 85, kcalPerUnit: 440 }] },
  { name: "Super Soluble Duocal", manufacturer: "Nutricia", hcpcsCode: "B4155", kcalPerMl: null, kcalPerGram: 4.9, isPowder: true, packaging: [{ type: "tub", label: "400g can", gramsPerUnit: 400 }] },
  { name: "Nutrisource Carbohydrate", manufacturer: "Nestle", hcpcsCode: "B4155", kcalPerMl: null, kcalPerGram: 3.8, isPowder: true, packaging: [{ type: "can", label: "13 oz can", gramsPerUnit: 369 }] },
  { name: "Nutrisource Lipid", manufacturer: "Nestle", hcpcsCode: "B4155", kcalPerMl: 4.5, kcalPerGram: null, packaging: [{ type: "bottle", label: "4 fl oz bottle", mlPerUnit: 118, kcalPerUnit: 531 }] },
  { name: "ProSource Gelatein 20", manufacturer: "Medtrition", hcpcsCode: "B4155", kcalPerMl: 0.88, kcalPerGram: null, packaging: [{ type: "bottle", label: "4 fl oz bottle", mlPerUnit: 118, kcalPerUnit: 104 }] },
  { name: "ProSource TF", manufacturer: "Medtrition", hcpcsCode: "B4155", kcalPerMl: null, kcalPerGram: 3.5, isPowder: true, packaging: [{ type: "packet", label: "11g packet", gramsPerUnit: 11, kcalPerUnit: 39 }] },

  // ══════════════════════════════════════════════════════════════════════════════
  // B4157: Inherited disease of metabolism (Adult)
  // ══════════════════════════════════════════════════════════════════════════════
  // Abbott "-2" powders: All 410 kcal per 100g = 4.1 kcal/g
  { name: "Phenex-2 (PKU)", manufacturer: "Abbott", hcpcsCode: "B4157", kcalPerMl: 0.8, kcalPerGram: 4.1, isPowder: true, packaging: [{ type: "can", label: "14.1 oz can", gramsPerUnit: 400 }] },
  { name: "Glutarex-2 (Glutaric Aciduria)", manufacturer: "Abbott", hcpcsCode: "B4157", kcalPerMl: 0.8, kcalPerGram: 4.1, isPowder: true, packaging: [{ type: "can", label: "14.1 oz can", gramsPerUnit: 400 }] },
  { name: "Hominex-2 (Homocystinuria)", manufacturer: "Abbott", hcpcsCode: "B4157", kcalPerMl: 0.8, kcalPerGram: 4.1, isPowder: true, packaging: [{ type: "can", label: "14.1 oz can", gramsPerUnit: 400 }] },
  { name: "Ketonex-2 (MSUD)", manufacturer: "Abbott", hcpcsCode: "B4157", kcalPerMl: 0.8, kcalPerGram: 4.1, isPowder: true, packaging: [{ type: "can", label: "14.1 oz can", gramsPerUnit: 400 }] },
  { name: "Propimex-2 (Propionic/Methylmalonic)", manufacturer: "Abbott", hcpcsCode: "B4157", kcalPerMl: 0.8, kcalPerGram: 4.1, isPowder: true, packaging: [{ type: "can", label: "14.1 oz can", gramsPerUnit: 400 }] },
  { name: "Tyrex-2 (Tyrosinemia)", manufacturer: "Abbott", hcpcsCode: "B4157", kcalPerMl: 0.8, kcalPerGram: 4.1, isPowder: true, packaging: [{ type: "can", label: "14.1 oz can", gramsPerUnit: 400 }] },
  { name: "Cyclinex-2 (Urea Cycle Disorders)", manufacturer: "Abbott", hcpcsCode: "B4157", kcalPerMl: 0.8, kcalPerGram: 4.1, isPowder: true, packaging: [{ type: "can", label: "14.1 oz can", gramsPerUnit: 400 }] },
  { name: "I-Valex-2 (Isovaleric Acidemia)", manufacturer: "Abbott", hcpcsCode: "B4157", kcalPerMl: 0.8, kcalPerGram: 4.1, isPowder: true, packaging: [{ type: "can", label: "14.1 oz can", gramsPerUnit: 400 }] },
  // Nutricia Adult PKU
  { name: "PKU Anamix Early Years", manufacturer: "Nutricia", hcpcsCode: "B4157", kcalPerMl: 0.7, kcalPerGram: 3.8, isPowder: true, packaging: [{ type: "can", label: "400g can", gramsPerUnit: 400 }] },
  { name: "PKU Anamix Junior (Powder)", manufacturer: "Nutricia", hcpcsCode: "B4157", kcalPerMl: 0.9, kcalPerGram: 3.8, isPowder: true, packaging: [{ type: "can", label: "400g can", gramsPerUnit: 400 }] },
  { name: "PKU Anamix Junior LQ (Liquid)", manufacturer: "Nutricia", hcpcsCode: "B4157", kcalPerMl: 0.9, kcalPerGram: null, packaging: [{ type: "pouch", label: "125 mL pouch", mlPerUnit: 125, kcalPerUnit: 113 }] },
  { name: "PKU Lophlex LQ", manufacturer: "Nutricia", hcpcsCode: "B4157", kcalPerMl: 0.6, kcalPerGram: null, packaging: [{ type: "pouch", label: "125 mL pouch", mlPerUnit: 125, kcalPerUnit: 75 }] },
  { name: "PKU Sphere", manufacturer: "Nutricia", hcpcsCode: "B4157", kcalPerMl: null, kcalPerGram: null, packaging: [{ type: "packet", label: "35g sachet", gramsPerUnit: 35 }] },
  { name: "Phlexy-10 System (PKU)", manufacturer: "Nutricia", hcpcsCode: "B4157", kcalPerMl: null, kcalPerGram: 3.0, isPowder: true, packaging: [{ type: "packet", label: "20g sachet", gramsPerUnit: 20, kcalPerUnit: 60 }] },
  { name: "UCD Anamix Junior", manufacturer: "Nutricia", hcpcsCode: "B4157", kcalPerMl: 0.9, kcalPerGram: 3.9, isPowder: true, packaging: [{ type: "can", label: "400g can", gramsPerUnit: 400 }] },
  { name: "MSUD Anamix Junior", manufacturer: "Nutricia", hcpcsCode: "B4157", kcalPerMl: null, kcalPerGram: 3.8, isPowder: true, packaging: [{ type: "can", label: "400g can", gramsPerUnit: 400 }] },
  { name: "HCU Anamix", manufacturer: "Nutricia", hcpcsCode: "B4157", kcalPerMl: null, kcalPerGram: 3.8, isPowder: true, packaging: [{ type: "can", label: "400g can", gramsPerUnit: 400 }] },
  { name: "TYR Anamix", manufacturer: "Nutricia", hcpcsCode: "B4157", kcalPerMl: null, kcalPerGram: 3.8, isPowder: true, packaging: [{ type: "can", label: "400g can", gramsPerUnit: 400 }] },
  { name: "MMA/PA Anamix", manufacturer: "Nutricia", hcpcsCode: "B4157", kcalPerMl: null, kcalPerGram: 3.8, isPowder: true, packaging: [{ type: "can", label: "400g can", gramsPerUnit: 400 }] },
  { name: "GA Anamix (Glutaric Aciduria)", manufacturer: "Nutricia", hcpcsCode: "B4157", kcalPerMl: null, kcalPerGram: 3.8, isPowder: true, packaging: [{ type: "can", label: "400g can", gramsPerUnit: 400 }] },
  // Vitaflo (Nestle)
  { name: "PKU Cooler 10", manufacturer: "Vitaflo/Nestle", hcpcsCode: "B4157", kcalPerMl: 0.6, kcalPerGram: null, packaging: [{ type: "pouch", label: "87 mL pouch", mlPerUnit: 87, kcalPerUnit: 52 }] },
  { name: "PKU Cooler 15", manufacturer: "Vitaflo/Nestle", hcpcsCode: "B4157", kcalPerMl: 0.6, kcalPerGram: null, packaging: [{ type: "pouch", label: "130 mL pouch", mlPerUnit: 130, kcalPerUnit: 78 }] },
  { name: "PKU Cooler 20", manufacturer: "Vitaflo/Nestle", hcpcsCode: "B4157", kcalPerMl: 0.6, kcalPerGram: null, packaging: [{ type: "pouch", label: "174 mL pouch", mlPerUnit: 174, kcalPerUnit: 104 }] },
  { name: "PKU Express", manufacturer: "Vitaflo/Nestle", hcpcsCode: "B4157", kcalPerMl: null, kcalPerGram: 3.5, isPowder: true, packaging: [{ type: "packet", label: "25g sachet", gramsPerUnit: 25, kcalPerUnit: 88 }] },
  { name: "PKU Gel", manufacturer: "Vitaflo/Nestle", hcpcsCode: "B4157", kcalPerMl: null, kcalPerGram: 3.5, isPowder: true, packaging: [{ type: "packet", label: "24g sachet", gramsPerUnit: 24, kcalPerUnit: 84 }] },
  { name: "MSUD Maxamaid", manufacturer: "Nutricia", hcpcsCode: "B4157", kcalPerMl: null, kcalPerGram: 3.5, isPowder: true, packaging: [{ type: "can", label: "454g can", gramsPerUnit: 454 }] },
  { name: "MSUD Maxamum", manufacturer: "Nutricia", hcpcsCode: "B4157", kcalPerMl: null, kcalPerGram: 3.5, isPowder: true, packaging: [{ type: "can", label: "454g can", gramsPerUnit: 454 }] },
  // Ajinomoto Cambrooke
  { name: "Glytactin Build 10", manufacturer: "Ajinomoto Cambrooke", hcpcsCode: "B4157", kcalPerMl: null, kcalPerGram: null, packaging: [{ type: "packet", label: "27.8g packet", gramsPerUnit: 27.8 }] },
  { name: "Glytactin Build 20", manufacturer: "Ajinomoto Cambrooke", hcpcsCode: "B4157", kcalPerMl: null, kcalPerGram: null, packaging: [{ type: "packet", label: "33.3g packet", gramsPerUnit: 33.3 }] },
  { name: "Glytactin RTD 10", manufacturer: "Ajinomoto Cambrooke", hcpcsCode: "B4157", kcalPerMl: 0.4, kcalPerGram: null, packaging: [{ type: "bottle", label: "8.5 fl oz bottle", mlPerUnit: 250, kcalPerUnit: 100 }] },
  { name: "Glytactin RTD 15", manufacturer: "Ajinomoto Cambrooke", hcpcsCode: "B4157", kcalPerMl: 0.52, kcalPerGram: null, packaging: [{ type: "bottle", label: "8.5 fl oz bottle", mlPerUnit: 250, kcalPerUnit: 130 }] },
  { name: "Glytactin Complete", manufacturer: "Ajinomoto Cambrooke", hcpcsCode: "B4157", kcalPerMl: null, kcalPerGram: null, packaging: [{ type: "packet", label: "34g packet", gramsPerUnit: 34 }] },

  // ═════════════════════════════��════════════════════════════════════════════════
  // B4158: Pediatric, intact nutrients
  // ══════════════════════════════════════════════════════════════════════════════
  // Abbott
  { name: "PediaSure 1.0 Cal", manufacturer: "Abbott", hcpcsCode: "B4158", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "bottle", label: "8 fl oz bottle", mlPerUnit: 237, kcalPerUnit: 237 }, { type: "can", label: "8 fl oz can", mlPerUnit: 237, kcalPerUnit: 237 }, { type: "carton", label: "1000 mL carton", mlPerUnit: 1000, kcalPerUnit: 1000 }] },
  { name: "PediaSure with Fiber", manufacturer: "Abbott", hcpcsCode: "B4158", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "bottle", label: "8 fl oz bottle", mlPerUnit: 237, kcalPerUnit: 237 }, { type: "carton", label: "1000 mL carton", mlPerUnit: 1000, kcalPerUnit: 1000 }] },
  { name: "PediaSure Enteral", manufacturer: "Abbott", hcpcsCode: "B4158", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "carton", label: "1000 mL carton", mlPerUnit: 1000, kcalPerUnit: 1000 }, { type: "bottle", label: "237 mL bottle", mlPerUnit: 237, kcalPerUnit: 237 }] },
  { name: "Similac Advance", manufacturer: "Abbott", hcpcsCode: "B4158", kcalPerMl: 0.6763, kcalPerGram: 5.1, isPowder: true, packaging: [{ type: "can", label: "12.4 oz can (powder)", gramsPerUnit: 352 }, { type: "bottle", label: "2 fl oz RTF bottle", mlPerUnit: 59 }, { type: "carton", label: "32 fl oz RTF carton", mlPerUnit: 946 }] },
  { name: "Similac Advance Powder", manufacturer: "Abbott", hcpcsCode: "B4158", kcalPerMl: null, kcalPerGram: 5.1, isPowder: true, packaging: [{ type: "can", label: "12.4 oz can", gramsPerUnit: 352 }, { type: "can", label: "23.2 oz can", gramsPerUnit: 658 }] },
  { name: "Similac PM 60/40", manufacturer: "Abbott", hcpcsCode: "B4158", kcalPerMl: 0.6763, kcalPerGram: 5.1, isPowder: true, packaging: [{ type: "can", label: "14.1 oz can", gramsPerUnit: 400 }] },
  { name: "Similac Pro-Total Comfort", manufacturer: "Abbott", hcpcsCode: "B4158", kcalPerMl: 0.6763, kcalPerGram: 5.0, isPowder: true, packaging: [{ type: "can", label: "12 oz can", gramsPerUnit: 340 }, { type: "can", label: "22.5 oz can", gramsPerUnit: 638 }] },
  { name: "Similac NeoSure", manufacturer: "Abbott", hcpcsCode: "B4158", kcalPerMl: 0.74, kcalPerGram: 5.1, isPowder: true, packaging: [{ type: "can", label: "13.1 oz can", gramsPerUnit: 371 }, { type: "bottle", label: "2 fl oz RTF bottle", mlPerUnit: 59 }] },
  { name: "Similac Sensitive", manufacturer: "Abbott", hcpcsCode: "B4158", kcalPerMl: 0.6763, kcalPerGram: 5.0, isPowder: true, packaging: [{ type: "can", label: "12.5 oz can", gramsPerUnit: 354 }, { type: "can", label: "22.5 oz can", gramsPerUnit: 638 }] },
  { name: "Similac for Supplementation", manufacturer: "Abbott", hcpcsCode: "B4158", kcalPerMl: 0.6763, kcalPerGram: null, packaging: [{ type: "bottle", label: "2 fl oz bottle", mlPerUnit: 59 }] },
  { name: "Similac Expert Care NeoSure", manufacturer: "Abbott", hcpcsCode: "B4158", kcalPerMl: 0.74, kcalPerGram: 5.1, isPowder: true, packaging: [{ type: "can", label: "13.1 oz can", gramsPerUnit: 371 }, { type: "bottle", label: "2 fl oz RTF bottle", mlPerUnit: 59 }] },
  // Nestle
  { name: "Nutren Junior", manufacturer: "Nestle", hcpcsCode: "B4158", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "carton", label: "250 mL carton", mlPerUnit: 250, kcalPerUnit: 250 }, { type: "carton", label: "1000 mL carton", mlPerUnit: 1000, kcalPerUnit: 1000 }] },
  { name: "Nutren Junior with Fiber", manufacturer: "Nestle", hcpcsCode: "B4158", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "carton", label: "250 mL carton", mlPerUnit: 250, kcalPerUnit: 250 }, { type: "carton", label: "1000 mL carton", mlPerUnit: 1000, kcalPerUnit: 1000 }] },
  { name: "Boost Kid Essentials 1.0", manufacturer: "Nestle", hcpcsCode: "B4158", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "carton", label: "8.01 fl oz carton", mlPerUnit: 237, kcalPerUnit: 237 }] },
  { name: "Boost Kid Essentials 1.0 with Fiber", manufacturer: "Nestle", hcpcsCode: "B4158", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "carton", label: "8.01 fl oz carton", mlPerUnit: 237, kcalPerUnit: 237 }] },
  { name: "Compleat Pediatric Standard", manufacturer: "Nestle", hcpcsCode: "B4158", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "carton", label: "250 mL carton", mlPerUnit: 250, kcalPerUnit: 250 }] },
  { name: "Compleat Pediatric Reduced Calorie", manufacturer: "Nestle", hcpcsCode: "B4158", kcalPerMl: 0.6, kcalPerGram: null, packaging: [{ type: "carton", label: "250 mL carton", mlPerUnit: 250, kcalPerUnit: 150 }] },
  { name: "Good Start (GentlePro)", manufacturer: "Nestle", hcpcsCode: "B4158", kcalPerMl: 0.6763, kcalPerGram: 5.0, isPowder: true, packaging: [{ type: "can", label: "12.7 oz can", gramsPerUnit: 360 }, { type: "can", label: "20 oz can", gramsPerUnit: 567 }] },
  { name: "Good Start Soothe", manufacturer: "Nestle", hcpcsCode: "B4158", kcalPerMl: 0.6763, kcalPerGram: 5.0, isPowder: true, packaging: [{ type: "can", label: "12.4 oz can", gramsPerUnit: 352 }, { type: "can", label: "19.4 oz can", gramsPerUnit: 550 }] },
  { name: "Good Start Gentle", manufacturer: "Nestle", hcpcsCode: "B4158", kcalPerMl: 0.6763, kcalPerGram: 5.0, isPowder: true, packaging: [{ type: "can", label: "12.7 oz can", gramsPerUnit: 360 }, { type: "can", label: "20 oz can", gramsPerUnit: 567 }] },
  // Kate Farms
  { name: "Kate Farms Pediatric Standard 1.0", manufacturer: "Kate Farms", hcpcsCode: "B4158", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "carton", label: "8.45 fl oz carton", mlPerUnit: 250, kcalPerUnit: 250 }] },
  // Mead Johnson / Reckitt
  { name: "Enfamil Infant", manufacturer: "Mead Johnson", hcpcsCode: "B4158", kcalPerMl: 0.6763, kcalPerGram: 5.1, isPowder: true, packaging: [{ type: "can", label: "12.5 oz can", gramsPerUnit: 354 }, { type: "can", label: "21.1 oz can", gramsPerUnit: 598 }, { type: "bottle", label: "2 fl oz RTF bottle", mlPerUnit: 59 }, { type: "carton", label: "32 fl oz RTF carton", mlPerUnit: 946 }] },
  { name: "Enfamil NeuroPro Infant", manufacturer: "Mead Johnson", hcpcsCode: "B4158", kcalPerMl: 0.6763, kcalPerGram: 5.1, isPowder: true, packaging: [{ type: "can", label: "12.5 oz can", gramsPerUnit: 354 }, { type: "can", label: "20.7 oz can", gramsPerUnit: 587 }] },
  { name: "Enfamil Gentlease", manufacturer: "Mead Johnson", hcpcsCode: "B4158", kcalPerMl: 0.6763, kcalPerGram: 5.0, isPowder: true, packaging: [{ type: "can", label: "12.4 oz can", gramsPerUnit: 352 }, { type: "can", label: "21.5 oz can", gramsPerUnit: 610 }] },
  { name: "Enfamil NeuroPro Gentlease", manufacturer: "Mead Johnson", hcpcsCode: "B4158", kcalPerMl: 0.6763, kcalPerGram: 5.0, isPowder: true, packaging: [{ type: "can", label: "12.4 oz can", gramsPerUnit: 352 }, { type: "can", label: "20 oz can", gramsPerUnit: 567 }] },
  { name: "Enfamil A.R. (Anti-Reflux)", manufacturer: "Mead Johnson", hcpcsCode: "B4158", kcalPerMl: 0.6763, kcalPerGram: 5.0, isPowder: true, packaging: [{ type: "can", label: "12.9 oz can", gramsPerUnit: 366 }, { type: "can", label: "19.5 oz can", gramsPerUnit: 553 }] },
  { name: "Enfamil Premium", manufacturer: "Mead Johnson", hcpcsCode: "B4158", kcalPerMl: 0.6763, kcalPerGram: 5.1, isPowder: true, packaging: [{ type: "can", label: "12.5 oz can", gramsPerUnit: 354 }, { type: "can", label: "21.1 oz can", gramsPerUnit: 598 }] },
  { name: "Enfamil Enspire", manufacturer: "Mead Johnson", hcpcsCode: "B4158", kcalPerMl: 0.6763, kcalPerGram: 5.0, isPowder: true, packaging: [{ type: "can", label: "12.5 oz can", gramsPerUnit: 354 }, { type: "can", label: "20.5 oz can", gramsPerUnit: 581 }] },
  { name: "Enfamil Reguline", manufacturer: "Mead Johnson", hcpcsCode: "B4158", kcalPerMl: 0.6763, kcalPerGram: 5.0, isPowder: true, packaging: [{ type: "can", label: "12.4 oz can", gramsPerUnit: 352 }, { type: "can", label: "20.4 oz can", gramsPerUnit: 578 }] },
  { name: "Enfagrow Toddler", manufacturer: "Mead Johnson", hcpcsCode: "B4158", kcalPerMl: 0.6763, kcalPerGram: 5.0, isPowder: true, packaging: [{ type: "can", label: "24 oz can", gramsPerUnit: 680 }] },
  { name: "Enfamil EnfaCare", manufacturer: "Mead Johnson", hcpcsCode: "B4158", kcalPerMl: 0.74, kcalPerGram: 5.1, isPowder: true, packaging: [{ type: "can", label: "12.8 oz can", gramsPerUnit: 363 }, { type: "bottle", label: "2 fl oz RTF bottle", mlPerUnit: 59 }] },
  // Perrigo
  { name: "Store Brand Infant Formula (Generic)", manufacturer: "Perrigo", hcpcsCode: "B4158", kcalPerMl: 0.6763, kcalPerGram: 5.0, isPowder: true, packaging: [{ type: "can", label: "12.5 oz can", gramsPerUnit: 354 }, { type: "can", label: "22.5 oz can", gramsPerUnit: 638 }] },

  // ══════════════════════════════════════════════════════════════════════════════
  // B4159: Pediatric, soy-based
  // ══════════════════════════════════════════════════════════════════════════════
  { name: "PediaSure (Soy-Based)", manufacturer: "Abbott", hcpcsCode: "B4159", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "bottle", label: "8 fl oz bottle", mlPerUnit: 237, kcalPerUnit: 237 }] },
  { name: "Similac Soy Isomil", manufacturer: "Abbott", hcpcsCode: "B4159", kcalPerMl: 0.6763, kcalPerGram: 5.0, isPowder: true, packaging: [{ type: "can", label: "12.4 oz can (powder)", gramsPerUnit: 352 }, { type: "bottle", label: "2 fl oz RTF bottle", mlPerUnit: 59 }, { type: "carton", label: "32 fl oz RTF carton", mlPerUnit: 946 }] },
  { name: "Similac Isomil Soy", manufacturer: "Abbott", hcpcsCode: "B4159", kcalPerMl: 0.6763, kcalPerGram: 5.0, isPowder: true, packaging: [{ type: "can", label: "12.4 oz can (powder)", gramsPerUnit: 352 }, { type: "can", label: "23.2 oz can (powder)", gramsPerUnit: 658 }] },
  { name: "Enfamil ProSobee", manufacturer: "Mead Johnson", hcpcsCode: "B4159", kcalPerMl: 0.6763, kcalPerGram: 5.1, isPowder: true, packaging: [{ type: "can", label: "12.9 oz can", gramsPerUnit: 366 }, { type: "can", label: "22 oz can", gramsPerUnit: 624 }] },
  { name: "Enfamil Soy", manufacturer: "Mead Johnson", hcpcsCode: "B4159", kcalPerMl: 0.6763, kcalPerGram: 5.0, isPowder: true, packaging: [{ type: "can", label: "12.9 oz can", gramsPerUnit: 366 }, { type: "can", label: "20.9 oz can", gramsPerUnit: 593 }] },
  { name: "Good Start Soy", manufacturer: "Nestle", hcpcsCode: "B4159", kcalPerMl: 0.6763, kcalPerGram: 5.0, isPowder: true, packaging: [{ type: "can", label: "12.9 oz can", gramsPerUnit: 366 }, { type: "can", label: "20 oz can", gramsPerUnit: 567 }] },
  { name: "Bright Beginnings Pediatric Soy", manufacturer: "PBM Products", hcpcsCode: "B4159", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "carton", label: "8 fl oz carton", mlPerUnit: 237, kcalPerUnit: 237 }] },
  { name: "Bright Beginnings Soy Formula", manufacturer: "PBM Products", hcpcsCode: "B4159", kcalPerMl: 0.6763, kcalPerGram: 5.0, isPowder: true, packaging: [{ type: "can", label: "12.9 oz can", gramsPerUnit: 366 }] },
  { name: "Store Brand Soy Formula (Generic)", manufacturer: "Perrigo", hcpcsCode: "B4159", kcalPerMl: 0.6763, kcalPerGram: 5.0, isPowder: true, packaging: [{ type: "can", label: "12.9 oz can", gramsPerUnit: 366 }, { type: "can", label: "22 oz can", gramsPerUnit: 624 }] },
  { name: "Earth's Best Organic Soy", manufacturer: "Hain Celestial", hcpcsCode: "B4159", kcalPerMl: 0.6763, kcalPerGram: 5.0, isPowder: true, packaging: [{ type: "can", label: "21 oz can", gramsPerUnit: 595 }] },

  // ══════════════════════════════════════════════════════════════════════════════
  // B4160: Pediatric, calorically dense (>=0.7 kcal/mL)
  // ══════════════════════════════════════════════════════════════════════════════
  // Abbott
  { name: "PediaSure 1.5 Cal", manufacturer: "Abbott", hcpcsCode: "B4160", kcalPerMl: 1.5, kcalPerGram: null, packaging: [{ type: "bottle", label: "8 fl oz bottle", mlPerUnit: 237, kcalPerUnit: 355 }, { type: "can", label: "8 fl oz can", mlPerUnit: 237, kcalPerUnit: 355 }, { type: "carton", label: "1000 mL carton", mlPerUnit: 1000, kcalPerUnit: 1500 }] },
  { name: "PediaSure Grow & Gain", manufacturer: "Abbott", hcpcsCode: "B4160", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "bottle", label: "8 fl oz bottle", mlPerUnit: 237, kcalPerUnit: 237 }, { type: "can", label: "8 fl oz can", mlPerUnit: 237, kcalPerUnit: 237 }] },
  { name: "PediaSure Harvest", manufacturer: "Abbott", hcpcsCode: "B4160", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "bottle", label: "8 fl oz bottle", mlPerUnit: 237, kcalPerUnit: 237 }] },
  { name: "Similac High Energy", manufacturer: "Abbott", hcpcsCode: "B4160", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "carton", label: "200 mL carton", mlPerUnit: 200, kcalPerUnit: 200 }] },
  // Nestle
  { name: "Boost Kid Essentials 1.5", manufacturer: "Nestle", hcpcsCode: "B4160", kcalPerMl: 1.5, kcalPerGram: null, packaging: [{ type: "carton", label: "8.01 fl oz carton", mlPerUnit: 237, kcalPerUnit: 355 }] },
  { name: "Boost Kid Essentials 1.5 with Fiber", manufacturer: "Nestle", hcpcsCode: "B4160", kcalPerMl: 1.5, kcalPerGram: null, packaging: [{ type: "carton", label: "8.01 fl oz carton", mlPerUnit: 237, kcalPerUnit: 355 }] },
  { name: "Nutren Junior 1.5", manufacturer: "Nestle", hcpcsCode: "B4160", kcalPerMl: 1.5, kcalPerGram: null, packaging: [{ type: "carton", label: "250 mL carton", mlPerUnit: 250, kcalPerUnit: 375 }, { type: "carton", label: "1000 mL carton", mlPerUnit: 1000, kcalPerUnit: 1500 }] },
  { name: "Compleat Pediatric 1.4", manufacturer: "Nestle", hcpcsCode: "B4160", kcalPerMl: 1.4, kcalPerGram: null, packaging: [{ type: "carton", label: "250 mL carton", mlPerUnit: 250, kcalPerUnit: 350 }] },
  // Kate Farms
  { name: "Kate Farms Pediatric Standard 1.2", manufacturer: "Kate Farms", hcpcsCode: "B4160", kcalPerMl: 1.2, kcalPerGram: null, packaging: [{ type: "carton", label: "8.45 fl oz carton", mlPerUnit: 250, kcalPerUnit: 300 }] },
  // Mead Johnson
  { name: "Enfamil 24 Cal", manufacturer: "Mead Johnson", hcpcsCode: "B4160", kcalPerMl: 0.8, kcalPerGram: null, packaging: [{ type: "bottle", label: "2 fl oz bottle", mlPerUnit: 59, kcalPerUnit: 47 }, { type: "bottle", label: "6 fl oz bottle", mlPerUnit: 177, kcalPerUnit: 142 }] },
  { name: "Enfamil 22 Cal", manufacturer: "Mead Johnson", hcpcsCode: "B4160", kcalPerMl: 0.74, kcalPerGram: null, packaging: [{ type: "bottle", label: "2 fl oz bottle", mlPerUnit: 59, kcalPerUnit: 44 }] },

  // ══════════════════════════════════════════════════════════════════════════════
  // B4161: Pediatric, hydrolyzed proteins (Hypoallergenic / Elemental)
  // ══════════════════════════════════════════════════════════════════════════════
  // Abbott - PediaSure Peptide
  { name: "PediaSure Peptide 1.0 Cal", manufacturer: "Abbott", hcpcsCode: "B4161", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "bottle", label: "8 fl oz bottle", mlPerUnit: 237, kcalPerUnit: 237 }, { type: "carton", label: "1000 mL carton", mlPerUnit: 1000, kcalPerUnit: 1000 }] },
  { name: "PediaSure Peptide 1.5 Cal", manufacturer: "Abbott", hcpcsCode: "B4161", kcalPerMl: 1.5, kcalPerGram: null, packaging: [{ type: "bottle", label: "8 fl oz bottle", mlPerUnit: 237, kcalPerUnit: 355 }, { type: "carton", label: "1000 mL carton", mlPerUnit: 1000, kcalPerUnit: 1500 }] },
  // Abbott - EleCare (Elemental / Amino Acid Based)
  { name: "EleCare Jr", manufacturer: "Abbott", hcpcsCode: "B4161", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "can", label: "14.1 oz can (powder)", gramsPerUnit: 400 }, { type: "carton", label: "8 fl oz carton", mlPerUnit: 237, kcalPerUnit: 237 }] },
  { name: "EleCare Jr (Vanilla)", manufacturer: "Abbott", hcpcsCode: "B4161", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "can", label: "14.1 oz can (powder)", gramsPerUnit: 400 }, { type: "carton", label: "8 fl oz carton", mlPerUnit: 237, kcalPerUnit: 237 }] },
  { name: "EleCare Jr (Unflavored)", manufacturer: "Abbott", hcpcsCode: "B4161", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "can", label: "14.1 oz can (powder)", gramsPerUnit: 400 }] },
  { name: "EleCare (Infant)", manufacturer: "Abbott", hcpcsCode: "B4161", kcalPerMl: 0.6763, kcalPerGram: 5.0, isPowder: true, packaging: [{ type: "can", label: "14.1 oz can", gramsPerUnit: 400 }] },
  { name: "EleCare Infant (Powder)", manufacturer: "Abbott", hcpcsCode: "B4161", kcalPerMl: null, kcalPerGram: 5.0, isPowder: true, packaging: [{ type: "can", label: "14.1 oz can", gramsPerUnit: 400 }] },
  { name: "EleCare DHA/ARA", manufacturer: "Abbott", hcpcsCode: "B4161", kcalPerMl: 0.6763, kcalPerGram: 5.0, isPowder: true, packaging: [{ type: "can", label: "14.1 oz can", gramsPerUnit: 400 }] },
  // Abbott - Alimentum (Extensively Hydrolyzed)
  { name: "Similac Alimentum", manufacturer: "Abbott", hcpcsCode: "B4161", kcalPerMl: 0.6763, kcalPerGram: 5.0, isPowder: true, packaging: [{ type: "can", label: "12.1 oz can (powder)", gramsPerUnit: 343 }, { type: "bottle", label: "2 fl oz RTF bottle", mlPerUnit: 59 }, { type: "bottle", label: "8 fl oz RTF bottle", mlPerUnit: 237 }, { type: "carton", label: "32 fl oz RTF carton", mlPerUnit: 946 }] },
  { name: "Similac Alimentum (Ready-to-Feed)", manufacturer: "Abbott", hcpcsCode: "B4161", kcalPerMl: 0.6763, kcalPerGram: null, packaging: [{ type: "bottle", label: "2 fl oz bottle", mlPerUnit: 59 }, { type: "bottle", label: "8 fl oz bottle", mlPerUnit: 237 }, { type: "carton", label: "32 fl oz carton", mlPerUnit: 946 }] },
  { name: "Similac Alimentum (Powder)", manufacturer: "Abbott", hcpcsCode: "B4161", kcalPerMl: null, kcalPerGram: 5.0, isPowder: true, packaging: [{ type: "can", label: "12.1 oz can", gramsPerUnit: 343 }, { type: "can", label: "19.8 oz can", gramsPerUnit: 561 }] },
  // Nestle - Peptamen Jr
  { name: "Peptamen Junior", manufacturer: "Nestle", hcpcsCode: "B4161", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "carton", label: "250 mL carton", mlPerUnit: 250, kcalPerUnit: 250 }, { type: "carton", label: "1000 mL carton", mlPerUnit: 1000, kcalPerUnit: 1000 }] },
  { name: "Peptamen Junior 1.5", manufacturer: "Nestle", hcpcsCode: "B4161", kcalPerMl: 1.5, kcalPerGram: null, packaging: [{ type: "carton", label: "250 mL carton", mlPerUnit: 250, kcalPerUnit: 375 }, { type: "carton", label: "1000 mL carton", mlPerUnit: 1000, kcalPerUnit: 1500 }] },
  { name: "Peptamen Junior with Fiber", manufacturer: "Nestle", hcpcsCode: "B4161", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "carton", label: "250 mL carton", mlPerUnit: 250, kcalPerUnit: 250 }] },
  { name: "Compleat Pediatric Peptide", manufacturer: "Nestle", hcpcsCode: "B4161", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "carton", label: "250 mL carton", mlPerUnit: 250, kcalPerUnit: 250 }] },
  // Nestle - Althera / Alfamino
  { name: "Alfamino Infant", manufacturer: "Nestle", hcpcsCode: "B4161", kcalPerMl: 0.6763, kcalPerGram: 5.0, isPowder: true, packaging: [{ type: "can", label: "14.1 oz can", gramsPerUnit: 400 }] },
  { name: "Alfamino Junior", manufacturer: "Nestle", hcpcsCode: "B4161", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "carton", label: "250 mL carton", mlPerUnit: 250, kcalPerUnit: 250 }] },
  { name: "Althera", manufacturer: "Nestle", hcpcsCode: "B4161", kcalPerMl: 0.6763, kcalPerGram: 4.6, isPowder: true, packaging: [{ type: "can", label: "14.1 oz can", gramsPerUnit: 400 }] },
  // Nutricia - Neocate (Amino Acid Based / Elemental)
  { name: "Neocate Infant DHA/ARA", manufacturer: "Nutricia", hcpcsCode: "B4161", kcalPerMl: 0.6763, kcalPerGram: 5.0, isPowder: true, packaging: [{ type: "can", label: "14.1 oz can", gramsPerUnit: 400 }] },
  { name: "Neocate Infant (Powder)", manufacturer: "Nutricia", hcpcsCode: "B4161", kcalPerMl: null, kcalPerGram: 5.0, isPowder: true, packaging: [{ type: "can", label: "14.1 oz can", gramsPerUnit: 400 }] },
  { name: "Neocate Junior", manufacturer: "Nutricia", hcpcsCode: "B4161", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "can", label: "14.1 oz can (powder)", gramsPerUnit: 400 }, { type: "carton", label: "8.45 fl oz carton", mlPerUnit: 250, kcalPerUnit: 250 }] },
  { name: "Neocate Junior (Unflavored)", manufacturer: "Nutricia", hcpcsCode: "B4161", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "can", label: "14.1 oz can (powder)", gramsPerUnit: 400 }] },
  { name: "Neocate Junior (Tropical)", manufacturer: "Nutricia", hcpcsCode: "B4161", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "can", label: "14.1 oz can (powder)", gramsPerUnit: 400 }] },
  { name: "Neocate Junior with Prebiotics", manufacturer: "Nutricia", hcpcsCode: "B4161", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "can", label: "14.1 oz can (powder)", gramsPerUnit: 400 }] },
  { name: "Neocate Syneo Infant", manufacturer: "Nutricia", hcpcsCode: "B4161", kcalPerMl: 0.6763, kcalPerGram: 5.0, isPowder: true, packaging: [{ type: "can", label: "14.1 oz can", gramsPerUnit: 400 }] },
  // Nutricia - PurAmino (Amino Acid)
  { name: "PurAmino", manufacturer: "Nutricia", hcpcsCode: "B4161", kcalPerMl: 0.6763, kcalPerGram: 5.0, isPowder: true, packaging: [{ type: "can", label: "14.1 oz can", gramsPerUnit: 400 }] },
  { name: "PurAmino Junior", manufacturer: "Nutricia", hcpcsCode: "B4161", kcalPerMl: 0.6763, kcalPerGram: null, packaging: [{ type: "carton", label: "8.45 fl oz carton", mlPerUnit: 250, kcalPerUnit: 168 }] },
  // Mead Johnson - Nutramigen (Extensively Hydrolyzed)
  { name: "Nutramigen", manufacturer: "Mead Johnson", hcpcsCode: "B4161", kcalPerMl: 0.6763, kcalPerGram: 5.1, isPowder: true, packaging: [{ type: "can", label: "12.6 oz can (powder)", gramsPerUnit: 357 }, { type: "bottle", label: "2 fl oz RTF bottle", mlPerUnit: 59 }, { type: "bottle", label: "6 fl oz RTF bottle", mlPerUnit: 177 }, { type: "carton", label: "32 fl oz RTF carton", mlPerUnit: 946 }] },
  { name: "Nutramigen (Ready-to-Feed)", manufacturer: "Mead Johnson", hcpcsCode: "B4161", kcalPerMl: 0.6763, kcalPerGram: null, packaging: [{ type: "bottle", label: "2 fl oz bottle", mlPerUnit: 59 }, { type: "bottle", label: "6 fl oz bottle", mlPerUnit: 177 }, { type: "carton", label: "32 fl oz carton", mlPerUnit: 946 }] },
  { name: "Nutramigen (Powder)", manufacturer: "Mead Johnson", hcpcsCode: "B4161", kcalPerMl: null, kcalPerGram: 5.1, isPowder: true, packaging: [{ type: "can", label: "12.6 oz can", gramsPerUnit: 357 }, { type: "can", label: "19.8 oz can", gramsPerUnit: 561 }] },
  { name: "Nutramigen with Enflora LGG", manufacturer: "Mead Johnson", hcpcsCode: "B4161", kcalPerMl: 0.6763, kcalPerGram: 5.1, isPowder: true, packaging: [{ type: "can", label: "12.6 oz can (powder)", gramsPerUnit: 357 }] },
  { name: "Nutramigen A+ with LGG", manufacturer: "Mead Johnson", hcpcsCode: "B4161", kcalPerMl: 0.6763, kcalPerGram: 5.1, isPowder: true, packaging: [{ type: "can", label: "12.6 oz can (powder)", gramsPerUnit: 357 }] },
  { name: "Nutramigen Toddler", manufacturer: "Mead Johnson", hcpcsCode: "B4161", kcalPerMl: 0.6763, kcalPerGram: null, packaging: [{ type: "can", label: "12.6 oz can (powder)", gramsPerUnit: 357 }] },
  // Mead Johnson - Pregestimil
  { name: "Pregestimil", manufacturer: "Mead Johnson", hcpcsCode: "B4161", kcalPerMl: 0.6763, kcalPerGram: 5.1, isPowder: true, packaging: [{ type: "can", label: "16 oz can", gramsPerUnit: 454 }] },
  { name: "Pregestimil (Powder)", manufacturer: "Mead Johnson", hcpcsCode: "B4161", kcalPerMl: null, kcalPerGram: 5.1, isPowder: true, packaging: [{ type: "can", label: "16 oz can", gramsPerUnit: 454 }] },
  // Kate Farms Pediatric Peptide
  { name: "Kate Farms Pediatric Peptide 1.0", manufacturer: "Kate Farms", hcpcsCode: "B4161", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "carton", label: "8.45 fl oz carton", mlPerUnit: 250, kcalPerUnit: 250 }] },
  { name: "Kate Farms Pediatric Peptide 1.5", manufacturer: "Kate Farms", hcpcsCode: "B4161", kcalPerMl: 1.5, kcalPerGram: null, packaging: [{ type: "carton", label: "8.45 fl oz carton", mlPerUnit: 250, kcalPerUnit: 375 }] },

  // ══════════════════════════════════════════════════════════════════════════════
  // B4162: Pediatric, inherited disease of metabolism
  // ══════════════════════════════════════════════════════════════════════════════
  // Abbott "-1" powders: All 480 kcal per 100g = 4.8 kcal/g
  { name: "Phenex-1 (PKU)", manufacturer: "Abbott", hcpcsCode: "B4162", kcalPerMl: null, kcalPerGram: 4.8, isPowder: true, packaging: [{ type: "can", label: "14.1 oz can", gramsPerUnit: 400 }] },
  { name: "Glutarex-1 (Glutaric Aciduria)", manufacturer: "Abbott", hcpcsCode: "B4162", kcalPerMl: null, kcalPerGram: 4.8, isPowder: true, packaging: [{ type: "can", label: "14.1 oz can", gramsPerUnit: 400 }] },
  { name: "Hominex-1 (Homocystinuria)", manufacturer: "Abbott", hcpcsCode: "B4162", kcalPerMl: null, kcalPerGram: 4.8, isPowder: true, packaging: [{ type: "can", label: "14.1 oz can", gramsPerUnit: 400 }] },
  { name: "Ketonex-1 (MSUD)", manufacturer: "Abbott", hcpcsCode: "B4162", kcalPerMl: null, kcalPerGram: 4.8, isPowder: true, packaging: [{ type: "can", label: "14.1 oz can", gramsPerUnit: 400 }] },
  { name: "Propimex-1 (Propionic/Methylmalonic)", manufacturer: "Abbott", hcpcsCode: "B4162", kcalPerMl: null, kcalPerGram: 4.8, isPowder: true, packaging: [{ type: "can", label: "14.1 oz can", gramsPerUnit: 400 }] },
  { name: "Tyrex-1 (Tyrosinemia)", manufacturer: "Abbott", hcpcsCode: "B4162", kcalPerMl: null, kcalPerGram: 4.8, isPowder: true, packaging: [{ type: "can", label: "14.1 oz can", gramsPerUnit: 400 }] },
  { name: "Cyclinex-1 (Urea Cycle Disorders)", manufacturer: "Abbott", hcpcsCode: "B4162", kcalPerMl: null, kcalPerGram: 4.8, isPowder: true, packaging: [{ type: "can", label: "14.1 oz can", gramsPerUnit: 400 }] },
  { name: "I-Valex-1 (Isovaleric Acidemia)", manufacturer: "Abbott", hcpcsCode: "B4162", kcalPerMl: null, kcalPerGram: 4.8, isPowder: true, packaging: [{ type: "can", label: "14.1 oz can", gramsPerUnit: 400 }] },
  // Nutricia Infant/Pediatric Metabolic
  { name: "PKU Anamix Infant", manufacturer: "Nutricia", hcpcsCode: "B4162", kcalPerMl: 0.6763, kcalPerGram: null, packaging: [{ type: "can", label: "400g can", gramsPerUnit: 400 }] },
  { name: "PKU Anamix First Spoon", manufacturer: "Nutricia", hcpcsCode: "B4162", kcalPerMl: null, kcalPerGram: null, packaging: [{ type: "can", label: "200g can", gramsPerUnit: 200 }] },
  { name: "Neocate Infant DHA/ARA", manufacturer: "Nutricia", hcpcsCode: "B4162", kcalPerMl: 0.6763, kcalPerGram: 5.0, isPowder: true, packaging: [{ type: "can", label: "14.1 oz can", gramsPerUnit: 400 }] },
  { name: "Neocate Nutra", manufacturer: "Nutricia", hcpcsCode: "B4162", kcalPerMl: null, kcalPerGram: null, packaging: [{ type: "can", label: "400g can", gramsPerUnit: 400 }] },
  { name: "MSUD Anamix Infant", manufacturer: "Nutricia", hcpcsCode: "B4162", kcalPerMl: 0.6763, kcalPerGram: null, packaging: [{ type: "can", label: "400g can", gramsPerUnit: 400 }] },
  { name: "UCD Anamix Infant", manufacturer: "Nutricia", hcpcsCode: "B4162", kcalPerMl: 0.6763, kcalPerGram: null, packaging: [{ type: "can", label: "400g can", gramsPerUnit: 400 }] },
  { name: "HCU Anamix Infant", manufacturer: "Nutricia", hcpcsCode: "B4162", kcalPerMl: 0.6763, kcalPerGram: null, packaging: [{ type: "can", label: "400g can", gramsPerUnit: 400 }] },
  { name: "TYR Anamix Infant", manufacturer: "Nutricia", hcpcsCode: "B4162", kcalPerMl: 0.6763, kcalPerGram: null, packaging: [{ type: "can", label: "400g can", gramsPerUnit: 400 }] },
  { name: "MMA/PA Anamix Infant", manufacturer: "Nutricia", hcpcsCode: "B4162", kcalPerMl: 0.6763, kcalPerGram: null, packaging: [{ type: "can", label: "400g can", gramsPerUnit: 400 }] },
  { name: "GA Anamix Infant (Glutaric Aciduria)", manufacturer: "Nutricia", hcpcsCode: "B4162", kcalPerMl: 0.6763, kcalPerGram: null, packaging: [{ type: "can", label: "400g can", gramsPerUnit: 400 }] },
  // Vitaflo/Nestle Pediatric Metabolic
  { name: "PKU Gel (Pediatric)", manufacturer: "Vitaflo/Nestle", hcpcsCode: "B4162", kcalPerMl: null, kcalPerGram: 3.5, isPowder: true, packaging: [{ type: "packet", label: "24g sachet", gramsPerUnit: 24, kcalPerUnit: 84 }] },
  { name: "PKU Start", manufacturer: "Vitaflo/Nestle", hcpcsCode: "B4162", kcalPerMl: null, kcalPerGram: null, packaging: [{ type: "can", label: "400g can", gramsPerUnit: 400 }] },
  { name: "PKU Infant", manufacturer: "Vitaflo/Nestle", hcpcsCode: "B4162", kcalPerMl: 0.6763, kcalPerGram: null, packaging: [{ type: "can", label: "400g can", gramsPerUnit: 400 }] },
  { name: "Milupa PKU 1", manufacturer: "Nutricia", hcpcsCode: "B4162", kcalPerMl: null, kcalPerGram: 3.8, isPowder: true, packaging: [{ type: "can", label: "500g can", gramsPerUnit: 500 }] },
  { name: "Milupa PKU 2", manufacturer: "Nutricia", hcpcsCode: "B4162", kcalPerMl: null, kcalPerGram: 3.8, isPowder: true, packaging: [{ type: "can", label: "500g can", gramsPerUnit: 500 }] },
  // Ajinomoto Cambrooke Pediatric
  { name: "Glytactin BetterMilk (PKU)", manufacturer: "Ajinomoto Cambrooke", hcpcsCode: "B4162", kcalPerMl: null, kcalPerGram: null, packaging: [{ type: "packet", label: "1.4 oz packet", gramsPerUnit: 40 }] },
  { name: "Essential Amino Acid Mix", manufacturer: "Ajinomoto Cambrooke", hcpcsCode: "B4162", kcalPerMl: null, kcalPerGram: null, packaging: [{ type: "can", label: "200g can", gramsPerUnit: 200 }] },
  // Mead Johnson Metabolic
  { name: "Lofenalac (PKU)", manufacturer: "Mead Johnson", hcpcsCode: "B4162", kcalPerMl: 0.6763, kcalPerGram: 4.6, isPowder: true, packaging: [{ type: "can", label: "14.1 oz can", gramsPerUnit: 400 }] },
  { name: "Phenyl-Free 1 (PKU)", manufacturer: "Mead Johnson", hcpcsCode: "B4162", kcalPerMl: null, kcalPerGram: 4.6, isPowder: true, packaging: [{ type: "can", label: "1 lb can", gramsPerUnit: 454 }] },
  { name: "Phenyl-Free 2HP (PKU)", manufacturer: "Mead Johnson", hcpcsCode: "B4162", kcalPerMl: null, kcalPerGram: 4.6, isPowder: true, packaging: [{ type: "can", label: "1 lb can", gramsPerUnit: 454 }] },
  { name: "MSUD Diet Powder", manufacturer: "Mead Johnson", hcpcsCode: "B4162", kcalPerMl: null, kcalPerGram: 4.5, isPowder: true, packaging: [{ type: "can", label: "1 lb can", gramsPerUnit: 454 }] },
  // Abbott Infant Specialty (may also fit B4162)
  { name: "EleCare (Infant)", manufacturer: "Abbott", hcpcsCode: "B4162", kcalPerMl: 0.6763, kcalPerGram: 5.0, isPowder: true, packaging: [{ type: "can", label: "14.1 oz can", gramsPerUnit: 400 }] },
  { name: "EleCare Infant DHA/ARA", manufacturer: "Abbott", hcpcsCode: "B4162", kcalPerMl: 0.6763, kcalPerGram: 5.0, isPowder: true, packaging: [{ type: "can", label: "14.1 oz can", gramsPerUnit: 400 }] },
]

// ─── Utility functions ─────────────────────────────────────────────────────────

export function getProductsByCode(code: string): EnteralProduct[] {
  return ENTERAL_PRODUCTS
    .filter((p) => p.hcpcsCode === code)
    .sort((a, b) => a.name.localeCompare(b.name))
}

export function getHcpcsCode(code: string): HcpcsCode | undefined {
  return HCPCS_CODES.find((c) => c.code === code)
}

// Conversion: 1 oz = 29.5735 mL
export const OZ_TO_ML = 29.5735

// Conversion: 1 g ≈ 1 mL for enteral formulas (specific gravity ~1.0)
export const G_TO_ML = 1.0
