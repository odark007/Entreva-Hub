"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CreditCard, Phone, Loader2, Info, User } from "lucide-react"
import { toast } from "sonner"

function PaymentContent() {
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)

  // Form States
  const [email, setEmail] = useState("")
  const [fullName, setFullName] = useState("")
  const [amount, setAmount] = useState("0") // Default to full price
  const [program, setProgram] = useState("future-force")

  useEffect(() => {
    const emailParam = searchParams.get("email")
    const programParam = searchParams.get("program")
    if (emailParam) setEmail(emailParam)
    if (programParam) setProgram(programParam)
  }, [searchParams])

  const handlePaystackPayment = async () => {
    if (!email || !amount || parseFloat(amount) <= 0) {
      toast.error("Please provide a valid email and amount");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/paystack-init.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          full_name: fullName,
          amount: parseFloat(amount),
          program_slug: program,
        }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || "Failed to initialize payment");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <Card className="border-t-4 border-t-entreva-green shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-2 text-entreva-green font-bold uppercase tracking-wider text-xs">
            <CreditCard className="h-4 w-4" /> Recommended
          </div>
          <CardTitle className="mt-2 text-2xl">Pay Online</CardTitle>
          <CardDescription>Instant confirmation via MoMo or Card</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label>Full Name (Optional)</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input className="pl-10" placeholder="John Doe" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Confirmation Email</Label>
            <Input type="email" placeholder="parent@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="rounded-xl bg-slate-100 p-4 border border-slate-200">
            <Label className="text-center block mb-2 text-xs font-bold text-slate-500">AMOUNT TO PAY (GHS)</Label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">GHS</span>
              <Input
                type="number"
                className="pl-14 text-2xl font-black h-14 text-center border-none bg-transparent focus-visible:ring-0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>

          <Button
            onClick={handlePaystackPayment}
            className="w-full bg-entreva-green text-entreva-charcoal hover:bg-entreva-green/90 h-14 text-lg font-bold"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : `Pay GHS ${parseFloat(amount || "0").toLocaleString()} Now`}
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

export default function PaymentsPage() {
  return (
    <main className="min-h-screen bg-slate-50/50">
      <Navbar />
      <div className="mx-auto max-w-4xl px-6 pt-32 pb-24">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-entreva-charcoal">Complete Your Payment</h1>
          <p className="mt-2 text-muted-foreground">Secure your spot in the Future Force Program</p>
        </div>
        <Suspense fallback={<div className="flex justify-center p-12"><Loader2 className="animate-spin" /></div>}>
          <PaymentContent />
        </Suspense>
      </div>
      <Footer />
    </main>
  )
}