"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { ArrowLeft, CheckCircle2, Loader2, Send } from "lucide-react"
import { toast } from "sonner"

import { supabase } from "@/lib/supabase"
import { trackEvent } from "@/lib/analytics"
import { Button } from "@/components/ui/button"
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const GHANA_REGIONS = [
  "Ashanti",
  "Bono",
  "Bono East",
  "Ahafo",
  "Central",
  "Eastern",
  "Greater Accra",
  "North East",
  "Northern",
  "Oti",
  "Savannah",
  "Upper East",
  "Upper West",
  "Volta",
  "Western",
  "Western North",
]

const DISABILITY_TYPES = [
  "Albinism",
  "Epilepsy",
  "Hearing Impairment",
  "Intellectual Disability",
  "Little person",
  "Mental Disability",
  "Physical Impairment",
  "Speech Impairment",
  "Visual Impairment",
]

const FORM_DRAFT_KEY = "activate_participate_draft_v1"

const PHONE_REGEX = /^\d{10}$/

function computeAge(dob: string): number | null {
  if (!dob) return null
  const [year, month, day] = dob.split("-").map(Number)
  if (!year || !month || !day) return null
  const today = new Date()
  let age = today.getFullYear() - year
  const monthToday = today.getMonth() + 1
  if (monthToday < month || (monthToday === month && today.getDate() < day)) age--
  return age
}

const formSchema = z
  .object({
    first_name: z.string().min(2, "First name is required"),
    surname: z.string().min(2, "Surname is required"),
    email: z.string().email("Enter a valid email address").optional().or(z.literal("")),
    dob: z
      .string()
      .min(1, "Date of birth is required")
      .refine((val) => {
        const year = Number(val.slice(0, 4))
        return !isNaN(year) && year >= 1990 && year <= 2010
      }, "You must be between 15 and 35 years old (born between 1990 and 2010)"),
    sex: z.string().optional(),
    contact_1: z.string().regex(PHONE_REGEX, "Enter a valid 10-digit phone number"),
    contact_2: z
      .string()
      .regex(PHONE_REGEX, "Enter a valid 10-digit phone number")
      .optional()
      .or(z.literal("")),
    guardian_name: z.string().optional(),
    guardian_contact: z
      .string()
      .regex(PHONE_REGEX, "Enter a valid 10-digit phone number")
      .optional()
      .or(z.literal("")),
    community: z.string().optional(),
    region: z.string().optional(),
    employment_status: z.string().optional(),
    marital_status: z.string().optional(),
    education: z.string().optional(),
    can_attend_full_duration: z.enum(["Yes", "No"], {
      required_error: "This field is required",
    }),
    is_pwd: z.enum(["Yes", "No"], {
      required_error: "This field is required",
    }),
    disability_types: z.array(z.string()).default([]),
    hear_about: z.string().optional(),
    has_ghana_card: z.string().optional(),
    is_refugee: z.string().optional(),
    is_idp: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const age = computeAge(data.dob)
    if (age !== null && age < 18) {
      if (!data.guardian_name?.trim()) {
        ctx.addIssue({
          path: ["guardian_name"],
          message: "Required if you are under 18",
        })
      }
      if (!data.guardian_contact?.trim()) {
        ctx.addIssue({
          path: ["guardian_contact"],
          message: "Required if you are under 18",
        })
      }
    }
    if (data.is_pwd === "Yes" && data.disability_types.length === 0) {
      ctx.addIssue({
        path: ["disability_types"],
        message: "Please select at least one type of disability",
      })
    }
  })

type FormValues = z.infer<typeof formSchema>

const defaultValues: FormValues = {
  first_name: "",
  surname: "",
  email: "",
  dob: "",
  sex: "",
  contact_1: "",
  contact_2: "",
  guardian_name: "",
  guardian_contact: "",
  community: "",
  region: "",
  employment_status: "",
  marital_status: "",
  education: "",
  can_attend_full_duration: "Yes",
  is_pwd: "No",
  disability_types: [],
  hear_about: "",
  has_ghana_card: "",
  is_refugee: "",
  is_idp: "",
}

function isObj(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null
}

function SuccessDialog({
  onDismiss,
  onRedirect,
}: {
  onDismiss: () => void
  onRedirect: () => void
}) {
  const [countdown, setCountdown] = useState(4)
  const router = useRouter()

  useEffect(() => {
    if (countdown <= 0) {
      onRedirect()
      return
    }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000)
    return () => clearTimeout(t)
  }, [countdown, onRedirect])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl">
        <CheckCircle2 className="mx-auto h-16 w-16 text-green-600" />
        <h2 className="mt-4 text-2xl font-bold text-entreva-charcoal">
          Application Submitted!
        </h2>
        <p className="mt-3 text-muted-foreground leading-relaxed">
          Thank you for applying to the ACTIVATE program. Entreva Hub will get
          back to you shortly with the next steps in the selection process.
        </p>
        <Button
          onClick={onDismiss}
          className="mt-6 w-full h-12 bg-entreva-green text-entreva-charcoal font-bold hover:bg-entreva-green/90"
        >
          Return to Home
        </Button>
        <p className="mt-3 text-xs text-muted-foreground">
          Redirecting to the homepage in {countdown}s...
        </p>
      </div>
    </div>
  )
}

export default function ActivateParticipatePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [draftRestored, setDraftRestored] = useState(false)
  const router = useRouter()

  const initialValues = useMemo<FormValues>(() => {
    if (typeof window === "undefined") return defaultValues
    try {
      const raw = window.localStorage.getItem(FORM_DRAFT_KEY)
      if (!raw) return defaultValues
      const parsed = JSON.parse(raw)
      return isObj(parsed) ? { ...defaultValues, ...parsed } : defaultValues
    } catch {
      return defaultValues
    }
  }, [])

  useEffect(() => {
    let restored = false
    try {
      const raw = window.localStorage.getItem(FORM_DRAFT_KEY)
      if (raw) restored = isObj(JSON.parse(raw))
    } catch {
      // ignore invalid stored draft
    }
    setDraftRestored(restored)
  }, [])

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  })

  const isPwd = form.watch("is_pwd") === "Yes"
  const dob = form.watch("dob")
  const age = computeAge(dob)
  const isUnder18 = age !== null && age < 18

  useEffect(() => {
    const subscription = form.watch((value) => {
      if (!value) return
      try {
        window.localStorage.setItem(FORM_DRAFT_KEY, JSON.stringify(value))
      } catch {
        // ignore quota / privacy mode errors
      }
    })
    return () => subscription.unsubscribe()
  }, [form])

  async function onSubmit(values: FormValues) {
    setIsLoading(true)
    try {
      const age = computeAge(values.dob)
      const { error } = await supabase.from("registrations").insert([
        {
          program: "activate",
          status: "new",
          payment_status: "pending",
          student_full_name: `${values.first_name} ${values.surname}`.trim(),
          student_dob: values.dob,
          student_email: values.email || null,
          education_level: values.education || null,
          first_name: values.first_name,
          surname: values.surname,
          sex: values.sex || null,
          contact_1: values.contact_1,
          contact_2: values.contact_2 || null,
          guardian_name: values.guardian_name || null,
          guardian_contact: values.guardian_contact || null,
          community: values.community || null,
          region: values.region || null,
          employment_status: values.employment_status || null,
          marital_status: values.marital_status || null,
          can_attend_full_duration: values.can_attend_full_duration,
          is_pwd: values.is_pwd,
          disability_types:
            values.is_pwd === "Yes" && values.disability_types.length > 0
              ? values.disability_types
              : [],
          hear_about: values.hear_about || null,
          has_ghana_card: values.has_ghana_card || null,
          is_refugee: values.is_refugee || null,
          is_idp: values.is_idp || null,
        },
      ])

      if (error) {
        console.error("Supabase Error:", error)
        throw new Error(error.message)
      }

      trackEvent("activate_application_submitted", {
        program: "activate",
        applicant_name: `${values.first_name} ${values.surname}`,
        region: values.region || "unknown",
        age_group: age !== null && age < 18 ? "under_18" : "18_to_35",
      })

      try {
        window.localStorage.removeItem(FORM_DRAFT_KEY)
      } catch {
        // ignore
      }

      toast.success("Application submitted successfully!")
      setShowSuccess(true)
    } catch (err: any) {
      console.error("Submission Error Details:", err)
      toast.error(err.message || "Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-slate-50/50">
      <Navbar />

      {/* Header */}
      <section className="bg-entreva-charcoal text-background">
        <div className="mx-auto max-w-3xl px-6 pt-32 pb-12 lg:px-8">
          <Link
            href="/programmes/activate-by-entreva-hub"
            className="mb-6 inline-flex items-center gap-2 text-sm text-background/70 hover:text-entreva-green"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Program Details
          </Link>
          <h1 className="text-4xl font-black tracking-tight text-background">
            ACTIVATE{" "}
            <span className="text-entreva-green">
              as implemented by Entreva Hub
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-background/70 leading-relaxed">
            A Mastercard Foundation project strengthening Ghana&apos;s
            Agriculture TVET system through industry-led skills training and
            youth empowerment.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 py-12 lg:px-8">
        {/* Body note */}
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            Are you a young person looking to build practical skills and start
            a successful career or business?
          </p>
          <p>
            Are you ready to gain industry-relevant skills, hands-on training,
            and opportunities for employment or entrepreneurship? The ACTIVATE
            Project is now accepting applications from interested learners
            across the 16 regions of Ghana.
          </p>
          <p>
            If you are interested in joining the programme, we encourage you to
            complete the application form. Eligible applicants will be
            contacted with the next steps in the selection process.
          </p>
          <p>
            We look forward to supporting you on your journey to building
            valuable skills, creating opportunities, and achieving your career
            and business goals.
          </p>
          <p className="pt-2 font-semibold text-entreva-charcoal">
            Fill in with your details to register.
          </p>
        </div>

        {draftRestored && (
          <div className="mt-6 rounded-lg border border-entreva-green/30 bg-entreva-green/10 px-4 py-3 text-sm text-entreva-charcoal">
            A saved draft from your previous visit was restored. You can review
            your details before submitting.
          </div>
        )}

        {/* Form */}
        <div className="mt-8 rounded-2xl border bg-white p-6 shadow-sm md:p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
              {/* About You */}
              <section className="space-y-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-entreva-green">
                  About You
                </h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="first_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          First Name <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Ama" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="surname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Surname <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Mensah" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="you@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dob"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Date of Birth (DD/MM/YY)
                          <span className="text-red-500"> *</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            min="1990-01-01"
                            max="2010-12-31"
                            {...field}
                          />
                        </FormControl>
                        <p className="text-xs text-muted-foreground">
                          Only applicants born between 1990 and 2010 (ages
                          15&ndash;35) are eligible.
                        </p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="sex"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sex</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value || undefined}
                          className="flex flex-wrap gap-6"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Male" id="sex-male" />
                            <Label htmlFor="sex-male">Male</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Female" id="sex-female" />
                            <Label htmlFor="sex-female">Female</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="contact_1"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Personal Contact 1 (10 digits)
                          <span className="text-red-500"> *</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="024 XXX XXXX"
                            inputMode="numeric"
                            maxLength={10}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contact_2"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Personal Contact 2 (10 digits)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="024 XXX XXXX"
                            inputMode="numeric"
                            maxLength={10}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </section>

              <div className="h-px bg-slate-100" />

              {/* Guardian */}
              <section className="space-y-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-entreva-green">
                  Guardian Information
                </h2>
                {isUnder18 ? (
                  <p className="rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-700">
                    Since you are {age} years old, guardian details are
                    required.
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Only required if you are under 18.
                  </p>
                )}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="guardian_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Guardian Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Kwame Mensah" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="guardian_contact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Guardian Contact</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="024 XXX XXXX"
                            inputMode="numeric"
                            maxLength={10}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </section>

              <div className="h-px bg-slate-100" />

              {/* Community & Status */}
              <section className="space-y-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-entreva-green">
                  Community &amp; Status
                </h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="community"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Community (where you live currently)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Tema Community 25" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="region"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Region where you reside or live</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value || undefined}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your region" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {GHANA_REGIONS.map((region) => (
                              <SelectItem key={region} value={region}>
                                {region}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="employment_status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What is your current employment status?</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value || undefined}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select employment status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Employed">Employed</SelectItem>
                          <SelectItem value="Self-Employed">
                            Self-Employed
                          </SelectItem>
                          <SelectItem value="Not Employed">Not Employed</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </section>

              <div className="h-px bg-slate-100" />

              {/* Marital Status & Education */}
              <section className="space-y-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-entreva-green">
                  Marital Status &amp; Level of Education
                </h2>
                <FormField
                  control={form.control}
                  name="marital_status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What is your marital status?</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value || undefined}
                          className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3"
                        >
                          {[
                            "Single",
                            "Married",
                            "Divorced",
                            "Widowed",
                            "Separated",
                          ].map((opt) => (
                            <div
                              key={opt}
                              className="flex items-center space-x-2"
                            >
                              <RadioGroupItem
                                value={opt}
                                id={`marital-${opt}`}
                              />
                              <Label htmlFor={`marital-${opt}`}>{opt}</Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="education"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Highest Level of Education</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value || undefined}
                          className="grid grid-cols-1 gap-2 sm:grid-cols-2"
                        >
                          {[
                            "Primary",
                            "Secondary",
                            "Tertiary",
                            "Post Graduate",
                            "None of the above",
                          ].map((opt) => (
                            <div
                              key={opt}
                              className="flex items-center space-x-2"
                            >
                              <RadioGroupItem
                                value={opt}
                                id={`education-${opt}`}
                              />
                              <Label htmlFor={`education-${opt}`}>{opt}</Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </section>

              <div className="h-px bg-slate-100" />

              {/* Others */}
              <section className="space-y-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-entreva-green">
                  Others
                </h2>
                <FormField
                  control={form.control}
                  name="can_attend_full_duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Would you be able to attend the entire duration of the
                        course (1 month)?
                        <span className="text-red-500"> *</span>
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex gap-6"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="Yes"
                              id="attend-yes"
                            />
                            <Label htmlFor="attend-yes">Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="No"
                              id="attend-no"
                            />
                            <Label htmlFor="attend-no">No</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="is_pwd"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Are you a person with disability?
                        <span className="text-red-500"> *</span>
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex gap-6"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Yes" id="pwd-yes" />
                            <Label htmlFor="pwd-yes">Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="No" id="pwd-no" />
                            <Label htmlFor="pwd-no">No</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {isPwd && (
                  <FormField
                    control={form.control}
                    name="disability_types"
                    render={({ field }) => (
                      <FormItem className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                        <FormLabel>Type of Disability</FormLabel>
                        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                          {DISABILITY_TYPES.map((item) => (
                            <div
                              key={item}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={`disability-${item}`}
                                checked={field.value.includes(item)}
                                onCheckedChange={(checked) => {
                                  const next = checked
                                    ? [...field.value, item]
                                    : field.value.filter((v) => v !== item)
                                  field.onChange(next)
                                }}
                              />
                              <Label
                                htmlFor={`disability-${item}`}
                                className="text-sm font-normal"
                              >
                                {item}
                              </Label>
                            </div>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </section>

              <div className="h-px bg-slate-100" />

              {/* Programme Information */}
              <section className="space-y-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-entreva-green">
                  Programme Information
                </h2>
                <FormField
                  control={form.control}
                  name="hear_about"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>How did you hear about this training?</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Social media, radio, friend"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <FormField
                    control={form.control}
                    name="has_ghana_card"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Do you have a Ghana Card?</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value || undefined}
                            className="flex gap-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="Yes" id="ghana-yes" />
                              <Label htmlFor="ghana-yes">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="No" id="ghana-no" />
                              <Label htmlFor="ghana-no">No</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="is_refugee"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Are you a refugee?</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value || undefined}
                            className="flex gap-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="Yes" id="refugee-yes" />
                              <Label htmlFor="refugee-yes">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="No" id="refugee-no" />
                              <Label htmlFor="refugee-no">No</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="is_idp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Are you an internally displaced person (IDP)?</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value || undefined}
                            className="flex gap-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="Yes" id="idp-yes" />
                              <Label htmlFor="idp-yes">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="No" id="idp-no" />
                              <Label htmlFor="idp-no">No</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </section>

              <Button
                type="submit"
                className="w-full h-12 text-lg font-bold bg-entreva-green text-entreva-charcoal hover:bg-entreva-green/90"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" /> Submit Application
                  </>
                )}
              </Button>
              <p className="mt-2 text-center text-xs text-muted-foreground">
                Your progress is saved automatically on this device. You can
                close this page and continue later.
              </p>
            </form>
          </Form>
        </div>
      </div>

      {showSuccess && (
        <SuccessDialog
          onRedirect={() => router.push("/")}
          onDismiss={() => router.push("/")}
        />
      )}

      <Footer />
    </main>
  )
}