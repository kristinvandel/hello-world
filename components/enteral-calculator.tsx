"use client"

import { useState, useMemo, useCallback } from "react"
import { differenceInCalendarDays, format } from "date-fns"
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

  return (
    <div className="flex flex-col gap-2">
      <Label className="text-foreground font-semibold">{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal h-10",
              !value && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 size-4" />
            {value ? format(value, "MMM d, yyyy") : "Select date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
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
  )
}

// ─── Results Display ───────────────────────────────────────────────────────────

type VolumeUnit = "oz" | "mL" | "g"
type DensityType = "kcal/mL" | "kcal/g"

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
        <div className="relative flex flex-col items-center gap-2 rounded-xl bg-primary p-6 text-primary-foreground overflow-hidden">
          <span className="absolute top-2 left-3 text-2xl opacity-25 select-none pointer-events-none [filter:hue-rotate(200deg)_saturate(2)_brightness(1.4)]" aria-hidden="true">😊</span>
          <span className="absolute top-4 right-4 text-lg opacity-20 select-none pointer-events-none [filter:hue-rotate(200deg)_saturate(2)_brightness(1.4)]" aria-hidden="true">😊</span>
          <span className="absolute bottom-2 left-8 text-lg opacity-20 select-none pointer-events-none [filter:hue-rotate(200deg)_saturate(2)_brightness(1.4)]" aria-hidden="true">😊</span>
          <span className="absolute bottom-3 right-6 text-2xl opacity-25 select-none pointer-events-none [filter:hue-rotate(200deg)_saturate(2)_brightness(1.4)]" aria-hidden="true">😊</span>
          <span className="absolute top-1/2 left-1 -translate-y-1/2 text-sm opacity-15 select-none pointer-events-none [filter:hue-rotate(200deg)_saturate(2)_brightness(1.4)]" aria-hidden="true">😊</span>
          <span className="absolute top-1/2 right-1 -translate-y-1/2 text-sm opacity-15 select-none pointer-events-none [filter:hue-rotate(200deg)_saturate(2)_brightness(1.4)]" aria-hidden="true">😊</span>
          <span className="relative text-xs font-medium uppercase tracking-widest opacity-80">
            Total Units
          </span>
          <span className="relative text-4xl font-bold tracking-tight">
            {fmt(result.totalUnits)}
          </span>
          <Badge variant="secondary" className="relative mt-1 text-xs">
            {Number.isInteger(result.totalCalories) ? result.totalCalories.toLocaleString("en-US") : result.totalCalories.toLocaleString("en-US", { maximumFractionDigits: 2 })} kcal / 100
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}

function ResultsSummary({ result }: { result: CalculationResult }) {
  const unitsPerDay = result.caloriesPerDay / 100
  const densityLabel = result.densityType === "kcal/g"
    ? `${fmt(result.densityValue)} calories per gram of powder`
    : `${fmt(result.densityValue)} calories per mL`
  return (
    <Card>
      <CardContent className="pt-5">
        <p className="text-sm text-foreground leading-relaxed">
          {`The patient receives ${fmt(result.dailyVolume)}${result.volumeUnit} per day, the requested ${result.formulaName} provides ${densityLabel} (${fmt(result.caloriesPerDay)} calories/day, ${fmt(unitsPerDay)} units/day), the request is for ${result.numDays} day${result.numDays !== 1 ? "s" : ""}, therefore ${fmt(result.totalUnits)} units are required.`}
        </p>
      </CardContent>
    </Card>
  )
}

// ─── Volume Calculator ─────────────────────────────────────────────────────────

function VolumeCalculator({
  onApply,
}: {
  onApply: (amount: string, unit: VolumeUnit) => void
}) {
  const [open, setOpen] = useState(false)
  const [amountPerFeeding, setAmountPerFeeding] = useState("")
  const [feedingUnit, setFeedingUnit] = useState<VolumeUnit>("oz")
  const [timesPerDay, setTimesPerDay] = useState("")

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
                  onValueChange={(val: VolumeUnit) => setFeedingUnit(val)}
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
  const [densityType, setDensityType] = useState<DensityType>("kcal/mL")
  const [kcalOverride, setKcalOverride] = useState("")
  const [volumeAmount, setVolumeAmount] = useState("")
  const [volumeUnit, setVolumeUnit] = useState<VolumeUnit>("oz")
  const [startDate, setStartDate] = useState<Date | undefined>()
  const [endDate, setEndDate] = useState<Date | undefined>()
  const [result, setResult] = useState<CalculationResult | null>(null)
  const [errors, setErrors] = useState<string[]>([])

  // Derived state
  const products = useMemo(() => (hcpcsCode ? getProductsByCode(hcpcsCode) : []), [hcpcsCode])

  const selectedProduct = useMemo(
    () => ENTERAL_PRODUCTS.find((p) => p.name === formulaName && p.hcpcsCode === hcpcsCode),
    [formulaName, hcpcsCode]
  )

  const effectiveKcal = useMemo(() => {
    if (kcalOverride !== "") return parseFloat(kcalOverride)
    if (densityType === "kcal/g") return selectedProduct?.kcalPerGram ?? null
    return selectedProduct?.kcalPerMl ?? null
  }, [kcalOverride, selectedProduct, densityType])

  // Handlers
  const handleHcpcsChange = useCallback((code: string) => {
    setHcpcsCode(code)
    setFormulaName("")
    setDensityType("kcal/mL")
    setKcalOverride("")
    setResult(null)
    setErrors([])
  }, [])

  const handleFormulaChange = useCallback(
    (name: string) => {
      setFormulaName(name)
      const product = ENTERAL_PRODUCTS.find((p) => p.name === name && p.hcpcsCode === hcpcsCode)
      // Auto-switch to kcal/g for powder products, kcal/mL for liquid
      if (product?.isPowder && product.kcalPerGram !== null) {
        setDensityType("kcal/g")
        setKcalOverride(product.kcalPerGram.toString())
        setVolumeUnit("g")
      } else if (product?.kcalPerMl !== null && product?.kcalPerMl !== undefined) {
        setDensityType("kcal/mL")
        setKcalOverride(product.kcalPerMl.toString())
      } else {
        setKcalOverride("")
      }
      setResult(null)
      setErrors([])
    },
    [hcpcsCode]
  )

  const handleCalculate = useCallback(() => {
    const newErrors: string[] = []

    if (!hcpcsCode) newErrors.push("Please select an HCPCS code.")
    if (!formulaName) newErrors.push("Please select a formula.")

    const kcal = parseFloat(kcalOverride)
    if (!kcalOverride || isNaN(kcal) || kcal <= 0) {
      newErrors.push(`Please enter a valid caloric density (${densityType}).`)
    }

    const vol = parseFloat(volumeAmount)
    if (!volumeAmount || isNaN(vol) || vol <= 0) {
      newErrors.push("Please enter a valid daily volume.")
    }

    if (!startDate) newErrors.push("Please select a start date.")
    if (!endDate) newErrors.push("Please select an end date.")

    if (startDate && endDate && endDate < startDate) {
      newErrors.push("End date must be on or after start date.")
    }

    if (newErrors.length > 0) {
      setErrors(newErrors)
      setResult(null)
      return
    }

    // Calculate
    let caloriesPerDay: number
    const dailyMl = volumeUnit === "oz" ? vol * OZ_TO_ML : volumeUnit === "g" ? vol * G_TO_ML : vol

    if (densityType === "kcal/g") {
      // For powder: convert daily volume to grams, then multiply by kcal/g
      const dailyGrams = volumeUnit === "g" ? vol : volumeUnit === "oz" ? vol * OZ_TO_ML * G_TO_ML : vol * G_TO_ML
      caloriesPerDay = dailyGrams * kcal
    } else {
      // For liquid: convert to mL then multiply by kcal/mL
      caloriesPerDay = dailyMl * kcal
    }
    const numDays = differenceInCalendarDays(endDate!, startDate!) + 1
    const totalCalories = caloriesPerDay * numDays
    const totalUnitsRaw = totalCalories / 100
    const totalUnits = Number.isInteger(totalUnitsRaw) ? totalUnitsRaw : Math.ceil(totalUnitsRaw)

    setResult({
      dailyMl,
      dailyVolume: vol,
      volumeUnit,
      densityType,
      densityValue: kcal,
      caloriesPerDay,
      numDays,
      totalCalories,
      totalUnits,
      formulaName,
      hcpcsCode,
    })
    setErrors([])
  }, [hcpcsCode, formulaName, kcalOverride, densityType, volumeAmount, volumeUnit, startDate, endDate])

  const handleReset = useCallback(() => {
    setHcpcsCode("")
    setFormulaName("")
    setDensityType("kcal/mL")
    setKcalOverride("")
    setVolumeAmount("")
    setVolumeUnit("oz")
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
            Look up enteral formulas by HCPCS code and calculate total billing units based on daily intake and date range.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          {/* Step 1: HCPCS Code */}
          <HcpcsCodeSelector value={hcpcsCode} onChange={handleHcpcsChange} />

          {/* Step 2: Formula */}
          <FormulaSelector
            products={products}
            value={formulaName}
            onChange={handleFormulaChange}
            disabled={!hcpcsCode}
          />

          {/* Step 3: Caloric Density */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="kcal" className="text-foreground font-semibold">
              Caloric Density
            </Label>
            {/* Density type toggle */}
            <div className="flex rounded-lg border border-border overflow-hidden w-fit">
              <button
                type="button"
                onClick={() => {
                  setDensityType("kcal/mL")
                  const mlVal = selectedProduct?.kcalPerMl
                  if (mlVal !== null && mlVal !== undefined) setKcalOverride(mlVal.toString())
                  else setKcalOverride("")
                  setResult(null)
                }}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium transition-colors",
                  densityType === "kcal/mL"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/40 text-muted-foreground hover:bg-muted"
                )}
              >
                kcal / mL
              </button>
              <button
                type="button"
                onClick={() => {
                  setDensityType("kcal/g")
                  setVolumeUnit("g")
                  const gVal = selectedProduct?.kcalPerGram
                  if (gVal !== null && gVal !== undefined) setKcalOverride(gVal.toString())
                  else setKcalOverride("")
                  setResult(null)
                }}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium transition-colors",
                  densityType === "kcal/g"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/40 text-muted-foreground hover:bg-muted"
                )}
              >
                kcal / g powder
              </button>
            </div>
            <div className="flex items-center gap-2">
              <Input
                id="kcal"
                type="number"
                step="0.01"
                min="0"
                placeholder={`Enter ${densityType}`}
                value={kcalOverride}
                onChange={(e) => {
                  setKcalOverride(e.target.value)
                  setResult(null)
                }}
                disabled={!formulaName}
                className="flex-1"
              />
              {effectiveKcal !== null && effectiveKcal > 0 && (
                <Badge variant="outline" className="shrink-0">
                  {effectiveKcal} {densityType}
                </Badge>
              )}
            </div>
            {formulaName && effectiveKcal === null && (
              <p className="text-xs text-destructive">
                {densityType === "kcal/g"
                  ? "kcal/g data is not available for this formula. Enter manually or switch to kcal/mL."
                  : "kcal/mL data is not available for this formula. Enter manually or try kcal/g for powder formulas."}
              </p>
            )}
            {formulaName && effectiveKcal !== null && effectiveKcal > 0 && (
              <p className="text-xs text-muted-foreground">
                Pre-filled from database. You can override this value.
              </p>
            )}
          </div>

          <Separator />

          {/* Step 4: Daily Volume */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="volume" className="text-foreground font-semibold">
              Daily Volume
            </Label>
            <div className="flex gap-2">
              <Input
                id="volume"
                type="number"
                step="0.1"
                min="0"
                placeholder="Amount per day"
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
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="oz">oz</SelectItem>
                  <SelectItem value="mL">mL</SelectItem>
                  <SelectItem value="g">g</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {volumeAmount && parseFloat(volumeAmount) > 0 && (
              <p className="text-xs text-muted-foreground">
                {volumeUnit === "oz" && `= ${fmt(parseFloat(volumeAmount) * OZ_TO_ML)} mL per day`}
                {volumeUnit === "mL" && `= ${fmt(parseFloat(volumeAmount) / OZ_TO_ML)} oz per day`}
                {volumeUnit === "g" && `= ${fmt(parseFloat(volumeAmount) * G_TO_ML)} mL per day`}
              </p>
            )}
            <VolumeCalculator
              onApply={(amount, unit) => {
                setVolumeAmount(amount)
                setVolumeUnit(unit)
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
