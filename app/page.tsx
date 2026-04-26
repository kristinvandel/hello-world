import Link from "next/link"
import { EnteralCalculator } from "@/components/enteral-calculator"
import { DisplayModeToggle } from "@/components/display-mode-toggle"

export default function Page() {
  return (
    <main className="min-h-screen bg-background py-8 px-4 md:py-12 flex flex-col relative">
      <div className="absolute top-4 right-4">
        <DisplayModeToggle />
      </div>
      <div className="flex-1">
        <EnteralCalculator />
      </div>
      <footer className="mt-12 pb-6 text-center text-sm flex flex-col items-center gap-2">
        <Link 
          href="/info" 
          className="text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
        >
          References
        </Link>
        <span style={{ color: "#FF69B4" }}>Made by Kristin Vandeloecht</span>
      </footer>
    </main>
  )
}
