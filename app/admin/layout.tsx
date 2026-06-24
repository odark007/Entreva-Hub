"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [role, setRole] = useState<string | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  // Define the login path (handle potential trailing slashes)
  const isLoginPage = pathname === "/admin/login" || pathname === "/admin/login/"

  useEffect(() => {
    // IF WE ARE ON THE LOGIN PAGE, STOP LOADING AND DO NOTHING
    if (isLoginPage) {
      setLoading(false)
      return
    }

    async function checkAuth() {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()

        if (sessionError) throw sessionError

        if (!session) {
          router.push("/admin/login")
          return
        }

        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", session.user.id)
          .single()

        if (profileError) throw new Error("Could not verify admin permissions.")

        if (!profile || !['admin', 'superadmin'].includes(profile.role)) {
          await supabase.auth.signOut()
          router.push("/admin/login")
          return
        }

        setRole(profile.role)
        setLoading(false)
      } catch (err: any) {
        console.error("AdminAuth Error:", err)
        setError(err.message || "An unknown error occurred.")
      }
    }

    checkAuth()
  }, [router, pathname, isLoginPage])

  // 1. Handle Error State
  if (error && !isLoginPage) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-slate-50 p-6">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-xl font-bold text-slate-800">Authorization Error</h2>
        <p className="text-slate-500 text-center max-w-md mt-2 mb-6">{error}</p>
        <Button onClick={() => window.location.href = "/admin/login"} className="bg-entreva-green text-entreva-charcoal">
          Return to Login
        </Button>
      </div>
    )
  }

  // 2. Handle Loading State
  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-50">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-entreva-green mx-auto" />
          <p className="mt-4 text-slate-500 font-medium">Authorizing Admin...</p>
        </div>
      </div>
    )
  }

  // 3. Render Login Page (Plain, no Sidebar)
  if (isLoginPage) {
    return <>{children}</>
  }

  // 4. Render Protected Dashboard (With Sidebar)
  return (
    <div className="min-h-screen bg-slate-50">
      <AdminSidebar role={role || "admin"} />
      <div className="ml-64 p-10">
        {children}
      </div>
    </div>
  )
}