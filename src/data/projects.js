import { buildShowcase } from './showcaseLayout'

const p = (slug, ...files) => files.map((file) => `/projects/${slug}/${file}`)

/**
 * Portfolio project data for the 3D vinyl record experience.
 * Each record in the basket maps to one entry in this array.
 *
 * Showcase assets: pass `images` to buildShowcase, or upload 01.jpg–08.jpg
 * to /public/projects/{slug}/showcase/
 */
export const projects = [
  {
    id: 1,
    slug: 'supp',
    title: 'Supp',
    category: 'Product Design',
    year: '2025',
    role: 'Lead Product Designer',
    image: '/projects/supp/supp.png',
    images: ['/projects/supp/supp.png'],
    description:
      'Lead designer for an agentic reverse marketplace platform. Designing user experiences that leverage AI agents to transform how users discover and connect with services.',
    technologies: ['Figma', 'Cursor', 'Product Design', 'AI/ML'],
    website: null,
    caseStudy: null,
    accent: '#6366f1',
    showcase: buildShowcase('supp', {
      tag: 'Product Design',
      images: p('supp', 'supp.png'),
      objectPositions: [
        'center top',
        'center',
        'center bottom',
        'left center',
        'right center',
        'top',
      ],
    }),
  },
  {
    id: 2,
    slug: 'ikea-digital-experience',
    title: 'IKEA Digital Experience',
    category: 'Product & Web Design',
    year: '2022',
    role: 'Senior Product Designer',
    image: '/projects/ikea-digital-experience/IKEA.png',
    images: ['/projects/ikea-digital-experience/IKEA.png'],
    description:
      'Led product UX and design strategy for IKEA web and app, building interfaces across merchandising, checkout, navigation, and homepage using analytics-driven insights.',
    technologies: ['Figma', 'React', 'Contentful', 'A/B Testing'],
    website: 'https://www.ikea.com/ca/en/',
    caseStudy: null,
    accent: '#0058a3',
    showcase: buildShowcase('ikea-digital-experience', {
      tag: 'Product & Web Design',
      images: p(
        'ikea-digital-experience',
        'IKEA.png',
        'IKEA-1.png',
        'IKEA-2.png',
        'IKEA-3.png',
        'IKEA-comfortguide.png',
        'IKEA-comfortguide-0.png',
        'IKEA-comfortguide-1.png',
        'IKEA-comfortguide-2.png'
      ),
    }),
  },
  {
    id: 3,
    slug: 'be-here',
    title: 'Be Here Streaming',
    category: 'Web App & Mobile',
    year: '2025',
    role: 'Product Designer & Developer',
    image: '/projects/be-here/Be-here.png',
    images: ['/projects/be-here/Be-here.png'],
    description:
      'Designed and developed a comprehensive streaming platform with real-time video/audio streaming, live chat, and clip creation for creators and viewers.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Figma'],
    website: 'https://www.thebehere.com/',
    caseStudy: null,
    accent: '#ec4899',
    showcase: buildShowcase('be-here', {
      tag: 'Web App & Mobile',
      images: p(
        'be-here',
        'Be-here.png',
        'Be-here-1.png',
        'Be-here-2.png',
        'Be-here-3.png',
        'Be-here-4.png'
      ),
    }),
  },
  {
    id: 4,
    slug: 'grand-lighting',
    title: 'Grand Lighting',
    category: 'E-Commerce',
    year: '2024',
    role: 'UX Designer & Developer',
    image: '/projects/grand-lighting/GL.png',
    images: ['/projects/grand-lighting/GL.png'],
    description:
      'E-commerce platform with automated product management. Built with WordPress and WooCommerce, featuring LLM-powered automation and CIN7 ERP integration.',
    technologies: ['WordPress', 'WooCommerce', 'Python', 'JavaScript'],
    website: 'https://www.grandlighting.ca/',
    caseStudy: null,
    accent: '#f59e0b',
    showcase: buildShowcase('grand-lighting', {
      tag: 'E-Commerce',
      images: p(
        'grand-lighting',
        'GL.png',
        'GL-1.png',
        'GL-2.png',
        'GL-3.png',
        'GL-4.png',
        'GL-5.png'
      ),
    }),
  },
  {
    id: 5,
    slug: 'x402',
    title: 'x402 React Library',
    category: 'Open Source',
    year: '2025',
    role: 'Creator & Maintainer',
    image: '/projects/x402/x402.png',
    images: ['/projects/x402/x402.png'],
    description:
      'A React component library for Coinbase x402 payments. Enables seamless integration of HTTP 402 payment protocol for micropayments and API monetization.',
    technologies: ['React', 'TypeScript', 'Web3', 'Coinbase x402'],
    website: 'https://x402-react.vercel.app/',
    caseStudy: null,
    accent: '#3b82f6',
    showcase: buildShowcase('x402', {
      tag: 'Open Source',
      images: p('x402', 'x402.png', 'x402-1.png', 'x402-2.png'),
    }),
  },
  {
    id: 6,
    slug: 'ikea-visual-design',
    title: 'IKEA Visual Design',
    category: 'Motion & Visual',
    year: '2019',
    role: 'Visual Designer',
    image: '/projects/ikea-visual-design/ikea-visual-design.png',
    images: ['/projects/ikea-visual-design/ikea-visual-design.png'],
    description:
      'Created visual concepts and motion media for IKEA in-store communication, marketing campaigns, and retail design across seasonal campaigns.',
    technologies: ['After Effects', 'Photoshop', 'Illustrator', 'InDesign'],
    website: 'https://www.ikea.com/ca/en/',
    caseStudy: null,
    accent: '#ffdb00',
    showcase: buildShowcase('ikea-visual-design', {
      tag: 'Motion & Visual',
      images: p(
        'ikea-digital-experience',
        'process1.jpg',
        'process2.jpg',
        'process3.jpg',
        'process4.jpg',
        'IKEA-comfortguide-3.png',
        'IKEA-2.png',
        'IKEA-3.png',
        'IKEA-1.png'
      ),
    }),
  },
  {
    id: 7,
    slug: 'skapa-design-system',
    title: 'Skapa Design System',
    category: 'Design Systems',
    year: '2023',
    role: 'Design System Contributor',
    image: '/projects/ikea-digital-experience/IKEA.png',
    images: ['/projects/ikea-digital-experience/IKEA.png'],
    description:
      'Contributing to IKEA global design system—scalable components, design tokens, and documentation for consistent cross-platform experiences.',
    technologies: ['Figma', 'Storybook', 'React', 'Tokens'],
    website: null,
    caseStudy: null,
    accent: '#10b981',
    showcase: buildShowcase('skapa-design-system', {
      tag: 'Design Systems',
      images: p(
        'ikea-digital-experience',
        'IKEA.png',
        'IKEA-1.png',
        'IKEA-2.png',
        'IKEA-3.png',
        'IKEA-comfortguide.png',
        'IKEA-comfortguide-0.png',
        'IKEA-comfortguide-1.png',
        'IKEA-comfortguide-2.png'
      ),
    }),
  },
  {
    id: 8,
    slug: 'agentic-commerce',
    title: 'Agentic Commerce',
    category: 'AI / Innovation',
    year: '2025',
    role: 'Innovation Lead',
    image: '/projects/supp/supp.png',
    images: ['/projects/supp/supp.png'],
    description:
      'Pioneering AI-driven commerce experiences that anticipate user needs through intelligent personalization and conversational interfaces.',
    technologies: ['AI/ML', 'Personalization', 'UX Research', 'React'],
    website: null,
    caseStudy: null,
    accent: '#8b5cf6',
    showcase: buildShowcase('agentic-commerce', {
      tag: 'AI / Innovation',
      images: p('supp', 'supp.png'),
      objectPositions: [
        'center top',
        'center',
        'center bottom',
        'left center',
        'right center',
        'top',
      ],
    }),
  },
  {
    id: 9,
    slug: 'checkout-reimagined',
    title: 'Checkout Reimagined',
    category: 'UX Design',
    year: '2023',
    role: 'Lead UX Designer',
    image: '/projects/ikea-digital-experience/IKEA.png',
    images: ['/projects/ikea-digital-experience/IKEA.png'],
    description:
      'End-to-end redesign of the IKEA checkout flow—reducing friction, clarifying delivery options, and lifting conversion through rigorous usability testing.',
    technologies: ['Figma', 'A/B Testing', 'React', 'Analytics'],
    website: 'https://www.ikea.com/ca/en/',
    caseStudy: null,
    accent: '#ef4444',
    showcase: buildShowcase('checkout-reimagined', {
      tag: 'UX Design',
      images: p(
        'ikea-digital-experience',
        'IKEA.png',
        'IKEA-1.png',
        'IKEA-2.png',
        'IKEA-3.png',
        'IKEA-comfortguide.png',
        'IKEA-comfortguide-0.png',
        'IKEA-comfortguide-1.png',
        'IKEA-comfortguide-2.png'
      ),
    }),
  },
  {
    id: 10,
    slug: 'motion-identity',
    title: 'Motion Identity',
    category: 'Brand & Motion',
    year: '2021',
    role: 'Motion Designer',
    image: '/projects/ikea-visual-design/ikea-visual-design.png',
    images: ['/projects/ikea-visual-design/ikea-visual-design.png'],
    description:
      'A kinetic brand identity system—animated logo states, transitions, and campaign templates designed for cross-channel consistency.',
    technologies: ['After Effects', 'Illustrator', 'Cinema 4D'],
    website: null,
    caseStudy: null,
    accent: '#14b8a6',
    showcase: buildShowcase('motion-identity', {
      tag: 'Brand & Motion',
      images: p(
        'ikea-digital-experience',
        'process1.jpg',
        'process2.jpg',
        'process3.jpg',
        'process4.jpg',
        'IKEA-comfortguide-3.png',
        'IKEA-2.png',
        'IKEA-3.png',
        'IKEA-1.png'
      ),
    }),
  },
]
