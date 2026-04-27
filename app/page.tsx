"use client"

import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { LoginPage } from "@/components/login-page"
import { EnteralCalculator } from "@/components/enteral-calculator"
import { DisplayModeToggle } from "@/components/display-mode-toggle"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export default function Page() {
  const { isAuthenticated, logout } = useAuth()

  if (!isAuthenticated) {
    return <LoginPage />
  }

  return (
    <main className="min-h-screen bg-background py-8 px-4 md:py-12 flex flex-col relative">
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={logout}
          className="gap-1.5"
        >
          <LogOut className="size-4" />
          Sign Out
        </Button>
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
