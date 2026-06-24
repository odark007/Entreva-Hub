"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  Settings, 
  LogOut, 
  ShieldCheck,
  ChevronRight
} from "lucide-react"
import { cn } from "@/lib/utils"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"

const menuItems = [
  { name: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Registrations", href: "/admin/registrations", icon: Users },
  { name: "Payments", href: "/admin/payments", icon: CreditCard },
  { name: "System Health", href: "/admin/heartbeat", icon: ShieldCheck },
]

export function AdminSidebar({ role }: { role: string }) {
  const pathname = usePathname()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = "/admin/login"
  }

  return (
    <div className="flex h-screen w-64 flex-col bg-entreva-charcoal text-white fixed left-0 top-0">
      <div className="p-6 border-b border-white/10">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-entreva-green flex items-center justify-center font-bold text-entreva-charcoal">
            E
          </div>
          <span className="font-black tracking-tight text-xl">HUB ADMIN</span>
        </Link>
        <div className="mt-4 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-entreva-green animate-pulse" />
          <span className="text-[10px] uppercase font-bold text-background/40 tracking-widest">
            {role} Portal
          </span>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-4 py-6">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all",
                isActive 
                  ? "bg-entreva-green text-entreva-charcoal shadow-lg shadow-entreva-green/20" 
                  : "text-background/60 hover:bg-white/5 hover:text-white"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className={cn("h-5 w-5", isActive ? "text-entreva-charcoal" : "text-entreva-green")} />
                {item.name}
              </div>
              {isActive && <ChevronRight className="h-4 w-4" />}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-white/10 space-y-4">
        {role === 'superadmin' && (
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-2 text-sm text-background/40 hover:text-white transition-colors">
            <Settings className="h-4 w-4" />
            Admin Settings
          </Link>
        )}
        <Button 
          variant="ghost" 
          onClick={handleSignOut}
          className="w-full justify-start gap-3 px-4 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl"
        >
          <LogOut className="h-5 w-5" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}