"use client"

import { useState, useMemo, useCallback, useEffect } from "react"
import { differenceInCalendarDays, format, parse, isValid } from "date-fns"
import { CalendarIcon, ChevronDown, ChevronRight, Calculator, RotateCcw } from "lucide-react"

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

function UnifiedFormulaSearch({
  hcpcsCode,
  formulaName,
  onSelect,
}: {
  hcpcsCode: string
  formulaName: string
  onSelect: (hcpcsCode: string, formulaName: string) => void
}) {
  const [open, setOpen] = useState(false)
  const [searchMode, setSearchMode] = useState<"formula" | "hcpcs">("formula")

  // Group formulas by HCPCS code for display
  const formulasByCode = useMemo(() => {
    const grouped: Record<string, EnteralProduct[]> = {}
    ENTERAL_PRODUCTS.forEach((product) => {
      if (!grouped[product.hcpcsCode]) {
        grouped[product.hcpcsCode] = []
      }
      grouped[product.hcpcsCode].push(product)
    })
    return grouped
  }, [])

  const selectedProduct = useMemo(
    () => ENTERAL_PRODUCTS.find((p) => p.name === formulaName && p.hcpcsCode === hcpcsCode),
    [formulaName, hcpcsCode]
  )

  const selectedHcpcsInfo = useMemo(
    () => HCPCS_CODES.find((c) => c.code === hcpcsCode),
    [hcpcsCode]
  )

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Label className="text-foreground font-semibold">
            Search Formula or HCPCS Code
          </Label>
          <div className="flex gap-1">
            <Button
              type="button"
              variant={searchMode === "formula" ? "secondary" : "ghost"}
              size="sm"
              className="h-6 text-xs px-2"
              onClick={() => setSearchMode("formula")}
            >
              By Formula
            </Button>
            <Button
              type="button"
              variant={searchMode === "hcpcs" ? "secondary" : "ghost"}
              size="sm"
              className="h-6 text-xs px-2"
              onClick={() => setSearchMode("hcpcs")}
            >
              By HCPCS
            </Button>
          </div>
        </div>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between h-10 font-normal text-left"
            >
              {formulaName && hcpcsCode ? (
                <span className="truncate">
                  <span className="font-semibold">{formulaName}</span>
                  {" "}
                  <span className="text-muted-foreground text-xs">
                    ({hcpcsCode} - {selectedProduct?.manufacturer})
                  </span>
                </span>
              ) : (
                <span className="text-muted-foreground">
                  Search by formula name (e.g., Alimentum) or HCPCS code (e.g., B4161)...
                </span>
              )}
              <ChevronDown className="ml-2 size-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
            <Command>
              <CommandInput 
                placeholder={searchMode === "formula" 
                  ? "Type formula name (e.g., Alimentum, Nutramigen, Duocal)..." 
                  : "Type HCPCS code (e.g., B4161, B4155)..."
                } 
              />
              <CommandList className="max-h-[300px]">
                <CommandEmpty>
                  No {searchMode === "formula" ? "formula" : "HCPCS code"} found.
                </CommandEmpty>
                {searchMode === "formula" ? (
                  // Search by formula - show all products grouped by HCPCS
                  Object.entries(formulasByCode).map(([code, products]) => {
                    const hcpcsInfo = HCPCS_CODES.find((c) => c.code === code)
                    return (
                      <CommandGroup 
                        key={code} 
                        heading={`${code} - ${hcpcsInfo?.shortDescription || ""}`}
                      >
                        {products.map((product) => (
                          <CommandItem
                            key={`${product.hcpcsCode}-${product.name}`}
                            value={`${product.name} ${product.manufacturer} ${product.hcpcsCode}`}
                            onSelect={() => {
                              onSelect(product.hcpcsCode, product.name)
                              setOpen(false)
                            }}
                          >
                            <div className="flex flex-col gap-0.5">
                              <span className="font-medium">{product.name}</span>
                              <span className="text-xs text-muted-foreground">
                                {product.manufacturer}
                                {product.isPowder && product.kcalPerGram !== null && ` • ${product.kcalPerGram} kcal/g`}
                                {!product.isPowder && product.kcalPerMl !== null && ` • ${product.kcalPerMl} kcal/mL`}
                                {product.isPowder && <span className="ml-1 text-primary">(powder)</span>}
                              </span>
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    )
                  })
                ) : (
                  // Search by HCPCS code - show codes first, then products when selected
                  <CommandGroup heading="HCPCS Codes">
                    {HCPCS_CODES.map((hcpcs) => {
                      const productCount = formulasByCode[hcpcs.code]?.length || 0
                      return (
                        <CommandItem
                          key={hcpcs.code}
                          value={`${hcpcs.code} ${hcpcs.shortDescription} ${hcpcs.longDescription}`}
                          onSelect={() => {
                            // If clicking a code, show formulas for that code
                            setSearchMode("formula")
                          }}
                        >
                          <div className="flex flex-col gap-0.5 w-full">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-primary">{hcpcs.code}</span>
                              <Badge variant="secondary" className="text-xs">
                                {productCount} formula{productCount !== 1 ? "s" : ""}
                              </Badge>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {hcpcs.shortDescription}
                            </span>
                          </div>
                        </CommandItem>
                      )
                    })}
                  </CommandGroup>
                )}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* Show selected info */}
      {hcpcsCode && (
        <div className="flex flex-col gap-2">
          {hcpcsCode === "B4149" && (
            <p className="text-sm font-bold text-destructive">
              This HCPC may have restrictions, check plan criteria.
            </p>
          )}
          <div className="rounded-lg border border-border bg-muted/40 p-3">
            <div className="flex items-start gap-2">
              <Badge variant="outline" className="shrink-0 font-mono">
                {hcpcsCode}
              </Badge>
              <div className="flex flex-col gap-1 min-w-0">
                <p className="text-sm font-medium text-foreground">
                  {selectedHcpcsInfo?.shortDescription}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {selectedHcpcsInfo?.longDescription}
                </p>
                {selectedProduct && (
                  <p className="text-xs text-primary mt-1">
                    Selected: {selectedProduct.name} ({selectedProduct.manufacturer})
                    {selectedProduct.isPowder && selectedProduct.kcalPerGram !== null && ` • ${selectedProduct.kcalPerGram} kcal/g`}
                    {!selectedProduct.isPowder && selectedProduct.kcalPerMl !== null && ` • ${selectedProduct.kcalPerMl} kcal/mL`}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
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

    // Auto-insert slashes: MM/DD/YYYY
    if (cleaned.length === 10) {
      const parsed = parse(cleaned, "MM/dd/yyyy", new Date())
      if (isValid(parsed)) {
        if (minDate && parsed < minDate) return
        onChange(parsed)
      }
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <Label className="text-foreground font-semibold">{label}</Label>
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="MM/DD/YYYY"
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

type BaseVolumeUnit = "oz" | "mL" | "g"
type VolumeUnit = BaseVolumeUnit | string // string for packaging units like "pkg-0", "pkg-1", etc.
type DensityType = "kcal/mL" | "kcal/g"
type TimePeriod = "day" | "month"

interface CalculationResult {
  dailyMl: number
  dailyVolume: number
  volumeUnit: VolumeUnit
  densityType: DensityType
  densityValue: number
  caloriesPerDay: number
  numDays: number
  totalCalories: number
  totalUnits: number
  formulaName: string
  hcpcsCode: string
}

/** Format a number: no decimals if whole, otherwise up to `digits` decimal places */
function fmt(n: number, digits = 2): string {
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
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex flex-col gap-1 rounded-lg bg-muted/60 p-3">
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
              Daily Volume
            </span>
            <span className="font-semibold text-foreground">
              {fmt(result.dailyVolume)} {result.volumeUnit}/day
            </span>
          </div>
          <div className="flex flex-col gap-1 rounded-lg bg-muted/60 p-3">
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
              Caloric Density
            </span>
            <span className="font-semibold text-foreground">
              {fmt(result.densityValue)} {result.densityType}
            </span>
          </div>
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
            Total Units
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
  const densityUnit = result.densityType === "kcal/g" ? "kcal/g" : "kcal/mL"
  const densityLabel = result.densityType === "kcal/g"
    ? `${fmt(result.densityValue)} calories per gram of powder`
    : `${fmt(result.densityValue)} calories per mL`
  const volumeLabel = result.densityType === "kcal/g" ? "g" : "mL"
  const dailyCalcVolume = result.densityType === "kcal/g"
    ? (result.volumeUnit === "g" ? result.dailyVolume : result.dailyMl)
    : result.dailyMl

  return (
    <Card>
      <CardContent className="flex flex-col gap-3 pt-5">
        <p className="text-sm text-foreground leading-relaxed">
          {`The patient receives ${fmt(result.dailyVolume)}${result.volumeUnit} per day, the requested ${result.formulaName} provides ${densityLabel} (${fmt(result.caloriesPerDay)} calories/day, ${fmt(unitsPerDay)} units/day), the request is for ${result.numDays} day${result.numDays !== 1 ? "s" : ""}, therefore ${fmt(result.totalUnits)} units are required.`}
        </p>
        <Separator />
        <div className="flex flex-col gap-1.5 text-xs text-muted-foreground font-mono">
          <p>{`${fmt(dailyCalcVolume)}${volumeLabel} x ${fmt(result.densityValue)} ${densityUnit} = ${fmt(result.caloriesPerDay)} calories/day`}</p>
          <p>{`${fmt(result.caloriesPerDay)} calories/day x ${result.numDays} day${result.numDays !== 1 ? "s" : ""} = ${fmt(result.totalCalories)} total calories`}</p>
          <p>{`${fmt(result.totalCalories)} total calories / 100 = ${fmt(result.totalUnits)} units`}</p>
        </div>
      </CardContent>
    </Card>
  )
}

// ─── Volume Calculator ─────────────────────────────────────────────────────────

function VolumeCalculator({
  onApply,
  densityType,
}: {
  onApply: (amount: string, unit: BaseVolumeUnit) => void
  densityType: DensityType
}) {
  const [open, setOpen] = useState(false)
  const [amountPerFeeding, setAmountPerFeeding] = useState("")
  const [feedingUnit, setFeedingUnit] = useState<BaseVolumeUnit>(densityType === "kcal/g" ? "g" : "mL")
  const [timesPerDay, setTimesPerDay] = useState("")

  // Sync feedingUnit when densityType changes
  useEffect(() => {
    setFeedingUnit(densityType === "kcal/g" ? "g" : "mL")
  }, [densityType])

  const calculatedTotal = useMemo(() => {
    const amt = parseFloat(amountPerFeeding)
    const times = parseFloat(timesPerDay)
    if (isNaN(amt) || isNaN(times) || amt <= 0 || times <= 0) return null
    return amt * times
  }, [amountPerFeeding, timesPerDay])

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
                  onValueChange={(val: BaseVolumeUnit) => setFeedingUnit(val)}
                >
                  <SelectTrigger className="w-16 h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="oz">oz</SelectItem>
                    <SelectItem value="mL">mL</SelectItem>
                    <SelectItem value="g">g</SelectItem>
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
                = {fmt(calculatedTotal)} {feedingUnit}/day
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

  // Derived state
  const selectedProduct = useMemo(
    () => ENTERAL_PRODUCTS.find((p) => p.name === formulaName && p.hcpcsCode === hcpcsCode),
    [formulaName, hcpcsCode]
  )

  // Handlers
  const handleUnifiedSelect = useCallback((code: string, name: string) => {
    setHcpcsCode(code)
    setFormulaName(name)
    
    const product = ENTERAL_PRODUCTS.find((p) => p.name === name && p.hcpcsCode === code)
    // Auto-set volume unit based on product type
    if (product?.isPowder && product.kcalPerGram !== null) {
      setVolumeUnit("g")
    } else {
      setVolumeUnit("mL")
    }
    setResult(null)
    setErrors([])
  }, [])

  const handleCalculate = useCallback(() => {
    const newErrors: string[] = []

    if (!hcpcsCode) newErrors.push("Please select an HCPCS code.")
    if (!formulaName) newErrors.push("Please select a formula.")
    if (!selectedProduct) newErrors.push("Please select a valid formula.")

    const vol = parseFloat(volumeAmount)
    if (!volumeAmount || isNaN(vol) || vol <= 0) {
      newErrors.push("Please enter a valid volume amount.")
    }

    if (!startDate) newErrors.push("Please select a start date.")
    if (!endDate) newErrors.push("Please select an end date.")

    if (startDate && endDate && endDate < startDate) {
      newErrors.push("End date must be on or after start date.")
    }

    // Determine effective caloric density
    const effectiveDensityType: DensityType = selectedProduct?.isPowder && selectedProduct?.kcalPerGram !== null 
      ? "kcal/g" 
      : "kcal/mL"
    const effectiveKcalValue = effectiveDensityType === "kcal/g" 
      ? selectedProduct?.kcalPerGram 
      : selectedProduct?.kcalPerMl

    if (effectiveKcalValue === null || effectiveKcalValue === undefined) {
      newErrors.push("Caloric density data not available for this formula.")
    }

    if (newErrors.length > 0) {
      setErrors(newErrors)
      setResult(null)
      return
    }

    const kcal = effectiveKcalValue!
    const numDays = differenceInCalendarDays(endDate!, startDate!) + 1

    // Calculate volume in base units (before time period conversion)
    let volumeMl: number
    let volumeGrams: number
    let displayUnit: VolumeUnit = volumeUnit

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
    let dailyMl: number
    let dailyGrams: number
    if (volumeTimePeriod === "month") {
      // If user entered monthly amount, divide by 30 to get daily
      dailyMl = volumeMl / 30
      dailyGrams = volumeGrams / 30
    } else {
      dailyMl = volumeMl
      dailyGrams = volumeGrams
    }

    // Calculate calories based on density type
    let caloriesPerDay: number
    if (effectiveDensityType === "kcal/g") {
      caloriesPerDay = dailyGrams * kcal
    } else {
      caloriesPerDay = dailyMl * kcal
    }

    const totalCalories = caloriesPerDay * numDays
    const totalUnitsRaw = totalCalories / 100
    const totalUnits = Number.isInteger(totalUnitsRaw) ? totalUnitsRaw : Math.ceil(totalUnitsRaw)

    setResult({
      dailyMl,
      dailyVolume: vol,
      volumeUnit: displayUnit,
      densityType: effectiveDensityType,
      densityValue: kcal,
      caloriesPerDay,
      numDays,
      totalCalories,
      totalUnits,
      formulaName,
      hcpcsCode,
    })
    setErrors([])
  }, [hcpcsCode, formulaName, selectedProduct, volumeAmount, volumeUnit, volumeTimePeriod, startDate, endDate])

  const handleReset = useCallback(() => {
    setHcpcsCode("")
    setFormulaName("")
    setVolumeAmount("")
    setVolumeUnit("mL")
    setVolumeTimePeriod("day")
    setStartDate(undefined)
    setEndDate(undefined)
    setResult(null)
    setErrors([])
  }, [])

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
            Search by formula name (e.g., Alimentum, Nutramigen, Duocal) or HCPCS code to calculate billing units.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          {/* Step 1: Unified Formula/HCPCS Search */}
          <UnifiedFormulaSearch
            hcpcsCode={hcpcsCode}
            formulaName={formulaName}
            onSelect={handleUnifiedSelect}
          />

          {/* Caloric Density Info (Read-only) */}
          {selectedProduct && (
            <div className="flex flex-col gap-2">
              <Label className="text-foreground font-semibold">
                Caloric Density
              </Label>
              <div className="rounded-lg border border-border bg-muted/40 p-3">
                <div className="flex flex-wrap items-center gap-2">
                  {selectedProduct.kcalPerMl !== null && (
                    <Badge variant="secondary" className="text-sm">
                      {selectedProduct.kcalPerMl} kcal/mL
                    </Badge>
                  )}
                  {selectedProduct.kcalPerGram !== null && (
                    <Badge variant="secondary" className="text-sm">
                      {selectedProduct.kcalPerGram} kcal/g
                    </Badge>
                  )}
                  {selectedProduct.isPowder && (
                    <Badge variant="outline" className="text-xs">
                      Powder
                    </Badge>
                  )}
                </div>
                {selectedProduct.kcalPerMl === null && selectedProduct.kcalPerGram === null && (
                  <p className="text-xs text-destructive mt-2">
                    Caloric density data not available for this formula.
                  </p>
                )}
              </div>
            </div>
          )}

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
                    Standard Units
                  </div>
                  <SelectItem value="mL">mL</SelectItem>
                  <SelectItem value="oz">oz</SelectItem>
                  <SelectItem value="g">g (powder)</SelectItem>
                  
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
                  
                  const perPeriod = volumeTimePeriod === "month" ? "per month" : "per day"
                  const dailyAmount = volumeTimePeriod === "month" ? amount / 30 : amount
                  const dailyMl = baseMl !== null ? (volumeTimePeriod === "month" ? baseMl / 30 : baseMl) : null
                  const dailyGrams = baseGrams !== null ? (volumeTimePeriod === "month" ? baseGrams / 30 : baseGrams) : null
                  
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
                    </div>
                  )
                })()}
              </div>
            )}
            
            <VolumeCalculator
              densityType={selectedProduct?.isPowder ? "kcal/g" : "kcal/mL"}
              onApply={(amount, unit) => {
                setVolumeAmount(amount)
                setVolumeUnit(unit as VolumeUnit)
                setVolumeTimePeriod("day") // Calculator always produces daily values
                setResult(null)
              }}
            />
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
