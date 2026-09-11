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

export interface ProgrammeStat {
  label: string
  value: string
  icon?: "clock" | "users" | "calendar" | "wallet" | "globe" | "map-pin"
}

export interface ProgrammeStructureSection {
  week: string
  title: string
  description: string
  image: string
}

export interface Faq {
  question: string
  answer: string
}

export interface TrainingCommitmentItem {
  label: string
  value: string
}

export interface ApplySection {
  intro: string
  criteria: string[]
  commitment: {
    title: string
    items: TrainingCommitmentItem[]
  }
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
  // Optional override for the card link (used when the programme's own
  // detail page does not exist yet)
  link?: string
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
  canRegister?: boolean
  heroImages?: string[]
  showcaseImage?: string
  introVideo?: {
    title: string
    url: string
  }
  testimonials?: {
    title: string
    videos: string[]
  }
  participateUrl?: string
  stats?: ProgrammeStat[]
  structure?: ProgrammeStructureSection[]
  faqs?: Faq[]
  applySection?: ApplySection
  cta?: {
    title?: string
    description?: string
    buttonText?: string
    buttonUrl?: string
    stacked?: boolean
  }
}

export const programmes: Programme[] = [
  {
    slug: "activate",
    title: "ACTIVATE",
    partner: "ACTIVATE Implemented by Social Enterprise Ghana with Entreva Hub as a Training Service Provider",
    status: "Rolling Dates",
    image: "/images/activate-by-entreva-hub-agribusiness.png",
    shortDescription:
      "A Mastercard Foundation project strengthening Ghana's Agriculture TVET system through industry-led skills training and youth empowerment.",
    overview:
      "The ACTIVATE program strengthens an industry-led, demand-driven Agriculture Technical and Vocational Education and Training (ATVET) system nationwide in Ghana, blending education and skills training for young women and men.",
    about:
      "The Accelerating Change Through InnoVation in Agricultural TVET (ACTIVATE) program is a 5-year project funded by the Mastercard Foundation, which aims to improve the well-being and resilience of young women by strengthening an industry-led demand-driven Agriculture Technical and Vocational Education and Training (ATVET) system nationwide in Ghana. It blends education and skills training while building collaboration and linkages among key stakeholders such as public and private actors, academia, and agriculture value chain actors.",
    vision:
      "To improve the well-being and resilience of young women by strengthening an industry-led, demand-driven Agriculture TVET system nationwide in Ghana.",
    objectives: [
      "Strengthen industry-led, demand-driven Agricultural TVET nationwide",
      "Improve the well-being and resilience of young women and men",
      "Build collaboration among public, private, academic, and value-chain actors",
      "Equip youth with market-relevant agricultural technical and vocational skills",
    ],
    pillars: [
      {
        title: "Pillar 1: Local Drinks Production",
        items: [
          "Traditional & commercial drink recipes",
          "Hygiene, safety & quality standards",
          "Production & bottling processes",
          "Branding and market entry",
        ],
      },
      {
        title: "Pillar 2: Baking",
        items: [
          "Bread & pastry fundamentals",
          "Dough handling & baking techniques",
          "Food hygiene & quality control",
          "Pricing, packaging & retail",
        ],
      },
      {
        title: "Pillar 3: Vegetable Processing",
        items: [
          "Freshness & post-harvest handling",
          "Drying, canning & preservation methods",
          "Value addition & packaging",
          "Distribution & market linkages",
        ],
      },
      {
        title: "Pillar 4: Agripreneur",
        items: [
          "Business model & financial literacy",
          "Agripreneur planning & record keeping",
          "Marketing & customer acquisition",
          "Access to finance & scaling",
        ],
      },
    ],
    structure: [
      {
        week: "Week 1",
        title: "Local Drinks Production",
        description:
          "Master the craft of producing popular local drinks — from sobolo and asaana to fruit blends — from recipe to bottle. Hands-on training covers preparation, preservation, hygiene standards, packaging, and how to take a drink product from recipe to retail shelves.",
        image: "/images/activate-slide-1.jpg",
      },
      {
        week: "Week 2",
        title: "Baking",
        description:
          "Develop professional baking skills spanning bread, pastries, and cakes. This week covers ingredient handling, dough techniques, oven management, food safety, and the pricing and packaging needed to sell baked goods.",
        image: "/images/activate-slide-2.jpg",
      },
      {
        week: "Week 3",
        title: "Vegetable Processing",
        description:
          "Learn how to turn fresh vegetables into preserved, higher-value products. Topics include post-harvest handling, blanching, drying, canning, and packaging — reducing waste while extending shelf life for the market.",
        image: "/images/activate-slide-3.jpg",
      },
      {
        week: "Week 4",
        title: "Agripreneur",
        description:
          "Bring your skills together and become an agripreneur. This final week covers business planning, financial literacy, branding, customer acquisition, and access to finance so participants can launch or grow their agripreneur.",
        image: "/images/activate-slide-4.jpg",
      },
    ],
    outcomes: [
      "Improved well-being and resilience of young women and men",
      "Increased employability within agriculture value chains",
      "Stronger collaboration between TVET institutions and industry",
      "Demand-driven training aligned with market needs",
      "Enhanced innovation and entrepreneurship in agriculture",
      "A strengthened national ATVET system",
    ],
    perks: [
      "Practical, industry-linked training",
      "Official learning materials",
      "Mentorship from agriculture experts",
      "Field visits and value chain exposure",
      "Professional certificate of completion",
      "Access to a national stakeholder network",
    ],
    qualifications: [
      {
        title: "Target Participants",
        items: [
          "Young women and men",
          "TVET students and institutions",
          "Actors across the agriculture value chain",
        ],
      },
    ],
    benefits: [
      "Industry-led, demand-driven agricultural TVET",
      "Blended education and skills training",
      "Collaboration and linkages with key stakeholders",
    ],
    regions: ["Dawhenya", "Kpone", "Ada/Sege", "Ashaiman"],
    keyDates: [
      { label: "Applications", date: "Rolling Dates" },
    ],
    category: "agribusiness",
    canRegister: false,
    heroImages: [
      "/images/activate-slide-1.jpg",
      "/images/activate-slide-2.jpg",
      "/images/activate-slide-3.jpg",
      "/images/activate-slide-4.jpg",
      "/images/activate-slide-5.jpg",
    ],
    participateUrl: "/programmes/activate/participate",
    stats: [
      { label: "Duration", value: "1 Month", icon: "clock" },
      { label: "Schedule", value: "TBA", icon: "calendar" },
      { label: "Delivery", value: "In-Person", icon: "globe" },
      { label: "Location", value: "Various", icon: "map-pin" },
    ],
    faqs: [
      {
        question: "What is ACTIVATE?",
        answer:
          "ACTIVATE is a practical skills and entrepreneurship training initiative designed to equip young people with hands-on skills that can lead to employment, self-employment and agripreneur opportunities. The programme focuses on practical learning, enterprise development and market-relevant skills.",
      },
      {
        question: "What training areas are available?",
        answer:
          "Participants would take all four key training areas: Local Drinks Production, Baking, Vegetable Processing, and agripreneur. Each area combines practical skills with knowledge that can help participants apply what they learn in real-world work or business settings.",
      },
      {
        question: "How is the training delivered?",
        answer:
          "Training is delivered through weekly practical sessions, with each session lasting 3 hours per day. The approach emphasizes hands-on learning, demonstrations, practice and the application of skills to real production and business situations.",
      },
      {
        question: "Who can benefit from the programme?",
        answer:
          "The programme is designed primarily to support young people seeking practical skills, employment opportunities or pathways into entrepreneurship and agripreneur. Participants should be willing to learn, practise their skills and explore opportunities to apply them after training.",
      },
      {
        question: "Will I learn how to start a business?",
        answer:
          "Yes. Beyond technical skills, the programme incorporates an entrepreneurial and business-focused approach. Participants are encouraged to understand how their skills can be turned into viable products, services or business opportunities, including areas such as production, costing, pricing, marketing and enterprise development.",
      },
      {
        question: "What can I do after completing the training?",
        answer:
          "The goal is to help participants move beyond training into real economic opportunities. Depending on their interests and abilities, participants can pursue employment, start or develop a small enterprise, enter agripreneur, or continue building their technical and entrepreneurial skills.",
      },
    ],
    applySection: {
      intro:
        "ACTIVATE is open to young people who are ready to build practical skills and explore opportunities in employment, self-employment and agripreneur.",
      criteria: [
        "A woman between 15 and 35 years old",
        "A Person with Disability (PWD) — males are also eligible",
        "A recognized refugee — males are also eligible",
        "An Internally Displaced Person (IDP)",
        "Interested in practical skills, entrepreneurship or agripreneur",
        "Ready and available to participate in the full 20-day training programme",
        "Willing to participate in hands-on practical training",
      ],
      commitment: {
        title: "Training Commitment",
        items: [
          { label: "Duration", value: "20 days" },
          { label: "Training Schedule", value: "3 hours per day" },
          { label: "Training Structure", value: "Four training areas delivered over four weeks" },
          { label: "Training Time", value: "Exact training time will be communicated by your selected training centre." },
        ],
      },
    },
    cta: {
      title: "Ready to Participate?",
      description: "Join the ACTIVATE Program, implemented by Social Enterprise Ghana with Entreva Hub as a Training Service Provider",
      buttonText: "Apply",
      buttonUrl: "/programmes/activate/participate",
      stacked: true,
    },
  },
  {
    slug: "future-force-junior",
    title: "Future Force Program - Junior (FFP-j)",
    partner: "Entreva Hub & Oakleaf",
    status: "Starts in November 2026",
    image: "/images/future-force-program-cover.jpg",
    heroImages: ["/images/future-force-program-junior.jpg"],
    showcaseImage: "/images/entreva-hub-future-force-program-2026.jpg",
    introVideo: {
      title: "Welcome To Entreva Hub",
      url: "https://youtu.be/dboTXv30GWk",
    },
    price: "TBA",
    shortDescription:
      "A junior edition of the Future Force Program, building essential life, robotic and technology skills for younger learners.",
    overview:
      "Developed by Oakleaf Training and Consulting in collaboration with Entreva Hub, the Future Force Program - Junior (FFP-j) identifies and fully develops the hidden potential of younger learners over a focused programme of training.",
    about:
      "The Future Force Program - Junior (FFP-j) is a catalyst for the development of young people, providing them with essential tools to be more focused, prepared, and skilled for their future careers and personal lives. We offer lifetime on-going mentoring for participants who graduate from the program.",
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
        items: ["Website Design", "Game Development", "Social Media - Netiquette", "Artificial Intelligence", "Robotics"]
      }
    ],
    outcomes: [
      "Increased self-confidence, teamwork, and ability to communicate ideas clearly",
      "Ability to identify problems, develop ideas, and turn them into practical products or solutions",
      "Practical understanding of entrepreneurship, customers, pricing, sales, costs, profit, and savings",
      "Hands-on experience in science, electronics, robotics, prototyping, and physical product creation",
      "Understanding of how farms, factories, production processes, inventory, and supply chains work",
      "Ability to use AI and digital tools responsibly to create simple games, websites, and other projects",
      "Improved problem-solving, creativity, critical thinking, and design skills through experiential challenges",
      "Ability to develop, demonstrate, and confidently pitch a product or business idea"
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
        role: "Financial Literacy & Education Facilitator",
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
        name: "Sylvia Vanderpure",
        role: "Programmes Manager",
        bio: "Experienced programmes manager with a strong background in multi-donor initiatives across international development, public health, WASH, agribusiness, and youth empowerment. Skilled in full project lifecycle oversight — from strategic design and field execution to monitoring, evaluation, and budget management. Known for combining data-driven management with strategic leadership to deliver sustainable community impact.",
        image: "/images/Sylvia-Vanderpure.jpeg"
      }
    ],
    regions: ["Greater Accra"],
    keyDates: [
      { label: "Program Start", date: "TBA" },
      { label: "Status", date: "Starts in November 2026" },
    ],
    category: "skills",
    canRegister: true,
    perks: [
      "Practical Hands-on Training",
      "Official Printed Learning Materials",
      "Exclusive Future Force T-Shirt",
      "Industry Field Trips & Visits",
      "Professional Certificate of Completion",
      "Installment payment terms available",
      "Saturdays: 10am - 3pm",
      "Individual Robotic kit to be purchases by pupil",
    ],
    testimonials: {
      title: "Testimonials from parents from Future Force Program (FFP)",
      videos: [
        "https://youtube.com/shorts/pyLUmKmetQk?feature=share",
        "https://youtube.com/shorts/sjAsPhs-er4?feature=share",
        "https://youtube.com/shorts/TMkMWxZu2BA?feature=share",
        "https://youtube.com/shorts/3zh5b06Qv2Y?feature=share",
      ],
    },
    stats: [
      { label: "Duration", value: "16 Saturdays", icon: "clock" },
      { label: "Mentoring", value: "Lifetime", icon: "users" },
      { label: "Schedule", value: "November to February", icon: "calendar" },
      { label: "Investment", value: "GHS 3,550", icon: "wallet" },
      { label: "Delivery", value: "In-Person", icon: "globe" },
      { label: "Location", value: "Community 25", icon: "map-pin" },
    ],
    seo: {
      title: "Future Force Program - Junior (FFP-j) | Entreva Hub",
      description: "Starting in November. A junior edition of the Future Force Program for younger learners.",
      ogImage: "/images/future-force-program-cover.jpg"
    }
  },
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
    status: "Date: 2nd July to 29th Aug 2026",
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
      "Installment payment terms available",
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
    canRegister: true,
    stats: [
      { label: "Duration", value: "2 Months", icon: "clock" },
      { label: "Mentoring", value: "Lifetime", icon: "users" },
      { label: "Schedule", value: "July & August", icon: "calendar" },
      { label: "Investment", value: "GHS 3,550", icon: "wallet" },
      { label: "Delivery", value: "Hybrid Mode", icon: "globe" },
      { label: "Location", value: "Community 25", icon: "map-pin" },
    ],
    seo: {
      title: "Future Force Program (FFP) | Entreva Hub",
      description: "Join the Future Force Program. A 2-month intensive for JHS/SHS graduates to master AI, Website Design, Leadership, and Financial Literacy.",
      ogImage: "/images/programme-tech.jpg"
    }
  },
]