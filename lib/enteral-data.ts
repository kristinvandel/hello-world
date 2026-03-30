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
  { name: "Compleat Organic Blends (Chicken Garden)", manufacturer: "Nestle", hcpcsCode: "B4149", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Compleat Organic Blends (Plant-Based)", manufacturer: "Nestle", hcpcsCode: "B4149", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Compleat Organic Blends (Pediatric Chicken)", manufacturer: "Nestle", hcpcsCode: "B4149", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Compleat Organic Blends (Pediatric Plant)", manufacturer: "Nestle", hcpcsCode: "B4149", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Kate Farms Organic Standard 1.0 (Vanilla)", manufacturer: "Kate Farms", hcpcsCode: "B4149", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Kate Farms Organic Standard 1.0 (Chocolate)", manufacturer: "Kate Farms", hcpcsCode: "B4149", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Liquid Hope", manufacturer: "Functional Formularies", hcpcsCode: "B4149", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Liquid Hope Peptide", manufacturer: "Functional Formularies", hcpcsCode: "B4149", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Nourish", manufacturer: "Functional Formularies", hcpcsCode: "B4149", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Nourish Pediatric", manufacturer: "Functional Formularies", hcpcsCode: "B4149", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Real Food Blends (Salmon/Oats/Squash)", manufacturer: "Real Food Blends", hcpcsCode: "B4149", kcalPerMl: 0.7, kcalPerGram: null },
  { name: "Real Food Blends (Beef/Potatoes/Spinach)", manufacturer: "Real Food Blends", hcpcsCode: "B4149", kcalPerMl: 0.7, kcalPerGram: null },
  { name: "Real Food Blends (Eggs/Apples/Oats)", manufacturer: "Real Food Blends", hcpcsCode: "B4149", kcalPerMl: 0.7, kcalPerGram: null },
  { name: "Real Food Blends (Turkey/Sweet Potatoes/Peaches)", manufacturer: "Real Food Blends", hcpcsCode: "B4149", kcalPerMl: 0.7, kcalPerGram: null },
  { name: "Real Food Blends (Orange Chicken/Brown Rice/Carrots)", manufacturer: "Real Food Blends", hcpcsCode: "B4149", kcalPerMl: 0.7, kcalPerGram: null },
  { name: "Real Food Blends (Quinoa/Kale/Hemp)", manufacturer: "Real Food Blends", hcpcsCode: "B4149", kcalPerMl: 0.7, kcalPerGram: null },

  // ══════════════════════════════════════════════════════════════════════════════
  // B4150: Nutritionally complete, intact nutrients
  // ══════════════════════════════════════════════════════════════════════════════
  // Abbott
  { name: "Osmolite 1 Cal", manufacturer: "Abbott", hcpcsCode: "B4150", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Osmolite 1.2 Cal", manufacturer: "Abbott", hcpcsCode: "B4150", kcalPerMl: 1.2, kcalPerGram: null },
  { name: "Jevity 1 Cal", manufacturer: "Abbott", hcpcsCode: "B4150", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Jevity 1.2 Cal", manufacturer: "Abbott", hcpcsCode: "B4150", kcalPerMl: 1.2, kcalPerGram: null },
  { name: "Promote", manufacturer: "Abbott", hcpcsCode: "B4150", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Promote with Fiber", manufacturer: "Abbott", hcpcsCode: "B4150", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Ensure", manufacturer: "Abbott", hcpcsCode: "B4150", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "bottle", label: "8 fl oz bottle", mlPerUnit: 237, kcalPerUnit: 237 }, { type: "carton", label: "1000 mL carton", mlPerUnit: 1000, kcalPerUnit: 1000 }] },
  { name: "Ensure with Fiber", manufacturer: "Abbott", hcpcsCode: "B4150", kcalPerMl: 1.1, kcalPerGram: null, packaging: [{ type: "bottle", label: "8 fl oz bottle", mlPerUnit: 237, kcalPerUnit: 261 }, { type: "can", label: "8 fl oz can", mlPerUnit: 237, kcalPerUnit: 261 }] },
  { name: "Ensure High Protein", manufacturer: "Abbott", hcpcsCode: "B4150", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "bottle", label: "8 fl oz bottle", mlPerUnit: 237, kcalPerUnit: 237 }] },
  { name: "Ensure Original", manufacturer: "Abbott", hcpcsCode: "B4150", kcalPerMl: 1.06, kcalPerGram: null, packaging: [{ type: "bottle", label: "8 fl oz bottle", mlPerUnit: 237, kcalPerUnit: 250 }] },
  { name: "Ensure Clear", manufacturer: "Abbott", hcpcsCode: "B4150", kcalPerMl: 0.9, kcalPerGram: null },
  { name: "Ensure Max Protein", manufacturer: "Abbott", hcpcsCode: "B4150", kcalPerMl: 0.68, kcalPerGram: null },
  // Nestle
  { name: "Fibersource HN", manufacturer: "Nestle", hcpcsCode: "B4150", kcalPerMl: 1.2, kcalPerGram: null },
  { name: "Isosource HN", manufacturer: "Nestle", hcpcsCode: "B4150", kcalPerMl: 1.2, kcalPerGram: null },
  { name: "Isosource 1.5 Cal", manufacturer: "Nestle", hcpcsCode: "B4150", kcalPerMl: 1.5, kcalPerGram: null },
  { name: "Nutren 1.0", manufacturer: "Nestle", hcpcsCode: "B4150", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Nutren 1.0 Fiber", manufacturer: "Nestle", hcpcsCode: "B4150", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Compleat Standard 1.0", manufacturer: "Nestle", hcpcsCode: "B4150", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Compleat Standard 1.4", manufacturer: "Nestle", hcpcsCode: "B4150", kcalPerMl: 1.4, kcalPerGram: null },
  { name: "Impact (with Fiber)", manufacturer: "Nestle", hcpcsCode: "B4150", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Impact 1.5", manufacturer: "Nestle", hcpcsCode: "B4150", kcalPerMl: 1.5, kcalPerGram: null },
  { name: "Boost", manufacturer: "Nestle", hcpcsCode: "B4150", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Boost High Protein", manufacturer: "Nestle", hcpcsCode: "B4150", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Boost Original", manufacturer: "Nestle", hcpcsCode: "B4150", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Boost Glucose Control", manufacturer: "Nestle", hcpcsCode: "B4150", kcalPerMl: 0.95, kcalPerGram: null },
  { name: "Resource 2.0", manufacturer: "Nestle", hcpcsCode: "B4150", kcalPerMl: 2.0, kcalPerGram: null },
  // Kate Farms
  { name: "Kate Farms Standard 1.0", manufacturer: "Kate Farms", hcpcsCode: "B4150", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Kate Farms Standard 1.4", manufacturer: "Kate Farms", hcpcsCode: "B4150", kcalPerMl: 1.4, kcalPerGram: null },
  // Mead Johnson
  { name: "Sustacal", manufacturer: "Mead Johnson", hcpcsCode: "B4150", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Sustacal with Fiber", manufacturer: "Mead Johnson", hcpcsCode: "B4150", kcalPerMl: 1.0, kcalPerGram: null },

  // ══════════════════════════════════════════════════════════════════════════════
  // B4152: Calorically dense (>=1.5 kcal/mL)
  // ══════════════════════════════════════════════════════════════════════════════
  // Abbott
  { name: "Osmolite 1.5 Cal", manufacturer: "Abbott", hcpcsCode: "B4152", kcalPerMl: 1.5, kcalPerGram: null },
  { name: "Jevity 1.5 Cal", manufacturer: "Abbott", hcpcsCode: "B4152", kcalPerMl: 1.5, kcalPerGram: null },
  { name: "Ensure Plus", manufacturer: "Abbott", hcpcsCode: "B4152", kcalPerMl: 1.5, kcalPerGram: null },
  { name: "Ensure Plus Calories", manufacturer: "Abbott", hcpcsCode: "B4152", kcalPerMl: 1.5, kcalPerGram: null },
  { name: "Ensure Enlive", manufacturer: "Abbott", hcpcsCode: "B4152", kcalPerMl: 1.5, kcalPerGram: null },
  { name: "Ensure Compact", manufacturer: "Abbott", hcpcsCode: "B4152", kcalPerMl: 2.2, kcalPerGram: null },
  { name: "TwoCal HN", manufacturer: "Abbott", hcpcsCode: "B4152", kcalPerMl: 2.0, kcalPerGram: null },
  // Nestle
  { name: "Nutren 1.5", manufacturer: "Nestle", hcpcsCode: "B4152", kcalPerMl: 1.5, kcalPerGram: null },
  { name: "Nutren 2.0", manufacturer: "Nestle", hcpcsCode: "B4152", kcalPerMl: 2.0, kcalPerGram: null },
  { name: "Boost Plus", manufacturer: "Nestle", hcpcsCode: "B4152", kcalPerMl: 1.5, kcalPerGram: null },
  { name: "Boost VHC (Very High Calorie)", manufacturer: "Nestle", hcpcsCode: "B4152", kcalPerMl: 2.3, kcalPerGram: null },
  { name: "Boost Max", manufacturer: "Nestle", hcpcsCode: "B4152", kcalPerMl: 1.86, kcalPerGram: null },
  { name: "Isosource 1.5 Cal", manufacturer: "Nestle", hcpcsCode: "B4152", kcalPerMl: 1.5, kcalPerGram: null },
  // Kate Farms
  { name: "Kate Farms Standard 1.4", manufacturer: "Kate Farms", hcpcsCode: "B4152", kcalPerMl: 1.4, kcalPerGram: null },

  // ══════════════════════════════════════════════════════════════════════════════
  // B4153: Hydrolyzed proteins / Semi-elemental / Elemental
  // ══════════════════════════════════════════════════════════════════════════════
  // Abbott - Adult
  { name: "Vital 1.0 Cal", manufacturer: "Abbott", hcpcsCode: "B4153", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Vital AF 1.2 Cal", manufacturer: "Abbott", hcpcsCode: "B4153", kcalPerMl: 1.2, kcalPerGram: null },
  { name: "Vital 1.5 Cal", manufacturer: "Abbott", hcpcsCode: "B4153", kcalPerMl: 1.5, kcalPerGram: null },
  { name: "Vital High Protein", manufacturer: "Abbott", hcpcsCode: "B4153", kcalPerMl: 1.0, kcalPerGram: null },
  // Nestle - Adult
  { name: "Peptamen", manufacturer: "Nestle", hcpcsCode: "B4153", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Peptamen AF", manufacturer: "Nestle", hcpcsCode: "B4153", kcalPerMl: 1.2, kcalPerGram: null },
  { name: "Peptamen 1.5", manufacturer: "Nestle", hcpcsCode: "B4153", kcalPerMl: 1.5, kcalPerGram: null },
  { name: "Peptamen Intense VHP", manufacturer: "Nestle", hcpcsCode: "B4153", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Peptamen with Prebio1", manufacturer: "Nestle", hcpcsCode: "B4153", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Peptamen Bariatric", manufacturer: "Nestle", hcpcsCode: "B4153", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Compleat Peptide 1.5", manufacturer: "Nestle", hcpcsCode: "B4153", kcalPerMl: 1.5, kcalPerGram: null },
  { name: "Impact Peptide 1.5", manufacturer: "Nestle", hcpcsCode: "B4153", kcalPerMl: 1.5, kcalPerGram: null },
  { name: "Tolerex", manufacturer: "Nestle", hcpcsCode: "B4153", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Vivonex T.E.N.", manufacturer: "Nestle", hcpcsCode: "B4153", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Vivonex Plus", manufacturer: "Nestle", hcpcsCode: "B4153", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Vivonex RTF", manufacturer: "Nestle", hcpcsCode: "B4153", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Vivonex Pediatric", manufacturer: "Nestle", hcpcsCode: "B4153", kcalPerMl: 0.8, kcalPerGram: null },
  // Kate Farms - Adult
  { name: "Kate Farms Peptide 1.0", manufacturer: "Kate Farms", hcpcsCode: "B4153", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Kate Farms Peptide 1.5", manufacturer: "Kate Farms", hcpcsCode: "B4153", kcalPerMl: 1.5, kcalPerGram: null },
  // Nutricia - Elemental formulas
  { name: "Neocate Splash", manufacturer: "Nutricia", hcpcsCode: "B4153", kcalPerMl: 0.67, kcalPerGram: null },
  { name: "E028 Splash", manufacturer: "Nutricia", hcpcsCode: "B4153", kcalPerMl: 0.86, kcalPerGram: null },
  // Mead Johnson
  { name: "Pregestimil", manufacturer: "Mead Johnson", hcpcsCode: "B4153", kcalPerMl: 0.67, kcalPerGram: 5.1, isPowder: true },
  // Ajinomoto Cambrooke
  { name: "Essential Care Jr", manufacturer: "Ajinomoto Cambrooke", hcpcsCode: "B4153", kcalPerMl: 1.0, kcalPerGram: null },

  // ══════════════════════════════════════════════════════════════════════════════
  // B4154: Special metabolic needs (not inherited)
  // ══════════════════════════════════════════════════════════════════════════════
  // Abbott - Diabetes/Glucose Control
  { name: "Glucerna 1.0 Cal", manufacturer: "Abbott", hcpcsCode: "B4154", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Glucerna 1.2 Cal", manufacturer: "Abbott", hcpcsCode: "B4154", kcalPerMl: 1.2, kcalPerGram: null },
  { name: "Glucerna 1.5 Cal", manufacturer: "Abbott", hcpcsCode: "B4154", kcalPerMl: 1.5, kcalPerGram: null },
  { name: "Glucerna Hunger Smart", manufacturer: "Abbott", hcpcsCode: "B4154", kcalPerMl: 0.93, kcalPerGram: null },
  // Abbott - Renal
  { name: "Nepro with Carb Steady", manufacturer: "Abbott", hcpcsCode: "B4154", kcalPerMl: 1.8, kcalPerGram: null },
  { name: "Suplena with Carb Steady", manufacturer: "Abbott", hcpcsCode: "B4154", kcalPerMl: 1.8, kcalPerGram: null },
  // Abbott - Pulmonary
  { name: "Pulmocare", manufacturer: "Abbott", hcpcsCode: "B4154", kcalPerMl: 1.5, kcalPerGram: null },
  { name: "Oxepa", manufacturer: "Abbott", hcpcsCode: "B4154", kcalPerMl: 1.5, kcalPerGram: null },
  // Abbott - Critical Care/Immune
  { name: "Perative", manufacturer: "Abbott", hcpcsCode: "B4154", kcalPerMl: 1.3, kcalPerGram: null },
  { name: "Pivot 1.5 Cal", manufacturer: "Abbott", hcpcsCode: "B4154", kcalPerMl: 1.5, kcalPerGram: null },
  // Nestle - Renal
  { name: "Novasource Renal", manufacturer: "Nestle", hcpcsCode: "B4154", kcalPerMl: 2.0, kcalPerGram: null },
  { name: "Nutren Renal", manufacturer: "Nestle", hcpcsCode: "B4154", kcalPerMl: 2.0, kcalPerGram: null },
  { name: "Renalcal", manufacturer: "Nestle", hcpcsCode: "B4154", kcalPerMl: 2.0, kcalPerGram: null },
  // Nestle - Pulmonary
  { name: "Nutren Pulmonary", manufacturer: "Nestle", hcpcsCode: "B4154", kcalPerMl: 1.5, kcalPerGram: null },
  { name: "NutriHep", manufacturer: "Nestle", hcpcsCode: "B4154", kcalPerMl: 1.5, kcalPerGram: null },
  // Nestle - Diabetes/Glucose Control
  { name: "Diabetisource AC", manufacturer: "Nestle", hcpcsCode: "B4154", kcalPerMl: 1.2, kcalPerGram: null },
  { name: "Glytrol", manufacturer: "Nestle", hcpcsCode: "B4154", kcalPerMl: 1.0, kcalPerGram: null },
  // Nestle - Critical Care/Immune
  { name: "Impact Advanced Recovery", manufacturer: "Nestle", hcpcsCode: "B4154", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Impact Glutamine", manufacturer: "Nestle", hcpcsCode: "B4154", kcalPerMl: 1.3, kcalPerGram: null },
  // Kate Farms
  { name: "Kate Farms Glucose Support 1.2", manufacturer: "Kate Farms", hcpcsCode: "B4154", kcalPerMl: 1.2, kcalPerGram: null },
  { name: "Kate Farms Renal Support 1.8", manufacturer: "Kate Farms", hcpcsCode: "B4154", kcalPerMl: 1.8, kcalPerGram: null },
  // Hormel
  { name: "Hormel Vital Cuisine", manufacturer: "Hormel", hcpcsCode: "B4154", kcalPerMl: 1.06, kcalPerGram: null },

  // ══════════════════════════════════════════════════════════════════════════════
  // B4155: Modular/Incomplete nutrients (Additives)
  // ══════════════════════════════════════════════════════════════════════════════
  // ─── Protein Modulars ─────────────────────────────────────────────────────────
  { name: "Beneprotein (Protein Powder)", manufacturer: "Nestle", hcpcsCode: "B4155", kcalPerMl: null, kcalPerGram: 3.6, isPowder: true, packaging: [{ type: "packet", label: "7g packet", gramsPerUnit: 7, kcalPerUnit: 25 }, { type: "tub", label: "8 oz canister", gramsPerUnit: 227 }] },
  { name: "Beneprotein (Instant Protein Powder)", manufacturer: "Nestle", hcpcsCode: "B4155", kcalPerMl: null, kcalPerGram: 3.6, isPowder: true, packaging: [{ type: "packet", label: "7g packet", gramsPerUnit: 7, kcalPerUnit: 25 }] },
  { name: "ProMod Liquid Protein", manufacturer: "Abbott", hcpcsCode: "B4155", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "ProPass Protein Powder", manufacturer: "Hormel", hcpcsCode: "B4155", kcalPerMl: null, kcalPerGram: 3.0, isPowder: true },
  { name: "Juven (Arginine/Glutamine/HMB)", manufacturer: "Abbott", hcpcsCode: "B4155", kcalPerMl: null, kcalPerGram: 3.3, isPowder: true },
  { name: "Arginaid", manufacturer: "Nestle", hcpcsCode: "B4155", kcalPerMl: null, kcalPerGram: 3.8, isPowder: true },
  { name: "Arginaid Extra", manufacturer: "Nestle", hcpcsCode: "B4155", kcalPerMl: 0.5, kcalPerGram: null },
  { name: "Glutasolve", manufacturer: "Nestle", hcpcsCode: "B4155", kcalPerMl: null, kcalPerGram: 3.5, isPowder: true },
  { name: "Resource Glutamine", manufacturer: "Nestle", hcpcsCode: "B4155", kcalPerMl: null, kcalPerGram: 3.5, isPowder: true },
  { name: "Prosource Protein Powder", manufacturer: "Medtrition", hcpcsCode: "B4155", kcalPerMl: null, kcalPerGram: 3.0, isPowder: true },
  { name: "Prosource Liquid Protein", manufacturer: "Medtrition", hcpcsCode: "B4155", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Prosource NoCarb", manufacturer: "Medtrition", hcpcsCode: "B4155", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Gelatein Plus", manufacturer: "Medtrition", hcpcsCode: "B4155", kcalPerMl: 0.88, kcalPerGram: null },
  { name: "Proteinex", manufacturer: "Llorens Pharmaceutical", hcpcsCode: "B4155", kcalPerMl: 0.67, kcalPerGram: null },
  { name: "Proteinex 2G", manufacturer: "Llorens Pharmaceutical", hcpcsCode: "B4155", kcalPerMl: null, kcalPerGram: 3.5, isPowder: true },
  // ─── Carbohydrate Modulars ────────────────────────────────────────────────────
  { name: "Polycose (Liquid)", manufacturer: "Abbott", hcpcsCode: "B4155", kcalPerMl: 2.0, kcalPerGram: null },
  { name: "Polycose (Powder)", manufacturer: "Abbott", hcpcsCode: "B4155", kcalPerMl: null, kcalPerGram: 3.8, isPowder: true },
  { name: "Moducal (Powder)", manufacturer: "Nestle", hcpcsCode: "B4155", kcalPerMl: null, kcalPerGram: 3.8, isPowder: true },
  { name: "SolCarb (Powder)", manufacturer: "Solace Nutrition", hcpcsCode: "B4155", kcalPerMl: null, kcalPerGram: 3.9, isPowder: true },
  // ─── Fat Modulars ─────────────────────────────────────────────────────────────
  { name: "MCT Oil", manufacturer: "Various", hcpcsCode: "B4155", kcalPerMl: 7.7, kcalPerGram: null },
  { name: "MCT Oil (Nestle)", manufacturer: "Nestle", hcpcsCode: "B4155", kcalPerMl: 7.7, kcalPerGram: null },
  { name: "MCT Oil (Nutricia)", manufacturer: "Nutricia", hcpcsCode: "B4155", kcalPerMl: 7.7, kcalPerGram: null },
  { name: "Microlipid", manufacturer: "Nestle", hcpcsCode: "B4155", kcalPerMl: 4.5, kcalPerGram: null },
  { name: "Liquigen", manufacturer: "Nutricia", hcpcsCode: "B4155", kcalPerMl: 4.5, kcalPerGram: null },
  // ─── Combined Calorie Modulars (Fat + Carb) ───────────────────────────────────
  { name: "Duocal (Powder)", manufacturer: "Nutricia", hcpcsCode: "B4155", kcalPerMl: null, kcalPerGram: 4.9, isPowder: true, packaging: [{ type: "tub", label: "400g can", gramsPerUnit: 400 }] },
  { name: "Duocal Liquid", manufacturer: "Nutricia", hcpcsCode: "B4155", kcalPerMl: 1.5, kcalPerGram: null },
  { name: "Duocal Super Soluble", manufacturer: "Nutricia", hcpcsCode: "B4155", kcalPerMl: null, kcalPerGram: 4.9, isPowder: true, packaging: [{ type: "tub", label: "400g can", gramsPerUnit: 400 }] },
  { name: "Benecalorie", manufacturer: "Nestle", hcpcsCode: "B4155", kcalPerMl: 7.2, kcalPerGram: null, packaging: [{ type: "bottle", label: "1.5 fl oz bottle", mlPerUnit: 44, kcalPerUnit: 330 }] },
  { name: "CaloriSmart", manufacturer: "Medtrition", hcpcsCode: "B4155", kcalPerMl: null, kcalPerGram: 4.0, isPowder: true },
  // ─── Fiber Modulars ───────────────────────────────────────────────────────────
  { name: "Resource Benefiber", manufacturer: "Nestle", hcpcsCode: "B4155", kcalPerMl: null, kcalPerGram: 2.0, isPowder: true },
  { name: "Nutrisource Fiber (Powder)", manufacturer: "Nestle", hcpcsCode: "B4155", kcalPerMl: null, kcalPerGram: 1.0, isPowder: true },
  { name: "FiberChoice", manufacturer: "Bayer", hcpcsCode: "B4155", kcalPerMl: null, kcalPerGram: null },
  // ─── Specialty Modulars ───────────────────────────────────────────────────────
  { name: "Scandishake (Powder)", manufacturer: "Scandipharm", hcpcsCode: "B4155", kcalPerMl: null, kcalPerGram: 5.3, isPowder: true },
  { name: "Scandishake Mix", manufacturer: "Axcan Scandipharm", hcpcsCode: "B4155", kcalPerMl: null, kcalPerGram: 5.3, isPowder: true },
  { name: "Super Soluble Duocal", manufacturer: "Nutricia", hcpcsCode: "B4155", kcalPerMl: null, kcalPerGram: 4.9, isPowder: true },
  { name: "Nutrisource Carbohydrate", manufacturer: "Nestle", hcpcsCode: "B4155", kcalPerMl: null, kcalPerGram: 3.8, isPowder: true },
  { name: "Nutrisource Lipid", manufacturer: "Nestle", hcpcsCode: "B4155", kcalPerMl: 4.5, kcalPerGram: null },
  { name: "ProSource Gelatein 20", manufacturer: "Medtrition", hcpcsCode: "B4155", kcalPerMl: 0.88, kcalPerGram: null },
  { name: "ProSource TF", manufacturer: "Medtrition", hcpcsCode: "B4155", kcalPerMl: null, kcalPerGram: 3.5, isPowder: true },

  // ══════════════════════════════════════════════════════════════════════════════
  // B4157: Inherited disease of metabolism (Adult)
  // ══════════════════════════════════════════════════════════════════════════════
  // Abbott "-2" powders: All 410 kcal per 100g = 4.1 kcal/g
  { name: "Phenex-2 (PKU)", manufacturer: "Abbott", hcpcsCode: "B4157", kcalPerMl: 0.8, kcalPerGram: 4.1, isPowder: true },
  { name: "Glutarex-2 (Glutaric Aciduria)", manufacturer: "Abbott", hcpcsCode: "B4157", kcalPerMl: 0.8, kcalPerGram: 4.1, isPowder: true },
  { name: "Hominex-2 (Homocystinuria)", manufacturer: "Abbott", hcpcsCode: "B4157", kcalPerMl: 0.8, kcalPerGram: 4.1, isPowder: true },
  { name: "Ketonex-2 (MSUD)", manufacturer: "Abbott", hcpcsCode: "B4157", kcalPerMl: 0.8, kcalPerGram: 4.1, isPowder: true },
  { name: "Propimex-2 (Propionic/Methylmalonic)", manufacturer: "Abbott", hcpcsCode: "B4157", kcalPerMl: 0.8, kcalPerGram: 4.1, isPowder: true },
  { name: "Tyrex-2 (Tyrosinemia)", manufacturer: "Abbott", hcpcsCode: "B4157", kcalPerMl: 0.8, kcalPerGram: 4.1, isPowder: true },
  { name: "Cyclinex-2 (Urea Cycle Disorders)", manufacturer: "Abbott", hcpcsCode: "B4157", kcalPerMl: 0.8, kcalPerGram: 4.1, isPowder: true },
  { name: "I-Valex-2 (Isovaleric Acidemia)", manufacturer: "Abbott", hcpcsCode: "B4157", kcalPerMl: 0.8, kcalPerGram: 4.1, isPowder: true },
  // Nutricia Adult PKU
  { name: "PKU Anamix Early Years", manufacturer: "Nutricia", hcpcsCode: "B4157", kcalPerMl: 0.7, kcalPerGram: 3.8, isPowder: true },
  { name: "PKU Anamix Junior (Powder)", manufacturer: "Nutricia", hcpcsCode: "B4157", kcalPerMl: 0.9, kcalPerGram: 3.8, isPowder: true },
  { name: "PKU Anamix Junior LQ (Liquid)", manufacturer: "Nutricia", hcpcsCode: "B4157", kcalPerMl: 0.9, kcalPerGram: null },
  { name: "PKU Lophlex LQ", manufacturer: "Nutricia", hcpcsCode: "B4157", kcalPerMl: 0.6, kcalPerGram: null },
  { name: "PKU Sphere", manufacturer: "Nutricia", hcpcsCode: "B4157", kcalPerMl: null, kcalPerGram: null },
  { name: "Phlexy-10 System (PKU)", manufacturer: "Nutricia", hcpcsCode: "B4157", kcalPerMl: null, kcalPerGram: 3.0, isPowder: true },
  { name: "UCD Anamix Junior", manufacturer: "Nutricia", hcpcsCode: "B4157", kcalPerMl: 0.9, kcalPerGram: 3.9, isPowder: true },
  { name: "MSUD Anamix Junior", manufacturer: "Nutricia", hcpcsCode: "B4157", kcalPerMl: null, kcalPerGram: 3.8, isPowder: true },
  { name: "HCU Anamix", manufacturer: "Nutricia", hcpcsCode: "B4157", kcalPerMl: null, kcalPerGram: 3.8, isPowder: true },
  { name: "TYR Anamix", manufacturer: "Nutricia", hcpcsCode: "B4157", kcalPerMl: null, kcalPerGram: 3.8, isPowder: true },
  { name: "MMA/PA Anamix", manufacturer: "Nutricia", hcpcsCode: "B4157", kcalPerMl: null, kcalPerGram: 3.8, isPowder: true },
  { name: "GA Anamix (Glutaric Aciduria)", manufacturer: "Nutricia", hcpcsCode: "B4157", kcalPerMl: null, kcalPerGram: 3.8, isPowder: true },
  // Vitaflo (Nestle)
  { name: "PKU Cooler 10", manufacturer: "Vitaflo/Nestle", hcpcsCode: "B4157", kcalPerMl: 0.6, kcalPerGram: null },
  { name: "PKU Cooler 15", manufacturer: "Vitaflo/Nestle", hcpcsCode: "B4157", kcalPerMl: 0.6, kcalPerGram: null },
  { name: "PKU Cooler 20", manufacturer: "Vitaflo/Nestle", hcpcsCode: "B4157", kcalPerMl: 0.6, kcalPerGram: null },
  { name: "PKU Express", manufacturer: "Vitaflo/Nestle", hcpcsCode: "B4157", kcalPerMl: null, kcalPerGram: 3.5, isPowder: true },
  { name: "PKU Gel", manufacturer: "Vitaflo/Nestle", hcpcsCode: "B4157", kcalPerMl: null, kcalPerGram: 3.5, isPowder: true },
  { name: "MSUD Maxamaid", manufacturer: "Nutricia", hcpcsCode: "B4157", kcalPerMl: null, kcalPerGram: 3.5, isPowder: true },
  { name: "MSUD Maxamum", manufacturer: "Nutricia", hcpcsCode: "B4157", kcalPerMl: null, kcalPerGram: 3.5, isPowder: true },
  // Ajinomoto Cambrooke
  { name: "Glytactin Build 10", manufacturer: "Ajinomoto Cambrooke", hcpcsCode: "B4157", kcalPerMl: null, kcalPerGram: null },
  { name: "Glytactin Build 20", manufacturer: "Ajinomoto Cambrooke", hcpcsCode: "B4157", kcalPerMl: null, kcalPerGram: null },
  { name: "Glytactin RTD 10", manufacturer: "Ajinomoto Cambrooke", hcpcsCode: "B4157", kcalPerMl: 0.4, kcalPerGram: null },
  { name: "Glytactin RTD 15", manufacturer: "Ajinomoto Cambrooke", hcpcsCode: "B4157", kcalPerMl: 0.52, kcalPerGram: null },
  { name: "Glytactin Complete", manufacturer: "Ajinomoto Cambrooke", hcpcsCode: "B4157", kcalPerMl: null, kcalPerGram: null },

  // ══════════════════════════════════════════════════════════════════════════════
  // B4158: Pediatric, intact nutrients
  // ══════════════════════════════════════════════════════════════════════════════
  // Abbott
  { name: "PediaSure 1.0 Cal", manufacturer: "Abbott", hcpcsCode: "B4158", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "bottle", label: "8 fl oz bottle", mlPerUnit: 237, kcalPerUnit: 237 }, { type: "can", label: "8 fl oz can", mlPerUnit: 237, kcalPerUnit: 237 }, { type: "carton", label: "1000 mL carton", mlPerUnit: 1000, kcalPerUnit: 1000 }] },
  { name: "PediaSure with Fiber", manufacturer: "Abbott", hcpcsCode: "B4158", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "bottle", label: "8 fl oz bottle", mlPerUnit: 237, kcalPerUnit: 237 }, { type: "carton", label: "1000 mL carton", mlPerUnit: 1000, kcalPerUnit: 1000 }] },
  { name: "PediaSure Enteral", manufacturer: "Abbott", hcpcsCode: "B4158", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "carton", label: "1000 mL carton", mlPerUnit: 1000, kcalPerUnit: 1000 }, { type: "bottle", label: "237 mL bottle", mlPerUnit: 237, kcalPerUnit: 237 }] },
  { name: "Similac Advance", manufacturer: "Abbott", hcpcsCode: "B4158", kcalPerMl: 0.67, kcalPerGram: 5.1, isPowder: true },
  { name: "Similac Advance Powder", manufacturer: "Abbott", hcpcsCode: "B4158", kcalPerMl: null, kcalPerGram: 5.1, isPowder: true },
  { name: "Similac PM 60/40", manufacturer: "Abbott", hcpcsCode: "B4158", kcalPerMl: 0.67, kcalPerGram: 5.1, isPowder: true },
  { name: "Similac Pro-Total Comfort", manufacturer: "Abbott", hcpcsCode: "B4158", kcalPerMl: 0.67, kcalPerGram: 5.0, isPowder: true },
  { name: "Similac NeoSure", manufacturer: "Abbott", hcpcsCode: "B4158", kcalPerMl: 0.74, kcalPerGram: 5.1, isPowder: true },
  { name: "Similac Sensitive", manufacturer: "Abbott", hcpcsCode: "B4158", kcalPerMl: 0.67, kcalPerGram: 5.0, isPowder: true },
  { name: "Similac for Supplementation", manufacturer: "Abbott", hcpcsCode: "B4158", kcalPerMl: 0.67, kcalPerGram: null },
  { name: "Similac Expert Care NeoSure", manufacturer: "Abbott", hcpcsCode: "B4158", kcalPerMl: 0.74, kcalPerGram: 5.1, isPowder: true },
  // Nestle
  { name: "Nutren Junior", manufacturer: "Nestle", hcpcsCode: "B4158", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Nutren Junior with Fiber", manufacturer: "Nestle", hcpcsCode: "B4158", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Boost Kid Essentials 1.0", manufacturer: "Nestle", hcpcsCode: "B4158", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Boost Kid Essentials 1.0 with Fiber", manufacturer: "Nestle", hcpcsCode: "B4158", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Compleat Pediatric Standard", manufacturer: "Nestle", hcpcsCode: "B4158", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Compleat Pediatric Reduced Calorie", manufacturer: "Nestle", hcpcsCode: "B4158", kcalPerMl: 0.6, kcalPerGram: null },
  { name: "Good Start (GentlePro)", manufacturer: "Nestle", hcpcsCode: "B4158", kcalPerMl: 0.67, kcalPerGram: 5.0, isPowder: true },
  { name: "Good Start Soothe", manufacturer: "Nestle", hcpcsCode: "B4158", kcalPerMl: 0.67, kcalPerGram: 5.0, isPowder: true },
  { name: "Good Start Gentle", manufacturer: "Nestle", hcpcsCode: "B4158", kcalPerMl: 0.67, kcalPerGram: 5.0, isPowder: true },
  // Kate Farms
  { name: "Kate Farms Pediatric Standard 1.0", manufacturer: "Kate Farms", hcpcsCode: "B4158", kcalPerMl: 1.0, kcalPerGram: null },
  // Mead Johnson / Reckitt
  { name: "Enfamil Infant", manufacturer: "Mead Johnson", hcpcsCode: "B4158", kcalPerMl: 0.67, kcalPerGram: 5.1, isPowder: true },
  { name: "Enfamil NeuroPro Infant", manufacturer: "Mead Johnson", hcpcsCode: "B4158", kcalPerMl: 0.67, kcalPerGram: 5.1, isPowder: true },
  { name: "Enfamil Gentlease", manufacturer: "Mead Johnson", hcpcsCode: "B4158", kcalPerMl: 0.67, kcalPerGram: 5.0, isPowder: true },
  { name: "Enfamil NeuroPro Gentlease", manufacturer: "Mead Johnson", hcpcsCode: "B4158", kcalPerMl: 0.67, kcalPerGram: 5.0, isPowder: true },
  { name: "Enfamil A.R. (Anti-Reflux)", manufacturer: "Mead Johnson", hcpcsCode: "B4158", kcalPerMl: 0.67, kcalPerGram: 5.0, isPowder: true },
  { name: "Enfamil Premium", manufacturer: "Mead Johnson", hcpcsCode: "B4158", kcalPerMl: 0.67, kcalPerGram: 5.1, isPowder: true },
  { name: "Enfamil Enspire", manufacturer: "Mead Johnson", hcpcsCode: "B4158", kcalPerMl: 0.67, kcalPerGram: 5.0, isPowder: true },
  { name: "Enfamil Reguline", manufacturer: "Mead Johnson", hcpcsCode: "B4158", kcalPerMl: 0.67, kcalPerGram: 5.0, isPowder: true },
  { name: "Enfagrow Toddler", manufacturer: "Mead Johnson", hcpcsCode: "B4158", kcalPerMl: 0.67, kcalPerGram: 5.0, isPowder: true },
  { name: "Enfamil EnfaCare", manufacturer: "Mead Johnson", hcpcsCode: "B4158", kcalPerMl: 0.74, kcalPerGram: 5.1, isPowder: true },
  // Perrigo
  { name: "Store Brand Infant Formula (Generic)", manufacturer: "Perrigo", hcpcsCode: "B4158", kcalPerMl: 0.67, kcalPerGram: 5.0, isPowder: true },

  // ══════════════════════════════════════════════════════════════════════════════
  // B4159: Pediatric, soy-based
  // ══════════════════════════════════════════════════════════════════════════════
  { name: "PediaSure (Soy-Based)", manufacturer: "Abbott", hcpcsCode: "B4159", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "bottle", label: "8 fl oz bottle", mlPerUnit: 237, kcalPerUnit: 237 }] },
  { name: "Similac Soy Isomil", manufacturer: "Abbott", hcpcsCode: "B4159", kcalPerMl: 0.67, kcalPerGram: 5.0, isPowder: true },
  { name: "Similac Isomil Soy", manufacturer: "Abbott", hcpcsCode: "B4159", kcalPerMl: 0.67, kcalPerGram: 5.0, isPowder: true },
  { name: "Enfamil ProSobee", manufacturer: "Mead Johnson", hcpcsCode: "B4159", kcalPerMl: 0.67, kcalPerGram: 5.1, isPowder: true },
  { name: "Enfamil Soy", manufacturer: "Mead Johnson", hcpcsCode: "B4159", kcalPerMl: 0.67, kcalPerGram: 5.0, isPowder: true },
  { name: "Good Start Soy", manufacturer: "Nestle", hcpcsCode: "B4159", kcalPerMl: 0.67, kcalPerGram: 5.0, isPowder: true },
  { name: "Bright Beginnings Pediatric Soy", manufacturer: "PBM Products", hcpcsCode: "B4159", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Bright Beginnings Soy Formula", manufacturer: "PBM Products", hcpcsCode: "B4159", kcalPerMl: 0.67, kcalPerGram: 5.0, isPowder: true },
  { name: "Store Brand Soy Formula (Generic)", manufacturer: "Perrigo", hcpcsCode: "B4159", kcalPerMl: 0.67, kcalPerGram: 5.0, isPowder: true },
  { name: "Earth's Best Organic Soy", manufacturer: "Hain Celestial", hcpcsCode: "B4159", kcalPerMl: 0.67, kcalPerGram: 5.0, isPowder: true },

  // ══════════════════════════════════════════════════════════════════════════════
  // B4160: Pediatric, calorically dense (>=0.7 kcal/mL)
  // ══════════════════════════════════════════════════════════════════════════════
  // Abbott
  { name: "PediaSure 1.5 Cal", manufacturer: "Abbott", hcpcsCode: "B4160", kcalPerMl: 1.5, kcalPerGram: null, packaging: [{ type: "bottle", label: "8 fl oz bottle", mlPerUnit: 237, kcalPerUnit: 355 }, { type: "can", label: "8 fl oz can", mlPerUnit: 237, kcalPerUnit: 355 }, { type: "carton", label: "1000 mL carton", mlPerUnit: 1000, kcalPerUnit: 1500 }] },
  { name: "PediaSure Grow & Gain", manufacturer: "Abbott", hcpcsCode: "B4160", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "bottle", label: "8 fl oz bottle", mlPerUnit: 237, kcalPerUnit: 237 }, { type: "can", label: "8 fl oz can", mlPerUnit: 237, kcalPerUnit: 237 }] },
  { name: "PediaSure Harvest", manufacturer: "Abbott", hcpcsCode: "B4160", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "bottle", label: "8 fl oz bottle", mlPerUnit: 237, kcalPerUnit: 237 }] },
  { name: "Similac High Energy", manufacturer: "Abbott", hcpcsCode: "B4160", kcalPerMl: 1.0, kcalPerGram: null },
  // Nestle
  { name: "Boost Kid Essentials 1.5", manufacturer: "Nestle", hcpcsCode: "B4160", kcalPerMl: 1.5, kcalPerGram: null },
  { name: "Boost Kid Essentials 1.5 with Fiber", manufacturer: "Nestle", hcpcsCode: "B4160", kcalPerMl: 1.5, kcalPerGram: null },
  { name: "Nutren Junior 1.5", manufacturer: "Nestle", hcpcsCode: "B4160", kcalPerMl: 1.5, kcalPerGram: null },
  { name: "Compleat Pediatric 1.4", manufacturer: "Nestle", hcpcsCode: "B4160", kcalPerMl: 1.4, kcalPerGram: null },
  // Kate Farms
  { name: "Kate Farms Pediatric Standard 1.2", manufacturer: "Kate Farms", hcpcsCode: "B4160", kcalPerMl: 1.2, kcalPerGram: null },
  // Mead Johnson
  { name: "Enfamil 24 Cal", manufacturer: "Mead Johnson", hcpcsCode: "B4160", kcalPerMl: 0.8, kcalPerGram: null },
  { name: "Enfamil 22 Cal", manufacturer: "Mead Johnson", hcpcsCode: "B4160", kcalPerMl: 0.74, kcalPerGram: null },

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
  { name: "EleCare (Infant)", manufacturer: "Abbott", hcpcsCode: "B4161", kcalPerMl: 0.67, kcalPerGram: 5.0, isPowder: true, packaging: [{ type: "can", label: "14.1 oz can", gramsPerUnit: 400 }] },
  { name: "EleCare Infant (Powder)", manufacturer: "Abbott", hcpcsCode: "B4161", kcalPerMl: null, kcalPerGram: 5.0, isPowder: true, packaging: [{ type: "can", label: "14.1 oz can", gramsPerUnit: 400 }] },
  { name: "EleCare DHA/ARA", manufacturer: "Abbott", hcpcsCode: "B4161", kcalPerMl: 0.67, kcalPerGram: 5.0, isPowder: true, packaging: [{ type: "can", label: "14.1 oz can", gramsPerUnit: 400 }] },
  // Abbott - Alimentum (Extensively Hydrolyzed)
  { name: "Similac Alimentum", manufacturer: "Abbott", hcpcsCode: "B4161", kcalPerMl: 0.67, kcalPerGram: 5.0, isPowder: true, packaging: [{ type: "can", label: "12.1 oz can (powder)", gramsPerUnit: 343 }, { type: "bottle", label: "2 fl oz RTF bottle", mlPerUnit: 59 }, { type: "bottle", label: "8 fl oz RTF bottle", mlPerUnit: 237 }, { type: "carton", label: "32 fl oz RTF carton", mlPerUnit: 946 }] },
  { name: "Similac Alimentum (Ready-to-Feed)", manufacturer: "Abbott", hcpcsCode: "B4161", kcalPerMl: 0.67, kcalPerGram: null, packaging: [{ type: "bottle", label: "2 fl oz bottle", mlPerUnit: 59 }, { type: "bottle", label: "8 fl oz bottle", mlPerUnit: 237 }, { type: "carton", label: "32 fl oz carton", mlPerUnit: 946 }] },
  { name: "Similac Alimentum (Powder)", manufacturer: "Abbott", hcpcsCode: "B4161", kcalPerMl: null, kcalPerGram: 5.0, isPowder: true, packaging: [{ type: "can", label: "12.1 oz can", gramsPerUnit: 343 }, { type: "can", label: "19.8 oz can", gramsPerUnit: 561 }] },
  // Nestle - Peptamen Jr
  { name: "Peptamen Junior", manufacturer: "Nestle", hcpcsCode: "B4161", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Peptamen Junior 1.5", manufacturer: "Nestle", hcpcsCode: "B4161", kcalPerMl: 1.5, kcalPerGram: null },
  { name: "Peptamen Junior with Fiber", manufacturer: "Nestle", hcpcsCode: "B4161", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Compleat Pediatric Peptide", manufacturer: "Nestle", hcpcsCode: "B4161", kcalPerMl: 1.0, kcalPerGram: null },
  // Nestle - Althera / Alfamino
  { name: "Alfamino Infant", manufacturer: "Nestle", hcpcsCode: "B4161", kcalPerMl: 0.67, kcalPerGram: 5.0, isPowder: true },
  { name: "Alfamino Junior", manufacturer: "Nestle", hcpcsCode: "B4161", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Althera", manufacturer: "Nestle", hcpcsCode: "B4161", kcalPerMl: 0.67, kcalPerGram: 4.6, isPowder: true },
  // Nutricia - Neocate (Amino Acid Based / Elemental)
  { name: "Neocate Infant DHA/ARA", manufacturer: "Nutricia", hcpcsCode: "B4161", kcalPerMl: 0.67, kcalPerGram: 5.0, isPowder: true, packaging: [{ type: "can", label: "14.1 oz can", gramsPerUnit: 400 }] },
  { name: "Neocate Infant (Powder)", manufacturer: "Nutricia", hcpcsCode: "B4161", kcalPerMl: null, kcalPerGram: 5.0, isPowder: true, packaging: [{ type: "can", label: "14.1 oz can", gramsPerUnit: 400 }] },
  { name: "Neocate Junior", manufacturer: "Nutricia", hcpcsCode: "B4161", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "can", label: "14.1 oz can (powder)", gramsPerUnit: 400 }, { type: "carton", label: "8.45 fl oz carton", mlPerUnit: 250, kcalPerUnit: 250 }] },
  { name: "Neocate Junior (Unflavored)", manufacturer: "Nutricia", hcpcsCode: "B4161", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "can", label: "14.1 oz can (powder)", gramsPerUnit: 400 }] },
  { name: "Neocate Junior (Tropical)", manufacturer: "Nutricia", hcpcsCode: "B4161", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "can", label: "14.1 oz can (powder)", gramsPerUnit: 400 }] },
  { name: "Neocate Junior with Prebiotics", manufacturer: "Nutricia", hcpcsCode: "B4161", kcalPerMl: 1.0, kcalPerGram: null, packaging: [{ type: "can", label: "14.1 oz can (powder)", gramsPerUnit: 400 }] },
  { name: "Neocate Syneo Infant", manufacturer: "Nutricia", hcpcsCode: "B4161", kcalPerMl: 0.67, kcalPerGram: 5.0, isPowder: true, packaging: [{ type: "can", label: "14.1 oz can", gramsPerUnit: 400 }] },
  // Nutricia - PurAmino (Amino Acid)
  { name: "PurAmino", manufacturer: "Nutricia", hcpcsCode: "B4161", kcalPerMl: 0.67, kcalPerGram: 5.0, isPowder: true },
  { name: "PurAmino Junior", manufacturer: "Nutricia", hcpcsCode: "B4161", kcalPerMl: 0.67, kcalPerGram: null },
  // Mead Johnson - Nutramigen (Extensively Hydrolyzed)
  { name: "Nutramigen", manufacturer: "Mead Johnson", hcpcsCode: "B4161", kcalPerMl: 0.67, kcalPerGram: 5.1, isPowder: true, packaging: [{ type: "can", label: "12.6 oz can (powder)", gramsPerUnit: 357 }, { type: "bottle", label: "2 fl oz RTF bottle", mlPerUnit: 59 }, { type: "bottle", label: "6 fl oz RTF bottle", mlPerUnit: 177 }, { type: "carton", label: "32 fl oz RTF carton", mlPerUnit: 946 }] },
  { name: "Nutramigen (Ready-to-Feed)", manufacturer: "Mead Johnson", hcpcsCode: "B4161", kcalPerMl: 0.67, kcalPerGram: null, packaging: [{ type: "bottle", label: "2 fl oz bottle", mlPerUnit: 59 }, { type: "bottle", label: "6 fl oz bottle", mlPerUnit: 177 }, { type: "carton", label: "32 fl oz carton", mlPerUnit: 946 }] },
  { name: "Nutramigen (Powder)", manufacturer: "Mead Johnson", hcpcsCode: "B4161", kcalPerMl: null, kcalPerGram: 5.1, isPowder: true, packaging: [{ type: "can", label: "12.6 oz can", gramsPerUnit: 357 }, { type: "can", label: "19.8 oz can", gramsPerUnit: 561 }] },
  { name: "Nutramigen with Enflora LGG", manufacturer: "Mead Johnson", hcpcsCode: "B4161", kcalPerMl: 0.67, kcalPerGram: 5.1, isPowder: true, packaging: [{ type: "can", label: "12.6 oz can (powder)", gramsPerUnit: 357 }] },
  { name: "Nutramigen A+ with LGG", manufacturer: "Mead Johnson", hcpcsCode: "B4161", kcalPerMl: 0.67, kcalPerGram: 5.1, isPowder: true, packaging: [{ type: "can", label: "12.6 oz can (powder)", gramsPerUnit: 357 }] },
  { name: "Nutramigen Toddler", manufacturer: "Mead Johnson", hcpcsCode: "B4161", kcalPerMl: 0.67, kcalPerGram: null, packaging: [{ type: "can", label: "12.6 oz can (powder)", gramsPerUnit: 357 }] },
  // Mead Johnson - Pregestimil
  { name: "Pregestimil", manufacturer: "Mead Johnson", hcpcsCode: "B4161", kcalPerMl: 0.67, kcalPerGram: 5.1, isPowder: true },
  { name: "Pregestimil (Powder)", manufacturer: "Mead Johnson", hcpcsCode: "B4161", kcalPerMl: null, kcalPerGram: 5.1, isPowder: true },
  // Kate Farms Pediatric Peptide
  { name: "Kate Farms Pediatric Peptide 1.0", manufacturer: "Kate Farms", hcpcsCode: "B4161", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Kate Farms Pediatric Peptide 1.5", manufacturer: "Kate Farms", hcpcsCode: "B4161", kcalPerMl: 1.5, kcalPerGram: null },

  // ══════════════════════════════════════════════════════════════════════════════
  // B4162: Pediatric, inherited disease of metabolism
  // ══════════════════════════════════════════════════════════════════════════════
  // Abbott "-1" powders: All 480 kcal per 100g = 4.8 kcal/g
  { name: "Phenex-1 (PKU)", manufacturer: "Abbott", hcpcsCode: "B4162", kcalPerMl: null, kcalPerGram: 4.8, isPowder: true },
  { name: "Glutarex-1 (Glutaric Aciduria)", manufacturer: "Abbott", hcpcsCode: "B4162", kcalPerMl: null, kcalPerGram: 4.8, isPowder: true },
  { name: "Hominex-1 (Homocystinuria)", manufacturer: "Abbott", hcpcsCode: "B4162", kcalPerMl: null, kcalPerGram: 4.8, isPowder: true },
  { name: "Ketonex-1 (MSUD)", manufacturer: "Abbott", hcpcsCode: "B4162", kcalPerMl: null, kcalPerGram: 4.8, isPowder: true },
  { name: "Propimex-1 (Propionic/Methylmalonic)", manufacturer: "Abbott", hcpcsCode: "B4162", kcalPerMl: null, kcalPerGram: 4.8, isPowder: true },
  { name: "Tyrex-1 (Tyrosinemia)", manufacturer: "Abbott", hcpcsCode: "B4162", kcalPerMl: null, kcalPerGram: 4.8, isPowder: true },
  { name: "Cyclinex-1 (Urea Cycle Disorders)", manufacturer: "Abbott", hcpcsCode: "B4162", kcalPerMl: null, kcalPerGram: 4.8, isPowder: true },
  { name: "I-Valex-1 (Isovaleric Acidemia)", manufacturer: "Abbott", hcpcsCode: "B4162", kcalPerMl: null, kcalPerGram: 4.8, isPowder: true },
  // Nutricia Infant/Pediatric Metabolic
  { name: "PKU Anamix Infant", manufacturer: "Nutricia", hcpcsCode: "B4162", kcalPerMl: 0.67, kcalPerGram: null },
  { name: "PKU Anamix First Spoon", manufacturer: "Nutricia", hcpcsCode: "B4162", kcalPerMl: null, kcalPerGram: null },
  { name: "Neocate Infant DHA/ARA", manufacturer: "Nutricia", hcpcsCode: "B4162", kcalPerMl: 0.67, kcalPerGram: 5.0, isPowder: true },
  { name: "Neocate Nutra", manufacturer: "Nutricia", hcpcsCode: "B4162", kcalPerMl: null, kcalPerGram: null },
  { name: "MSUD Anamix Infant", manufacturer: "Nutricia", hcpcsCode: "B4162", kcalPerMl: 0.67, kcalPerGram: null },
  { name: "UCD Anamix Infant", manufacturer: "Nutricia", hcpcsCode: "B4162", kcalPerMl: 0.67, kcalPerGram: null },
  { name: "HCU Anamix Infant", manufacturer: "Nutricia", hcpcsCode: "B4162", kcalPerMl: 0.67, kcalPerGram: null },
  { name: "TYR Anamix Infant", manufacturer: "Nutricia", hcpcsCode: "B4162", kcalPerMl: 0.67, kcalPerGram: null },
  { name: "MMA/PA Anamix Infant", manufacturer: "Nutricia", hcpcsCode: "B4162", kcalPerMl: 0.67, kcalPerGram: null },
  { name: "GA Anamix Infant (Glutaric Aciduria)", manufacturer: "Nutricia", hcpcsCode: "B4162", kcalPerMl: 0.67, kcalPerGram: null },
  // Vitaflo/Nestle Pediatric Metabolic
  { name: "PKU Gel (Pediatric)", manufacturer: "Vitaflo/Nestle", hcpcsCode: "B4162", kcalPerMl: null, kcalPerGram: 3.5, isPowder: true },
  { name: "PKU Start", manufacturer: "Vitaflo/Nestle", hcpcsCode: "B4162", kcalPerMl: null, kcalPerGram: null },
  { name: "PKU Infant", manufacturer: "Vitaflo/Nestle", hcpcsCode: "B4162", kcalPerMl: 0.67, kcalPerGram: null },
  { name: "Milupa PKU 1", manufacturer: "Nutricia", hcpcsCode: "B4162", kcalPerMl: null, kcalPerGram: 3.8, isPowder: true },
  { name: "Milupa PKU 2", manufacturer: "Nutricia", hcpcsCode: "B4162", kcalPerMl: null, kcalPerGram: 3.8, isPowder: true },
  // Ajinomoto Cambrooke Pediatric
  { name: "Glytactin BetterMilk (PKU)", manufacturer: "Ajinomoto Cambrooke", hcpcsCode: "B4162", kcalPerMl: null, kcalPerGram: null },
  { name: "Essential Amino Acid Mix", manufacturer: "Ajinomoto Cambrooke", hcpcsCode: "B4162", kcalPerMl: null, kcalPerGram: null },
  // Mead Johnson Metabolic
  { name: "Lofenalac (PKU)", manufacturer: "Mead Johnson", hcpcsCode: "B4162", kcalPerMl: 0.67, kcalPerGram: 4.6, isPowder: true },
  { name: "Phenyl-Free 1 (PKU)", manufacturer: "Mead Johnson", hcpcsCode: "B4162", kcalPerMl: null, kcalPerGram: 4.6, isPowder: true },
  { name: "Phenyl-Free 2HP (PKU)", manufacturer: "Mead Johnson", hcpcsCode: "B4162", kcalPerMl: null, kcalPerGram: 4.6, isPowder: true },
  { name: "MSUD Diet Powder", manufacturer: "Mead Johnson", hcpcsCode: "B4162", kcalPerMl: null, kcalPerGram: 4.5, isPowder: true },
  // Abbott Infant Specialty (may also fit B4162)
  { name: "EleCare (Infant)", manufacturer: "Abbott", hcpcsCode: "B4162", kcalPerMl: 0.67, kcalPerGram: 5.0, isPowder: true },
  { name: "EleCare Infant DHA/ARA", manufacturer: "Abbott", hcpcsCode: "B4162", kcalPerMl: 0.67, kcalPerGram: 5.0, isPowder: true },
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
