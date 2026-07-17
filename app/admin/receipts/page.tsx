"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import {
  Download,
  RefreshCw,
  ImageIcon,
  FileText,
  Eye,
  EyeOff
} from "lucide-react"
import { toast } from "sonner"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import { cn } from "@/lib/utils"

export default function ReceiptGenerator() {
  const receiptRef = useRef<HTMLDivElement>(null)

  // FORM STATE
  const [brandName, setBrandName] = useState("Oakleaf Training & Consulting")
  const [studentName, setStudentName] = useState("")
  const [programName, setProgramName] = useState("Future Force Program (FFP)")
  const [totalAmount, setTotalAmount] = useState(3550)
  const [amountPaid, setAmountPaid] = useState(0)
  const [receiptDate, setDate] = useState(new Date().toISOString().split('T')[0])
  const [receiptNumber, setReceiptNumber] = useState("")
  
  // TOGGLES
  const [showStatus, setShowStatus] = useState(true)
  const [displayOutstanding, setDisplayOutstanding] = useState(true)

  // CALCULATED VALUES
  const outstanding = totalAmount - amountPaid
  const isFullyPaid = outstanding <= 0

  // MANUAL OVERRIDE HANDLER
  const handleOutstandingToggle = (checked: boolean) => {
    setDisplayOutstanding(checked)
    // If user turns OFF outstanding, automatically hide the stamp badge
    if (!checked) {
      setShowStatus(false)
    }
  }

  const generateID = () => {
    const now = new Date()
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '')
    const timeStr = now.getHours().toString().padStart(2, '0') + now.getMinutes().toString().padStart(2, '0')
    const rand = Math.random().toString(36).substring(2, 5).toUpperCase()
    setReceiptNumber(`OL-${dateStr}-${timeStr}-${rand}`)
  }

  const exportReceipt = async (format: 'pdf' | 'png') => {
    if (!receiptRef.current) return
    const toastId = toast.loading("Generating your receipt...")

    try {
      const canvas = await html2canvas(receiptRef.current, { 
        scale: 3, 
        useCORS: true,
        backgroundColor: "#ffffff"
      })
      const imgData = canvas.toDataURL("image/png")

      if (format === 'png') {
        const link = document.createElement('a')
        link.download = `Receipt-${studentName || 'Client'}.png`
        link.href = imgData
        link.click()
      } else {
        const pdf = new jsPDF("l", "mm", "a5") 
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = pdf.internal.pageSize.getHeight()
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight)
        pdf.save(`Receipt-${studentName || 'Client'}.pdf`)
      }
      toast.success("Receipt exported!", { id: toastId })
    } catch (err) {
      toast.error("Export failed", { id: toastId })
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-entreva-charcoal">Receipt Generator</h1>
        <p className="text-muted-foreground mt-1">SaaS Billing Tool for half-A4 official receipts.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* LEFT: SETTINGS FORM */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="shadow-sm">
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase text-slate-400">Brand Header</Label>
                <Input value={brandName} onChange={(e) => setBrandName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase text-slate-400">Student Name</Label>
                <Input placeholder="Enter name" value={studentName} onChange={(e) => setStudentName(e.target.value)} />
              </div>
              
              <div className="grid grid-cols-2 gap-4 border-y py-4 my-2">
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase text-slate-400">Total Fee</Label>
                  <Input type="number" value={totalAmount} onChange={(e) => setTotalAmount(Number(e.target.value))} />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase text-slate-400">Amount Paid</Label>
                  <Input type="number" value={amountPaid} onChange={(e) => setAmountPaid(Number(e.target.value))} />
                </div>
              </div>

              {/* OVERRIDE TOGGLES */}
              <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="flex items-center justify-between">
                    <Label htmlFor="out-toggle" className="text-sm font-medium cursor-pointer">Display Outstanding</Label>
                    <input 
                        type="checkbox" 
                        id="out-toggle"
                        className="h-4 w-4 rounded border-gray-300 text-entreva-green focus:ring-entreva-green"
                        checked={displayOutstanding} 
                        onChange={(e) => handleOutstandingToggle(e.target.checked)} 
                    />
                </div>
                <div className="flex items-center justify-between">
                    <Label htmlFor="status" className={cn("text-sm font-medium cursor-pointer", !displayOutstanding && "text-slate-300")}>Show Stamp Badge</Label>
                    <input 
                        type="checkbox" 
                        id="status" 
                        disabled={!displayOutstanding}
                        className="h-4 w-4 rounded border-gray-300 text-entreva-green focus:ring-entreva-green disabled:opacity-20"
                        checked={showStatus} 
                        onChange={(e) => setShowStatus(e.target.checked)} 
                    />
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <Label className="flex justify-between text-xs font-bold uppercase text-slate-400">
                  Receipt Number
                  <button onClick={generateID} className="text-[10px] text-entreva-green flex items-center gap-1 hover:underline">
                    <RefreshCw className="h-3 w-3" /> Auto-generate
                  </button>
                </Label>
                <Input placeholder="Leave blank for none" value={receiptNumber} onChange={(e) => setReceiptNumber(e.target.value)} />
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-3">
            <Button onClick={() => exportReceipt('pdf')} className="bg-entreva-charcoal h-12 rounded-xl font-bold hover:bg-black">
              <FileText className="mr-2 h-4 w-4" /> Export PDF
            </Button>
            <Button onClick={() => exportReceipt('png')} variant="outline" className="h-12 rounded-xl border-2 font-bold">
              <ImageIcon className="mr-2 h-4 w-4" /> Save PNG
            </Button>
          </div>
        </div>

        {/* RIGHT: PREVIEW (HALF A4 / A5) */}
        <div className="lg:col-span-8 flex flex-col items-center justify-center bg-slate-200 p-8 rounded-3xl overflow-x-auto">
          <p className="text-[10px] font-bold text-slate-400 uppercase mb-4 tracking-widest">Live Document Preview (A5 Landscape)</p>

          <div
            ref={receiptRef}
            className="relative w-[800px] h-[565px] bg-white shadow-2xl p-12 text-slate-800 overflow-hidden font-sans border border-slate-100"
            style={{ minWidth: '800px' }}
          >
            {/* WATERMARK */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.03] rotate-[-35deg]">
              <h1 className="text-[120px] font-black uppercase whitespace-nowrap">{brandName.split(' ')[0]}</h1>
            </div>

            {/* HEADER */}
            <div className="flex justify-between items-start border-b-2 border-slate-100 pb-8 relative z-10">
              <div className="flex gap-6 items-center">
                <div className="h-20 w-20 relative bg-slate-50 rounded-xl p-2 flex items-center justify-center border border-slate-100 shadow-sm">
                    <img src="/entreva-hub-logo-2-2.png" alt="Logo" className="object-contain w-full h-full" />
                </div>
                <div>
                  <h2 className="text-2xl font-black tracking-tighter text-entreva-charcoal uppercase leading-none">{brandName}</h2>
                  <p className="text-xs font-bold text-entreva-green tracking-widest uppercase mt-2">Official Payment Receipt</p>
                </div>
              </div>
              <div className="text-right">
                {receiptNumber && (
                  <div className="mb-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Receipt No.</p>
                    <p className="font-mono text-sm font-bold bg-slate-50 px-2 py-0.5 rounded">{receiptNumber}</p>
                  </div>
                )}
                <p className="text-[10px] font-bold text-slate-400 uppercase">Date Issued</p>
                <p className="text-sm font-bold">{new Date(receiptDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              </div>
            </div>

            {/* CONTENT */}
            <div className="py-12 grid grid-cols-2 gap-12 relative z-10">
              <div className="space-y-8">
                <div>
                  <Label className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Received From</Label>
                  <p className="text-2xl font-bold border-b-2 border-slate-50 pb-2 truncate">{studentName || "____________________"}</p>
                </div>
                <div>
                  <Label className="text-[10px] uppercase font-black text-slate-400 tracking-widest">For Program</Label>
                  <p className="text-lg font-bold text-slate-600">{programName}</p>
                </div>
              </div>

              <div className="bg-slate-50 rounded-3xl p-8 space-y-4 border border-slate-100 shadow-inner relative overflow-hidden">
                <div className="flex justify-between items-center text-slate-500">
                  <span className="text-xs font-bold uppercase tracking-tighter">Total Program Fee</span>
                  <span className="font-bold">GHS {totalAmount.toLocaleString()}</span>
                </div>
                <div className={cn(
                    "flex justify-between items-center", 
                    displayOutstanding ? "border-b border-slate-200 pb-4" : "pb-0"
                )}>
                  <span className="text-xs font-bold uppercase text-slate-500 tracking-tighter">Amount Paid</span>
                  <span className="text-3xl font-black text-entreva-green">GHS {amountPaid.toLocaleString()}</span>
                </div>
                
                {/* CONDITIONAL OUTSTANDING ROW OR "FULLY PAID" TEXT */}
                {displayOutstanding ? (
                    <div className="flex justify-between items-center pt-2">
                        <span className="text-xs font-bold uppercase text-slate-400 tracking-tighter">Outstanding Balance</span>
                        <span className={cn("text-lg font-black", outstanding > 0 ? "text-red-500" : "text-emerald-600")}>
                            GHS {outstanding.toLocaleString()}
                        </span>
                    </div>
                ) : (
                    <div className="pt-4 mt-2 border-t border-dashed border-slate-300 text-center">
                        <p className="text-sm font-black text-entreva-charcoal tracking-[0.3em] uppercase">
                           STATUS: FULLY PAID
                        </p>
                    </div>
                )}
              </div>
            </div>

            {/* FOOTER AREA */}
            <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end border-t border-slate-100 pt-8 relative z-10">
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
                <p>Entreva Hub Admissions Office</p>
                <p>Community 25, Tema | +233 54 849 3880 | info@entrevahub.org</p>
              </div>

              {showStatus && (
                <div className={cn(
                  "px-6 py-2 rounded-xl border-4 font-black text-sm uppercase tracking-[0.2em] rotate-[-4deg] shadow-sm transition-all animate-in fade-in zoom-in",
                  isFullyPaid ? "border-emerald-500 text-emerald-500" : "border-amber-500 text-amber-500"
                )}>
                  {isFullyPaid ? "Fully Paid" : "Partial Payment"}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}