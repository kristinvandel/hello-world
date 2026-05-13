"use client"

import { useAuth } from "./auth-provider"
import { LoginForm } from "./login-form"
import type { ReactNode } from "react"

export function AuthGate({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <LoginForm />
  }

  return <>{children}</>
}
