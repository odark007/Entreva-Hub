// lib/programmes-data.ts

// Updated to allow the specific date string as requested
export type ProgrammeStatus = "Open" | "Closed" | "Coming Soon" | string

export interface Programme {
  slug: string
  title: string
  partner: string
  status: ProgrammeStatus
  image: string
  shortDescription: string
  overview: string
  about: string
  qualifications: {
    title: string
    items: string[]
  }[]
  benefits: string[]
  regions: string[]
  keyDates: { label: string; date: string }[]
  applyUrl?: string
  category: "enterprise" | "agribusiness" | "tech" | "skills"
}

export const programmes: Programme[] = [
  {
    slug: "agristarter-sme-support",
    title: "AgriStarter Programme",
    partner: "Entreva Hub",
    status: "Coming Soon",
    image: "/images/programme-mtn.jpg",
    shortDescription:
      "Unlock the full potential of your SME with world-class business training, mentorship, and funding of up to GHS 20,000.",
    overview:
      "unlock your potential and improve your livelihood by training, mentoring, coaching and funding of GHS 20,000 to launch your agribusiness idea.",
    about:
      "Over a 5-year span, the program aims to support over 500 Micro, Small, and Medium Enterprises (MSMEs) across Ghana. Participants will benefit from tailored business development services and gain access to credit facilities, with each business eligible for at least GHS 10,000.",
    qualifications: [
      {
        title: "Youth-Led Businesses",
        items: [
          "Young adults below 35 years with early-stage startups",
          "Clear impact area",
          "High potential to scale",
          "A proven and growing market size",
          "Ability to generate revenue and service a debt facility",
          "Gone beyond proof with early customers and revenue",
        ],
      },
      {
        title: "Women-Led Businesses",
        items: [
          "No age limit for this category",
          "Female entrepreneurs in urban and rural areas",
          "Engaged in activities along the agribusiness value chain, commerce, and more",
        ],
      },
      {
        title: "PWD Businesses",
        items: [
          "No age limit for this category",
          "Business leaders with all forms of disabilities",
        ],
      },
    ],
    benefits: [
      "World-class training and business development support",
      "Access to experienced business coaches and mentors",
      "Funding opportunities",
      "Access to market (Exhibitions and tradeshows)",
    ],
    regions: ["Northern Region", "Upper East", "Savannah Region"],
    keyDates: [
      { label: "Application Opens", date: "28th March, 2025" },
      { label: "Application Deadline", date: "30th April, 2025" },
      { label: "Shortlisting Notice", date: "19th May - 23rd May" },
      { label: "Pitch Event", date: "May - July 2025" },
      { label: "Bootcamp", date: "August 2025" },
      { label: "Fund Disbursement", date: "TBD" },
    ],
    applyUrl: "https://www.innohub.com.gh/mtn-sme",
    category: "enterprise",
  },
  {
    slug: "agribusiness-accelerator",
    title: "Agribusiness Accelerator",
    partner: "Entreva Hub",
    status: "Coming Soon",
    image: "/images/programme-agribusiness.jpg",
    shortDescription:
      "Supporting entrepreneurs in agriculture and agribusiness value chains to scale operations and create employment.",
    overview:
      "The Agribusiness Accelerator is designed to support entrepreneurs working within agriculture and agribusiness value chains across Ghana.",
    about:
      "This programme provides comprehensive support including training, mentorship, and market access to agribusiness entrepreneurs looking to scale their operations and create meaningful employment in their communities.",
    qualifications: [
      {
        title: "Eligible Entrepreneurs",
        items: [
          "Agribusiness entrepreneurs at any stage",
          "Farmers, processors, and distributors",
          "Businesses in the food value chain",
        ],
      },
    ],
    benefits: [
      "Specialized agribusiness training",
      "Market linkage and access support",
      "Mentorship from industry experts",
      "Networking with partners and investors",
    ],
    regions: ["All Regions of Ghana"],
    keyDates: [
      { label: "Programme Launch", date: "Coming Soon" },
    ],
    category: "agribusiness",
  },
  {
    slug: "future-force",
    title: "Future Force",
    partner: "Entreva Hub",
    status: "Monday, 18th May to Friday 1st July",
    image: "/images/programme-tech.jpg",
    shortDescription: "A 6-week intensive bridging program for JHS and SHS students to master digital skills and entrepreneurial thinking.",
    overview: "Future Force is designed to transform the long vacation into a period of high-impact learning. We move beyond classroom theory to give students hands-on experience with the tools that define the modern workforce.",
    about: "The curriculum is divided into four core pillars: Digital Foundations (coding and office productivity), Creative Problem Solving, Financial Literacy, and Leadership. Students work in teams to solve real-world community challenges, culminating in a Demo Day for parents and mentors.",
    qualifications: [
      {
        title: "Who Can Apply?",
        items: [
          "JHS Graduates awaiting BECE results",
          "SHS Students on vacation",
          "SHS Graduates awaiting University admission",
        ],
      },
      {
        title: "What You Need",
        items: [
          "A curious mind and willingness to learn",
          "Parental/Guardian consent for participation",
          "A laptop (highly recommended, but limited hub PCs available)",
        ],
      },
    ],
    benefits: [
      "Mastery of Google Workspace & Basic Digital Tools",
      "Introduction to Logic, AI and Coding Fundamentals",
      "Public Speaking and Presentation Confidence",
      "Official Entreva Hub Certificate of Achievement",
      "Access to a network of young innovators and mentors",
    ],
    regions: ["Greater Accra", "All Regions of Ghana"],
    keyDates: [
      { label: "Early Bird Deadline", date: "10th May, 2026" },
      { label: "Student Orientation", date: "15th May, 2026" },
      { label: "Core Classes Begin", date: "18th May, 2026" },
      { label: "Graduation & Demo Day", date: "1st July, 2026" },
    ],
    category: "skills",
  },
]