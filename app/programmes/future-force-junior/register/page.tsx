"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { ArrowLeft, Loader2, Send } from "lucide-react"

import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const formSchema = z.object({
  student_full_name: z.string().min(2, "Enter student's full name"),
  student_dob: z.string().min(1, "Date of birth is required"),
  education_level: z.enum(["Basic School", "Junior High School"]),
  school_name: z.string().min(2, "Enter the name of the school"),
  student_email: z.string().email().optional().or(z.literal("")),
  parent_full_name: z.string().min(2, "Enter parent/guardian's full name"),
  parent_relationship: z.string().min(2, "e.g. Father, Mother, Aunt"),
  parent_phone: z.string().min(10, "Enter a valid phone number"),
  parent_email: z.string().email("Enter a valid email address"),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms to continue",
  }),
})

export default function FutureForceJuniorRegister() {
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      student_full_name: "",
      student_dob: "",
      education_level: "Basic School",
      school_name: "",
      student_email: "",
      parent_full_name: "",
      parent_relationship: "",
      parent_phone: "",
      parent_email: "",
      consent: false,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      const { error: dbError } = await supabase
        .from("registrations")
        .insert([
          {
            student_full_name: values.student_full_name,
            student_dob: values.student_dob,
            education_level: values.education_level,
            school_name: values.school_name,
            student_email: values.student_email || null,
            parent_full_name: values.parent_full_name,
            parent_relationship: values.parent_relationship,
            parent_phone: values.parent_phone,
            parent_email: values.parent_email,
            parental_consent: values.consent,
            payment_status: "pending",
            status: "new",
            program: "future-force-junior",
          },
        ])

      if (dbError) {
        console.error("Supabase Error:", dbError)
        throw new Error(dbError.message)
      }

      setShowSuccess(true)
    } catch (error: any) {
      console.error("Submission Error Details:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-slate-50/50">
      <Navbar />
      <div className="mx-auto max-w-3xl px-6 pt-32 pb-24">
        <Link href="/programmes/future-force-junior" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-entreva-green">
          <ArrowLeft className="h-4 w-4" /> Back to Program Details
        </Link>

        <div className="rounded-2xl border bg-white p-8 shadow-sm">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-entreva-charcoal">Future Force Program - Junior (FFP-j) Registration</h1>
            <p className="text-muted-foreground">Complete the form below to register.</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-entreva-green">Student Information</h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField control={form.control} name="student_full_name" render={({ field }) => (
                    <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="student_dob" render={({ field }) => (
                    <FormItem><FormLabel>Date of Birth</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField control={form.control} name="education_level" render={({ field }) => (
                    <FormItem><FormLabel>Education Level</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select level" /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="Basic School">Basic School</SelectItem>
                          <SelectItem value="Junior High School">Junior High School</SelectItem>
                        </SelectContent>
                      </Select><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="school_name" render={({ field }) => (
                    <FormItem><FormLabel>Current/Last School</FormLabel><FormControl><Input placeholder="e.g. Achimota School" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
              </div>

              <div className="h-px bg-slate-100" />

              <div className="space-y-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-entreva-green">Parent / Guardian Information</h2>
                <FormField control={form.control} name="parent_full_name" render={({ field }) => (
                  <FormItem><FormLabel>Parent Full Name</FormLabel><FormControl><Input placeholder="Jane Doe" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField control={form.control} name="parent_relationship" render={({ field }) => (
                    <FormItem><FormLabel>Relationship to Student</FormLabel><FormControl><Input placeholder="e.g. Mother, Father, Guardian" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="parent_phone" render={({ field }) => (
                    <FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input placeholder="024 XXX XXXX" type="tel" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="parent_email" render={({ field }) => (
                    <FormItem><FormLabel>Email Address</FormLabel><FormControl><Input placeholder="parent@example.com" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
              </div>

              <div className="h-px bg-slate-100" />

              <FormField control={form.control} name="consent" render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-slate-50">
                  <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Parental Consent</FormLabel>
                    <p className="text-sm text-muted-foreground">I permit the student to participate in the Future Force Program - Junior.</p>
                    <FormMessage />
                  </div>
                </FormItem>
              )} />

              <Button type="submit" className="w-full bg-entreva-green text-entreva-charcoal hover:bg-entreva-green/90 h-12 text-lg font-bold" disabled={isLoading}>
                {isLoading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processing...</> : <><Send className="mr-2 h-5 w-5" /> Complete Registration</>}
              </Button>
            </form>
          </Form>
        </div>
      </div>

      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-entreva-green">Registration Submitted</DialogTitle>
            <DialogDescription className="text-base">
              Your form has been submitted successfully. We have received your details and will get in touch with you shortly.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              className="bg-entreva-green text-entreva-charcoal hover:bg-entreva-green/90 font-bold"
              onClick={() => router.push("/")}
            >
              Back to Home
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </main>
  )
}
