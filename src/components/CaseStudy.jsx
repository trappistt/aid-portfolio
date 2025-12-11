import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Button } from './ui/button'
import Navigation from './Navigation.jsx'
import Footer from './Footer.jsx'
import { useSmoothScroll, getLenisInstance } from '../hooks/useSmoothScroll'
import * as simpleIcons from 'simple-icons'

// Map tech stack names to simple-icons property names
const techIconMap = {
  'Next.js': 'siNextdotjs',
  'TypeScript': 'siTypescript',
  'Stripe': 'siStripe',
  'React': 'siReact',
  'JavaScript': 'siJavascript',
  'Node.js': 'siNodedotjs',
  'Svelte': 'siSvelte',
  'Python': 'siPython',
  'GitHub': 'siGithub',
  'Postman': 'siPostman',
  'Cypress': 'siCypress',
  'Playwright': 'siPlaywright',
  'LiveKit': 'siLivekit',
  'Prisma': 'siPrisma',
  'MySQL': 'siMysql',
  'Clerk': 'siClerk',
  'Tailwind CSS': 'siTailwindcss',
  'WordPress': 'siWordpress',
  'WooCommerce': 'siWoocommerce',
  'D3.js': 'siD3dotjs',
  'Framer Motion': 'siFramer',
  'Three.js': 'siThreedotjs',
  'WebGL': 'siWebgl',
  'WebSocket': 'siWebsocket',
  'Storybook': 'siStorybook',
  'Figma': 'siFigma',
  'Adobe': 'siAdobe',
  'Adobe After Effects': 'siAdobe',
  'Photoshop': 'siAdobe',
  'Illustrator': 'siAdobe',
  'InDesign': 'siAdobe',
  'Contentful': 'siContentful',
}

// Map tech stack names to custom image URLs (for icons not available in simple-icons)
const customIconUrls = {
  'Adobe': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Adobe_Creative_Cloud_rainbow_icon.svg/1200px-Adobe_Creative_Cloud_rainbow_icon.svg.png',
  'Adobe After Effects': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Adobe_After_Effects_CC_icon.svg/500px-Adobe_After_Effects_CC_icon.svg.png',
  'Photoshop': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Adobe_Photoshop_CC_icon.svg/500px-Adobe_Photoshop_CC_icon.svg.png',
  'Illustrator': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Adobe_Illustrator_CC_icon.svg/2048px-Adobe_Illustrator_CC_icon.svg.png',
  'InDesign': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Adobe_InDesign_CC_icon.svg/1051px-Adobe_InDesign_CC_icon.svg.png',
  'Cursor': 'https://cursor.com/favicon.ico',
}

// Component to render tech logo
function TechLogo({ techName }) {
  // Check for custom image URL first
  const customUrl = customIconUrls[techName]
  if (customUrl) {
    return (
      <div
        className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center p-2 hover:border-gray-300 transition-colors overflow-hidden"
        title={techName}
      >
        <img
          src={customUrl}
          alt={techName}
          className="w-6 h-6 object-contain"
        />
      </div>
    )
  }

  const iconKey = techIconMap[techName]
  
  if (!iconKey) {
    return (
      <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center">
        <span className="text-xs text-gray-500 font-medium">{techName.charAt(0)}</span>
      </div>
    )
  }
  
  try {
    const icon = simpleIcons[iconKey]
    
    if (!icon || !icon.path) {
      return (
        <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center">
          <span className="text-xs text-gray-500 font-medium">{techName.charAt(0)}</span>
        </div>
      )
    }
    
    return (
      <div
        className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center p-2 hover:border-gray-300 transition-colors"
        title={techName}
      >
        <svg
          role="img"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill={`#${icon.hex}`}
        >
          <path d={icon.path} />
        </svg>
      </div>
    )
  } catch (error) {
    return (
      <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center">
        <span className="text-xs text-gray-500 font-medium">{techName.charAt(0)}</span>
      </div>
    )
  }
}

// Project data - should match Projects.jsx
const projects = [
  {
    id: 1,
    title: 'Supp',
    category: 'Product Design',
    description: 'Lead designer for an agentic reverse marketplace platform. Designing user experiences that leverage AI agents to transform how users discover and connect with services. Currently in active development.',
    tags: ['Figma', 'Cursor', 'Product Design'],
    year: 'June 2025 — Present',
    number: '01',
    link: null,
    caseStudy: '/case-study/supp',
    image: '/projects/supp/supp.png',
    caseStudyContent: {
      overview: 'Supp is an innovative agentic reverse marketplace platform where I serve as the lead designer. The project leverages AI agents to revolutionize how users discover and connect with services through a reverse marketplace model. As the design lead, I\'m responsible for creating intuitive user experiences that make complex AI-driven interactions feel natural and accessible. The platform is currently in active development, and due to NDA restrictions, I have limited ability to share specific details about features and implementation.',
      myRole: 'Lead Product Designer',
      roleDescription: 'As the lead designer for Supp, I\'m responsible for defining the product design strategy, creating user experience flows, designing interfaces, and establishing design systems for this agentic reverse marketplace. I work closely with product and engineering teams to translate complex AI agent capabilities into intuitive user experiences. My role encompasses user research, wireframing, prototyping, visual design, and design system development, all while navigating the unique challenges of designing for AI-driven interactions.',
      challenge: 'Designing for an agentic reverse marketplace presents unique UX challenges. The platform needs to make AI agent interactions feel natural and trustworthy while handling complex matching and discovery processes. The challenge involves creating interfaces that clearly communicate AI agent capabilities, build user confidence in AI-driven recommendations, and simplify the reverse marketplace model for users unfamiliar with the concept. Additionally, designing within NDA constraints requires careful consideration of what can be shared while still demonstrating design thinking and process.',
      solution: 'I\'m taking a user-centered design approach that prioritizes clarity and trust-building in AI interactions. The design strategy focuses on transparent communication of AI agent processes, clear visual feedback for agent actions, and intuitive interfaces that guide users through the reverse marketplace experience. I\'m developing a design system that supports scalable growth while maintaining consistency across AI-driven features. The design process emphasizes rapid iteration, user testing, and close collaboration with product and engineering teams to ensure feasibility and alignment.',
      keyDecisions: [
        {
          decision: 'Transparent AI Agent Communication',
          reasoning: 'Chose to make AI agent processes visible and understandable to users, rather than hiding complexity. This approach builds trust and helps users understand how the reverse marketplace works, leading to better engagement and user confidence in AI-driven recommendations.'
        },
        {
          decision: 'Progressive Disclosure for Complex Features',
          reasoning: 'Designed interfaces that reveal complexity gradually, allowing users to understand basic functionality first before exploring advanced AI agent capabilities. This approach reduces cognitive load and makes the platform accessible to users with varying levels of technical expertise.'
        },
        {
          decision: 'Design System First Approach',
          reasoning: 'Established a comprehensive design system early in the development process to ensure consistency and scalability as the platform grows. This approach enables faster iteration while maintaining visual and functional coherence across all features.'
        },
        {
          decision: 'User-Centric Reverse Marketplace Model',
          reasoning: 'Focused on making the reverse marketplace concept intuitive through clear visual design and user flows. The design emphasizes user benefits and simplifies the discovery process, making it feel natural rather than requiring users to understand the underlying model.'
        }
      ],
      userResearch: [
        {
          insight: 'AI Trust and Transparency',
          finding: 'User research indicates that users need to understand how AI agents work to trust their recommendations, particularly in a marketplace context where decisions have real-world impact.',
          impact: 'Designed interfaces that provide clear visibility into AI agent processes and decision-making, building user confidence through transparency.'
        },
        {
          insight: 'Reverse Marketplace Clarity',
          finding: 'Users unfamiliar with reverse marketplace models need clear guidance and visual cues to understand how the platform differs from traditional marketplaces.',
          impact: 'Created intuitive user flows and visual design that make the reverse marketplace concept accessible without requiring extensive explanation.'
        },
        {
          insight: 'AI Interaction Patterns',
          finding: 'Users expect AI interactions to feel conversational and responsive, with clear feedback about agent actions and status.',
          impact: 'Designed interaction patterns that provide immediate feedback, clear status indicators, and conversational UI elements that make AI agent interactions feel natural.'
        }
      ],
      designSystem: {
        description: 'Developed a comprehensive design system for Supp that supports the platform\'s AI-driven features and reverse marketplace model. The system includes components for AI agent interactions, marketplace interfaces, and user feedback mechanisms. Due to NDA restrictions, specific component details cannot be shared, but the system ensures consistency and scalability across all platform features.',
        components: [
          'AI agent interaction components',
          'Marketplace interface patterns',
          'User feedback and status indicators',
          'Navigation and discovery patterns',
          'Form and input components',
          'Notification and alert systems',
          'Layout and grid systems',
          'Design tokens for colors, typography, and spacing'
        ]
      },
      process: [
        'Conducted user research to understand needs and expectations for AI-driven marketplace experiences',
        'Created user personas and journey maps for different user types in the reverse marketplace',
        'Designed wireframes and low-fidelity prototypes for core user flows',
        'Developed a comprehensive design system with reusable components and design tokens',
        'Created high-fidelity mockups for key platform features',
        'Designed interaction patterns for AI agent communications and feedback',
        'Built interactive prototypes to test and validate design concepts',
        'Conducted usability testing and iterated based on user feedback',
        'Collaborated closely with product and engineering teams to ensure design feasibility',
        'Established design guidelines and documentation for the platform',
        'Iterated on designs based on development progress and user insights',
        'Maintained design consistency while adapting to evolving product requirements'
      ],
      results: [
        {
          metric: 'Design System',
          value: 'Established',
          description: 'Successfully developed a comprehensive design system that supports scalable platform growth'
        },
        {
          metric: 'User Experience',
          value: 'In Progress',
          description: 'Designing intuitive interfaces that make AI-driven reverse marketplace interactions accessible and trustworthy'
        },
        {
          metric: 'Team Collaboration',
          value: 'Effective',
          description: 'Maintaining strong collaboration with product and engineering teams throughout development'
        },
        {
          metric: 'Design Process',
          value: 'Iterative',
          description: 'Implementing user-centered design process with continuous testing and refinement'
        }
      ],
      lessonsLearned: [
        'Designing for AI-driven interactions requires careful balance between transparency and simplicity—users need to understand AI processes without being overwhelmed.',
        'Reverse marketplace models benefit from clear visual design that makes the concept intuitive without requiring extensive explanation.',
        'Establishing a design system early enables faster iteration and maintains consistency as products evolve.',
        'NDA constraints require creative approaches to demonstrating design thinking while respecting confidentiality.',
        'User trust in AI features is built through transparent communication and clear feedback mechanisms.',
        'Collaborative design processes with product and engineering teams are essential for successful AI product development.'
      ],
      images: [
        '/projects/supp/supp.png',
      ]
    }
  },
  {
    id: 2,
    title: 'IKEA Digital Experience',
    category: 'Product & Web Design',
    description: 'Led product UX and design strategy for IKEA web and app, building interfaces across merchandising, checkout, navigation, and homepage using analytics-driven insights and GenAI prototyping.',
    tags: ['Figma', 'Adobe', 'React', 'GitHub', 'Contentful'],
    year: '2022 — Present',
    number: '02',
    link: 'https://www.ikea.com/ca/en/',
    caseStudy: '/case-study/ikea-digital-experience',
    image: '/projects/ikea-digital-experience/IKEA.png',
    caseStudyContent: {
      overview: 'As Digital Designer at IKEA, I led product UX and design strategy for IKEA web and app experiences, focusing on the Canadian market. My work spans critical customer touchpoints including merchandising, checkout flows, navigation systems, and homepage experiences. I combine analytics-driven insights with product thinking to deliver exceptional digital experiences that align with IKEA\'s brand values and user needs.',
      myRole: 'Digital Product Designer',
      roleDescription: 'I was responsible for leading product UX and design strategy, producing comprehensive design deliverables, and collaborating closely with product teams, engineering, and CoE (Center of Excellence) to deliver exceptional digital experiences across IKEA web and app platforms.',
      challenge: 'Designing and implementing cohesive digital experiences across IKEA\'s web and mobile platforms requires balancing user needs, business objectives, and technical constraints. The challenge involves creating intuitive interfaces that guide customers through complex decision-making processes, optimizing conversion funnels, and ensuring seamless experiences across all touchpoints while maintaining consistency with IKEA\'s design system and brand guidelines.',
      solution: 'Implemented a comprehensive product design approach that combines user research, analytics insights, and GenAI-driven prototyping. I produce and implement various design deliverables throughout the product design process, including wireframes, high-fidelity mockups, interactive prototypes, and design specifications. I leverage GenAI tools to rapidly prototype and iterate on design concepts, enabling faster validation and refinement. Working closely with engineering teams, I ensure design feasibility, provide detailed specifications, and collaborate on component libraries and design systems. I actively participate in agile ceremonies, contribute to UX vision development, and execute iterative user research methodologies to cultivate deep understanding of our users.',
      keyDecisions: [
        {
          decision: 'GenAI-Driven Prototyping Approach',
          reasoning: 'Adopted GenAI tools for rapid prototyping to accelerate the design iteration process. This allowed us to explore multiple design concepts quickly, validate ideas faster, and iterate based on feedback without extensive manual work. The approach reduced initial design exploration time by approximately 40%, enabling more time for refinement and user testing.'
        },
        {
          decision: 'Analytics-First Design Strategy',
          reasoning: 'Prioritized data-driven design decisions by integrating analytics insights at every stage of the design process. This approach ensured that design choices were backed by user behavior data, leading to more effective solutions that addressed real user needs and business objectives.'
        },
        {
          decision: 'Close Engineering Collaboration',
          reasoning: 'Established a collaborative workflow with engineering teams from the early stages, ensuring design feasibility and technical alignment. By providing detailed specifications and maintaining regular communication, we reduced implementation friction and improved the quality of the final product.'
        },
        {
          decision: 'Component-Based Design System Approach',
          reasoning: 'Focused on building and maintaining a consistent design system with reusable components. This approach ensured visual and functional consistency across all touchpoints while improving design efficiency and reducing development time.'
        }
      ],
      userResearch: [
        {
          insight: 'Navigation Complexity',
          finding: 'User research revealed that customers struggled with finding products across multiple categories, leading to increased bounce rates and decreased conversion.',
          impact: 'This insight informed the redesign of the navigation system, focusing on clearer categorization and improved search functionality.'
        },
        {
          insight: 'Checkout Friction',
          finding: 'Analytics data showed that users were abandoning carts at specific steps in the checkout process, particularly during payment and delivery option selection.',
          impact: 'Redesigned the checkout flow to reduce steps and simplify decision-making, resulting in improved completion rates.'
        },
        {
          insight: 'Mobile-First Behavior',
          finding: 'Research indicated that a significant portion of Canadian users primarily accessed IKEA through mobile devices, with different interaction patterns compared to desktop users.',
          impact: 'Prioritized mobile experience optimization, ensuring touch-friendly interfaces and streamlined mobile navigation.'
        }
      ],
      designSystem: {
        description: 'Contributed to IKEA\'s Skapa design system by creating and documenting reusable components, establishing design patterns, and ensuring consistency across web and app platforms. Worked closely with CoE teams to maintain design standards and improve component library usability.',
        components: [
          'Navigation components and patterns',
          'Product card and merchandising components',
          'Checkout flow components',
          'Form elements and input patterns',
          'Button and CTA components',
          'Layout and grid systems'
        ]
      },
      process: [
        'Implemented Product UX and Design strategy for assigned products to deliver excellent IKEA digital experiences',
        'Produced comprehensive design deliverables including wireframes, prototypes, and design specifications',
        'Contributed to product UX vision and collaborated with peer product team members to drive understanding',
        'Executed iterative user research methodologies to cultivate deep understanding of user needs and behaviors',
        'Actively participated in agile ceremonies (sprints, standups, retrospectives) to drive iterative product development',
        'Collaborated with CoE (Center of Excellence) teams to ensure high-quality deliverables and leverage their expertise',
        'Contributed insights as subject matter expert in brainstorming sessions, design sprints, and human-centred design workshops',
        'Leveraged GenAI tools for rapid prototyping and concept validation, accelerating the design iteration process',
        'Worked closely with engineering teams to ensure design feasibility and provide detailed technical specifications',
        'Used analytics and data insights to inform design decisions and optimize user experiences',
        'Focused on key touchpoints: merchandising interfaces, checkout flows, navigation systems, and homepage experiences',
        'Maintained consistency with IKEA design system and brand guidelines across all deliverables'
      ],
      processVisuals: [
        '/projects/ikea-digital-experience/process1.jpg',
        '/projects/ikea-digital-experience/process2.jpg',
        '/projects/ikea-digital-experience/process3.jpg',
        '/projects/ikea-digital-experience/process4.jpg'
      ],
      results: [
        {
          metric: 'Design Iteration Speed',
          value: '40% faster',
          description: 'Accelerated design iteration process through GenAI-driven prototyping approach'
        },
        {
          metric: 'User Experience',
          value: 'Improved',
          description: 'Enhanced user experience across critical touchpoints including checkout, navigation, and homepage'
        },
        {
          metric: 'Team Collaboration',
          value: 'Enhanced',
          description: 'Improved collaboration between design and engineering teams through detailed specifications and regular communication'
        },
        {
          metric: 'Design Quality',
          value: 'Maintained',
          description: 'Maintained high-quality design deliverables through collaboration with CoE teams'
        },
        {
          metric: 'Market Launch',
          value: 'Successful',
          description: 'Successfully delivered digital experiences across IKEA web and app for Canadian market'
        }
      ],
      lessonsLearned: [
        'GenAI tools significantly accelerate the prototyping phase, but human judgment and user research remain crucial for making final design decisions.',
        'Early collaboration with engineering teams prevents rework and ensures smoother implementation.',
        'Analytics data provides valuable insights, but combining quantitative data with qualitative user research yields the best results.',
        'Maintaining a consistent design system requires ongoing effort but pays dividends in efficiency and user experience consistency.',
        'Agile ceremonies and cross-functional collaboration are essential for aligning product vision and ensuring successful delivery.'
      ],
      images: [
        '/projects/ikea-digital-experience/IKEA.png',
        '/projects/ikea-digital-experience/IKEA-1.png',
        '/projects/ikea-digital-experience/IKEA-2.png',
        '/projects/ikea-digital-experience/IKEA-3.png',
        '/projects/ikea-digital-experience/IKEA-comfortguide-0.png',
        '/projects/ikea-digital-experience/IKEA-comfortguide-1.png',
        '/projects/ikea-digital-experience/IKEA-comfortguide-2.png',
        '/projects/ikea-digital-experience/IKEA-comfortguide-3.png',
      ]
    }
  },
  {
    id: 3,
    title: 'Be Here Streaming Platform',
    category: 'Web App & Mobile',
    description: 'Designed and developed a comprehensive streaming platform with real-time video/audio streaming, live chat, and clip creation. Focused on creating intuitive interfaces for content creators and viewers across web and native iOS/Android apps.',
    tags: ['Next.js', 'React', 'TypeScript', 'Figma', 'Cursor'],
    year: '2025',
    number: '03',
    link: 'https://www.thebehere.com/',
    caseStudy: '/case-study/be-here-streaming-platform',
    image: '/projects/be-here/Be-here.png',
    caseStudyContent: {
      overview: 'Be Here is a comprehensive streaming platform that enables real-time video and audio streaming with live chat, clip creation, and social features. As both designer and developer, I focused on creating intuitive, user-centered interfaces that make streaming accessible for content creators while providing an engaging viewing experience. The platform is available as a web application built with Next.js and native iOS/Android mobile apps, ensuring a seamless experience across all devices.',
      myRole: 'Product Designer & Developer',
      roleDescription: 'I served as both the lead designer and developer for Be Here, taking a holistic approach to product creation. On the design side, I focused on user experience research, interface design, interaction patterns, and visual design systems. I designed user flows for streaming setup, live interaction features, clip creation workflows, and cross-platform experiences. As a developer, I implemented these designs using Next.js, React, and TypeScript, ensuring pixel-perfect execution while maintaining design consistency across web and mobile platforms.',
      challenge: 'Designing and building a streaming platform that feels intuitive for both content creators and viewers presented unique UX challenges. Creators needed simple, non-intimidating tools to start streaming, while viewers required engaging interfaces for discovery, interaction, and content consumption. The challenge was creating a cohesive design system that works seamlessly across web and mobile, handles real-time interactions gracefully, and makes complex technical features (like clip creation and streaming setup) feel approachable. Additionally, designing for varying network conditions and device capabilities required thoughtful progressive enhancement and responsive design strategies.',
      solution: 'I took a design-first approach, starting with user research and wireframing to understand user needs and pain points. I designed a clean, modern interface that prioritizes content and reduces cognitive load. For creators, I created streamlined onboarding flows and simplified streaming controls. For viewers, I designed engaging discovery interfaces, intuitive chat interactions, and seamless clip browsing. The design system emphasizes clarity, accessibility, and visual hierarchy. Technically, I implemented these designs using Next.js 14 with App Router, React, and TypeScript, ensuring type safety and maintainability. I used Tailwind CSS for consistent styling, integrated LiveKit for real-time streaming, and built responsive components that adapt beautifully across devices.',
      keyDecisions: [
        {
          decision: 'Minimalist Interface Design',
          reasoning: 'Chose a clean, minimalist design approach that puts content first. By reducing visual clutter and focusing on essential features, we created an interface that feels approachable for new users while remaining powerful for experienced creators. This design decision significantly improved user onboarding time and reduced cognitive load during live streaming sessions.'
        },
        {
          decision: 'Progressive Disclosure for Streaming Setup',
          reasoning: 'Designed a step-by-step streaming setup flow that reveals complexity gradually. Instead of overwhelming users with all options at once, we broke the setup into clear stages with contextual help. This approach reduced setup abandonment rates and made streaming accessible to users with varying technical expertise.'
        },
        {
          decision: 'Real-time Chat as Primary Interaction',
          reasoning: 'Elevated live chat to a primary interaction point, designing it as a core feature rather than an add-on. Created a chat interface that feels natural and responsive, with clear visual feedback for message delivery and read states. This design decision fostered stronger community engagement and increased average session duration.'
        },
        {
          decision: 'Cross-platform Design Consistency',
          reasoning: 'Established a unified design system that maintains visual and interaction consistency across web, iOS, and Android while respecting platform conventions. Used shared component libraries and design tokens to ensure cohesive experiences while leveraging platform-specific patterns where appropriate. This approach reduced design and development time while improving user familiarity across platforms.'
        }
      ],
      userResearch: [
        {
          insight: 'Creator Onboarding Friction',
          finding: 'Initial user testing revealed that potential creators were intimidated by complex streaming setup processes, leading to high drop-off rates during onboarding.',
          impact: 'Redesigned the onboarding flow with progressive disclosure, clear visual guidance, and simplified technical language. This reduced onboarding abandonment by 60% and increased successful first streams.'
        },
        {
          insight: 'Viewer Engagement Patterns',
          finding: 'Analytics showed that viewers who actively participated in chat had 3x longer session durations and higher return rates compared to passive viewers.',
          impact: 'Redesigned the chat interface to be more prominent and engaging, added visual cues for active conversations, and created features that encourage participation. This increased chat participation by 45% and improved overall engagement metrics.'
        },
        {
          insight: 'Mobile-First Streaming Behavior',
          finding: 'Research indicated that a significant portion of users primarily consume content on mobile devices, with different interaction patterns and expectations compared to desktop.',
          impact: 'Prioritized mobile experience design, creating touch-optimized interfaces, simplified navigation patterns, and ensuring critical features work seamlessly on smaller screens. This resulted in mobile engagement rates matching desktop levels.'
        }
      ],
      designSystem: {
        description: 'Created a comprehensive design system for Be Here that ensures consistency across web and mobile platforms. The system includes reusable components, design tokens for colors, typography, and spacing, and clear guidelines for interaction patterns. This design system enabled rapid iteration while maintaining visual consistency and improved collaboration between design and development.',
        components: [
          'Streaming player and controls',
          'Live chat interface components',
          'Clip creation and editing UI',
          'Navigation and discovery patterns',
          'User profile and settings interfaces',
          'Responsive layout systems',
          'Loading and error states',
          'Real-time notification components'
        ]
      },
      process: [
        'Conducted user research to understand creator and viewer needs, pain points, and behaviors',
        'Created user personas and journey maps for different user types (creators, viewers, moderators)',
        'Designed wireframes and low-fidelity prototypes for key user flows',
        'Developed a comprehensive design system with reusable components and design tokens',
        'Created high-fidelity mockups for web and mobile interfaces',
        'Designed interaction patterns for real-time features (chat, streaming controls, notifications)',
        'Built interactive prototypes to test and validate design concepts',
        'Implemented designs using Next.js, React, and TypeScript with pixel-perfect attention to detail',
        'Developed responsive components that adapt beautifully across devices',
        'Created cross-platform experiences maintaining design consistency while respecting platform conventions',
        'Conducted usability testing and iterated based on user feedback',
        'Optimized interfaces for performance and accessibility',
        'Collaborated closely with backend developers to ensure seamless integration of design and functionality'
      ],
      results: [
        {
          metric: 'Weekly Downloads',
          value: '400+',
          description: 'Over 400 weekly downloads since launching in November 2025'
        },
        {
          metric: 'Active Users',
          value: '350+',
          description: 'Currently 350 active users since launching in November 2025'
        },
        {
          metric: 'Cross-platform Launch',
          value: 'Successful',
          description: 'Successfully launched on web, iOS, and Android with consistent design experience'
        },
        {
          metric: 'User Feedback',
          value: 'Positive',
          description: 'Positive user feedback on interface clarity, ease of use, and overall experience'
        }
      ],
      lessonsLearned: [
        'Designing for real-time interactions requires careful consideration of loading states, error handling, and feedback mechanisms to maintain user trust.',
        'Progressive disclosure is crucial for complex features like streaming setup—revealing complexity gradually improves user confidence and completion rates.',
        'Cross-platform design consistency improves user familiarity, but respecting platform conventions enhances native feel and user satisfaction.',
        'User research and testing at every stage prevents costly redesigns and ensures designs solve real user problems.',
        'A well-documented design system accelerates both design and development while maintaining visual consistency.',
        'Balancing design aesthetics with technical constraints requires close collaboration between design and development roles.'
      ],
      images: [
        '/projects/be-here/Be-here.png',
        '/projects/be-here/Be-here-1.png',
        '/projects/be-here/Be-here-2.png',
        '/projects/be-here/Be-here-3.png',
        '/projects/be-here/Be-here-4.png',
      ]
    }
  },
  {
    id: 4,
    title: 'Grand Lighting',
    category: 'E-commerce Website',
    description: 'E-commerce platform with automated product management system. Built with WordPress and WooCommerce, featuring LLM-powered automation for product data processing and CIN7 ERP integration.',
    tags: ['WordPress', 'WooCommerce', 'Python', 'JavaScript'],
    year: '2024',
    number: '04',
    link: 'https://www.grandlighting.ca/',
    caseStudy: '/case-study/grand-lighting',
    image: '/projects/grand-lighting/GL.png',
    caseStudyContent: {
      overview: 'Grand Lighting is a comprehensive e-commerce platform specializing in premium lighting solutions. The project involved both web development work on the WordPress/WooCommerce site and the creation of an innovative automation system that streamlines product data management using LLM technology and Python.',
      challenge: 'The client needed an efficient way to manage thousands of product entries from multiple vendors. Manual product entry was time-consuming and error-prone. The challenge was to automate the process of extracting product data from vendor sources, refining and enhancing product attributes, and seamlessly integrating with their CIN7 ERP system while maintaining data accuracy and quality.',
      solution: 'Developed a custom automation system using Python and LLM libraries to extract, process, and enhance product data from vendor sources. The system intelligently refines product attributes, standardizes formatting, and prepares data for CIN7 ERP integration. Built the e-commerce website using WordPress and WooCommerce with custom HTML, CSS, and JavaScript for enhanced functionality and user experience.',
      process: [
        'Developed WordPress/WooCommerce e-commerce website with custom HTML, CSS, and JavaScript',
        'Designed and implemented custom automation system architecture',
        'Integrated LLM libraries for intelligent product data extraction and processing',
        'Built Python scripts to fetch product data from vendor sources',
        'Created data refinement algorithms to enhance and standardize product attributes',
        'Developed CIN7 ERP integration for seamless product data synchronization',
        'Implemented error handling and data validation processes',
        'Optimized automation workflows for efficiency and accuracy',
        'Conducted testing and quality assurance for both web platform and automation system',
        'Deployed and monitored automation system performance'
      ],
      results: [
        'Successfully launched e-commerce platform at grandlighting.ca',
        'Significantly reduced manual product entry time through automation',
        'Improved data accuracy and consistency across product catalog',
        'Streamlined integration with CIN7 ERP system',
        'Enhanced product data quality with LLM-powered refinement',
        'Scalable automation system handling thousands of products'
      ],
      images: [
        '/projects/grand-lighting/GL.png',
        '/projects/grand-lighting/GL-1.png',
        '/projects/grand-lighting/GL-2.png',
        '/projects/grand-lighting/GL-3.png',
        '/projects/grand-lighting/GL-4.png',
        '/projects/grand-lighting/GL-5.png',
      ]
    }
  },
  {
    id: 5,
    title: 'x402 React Component Library',
    category: 'Open Source Library',
    description: 'A React component library for Coinbase x402 payments. Enables seamless integration of HTTP 402 payment protocol for micropayments, API monetization, and on-chain payments with USDC.',
    tags: ['React', 'TypeScript', 'Coinbase x402', 'Web3'],
    year: '2025',
    number: '05',
    link: 'https://x402-react.vercel.app/',
    caseStudy: '/case-study/x402-react-library',
    image: '/projects/x402/x402.png',
    caseStudyContent: {
      overview: 'x402 React is an open-source React component library that simplifies integration of Coinbase x402 payment protocol into web applications. The library enables developers to easily implement HTTP 402 payments for micropayments, API monetization, and on-chain USDC transactions with a simple, declarative API.',
      challenge: 'The Coinbase x402 protocol is powerful but requires complex integration work. Developers need to handle payment requests, manage payment state, handle network switching, and integrate with facilitators. The challenge was to create a developer-friendly React library that abstracts away this complexity while maintaining flexibility and type safety.',
      solution: 'Built a comprehensive React component library using TypeScript for full type safety. Created reusable components like X402Button, X402Provider, and custom hooks like useX402Payment for programmatic payments. The library handles payment state management, network switching (Base, Solana), payment retry logic, and provides excellent developer experience with comprehensive documentation and examples.',
      process: [
        'Researched Coinbase x402 protocol and HTTP 402 payment flow',
        'Designed component API with TypeScript for type safety',
        'Built X402Provider context for global payment state management',
        'Created X402Button component with customizable payment flows',
        'Implemented useX402Payment hook for programmatic payments',
        'Added support for multiple networks (Base, Solana)',
        'Built payment retry logic and error handling',
        'Created comprehensive documentation and examples',
        'Published to npm and deployed demo site to Vercel',
        'Open-sourced on GitHub for community contributions'
      ],
      results: [
        'Successfully published open-source React library',
        'Simplified x402 integration for React developers',
        'Type-safe API with full TypeScript support',
        'Comprehensive documentation and live examples',
        'Support for multiple blockchain networks',
        'Active development and community engagement',
        'Available on npm for easy installation',
        'Live demo site showcasing all features'
      ],
      images: [
        '/projects/x402/x402.png',
        '/projects/x402/x402-1.png',
        '/projects/x402/x402-2.png',
      ]
    }
  },
  {
    id: 6,
    title: 'IKEA Visual Design & Motion Media',
    category: 'Visual Design & Motion Graphics',
    description: 'Created visual concepts and motion media for IKEA in-store communication, marketing campaigns, and retail design. Designed graphics for offers, seasonal campaigns, and developed new content formats to reach customers effectively.',
    tags: ['Adobe After Effects', 'Adobe', 'Photoshop', 'Illustrator', 'InDesign'],
    year: '2019 — 2022',
    number: '06',
    disabled: true,
    link: 'https://www.ikea.com/ca/en/',
    caseStudy: '/case-study/ikea-visual-design',
    image: '/projects/ikea-visual-design/ikea-visual-design.png',
    caseStudyContent: {
      overview: 'As Visual Designer at IKEA, I created compelling visual concepts and motion media to communicate ideas that inspire, inform, and captivate consumers. My work focused on in-store communication solutions, marketing campaigns, seasonal offers, and retail design messaging. I developed graphics for home furnishing offers, created motion media for stores, and drove innovation in content formats to reach users effectively across print and digital channels.',
      myRole: 'Visual Designer',
      roleDescription: 'I was responsible for creating visual concepts and motion media that communicate IKEA\'s brand messages and product offerings. My role encompassed designing in-store solutions, developing graphics for marketing campaigns, creating motion media using After Effects, writing content for awareness-creating outreach, and ensuring all visual communications met IKEA\'s brand standards. I collaborated closely with Learning Designers, worked across functions within INGKA Group, and maintained consistency across all visual touchpoints.',
      challenge: 'Creating effective visual communication for IKEA\'s diverse in-store and marketing needs required balancing brand consistency with creative innovation. The challenge involved developing graphics that clearly communicate home furnishing offers, designing motion media that engages customers in-store, and creating content formats that effectively reach and inspire consumers. Additionally, ensuring all visual materials met Inter IKEA Systems communication standards while maintaining clarity, consistency, and credibility across print and digital publications was crucial.',
      solution: 'I developed a comprehensive visual design approach that combined creative concept development with brand consistency. I created visual concepts that effectively communicate product offers and retail design messages, using strategic color selection, typography, and layout to guide customer attention. For motion media, I leveraged After Effects to create engaging animations and video content for in-store displays. I wrote and edited content for blog posts and news articles, ensuring clarity and brand alignment. I developed new content formats and innovative ways to reach users, collaborating across functions to ensure cohesive visual communication. All designs maintained IKEA\'s brand standards while improving readability and visual impact.',
      keyDecisions: [
        {
          decision: 'Motion Media as Primary In-Store Tool',
          reasoning: 'Chose to prioritize motion media creation using After Effects for in-store communication, recognizing that animated content captures attention more effectively than static graphics in retail environments. This approach increased customer engagement with promotional offers and brand messages, creating a more dynamic shopping experience.'
        },
        {
          decision: 'Content-Driven Visual Design',
          reasoning: 'Integrated content writing and visual design to create cohesive communication materials. By writing blog posts, news articles, and marketing copy alongside visual creation, I ensured that messaging and visuals worked together harmoniously, resulting in more effective and consistent brand communication.'
        },
        {
          decision: 'Brand Standards as Foundation',
          reasoning: 'Established strict adherence to Inter IKEA Systems communication standards as the foundation for all visual work. This ensured consistency, credibility, and clarity across all touchpoints while maintaining IKEA\'s brand identity. The focus on correct spelling, grammar, layout, and terminology improved readability and professional presentation.'
        },
        {
          decision: 'Innovation in Content Formats',
          reasoning: 'Drove development of new content formats and innovative ways to reach users, recognizing that evolving customer behaviors require fresh approaches to visual communication. This forward-thinking approach kept IKEA\'s visual communication relevant and engaging while exploring new channels and formats.'
        }
      ],
      userResearch: [
        {
          insight: 'In-Store Visual Engagement',
          finding: 'Research showed that motion media and dynamic visuals significantly increased customer engagement with promotional offers and product information in-store compared to static signage.',
          impact: 'Prioritized motion media creation using After Effects, developing animated content for in-store displays that captured attention and improved information retention.'
        },
        {
          insight: 'Content Clarity and Readability',
          finding: 'Customer feedback indicated that clear, well-structured visual communication with proper typography and layout improved understanding of offers and product information.',
          impact: 'Focused on improving readability through correct spelling, grammar, layout, and strategic use of words and terms, ensuring all visual materials were clear and accessible.'
        },
        {
          insight: 'Multi-Channel Consistency',
          finding: 'Customers expected consistent visual language across print, digital, and in-store touchpoints, reinforcing brand trust and recognition.',
          impact: 'Developed a unified visual approach that maintained consistency across all channels while respecting the unique requirements of each medium.'
        }
      ],
      designSystem: {
        description: 'Worked within IKEA\'s established brand guidelines and Inter IKEA Systems communication standards to create consistent visual communications. Ensured all designs maintained brand identity while adapting to various formats including print publications, digital content, in-store displays, and motion media.',
        components: [
          'Marketing campaign graphics and layouts',
          'In-store communication materials',
          'Motion media templates and animations',
          'Print and digital publication designs',
          'Seasonal campaign visual assets',
          'Product offer graphics and illustrations',
          'Content format templates',
          'Brand guideline documentation'
        ]
      },
      process: [
        'Created visual concepts to communicate ideas that inspire, inform, and captivate consumers',
        'Wrote content for awareness-creating outreach including blog posts and news articles',
        'Designed images that identify home furnishing offers and convey retail design messages',
        'Developed graphics for illustrations regarding product offers and campaigns',
        'Selected colors, images, text style, and layout to create effective visual communication',
        'Drove and developed new content formats and innovative ways to reach users',
        'Created motion media using After Effects for in-store displays and marketing campaigns',
        'Edited print and digital publications to ensure Inter IKEA Systems communication standards',
        'Ensured clarity, consistency, and credibility across all visual materials',
        'Improved readability through correct spelling, grammar, layout, and terminology',
        'Supported development of learning content in collaboration with Learning Designers',
        'Worked across functions within INGKA Group and collaborated with other IKEA businesses',
        'Maintained brand consistency while exploring creative visual solutions'
      ],
      processVisuals: [
        '/projects/ikea-visual-design/process-wireframes.png',
        '/projects/ikea-visual-design/process-user-flow.png',
        '/projects/ikea-visual-design/process-iterations.png',
        '/projects/ikea-visual-design/process-prototypes.png'
      ],
      results: [
        {
          metric: 'Visual Communication',
          value: 'Effective',
          description: 'Successfully created visual concepts and motion media that effectively communicate IKEA\'s brand messages and product offers'
        },
        {
          metric: 'Brand Consistency',
          value: 'Maintained',
          description: 'Ensured all visual materials met Inter IKEA Systems communication standards while maintaining brand identity'
        },
        {
          metric: 'Content Innovation',
          value: 'Developed',
          description: 'Drove development of new content formats and innovative approaches to reach and engage customers'
        },
        {
          metric: 'Cross-Functional Collaboration',
          value: 'Successful',
          description: 'Worked effectively across functions within INGKA Group and collaborated with Learning Designers and other IKEA businesses'
        }
      ],
      lessonsLearned: [
        'Motion media significantly enhances in-store engagement compared to static visuals, making After Effects an essential tool for retail communication.',
        'Integrating content writing with visual design creates more cohesive and effective brand communication.',
        'Maintaining strict adherence to brand standards ensures consistency while still allowing for creative expression.',
        'Collaboration across functions is essential for creating unified visual experiences that align with business objectives.',
        'Innovation in content formats keeps brand communication relevant and engaging in an evolving media landscape.',
        'Clear, well-structured visual communication with proper typography and layout improves customer understanding and engagement.'
      ],
      images: [
        '/projects/ikea-visual-design/ikea-visual-design.png',
        '/projects/ikea-visual-design/ikea-visual-design-1.png',
        '/projects/ikea-visual-design/ikea-visual-design-2.png',
        '/projects/ikea-visual-design/ikea-visual-design-3.png',
        '/projects/ikea-visual-design/ikea-visual-design-4.png',
      ]
    }
  },
]

// Helper function to encode image paths with spaces
const encodeImagePath = (path) => {
  // Split path into directory and filename
  const lastSlash = path.lastIndexOf('/')
  if (lastSlash === -1) return path.replace(/\s/g, '%20')
  
  const dir = path.substring(0, lastSlash + 1)
  const filename = path.substring(lastSlash + 1)
  // Only encode spaces in the filename, keep the path structure intact
  return dir + filename.replace(/\s/g, '%20')
}

export default function CaseStudy() {
  const { slug } = useParams()
  const project = projects.find(p => p.caseStudy === `/case-study/${slug}`)
  const [selectedImage, setSelectedImage] = useState(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const caseStudyContent = project?.caseStudyContent

  // Enable smooth scroll
  useSmoothScroll()

  // Scroll to top when component mounts or slug changes
  useEffect(() => {
    const lenis = getLenisInstance()
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
    // Reset slideshow when project changes
    setCurrentSlide(0)
  }, [slug])

  // Close modal on ESC key and handle slideshow navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedImage(null)
      }
      // Arrow key navigation for slideshow
      if (caseStudyContent?.images && caseStudyContent.images.length > 0) {
        if (e.key === 'ArrowLeft') {
          setCurrentSlide((prev) => (prev === 0 ? caseStudyContent.images.length - 1 : prev - 1))
        } else if (e.key === 'ArrowRight') {
          setCurrentSlide((prev) => (prev === caseStudyContent.images.length - 1 ? 0 : prev + 1))
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    if (selectedImage) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [selectedImage, caseStudyContent?.images])

  if (!project) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="flex items-center justify-center min-h-screen px-6 pt-16">
          <div className="text-center">
            <h1 className="text-4xl font-medium mb-4">Case Study Not Found</h1>
            <p className="text-gray-600 mb-8">The case study you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <Navigation />

      <main className="relative pt-16">
        {/* Hero Section */}
        <section className="py-16 sm:py-24 px-6 sm:px-8 lg:px-12 border-b border-gray-200">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Hero Image */}
              {project.image && (
                <div className="mb-8 -mx-6 sm:-mx-8 lg:-mx-12">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-[400px] sm:h-[500px] object-cover"
                  />
                </div>
              )}
              <div className="flex items-center gap-3 text-xs text-gray-500 uppercase tracking-wider mb-6">
                <span>{project.category}</span>
                <span>•</span>
                <span>{project.year}</span>
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight mb-6 leading-[1.1]">
                {project.title}
              </h1>
              <p className="text-xl sm:text-2xl text-gray-600 leading-relaxed mb-8">
                {caseStudyContent.overview}
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                {project.tags.map((tag) => (
                  <TechLogo key={tag} techName={tag} />
                ))}
              </div>
              {project.link && (
                <div className="flex flex-wrap gap-4">
                  <Button asChild>
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      View Live Project
                    </a>
                  </Button>
                  {project.id === 2 && (
                    <Button asChild variant="outline">
                      <a href="https://apps.apple.com/ca/app/be-here/id6753854189" target="_blank" rel="noopener noreferrer">
                        iOS App
                      </a>
                    </Button>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* My Role Section */}
        {caseStudyContent.myRole && (
          <section className="py-16 sm:py-24 px-6 sm:px-8 lg:px-12 border-b border-gray-200 bg-gray-50">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h2 className="text-3xl sm:text-4xl font-serif font-medium mb-4 tracking-tight">My Role</h2>
                <div className="mb-4">
                  <span className="text-xl font-medium text-black">{caseStudyContent.myRole}</span>
                </div>
                {caseStudyContent.roleDescription && (
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {caseStudyContent.roleDescription}
                  </p>
                )}
              </motion.div>
            </div>
          </section>
        )}

        {/* Challenge Section */}
        <section className="py-16 sm:py-24 px-6 sm:px-8 lg:px-12 border-b border-gray-200">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <h2 className="text-3xl sm:text-4xl font-serif font-medium mb-6 tracking-tight">The Challenge</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {caseStudyContent.challenge}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="py-16 sm:py-24 px-6 sm:px-8 lg:px-12 border-b border-gray-200 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl sm:text-4xl font-serif font-medium mb-6 tracking-tight">The Solution</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {caseStudyContent.solution}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Key Design Decisions Section */}
        {caseStudyContent.keyDecisions && caseStudyContent.keyDecisions.length > 0 && (
          <section className="py-16 sm:py-24 px-6 sm:px-8 lg:px-12 border-b border-gray-200">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
              >
                <h2 className="text-3xl sm:text-4xl font-serif font-medium mb-8 tracking-tight">Key Design Decisions</h2>
                <div className="space-y-8">
                  {caseStudyContent.keyDecisions.map((decision, index) => (
                    <div key={index} className="border-l-2 border-gray-300 pl-6">
                      <h3 className="text-xl font-medium text-black mb-2">{decision.decision}</h3>
                      <p className="text-lg text-gray-700 leading-relaxed">{decision.reasoning}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* User Research Insights Section */}
        {caseStudyContent.userResearch && caseStudyContent.userResearch.length > 0 && (
          <section className="py-16 sm:py-24 px-6 sm:px-8 lg:px-12 border-b border-gray-200 bg-gray-50">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h2 className="text-3xl sm:text-4xl font-serif font-medium mb-8 tracking-tight">User Research Insights</h2>
                <div className="space-y-8">
                  {caseStudyContent.userResearch.map((insight, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg border border-gray-200">
                      <h3 className="text-xl font-medium text-black mb-2">{insight.insight}</h3>
                      <p className="text-lg text-gray-700 mb-3 leading-relaxed">
                        <span className="font-medium">Finding: </span>{insight.finding}
                      </p>
                      <p className="text-lg text-gray-700 leading-relaxed">
                        <span className="font-medium">Impact: </span>{insight.impact}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Design System Section */}
        {caseStudyContent.designSystem && (
          <section className="py-16 sm:py-24 px-6 sm:px-8 lg:px-12 border-b border-gray-200">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
              >
                <h2 className="text-3xl sm:text-4xl font-serif font-medium mb-6 tracking-tight">Design System</h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  {caseStudyContent.designSystem.description}
                </p>
                {caseStudyContent.designSystem.components && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {caseStudyContent.designSystem.components.map((component, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-2 h-2 rounded-full bg-black" />
                        <span className="text-base text-gray-700">{component}</span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          </section>
        )}

        {/* Process Section */}
        <section className="py-16 sm:py-24 px-6 sm:px-8 lg:px-12 border-b border-gray-200 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-3xl sm:text-4xl font-serif font-medium mb-8 tracking-tight">Process</h2>
              <ol className="space-y-6">
                {caseStudyContent.process.map((step, index) => (
                  <li key={index} className="flex gap-6">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-sm font-medium text-gray-600">
                      {index + 1}
                    </div>
                    <p className="text-lg text-gray-700 leading-relaxed pt-1">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
            </motion.div>
          </div>
        </section>

        {/* Process Visuals Section */}
        {caseStudyContent.processVisuals && caseStudyContent.processVisuals.length > 0 && (
          <section className="py-16 sm:py-24 px-6 sm:px-8 lg:px-12 border-b border-gray-200">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
              >
                <h2 className="text-3xl sm:text-4xl font-serif font-medium mb-8 sm:mb-12 tracking-tight">Process Visuals</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {caseStudyContent.processVisuals.map((image, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                      className="relative overflow-hidden rounded-sm border border-gray-200 hover:border-gray-300 transition-colors group cursor-pointer"
                      onClick={() => setSelectedImage(image)}
                    >
                      <div className="relative w-full aspect-video overflow-hidden bg-gray-100">
                        <img
                          src={image}
                          alt={`${project.title} process visual ${index + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            e.target.style.display = 'none'
                            e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-gray-400 text-sm">Placeholder Image</div>'
                          }}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Results Section */}
        <section className="py-16 sm:py-24 px-6 sm:px-8 lg:px-12 border-b border-gray-200 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h2 className="text-3xl sm:text-4xl font-serif font-medium mb-8 tracking-tight">Results</h2>
              {Array.isArray(caseStudyContent.results) && caseStudyContent.results.length > 0 && (
                <>
                  {typeof caseStudyContent.results[0] === 'object' && caseStudyContent.results[0].metric ? (
                    // New format with metrics
                    <div className="space-y-6">
                      {caseStudyContent.results.map((result, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg border border-gray-200">
                          <div className="flex items-baseline gap-4 mb-2">
                            <span className="text-2xl sm:text-3xl font-medium text-black">{result.value}</span>
                            <span className="text-lg font-medium text-gray-600">{result.metric}</span>
                          </div>
                          <p className="text-base text-gray-700 leading-relaxed">{result.description}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    // Legacy format (array of strings)
                    <ul className="space-y-4">
                      {caseStudyContent.results.map((result, index) => (
                        <li key={index} className="flex gap-4">
                          <div className="flex-shrink-0 w-2 h-2 rounded-full bg-black mt-2.5" />
                          <p className="text-lg text-gray-700 leading-relaxed">
                            {result}
                          </p>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}
            </motion.div>
          </div>
        </section>

        {/* Lessons Learned Section */}
        {caseStudyContent.lessonsLearned && caseStudyContent.lessonsLearned.length > 0 && (
          <section className="py-16 sm:py-24 px-6 sm:px-8 lg:px-12 border-b border-gray-200">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}
              >
                <h2 className="text-3xl sm:text-4xl font-serif font-medium mb-8 tracking-tight">Lessons Learned</h2>
                <div className="space-y-4">
                  {caseStudyContent.lessonsLearned.map((lesson, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-2 h-2 rounded-full bg-black mt-2.5" />
                      <p className="text-lg text-gray-700 leading-relaxed">
                        {lesson}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Preview Images Slideshow */}
        {caseStudyContent.images && caseStudyContent.images.length > 0 && (
          <section className="py-16 sm:py-24 px-6 sm:px-8 lg:px-12 border-b border-gray-200">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <h2 className="text-3xl sm:text-4xl font-serif font-medium mb-8 sm:mb-12 tracking-tight">Project Preview</h2>
                
                {/* Slideshow Container */}
                <div className="relative">
                  {/* Main Image Display */}
                  <div className="relative w-full aspect-video sm:aspect-[16/10] overflow-hidden rounded-sm border border-gray-200 bg-gray-50 mb-6">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="relative w-full h-full cursor-pointer"
                        onClick={() => setSelectedImage(encodeImagePath(caseStudyContent.images[currentSlide]))}
                      >
                        <img
                          src={encodeImagePath(caseStudyContent.images[currentSlide])}
                          alt={`${project.title} preview ${currentSlide + 1}`}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            // Try original path if encoded fails
                            const original = caseStudyContent.images[currentSlide]
                            if (e.target.src !== original) {
                              e.target.src = original
                            }
                          }}
                        />
                        <div className="absolute inset-0 bg-black/0 hover:bg-black/5 transition-colors duration-300" />
                      </motion.div>
                    </AnimatePresence>

                    {/* Navigation Arrows */}
                    {caseStudyContent.images.length > 1 && (
                      <>
                        <button
                          onClick={() => setCurrentSlide((prev) => (prev === 0 ? caseStudyContent.images.length - 1 : prev - 1))}
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white border border-gray-200 flex items-center justify-center transition-all shadow-sm hover:shadow-md z-10"
                          aria-label="Previous image"
                        >
                          <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button
                          onClick={() => setCurrentSlide((prev) => (prev === caseStudyContent.images.length - 1 ? 0 : prev + 1))}
                          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white border border-gray-200 flex items-center justify-center transition-all shadow-sm hover:shadow-md z-10"
                          aria-label="Next image"
                        >
                          <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </>
                    )}
                  </div>

                  {/* Thumbnail Strip */}
                  {caseStudyContent.images.length > 1 && (
                    <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide">
                      {caseStudyContent.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentSlide(index)}
                          className={`flex-shrink-0 relative w-20 h-20 sm:w-24 sm:h-24 overflow-hidden rounded-sm border-2 transition-all ${
                            currentSlide === index
                              ? 'border-black scale-105'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          aria-label={`Go to slide ${index + 1}`}
                        >
                          <img
                            src={encodeImagePath(image)}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // Try original path if encoded fails
                              if (e.target.src !== image) {
                                e.target.src = image
                              }
                            }}
                          />
                          {currentSlide === index && (
                            <div className="absolute inset-0 bg-black/10" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Slide Counter */}
                  {caseStudyContent.images.length > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500">
                      <span>{currentSlide + 1}</span>
                      <span>/</span>
                      <span>{caseStudyContent.images.length}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Navigation Footer */}
        <section className="py-16 sm:py-24 px-6 sm:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pt-8 border-t border-gray-200"
            >
              <Link
                to="/#work"
                className="text-lg text-gray-600 hover:text-black transition-colors"
              >
                ← Back to All Projects
              </Link>
              <Button asChild>
                <Link to="/#contact">Get in Touch</Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Image Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt={`${project.title} full preview`}
                className="max-w-full max-h-full object-contain rounded-sm"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-colors"
                aria-label="Close image"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />
    </div>
  )
}

