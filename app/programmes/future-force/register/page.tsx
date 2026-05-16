"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { ArrowLeft, Loader2, Send } from "lucide-react"
import emailjs from "@emailjs/browser"

import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
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
import { toast } from "sonner"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const formSchema = z.object({
  student_full_name: z.string().min(2, "Enter student's full name"),
  student_dob: z.string().min(1, "Date of birth is required"),
  education_level: z.enum(["JHS Graduate", "SHS Student", "SHS Graduate"]),
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

export default function FutureForceRegister() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      student_full_name: "",
      student_dob: "",
      education_level: "JHS Graduate",
      school_name: "",
      student_email: "",
      parent_full_name: "",
      parent_relationship: "", // FIXED: Added to stop uncontrolled warning
      parent_phone: "",
      parent_email: "",
      consent: false,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      // 1. Save to Supabase
      const { error: dbError } = await supabase
        .from("future_force_registrations")
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
          },
        ])

      if (dbError) {
        console.error("Supabase Error:", dbError)
        throw new Error(dbError.message)
      }

      // 2. Trigger EmailJS Notifications
      const emailParams = {
        parent_name: values.parent_full_name,
        student_name: values.student_full_name,
        parent_email: values.parent_email,
        admin_email: "info@entrevahub.org",
        program_name: "Future Force",
      }

      // Using your actual template ID from .env
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!

      await emailjs.send(serviceId, templateId, emailParams, publicKey)

      toast.success("Registration successful!")

      // 3. Redirect to Payments Page
      router.push(`/payments?program=future-force&email=${values.parent_email}`)

    } catch (error: any) {
      // This will show you the actual message (like "Invalid Template ID")
      console.error("Submission Error Details:", error);
      if (error.text) {
        console.error("EmailJS Error Text:", error.text);
      }
      toast.error(error.text || "Something went wrong. Please try again.");
    }
  }

  return (
    <main className="min-h-screen bg-slate-50/50">
      <Navbar />
      <div className="mx-auto max-w-3xl px-6 pt-32 pb-24">
        <Link href="/programmes/future-force" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-entreva-green">
          <ArrowLeft className="h-4 w-4" /> Back to Program Details
        </Link>

        <div className="rounded-2xl border bg-white p-8 shadow-sm">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-entreva-charcoal">Future Force Registration</h1>
            <p className="text-muted-foreground">Complete the form below to register. You will be redirected to payment after submission.</p>
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
                          <SelectItem value="JHS Graduate">JHS Graduate</SelectItem>
                          <SelectItem value="SHS Student">SHS Student</SelectItem>
                          <SelectItem value="SHS Graduate">SHS Graduate</SelectItem>
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
                    <FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input placeholder="024 XXX XXXX" {...field} /></FormControl><FormMessage /></FormItem>
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
                    <p className="text-sm text-muted-foreground">I permit the student to participate in the Future Force program.</p>
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
      <Footer />
    </main>
  )
}