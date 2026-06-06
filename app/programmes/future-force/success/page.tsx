"use client"

import { Suspense, useRef } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { CheckCircle2, Download, Home, Phone, Mail, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"

function SuccessContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const reference = searchParams.get("reference") || "N/A"
  const receiptRef = useRef<HTMLDivElement>(null)

  const handleDownloadReceipt = async () => {
    if (!receiptRef.current) return

    const canvas = await html2canvas(receiptRef.current, { scale: 2 })
    const imgData = canvas.toDataURL("image/png")
    const pdf = new jsPDF("p", "mm", "a4")
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width
    
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight)
    pdf.save(`Entreva-Hub-Receipt-${reference}.pdf`)
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-24 text-center">
      {/* SUCCESS HEADER */}
      <div className="mb-8 flex justify-center">
        <div className="rounded-full bg-green-100 p-4 animate-bounce">
          <CheckCircle2 className="h-16 w-16 text-green-600" />
        </div>
      </div>
      
      <h1 className="text-4xl font-black text-entreva-charcoal tracking-tight">Transaction Successful!</h1>
      <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
        Thank you for your payment. Based on the name provided during registration, your records will be updated shortly.
      </p>

      {/* ACTION BUTTONS */}
      <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          onClick={handleDownloadReceipt} 
          className="bg-entreva-green text-entreva-charcoal hover:bg-entreva-green/90 font-bold h-14 px-8 text-lg rounded-xl shadow-lg"
        >
          <Download className="mr-2 h-6 w-6" />
          Download Receipt (PDF)
        </Button>
        <Button variant="outline" onClick={() => router.push("/")} className="h-14 px-8 text-lg rounded-xl border-2">
          <Home className="mr-2 h-5 w-5" />
          Back to Home
        </Button>
      </div>

      {/* ROADMAP / NEXT STEPS */}
      <div className="mt-20 text-left bg-white border-2 border-slate-100 rounded-3xl p-8 shadow-sm">
        <h3 className="font-black text-xl mb-6 text-entreva-charcoal flex items-center gap-2">
          <ArrowRight className="text-entreva-green" /> What Happens Next?
        </h3>
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-entreva-green font-bold text-entreva-charcoal text-sm">1</div>
            <p className="text-muted-foreground leading-relaxed">Our admissions team will verify your payment reference <strong>({reference})</strong> against your registration name.</p>
          </div>
          <div className="flex gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-entreva-green font-bold text-entreva-charcoal text-sm">2</div>
            <p className="text-muted-foreground leading-relaxed">A formal admission letter and program schedule will be sent to your email within 48 hours.</p>
          </div>
          <div className="flex gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-entreva-green font-bold text-entreva-charcoal text-sm">3</div>
            <p className="text-muted-foreground leading-relaxed">Prepare for the launch of the Future Force Program on <strong>July 2nd</strong>.</p>
          </div>
        </div>
      </div>

      {/* SUPPORT FOOTER */}
      <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground border-t pt-8">
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-entreva-green" />
          <span>info@entrevahub.org</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-entreva-green" />
          <span>+233 54 849 3880</span>
        </div>
      </div>

      {/* HIDDEN RECEIPT TEMPLATE (This is what the PDF uses) */}
      <div className="fixed top-[-2000px] left-[-2000px]">
        <div ref={receiptRef} className="w-[800px] p-16 bg-white text-black font-sans leading-normal">
          <div className="flex justify-between items-start border-b-4 border-entreva-green pb-10">
            <div>
              <img src="/entreva-hub-logo-2-2.png" alt="Entreva Hub" style={{ width: '220px' }} />
              <p className="mt-4 text-sm text-gray-500 font-bold uppercase tracking-widest">Innovation & Entrepreneurship Hub</p>
            </div>
            <div className="text-right">
              <h2 className="text-4xl font-black text-gray-900 mb-1">PAYMENT RECEIPT</h2>
              <p className="text-gray-500 font-medium italic">Admission Confirmation</p>
            </div>
          </div>

          <div className="py-16">
            <div className="grid grid-cols-2 gap-y-12">
              <div>
                <h4 className="text-xs font-black text-entreva-green uppercase mb-2">Payment Reference</h4>
                <p className="text-2xl font-bold">{reference}</p>
              </div>
              <div>
                <h4 className="text-xs font-black text-entreva-green uppercase mb-2">Program</h4>
                <p className="text-2xl font-bold">Future Force Program (FFP)</p>
              </div>
              <div>
                <h4 className="text-xs font-black text-entreva-green uppercase mb-2">Transaction Date</h4>
                <p className="text-xl font-bold">{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              </div>
              <div>
                <h4 className="text-xs font-black text-entreva-green uppercase mb-2">Status</h4>
                <p className="text-xl font-bold text-green-600">PAID / SUCCESSFUL</p>
              </div>
            </div>

            <div className="mt-16 p-8 bg-slate-50 rounded-2xl border-2 border-slate-100">
              <p className="text-sm text-gray-600 leading-relaxed italic text-center">
                "Thank you for choosing Entreva Hub. Your payment has been secured via Paystack. 
                Please keep this receipt for your orientation day at Community 25."
              </p>
            </div>
          </div>

          <div className="border-t pt-10 text-center">
            <p className="text-sm font-bold text-gray-800">ENTREVA HUB ADMISSIONS OFFICE</p>
            <p className="text-xs text-gray-500 mt-1">Community 25, Tema | +233 54 849 3880 | info@entrevahub.org</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-slate-50/30">
      <Navbar />
      <Suspense fallback={<div className="flex h-screen items-center justify-center font-bold">Processing Transaction...</div>}>
        <SuccessContent />
      </Suspense>
      <Footer />
    </main>
  )
}