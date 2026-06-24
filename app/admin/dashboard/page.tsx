"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { 
  Users, 
  CreditCard, 
  TrendingUp, 
  Activity, 
  Clock,
  Loader2,
  Calendar
} from "lucide-react"
import { cn } from "@/lib/utils"
// --- ENSURE THESE IMPORTS EXIST ---
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalReg: 0,
    paidReg: 0,
    revenue: 0,
    conversion: 0
  })
  const [recentActivity, setRecentActivity] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        // 1. Fetch Registrations
        const { data: regData } = await supabase
          .from("future_force_registrations")
          .select("id, student_full_name, created_at")
        
        // 2. Fetch Payments
        const { data: payData } = await supabase
          .from("payments")
          .select("*")

        const successfulPayments = payData?.filter(p => p.payment_status === "completed") || []
        const totalRevenue = successfulPayments.reduce((acc, curr) => acc + Number(curr.amount), 0)
        
        const totalReg = regData?.length || 0
        const paidReg = successfulPayments.length
        const conversion = totalReg > 0 ? Math.round((paidReg / totalReg) * 100) : 0

        setStats({ totalReg, paidReg, revenue: totalRevenue, conversion })

        // 3. Create Activity Feed
        const activity = [
            ...(regData?.map(r => ({ ...r, type: 'registration' })) || []),
            ...(successfulPayments.map(p => ({ ...p, type: 'payment', student_full_name: p.full_name })) || [])
        ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 5)

        setRecentActivity(activity)
      } catch (error) {
        console.error("Dashboard Load Error:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-entreva-green" />
      </div>
    )
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-black text-entreva-charcoal">System Overview</h1>
        <p className="text-muted-foreground mt-2">Live performance of the Future Force Program.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={Users} label="Total Registrations" value={stats.totalReg} color="blue" />
        <StatCard icon={CreditCard} label="Revenue (GHS)" value={stats.revenue.toLocaleString()} color="green" />
        <StatCard icon={TrendingUp} label="Conversion Rate" value={`${stats.conversion}%`} color="purple" />
        <StatCard icon={Activity} label="Cohort Capacity" value={`${stats.paidReg}/30`} color="orange" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* RECENT ACTIVITY FEED */}
        <div className="lg:col-span-2 space-y-4">
            <h3 className="text-lg font-bold text-entreva-charcoal flex items-center gap-2">
                <Clock className="h-5 w-5 text-slate-400" /> Recent Activity
            </h3>
            <div className="rounded-3xl border bg-white overflow-hidden shadow-sm">
                {recentActivity.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-5 border-b last:border-0 hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className={cn(
                                "h-10 w-10 rounded-full flex items-center justify-center",
                                item.type === 'payment' ? "bg-emerald-100 text-emerald-600" : "bg-blue-100 text-blue-600"
                            )}>
                                {item.type === 'payment' ? <CreditCard className="h-5 w-5" /> : <Users className="h-5 w-5" />}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-entreva-charcoal">
                                    {item.type === 'payment' ? 'New Payment Received' : 'New Registration'}
                                </p>
                                <p className="text-xs text-slate-500">{item.student_full_name}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-bold text-slate-400 uppercase">
                                {new Date(item.created_at).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* COHORT PROGRESS */}
        <div className="space-y-4">
            <h3 className="text-lg font-bold text-entreva-charcoal flex items-center gap-2">
                <Calendar className="h-5 w-5 text-slate-400" /> Cohort Progress
            </h3>
            <div className="rounded-3xl border bg-entreva-charcoal p-8 text-white shadow-xl">
                <p className="text-sm text-background/60 font-medium">Cohort 1 Enrollment</p>
                <div className="mt-6 flex items-end justify-between">
                    <h4 className="text-4xl font-black">{stats.paidReg} <span className="text-lg text-background/40 font-normal">/ 30</span></h4>
                    <span className="text-entreva-green font-bold text-sm">
                        {Math.round((stats.paidReg / 30) * 100)}% Full
                    </span>
                </div>
                <Progress 
                    value={(stats.paidReg / 30) * 100} 
                    className="h-3 mt-4 bg-white/10" 
                />
                <p className="mt-8 text-xs text-background/40 leading-relaxed">
                    Limit: 30 paid participants.
                </p>
                <Button className="w-full mt-6 bg-white/10 hover:bg-white/20 text-white border-0 rounded-xl" asChild>
                    <a href="/admin/registrations">View Registrations</a>
                </Button>
            </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon: Icon, label, value, color }: any) {
  const colors: any = {
    blue: "text-blue-600 bg-blue-50",
    green: "text-emerald-600 bg-emerald-50",
    purple: "text-purple-600 bg-purple-50",
    orange: "text-orange-600 bg-orange-50",
  }

  return (
    <div className="rounded-3xl bg-white p-6 border shadow-sm transition-all hover:shadow-md">
      <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center mb-4", colors[color])}>
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">{label}</h3>
      <p className="text-3xl font-black mt-1 text-entreva-charcoal">{value}</p>
    </div>
  )
}