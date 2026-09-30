"use client"

import { useEffect, useMemo, useRef, useState } from "react"
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
  FileText,
  User,
  MapPin,
  Shield,
  GraduationCap,
  Heart,
  Briefcase,
  Globe,
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

function formatLabel(key: string) {
  return key
    .replace(/_/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

const FIELD_SECTIONS: { title: string; icon: any; keys: string[] }[] = [
  {
    title: "Student Information",
    icon: User,
    keys: [
      "student_full_name", "first_name", "surname",
      "student_dob", "dob", "sex",
      "student_email", "email",
      "education_level", "education", "school_name",
      "contact_1", "contact_2",
    ],
  },
  {
    title: "Parent / Guardian",
    icon: Shield,
    keys: [
      "parent_full_name", "parent_relationship",
      "parent_phone", "parent_email",
      "guardian_name", "guardian_contact",
    ],
  },
  {
    title: "Location & Community",
    icon: MapPin,
    keys: ["community", "region"],
  },
  {
    title: "Employment & Marital Status",
    icon: Briefcase,
    keys: ["employment_status", "marital_status"],
  },
  {
    title: "Programme & Payment",
    icon: GraduationCap,
    keys: ["program", "can_attend_full_duration", "payment_status", "status", "hear_about"],
  },
  {
    title: "Additional Information",
    icon: Heart,
    keys: ["is_pwd", "disability_types", "has_ghana_card", "is_refugee", "is_idp"],
  },
]

const IGNORED_KEYS = new Set(["id", "created_at", "updated_at"])

const SUPABASE_REGISTRATIONS_COLUMNS = [
  "id",
  "created_at",
  "program",
  "status",
  "payment_status",
  "amount_paid",
  "paystack_reference",
  "student_full_name",
  "first_name",
  "surname",
  "student_dob",
  "sex",
  "student_email",
  "education_level",
  "school_name",
  "contact_1",
  "contact_2",
  "guardian_name",
  "guardian_contact",
  "parent_full_name",
  "parent_relationship",
  "parent_phone",
  "parent_email",
  "parental_consent",
  "community",
  "region",
  "employment_status",
  "marital_status",
  "can_attend_full_duration",
  "is_pwd",
  "disability_types",
  "hear_about",
  "has_ghana_card",
  "is_refugee",
  "is_idp",
  "momo_number",
  "momo_name",
]

export default function RegistrationsPage() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [programFilter, setProgramFilter] = useState("all")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [communityFilter, setCommunityFilter] = useState("all")
  const [regionFilter, setRegionFilter] = useState("all")
  const [showExportDialog, setShowExportDialog] = useState(false)
  const [exportProgram, setExportProgram] = useState("all")
  const [exportDateFrom, setExportDateFrom] = useState("")
  const [exportDateTo, setExportDateTo] = useState("")
  const [selectedReg, setSelectedReg] = useState<any | null>(null)
  const printRef = useRef<HTMLDivElement>(null)

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

  const uniqueCommunities = useMemo(() => {
    const communities = new Set<string>()
    data.forEach(r => { if (r.community) communities.add(r.community) })
    return Array.from(communities).sort((a, b) => a.localeCompare(b))
  }, [data])

  const uniqueRegions = useMemo(() => {
    const regions = new Set<string>()
    data.forEach(r => { if (r.region) regions.add(r.region) })
    return Array.from(regions).sort((a, b) => a.localeCompare(b))
  }, [data])

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchesSearch = 
        item.student_full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.parent_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.parent_full_name?.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesProgram = programFilter === "all" || item.program === programFilter
      const matchesCommunity = communityFilter === "all" || item.community === communityFilter
      const matchesRegion = regionFilter === "all" || item.region === regionFilter

      const itemDate = new Date(item.created_at)
      const matchesDateFrom = !dateFrom || itemDate >= new Date(dateFrom)
      const matchesDateTo = !dateTo || itemDate <= new Date(dateTo + "T23:59:59")

      return matchesSearch && matchesProgram && matchesCommunity && matchesRegion && matchesDateFrom && matchesDateTo
    })
  }, [data, searchTerm, programFilter, communityFilter, regionFilter, dateFrom, dateTo])

  function getExportData(prog: string, from: string, to: string) {
    return data.filter(item => {
      const matchesProgram = prog === "all" || item.program === prog
      const itemDate = new Date(item.created_at)
      const matchesFrom = !from || itemDate >= new Date(from)
      const matchesTo = !to || itemDate <= new Date(to + "T23:59:59")
      return matchesProgram && matchesFrom && matchesTo
    })
  }

  const exportToCSV = (exportData: any[], filenameSuffix = "") => {
    if (exportData.length === 0) {
      toast.error("No data to export")
      return
    }

    const allKeys = new Set<string>(SUPABASE_REGISTRATIONS_COLUMNS)
    exportData.forEach(row => Object.keys(row).forEach(k => allKeys.add(k)))
    const headers = Array.from(allKeys)

    const rows = exportData.map(row =>
      headers.map(h => {
        const val = row[h]
        if (val === null || val === undefined) return ""
        if (Array.isArray(val)) return val.join("; ")
        if (typeof val === "object") return JSON.stringify(val)
        return String(val)
      })
    )

    const escapeCSV = (val: string) => {
      if (/[",\r\n]/.test(val)) {
        return `"${val.replace(/"/g, '""')}"`
      }
      return val
    }

    const csvContent = "\ufeff" + [
      headers.map(escapeCSV).join(","),
      ...rows.map(r => r.map(escapeCSV).join(","))
    ].join("\r\n")

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    const suffix = filenameSuffix ? `_${filenameSuffix}` : ""
    link.setAttribute("download", `Registrations${suffix}_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success(`Exported ${exportData.length} records with all ${headers.length} columns`)
  }

  function handleExport() {
    const exportData = getExportData(exportProgram, exportDateFrom, exportDateTo)
    exportToCSV(exportData, exportProgram !== "all" ? exportProgram : "")
    setShowExportDialog(false)
  }

  const activeFilters = (programFilter !== "all" || communityFilter !== "all" || regionFilter !== "all" || dateFrom || dateTo)

  function clearFilters() {
    setProgramFilter("all")
    setCommunityFilter("all")
    setRegionFilter("all")
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
        <div className="flex flex-wrap items-center gap-3">
          <Button
            onClick={() => exportToCSV(filteredData, activeFilters ? (programFilter !== "all" ? programFilter : "filtered") : "all")}
            className="bg-entreva-green text-entreva-charcoal hover:bg-entreva-green/90 font-bold gap-2"
          >
            <Download className="h-4 w-4" /> Export CSV ({filteredData.length})
          </Button>
          {activeFilters && (
            <Button
              onClick={() => exportToCSV(data, "all")}
              variant="outline"
              className="gap-2 border-2"
              title="Export all records without applying filters"
            >
              Export All ({data.length})
            </Button>
          )}
        </div>
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

          <div className="h-6 w-px bg-slate-200" />

          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-slate-500" />
            <span className="text-sm font-medium text-slate-600">Community:</span>
          </div>
          <Select value={communityFilter} onValueChange={setCommunityFilter}>
            <SelectTrigger className="w-48 border-slate-200 bg-slate-50 text-sm">
              <SelectValue placeholder="All Communities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Communities</SelectItem>
              {uniqueCommunities.map(cmt => (
                <SelectItem key={cmt} value={cmt}>{cmt}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-slate-500" />
            <span className="text-sm font-medium text-slate-600">Region:</span>
          </div>
          <Select value={regionFilter} onValueChange={setRegionFilter}>
            <SelectTrigger className="w-48 border-slate-200 bg-slate-50 text-sm">
              <SelectValue placeholder="All Regions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              {uniqueRegions.map(rgn => (
                <SelectItem key={rgn} value={rgn}>{rgn}</SelectItem>
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
                    <button
                      onClick={() => setSelectedReg(reg)}
                      className="text-left hover:underline cursor-pointer"
                    >
                      <div className="font-bold text-entreva-charcoal">{reg.student_full_name || `${reg.first_name || ""} ${reg.surname || ""}`.trim()}</div>
                      <div className="text-xs text-slate-500">{reg.school_name}</div>
                    </button>
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
            <p className="text-sm text-slate-500">
              Choose filters for the data you want to export.
            </p>
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

      {/* Registration Detail Dialog */}
      <Dialog open={!!selectedReg} onOpenChange={(open) => { if (!open) setSelectedReg(null) }}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-entreva-charcoal">Registration Details</DialogTitle>
          </DialogHeader>

          {selectedReg && (
            <>
              <div ref={printRef} className="bg-white p-6 rounded-lg">
                <div className="mb-6 border-b-2 border-entreva-green pb-4">
                  <h2 className="text-xl font-black text-entreva-charcoal">Registration Form</h2>
                  <p className="text-sm text-slate-500">
                    {formatProgramName(selectedReg.program)} — Registered{" "}
                    {new Date(selectedReg.created_at).toLocaleDateString("en-GB", {
                      day: "numeric", month: "long", year: "numeric",
                    })}
                  </p>
                </div>

                {FIELD_SECTIONS.map((section) => {
                  const Icon = section.icon
                  const fields = section.keys
                    .map((k) => ({ key: k, value: selectedReg[k] }))
                    .filter((f) => f.value !== null && f.value !== undefined && f.value !== "" && !(Array.isArray(f.value) && f.value.length === 0))
                  if (fields.length === 0) return null
                  return (
                    <div key={section.title} className="mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Icon className="h-4 w-4 text-entreva-green" />
                        <h3 className="text-xs font-bold uppercase tracking-wider text-entreva-green">
                          {section.title}
                        </h3>
                      </div>
                      <div className="grid grid-cols-2 gap-x-6 gap-y-3 rounded-xl border bg-slate-50 p-4">
                        {fields.map(({ key, value }) => (
                          <div key={key}>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                              {formatLabel(key)}
                            </span>
                            <span className="text-sm font-medium text-entreva-charcoal">
                              {Array.isArray(value) ? value.join(", ") : String(value)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}

                {(() => {
                  const standardKeys = new Set(
                    FIELD_SECTIONS.flatMap((s) => s.keys).concat([...IGNORED_KEYS])
                  )
                  const extra = Object.keys(selectedReg).filter(
                    (k) => !standardKeys.has(k) && selectedReg[k] !== null && selectedReg[k] !== undefined && selectedReg[k] !== ""
                  )
                  if (extra.length === 0) return null
                  return (
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <FileText className="h-4 w-4 text-entreva-green" />
                        <h3 className="text-xs font-bold uppercase tracking-wider text-entreva-green">Other Fields</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-x-6 gap-y-3 rounded-xl border bg-slate-50 p-4">
                        {extra.map((k) => (
                          <div key={k}>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                              {formatLabel(k)}
                            </span>
                            <span className="text-sm font-medium text-entreva-charcoal">
                              {Array.isArray(selectedReg[k]) ? selectedReg[k].join(", ") : String(selectedReg[k])}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })()}

                <div className="mt-6 border-t pt-3 text-[10px] text-slate-400">
                  Submitted on{" "}
                  {new Date(selectedReg.created_at).toLocaleString("en-GB")} — ID: {selectedReg.id}
                </div>
              </div>

              <DialogFooter className="gap-2">
                <Button variant="outline" onClick={() => setSelectedReg(null)}>Close</Button>
                <Button
                  onClick={async () => {
                    if (!printRef.current) return
                    const el = printRef.current
                    const canvas = await html2canvas(el, { scale: 2, useCORS: true, backgroundColor: "#ffffff" })
                    const imgData = canvas.toDataURL("image/png")
                    const pdf = new jsPDF("p", "mm", "a4")
                    const w = pdf.internal.pageSize.getWidth()
                    const h = (canvas.height * w) / canvas.width
                    pdf.addImage(imgData, "PNG", 0, 0, w, h)
                    const name = selectedReg.student_full_name || `${selectedReg.first_name || ""} ${selectedReg.surname || ""}`.trim() || "registration"
                    pdf.save(`${name.replace(/\s+/g, "_")}_form.pdf`)
                    toast.success("PDF downloaded")
                  }}
                  className="bg-entreva-green text-entreva-charcoal hover:bg-entreva-green/90 font-bold gap-2"
                >
                  <Download className="h-4 w-4" /> Download PDF
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
