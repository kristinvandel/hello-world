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
  kcalPerMl: number | null // kcal per mL of liquid (null = user must enter manually)
  kcalPerGram: number | null // kcal per gram of powder (for powder-based formulas)
  isPowder?: boolean // true for powder formulas where kcal/g is the primary density
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
  // ── B4149: Blenderized food via tube ──────────────────────────────────────
  { name: "Compleat Organic Blends (Chicken Garden)", manufacturer: "Nestle", hcpcsCode: "B4149", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Compleat Organic Blends (Plant-Based)", manufacturer: "Nestle", hcpcsCode: "B4149", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Kate Farms Organic Standard 1.0 (Vanilla)", manufacturer: "Kate Farms", hcpcsCode: "B4149", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Liquid Hope", manufacturer: "Functional Formularies", hcpcsCode: "B4149", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Liquid Hope Peptide", manufacturer: "Functional Formularies", hcpcsCode: "B4149", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Nourish", manufacturer: "Functional Formularies", hcpcsCode: "B4149", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Real Food Blends (Salmon/Oats/Squash)", manufacturer: "Real Food Blends", hcpcsCode: "B4149", kcalPerMl: 0.67, kcalPerGram: null },
  { name: "Real Food Blends (Beef/Potatoes/Spinach)", manufacturer: "Real Food Blends", hcpcsCode: "B4149", kcalPerMl: 0.67, kcalPerGram: null },
  { name: "Real Food Blends (Eggs/Apples/Oats)", manufacturer: "Real Food Blends", hcpcsCode: "B4149", kcalPerMl: 0.67, kcalPerGram: null },
  { name: "Real Food Blends (Turkey/Sweet Potatoes/Peaches)", manufacturer: "Real Food Blends", hcpcsCode: "B4149", kcalPerMl: 0.67, kcalPerGram: null },
  { name: "Real Food Blends (Orange Chicken/Brown Rice/Carrots)", manufacturer: "Real Food Blends", hcpcsCode: "B4149", kcalPerMl: 0.67, kcalPerGram: null },
  { name: "Real Food Blends (Quinoa/Kale/Hemp)", manufacturer: "Real Food Blends", hcpcsCode: "B4149", kcalPerMl: 0.67, kcalPerGram: null },

  // ── B4150: Nutritionally complete, intact nutrients ───────────────────────
  { name: "Osmolite 1 Cal", manufacturer: "Abbott", hcpcsCode: "B4150", kcalPerMl: 1.06, kcalPerGram: null },
  { name: "Osmolite 1.2 Cal", manufacturer: "Abbott", hcpcsCode: "B4150", kcalPerMl: 1.2, kcalPerGram: null },
  { name: "Jevity 1 Cal", manufacturer: "Abbott", hcpcsCode: "B4150", kcalPerMl: 1.06, kcalPerGram: null },
  { name: "Jevity 1.2 Cal", manufacturer: "Abbott", hcpcsCode: "B4150", kcalPerMl: 1.2, kcalPerGram: null },
  { name: "Promote", manufacturer: "Abbott", hcpcsCode: "B4150", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Promote with Fiber", manufacturer: "Abbott", hcpcsCode: "B4150", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Ensure", manufacturer: "Abbott", hcpcsCode: "B4150", kcalPerMl: 1.06, kcalPerGram: null },
  { name: "Ensure with Fiber", manufacturer: "Abbott", hcpcsCode: "B4150", kcalPerMl: 1.1, kcalPerGram: null },
  { name: "Ensure High Protein", manufacturer: "Abbott", hcpcsCode: "B4150", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Fibersource HN", manufacturer: "Nestle", hcpcsCode: "B4150", kcalPerMl: 1.2, kcalPerGram: null },
  { name: "Isosource HN", manufacturer: "Nestle", hcpcsCode: "B4150", kcalPerMl: 1.2, kcalPerGram: null },
  { name: "Isosource 1.5 Cal", manufacturer: "Nestle", hcpcsCode: "B4150", kcalPerMl: 1.5, kcalPerGram: null },
  { name: "Nutren 1.0", manufacturer: "Nestle", hcpcsCode: "B4150", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Nutren 1.0 Fiber", manufacturer: "Nestle", hcpcsCode: "B4150", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Compleat Standard 1.0", manufacturer: "Nestle", hcpcsCode: "B4150", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Compleat Standard 1.4", manufacturer: "Nestle", hcpcsCode: "B4150", kcalPerMl: 1.4, kcalPerGram: null },
  { name: "Impact (with Fiber)", manufacturer: "Nestle", hcpcsCode: "B4150", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Boost", manufacturer: "Nestle", hcpcsCode: "B4150", kcalPerMl: 1.01, kcalPerGram: null },
  { name: "Boost High Protein", manufacturer: "Nestle", hcpcsCode: "B4150", kcalPerMl: 1.01, kcalPerGram: null },
  { name: "Kate Farms Standard 1.0", manufacturer: "Kate Farms", hcpcsCode: "B4150", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Kate Farms Standard 1.4", manufacturer: "Kate Farms", hcpcsCode: "B4150", kcalPerMl: 1.4, kcalPerGram: null },

  // ── B4152: Calorically dense (>=1.5 kcal/mL) ─────────────────────────────
  { name: "Osmolite 1.5 Cal", manufacturer: "Abbott", hcpcsCode: "B4152", kcalPerMl: 1.5, kcalPerGram: null },
  { name: "Jevity 1.5 Cal", manufacturer: "Abbott", hcpcsCode: "B4152", kcalPerMl: 1.5, kcalPerGram: null },
  { name: "Ensure Plus", manufacturer: "Abbott", hcpcsCode: "B4152", kcalPerMl: 1.5, kcalPerGram: null },
  { name: "Ensure Enlive", manufacturer: "Abbott", hcpcsCode: "B4152", kcalPerMl: 1.53, kcalPerGram: null },
  { name: "Ensure Compact", manufacturer: "Abbott", hcpcsCode: "B4152", kcalPerMl: 2.18, kcalPerGram: null },
  { name: "TwoCal HN", manufacturer: "Abbott", hcpcsCode: "B4152", kcalPerMl: 2.0, kcalPerGram: null },
  { name: "Nutren 1.5", manufacturer: "Nestle", hcpcsCode: "B4152", kcalPerMl: 1.5, kcalPerGram: null },
  { name: "Nutren 2.0", manufacturer: "Nestle", hcpcsCode: "B4152", kcalPerMl: 2.0, kcalPerGram: null },
  { name: "Boost Plus", manufacturer: "Nestle", hcpcsCode: "B4152", kcalPerMl: 1.5, kcalPerGram: null },
  { name: "Boost VHC (Very High Calorie)", manufacturer: "Nestle", hcpcsCode: "B4152", kcalPerMl: 2.25, kcalPerGram: null },
  { name: "Isosource 1.5 Cal", manufacturer: "Nestle", hcpcsCode: "B4152", kcalPerMl: 1.5, kcalPerGram: null },
  { name: "Kate Farms Standard 1.4", manufacturer: "Kate Farms", hcpcsCode: "B4152", kcalPerMl: 1.4, kcalPerGram: null },

  // ── B4153: Hydrolyzed proteins / Semi-elemental ──────────────────────────
  { name: "Vital 1.0 Cal", manufacturer: "Abbott", hcpcsCode: "B4153", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Vital AF 1.2 Cal", manufacturer: "Abbott", hcpcsCode: "B4153", kcalPerMl: 1.2, kcalPerGram: null },
  { name: "Vital 1.5 Cal", manufacturer: "Abbott", hcpcsCode: "B4153", kcalPerMl: 1.5, kcalPerGram: null },
  { name: "Vital High Protein", manufacturer: "Abbott", hcpcsCode: "B4153", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Peptamen", manufacturer: "Nestle", hcpcsCode: "B4153", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Peptamen AF", manufacturer: "Nestle", hcpcsCode: "B4153", kcalPerMl: 1.2, kcalPerGram: null },
  { name: "Peptamen 1.5", manufacturer: "Nestle", hcpcsCode: "B4153", kcalPerMl: 1.5, kcalPerGram: null },
  { name: "Peptamen Intense VHP", manufacturer: "Nestle", hcpcsCode: "B4153", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Peptamen with Prebio1", manufacturer: "Nestle", hcpcsCode: "B4153", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Compleat Peptide 1.5", manufacturer: "Nestle", hcpcsCode: "B4153", kcalPerMl: 1.5, kcalPerGram: null },
  { name: "Impact Peptide 1.5", manufacturer: "Nestle", hcpcsCode: "B4153", kcalPerMl: 1.5, kcalPerGram: null },
  { name: "Tolerex", manufacturer: "Nestle", hcpcsCode: "B4153", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Vivonex T.E.N.", manufacturer: "Nestle", hcpcsCode: "B4153", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Vivonex Plus", manufacturer: "Nestle", hcpcsCode: "B4153", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Vivonex RTF", manufacturer: "Nestle", hcpcsCode: "B4153", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Kate Farms Peptide 1.0", manufacturer: "Kate Farms", hcpcsCode: "B4153", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Kate Farms Peptide 1.5", manufacturer: "Kate Farms", hcpcsCode: "B4153", kcalPerMl: 1.5, kcalPerGram: null },

  // ── B4154: Special metabolic needs (not inherited) ────────────────────────
  { name: "Glucerna 1.0 Cal", manufacturer: "Abbott", hcpcsCode: "B4154", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Glucerna 1.2 Cal", manufacturer: "Abbott", hcpcsCode: "B4154", kcalPerMl: 1.2, kcalPerGram: null },
  { name: "Glucerna 1.5 Cal", manufacturer: "Abbott", hcpcsCode: "B4154", kcalPerMl: 1.5, kcalPerGram: null },
  { name: "Nepro with Carb Steady", manufacturer: "Abbott", hcpcsCode: "B4154", kcalPerMl: 1.8, kcalPerGram: null },
  { name: "Suplena with Carb Steady", manufacturer: "Abbott", hcpcsCode: "B4154", kcalPerMl: 1.8, kcalPerGram: null },
  { name: "Pulmocare", manufacturer: "Abbott", hcpcsCode: "B4154", kcalPerMl: 1.5, kcalPerGram: null },
  { name: "Oxepa", manufacturer: "Abbott", hcpcsCode: "B4154", kcalPerMl: 1.5, kcalPerGram: null },
  { name: "Perative", manufacturer: "Abbott", hcpcsCode: "B4154", kcalPerMl: 1.3, kcalPerGram: null },
  { name: "Pivot 1.5 Cal", manufacturer: "Abbott", hcpcsCode: "B4154", kcalPerMl: 1.5, kcalPerGram: null },
  { name: "Novasource Renal", manufacturer: "Nestle", hcpcsCode: "B4154", kcalPerMl: 2.0, kcalPerGram: null },
  { name: "Nutren Pulmonary", manufacturer: "Nestle", hcpcsCode: "B4154", kcalPerMl: 1.5, kcalPerGram: null },
  { name: "Nutren Renal", manufacturer: "Nestle", hcpcsCode: "B4154", kcalPerMl: 2.0, kcalPerGram: null },
  { name: "Diabetisource AC", manufacturer: "Nestle", hcpcsCode: "B4154", kcalPerMl: 1.2, kcalPerGram: null },
  { name: "Renalcal", manufacturer: "Nestle", hcpcsCode: "B4154", kcalPerMl: 2.0, kcalPerGram: null },
  { name: "Impact Advanced Recovery", manufacturer: "Nestle", hcpcsCode: "B4154", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Kate Farms Glucose Support 1.2", manufacturer: "Kate Farms", hcpcsCode: "B4154", kcalPerMl: 1.2, kcalPerGram: null },
  { name: "Kate Farms Renal Support 1.8", manufacturer: "Kate Farms", hcpcsCode: "B4154", kcalPerMl: 1.8, kcalPerGram: null },

  // ── B4155: Modular/Incomplete nutrients ───────────────────────────────────
  { name: "Beneprotein (Protein Powder)", manufacturer: "Nestle", hcpcsCode: "B4155", kcalPerMl: null, kcalPerGram: null },
  { name: "Juven (Arginine/Glutamine)", manufacturer: "Abbott", hcpcsCode: "B4155", kcalPerMl: null, kcalPerGram: null },
  { name: "MCT Oil", manufacturer: "Various", hcpcsCode: "B4155", kcalPerMl: 7.7, kcalPerGram: null },
  { name: "Microlipid", manufacturer: "Nestle", hcpcsCode: "B4155", kcalPerMl: 4.5, kcalPerGram: null },
  { name: "Polycose (Liquid)", manufacturer: "Abbott", hcpcsCode: "B4155", kcalPerMl: 2.0, kcalPerGram: null },
  { name: "Polycose (Powder)", manufacturer: "Abbott", hcpcsCode: "B4155", kcalPerMl: null, kcalPerGram: 3.8, isPowder: true },
  { name: "Arginaid", manufacturer: "Nestle", hcpcsCode: "B4155", kcalPerMl: null, kcalPerGram: null },
  { name: "Glutasolve", manufacturer: "Nestle", hcpcsCode: "B4155", kcalPerMl: null, kcalPerGram: null },
  { name: "ProMod Liquid Protein", manufacturer: "Abbott", hcpcsCode: "B4155", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Resource Benefiber", manufacturer: "Nestle", hcpcsCode: "B4155", kcalPerMl: null, kcalPerGram: null },

  // ── B4157: Inherited disease of metabolism (Adult) ────────────────────────
  // Abbott "-2" powders: All 410 kcal per 100g = 4.1 kcal/g (source: abbottnutrition.com)
  // kcalPerMl at standard dilution (~20g/100mL water) = ~0.82 kcal/mL
  { name: "Phenex-2 (PKU)", manufacturer: "Abbott", hcpcsCode: "B4157", kcalPerMl: 0.82, kcalPerGram: 4.1, isPowder: true },
  { name: "Glutarex-2 (Glutaric Aciduria)", manufacturer: "Abbott", hcpcsCode: "B4157", kcalPerMl: 0.82, kcalPerGram: 4.1, isPowder: true },
  { name: "Hominex-2 (Homocystinuria)", manufacturer: "Abbott", hcpcsCode: "B4157", kcalPerMl: 0.82, kcalPerGram: 4.1, isPowder: true },
  { name: "Ketonex-2 (MSUD)", manufacturer: "Abbott", hcpcsCode: "B4157", kcalPerMl: 0.82, kcalPerGram: 4.1, isPowder: true },
  { name: "Propimex-2 (Propionic/Methylmalonic)", manufacturer: "Abbott", hcpcsCode: "B4157", kcalPerMl: 0.82, kcalPerGram: 4.1, isPowder: true },
  { name: "Tyrex-2 (Tyrosinemia)", manufacturer: "Abbott", hcpcsCode: "B4157", kcalPerMl: 0.82, kcalPerGram: 4.1, isPowder: true },
  // Nutricia powders (source: nutricia.co.uk, nutriciametabolics.com)
  { name: "PKU Anamix Early Years", manufacturer: "Nutricia", hcpcsCode: "B4157", kcalPerMl: 0.68, kcalPerGram: 3.75, isPowder: true },
  { name: "PKU Anamix Junior (Powder)", manufacturer: "Nutricia", hcpcsCode: "B4157", kcalPerMl: 0.94, kcalPerGram: 3.75, isPowder: true },
  { name: "PKU Anamix Junior LQ (Liquid)", manufacturer: "Nutricia", hcpcsCode: "B4157", kcalPerMl: 0.94, kcalPerGram: null },
  { name: "UCD Anamix Junior", manufacturer: "Nutricia", hcpcsCode: "B4157", kcalPerMl: 0.9, kcalPerGram: 3.85, isPowder: true },

  // ── B4158: Pediatric, intact nutrients ────────────────────────────────────
  { name: "PediaSure 1.0 Cal", manufacturer: "Abbott", hcpcsCode: "B4158", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "PediaSure with Fiber", manufacturer: "Abbott", hcpcsCode: "B4158", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Nutren Junior", manufacturer: "Nestle", hcpcsCode: "B4158", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Nutren Junior with Fiber", manufacturer: "Nestle", hcpcsCode: "B4158", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Boost Kid Essentials 1.0", manufacturer: "Nestle", hcpcsCode: "B4158", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Kate Farms Pediatric Standard 1.0", manufacturer: "Kate Farms", hcpcsCode: "B4158", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Compleat Pediatric Standard", manufacturer: "Nestle", hcpcsCode: "B4158", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Compleat Pediatric Reduced Calorie", manufacturer: "Nestle", hcpcsCode: "B4158", kcalPerMl: 0.6, kcalPerGram: null },

  // ── B4159: Pediatric, soy-based ──────────────────────────────────────────
  { name: "PediaSure (Soy-Based)", manufacturer: "Abbott", hcpcsCode: "B4159", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Bright Beginnings Pediatric Soy", manufacturer: "PBM Products", hcpcsCode: "B4159", kcalPerMl: 1.0, kcalPerGram: null },

  // ── B4160: Pediatric, calorically dense (>=0.7 kcal/mL) ──────────────────
  { name: "PediaSure 1.5 Cal", manufacturer: "Abbott", hcpcsCode: "B4160", kcalPerMl: 1.5, kcalPerGram: null },
  { name: "PediaSure Grow & Gain", manufacturer: "Abbott", hcpcsCode: "B4160", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "PediaSure Harvest", manufacturer: "Abbott", hcpcsCode: "B4160", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Boost Kid Essentials 1.5", manufacturer: "Nestle", hcpcsCode: "B4160", kcalPerMl: 1.5, kcalPerGram: null },
  { name: "Nutren Junior 1.5", manufacturer: "Nestle", hcpcsCode: "B4160", kcalPerMl: 1.5, kcalPerGram: null },
  { name: "Kate Farms Pediatric Standard 1.2", manufacturer: "Kate Farms", hcpcsCode: "B4160", kcalPerMl: 1.2, kcalPerGram: null },
  { name: "Compleat Pediatric 1.4", manufacturer: "Nestle", hcpcsCode: "B4160", kcalPerMl: 1.4, kcalPerGram: null },

  // ── B4161: Pediatric, hydrolyzed proteins ─────────────────────────────────
  { name: "PediaSure Peptide 1.0 Cal", manufacturer: "Abbott", hcpcsCode: "B4161", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "PediaSure Peptide 1.5 Cal", manufacturer: "Abbott", hcpcsCode: "B4161", kcalPerMl: 1.5, kcalPerGram: null },
  { name: "Peptamen Junior", manufacturer: "Nestle", hcpcsCode: "B4161", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Peptamen Junior 1.5", manufacturer: "Nestle", hcpcsCode: "B4161", kcalPerMl: 1.5, kcalPerGram: null },
  { name: "EleCare Jr", manufacturer: "Abbott", hcpcsCode: "B4161", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Neocate Junior", manufacturer: "Nutricia", hcpcsCode: "B4161", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Kate Farms Pediatric Peptide 1.0", manufacturer: "Kate Farms", hcpcsCode: "B4161", kcalPerMl: 1.0, kcalPerGram: null },
  { name: "Kate Farms Pediatric Peptide 1.5", manufacturer: "Kate Farms", hcpcsCode: "B4161", kcalPerMl: 1.5, kcalPerGram: null },
  { name: "Compleat Pediatric Peptide", manufacturer: "Nestle", hcpcsCode: "B4161", kcalPerMl: 1.0, kcalPerGram: null },

  // ── B4162: Pediatric, inherited disease of metabolism ─────────────────────
  // Abbott "-1" powders: All 480 kcal per 100g = 4.8 kcal/g (source: abbottnutrition.com)
  { name: "Phenex-1 (PKU)", manufacturer: "Abbott", hcpcsCode: "B4162", kcalPerMl: null, kcalPerGram: 4.8, isPowder: true },
  { name: "Glutarex-1 (Glutaric Aciduria)", manufacturer: "Abbott", hcpcsCode: "B4162", kcalPerMl: null, kcalPerGram: 4.8, isPowder: true },
  { name: "Hominex-1 (Homocystinuria)", manufacturer: "Abbott", hcpcsCode: "B4162", kcalPerMl: null, kcalPerGram: 4.8, isPowder: true },
  { name: "Ketonex-1 (MSUD)", manufacturer: "Abbott", hcpcsCode: "B4162", kcalPerMl: null, kcalPerGram: 4.8, isPowder: true },
  { name: "Propimex-1 (Propionic/Methylmalonic)", manufacturer: "Abbott", hcpcsCode: "B4162", kcalPerMl: null, kcalPerGram: 4.8, isPowder: true },
  { name: "Tyrex-1 (Tyrosinemia)", manufacturer: "Abbott", hcpcsCode: "B4162", kcalPerMl: null, kcalPerGram: 4.8, isPowder: true },
  { name: "PKU Anamix Infant", manufacturer: "Nutricia", hcpcsCode: "B4162", kcalPerMl: null, kcalPerGram: null },
  { name: "Neocate Infant DHA/ARA", manufacturer: "Nutricia", hcpcsCode: "B4162", kcalPerMl: null, kcalPerGram: null },
  { name: "EleCare (Infant)", manufacturer: "Abbott", hcpcsCode: "B4162", kcalPerMl: null, kcalPerGram: null },
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
