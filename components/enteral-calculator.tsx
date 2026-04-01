"use client"

import { useState, useMemo, useCallback, useEffect } from "react"
import { differenceInCalendarDays, format, parse, isValid } from "date-fns"
import { CalendarIcon, ChevronDown, ChevronRight, Calculator, RotateCcw } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  HCPCS_CODES,
  ENTERAL_PRODUCTS,
  getProductsByCode,
  OZ_TO_ML,
  G_TO_ML,
  type EnteralProduct,
} from "@/lib/enteral-data"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

// ─── Sub-components ────────────────────────────────────────────────────────────

function HcpcsCodeSelector({
  value,
  onChange,
}: {
  value: string
  onChange: (code: string) => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="hcpcs-code" className="text-foreground font-semibold">
        HCPCS Code
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="hcpcs-code"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between h-10 font-normal text-left"
          >
            {value ? (
              <span className="truncate">
                <span className="font-semibold">{value}</span>
                {" - "}
                {HCPCS_CODES.find((c) => c.code === value)?.shortDescription}
              </span>
            ) : (
              <span className="text-muted-foreground">Search or select a code...</span>
            )}
            <ChevronDown className="ml-2 size-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
          <Command>
            <CommandInput placeholder="Search HCPCS code..." />
            <CommandList>
              <CommandEmpty>No code found.</CommandEmpty>
              <CommandGroup>
                {HCPCS_CODES.map((hcpcs) => (
                  <CommandItem
                    key={hcpcs.code}
                    value={`${hcpcs.code} ${hcpcs.shortDescription}`}
                    onSelect={() => {
                      onChange(hcpcs.code)
                      setOpen(false)
                    }}
                  >
                    <span className="font-semibold text-primary mr-1.5">
                      {hcpcs.code}
                    </span>
                    <span className="text-muted-foreground truncate text-xs">
                      {hcpcs.shortDescription}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {value === "B4149" && (
        <p className="text-sm font-bold text-destructive">
          This HCPC may have restrictions, check plan criteria.
        </p>
      )}
      {value && (
        <p className="text-xs text-muted-foreground leading-relaxed">
          {HCPCS_CODES.find((c) => c.code === value)?.longDescription}
        </p>
      )}
    </div>
  )
}

function FormulaSelector({
  products,
  value,
  onChange,
  disabled,
}: {
  products: EnteralProduct[]
  value: string
  onChange: (name: string) => void
  disabled: boolean
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="formula" className="text-foreground font-semibold">
        Formula Name
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="formula"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            className="w-full justify-between h-10 font-normal text-left"
          >
            {value ? (
              <span className="truncate">
                {value}
                {" "}
                <span className="text-muted-foreground text-xs">
                  ({products.find((p) => p.name === value)?.manufacturer})
                </span>
              </span>
            ) : (
              <span className="text-muted-foreground">
                {disabled ? "Select HCPCS code first" : "Search or select a formula..."}
              </span>
            )}
            <ChevronDown className="ml-2 size-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
          <Command>
            <CommandInput placeholder="Search formulas..." />
            <CommandList>
              <CommandEmpty>No formula found.</CommandEmpty>
              <CommandGroup>
                {products.map((product) => (
                  <CommandItem
                    key={product.name}
                    value={`${product.name} ${product.manufacturer}`}
                    onSelect={() => {
                      onChange(product.name)
                      setOpen(false)
                    }}
                  >
                    <div className="flex flex-col gap-0.5">
                      <span className="font-medium">{product.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {product.manufacturer}
                        {product.isPowder && product.kcalPerGram !== null && ` \u2022 ${product.kcalPerGram} kcal/g`}
                        {product.kcalPerMl !== null && ` \u2022 ${product.kcalPerMl} kcal/mL`}
                        {product.isPowder && <span className="ml-1 text-primary">(powder)</span>}
                      </span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {products.length > 0 && !disabled && (
        <p className="text-xs text-muted-foreground">
          {products.length} formula{products.length !== 1 ? "s" : ""} available for this code
        </p>
      )}
    </div>
  )
}

function DatePickerField({
  label,
  value,
  onChange,
  minDate,
}: {
  label: string
  value: Date | undefined
  onChange: (date: Date | undefined) => void
  minDate?: Date
}) {
  const [open, setOpen] = useState(false)
  const [textValue, setTextValue] = useState(value ? format(value, "MM/dd/yyyy") : "")

  // Sync text when calendar picks a date
  useEffect(() => {
    if (value) setTextValue(format(value, "MM/dd/yyyy"))
  }, [value])

  const handleTextChange = (raw: string) => {
  // Allow only digits and slashes while typing
  const cleaned = raw.replace(/[^\d/]/g, "")
  setTextValue(cleaned)
  
  // Parse various date formats
  const digitsOnly = cleaned.replace(/\//g, "")
  let parsed: Date | null = null
  
  // Try MM/DD/YYYY format (with slashes, 10 chars)
  if (cleaned.length === 10 && cleaned.includes("/")) {
    parsed = parse(cleaned, "MM/dd/yyyy", new Date())
  }
  // Try MMDDYYYY format (8 digits, no slashes)
  else if (digitsOnly.length === 8 && !cleaned.includes("/")) {
    parsed = parse(digitsOnly, "MMddyyyy", new Date())
  }
  // Try MM/DD/YY format (with slashes, 8 chars)
  else if (cleaned.length === 8 && cleaned.includes("/")) {
    parsed = parse(cleaned, "MM/dd/yy", new Date())
  }
  // Try MMDDYY format (6 digits, no slashes)
  else if (digitsOnly.length === 6 && !cleaned.includes("/")) {
    parsed = parse(digitsOnly, "MMddyy", new Date())
  }
  
  if (parsed && isValid(parsed)) {
    if (minDate && parsed < minDate) return
    onChange(parsed)
    // Update display to standard format
    setTextValue(format(parsed, "MM/dd/yyyy"))
  }
  }

  return (
    <div className="flex flex-col gap-2">
      <Label className="text-foreground font-semibold">{label}</Label>
      <div className="flex gap-2">
  <Input
  type="text"
  placeholder="MMDDYY or MM/DD/YYYY"
  value={textValue}
  onChange={(e) => handleTextChange(e.target.value)}
  maxLength={10}
  className="flex-1 h-10"
  />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon" className="h-10 w-10 shrink-0">
              <CalendarIcon className="size-4" />
              <span className="sr-only">Pick date from calendar</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="single"
              selected={value}
              onSelect={(date) => {
                onChange(date)
                setOpen(false)
              }}
              disabled={minDate ? (date) => date < minDate : undefined}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

// ─── Results Display ───────────────────────────────────────────────────────────

type BaseVolumeUnit = "oz" | "mL" | "g" | "kcal"
type VolumeUnit = BaseVolumeUnit | string // string for packaging units like "pkg-0", "pkg-1", etc.
type DensityType = "kcal/mL" | "kcal/g"
type TimePeriod = "day" | "month"

interface CalculationResult {
  dailyMl: number
  dailyVolume: number
  volumeUnit: VolumeUnit
  volumeUnitLabel: string // Human-readable label (e.g., "8 oz can" instead of "pkg-0")
  densityType: DensityType | null
  densityValue: number | null
  caloriesPerDay: number
  numDays: number
  totalCalories: number
  totalUnits: number
  formulaName: string
  hcpcsCode: string
}

/** Format a number: rounds to whole if very close, otherwise up to `digits` decimal places */
function fmt(n: number, digits = 2): string {
  // Round to whole number if within 0.1 of an integer (e.g., 720.02 -> 720)
  const rounded = Math.round(n)
  if (Math.abs(n - rounded) < 0.1) {
    return rounded.toString()
  }
  return Number.isInteger(n) ? n.toString() : parseFloat(n.toFixed(digits)).toString()
}

function ResultsCard({ result }: { result: CalculationResult }) {
  return (
    <Card className="border-2 border-primary/20 bg-primary/[0.02]">
      <CardHeader>
        <CardTitle className="text-lg text-primary">Calculation Results</CardTitle>
        <CardDescription>
          {result.formulaName} ({result.hcpcsCode})
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {/* Breakdown */}
        <div className={`grid gap-3 text-sm ${result.densityValue !== null ? "grid-cols-2" : "grid-cols-3"}`}>
          {result.densityValue !== null && (
            <div className="flex flex-col gap-1 rounded-lg bg-muted/60 p-3">
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                Daily Volume
              </span>
  <span className="font-semibold text-foreground">
  {fmt(result.dailyVolume)} {result.volumeUnitLabel}/day
  </span>
            </div>
          )}
          {result.densityValue !== null && result.densityType !== null && (
            <div className="flex flex-col gap-1 rounded-lg bg-muted/60 p-3">
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                Caloric Density
              </span>
              <span className="font-semibold text-foreground">
                {fmt(result.densityValue)} {result.densityType}
              </span>
            </div>
          )}
          <div className="flex flex-col gap-1 rounded-lg bg-muted/60 p-3">
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
              Calories/Day
            </span>
            <span className="font-semibold text-foreground">
              {fmt(result.caloriesPerDay)} kcal
            </span>
          </div>
          <div className="flex flex-col gap-1 rounded-lg bg-muted/60 p-3">
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
              Number of Days
            </span>
            <span className="font-semibold text-foreground">
              {result.numDays} day{result.numDays !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        <Separator />

        <div className="flex flex-col gap-1 rounded-lg bg-muted/60 p-3">
          <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
            Total Calories
          </span>
          <span className="font-semibold text-foreground">
            {Number.isInteger(result.totalCalories) ? result.totalCalories.toLocaleString("en-US") : result.totalCalories.toLocaleString("en-US", { maximumFractionDigits: 2 })} kcal
          </span>
        </div>

        {/* Final result */}
        <div className="flex flex-col items-center gap-2 rounded-xl bg-primary p-6 text-primary-foreground">
          <span className="text-xs font-medium uppercase tracking-widest opacity-80">
            Total Units per Requested Date Span
          </span>
          <span className="text-4xl font-bold tracking-tight">
            {fmt(result.totalUnits)}
          </span>
          <Badge variant="secondary" className="mt-1 text-xs">
            {Number.isInteger(result.totalCalories) ? result.totalCalories.toLocaleString("en-US") : result.totalCalories.toLocaleString("en-US", { maximumFractionDigits: 2 })} kcal / 100
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}

function ResultsSummary({ result }: { result: CalculationResult }) {
  const unitsPerDay = result.caloriesPerDay / 100
  const isDirectCalorieInput = result.densityType === null
  
  // Format volume display - use "x" notation for packaging units (e.g., "4 x 8 fl oz bottles")
  const isPackagingUnit = result.volumeUnit.startsWith("pkg-")
  const volumeDisplay = isPackagingUnit 
    ? `${fmt(result.dailyVolume)} x ${result.volumeUnitLabel}${result.dailyVolume !== 1 ? "s" : ""}`
    : `${fmt(result.dailyVolume)} ${result.volumeUnitLabel}`
  
  // Calculate kcal per user unit for display (e.g., kcal/oz)
  // This gives us the density in the user's chosen unit
  const kcalPerUserUnit = result.dailyVolume > 0 
    ? (result.caloriesPerDay / result.dailyVolume)
    : result.densityValue
  
  // Build the density label using the user's unit
  const densityLabel = isDirectCalorieInput
    ? "direct calorie input"
    : `${fmt(kcalPerUserUnit!)} calories per ${result.volumeUnitLabel}`

  return (
  <Card>
  <CardContent className="flex flex-col gap-3 pt-5">
  <p className="text-sm text-foreground leading-relaxed">
  {isDirectCalorieInput 
    ? `The patient receives ${fmt(result.caloriesPerDay)} calories per day (${densityLabel}), which equals ${fmt(unitsPerDay)} units/day. The request is for ${result.numDays} day${result.numDays !== 1 ? "s" : ""}, therefore ${fmt(result.totalUnits)} units per requested date span are required.`
    : `The patient receives ${volumeDisplay} per day, the requested ${result.formulaName} provides ${densityLabel} (${fmt(result.caloriesPerDay)} calories/day, ${fmt(unitsPerDay)} units/day), the request is for ${result.numDays} day${result.numDays !== 1 ? "s" : ""}, therefore ${fmt(result.totalUnits)} units per requested date span are required.`
  }
  </p>
  <Separator />
  <div className="flex flex-col gap-1.5 text-xs text-muted-foreground font-mono">
  {isDirectCalorieInput ? (
    <p>{`${fmt(result.caloriesPerDay)} calories/day (direct input)`}</p>
  ) : (
    <p>{`${fmt(result.dailyVolume)} ${result.volumeUnitLabel} x ${fmt(kcalPerUserUnit!)} kcal/${result.volumeUnitLabel} = ${fmt(result.caloriesPerDay)} calories/day`}</p>
  )}
          <p>{`${fmt(result.caloriesPerDay)} calories/day x ${result.numDays} day${result.numDays !== 1 ? "s" : ""} = ${fmt(result.totalCalories)} total calories`}</p>
          <p>{`${fmt(result.totalCalories)} total calories / 100 = ${fmt(result.totalUnits)} units per requested date span`}</p>
        </div>
      </CardContent>
    </Card>
  )
}

// ─── Volume Calculator ─────────────────────────────────────────────────────────

function VolumeCalculator({
  onApply,
  densityType,
  packaging,
}: {
  onApply: (amount: string, unit: VolumeUnit) => void
  densityType: DensityType
  packaging?: EnteralProduct["packaging"]
}) {
  const [open, setOpen] = useState(false)
  const [amountPerFeeding, setAmountPerFeeding] = useState("")
  const [feedingUnit, setFeedingUnit] = useState<VolumeUnit>(densityType === "kcal/g" ? "g" : "mL")
  const [timesPerDay, setTimesPerDay] = useState("")

  // Sync feedingUnit when densityType changes (only reset to base units, not packaging)
  useEffect(() => {
    if (!feedingUnit.startsWith("pkg-")) {
      setFeedingUnit(densityType === "kcal/g" ? "g" : "mL")
    }
  }, [densityType, feedingUnit])

  const calculatedTotal = useMemo(() => {
    const amt = parseFloat(amountPerFeeding)
    const times = parseFloat(timesPerDay)
    if (isNaN(amt) || isNaN(times) || amt <= 0 || times <= 0) return null
    return amt * times
  }, [amountPerFeeding, timesPerDay])

  // Get display label for the current unit
  const unitLabel = useMemo(() => {
    if (feedingUnit.startsWith("pkg-") && packaging) {
      const pkgIdx = parseInt(feedingUnit.replace("pkg-", ""))
      return packaging[pkgIdx]?.label || feedingUnit
    }
    return feedingUnit
  }, [feedingUnit, packaging])

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-xs font-medium text-primary hover:underline cursor-pointer w-fit"
      >
        <ChevronRight
          className={cn("size-3.5 transition-transform", open && "rotate-90")}
        />
        Calculate daily volume
      </button>

      {open && (
        <div className="rounded-lg border border-border bg-muted/40 p-3 flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs text-muted-foreground">Amount per feeding</Label>
              <div className="flex gap-1.5">
                <Input
                  type="number"
                  step="0.1"
                  min="0"
                  placeholder="Amount"
                  value={amountPerFeeding}
                  onChange={(e) => setAmountPerFeeding(e.target.value)}
                  className="flex-1 h-8 text-sm"
                />
                <Select
                  value={feedingUnit}
                  onValueChange={(val: VolumeUnit) => setFeedingUnit(val)}
                >
                  <SelectTrigger className="w-20 h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="oz">oz</SelectItem>
                    <SelectItem value="mL">mL</SelectItem>
                    <SelectItem value="g">g</SelectItem>
                    {packaging && packaging.length > 0 && (
                      <>
                        <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground border-t mt-1 pt-2">
                          Packaging
                        </div>
                        {packaging.map((pkg, idx) => (
                          <SelectItem key={`pkg-${idx}`} value={`pkg-${idx}`}>
                            {pkg.label}
                          </SelectItem>
                        ))}
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs text-muted-foreground">Times per day</Label>
              <Input
                type="number"
                step="1"
                min="1"
                placeholder="# feedings"
                value={timesPerDay}
                onChange={(e) => setTimesPerDay(e.target.value)}
                className="h-8 text-sm"
              />
            </div>
          </div>

          {calculatedTotal !== null && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-foreground">
                = {fmt(calculatedTotal)} {unitLabel}/day
              </span>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="h-8 text-xs"
                onClick={() => {
                  onApply(fmt(calculatedTotal), feedingUnit)
                  setOpen(false)
                }}
              >
                Use this
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Main Calculator ───────────────────────────────────────────────────────────

export function EnteralCalculator() {
  // Form state
  const [hcpcsCode, setHcpcsCode] = useState("")
  const [formulaName, setFormulaName] = useState("")
  const [volumeAmount, setVolumeAmount] = useState("")
  const [volumeUnit, setVolumeUnit] = useState<VolumeUnit>("mL")
  const [volumeTimePeriod, setVolumeTimePeriod] = useState<TimePeriod>("day")
  const [startDate, setStartDate] = useState<Date | undefined>()
  const [endDate, setEndDate] = useState<Date | undefined>()
  const [result, setResult] = useState<CalculationResult | null>(null)
  const [errors, setErrors] = useState<string[]>([])
  const [showDensityOverride, setShowDensityOverride] = useState(false)
  const [densityOverride, setDensityOverride] = useState("")

  // Derived state
  const availableProducts = useMemo(
    () => (hcpcsCode ? getProductsByCode(hcpcsCode) : []),
    [hcpcsCode]
  )
  
  const selectedProduct = useMemo(
    () => ENTERAL_PRODUCTS.find((p) => p.name === formulaName && p.hcpcsCode === hcpcsCode),
    [formulaName, hcpcsCode]
  )

  // Handlers
  const handleHcpcsChange = useCallback((code: string) => {
    setHcpcsCode(code)
    setFormulaName("") // Clear formula when code changes
    setVolumeUnit("mL")
    setShowDensityOverride(false)
    setDensityOverride("")
    setResult(null)
    setErrors([])
  }, [])

  const handleFormulaChange = useCallback((name: string) => {
    setFormulaName(name)
    
    const product = ENTERAL_PRODUCTS.find((p) => p.name === name && p.hcpcsCode === hcpcsCode)
    // Auto-set volume unit based on product type
    if (product?.isPowder && product.kcalPerGram !== null) {
      setVolumeUnit("g")
    } else {
      setVolumeUnit("mL")
    }
    // Clear any density override when formula changes
    setShowDensityOverride(false)
    setDensityOverride("")
    setResult(null)
    setErrors([])
  }, [hcpcsCode])

  const handleCalculate = useCallback(() => {
    const newErrors: string[] = []
    
    // When using calories as input, formula is optional
    const isCalorieInput = volumeUnit === "kcal"

    if (!isCalorieInput) {
      if (!hcpcsCode) newErrors.push("Please select an HCPCS code.")
      if (!formulaName) newErrors.push("Please select a formula.")
      if (!selectedProduct) newErrors.push("Please select a valid formula.")
    }

    const vol = parseFloat(volumeAmount)
    if (!volumeAmount || isNaN(vol) || vol <= 0) {
      newErrors.push("Please enter a valid volume amount.")
    }

    if (!startDate) newErrors.push("Please select a start date.")
    if (!endDate) newErrors.push("Please select an end date.")

    if (startDate && endDate && endDate < startDate) {
      newErrors.push("End date must be on or after start date.")
    }

    // Determine effective caloric density (only needed when not using direct calorie input)
    let effectiveDensityType: DensityType = "kcal/mL"
    let effectiveKcalValue: number | null | undefined = null
    
    if (!isCalorieInput) {
      // Use kcal/g ONLY when:
      // 1. Product is marked as powder AND has kcalPerGram, AND
      // 2. User is entering grams (volumeUnit === "g") OR a powder packaging unit
      const isPowderPackaging = volumeUnit.startsWith("pkg-") && selectedProduct?.packaging
        ? selectedProduct.packaging[parseInt(volumeUnit.replace("pkg-", ""))]?.gramsPerUnit !== undefined
        : false
      const userEnteringPowderUnits = volumeUnit === "g" || isPowderPackaging
      
      effectiveDensityType = userEnteringPowderUnits && selectedProduct?.kcalPerGram !== null
        ? "kcal/g" 
        : "kcal/mL"
      
      // Check if user provided an override
      const overrideValue = densityOverride ? parseFloat(densityOverride) : null
      if (overrideValue !== null && !isNaN(overrideValue) && overrideValue > 0) {
        effectiveKcalValue = overrideValue
      } else {
        effectiveKcalValue = effectiveDensityType === "kcal/g" 
          ? selectedProduct?.kcalPerGram 
          : selectedProduct?.kcalPerMl
      }

      if (effectiveKcalValue === null || effectiveKcalValue === undefined) {
        newErrors.push("Caloric density data not available for this formula.")
      }
    }

    if (newErrors.length > 0) {
      setErrors(newErrors)
      setResult(null)
      return
    }

    const kcal = effectiveKcalValue ?? 1
    const numDays = differenceInCalendarDays(endDate!, startDate!) + 1

  let dailyMl: number
  let dailyGrams: number
  let caloriesPerDay: number
  let displayUnit: VolumeUnit = volumeUnit
  
  // Get human-readable label for volume unit (especially for packaging)
  let displayUnitLabel: string = volumeUnit
  if (volumeUnit.startsWith("pkg-") && selectedProduct?.packaging) {
    const pkgIdx = parseInt(volumeUnit.replace("pkg-", ""))
    displayUnitLabel = selectedProduct.packaging[pkgIdx]?.label || volumeUnit
  }

    // Handle direct calorie input
    if (volumeUnit === "kcal") {
      // User entered calories directly
      const inputCalories = vol
      caloriesPerDay = volumeTimePeriod === "month" ? inputCalories / 30 : inputCalories
      
      // For direct calorie input, we don't have actual volume - set to 0 since it's not meaningful
      dailyMl = 0
      dailyGrams = 0
    } else {
      // Calculate volume in base units (before time period conversion)
      let volumeMl: number
      let volumeGrams: number

      if (volumeUnit.startsWith("pkg-")) {
        // Handle packaging units
        const pkgIdx = parseInt(volumeUnit.replace("pkg-", ""))
        const pkg = selectedProduct?.packaging?.[pkgIdx]
        if (pkg) {
          if (pkg.mlPerUnit) {
            volumeMl = vol * pkg.mlPerUnit
            volumeGrams = volumeMl * G_TO_ML
          } else if (pkg.gramsPerUnit) {
            volumeGrams = vol * pkg.gramsPerUnit
            volumeMl = volumeGrams / G_TO_ML
          } else {
            volumeMl = 0
            volumeGrams = 0
          }
        } else {
          volumeMl = 0
          volumeGrams = 0
        }
      } else if (volumeUnit === "oz") {
        volumeMl = vol * OZ_TO_ML
        volumeGrams = volumeMl * G_TO_ML
      } else if (volumeUnit === "g") {
        volumeGrams = vol
        volumeMl = vol / G_TO_ML
      } else {
        // mL
        volumeMl = vol
        volumeGrams = vol * G_TO_ML
      }

      // Convert to daily values based on time period
      if (volumeTimePeriod === "month") {
        // If user entered monthly amount, divide by 30 to get daily
        dailyMl = volumeMl / 30
        dailyGrams = volumeGrams / 30
      } else {
        dailyMl = volumeMl
        dailyGrams = volumeGrams
      }

      // Calculate calories based on density type
      if (effectiveDensityType === "kcal/g") {
        caloriesPerDay = dailyGrams * kcal
      } else {
        caloriesPerDay = dailyMl * kcal
      }
    }

    const totalCalories = caloriesPerDay * numDays
    const totalUnitsRaw = totalCalories / 100
    const totalUnits = Number.isInteger(totalUnitsRaw) ? totalUnitsRaw : Math.ceil(totalUnitsRaw)

  setResult({
  dailyMl,
  dailyVolume: vol,
  volumeUnit: displayUnit,
  volumeUnitLabel: displayUnitLabel,
  densityType: isCalorieInput ? null : effectiveDensityType,
  densityValue: isCalorieInput ? null : kcal,
  caloriesPerDay,
  numDays,
  totalCalories,
  totalUnits,
  formulaName: isCalorieInput ? "Direct Calorie Input" : formulaName,
  hcpcsCode: isCalorieInput ? hcpcsCode || "N/A" : hcpcsCode,
  })
    setErrors([])
  }, [hcpcsCode, formulaName, selectedProduct, volumeAmount, volumeUnit, volumeTimePeriod, startDate, endDate, densityOverride])

  const handleReset = useCallback(() => {
    setHcpcsCode("")
    setFormulaName("")
    setVolumeAmount("")
    setVolumeUnit("mL")
    setVolumeTimePeriod("day")
    setShowDensityOverride(false)
    setDensityOverride("")
    // Preserve valid date span - only clear if dates are invalid
    if (!startDate || !endDate || endDate < startDate) {
      setStartDate(undefined)
      setEndDate(undefined)
    }
    setResult(null)
    setErrors([])
  }, [startDate, endDate])

  return (
    <div className={cn("flex flex-col gap-6 w-full max-w-xl mx-auto", result && "calculated")}>
      {/* Main Form Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl text-primary">
            <Calculator className="size-5" />
            Enteral Nutrition Unit Calculator
          </CardTitle>
          <CardDescription>
            Select an HCPCS code, then choose a formula to calculate billing units.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          {/* Step 1: HCPCS Code Selection */}
          <HcpcsCodeSelector
            value={hcpcsCode}
            onChange={handleHcpcsChange}
          />

          {/* Step 2: Formula Selection */}
          <FormulaSelector
            products={availableProducts}
            value={formulaName}
            onChange={handleFormulaChange}
            disabled={!hcpcsCode}
          />

          <Separator />

          {/* Step 4: Volume Input */}
          <div className="flex flex-col gap-3">
            <Label htmlFor="volume" className="text-foreground font-semibold">
              Volume / Quantity
            </Label>
            
            {/* Time period toggle */}
            <div className="flex rounded-lg border border-border overflow-hidden w-fit">
              <button
                type="button"
                onClick={() => {
                  setVolumeTimePeriod("day")
                  setResult(null)
                }}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium transition-colors",
                  volumeTimePeriod === "day"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/40 text-muted-foreground hover:bg-muted"
                )}
              >
                Per Day
              </button>
              <button
                type="button"
                onClick={() => {
                  setVolumeTimePeriod("month")
                  setResult(null)
                }}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium transition-colors",
                  volumeTimePeriod === "month"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/40 text-muted-foreground hover:bg-muted"
                )}
              >
                Per Month
              </button>
            </div>

            <div className="flex gap-2">
              <Input
                id="volume"
                type="number"
                step="0.1"
                min="0"
                placeholder={`Amount per ${volumeTimePeriod}`}
                value={volumeAmount}
                onChange={(e) => {
                  setVolumeAmount(e.target.value)
                  setResult(null)
                }}
                className="flex-1"
              />
              <Select
                value={volumeUnit}
                onValueChange={(val: VolumeUnit) => {
                  setVolumeUnit(val)
                  setResult(null)
                }}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {/* Standard Units */}
                  <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                    Volume Units
                  </div>
                  <SelectItem value="mL">mL</SelectItem>
                  <SelectItem value="oz">oz</SelectItem>
                  <SelectItem value="g">g (powder)</SelectItem>
                  
                  {/* Calories */}
                  <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground border-t mt-1 pt-2">
                    Calories
                  </div>
                  <SelectItem value="kcal">kcal</SelectItem>
                  
                  {/* Product-specific packaging options */}
                  {selectedProduct?.packaging && selectedProduct.packaging.length > 0 && (
                    <>
                      <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground border-t mt-1 pt-2">
                        Packaging
                      </div>
                      {selectedProduct.packaging.map((pkg, idx) => (
                        <SelectItem key={`${pkg.type}-${idx}`} value={`pkg-${idx}`}>
                          {pkg.label}
                        </SelectItem>
                      ))}
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>
            
            {/* Volume conversion info */}
            {volumeAmount && parseFloat(volumeAmount) > 0 && (
              <div className="text-xs text-muted-foreground bg-muted/30 rounded-md p-2">
                {(() => {
                  const amount = parseFloat(volumeAmount)
                  const perPeriod = volumeTimePeriod === "month" ? "per month" : "per day"
                  const dailyAmount = volumeTimePeriod === "month" ? amount / 30 : amount
                  
                  // Handle calorie input
                  if (volumeUnit === "kcal") {
                    const dailyKcal = dailyAmount
                    const effectiveDensityType = selectedProduct?.isPowder && selectedProduct?.kcalPerGram !== null 
                      ? "kcal/g" 
                      : "kcal/mL"
                    const effectiveKcalValue = effectiveDensityType === "kcal/g" 
                      ? selectedProduct?.kcalPerGram 
                      : selectedProduct?.kcalPerMl
                    
                    let dailyVolume: number | null = null
                    let volumeLabel = ""
                    
                    if (effectiveKcalValue && effectiveKcalValue > 0) {
                      if (effectiveDensityType === "kcal/g") {
                        dailyVolume = dailyKcal / effectiveKcalValue
                        volumeLabel = "g"
                      } else {
                        dailyVolume = dailyKcal / effectiveKcalValue
                        volumeLabel = "mL"
                      }
                    }
                    
                    return (
                      <div className="flex flex-col gap-1">
                        <span className="font-medium">
                          {amount} kcal {perPeriod}
                        </span>
                        {volumeTimePeriod === "month" && (
                          <span>= {fmt(dailyKcal)} kcal per day (avg)</span>
                        )}
                        {dailyVolume !== null && (
                          <span>= {fmt(dailyVolume)} {volumeLabel} per day</span>
                        )}
                      </div>
                    )
                  }
                  
                  // Handle volume/packaging input
                  let baseMl: number | null = null
                  let baseGrams: number | null = null
                  let unitLabel = ""
                  
                  if (volumeUnit === "oz") {
                    baseMl = amount * OZ_TO_ML
                    unitLabel = "oz"
                  } else if (volumeUnit === "mL") {
                    baseMl = amount
                    unitLabel = "mL"
                  } else if (volumeUnit === "g") {
                    baseGrams = amount
                    unitLabel = "g"
                  } else if (volumeUnit.startsWith("pkg-")) {
                    const pkgIdx = parseInt(volumeUnit.replace("pkg-", ""))
                    const pkg = selectedProduct?.packaging?.[pkgIdx]
                    if (pkg) {
                      unitLabel = pkg.label
                      if (pkg.mlPerUnit) {
                        baseMl = amount * pkg.mlPerUnit
                      } else if (pkg.gramsPerUnit) {
                        baseGrams = amount * pkg.gramsPerUnit
                      }
                    }
                  }
                  
                  const dailyMl = baseMl !== null ? (volumeTimePeriod === "month" ? baseMl / 30 : baseMl) : null
                  const dailyGrams = baseGrams !== null ? (volumeTimePeriod === "month" ? baseGrams / 30 : baseGrams) : null
                  
                  // Calculate estimated calories
                  // Use kcal/g ONLY when user is entering grams or powder packaging
                  const isPowderPackaging = volumeUnit.startsWith("pkg-") && selectedProduct?.packaging
                    ? selectedProduct.packaging[parseInt(volumeUnit.replace("pkg-", ""))]?.gramsPerUnit !== undefined
                    : false
                  const userEnteringPowderUnits = volumeUnit === "g" || isPowderPackaging
                  
                  const effectiveDensityType = userEnteringPowderUnits && selectedProduct?.kcalPerGram !== null
                    ? "kcal/g" 
                    : "kcal/mL"
                  const effectiveKcalValue = effectiveDensityType === "kcal/g" 
                    ? selectedProduct?.kcalPerGram 
                    : selectedProduct?.kcalPerMl
                  
                  let dailyKcal: number | null = null
                  if (effectiveKcalValue) {
                    if (effectiveDensityType === "kcal/g" && dailyGrams !== null) {
                      dailyKcal = dailyGrams * effectiveKcalValue
                    } else if (dailyMl !== null) {
                      dailyKcal = dailyMl * effectiveKcalValue
                    }
                  }
                  
                  return (
                    <div className="flex flex-col gap-1">
                      <span className="font-medium">
                        {amount} {volumeUnit.startsWith("pkg-") ? unitLabel : volumeUnit} {perPeriod}
                      </span>
                      {volumeTimePeriod === "month" && (
                        <span>
                          = {fmt(dailyAmount)} {volumeUnit.startsWith("pkg-") ? unitLabel : volumeUnit} per day (avg)
                        </span>
                      )}
                      {dailyMl !== null && volumeUnit !== "mL" && (
                        <span>= {fmt(dailyMl)} mL per day</span>
                      )}
                      {dailyGrams !== null && volumeUnit !== "g" && (
                        <span>= {fmt(dailyGrams)} g per day</span>
                      )}
                      {dailyKcal !== null && (
                        <span className="text-primary font-medium">= {fmt(dailyKcal)} kcal per day</span>
                      )}
                    </div>
                  )
                })()}
              </div>
            )}
            
                <VolumeCalculator
                  densityType={selectedProduct?.isPowder ? "kcal/g" : "kcal/mL"}
                  packaging={selectedProduct?.packaging}
                  onApply={(amount, unit) => {
                    setVolumeAmount(amount)
                    setVolumeUnit(unit)
                    setVolumeTimePeriod("day") // Calculator always produces daily values
                setResult(null)
              }}
            />
            
            {/* Caloric Density Override */}
            {selectedProduct && volumeUnit !== "kcal" && (
              <div className="flex flex-col gap-2">
                {!showDensityOverride ? (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="w-fit text-xs text-muted-foreground hover:text-foreground"
                    onClick={() => setShowDensityOverride(true)}
                  >
                    <ChevronRight className="size-3 mr-1" />
                    Override caloric density
                  </Button>
                ) : (
                  <div className="rounded-lg border border-border bg-muted/30 p-3 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs font-medium text-muted-foreground">
                        Custom Caloric Density Override
                      </Label>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2 text-xs"
                        onClick={() => {
                          setShowDensityOverride(false)
                          setDensityOverride("")
                          setResult(null)
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder={selectedProduct?.isPowder ? "e.g., 4.2" : "e.g., 1.0"}
                        value={densityOverride}
                        onChange={(e) => {
                          setDensityOverride(e.target.value)
                          setResult(null)
                        }}
                        className="flex-1 h-8 text-sm"
                      />
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {selectedProduct?.isPowder && selectedProduct?.kcalPerGram !== null ? "kcal/g" : "kcal/mL"}
                      </span>
                    </div>
                    {selectedProduct && (
                      <p className="text-xs text-muted-foreground">
                        Default: {selectedProduct.isPowder && selectedProduct.kcalPerGram !== null 
                          ? `${selectedProduct.kcalPerGram} kcal/g`
                          : selectedProduct.kcalPerMl !== null 
                            ? `${selectedProduct.kcalPerMl} kcal/mL`
                            : "Not available"}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Step 5: Date Range */}
          <div className="grid grid-cols-2 gap-4">
            <DatePickerField
              label="Start Date"
              value={startDate}
              onChange={(date) => {
                setStartDate(date)
                setResult(null)
              }}
            />
            <DatePickerField
              label="End Date"
              value={endDate}
              onChange={(date) => {
                setEndDate(date)
                setResult(null)
              }}
              minDate={startDate}
            />
          </div>
          {startDate && endDate && endDate >= startDate && (
            <p className="text-xs text-muted-foreground -mt-4">
              {differenceInCalendarDays(endDate, startDate) + 1} day
              {differenceInCalendarDays(endDate, startDate) + 1 !== 1 ? "s" : ""} (inclusive)
            </p>
          )}

          {/* Errors */}
          {errors.length > 0 && (
            <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive flex flex-col gap-1">
              {errors.map((error, i) => (
                <p key={i}>{error}</p>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <Button onClick={handleCalculate} className="flex-1" size="lg">
              <Calculator className="mr-2 size-4" />
              Calculate Units
            </Button>
            <Button onClick={handleReset} variant="outline" size="lg">
              <RotateCcw className="size-4" />
              <span className="sr-only">Reset</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {result && <ResultsCard result={result} />}
      {result && <ResultsSummary result={result} />}
    </div>
  )
}
