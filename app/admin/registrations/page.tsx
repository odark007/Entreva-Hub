"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { 
  Search, 
  Download, 
  Filter, 
  MoreHorizontal, 
  Mail, 
  Phone,
  CheckCircle2,
  Clock
} from "lucide-react"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

export default function RegistrationsPage() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchRegistrations()
  }, [])

  async function fetchRegistrations() {
    try {
      const { data: registrations, error } = await supabase
        .from("future_force_registrations")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) throw error
      setData(registrations || [])
    } catch (error: any) {
      toast.error("Failed to load registrations")
    } finally {
      setLoading(false)
    }
  }

  // Filter logic
  const filteredData = data.filter(item => 
    item.student_full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.parent_email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // CSV Export Logic
  const exportToCSV = () => {
    const headers = ["Date", "Student Name", "Level", "School", "Parent Name", "Parent Phone", "Status"]
    const rows = filteredData.map(r => [
      new Date(r.created_at).toLocaleDateString(),
      r.student_full_name,
      r.education_level,
      r.school_name,
      r.parent_full_name,
      r.parent_phone,
      r.payment_status
    ])
    
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n")
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `FFP_Registrations_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-8">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-entreva-charcoal">Registrations</h1>
          <p className="text-muted-foreground mt-1">Manage student applications for Future Force.</p>
        </div>
        <Button onClick={exportToCSV} variant="outline" className="gap-2 border-2">
          <Download className="h-4 w-4" /> Export CSV
        </Button>
      </div>

      {/* Controls Area */}
      <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Search by student or parent email..." 
            className="pl-10 border-none bg-slate-50 focus-visible:ring-entreva-green"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="ghost" size="icon" className="rounded-xl">
          <Filter className="h-5 w-5 text-slate-500" />
        </Button>
      </div>

      {/* Table Area */}
      <div className="rounded-3xl border bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow>
              <TableHead className="font-bold py-5 pl-8">Student</TableHead>
              <TableHead className="font-bold">Education Level</TableHead>
              <TableHead className="font-bold">Parent / Guardian</TableHead>
              <TableHead className="font-bold">Payment Status</TableHead>
              <TableHead className="font-bold">Date Registered</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center text-slate-400">Loading registrations...</TableCell>
              </TableRow>
            ) : filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center text-slate-400">No registrations found.</TableCell>
              </TableRow>
            ) : (
              filteredData.map((reg) => (
                <TableRow key={reg.id} className="hover:bg-slate-50/50 transition-colors">
                  <TableCell className="pl-8 py-4">
                    <div className="font-bold text-entreva-charcoal">{reg.student_full_name}</div>
                    <div className="text-xs text-slate-500">{reg.school_name}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-100 font-medium">
                      {reg.education_level}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="text-sm font-medium flex items-center gap-2">
                        {reg.parent_full_name}
                      </div>
                      <div className="flex items-center gap-3">
                        <a href={`tel:${reg.parent_phone}`} className="text-xs text-entreva-green hover:underline flex items-center gap-1">
                          <Phone className="h-3 w-3" /> {reg.parent_phone}
                        </a>
                        <a href={`mailto:${reg.parent_email}`} className="text-xs text-slate-400 hover:text-entreva-green transition-colors">
                          <Mail className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {reg.payment_status === "completed" ? (
                      <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-sm">
                        <CheckCircle2 className="h-4 w-4" /> Paid
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-amber-500 font-bold text-sm">
                        <Clock className="h-4 w-4" /> Pending
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-slate-500">
                    {new Date(reg.created_at).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                    })}
                  </TableCell>
                  <TableCell className="pr-8">
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4 text-slate-400" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}