// HCPCS Enteral Nutrition Code Definitions and Product Classification Data
// Sources: CMS HCPCS Code Set, eMedNY/PDAC Product Classification List, manufacturer data

export interface HcpcsCode {
  code: string
  shortDescription: string
  longDescription: string
}

export interface EnteralProduct {
  name: string
  manufacturer: string
  hcpcsCode: string
  kcalPerMl: number | null // null = user must enter manually
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

export const ENTERAL_PRODUCTS: EnteralProduct[] = [
  // ── B4149: Blenderized food via tube ──────────────────────────────────────
  { name: "Compleat Organic Blends (Chicken Garden)", manufacturer: "Nestle", hcpcsCode: "B4149", kcalPerMl: 1.0 },
  { name: "Compleat Organic Blends (Plant-Based)", manufacturer: "Nestle", hcpcsCode: "B4149", kcalPerMl: 1.0 },
  { name: "Kate Farms Organic Standard 1.0 (Vanilla)", manufacturer: "Kate Farms", hcpcsCode: "B4149", kcalPerMl: 1.0 },
  { name: "Liquid Hope", manufacturer: "Functional Formularies", hcpcsCode: "B4149", kcalPerMl: 1.0 },
  { name: "Liquid Hope Peptide", manufacturer: "Functional Formularies", hcpcsCode: "B4149", kcalPerMl: 1.0 },
  { name: "Nourish", manufacturer: "Functional Formularies", hcpcsCode: "B4149", kcalPerMl: 1.0 },
  { name: "Real Food Blends (Salmon/Oats/Squash)", manufacturer: "Real Food Blends", hcpcsCode: "B4149", kcalPerMl: 0.67 },
  { name: "Real Food Blends (Beef/Potatoes/Spinach)", manufacturer: "Real Food Blends", hcpcsCode: "B4149", kcalPerMl: 0.67 },
  { name: "Real Food Blends (Eggs/Apples/Oats)", manufacturer: "Real Food Blends", hcpcsCode: "B4149", kcalPerMl: 0.67 },
  { name: "Real Food Blends (Turkey/Sweet Potatoes/Peaches)", manufacturer: "Real Food Blends", hcpcsCode: "B4149", kcalPerMl: 0.67 },
  { name: "Real Food Blends (Orange Chicken/Brown Rice/Carrots)", manufacturer: "Real Food Blends", hcpcsCode: "B4149", kcalPerMl: 0.67 },
  { name: "Real Food Blends (Quinoa/Kale/Hemp)", manufacturer: "Real Food Blends", hcpcsCode: "B4149", kcalPerMl: 0.67 },

  // ── B4150: Nutritionally complete, intact nutrients ───────────────────────
  { name: "Osmolite 1 Cal", manufacturer: "Abbott", hcpcsCode: "B4150", kcalPerMl: 1.06 },
  { name: "Osmolite 1.2 Cal", manufacturer: "Abbott", hcpcsCode: "B4150", kcalPerMl: 1.2 },
  { name: "Jevity 1 Cal", manufacturer: "Abbott", hcpcsCode: "B4150", kcalPerMl: 1.06 },
  { name: "Jevity 1.2 Cal", manufacturer: "Abbott", hcpcsCode: "B4150", kcalPerMl: 1.2 },
  { name: "Promote", manufacturer: "Abbott", hcpcsCode: "B4150", kcalPerMl: 1.0 },
  { name: "Promote with Fiber", manufacturer: "Abbott", hcpcsCode: "B4150", kcalPerMl: 1.0 },
  { name: "Ensure", manufacturer: "Abbott", hcpcsCode: "B4150", kcalPerMl: 1.06 },
  { name: "Ensure with Fiber", manufacturer: "Abbott", hcpcsCode: "B4150", kcalPerMl: 1.1 },
  { name: "Ensure High Protein", manufacturer: "Abbott", hcpcsCode: "B4150", kcalPerMl: 1.0 },
  { name: "Fibersource HN", manufacturer: "Nestle", hcpcsCode: "B4150", kcalPerMl: 1.2 },
  { name: "Isosource HN", manufacturer: "Nestle", hcpcsCode: "B4150", kcalPerMl: 1.2 },
  { name: "Isosource 1.5 Cal", manufacturer: "Nestle", hcpcsCode: "B4150", kcalPerMl: 1.5 },
  { name: "Nutren 1.0", manufacturer: "Nestle", hcpcsCode: "B4150", kcalPerMl: 1.0 },
  { name: "Nutren 1.0 Fiber", manufacturer: "Nestle", hcpcsCode: "B4150", kcalPerMl: 1.0 },
  { name: "Compleat Standard 1.0", manufacturer: "Nestle", hcpcsCode: "B4150", kcalPerMl: 1.0 },
  { name: "Compleat Standard 1.4", manufacturer: "Nestle", hcpcsCode: "B4150", kcalPerMl: 1.4 },
  { name: "Impact (with Fiber)", manufacturer: "Nestle", hcpcsCode: "B4150", kcalPerMl: 1.0 },
  { name: "Boost", manufacturer: "Nestle", hcpcsCode: "B4150", kcalPerMl: 1.01 },
  { name: "Boost High Protein", manufacturer: "Nestle", hcpcsCode: "B4150", kcalPerMl: 1.01 },
  { name: "Kate Farms Standard 1.0", manufacturer: "Kate Farms", hcpcsCode: "B4150", kcalPerMl: 1.0 },
  { name: "Kate Farms Standard 1.4", manufacturer: "Kate Farms", hcpcsCode: "B4150", kcalPerMl: 1.4 },

  // ── B4152: Calorically dense (>=1.5 kcal/mL) ─────────────────────────────
  { name: "Osmolite 1.5 Cal", manufacturer: "Abbott", hcpcsCode: "B4152", kcalPerMl: 1.5 },
  { name: "Jevity 1.5 Cal", manufacturer: "Abbott", hcpcsCode: "B4152", kcalPerMl: 1.5 },
  { name: "Ensure Plus", manufacturer: "Abbott", hcpcsCode: "B4152", kcalPerMl: 1.5 },
  { name: "Ensure Enlive", manufacturer: "Abbott", hcpcsCode: "B4152", kcalPerMl: 1.53 },
  { name: "Ensure Compact", manufacturer: "Abbott", hcpcsCode: "B4152", kcalPerMl: 2.18 },
  { name: "TwoCal HN", manufacturer: "Abbott", hcpcsCode: "B4152", kcalPerMl: 2.0 },
  { name: "Nutren 1.5", manufacturer: "Nestle", hcpcsCode: "B4152", kcalPerMl: 1.5 },
  { name: "Nutren 2.0", manufacturer: "Nestle", hcpcsCode: "B4152", kcalPerMl: 2.0 },
  { name: "Boost Plus", manufacturer: "Nestle", hcpcsCode: "B4152", kcalPerMl: 1.5 },
  { name: "Boost VHC (Very High Calorie)", manufacturer: "Nestle", hcpcsCode: "B4152", kcalPerMl: 2.25 },
  { name: "Isosource 1.5 Cal", manufacturer: "Nestle", hcpcsCode: "B4152", kcalPerMl: 1.5 },
  { name: "Kate Farms Standard 1.4", manufacturer: "Kate Farms", hcpcsCode: "B4152", kcalPerMl: 1.4 },

  // ── B4153: Hydrolyzed proteins / Semi-elemental ──────────────────────────
  { name: "Vital 1.0 Cal", manufacturer: "Abbott", hcpcsCode: "B4153", kcalPerMl: 1.0 },
  { name: "Vital AF 1.2 Cal", manufacturer: "Abbott", hcpcsCode: "B4153", kcalPerMl: 1.2 },
  { name: "Vital 1.5 Cal", manufacturer: "Abbott", hcpcsCode: "B4153", kcalPerMl: 1.5 },
  { name: "Vital High Protein", manufacturer: "Abbott", hcpcsCode: "B4153", kcalPerMl: 1.0 },
  { name: "Peptamen", manufacturer: "Nestle", hcpcsCode: "B4153", kcalPerMl: 1.0 },
  { name: "Peptamen AF", manufacturer: "Nestle", hcpcsCode: "B4153", kcalPerMl: 1.2 },
  { name: "Peptamen 1.5", manufacturer: "Nestle", hcpcsCode: "B4153", kcalPerMl: 1.5 },
  { name: "Peptamen Intense VHP", manufacturer: "Nestle", hcpcsCode: "B4153", kcalPerMl: 1.0 },
  { name: "Peptamen with Prebio1", manufacturer: "Nestle", hcpcsCode: "B4153", kcalPerMl: 1.0 },
  { name: "Compleat Peptide 1.5", manufacturer: "Nestle", hcpcsCode: "B4153", kcalPerMl: 1.5 },
  { name: "Impact Peptide 1.5", manufacturer: "Nestle", hcpcsCode: "B4153", kcalPerMl: 1.5 },
  { name: "Tolerex", manufacturer: "Nestle", hcpcsCode: "B4153", kcalPerMl: 1.0 },
  { name: "Vivonex T.E.N.", manufacturer: "Nestle", hcpcsCode: "B4153", kcalPerMl: 1.0 },
  { name: "Vivonex Plus", manufacturer: "Nestle", hcpcsCode: "B4153", kcalPerMl: 1.0 },
  { name: "Vivonex RTF", manufacturer: "Nestle", hcpcsCode: "B4153", kcalPerMl: 1.0 },
  { name: "Kate Farms Peptide 1.0", manufacturer: "Kate Farms", hcpcsCode: "B4153", kcalPerMl: 1.0 },
  { name: "Kate Farms Peptide 1.5", manufacturer: "Kate Farms", hcpcsCode: "B4153", kcalPerMl: 1.5 },

  // ── B4154: Special metabolic needs (not inherited) ────────────────────────
  { name: "Glucerna 1.0 Cal", manufacturer: "Abbott", hcpcsCode: "B4154", kcalPerMl: 1.0 },
  { name: "Glucerna 1.2 Cal", manufacturer: "Abbott", hcpcsCode: "B4154", kcalPerMl: 1.2 },
  { name: "Glucerna 1.5 Cal", manufacturer: "Abbott", hcpcsCode: "B4154", kcalPerMl: 1.5 },
  { name: "Nepro with Carb Steady", manufacturer: "Abbott", hcpcsCode: "B4154", kcalPerMl: 1.8 },
  { name: "Suplena with Carb Steady", manufacturer: "Abbott", hcpcsCode: "B4154", kcalPerMl: 1.8 },
  { name: "Pulmocare", manufacturer: "Abbott", hcpcsCode: "B4154", kcalPerMl: 1.5 },
  { name: "Oxepa", manufacturer: "Abbott", hcpcsCode: "B4154", kcalPerMl: 1.5 },
  { name: "Perative", manufacturer: "Abbott", hcpcsCode: "B4154", kcalPerMl: 1.3 },
  { name: "Pivot 1.5 Cal", manufacturer: "Abbott", hcpcsCode: "B4154", kcalPerMl: 1.5 },
  { name: "Novasource Renal", manufacturer: "Nestle", hcpcsCode: "B4154", kcalPerMl: 2.0 },
  { name: "Nutren Pulmonary", manufacturer: "Nestle", hcpcsCode: "B4154", kcalPerMl: 1.5 },
  { name: "Nutren Renal", manufacturer: "Nestle", hcpcsCode: "B4154", kcalPerMl: 2.0 },
  { name: "Diabetisource AC", manufacturer: "Nestle", hcpcsCode: "B4154", kcalPerMl: 1.2 },
  { name: "Renalcal", manufacturer: "Nestle", hcpcsCode: "B4154", kcalPerMl: 2.0 },
  { name: "Impact Advanced Recovery", manufacturer: "Nestle", hcpcsCode: "B4154", kcalPerMl: 1.0 },
  { name: "Kate Farms Glucose Support 1.2", manufacturer: "Kate Farms", hcpcsCode: "B4154", kcalPerMl: 1.2 },
  { name: "Kate Farms Renal Support 1.8", manufacturer: "Kate Farms", hcpcsCode: "B4154", kcalPerMl: 1.8 },

  // ── B4155: Modular/Incomplete nutrients ───────────────────────────────────
  { name: "Beneprotein (Protein Powder)", manufacturer: "Nestle", hcpcsCode: "B4155", kcalPerMl: null },
  { name: "Juven (Arginine/Glutamine)", manufacturer: "Abbott", hcpcsCode: "B4155", kcalPerMl: null },
  { name: "MCT Oil", manufacturer: "Various", hcpcsCode: "B4155", kcalPerMl: 7.7 },
  { name: "Microlipid", manufacturer: "Nestle", hcpcsCode: "B4155", kcalPerMl: 4.5 },
  { name: "Polycose (Liquid)", manufacturer: "Abbott", hcpcsCode: "B4155", kcalPerMl: 2.0 },
  { name: "Polycose (Powder)", manufacturer: "Abbott", hcpcsCode: "B4155", kcalPerMl: null },
  { name: "Arginaid", manufacturer: "Nestle", hcpcsCode: "B4155", kcalPerMl: null },
  { name: "Glutasolve", manufacturer: "Nestle", hcpcsCode: "B4155", kcalPerMl: null },
  { name: "ProMod Liquid Protein", manufacturer: "Abbott", hcpcsCode: "B4155", kcalPerMl: 1.0 },
  { name: "Resource Benefiber", manufacturer: "Nestle", hcpcsCode: "B4155", kcalPerMl: null },

  // ── B4157: Inherited disease of metabolism (Adult) ────────────────────────
  // Abbott "-2" powders: 410 kcal/100g; kcal/mL at standard dilution (~20g/100mL water)
  { name: "Phenex-2 (PKU)", manufacturer: "Abbott", hcpcsCode: "B4157", kcalPerMl: 0.82 },
  { name: "Glutarex-2 (Glutaric Aciduria)", manufacturer: "Abbott", hcpcsCode: "B4157", kcalPerMl: 0.82 },
  { name: "Hominex-2 (Homocystinuria)", manufacturer: "Abbott", hcpcsCode: "B4157", kcalPerMl: 0.82 },
  { name: "Ketonex-2 (MSUD)", manufacturer: "Abbott", hcpcsCode: "B4157", kcalPerMl: 0.82 },
  { name: "Propimex-2 (Propionic/Methylmalonic)", manufacturer: "Abbott", hcpcsCode: "B4157", kcalPerMl: 0.82 },
  { name: "Tyrex-2 (Tyrosinemia)", manufacturer: "Abbott", hcpcsCode: "B4157", kcalPerMl: 0.82 },
  // Nutricia formulas: kcal/mL at standard recommended dilution
  { name: "PKU Anamix Early Years", manufacturer: "Nutricia", hcpcsCode: "B4157", kcalPerMl: 0.68 },
  { name: "PKU Anamix Junior LQ (Liquid)", manufacturer: "Nutricia", hcpcsCode: "B4157", kcalPerMl: 0.94 },
  { name: "UCD Anamix Junior", manufacturer: "Nutricia", hcpcsCode: "B4157", kcalPerMl: 0.9 },

  // ── B4158: Pediatric, intact nutrients ────────────────────────────────────
  { name: "PediaSure 1.0 Cal", manufacturer: "Abbott", hcpcsCode: "B4158", kcalPerMl: 1.0 },
  { name: "PediaSure with Fiber", manufacturer: "Abbott", hcpcsCode: "B4158", kcalPerMl: 1.0 },
  { name: "Nutren Junior", manufacturer: "Nestle", hcpcsCode: "B4158", kcalPerMl: 1.0 },
  { name: "Nutren Junior with Fiber", manufacturer: "Nestle", hcpcsCode: "B4158", kcalPerMl: 1.0 },
  { name: "Boost Kid Essentials 1.0", manufacturer: "Nestle", hcpcsCode: "B4158", kcalPerMl: 1.0 },
  { name: "Kate Farms Pediatric Standard 1.0", manufacturer: "Kate Farms", hcpcsCode: "B4158", kcalPerMl: 1.0 },
  { name: "Compleat Pediatric Standard", manufacturer: "Nestle", hcpcsCode: "B4158", kcalPerMl: 1.0 },
  { name: "Compleat Pediatric Reduced Calorie", manufacturer: "Nestle", hcpcsCode: "B4158", kcalPerMl: 0.6 },

  // ── B4159: Pediatric, soy-based ──────────────────────────────────────────
  { name: "PediaSure (Soy-Based)", manufacturer: "Abbott", hcpcsCode: "B4159", kcalPerMl: 1.0 },
  { name: "Bright Beginnings Pediatric Soy", manufacturer: "PBM Products", hcpcsCode: "B4159", kcalPerMl: 1.0 },

  // ── B4160: Pediatric, calorically dense (>=0.7 kcal/mL) ──────────────────
  { name: "PediaSure 1.5 Cal", manufacturer: "Abbott", hcpcsCode: "B4160", kcalPerMl: 1.5 },
  { name: "PediaSure Grow & Gain", manufacturer: "Abbott", hcpcsCode: "B4160", kcalPerMl: 1.0 },
  { name: "PediaSure Harvest", manufacturer: "Abbott", hcpcsCode: "B4160", kcalPerMl: 1.0 },
  { name: "Boost Kid Essentials 1.5", manufacturer: "Nestle", hcpcsCode: "B4160", kcalPerMl: 1.5 },
  { name: "Nutren Junior 1.5", manufacturer: "Nestle", hcpcsCode: "B4160", kcalPerMl: 1.5 },
  { name: "Kate Farms Pediatric Standard 1.2", manufacturer: "Kate Farms", hcpcsCode: "B4160", kcalPerMl: 1.2 },
  { name: "Compleat Pediatric 1.4", manufacturer: "Nestle", hcpcsCode: "B4160", kcalPerMl: 1.4 },

  // ── B4161: Pediatric, hydrolyzed proteins ─────────────────────────────────
  { name: "PediaSure Peptide 1.0 Cal", manufacturer: "Abbott", hcpcsCode: "B4161", kcalPerMl: 1.0 },
  { name: "PediaSure Peptide 1.5 Cal", manufacturer: "Abbott", hcpcsCode: "B4161", kcalPerMl: 1.5 },
  { name: "Peptamen Junior", manufacturer: "Nestle", hcpcsCode: "B4161", kcalPerMl: 1.0 },
  { name: "Peptamen Junior 1.5", manufacturer: "Nestle", hcpcsCode: "B4161", kcalPerMl: 1.5 },
  { name: "EleCare Jr", manufacturer: "Abbott", hcpcsCode: "B4161", kcalPerMl: 1.0 },
  { name: "Neocate Junior", manufacturer: "Nutricia", hcpcsCode: "B4161", kcalPerMl: 1.0 },
  { name: "Kate Farms Pediatric Peptide 1.0", manufacturer: "Kate Farms", hcpcsCode: "B4161", kcalPerMl: 1.0 },
  { name: "Kate Farms Pediatric Peptide 1.5", manufacturer: "Kate Farms", hcpcsCode: "B4161", kcalPerMl: 1.5 },
  { name: "Compleat Pediatric Peptide", manufacturer: "Nestle", hcpcsCode: "B4161", kcalPerMl: 1.0 },

  // ── B4162: Pediatric, inherited disease of metabolism ─────────────────────
  { name: "Phenex-1", manufacturer: "Abbott", hcpcsCode: "B4162", kcalPerMl: null },
  { name: "Glutarex-1", manufacturer: "Abbott", hcpcsCode: "B4162", kcalPerMl: null },
  { name: "Hominex-1", manufacturer: "Abbott", hcpcsCode: "B4162", kcalPerMl: null },
  { name: "Ketonex-1", manufacturer: "Abbott", hcpcsCode: "B4162", kcalPerMl: null },
  { name: "Propimex-1", manufacturer: "Abbott", hcpcsCode: "B4162", kcalPerMl: null },
  { name: "Tyrex-1", manufacturer: "Abbott", hcpcsCode: "B4162", kcalPerMl: null },
  { name: "PKU Anamix Infant", manufacturer: "Nutricia", hcpcsCode: "B4162", kcalPerMl: null },
  { name: "Neocate Infant DHA/ARA", manufacturer: "Nutricia", hcpcsCode: "B4162", kcalPerMl: null },
  { name: "EleCare (Infant)", manufacturer: "Abbott", hcpcsCode: "B4162", kcalPerMl: null },
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
