"use client"

import { useState, useMemo, useCallback } from "react"
import { differenceInCalendarDays, format } from "date-fns"
import { CalendarIcon, ChevronDown, Calculator, RotateCcw } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  HCPCS_CODES,
  ENTERAL_PRODUCTS,
  getProductsByCode,
  OZ_TO_ML,
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
                        {product.kcalPerMl !== null && ` \u2022 ${product.kcalPerMl} kcal/mL`}
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

interface CalculationResult {
  dailyMl: number
  kcalPerMl: number
  caloriesPerDay: number
  numDays: number
  totalCalories: number
  totalUnits: number
  formulaName: string
  hcpcsCode: string
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
              {result.dailyMl.toFixed(1)} mL/day
            </span>
          </div>
          <div className="flex flex-col gap-1 rounded-lg bg-muted/60 p-3">
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
              Caloric Density
            </span>
            <span className="font-semibold text-foreground">
              {result.kcalPerMl} kcal/mL
            </span>
          </div>
          <div className="flex flex-col gap-1 rounded-lg bg-muted/60 p-3">
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
              Calories/Day
            </span>
            <span className="font-semibold text-foreground">
              {result.caloriesPerDay.toFixed(1)} kcal
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
            {result.totalCalories.toLocaleString("en-US", { maximumFractionDigits: 1 })} kcal
          </span>
        </div>

        {/* Final result */}
        <div className="flex flex-col items-center gap-2 rounded-xl bg-primary p-6 text-primary-foreground">
          <span className="text-xs font-medium uppercase tracking-widest opacity-80">
            Total Units
          </span>
          <span className="text-4xl font-bold tracking-tight">
            {result.totalUnits.toFixed(2)}
          </span>
          <Badge variant="secondary" className="mt-1 text-xs">
            {result.totalCalories.toLocaleString("en-US", { maximumFractionDigits: 0 })} kcal / 100
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}

function ResultsSummary({ result }: { result: CalculationResult }) {
  return (
    <Card>
      <CardContent className="pt-5">
        <p className="text-sm text-foreground leading-relaxed">
          {`The patient receives ${result.dailyMl.toFixed(1)}mL per day, the requested ${result.formulaName} provides ${result.kcalPerMl} calories per mL, the request is for ${result.numDays} day${result.numDays !== 1 ? "s" : ""}, therefore ${result.totalUnits.toFixed(2)} units are required.`}
        </p>
      </CardContent>
    </Card>
  )
}

// ─── Main Calculator ───────────────────────────────────────────────────────────

export function EnteralCalculator() {
  // Form state
  const [hcpcsCode, setHcpcsCode] = useState("")
  const [formulaName, setFormulaName] = useState("")
  const [kcalOverride, setKcalOverride] = useState("")
  const [volumeAmount, setVolumeAmount] = useState("")
  const [volumeUnit, setVolumeUnit] = useState<"oz" | "mL">("oz")
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
    return selectedProduct?.kcalPerMl ?? null
  }, [kcalOverride, selectedProduct])

  // Handlers
  const handleHcpcsChange = useCallback((code: string) => {
    setHcpcsCode(code)
    setFormulaName("")
    setKcalOverride("")
    setResult(null)
    setErrors([])
  }, [])

  const handleFormulaChange = useCallback(
    (name: string) => {
      setFormulaName(name)
      const product = ENTERAL_PRODUCTS.find((p) => p.name === name && p.hcpcsCode === hcpcsCode)
      if (product?.kcalPerMl !== null && product?.kcalPerMl !== undefined) {
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
      newErrors.push("Please enter a valid caloric density (kcal/mL).")
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
    const dailyMl = volumeUnit === "oz" ? vol * OZ_TO_ML : vol
    const caloriesPerDay = dailyMl * kcal
    const numDays = differenceInCalendarDays(endDate!, startDate!) + 1
    const totalCalories = caloriesPerDay * numDays
    const totalUnits = totalCalories / 100

    setResult({
      dailyMl,
      kcalPerMl: kcal,
      caloriesPerDay,
      numDays,
      totalCalories,
      totalUnits,
      formulaName,
      hcpcsCode,
    })
    setErrors([])
  }, [hcpcsCode, formulaName, kcalOverride, volumeAmount, volumeUnit, startDate, endDate])

  const handleReset = useCallback(() => {
    setHcpcsCode("")
    setFormulaName("")
    setKcalOverride("")
    setVolumeAmount("")
    setVolumeUnit("oz")
    setStartDate(undefined)
    setEndDate(undefined)
    setResult(null)
    setErrors([])
  }, [])

  return (
    <div className="flex flex-col gap-6 w-full max-w-xl mx-auto">
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
              Caloric Density (kcal/mL)
            </Label>
            <div className="flex items-center gap-2">
              <Input
                id="kcal"
                type="number"
                step="0.01"
                min="0"
                placeholder={
                  selectedProduct?.kcalPerMl !== null && selectedProduct?.kcalPerMl !== undefined
                    ? selectedProduct.kcalPerMl.toString()
                    : "Enter kcal/mL"
                }
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
                  {effectiveKcal} kcal/mL
                </Badge>
              )}
            </div>
            {selectedProduct?.kcalPerMl === null && formulaName && (
              <p className="text-xs text-destructive">
                Caloric density is not available for this formula. Please enter it manually.
              </p>
            )}
            {selectedProduct?.kcalPerMl !== null && formulaName && (
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
                onValueChange={(val: "oz" | "mL") => {
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
                </SelectContent>
              </Select>
            </div>
            {volumeAmount && parseFloat(volumeAmount) > 0 && (
              <p className="text-xs text-muted-foreground">
                {volumeUnit === "oz"
                  ? `= ${(parseFloat(volumeAmount) * OZ_TO_ML).toFixed(1)} mL per day`
                  : `= ${(parseFloat(volumeAmount) / OZ_TO_ML).toFixed(1)} oz per day`}
              </p>
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
