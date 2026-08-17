export const projects = [
  {
    id: 1,
    slug: 'scotiabank',
    title: 'Scotiabank Business Banking',
    year: '2026',
    logo: '/projects/scotiabank/logo.svg',
    logoClass: 'h-6',
    summary:
      'Redesigning Scotiabank’s business banking website. 84 pages across 8 categories, aligned to the new brand and design system.',
    website: 'https://www.scotiabank.com/ca/en/business-banking/banking-solutions/credit-cards/scotiabank-passport-visa-infinite-business-card.html',
    period: '2026',
    type: 'Product & Web Design',
    services: 'Design, Content, Delivery',
    about: [
      'Led the redesign of Scotiabank’s business banking website to deliver a more modern, intuitive experience for business customers. The work was informed by user research, business requirements, and competitive analysis.',
      'We restructured the information hierarchy and redesigned navigation, category pages, and product pages to align with Scotiabank’s new brand and design system, improving clarity and findability across the site.',
    ],
    outcome: [
      'Updated 84 pages across 8 product categories, bringing the business banking site in line with the new brand and design system.',
      'Established a clearer information hierarchy and navigation model that makes products and services easier to discover.',
      'Partnered with development to ship redesigned category and product page patterns at scale.',
    ],
    roleIntro: 'My role spanned design, content, and delivery:',
    role: [
      'Design support for navigation, category, and product page experiences',
      'Content authoring and page structuring across the business banking site',
      'Timeline ownership and delivery coordination',
      'Close collaboration with development through build and launch',
    ],
    gallery: [],
  },
  {
    id: 2,
    slug: 'ikea',
    title: 'IKEA Website & App',
    year: '2019-2025',
    logo: '/projects/ikea/logo.svg',
    logoClass: 'h-9',
    summary:
      'Seven years of digital transformation across IKEA web and app: new iOS app, product pages, navigation, and a more personalized homepage.',
    website: 'https://www.ikea.com/ca/en/',
    appStore: 'https://apps.apple.com/ca/app/ikea/id1452164827',
    period: '2019 - 2025',
    type: 'Product & Commerce',
    services: 'Design, Development, Project Management',
    about: [
      'Over seven years at IKEA, I helped drive digital transformation across web and app in a range of roles. Work spanned commerce journeys that connect discovery, merchandising, and conversion.',
      'Notable projects include launching a new iOS app, redesigning product pages to improve conversion and add-to-cart, redesigning navigation, and reinventing the homepage into a more personalized experience.',
    ],
    outcome: [
      'Shipped a new iOS app as part of IKEA’s broader digital platform evolution.',
      'Redesigned product pages to strengthen conversion and add-to-cart performance.',
      'Redesigned navigation and reinvented the homepage into a more personalized experience for returning and new customers.',
    ],
    roleIntro: 'As commerce and design lead, I led multiple projects across:',
    role: [
      'Product and experience design for web and app',
      'Partnership with development through delivery',
      'Project management and timeline ownership',
      'AI-assisted workflows to accelerate design and delivery',
    ],
    gallery: [],
  },
  {
    id: 3,
    slug: 'gravite-lab',
    title: 'Gravite Lab',
    year: '2025',
    logo: '/projects/gravite-lab/logo.svg',
    logoClass: 'h-7',
    summary:
      'Brand and web design for Gravite Lab, a Toronto AI automation agency. Website, design system, and a featured project on Contra.',
    website: 'https://contra.com/alireza_iman_hic9mfbp/work?r=alireza_iman_hic9mfbp',
    period: '2025',
    type: 'Brand & Web Design',
    services: 'Brand, Website, Design System',
    about: [
      'Gravite Lab is an AI automation agency based in Toronto. I partnered with them as brand and web designer to define a clear visual identity and a site that communicates their offer with clarity.',
      'The work covered brand direction, website design, and a design system so the team could grow the experience consistently across pages and touchpoints.',
    ],
    outcome: [
      'Delivered a cohesive brand and website for Gravite Lab’s AI automation practice.',
      'Established a design system to keep product and marketing surfaces aligned as the agency scales.',
      'The project was featured on Contra, extending visibility across the independent creative network.',
    ],
    roleIntro: 'I led brand and web design end to end:',
    role: [
      'Brand identity and visual direction',
      'Website design and information architecture',
      'Design system foundations and components',
      'Collaboration through launch and iteration',
    ],
    gallery: [],
  },
]

export const experiences = [
  {
    period: '2026 - Now',
    role: 'Digital Experience Manager',
    company: 'Scotiabank',
    companyUrl: 'https://www.scotiabank.com',
    location: 'Toronto, Canada',
  },
  {
    period: '2022 - 2025',
    role: 'Digital Commerce Lead',
    company: 'IKEA',
    companyUrl: 'https://www.ikea.com/ca/en/',
    location: 'Toronto, Canada',
  },
  {
    period: '2019 - 2021',
    role: 'Digital Designer',
    company: 'IKEA',
    companyUrl: 'https://www.ikea.com/ca/en/',
    location: 'Toronto, Canada',
  },
]

export const tools = [
  {
    category: 'Design',
    items: [
      { name: 'Figma', note: 'Product design and prototyping', url: 'https://www.figma.com' },
      { name: 'FigJam', note: 'Workshops and mapping', url: 'https://www.figma.com/figjam/' },
    ],
  },
  {
    category: 'Build',
    items: [
      { name: 'Cursor', note: 'AI-assisted coding', url: 'https://cursor.com' },
      { name: 'React', note: 'Interfaces and prototypes', url: 'https://react.dev' },
      { name: 'Next.js', note: 'Product front ends', url: 'https://nextjs.org' },
    ],
  },
  {
    category: 'Research',
    items: [
      { name: 'Maze', note: 'Usability testing', url: 'https://maze.co' },
      { name: 'Amplitude', note: 'Product analytics', url: 'https://amplitude.com' },
    ],
  },
  {
    category: 'Resources',
    items: [
      { name: 'Refactoring UI', note: 'Interface craft reference', url: 'https://www.refactoringui.com' },
      { name: 'Laws of UX', note: 'Decision heuristics', url: 'https://lawsofux.com' },
      { name: 'MDN', note: 'Web platform docs', url: 'https://developer.mozilla.org' },
    ],
  },
]

export const EMAIL = 'alirezaiman@yahoo.com'
export const RESUME_URL = '#'

export function getProject(slug) {
  return projects.find((p) => p.slug === slug)
}
