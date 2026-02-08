export type ProgrammeStatus = "Open" | "Closed" | "Coming Soon"

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
    slug: "mtn-sme-support",
    title: "MTN SME Support Programme",
    partner: "MTN Ghana & Entreva Hub",
    status: "Open",
    image: "/images/programme-mtn.jpg",
    shortDescription:
      "Unlock the full potential of your SME with world-class business training, mentorship, and funding of up to GHS 20,000.",
    overview:
      "MTN Ghana, in partnership with Entreva Hub, is implementing the MTN Foundation Economic Empowerment Program. As a legacy project marking MTN Ghana's 25th Anniversary, this initiative is designed to catalyze transformation by unlocking growth opportunities and expediting youth entrepreneurship.",
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
      "Working Capital Funding (up to GHS 20,000.00 per business)",
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
    slug: "tech-skills-bootcamp",
    title: "Tech Skills Bootcamp",
    partner: "Entreva Hub",
    status: "Coming Soon",
    image: "/images/programme-tech.jpg",
    shortDescription:
      "Equipping young Ghanaians with in-demand digital and technology skills for the future of work.",
    overview:
      "The Tech Skills Bootcamp is an intensive programme designed to equip young Ghanaians with practical, in-demand technology skills.",
    about:
      "From coding to digital marketing, this bootcamp covers the essential skills needed to thrive in the digital economy. Participants gain hands-on experience and build portfolios that prepare them for employment or entrepreneurship.",
    qualifications: [
      {
        title: "Eligible Participants",
        items: [
          "Youth aged 18-35",
          "Basic computer literacy",
          "Passion for technology and innovation",
        ],
      },
    ],
    benefits: [
      "Hands-on technology training",
      "Industry mentorship",
      "Portfolio development",
      "Job placement support",
    ],
    regions: ["Greater Accra", "Ashanti Region"],
    keyDates: [
      { label: "Programme Launch", date: "Coming Soon" },
    ],
    category: "tech",
  },
]
