"use client"

import { useState, useEffect, Suspense } from "react" // Added Suspense
import { useSearchParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CreditCard, Phone, Loader2, Info } from "lucide-react"
import { toast } from "sonner"

// 1. Create a sub-component for the content that uses useSearchParams
function PaymentContent() {
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [program, setProgram] = useState("future-force")
  const price = 3500

  useEffect(() => {
    const emailParam = searchParams.get("email")
    const programParam = searchParams.get("program")
    if (emailParam) setEmail(emailParam)
    if (programParam) setProgram(programParam)
  }, [searchParams])

  const handlePaystackPayment = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          amount: price,
          program_slug: program,
        }),
      })

      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error(data.error || "Failed to initialize payment")
      }
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {/* Option 1: Paystack (Online) */}
      <Card className="border-t-4 border-t-entreva-green shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-2 text-entreva-green">
            <CreditCard className="h-5 w-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Recommended</span>
          </div>
          <CardTitle className="mt-2">Pay Online</CardTitle>
          <CardDescription>Instant confirmation via Mobile Money or Card</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg bg-slate-100 p-4 text-center">
            <span className="text-sm text-muted-foreground">Amount to Pay</span>
            <div className="text-3xl font-bold text-entreva-charcoal">GHS {price.toLocaleString()}</div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Confirmation Email</Label>
            <Input 
              id="email" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              placeholder="parent@example.com" 
            />
          </div>
          <Button 
            onClick={handlePaystackPayment}
            className="w-full bg-entreva-green text-entreva-charcoal hover:bg-entreva-green/90 h-12 font-bold"
            disabled={isLoading || !email}
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Pay Now with Paystack"}
          </Button>
        </CardContent>
      </Card>

      {/* Option 2: Manual MoMo */}
      <Card className="border-t-4 border-t-entreva-blue">
        <CardHeader>
          <div className="flex items-center gap-2 text-entreva-blue">
            <Phone className="h-5 w-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Manual Transfer</span>
          </div>
          <CardTitle className="mt-2">Direct MoMo</CardTitle>
          <CardDescription>For manual transfers</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-xl border border-dashed border-entreva-blue/30 bg-entreva-blue/5 p-6">
            <div className="space-y-4">
              <div>
                <label className="text-[10px] uppercase text-muted-foreground">Account Name</label>
                <p className="font-bold text-lg">Oakleaf</p>
              </div>
              <div>
                <label className="text-[10px] uppercase text-muted-foreground">Mobile Number</label>
                <p className="font-bold text-2xl tracking-tighter text-entreva-blue">024 000 0000</p>
              </div>
            </div>
          </div>
          <div className="flex gap-3 rounded-lg bg-blue-50 p-3 text-xs text-blue-700">
            <Info className="h-4 w-4 shrink-0" />
            <p>Use <strong>Student Name</strong> as reference. Send screenshot to info@entrevahub.org</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// 2. Main exported component that wraps the content in Suspense
export default function PaymentsPage() {
  return (
    <main className="min-h-screen bg-slate-50/50">
      <Navbar />
      <div className="mx-auto max-w-4xl px-6 pt-32 pb-24">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-entreva-charcoal">Complete Your Payment</h1>
          <p className="mt-2 text-muted-foreground">Secure your spot in the program</p>
        </div>

        {/* This Suspense boundary fixes the build error */}
        <Suspense fallback={
          <div className="flex flex-col items-center justify-center p-12">
            <Loader2 className="h-8 w-8 animate-spin text-entreva-green" />
            <p className="mt-4 text-muted-foreground">Loading payment details...</p>
          </div>
        }>
          <PaymentContent />
        </Suspense>
      </div>
      <Footer />
    </main>
  )
}