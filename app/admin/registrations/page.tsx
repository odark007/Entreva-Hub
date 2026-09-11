"use client"

import { useEffect, useMemo, useState } from "react"
import { supabase } from "@/lib/supabase"
import { 
  Search, 
  Download, 
  Filter, 
  MoreHorizontal, 
  Mail, 
  Phone,
  CheckCircle2,
  Clock,
  Calendar,
  X,
  ChevronDown,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"

export default function RegistrationsPage() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [programFilter, setProgramFilter] = useState("all")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [showExportDialog, setShowExportDialog] = useState(false)
  const [exportProgram, setExportProgram] = useState("all")
  const [exportDateFrom, setExportDateFrom] = useState("")
  const [exportDateTo, setExportDateTo] = useState("")

  useEffect(() => {
    fetchRegistrations()
  }, [])

  const formatProgramName = (prog: string) => {
    if (!prog) return "Future Force"
    return prog
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  async function fetchRegistrations() {
    try {
      const { data: registrations, error } = await supabase
        .from("registrations")
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

  const uniquePrograms = useMemo(() => {
    const programs = new Set<string>()
    data.forEach(r => { if (r.program) programs.add(r.program) })
    return Array.from(programs).sort()
  }, [data])

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchesSearch = 
        item.student_full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.parent_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.parent_full_name?.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesProgram = programFilter === "all" || item.program === programFilter

      const itemDate = new Date(item.created_at)
      const matchesDateFrom = !dateFrom || itemDate >= new Date(dateFrom)
      const matchesDateTo = !dateTo || itemDate <= new Date(dateTo + "T23:59:59")

      return matchesSearch && matchesProgram && matchesDateFrom && matchesDateTo
    })
  }, [data, searchTerm, programFilter, dateFrom, dateTo])

  function getExportData(prog: string, from: string, to: string) {
    return data.filter(item => {
      const matchesProgram = prog === "all" || item.program === prog
      const itemDate = new Date(item.created_at)
      const matchesFrom = !from || itemDate >= new Date(from)
      const matchesTo = !to || itemDate <= new Date(to + "T23:59:59")
      return matchesProgram && matchesFrom && matchesTo
    })
  }

  const exportToCSV = (exportData: any[]) => {
    if (exportData.length === 0) {
      toast.error("No data to export")
      return
    }

    const headers = ["Date", "Student Name", "Program", "Level", "School", "Parent Name", "Parent Phone", "Parent Email", "Status"]
    const rows = exportData.map(r => [
      new Date(r.created_at).toLocaleDateString(),
      r.student_full_name,
      formatProgramName(r.program),
      r.education_level,
      r.school_name,
      r.parent_full_name,
      r.parent_phone,
      r.parent_email,
      r.payment_status
    ])
    
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n")
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `Registrations_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success(`Exported ${exportData.length} records`)
  }

  function handleExport() {
    const exportData = getExportData(exportProgram, exportDateFrom, exportDateTo)
    exportToCSV(exportData)
    setShowExportDialog(false)
  }

  const activeFilters = (programFilter !== "all" || dateFrom || dateTo)

  function clearFilters() {
    setProgramFilter("all")
    setDateFrom("")
    setDateTo("")
    setSearchTerm("")
  }

  return (
    <div className="space-y-8">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-entreva-charcoal">Registrations</h1>
          <p className="text-muted-foreground mt-1">Manage student applications across all programmes.</p>
        </div>
        <Button onClick={() => setShowExportDialog(true)} variant="outline" className="gap-2 border-2">
          <Download className="h-4 w-4" /> Export CSV
        </Button>
      </div>

      {/* Controls Area */}
      <div className="bg-white p-4 rounded-2xl border shadow-sm space-y-4">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search by student, parent name or email..." 
              className="pl-10 border-none bg-slate-50 focus-visible:ring-entreva-green"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {activeFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1 text-slate-500 hover:text-red-500">
              <X className="h-4 w-4" /> Clear
            </Button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-slate-500" />
            <span className="text-sm font-medium text-slate-600">Date Range:</span>
          </div>
          <Input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="w-40 border-slate-200 bg-slate-50 text-sm"
            placeholder="From"
          />
          <span className="text-slate-400">to</span>
          <Input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="w-40 border-slate-200 bg-slate-50 text-sm"
            placeholder="To"
          />

          <div className="h-6 w-px bg-slate-200" />

          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-slate-500" />
            <span className="text-sm font-medium text-slate-600">Program:</span>
          </div>
          <Select value={programFilter} onValueChange={setProgramFilter}>
            <SelectTrigger className="w-56 border-slate-200 bg-slate-50 text-sm">
              <SelectValue placeholder="All Programmes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Programmes</SelectItem>
              {uniquePrograms.map(p => (
                <SelectItem key={p} value={p}>{formatProgramName(p)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-slate-500">
        Showing {filteredData.length} of {data.length} registrations
      </div>

      {/* Table Area */}
      <div className="rounded-3xl border bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow>
              <TableHead className="font-bold py-5 pl-8">Student</TableHead>
              <TableHead className="font-bold">Program</TableHead>
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
                <TableCell colSpan={7} className="h-32 text-center text-slate-400">Loading registrations...</TableCell>
              </TableRow>
            ) : filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-32 text-center text-slate-400">No registrations found.</TableCell>
              </TableRow>
            ) : (
              filteredData.map((reg) => (
                <TableRow key={reg.id} className="hover:bg-slate-50/50 transition-colors">
                  <TableCell className="pl-8 py-4">
                    <div className="font-bold text-entreva-charcoal">{reg.student_full_name}</div>
                    <div className="text-xs text-slate-500">{reg.school_name}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-100 font-medium">
                      {formatProgramName(reg.program)}
                    </Badge>
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

      {/* Export Dialog */}
      <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-entreva-charcoal">Export Registrations</DialogTitle>
            <DialogDescription>
              Choose filters for the data you want to export.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Programme</label>
              <Select value={exportProgram} onValueChange={setExportProgram}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All Programmes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Programmes</SelectItem>
                  {uniquePrograms.map(p => (
                    <SelectItem key={p} value={p}>{formatProgramName(p)}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Date Range</label>
              <div className="flex items-center gap-3">
                <Input
                  type="date"
                  value={exportDateFrom}
                  onChange={(e) => setExportDateFrom(e.target.value)}
                  className="flex-1"
                  placeholder="From"
                />
                <span className="text-slate-400">to</span>
                <Input
                  type="date"
                  value={exportDateTo}
                  onChange={(e) => setExportDateTo(e.target.value)}
                  className="flex-1"
                  placeholder="To"
                />
              </div>
            </div>

            <div className="rounded-lg bg-slate-50 p-3 text-sm text-slate-600">
              This will export <strong>{getExportData(exportProgram, exportDateFrom, exportDateTo).length}</strong> records.
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowExportDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleExport} className="bg-entreva-green text-entreva-charcoal hover:bg-entreva-green/90 font-bold gap-2">
              <Download className="h-4 w-4" /> Export CSV
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
