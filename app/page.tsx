import { EnteralCalculator } from "@/components/enteral-calculator"

export default function Page() {
  return (
    <main className="min-h-screen bg-background py-8 px-4 md:py-12 flex flex-col">
      <div className="flex-1">
        <EnteralCalculator />
      </div>
      <footer className="mt-12 pb-6 text-center text-sm" style={{ color: "#FF69B4" }}>
        Made by Kristin Vandeloecht
      </footer>
    </main>
  )
}
