"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { 
  Search, 
  Download, 
  CreditCard, 
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Filter
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
import { toast } from "sonner"
import { cn } from "@/lib/utils"

export default function PaymentsPage() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchPayments()
  }, [])

  async function fetchPayments() {
    try {
      const { data: payments, error } = await supabase
        .from("payments")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) throw error
      setData(payments || [])
    } catch (error: any) {
      toast.error("Failed to load payment records")
    } finally {
      setLoading(false)
    }
  }

  // Statistics Calculation
  const totalRevenue = data
    .filter(p => p.payment_status === "completed")
    .reduce((acc, curr) => acc + Number(curr.amount), 0)

  const successfulCount = data.filter(p => p.payment_status === "completed").length

  // Filter logic
  const filteredData = data.filter(item => 
    (item.full_name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
    item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.paystack_reference?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  )

  const exportCSV = () => {
    const headers = ["Date", "Payer Name", "Email", "Amount (GHS)", "Program", "Reference", "Status"]
    const rows = filteredData.map(p => [
      new Date(p.created_at).toLocaleDateString(),
      p.full_name || "N/A",
      p.email,
      p.amount,
      p.program_slug,
      p.paystack_reference || "N/A",
      p.payment_status
    ])
    
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n")
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = `Entreva_Payments_${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  }

  return (
    <div className="space-y-8">
      {/* Header & Stats Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-entreva-charcoal">Finance & Payments</h1>
          <p className="text-muted-foreground mt-1">Track revenue and Paystack transactions.</p>
        </div>

        <div className="flex gap-4">
            <div className="bg-emerald-50 border border-emerald-100 px-6 py-3 rounded-2xl">
                <div className="flex items-center gap-2 text-emerald-600 mb-1">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Total Revenue</span>
                </div>
                <p className="text-2xl font-black text-emerald-700">GHS {totalRevenue.toLocaleString()}</p>
            </div>
            <Button onClick={exportCSV} variant="outline" className="h-full border-2 gap-2 rounded-2xl">
                <Download className="h-4 w-4" /> Export
            </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Search name, email, or reference..." 
            className="pl-10 border-none bg-slate-50 focus-visible:ring-entreva-green"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="ghost" size="icon" className="rounded-xl">
          <Filter className="h-5 w-5 text-slate-500" />
        </Button>
      </div>

      {/* Payments Table */}
      <div className="rounded-3xl border bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow>
              <TableHead className="font-bold py-5 pl-8 text-xs uppercase tracking-wider">Payer Info</TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-wider text-center">Amount</TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-wider">Program</TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-wider text-center">Status</TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-wider">Reference</TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-wider">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center text-slate-400">Fetching records...</TableCell>
              </TableRow>
            ) : filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center text-slate-400">No payment records found.</TableCell>
              </TableRow>
            ) : (
              filteredData.map((payment) => (
                <TableRow key={payment.id} className="hover:bg-slate-50/50 transition-colors group">
                  <TableCell className="pl-8 py-5">
                    <div className="font-bold text-entreva-charcoal leading-tight">
                        {payment.full_name || "Anonymous Payer"}
                    </div>
                    <div className="text-xs text-slate-400">{payment.email}</div>
                  </TableCell>
                  
                  <TableCell className="text-center">
                    <div className="inline-flex items-center gap-1 font-black text-entreva-charcoal bg-slate-100 px-3 py-1 rounded-lg text-sm">
                        <span className="text-[10px] text-slate-400">GHS</span>
                        {Number(payment.amount).toLocaleString()}
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-tighter">
                        {payment.program_slug.replace("-", " ")}
                    </div>
                  </TableCell>

                  <TableCell className="text-center">
                    {payment.payment_status === "completed" ? (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase">
                        <CheckCircle2 className="h-3 w-3" /> Confirmed
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold uppercase">
                        <AlertCircle className="h-3 w-3" /> Pending
                      </div>
                    )}
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2 group-hover:text-entreva-green transition-colors">
                        <code className="text-[10px] bg-slate-50 px-2 py-1 rounded border font-mono">
                            {payment.paystack_reference || "NO-REF"}
                        </code>
                        {payment.paystack_reference && (
                            <a 
                                href={`https://dashboard.paystack.com/#/transactions/${payment.paystack_reference}`} 
                                target="_blank" 
                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <ExternalLink className="h-3 w-3" />
                            </a>
                        )}
                    </div>
                  </TableCell>

                  <TableCell className="text-xs text-slate-500 font-medium">
                    {new Date(payment.created_at).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })}
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