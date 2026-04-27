"use client"

import { useState, useMemo, useCallback, useEffect } from "react"
import { differenceInCalendarDays, format, parse, isValid } from "date-fns"
import { CalendarIcon, ChevronDown, ChevronRight, Calculator, RotateCcw, Copy, Check } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  HCPCS_CODES,
  ENTERAL_PRODUCTS,
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
  const [search, setSearch] = useState("")

  // Filter codes based on search - show all only if search is empty
  const filteredCodes = useMemo(() => {
    if (!search.trim()) return HCPCS_CODES
    const query = search.toLowerCase()
    return HCPCS_CODES.filter(
      (hcpcs) =>
        hcpcs.code.toLowerCase().includes(query) ||
        hcpcs.shortDescription.toLowerCase().includes(query) ||
        hcpcs.longDescription.toLowerCase().includes(query)
    )
  }, [search])

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="hcpcs-code" className="text-foreground font-semibold">
        HCPCS Code
      </Label>
      <Popover open={open} onOpenChange={(isOpen) => {
        setOpen(isOpen)
        if (!isOpen) setSearch("")
      }}>
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
          <Command shouldFilter={false}>
            <CommandInput 
              placeholder="Type code (B4149, B4150...) or description..." 
              value={search}
              onValueChange={setSearch}
            />
            <CommandList>
              <CommandEmpty>No code found.</CommandEmpty>
              <CommandGroup>
                {filteredCodes.map((hcpcs) => (
                  <CommandItem
                    key={hcpcs.code}
                    value={hcpcs.code}
                    onSelect={() => {
                      onChange(hcpcs.code)
                      setOpen(false)
                      setSearch("")
                    }}
                  >
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-primary">
                          {hcpcs.code}
                        </span>
                        <span className="text-foreground text-sm">
                          {hcpcs.shortDescription}
                        </span>
                      </div>
                    </div>
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
  hcpcsCode,
  value,
  onSelect,
}: {
  hcpcsCode: string
  value: string
  onSelect: (hcpcsCode: string, formulaName: string) => void
}) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")

  // Filter products based on HCPCS code and search query
  const filteredProducts = useMemo(() => {
    let products = hcpcsCode 
      ? ENTERAL_PRODUCTS.filter(p => p.hcpcsCode === hcpcsCode || p.altHcpcsCode === hcpcsCode)
      : [...ENTERAL_PRODUCTS]
    
    // Apply search filter
    if (search.trim()) {
      const query = search.toLowerCase()
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.manufacturer.toLowerCase().includes(query) ||
          p.hcpcsCode.toLowerCase().includes(query)
      )
    }
    
    return products.sort((a, b) => a.name.localeCompare(b.name))
  }, [hcpcsCode, search])

  const selectedProduct = useMemo(
    () => ENTERAL_PRODUCTS.find((p) => p.name === value),
    [value]
  )

  // Count for the HCPCS filter (before search)
  const totalForCode = useMemo(() => {
    return hcpcsCode 
      ? ENTERAL_PRODUCTS.filter(p => p.hcpcsCode === hcpcsCode || p.altHcpcsCode === hcpcsCode).length
      : ENTERAL_PRODUCTS.length
  }, [hcpcsCode])

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="formula" className="text-foreground font-semibold">
        Formula Name
      </Label>
      <Popover open={open} onOpenChange={(isOpen) => {
        setOpen(isOpen)
        if (!isOpen) setSearch("")
      }}>
        <PopoverTrigger asChild>
          <Button
            id="formula"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between h-10 font-normal text-left"
          >
            {value ? (
              <span className="truncate">
                {value}
                {" "}
                <span className="text-muted-foreground text-xs">
                  ({selectedProduct?.manufacturer})
                </span>
              </span>
            ) : (
              <span className="text-muted-foreground">Type to search formulas...</span>
            )}
            <ChevronDown className="ml-2 size-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
          <Command shouldFilter={false}>
            <CommandInput 
              placeholder="Type formula name (e.g., Alimentum, Nutramigen)..." 
              value={search}
              onValueChange={setSearch}
            />
            <CommandList className="max-h-[300px]">
              {filteredProducts.length === 0 ? (
                <CommandEmpty>No formula found.</CommandEmpty>
              ) : (
                <CommandGroup>
                  {filteredProducts.map((product) => (
                    <CommandItem
                      key={`${product.hcpcsCode}-${product.name}`}
                      value={product.name}
                      onSelect={() => {
                        // If user filtered by a valid HCPCS code for this product, keep that code
                        // Otherwise use the product's primary code
                        const codeToUse = (hcpcsCode && (product.hcpcsCode === hcpcsCode || product.altHcpcsCode === hcpcsCode))
                          ? hcpcsCode
                          : product.hcpcsCode
                        onSelect(codeToUse, product.name)
                        setOpen(false)
                        setSearch("")
                      }}
                    >
                      <div className="flex flex-col gap-0.5 w-full">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-medium">{product.name}</span>
                          <span className="text-xs font-mono text-primary shrink-0">{product.hcpcsCode}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {product.manufacturer}
                          {product.isPowder && product.kcalPerGram !== null && ` \u2022 ${product.kcalPerGram} kcal/g`}
                          {!product.isPowder && product.kcalPerMl !== null && ` \u2022 ${product.kcalPerMl} kcal/mL`}
                          {product.isPowder && <span className="ml-1 text-primary">(powder)</span>}
                        </span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {hcpcsCode && (
        <p className="text-xs text-muted-foreground">
          Showing {filteredProducts.length} of {totalForCode} formula{totalForCode !== 1 ? "s" : ""} for {hcpcsCode}
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

  // Helper to convert 2-digit year to 4-digit year
  // Assumes years 00-99 map to 2000-2099 (current century)
  const expandYear = (yy: string): string => {
    return `20${yy.padStart(2, "0")}`
  }

  const parseDate = (cleaned: string): Date | null => {
    const digitsOnly = cleaned.replace(/\//g, "")
    
    // Try MM/DD/YYYY format (with slashes, 10 chars) - full 4-digit year
    if (cleaned.length === 10 && cleaned.includes("/")) {
      return parse(cleaned, "MM/dd/yyyy", new Date())
    }
    // Try MMDDYYYY format (8 digits, no slashes) - full 4-digit year
    if (digitsOnly.length === 8 && !cleaned.includes("/")) {
      return parse(digitsOnly, "MMddyyyy", new Date())
    }
    // Try MM/DD/YY format (with slashes, 8 chars) - 2-digit year
    if (cleaned.length === 8 && cleaned.includes("/")) {
      const parts = cleaned.split("/")
      if (parts.length === 3 && parts[2].length === 2) {
        const fullYear = expandYear(parts[2])
        const fullDate = `${parts[0]}/${parts[1]}/${fullYear}`
        return parse(fullDate, "MM/dd/yyyy", new Date())
      }
    }
    // Try MMDDYY format (6 digits, no slashes) - 2-digit year
    if (digitsOnly.length === 6 && !cleaned.includes("/")) {
      const mm = digitsOnly.slice(0, 2)
      const dd = digitsOnly.slice(2, 4)
      const yy = digitsOnly.slice(4, 6)
      const fullYear = expandYear(yy)
      const fullDate = `${mm}${dd}${fullYear}`
      return parse(fullDate, "MMddyyyy", new Date())
    }
    return null
  }

  const handleTextChange = (raw: string) => {
    // Allow only digits and slashes while typing
    const cleaned = raw.replace(/[^\d/]/g, "")
    setTextValue(cleaned)
    
    // Only auto-parse for full 4-digit year formats while typing
    // This prevents "04/03/20" from being interpreted as 2020 before user types "26"
    const digitsOnly = cleaned.replace(/\//g, "")
    const hasFourDigitYear = 
      (cleaned.length === 10 && cleaned.includes("/")) || // MM/DD/YYYY
      (digitsOnly.length === 8 && !cleaned.includes("/"))  // MMDDYYYY
    
    if (hasFourDigitYear) {
      const parsed = parseDate(cleaned)
      if (parsed && isValid(parsed)) {
        if (minDate && parsed < minDate) return
        onChange(parsed)
        setTextValue(format(parsed, "MM/dd/yyyy"))
      }
    }
  }

  const handleBlur = () => {
    // Parse 2-digit year formats only on blur (when user is done typing)
    const cleaned = textValue.replace(/[^\d/]/g, "")
    const parsed = parseDate(cleaned)
    
    if (parsed && isValid(parsed)) {
      if (minDate && parsed < minDate) return
      onChange(parsed)
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
  onBlur={handleBlur}
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
type DensityType = "kcal/mL" | "kcal/g" | "kcal/oz"
type TimePeriod = "day" | "month"

interface FeedingBreakdown {
  amountPerFeeding: number
  timesPerDay: number
  feedingUnit: VolumeUnit
  feedingUnitLabel: string
}

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
  timePeriod: TimePeriod // Whether user entered per day or per month
  feedingBreakdown: FeedingBreakdown | null // If calculated using "calculate daily volume" section
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
              <span className="text-xs text-foreground/70 font-medium uppercase tracking-wide">
                Daily Volume
              </span>
              <span className="font-semibold text-foreground">
                {fmt(result.dailyVolume)} {result.volumeUnitLabel}/day
              </span>
              {result.feedingBreakdown && (
                <span className="text-xs text-foreground/60 mt-0.5">
                  ({fmt(result.feedingBreakdown.amountPerFeeding)} {result.feedingBreakdown.feedingUnitLabel} x {fmt(result.feedingBreakdown.timesPerDay)} feedings)
                </span>
              )}
            </div>
          )}
          {result.densityValue !== null && result.densityType !== null && (
            <div className="flex flex-col gap-1 rounded-lg bg-muted/60 p-3">
              <span className="text-xs text-foreground/70 font-medium uppercase tracking-wide">
                Caloric Density
              </span>
              <span className="font-semibold text-foreground">
                {fmt(result.densityValue)} {result.densityType}
              </span>
            </div>
          )}
          <div className="flex flex-col gap-1 rounded-lg bg-muted/60 p-3">
            <span className="text-xs text-foreground/70 font-medium uppercase tracking-wide">
              Calories/Day
            </span>
            <span className="font-semibold text-foreground">
              {fmt(result.caloriesPerDay)} kcal
            </span>
          </div>
          <div className="flex flex-col gap-1 rounded-lg bg-muted/60 p-3">
            <span className="text-xs text-foreground/70 font-medium uppercase tracking-wide">
              Number of Days
            </span>
            <span className="font-semibold text-foreground">
              {result.numDays} day{result.numDays !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        <Separator />

        <div className="flex flex-col gap-1 rounded-lg bg-muted/60 p-3">
          <span className="text-xs text-foreground/70 font-medium uppercase tracking-wide">
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

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text:", err)
    }
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className="h-7 shrink-0 text-xs gap-1.5 px-2"
      onClick={handleCopy}
    >
      {copied ? (
        <>
          <Check className="size-3.5 text-green-600" />
          <span className="text-green-600">Copied</span>
        </>
      ) : (
        <>
          <Copy className="size-3.5" />
          <span>Copy</span>
        </>
      )}
    </Button>
  )
}

function ResultsSummary({ result }: { result: CalculationResult }) {
  const unitsPerDay = result.caloriesPerDay / 100
  const isDirectCalorieInput = result.densityType === null
  const isMonthly = result.timePeriod === "month"
  const periodLabel = isMonthly ? "per month" : "per day"
  const periodLabelShort = isMonthly ? "/month" : "/day"
  
  // result.dailyVolume contains the RAW user input (e.g., 900 oz if they entered 900 oz per month)
  // result.caloriesPerDay is the DAILY calories (already divided by 30 if monthly)
  // So for monthly: user entered dailyVolume per month, and caloriesPerDay is that / 30
  
  // For display, show what the user entered
  const userInputVolume = result.dailyVolume
  
  // Calculate calories for the period the user entered (monthly or daily)
  const caloriesForPeriod = isMonthly ? result.caloriesPerDay * 30 : result.caloriesPerDay
  const unitsForPeriod = caloriesForPeriod / 100
  
  // Format volume display - use "x" notation for packaging units (e.g., "4 x 8 fl oz bottles")
  const isPackagingUnit = result.volumeUnit.startsWith("pkg-")
  const volumeDisplay = isPackagingUnit 
    ? `${fmt(userInputVolume)} x ${result.volumeUnitLabel}${userInputVolume !== 1 ? "s" : ""}`
    : `${fmt(userInputVolume)} ${result.volumeUnitLabel}`
  
  // Build feeding breakdown description if calculated using daily volume calculator
  const feedingBreakdownText = result.feedingBreakdown 
    ? `(${fmt(result.feedingBreakdown.amountPerFeeding)} ${result.feedingBreakdown.feedingUnitLabel} x ${fmt(result.feedingBreakdown.timesPerDay)} feedings/day = ${volumeDisplay}/day)`
    : null
  
  // Calculate kcal per user's unit for display (e.g., kcal/oz)
  // caloriesForPeriod / userInputVolume gives the correct density in the user's unit
  const kcalPerUserUnit = userInputVolume > 0 
    ? (caloriesForPeriod / userInputVolume)
    : result.densityValue
  
  // Build the density label using the user's unit
  // For direct calorie input, we don't need a density label unit
  // For packaging units, wrap the package size in parentheses for clarity (e.g., "250 calories per (8 fl oz bottle)")
  const densityLabel = isDirectCalorieInput
    ? "direct calorie input"
    : isPackagingUnit
      ? `${fmt(kcalPerUserUnit!)} calories per (${result.volumeUnitLabel})`
      : `${fmt(kcalPerUserUnit!)} calories per ${result.volumeUnitLabel}`

  // Build the narrative text for display and copying
  // For direct calorie input, omit the density label notation
  const narrativeText = isDirectCalorieInput 
    ? `The patient receives ${fmt(caloriesForPeriod)} calories ${periodLabel}, which equals ${fmt(unitsForPeriod)} units${periodLabelShort}. The request is for ${result.numDays} day${result.numDays !== 1 ? "s" : ""}, therefore ${fmt(result.totalUnits)} units per requested date span are required.`
    : `The patient receives ${volumeDisplay} ${periodLabel}${feedingBreakdownText ? ` ${feedingBreakdownText}` : ""}, the requested ${result.formulaName} provides ${densityLabel} (${fmt(caloriesForPeriod)} calories${periodLabelShort}, ${fmt(unitsForPeriod)} units${periodLabelShort}), the request is for ${result.numDays} day${result.numDays !== 1 ? "s" : ""}, therefore ${fmt(result.totalUnits)} units per requested date span are required.`

  // Build the math text for copying
  // For packaging units, wrap the package label in parentheses for clarity
  const mathLines: string[] = []
  const unitLabelForMath = isPackagingUnit ? `(${result.volumeUnitLabel})` : result.volumeUnitLabel
  const feedingUnitLabelForMath = result.feedingBreakdown 
    ? (result.feedingBreakdown.feedingUnit.startsWith("pkg-") ? `(${result.feedingBreakdown.feedingUnitLabel})` : result.feedingBreakdown.feedingUnitLabel)
    : null
  
  if (result.feedingBreakdown && feedingUnitLabelForMath) {
    mathLines.push(`${fmt(result.feedingBreakdown.amountPerFeeding)} ${feedingUnitLabelForMath} x ${fmt(result.feedingBreakdown.timesPerDay)} feedings/day = ${fmt(userInputVolume)} ${unitLabelForMath}/day`)
  }
  if (isDirectCalorieInput) {
    mathLines.push(`${fmt(caloriesForPeriod)} calories${periodLabelShort}${isMonthly ? ` → ${fmt(result.caloriesPerDay)} calories/day avg` : ""}`)
  } else {
    mathLines.push(`${fmt(userInputVolume)} ${unitLabelForMath} x ${fmt(kcalPerUserUnit!)} kcal/${unitLabelForMath} = ${fmt(caloriesForPeriod)} calories${periodLabelShort}${isMonthly ? ` → ${fmt(result.caloriesPerDay)} calories/day avg` : ""}`)
  }
  mathLines.push(`${fmt(result.caloriesPerDay)} calories/day x ${result.numDays} day${result.numDays !== 1 ? "s" : ""} = ${fmt(result.totalCalories)} total calories`)
  mathLines.push(`${fmt(result.totalCalories)} total calories / 100 = ${fmt(result.totalUnits)} units per requested date span`)
  const mathText = mathLines.join("\n")
  
  // Combined text for copying both summaries at once
  const combinedText = `${narrativeText}\n\n${mathText}`

  return (
    <Card>
      <CardContent className="flex flex-col gap-3 pt-5">
        <div className="flex items-start gap-2">
          <p className="text-sm text-foreground leading-relaxed flex-1">
            {narrativeText}
          </p>
          <CopyButton text={narrativeText} label="Copy narrative" />
        </div>
        <Separator />
        <div className="flex items-start gap-2">
          <div className="flex flex-col gap-1.5 text-xs text-muted-foreground font-mono flex-1">
            {result.feedingBreakdown && feedingUnitLabelForMath && (
              <p>{`${fmt(result.feedingBreakdown.amountPerFeeding)} ${feedingUnitLabelForMath} x ${fmt(result.feedingBreakdown.timesPerDay)} feedings/day = ${fmt(userInputVolume)} ${unitLabelForMath}/day`}</p>
            )}
            {isDirectCalorieInput ? (
              <p>{`${fmt(caloriesForPeriod)} calories${periodLabelShort}${isMonthly ? ` → ${fmt(result.caloriesPerDay)} calories/day avg` : ""}`}</p>
            ) : (
              <p>{`${fmt(userInputVolume)} ${unitLabelForMath} x ${fmt(kcalPerUserUnit!)} kcal/${unitLabelForMath} = ${fmt(caloriesForPeriod)} calories${periodLabelShort}${isMonthly ? ` → ${fmt(result.caloriesPerDay)} calories/day avg` : ""}`}</p>
            )}
            <p>{`${fmt(result.caloriesPerDay)} calories/day x ${result.numDays} day${result.numDays !== 1 ? "s" : ""} = ${fmt(result.totalCalories)} total calories`}</p>
            <p>{`${fmt(result.totalCalories)} total calories / 100 = ${fmt(result.totalUnits)} units per requested date span`}</p>
          </div>
          <CopyButton text={mathText} label="Copy math" />
        </div>
        <Separator />
        <div className="flex justify-end">
          <CopyButton text={combinedText} label="Copy all" />
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
  onApply: (amount: string, unit: VolumeUnit, feedingBreakdown: { amountPerFeeding: number; timesPerDay: number }) => void
  densityType: DensityType
  packaging?: EnteralProduct["packaging"]
}) {
  const [open, setOpen] = useState(false)
  const [amountPerFeeding, setAmountPerFeeding] = useState("")
  const [feedingUnit, setFeedingUnit] = useState<VolumeUnit>(densityType === "kcal/g" ? "g" : "mL")
  const [timesPerDay, setTimesPerDay] = useState("")

  // Sync feedingUnit when densityType changes (only reset to default unit when density type changes)
  useEffect(() => {
    setFeedingUnit(densityType === "kcal/g" ? "g" : "mL")
  }, [densityType])

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
                  <SelectTrigger className="w-20 h-8 text-xs relative z-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent position="popper" side="bottom" align="start" sideOffset={4} className="z-[100]">
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
                  onApply(fmt(calculatedTotal), feedingUnit, {
                    amountPerFeeding: parseFloat(amountPerFeeding),
                    timesPerDay: parseFloat(timesPerDay),
                  })
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

// ─── Create Your Review Section ────────────────────────────────────────────────

function CreateReviewSection({ result, onResetCalculator }: { result: CalculationResult; onResetCalculator: () => void }) {
  const [selectedProvider, setSelectedProvider] = useState<"horizon" | "florida-blue" | null>(null)
  const [reviewText, setReviewText] = useState("")
  const [copied, setCopied] = useState(false)
  
  // Florida Blue-specific state
  const [floridaBlueDiagnosis, setFloridaBlueDiagnosis] = useState("")
  const [floridaBlueReviewGenerated, setFloridaBlueReviewGenerated] = useState(false)
  
  // Horizon-specific state
  const [njMandates, setNjMandates] = useState<"yes" | "no" | null>(null)
  const [mandateType, setMandateType] = useState<"infant-formula" | "inherited-metabolic" | "neither" | null>(null)
  const [permanentCondition, setPermanentCondition] = useState<"prevents-absorption" | "prevents-reaching" | null>(null)
  const [greaterThan50Percent, setGreaterThan50Percent] = useState(false)
  const [diagnoses, setDiagnoses] = useState("")
  const [horizonReviewGenerated, setHorizonReviewGenerated] = useState(false)
  
  // Reset all and scroll to top
  const handleResetAndReturnToTop = () => {
    setSelectedProvider(null)
    setReviewText("")
    setCopied(false)
    setFloridaBlueDiagnosis("")
    setFloridaBlueReviewGenerated(false)
    setNjMandates(null)
    setMandateType(null)
    setPermanentCondition(null)
    setGreaterThan50Percent(false)
    setDiagnoses("")
    setHorizonReviewGenerated(false)
    // Reset the main calculator
    onResetCalculator()
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  
  // Reset Florida Blue state when provider changes
  useEffect(() => {
    if (selectedProvider !== "florida-blue") {
      setFloridaBlueDiagnosis("")
      setFloridaBlueReviewGenerated(false)
    }
  }, [selectedProvider])
  
  // Reset Horizon state when provider changes
  useEffect(() => {
    if (selectedProvider !== "horizon") {
      setNjMandates(null)
      setMandateType(null)
      setPermanentCondition(null)
      setGreaterThan50Percent(false)
      setDiagnoses("")
      setHorizonReviewGenerated(false)
    }
  }, [selectedProvider])
  
  // Reset dependent state when NJ Mandates changes
  useEffect(() => {
    setMandateType(null)
    setPermanentCondition(null)
    setGreaterThan50Percent(false)
    setDiagnoses("")
    setHorizonReviewGenerated(false)
    setReviewText("")
  }, [njMandates])
  
  // Reset permanent condition when mandate type changes (unless "neither" is selected)
  useEffect(() => {
    if (mandateType !== "neither") {
      setPermanentCondition(null)
      setGreaterThan50Percent(false)
    }
    setDiagnoses("")
    setHorizonReviewGenerated(false)
    setReviewText("")
  }, [mandateType])
  
  // Generate the narrative text for the review (similar to ResultsSummary logic)
  const narrativeFromCalculations = useMemo(() => {
    const isDirectCalorieInput = result.densityType === null
    const isMonthly = result.timePeriod === "month"
    const periodLabel = isMonthly ? "per month" : "per day"
    
    const userInputVolume = result.dailyVolume
    const caloriesForPeriod = isMonthly ? result.caloriesPerDay * 30 : result.caloriesPerDay
    
    // Format volume display
    const isPackagingUnit = result.volumeUnit.startsWith("pkg-")
    const volumeDisplay = isPackagingUnit 
      ? `${fmt(userInputVolume)} x ${result.volumeUnitLabel}${userInputVolume !== 1 ? "s" : ""}`
      : `${fmt(userInputVolume)} ${result.volumeUnitLabel}`
    
    // Calculate kcal per user's unit for display
    const kcalPerUserUnit = userInputVolume > 0 
      ? (caloriesForPeriod / userInputVolume)
      : result.densityValue
    
    // Build density label
    const densityLabel = isDirectCalorieInput
      ? "direct calorie input"
      : isPackagingUnit
        ? `${fmt(kcalPerUserUnit!)} calories per (${result.volumeUnitLabel})`
        : `${fmt(kcalPerUserUnit!)} calories per ${result.volumeUnitLabel}`
    
    // Build feeding breakdown text if available
    const feedingBreakdownText = result.feedingBreakdown 
      ? `(${fmt(result.feedingBreakdown.amountPerFeeding)} ${result.feedingBreakdown.feedingUnitLabel} x ${fmt(result.feedingBreakdown.timesPerDay)} feedings/day)`
      : ""
    
    // Build the narrative
    if (isDirectCalorieInput) {
      return `${fmt(caloriesForPeriod)} calories ${periodLabel} of ${result.formulaName || "the requested formula"}`
    }
    
    return `${volumeDisplay} ${periodLabel}${feedingBreakdownText ? ` ${feedingBreakdownText}` : ""} of ${result.formulaName} (${densityLabel})`
  }, [result])
  
  // Generate the math narrative for the review (mirrors ResultsSummary logic)
  const mathNarrative = useMemo(() => {
    const isDirectCalorieInput = result.densityType === null
    const isMonthly = result.timePeriod === "month"
    const periodLabelShort = isMonthly ? "/month" : "/day"
    
    const userInputVolume = result.dailyVolume
    const caloriesForPeriod = isMonthly ? result.caloriesPerDay * 30 : result.caloriesPerDay
    const unitsForPeriod = caloriesForPeriod / 100
    
    const isPackagingUnit = result.volumeUnit.startsWith("pkg-")
    const unitLabelForMath = isPackagingUnit ? `(${result.volumeUnitLabel})` : result.volumeUnitLabel
    
    const kcalPerUserUnit = userInputVolume > 0 
      ? (caloriesForPeriod / userInputVolume)
      : result.densityValue
    
    const feedingUnitLabelForMath = result.feedingBreakdown 
      ? (result.feedingBreakdown.feedingUnit.startsWith("pkg-") ? `(${result.feedingBreakdown.feedingUnitLabel})` : result.feedingBreakdown.feedingUnitLabel)
      : null
    
    const mathLines: string[] = []
    
    if (result.feedingBreakdown && feedingUnitLabelForMath) {
      mathLines.push(`${fmt(result.feedingBreakdown.amountPerFeeding)} ${feedingUnitLabelForMath} x ${fmt(result.feedingBreakdown.timesPerDay)} feedings/day = ${fmt(userInputVolume)} ${unitLabelForMath}/day`)
    }
    if (isDirectCalorieInput) {
      mathLines.push(`${fmt(caloriesForPeriod)} calories${periodLabelShort}${isMonthly ? ` → ${fmt(result.caloriesPerDay)} calories/day avg` : ""}`)
    } else {
      mathLines.push(`${fmt(userInputVolume)} ${unitLabelForMath} x ${fmt(kcalPerUserUnit!)} kcal/${unitLabelForMath} = ${fmt(caloriesForPeriod)} calories${periodLabelShort}${isMonthly ? ` → ${fmt(result.caloriesPerDay)} calories/day avg` : ""}`)
    }
    mathLines.push(`${fmt(result.caloriesPerDay)} calories/day x ${result.numDays} day${result.numDays !== 1 ? "s" : ""} = ${fmt(result.totalCalories)} total calories`)
    mathLines.push(`${fmt(result.totalCalories)} total calories / 100 = ${fmt(result.totalUnits)} units per requested date span`)
    
    return mathLines.join("; ")
  }, [result])
  
  // Generate Florida Blue template
  const floridaBlueTemplate = useMemo(() => {
    if (!floridaBlueDiagnosis.trim()) return ""
    return `This is a patient with ${floridaBlueDiagnosis.trim()}. The provider ordered ${narrativeFromCalculations}. ${mathNarrative}. Patient meets MCG as the EN is prescribed by a physician and is the sole source of nutrition.`
  }, [narrativeFromCalculations, mathNarrative, floridaBlueDiagnosis])
  
  // Set the review text when Florida Blue review is generated
  useEffect(() => {
    if (selectedProvider === "florida-blue" && floridaBlueReviewGenerated && floridaBlueDiagnosis.trim()) {
      setReviewText(floridaBlueTemplate)
    }
  }, [selectedProvider, floridaBlueTemplate, floridaBlueDiagnosis, floridaBlueReviewGenerated])
  
  // Check if Horizon review can be generated
  const canGenerateHorizonReview = useMemo(() => {
    // Always require diagnoses
    if (!diagnoses.trim()) return false
    // If opted into mandates and meets one of them
    if (njMandates === "yes" && mandateType && mandateType !== "neither") return true
    // If opted into mandates but doesn't meet either, need permanent condition AND 50% checkbox
    if (njMandates === "yes" && mandateType === "neither" && permanentCondition && greaterThan50Percent) return true
    // If not opted into mandates, need permanent condition AND 50% checkbox
    if (njMandates === "no" && permanentCondition && greaterThan50Percent) return true
    return false
  }, [njMandates, mandateType, permanentCondition, greaterThan50Percent, diagnoses])
  
  // Generate Horizon review
  const generateHorizonReview = () => {
    const isOptedIntoMandates = njMandates === "yes"
    const meetsMandateCriteria = mandateType && mandateType !== "neither"
    
    // Build the mandate status text
    const mandateStatusText = isOptedIntoMandates
      ? meetsMandateCriteria
        ? "is opted into the NJ Mandates and does meet mandate criteria"
        : "is opted into the NJ Mandates and does not meet mandate criteria"
      : "is not opted into the NJ Mandates"
    
    // Determine condition type text for non-mandate path
    let conditionTypeText = ""
    if (permanentCondition === "prevents-absorption") {
      conditionTypeText = "permanent condition that impairs absorption in the small bowel"
    } else if (permanentCondition === "prevents-reaching") {
      conditionTypeText = "permanent condition that prevents food from reaching the small bowel"
    }
    
    let horizonTemplate = ""
    
    if (meetsMandateCriteria) {
      // Patient meets mandate criteria - simpler approval path
      const mandateName = mandateType === "infant-formula" 
        ? "Infant Formula Mandate (has a milk protein allergy and has tried and failed both goat- and soy-based formulas)"
        : `Inherited Metabolic Disease Mandate (patient with diagnosis of ${diagnoses.trim()})`
      
      horizonTemplate = `This is a patient with ${diagnoses.trim()}. The provider ordered ${narrativeFromCalculations}. ${mathNarrative}.

The Horizon Enteral Nutrition Hierarchy was utilized for this review. The patient ${mandateStatusText}. The patient meets the ${mandateName}. Therefore this request is being approved.`
    } else {
      // Patient doesn't meet mandates - MCG path with permanent condition
      const mcgText = "Therefore the Horizon MCG was utilized."
      
      horizonTemplate = `This is a patient with ${diagnoses.trim()}. The provider ordered ${narrativeFromCalculations}. ${mathNarrative}.

The Horizon Enteral Nutrition Hierarchy was utilized for this review. The patient ${mandateStatusText}. ${mcgText} The patient has a ${conditionTypeText} and the requested EN provides greater than 50% of the patient's daily nutrition. Therefore this request is being approved.`
    }
    
    setReviewText(horizonTemplate)
    setHorizonReviewGenerated(true)
  }
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(reviewText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text:", err)
    }
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Create Your Review</CardTitle>
        <CardDescription>Select your insurance provider to generate a review template</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {/* Provider Selection */}
        <div className="flex gap-3">
          <Button
            type="button"
            variant={selectedProvider === "horizon" ? "default" : "outline"}
            onClick={() => setSelectedProvider("horizon")}
            className="flex-1"
          >
            Horizon
          </Button>
          <Button
            type="button"
            variant={selectedProvider === "florida-blue" ? "default" : "outline"}
            onClick={() => setSelectedProvider("florida-blue")}
            className="flex-1"
          >
            Florida Blue
          </Button>
        </div>
        
        {/* Florida Blue Template */}
        {selectedProvider === "florida-blue" && (
          <div className="flex flex-col gap-3">
            {/* Warning Alert */}
            <div className="rounded-lg border border-amber-500/50 bg-amber-50 p-3 dark:bg-amber-950/30">
              <div className="flex gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5">
                  <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                </svg>
                <div className="text-sm text-amber-800 dark:text-amber-200">
                  <p className="font-medium">Important: Check Group Language</p>
                  <p className="mt-1">Be sure to check the patient&apos;s applicable group number and send for admin denial if group language is not met. If group language is met, patient must ALSO meet the MCG.</p>
                </div>
              </div>
            </div>
            
            {/* Diagnosis Input */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="florida-blue-diagnosis" className="text-sm font-medium">
                Diagnosis
              </Label>
              <textarea
                id="florida-blue-diagnosis"
                value={floridaBlueDiagnosis}
                onChange={(e) => {
                  setFloridaBlueDiagnosis(e.target.value)
                  setFloridaBlueReviewGenerated(false)
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey && floridaBlueDiagnosis.trim()) {
                    e.preventDefault()
                    setFloridaBlueReviewGenerated(true)
                  }
                }}
                className="min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
                placeholder="Enter the patient's diagnosis..."
              />
            </div>
            
            {/* Create Review Button - show when diagnosis entered but review not yet generated */}
            {floridaBlueDiagnosis.trim() && !floridaBlueReviewGenerated && (
              <Button
                type="button"
                onClick={() => setFloridaBlueReviewGenerated(true)}
                className="w-full"
              >
                Create Review
              </Button>
            )}
            
            {/* Review Template - only show after Create is clicked */}
            {floridaBlueReviewGenerated && (
              <>
                <Label htmlFor="review-text" className="text-sm font-medium">
                  Review Template
                </Label>
                <textarea
                  id="review-text"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="min-h-[280px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
                  placeholder="Review text will appear here..."
                />
                <div className="flex justify-between gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleResetAndReturnToTop}
                  >
                    Reset &amp; Return to Top
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    className="gap-1.5"
                    onClick={handleCopy}
                  >
                    {copied ? (
                      <>
                        <Check className="size-4 text-green-600" />
                        <span className="text-green-600">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-4" />
                        <span>Copy Review</span>
                      </>
                    )}
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
        
        {/* Horizon Flow */}
        {selectedProvider === "horizon" && (
          <div className="flex flex-col gap-4">
            {/* Review Hierarchy Info */}
            <div className="rounded-lg border border-blue-500/50 bg-blue-50 p-3 dark:bg-blue-950/30">
              <div className="flex gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 text-blue-600 dark:text-blue-500 shrink-0 mt-0.5">
                  <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                </svg>
                <div className="text-sm text-blue-800 dark:text-blue-200">
                  <p className="font-medium">Horizon Review Hierarchy</p>
                  <p className="mt-1 italic">Stop and approve as soon as patient meets criteria at any step:</p>
                  <ol className="mt-1 list-decimal list-inside space-y-0.5">
                    <li>Check NJ Mandates first — <span className="font-medium">if meets, approve</span></li>
                    <li>If does not meet, move to MCG — <span className="font-medium">if meets, approve</span></li>
                    <li>If still does not meet, move to Grid — <span className="font-medium">if meets, approve</span></li>
                    <li>If does not meet Grid or group number not listed on Grid, elevate to MD for review</li>
                  </ol>
                </div>
              </div>
            </div>
            
            {/* Step 1: NJ Mandates */}
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-medium">Is the patient opted into NJ Mandates?</Label>
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant={njMandates === "yes" ? "default" : "outline"}
                  onClick={() => setNjMandates("yes")}
                  className="flex-1"
                  size="sm"
                >
                  Yes
                </Button>
                <Button
                  type="button"
                  variant={njMandates === "no" ? "default" : "outline"}
                  onClick={() => setNjMandates("no")}
                  className="flex-1"
                  size="sm"
                >
                  No
                </Button>
              </div>
            </div>
            
            {/* Step 2a: If YES - Mandate Type */}
            {njMandates === "yes" && (
              <div className="flex flex-col gap-2 rounded-lg border border-border bg-muted/30 p-3">
                <Label className="text-sm font-medium">Which mandate does the patient meet criteria for?</Label>
                <div className="flex flex-col gap-2">
                  <Button
                    type="button"
                    variant={mandateType === "infant-formula" ? "default" : "outline"}
                    onClick={() => setMandateType("infant-formula")}
                    className="justify-start text-left h-auto py-2 px-3"
                    size="sm"
                  >
                    <span className="text-wrap">Infant Formula Mandate</span>
                  </Button>
                  <Button
                    type="button"
                    variant={mandateType === "inherited-metabolic" ? "default" : "outline"}
                    onClick={() => setMandateType("inherited-metabolic")}
                    className="justify-start text-left h-auto py-2 px-3"
                    size="sm"
                  >
                    <span className="text-wrap">Inherited Metabolic Disease Mandate</span>
                  </Button>
                  <Button
                    type="button"
                    variant={mandateType === "neither" ? "default" : "outline"}
                    onClick={() => setMandateType("neither")}
                    className="justify-start text-left h-auto py-2 px-3"
                    size="sm"
                  >
                    <span className="text-wrap">Neither</span>
                  </Button>
                </div>
              </div>
            )}
            
            {/* Step 2b: If NO or Neither - Permanent Condition */}
            {(njMandates === "no" || mandateType === "neither") && (
              <div className="flex flex-col gap-2 rounded-lg border border-border bg-muted/30 p-3">
                <Label className="text-sm font-medium">Does the patient have a permanent condition that:</Label>
                <div className="flex flex-col gap-2">
                  <Button
                    type="button"
                    variant={permanentCondition === "prevents-absorption" ? "default" : "outline"}
                    onClick={() => setPermanentCondition("prevents-absorption")}
                    className="justify-start text-left h-auto py-2 px-3"
                    size="sm"
                  >
                    <span className="text-wrap">Impairs absorption in the small bowel</span>
                  </Button>
                  <Button
                    type="button"
                    variant={permanentCondition === "prevents-reaching" ? "default" : "outline"}
                    onClick={() => setPermanentCondition("prevents-reaching")}
                    className="justify-start text-left h-auto py-2 px-3"
                    size="sm"
                  >
                    <span className="text-wrap">Prevents food from reaching the small bowel</span>
                  </Button>
                </div>
              </div>
            )}
            
            {/* 50% Daily Nutrition Checkbox - shown when using permanent condition criteria */}
            {(njMandates === "no" || mandateType === "neither") && permanentCondition && (
              <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/30 p-3">
                <input
                  type="checkbox"
                  id="greater-than-50"
                  checked={greaterThan50Percent}
                  onChange={(e) => setGreaterThan50Percent(e.target.checked)}
                  className="size-4 rounded border-input"
                />
                <Label htmlFor="greater-than-50" className="text-sm font-medium cursor-pointer">
                  Request is greater than 50% of daily nutrition
                </Label>
              </div>
            )}
            
            {/* Diagnoses Input - shown when criteria are met (before final generation) */}
            {((njMandates === "yes" && mandateType && mandateType !== "neither") || 
              ((njMandates === "no" || mandateType === "neither") && permanentCondition && greaterThan50Percent)) && (
              <div className="flex flex-col gap-2 rounded-lg border border-border bg-muted/30 p-3">
                <Label htmlFor="diagnoses" className="text-sm font-medium">
                  Relevant Diagnoses
                </Label>
                <textarea
                  id="diagnoses"
                  value={diagnoses}
                  onChange={(e) => setDiagnoses(e.target.value)}
                  className="min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
                  placeholder="Enter the patient's relevant diagnoses..."
                />
              </div>
            )}
            
            {/* Generate Review Button */}
            {canGenerateHorizonReview && !horizonReviewGenerated && (
              <Button
                type="button"
                onClick={generateHorizonReview}
                className="w-full"
              >
                Create Review
              </Button>
            )}
            
            {/* Generated Horizon Review */}
            {horizonReviewGenerated && (
              <div className="flex flex-col gap-3">
                <Label htmlFor="horizon-review-text" className="text-sm font-medium">
                  Review Template
                </Label>
                <textarea
                  id="horizon-review-text"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="min-h-[280px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
                  placeholder="Review text will appear here..."
                />
                <div className="flex justify-between gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleResetAndReturnToTop}
                  >
                    Reset &amp; Return to Top
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    className="gap-1.5"
                    onClick={handleCopy}
                  >
                    {copied ? (
                      <>
                        <Check className="size-4 text-green-600" />
                        <span className="text-green-600">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-4" />
                        <span>Copy Review</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
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
  const [densityOverrideUnit, setDensityOverrideUnit] = useState<"kcal/mL" | "kcal/oz" | "kcal/g">("kcal/mL")
  const [feedingBreakdown, setFeedingBreakdown] = useState<{ amountPerFeeding: number; timesPerDay: number; feedingUnit: VolumeUnit } | null>(null)

  // Derived state
  const selectedProduct = useMemo(
    () => ENTERAL_PRODUCTS.find((p) => p.name === formulaName && (p.hcpcsCode === hcpcsCode || p.altHcpcsCode === hcpcsCode)),
    [formulaName, hcpcsCode]
  )

  // Handlers
  const handleHcpcsChange = useCallback((code: string) => {
    setHcpcsCode(code)
    // Only clear formula if it doesn't match the new code (check both primary and alt codes)
    const currentFormulaMatchesNewCode = ENTERAL_PRODUCTS.some(
      (p) => p.name === formulaName && (p.hcpcsCode === code || p.altHcpcsCode === code)
    )
    if (!currentFormulaMatchesNewCode) {
      setFormulaName("")
    }
    setVolumeUnit("mL")
    setShowDensityOverride(false)
    setDensityOverride("")
    setDensityOverrideUnit("kcal/mL")
    setFeedingBreakdown(null)
    setResult(null)
    setErrors([])
  }, [formulaName])

  const handleResetCalculator = useCallback(() => {
    setHcpcsCode("")
    setFormulaName("")
    setVolumeAmount("")
    setVolumeUnit("mL")
    setVolumeTimePeriod("day")
    setStartDate(undefined)
    setEndDate(undefined)
    setResult(null)
    setErrors([])
    setShowDensityOverride(false)
    setDensityOverride("")
    setDensityOverrideUnit("kcal/mL")
    setFeedingBreakdown(null)
  }, [])

  const handleFormulaSelect = useCallback((code: string, name: string) => {
    setHcpcsCode(code)
    setFormulaName(name)
    
    const product = ENTERAL_PRODUCTS.find((p) => p.name === name && (p.hcpcsCode === code || p.altHcpcsCode === code))
    // Auto-set volume unit based on product type
    if (product?.isPowder && product.kcalPerGram !== null) {
      setVolumeUnit("g")
    } else {
      setVolumeUnit("mL")
    }
    // Clear any density override when formula changes
    setShowDensityOverride(false)
    setDensityOverride("")
    setDensityOverrideUnit(product?.isPowder ? "kcal/g" : "kcal/mL")
    setFeedingBreakdown(null)
    setResult(null)
    setErrors([])
  }, [])

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
        // User provided a custom density value - use their unit for display
        effectiveDensityType = densityOverrideUnit
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
      let packagingKcalPerUnit: number | null = null // Track packaging kcalPerUnit for accurate calorie calculation

      if (volumeUnit.startsWith("pkg-")) {
        // Handle packaging units
        const pkgIdx = parseInt(volumeUnit.replace("pkg-", ""))
        const pkg = selectedProduct?.packaging?.[pkgIdx]
        if (pkg) {
          // Store kcalPerUnit for accurate calorie calculation (avoids rounding errors from kcalPerMl)
          if (pkg.kcalPerUnit) {
            packagingKcalPerUnit = pkg.kcalPerUnit
          }
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
      // For packaging units with kcalPerUnit, use that directly for accuracy (avoids rounding errors)
      if (packagingKcalPerUnit !== null) {
        // Use packaging kcalPerUnit directly: vol is number of packages, packagingKcalPerUnit is kcal per package
        const dailyPackages = volumeTimePeriod === "month" ? vol / 30 : vol
        caloriesPerDay = dailyPackages * packagingKcalPerUnit
      } else if (effectiveDensityType === "kcal/g") {
        caloriesPerDay = dailyGrams * kcal
      } else if (effectiveDensityType === "kcal/oz") {
        // Convert dailyMl to oz for calculation
        const dailyOz = dailyMl / OZ_TO_ML
        caloriesPerDay = dailyOz * kcal
      } else {
        // kcal/mL
        caloriesPerDay = dailyMl * kcal
      }
    }

    const totalCalories = caloriesPerDay * numDays
    const totalUnitsRaw = totalCalories / 100
    const totalUnits = Number.isInteger(totalUnitsRaw) ? totalUnitsRaw : Math.ceil(totalUnitsRaw)

// Build feeding breakdown info for display if volume was calculated using the calculator
    const feedingBreakdownForResult: FeedingBreakdown | null = feedingBreakdown 
      ? {
          amountPerFeeding: feedingBreakdown.amountPerFeeding,
          timesPerDay: feedingBreakdown.timesPerDay,
          feedingUnit: feedingBreakdown.feedingUnit,
          feedingUnitLabel: feedingBreakdown.feedingUnit.startsWith("pkg-") && selectedProduct?.packaging
            ? selectedProduct.packaging[parseInt(feedingBreakdown.feedingUnit.replace("pkg-", ""))]?.label || feedingBreakdown.feedingUnit
            : feedingBreakdown.feedingUnit,
        }
      : null

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
      timePeriod: volumeTimePeriod,
      feedingBreakdown: feedingBreakdownForResult,
    })
    setErrors([])
  }, [hcpcsCode, formulaName, selectedProduct, volumeAmount, volumeUnit, volumeTimePeriod, startDate, endDate, densityOverride, densityOverrideUnit, feedingBreakdown])

  const handleReset = useCallback(() => {
    setHcpcsCode("")
    setFormulaName("")
    setVolumeAmount("")
    setVolumeUnit("mL")
    setVolumeTimePeriod("day")
    setShowDensityOverride(false)
    setDensityOverride("")
    setDensityOverrideUnit("kcal/mL")
    setFeedingBreakdown(null)
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
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1.5">
              <CardTitle className="flex items-center gap-2 text-xl text-primary">
                <Calculator className="size-5" />
                Enteral Nutrition Unit Calculator
              </CardTitle>
              <CardDescription>
                Search by HCPCS code or formula name to calculate billing units.
              </CardDescription>
            </div>
            <Button onClick={handleReset} variant="ghost" size="sm" className="shrink-0 text-muted-foreground hover:text-foreground">
              <RotateCcw className="mr-1.5 size-3.5" />
              Reset Form
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          {/* Step 1: HCPCS Code Selection */}
          <HcpcsCodeSelector
            value={hcpcsCode}
            onChange={handleHcpcsChange}
          />

          {/* Step 2: Formula Selection */}
          <FormulaSelector
            hcpcsCode={hcpcsCode}
            value={formulaName}
            onSelect={handleFormulaSelect}
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
                  setFeedingBreakdown(null) // Clear feeding breakdown when manually changing period
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
                  setFeedingBreakdown(null) // Clear feeding breakdown when manually changing period
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
                  setFeedingBreakdown(null) // Clear feeding breakdown when manually changing volume
                  setResult(null)
                }}
                className="flex-1"
              />
              <Select
                value={volumeUnit}
onValueChange={(val: VolumeUnit) => {
                  setVolumeUnit(val)
                  setFeedingBreakdown(null) // Clear feeding breakdown when manually changing unit
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
                  
                  // Check for packaging kcalPerUnit for accurate calorie display
                  let packagingKcalPerUnit: number | null = null
                  if (volumeUnit.startsWith("pkg-")) {
                    const pkgIdx = parseInt(volumeUnit.replace("pkg-", ""))
                    const pkg = selectedProduct?.packaging?.[pkgIdx]
                    if (pkg?.kcalPerUnit) {
                      packagingKcalPerUnit = pkg.kcalPerUnit
                    }
                  }
                  
                  const dailyMl = baseMl !== null ? (volumeTimePeriod === "month" ? baseMl / 30 : baseMl) : null
                  const dailyGrams = baseGrams !== null ? (volumeTimePeriod === "month" ? baseGrams / 30 : baseGrams) : null
                  // Keep oz as primary unit when user inputs oz
                  const dailyOz = volumeUnit === "oz" ? (volumeTimePeriod === "month" ? amount / 30 : amount) : (dailyMl !== null ? dailyMl / OZ_TO_ML : null)
                  
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
                  // Use packaging kcalPerUnit for accurate calorie display when available
                  if (packagingKcalPerUnit !== null) {
                    const dailyPackages = volumeTimePeriod === "month" ? amount / 30 : amount
                    dailyKcal = dailyPackages * packagingKcalPerUnit
                  } else if (effectiveKcalValue) {
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
                      {/* Show oz conversion only when user entered mL */}
                      {volumeUnit === "mL" && dailyOz !== null && (
                        <span>= {fmt(dailyOz)} oz per day</span>
                      )}
                      {/* Show mL conversion only when user entered oz */}
                      {volumeUnit === "oz" && dailyMl !== null && (
                        <span>= {fmt(dailyMl)} mL per day</span>
                      )}
                      {/* Show grams only for powder packaging inputs (not direct gram input, not liquid volume inputs) */}
                      {dailyGrams !== null && volumeUnit.startsWith("pkg-") && selectedProduct?.packaging?.[parseInt(volumeUnit.replace("pkg-", ""))]?.gramsPerUnit && (
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
                  onApply={(amount, unit, breakdown) => {
                    setVolumeAmount(amount)
                    setVolumeUnit(unit)
                    setVolumeTimePeriod("day") // Calculator always produces daily values
                    setFeedingBreakdown({ ...breakdown, feedingUnit: unit })
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
                          setDensityOverrideUnit(selectedProduct?.isPowder ? "kcal/g" : "kcal/mL")
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
                        placeholder={densityOverrideUnit === "kcal/g" ? "e.g., 4.2" : densityOverrideUnit === "kcal/oz" ? "e.g., 20" : "e.g., 1.0"}
                        value={densityOverride}
                        onChange={(e) => {
                          setDensityOverride(e.target.value)
                          setResult(null)
                        }}
                        className="flex-1 h-8 text-sm"
                      />
                      <Select
                        value={densityOverrideUnit}
                        onValueChange={(value: "kcal/mL" | "kcal/oz" | "kcal/g") => {
                          setDensityOverrideUnit(value)
                          setResult(null)
                        }}
                      >
                        <SelectTrigger className="w-[100px] h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="kcal/mL">kcal/mL</SelectItem>
                          <SelectItem value="kcal/oz">kcal/oz</SelectItem>
                          <SelectItem value="kcal/g">kcal/g</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {selectedProduct && (
                      <p className="text-xs text-muted-foreground">
                        Default: {selectedProduct.isPowder && selectedProduct.kcalPerGram !== null 
                          ? `${selectedProduct.kcalPerGram} kcal/g`
                          : selectedProduct.kcalPerMl !== null 
                            ? `${selectedProduct.kcalPerMl} kcal/mL (${(selectedProduct.kcalPerMl * OZ_TO_ML).toFixed(1)} kcal/oz)`
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

          {/* Date Range Breakdown */}
          {startDate && endDate && endDate >= startDate && (() => {
            const totalDays = differenceInCalendarDays(endDate, startDate) + 1
            const weeks = Math.floor(totalDays / 7)
            const remainingDays = totalDays % 7
            const months = Math.floor(totalDays / 30)
            const daysAfterMonths = totalDays % 30
            
            return (
              <div className="rounded-lg border bg-muted/30 p-4 -mt-2">
                <p className="text-sm font-medium mb-2">Date Range Breakdown</p>
                <div className="grid grid-cols-1 gap-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Days:</span>
                    <span>{totalDays} day{totalDays !== 1 ? "s" : ""}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">In Weeks:</span>
                    <span>
                      {weeks} week{weeks !== 1 ? "s" : ""}
                      {remainingDays > 0 && `, ${remainingDays} day${remainingDays !== 1 ? "s" : ""}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">In Months:</span>
                    <span>
                      {months} month{months !== 1 ? "s" : ""}
                      {daysAfterMonths > 0 && `, ${daysAfterMonths} day${daysAfterMonths !== 1 ? "s" : ""}`}
                    </span>
                  </div>
                </div>
              </div>
            )
          })()}

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
              <RotateCcw className="mr-2 size-4" />
              Clear All
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {result && <ResultsCard result={result} />}
      {result && <ResultsSummary result={result} />}
      
      {/* Create Your Review Section */}
      {result && <CreateReviewSection result={result} onResetCalculator={handleResetCalculator} />}
    </div>
  )
}
