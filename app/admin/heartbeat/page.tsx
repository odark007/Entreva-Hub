"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { 
  Activity, 
  RefreshCw, 
  ShieldCheck, 
  History, 
  Zap,
  CheckCircle2,
  Loader2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { toast } from "sonner"

export default function HeartbeatPage() {
  const [logs, setLogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [triggering, setTriggering] = useState(false)

  const fetchLogs = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from("heartbeat")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10)

    if (!error) setLogs(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchLogs()
  }, [])

  const triggerManualPulse = async () => {
    setTriggering(true)
    try {
      // Use the PHP heartbeat script we already set up
      const res = await fetch("/heartbeat.php?secret=entreva_heartbeat_secret_2026")
      if (res.ok) {
        toast.success("Manual pulse sent successfully!")
        fetchLogs() // Refresh the list
      } else {
        throw new Error("Unauthorized or Script missing")
      }
    } catch (err) {
      toast.error("Failed to trigger heartbeat")
    } finally {
      setTriggering(false)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-entreva-charcoal">System Health</h1>
        <p className="text-muted-foreground mt-1">Monitor Supabase activity and prevent database pausing.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Trigger Card */}
        <Card className="lg:col-span-1 border-t-4 border-t-entreva-green shadow-sm">
          <CardHeader>
            <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-2">
              <Zap className="h-5 w-5" />
            </div>
            <CardTitle>Manual Pulse</CardTitle>
            <CardDescription>Force an immediate database interaction.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-500 mb-6">
              Use this if you notice the database is unresponsive or to verify the connection is active.
            </p>
            <Button 
              onClick={triggerManualPulse} 
              disabled={triggering}
              className="w-full bg-entreva-charcoal hover:bg-black font-bold h-12 rounded-xl"
            >
              {triggering ? <Loader2 className="animate-spin mr-2" /> : <Activity className="mr-2 h-4 w-4 text-entreva-green" />}
              Send Pulse Now
            </Button>
          </CardContent>
        </Card>

        {/* Pulse Logs */}
        <Card className="lg:col-span-2 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5 text-slate-400" /> Pulse History
              </CardTitle>
              <CardDescription>Last 10 recorded keep-alive events.</CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={fetchLogs} disabled={loading}>
              <RefreshCw className={loading ? "animate-spin" : "h-4 w-4"} />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {loading && logs.length === 0 ? (
                <p className="text-center py-8 text-slate-400 italic">Checking system logs...</p>
              ) : (
                logs.map((log) => (
                  <div key={log.id} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 transition-hover hover:bg-white hover:shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-entreva-green" />
                      <div>
                        <p className="text-sm font-bold text-entreva-charcoal capitalize">{log.status}</p>
                        <p className="text-[10px] text-slate-400 uppercase font-mono">ID: {log.id.split('-')[0]}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-medium text-slate-600">
                        {new Date(log.created_at).toLocaleString('en-GB', { 
                          day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' 
                        })}
                      </p>
                      <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">SUCCESS</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}