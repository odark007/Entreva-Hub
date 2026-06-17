// lib/programmes-data.ts

export type ProgrammeStatus = "Open" | "Closed" | "Coming Soon" | string

// New Sub-interfaces for the expanded data
export interface Facilitator {
  name: string
  role: string
  bio: string
  image?: string
}

export interface Pillar {
  title: string
  items: string[]
}

export interface Programme {
  slug: string
  title: string
  partner: string
  status: ProgrammeStatus
  image: string
  shortDescription: string
  overview: string
  about: string
  // New Optional Fields from PDF
  price?: string
  vision?: string
  objectives?: string[]
  pillars?: Pillar[]
  outcomes?: string[]
  facilitators?: Facilitator[]
  perks?: string[]
  // SEO & OG
  seo?: {
    title: string
    description: string
    ogImage: string
  }
  // Original Fields
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
    title: "Future Force Program (FFP)",
    partner: "Entreva Hub & Oakleaf",
    status: "Starting Date: 2nd July",
    image: "/images/programme-tech.jpg",
    price: "GHS 3,550",
    shortDescription: "A personal development platform for JHS and SHS graduates focused on essential skills the education system overlooks.",
    overview: "Developed by Oakleaf Training and Consulting in collaboration with Entreva Hub, FFP identifies and fully develops the hidden potential of young people over two intensive months.",
    about: "The Future Force Program is a catalyst for the development of young people, providing them with essential tools to be more focused, prepared, and skilled for their future careers and personal lives. We offer lifetime on-going mentoring for participants who graduate from the program.",
    vision: "To engage the minds, hearts, and hands of young people and prepare them for life at their full potential.",
    objectives: [
      "Identify and develop student potential for full functionality",
      "Develop entrepreneurial skills for the modern economy",
      "Instill critical life skills and resilience",
      "Equip participants with critical technology and AI skills"
    ],
    pillars: [
      {
        title: "Pillar 1: Self-Mastery",
        items: ["Communication Skills", "Presentation Skills", "Self Confidence", "Public Speaking", "Leadership", "Attitude Control"]
      },
      {
        title: "Pillar 2: Life & Career",
        items: ["Reading Skills", "Goal Achievement", "Self-Motivation", "Interpersonal Relations", "Career Guidance"]
      },
      {
        title: "Pillar 3: Growth & Money",
        items: ["Creativity and Problem Solving", "Entrepreneurial Skills", "Financial Literacy", "Making Friends Strategically", "Effective Study Skills"]
      },
      {
        title: "Pillar 4: Digital Excellence",
        items: ["Website Design", "Social Media Marketing", "Artificial Intelligence"]
      }
    ],
    outcomes: [
      "Enhanced self-confidence and public speaking ability",
      "Mastery of critical digital tools and AI applications",
      "Financial literacy and personal goal achievement",
      "Ability to develop business ideas and digital marketing plans",
      "Clear understanding of career paths and the world of work",
      "The leadership potential to train and influence others"
    ],
    facilitators: [
      {
        name: "Christian Tetteh Agbasi",
        role: "Lead Strategist",
        bio: "An expert in youth leadership and organizational development with a focus on empowering the next generation of African leaders.",
        image: "/images/team-ceo.jpg"
      },
      {
        name: "Godwin France",
        role: "Tech, Innovation & Business Facilitator",
        bio: "Entrepreneur and strategist dedicated to building scalable ecosystems for youth-led innovation across Ghana.",
        image: "/images/Godwin-France.jpeg"
      },
      {
        name: "Robert Mensah",
        role: "Financial Literacy & Education  Facilitator",
        bio: "Passionate financial education facilitator helping young people build strong money habits, make informed financial decisions, and create pathways to economic independence.",
        image: "/images/Robert-Mensah.jpg"
      },
      {
        name: "Patience Morrison",
        role: "Business & Personal Development Coach",
        bio: "Business and personal development coach dedicated to helping young people build confidence, resilience, leadership skills, and a growth mindset for lasting success.",
        image: "/images/Patience-Morrison.jpg"
      },
      {
        name: "Victor Tekpetey",
        role: "Public Speaking & Career Coach",
        bio: "Public speaking and career coach helping young people build confidence, communicate effectively, and navigate their professional journeys with purpose and clarity.",
        image: "/images/Victor-Tekpetey.jpg"
      },
      {
        name: "Enoch Asiedu Yirenkyi",
        role: "Creativity & Problem Solving Coach",
        bio: "Specialist in design thinking and creative strategy, guiding students to solve complex real-world challenges.",
        image: "/images/enoch-yirenkyi-enoch_square.jpg"
      }
    ],
    perks: [
        "Practical Hands-on Training",
        "Official Printed Learning Materials",
        "Exclusive Future Force T-Shirt",
        "Industry Field Trips & Visits",
        "Professional Certificate of Completion",
        "Installment payment terms available"
    ],
    qualifications: [
      {
        title: "Target Participants",
        items: [
          "JHS Graduates (awaiting results)",
          "SHS Graduates (awaiting university)",
          "Students seeking personal growth during vacation",
        ],
      },
    ],
    benefits: [
      "Hybrid learning (In-person & Online)",
      "Small cohort size (Max 30 participants)",
      "Mentorship from industry leaders",
      "Hands-on project development",
    ],
    regions: ["Greater Accra"],
    keyDates: [
      { label: "Program Start", date: "2nd July" },
      { label: "Duration", date: "2 Months (July & August)" },
    ],
    category: "skills",
    seo: {
      title: "Future Force Program (FFP) | Entreva Hub",
      description: "Join the Future Force Program. A 2-month intensive for JHS/SHS graduates to master AI, Website Design, Leadership, and Financial Literacy.",
      ogImage: "/images/programme-tech.jpg"
    }
  },
]