export interface FeatureSeoItem {
  id: string;
  slug: string;
  name: string;
  title: string;
  description: string;
  imageAlt: string;
  iconName: string;
  tagline: string;
  badge: string;
  overview: string;
  bulletPoints: string[];
  stats: { value: string; label: string }[];
  accentColor: string;
}

export const FEATURE_MODULES_SEO: FeatureSeoItem[] = [
  {
    id: "ai-talent-matching",
    slug: "/features/ai-talent-matching",
    name: "AI Talent Matching",
    title: "AI Talent Matching | Find Verified Freelance Experts Fast | Huzzler",
    description: "Huzzler's AI Talent Matching connects you with the most qualified freelance professionals in seconds. Smart algorithms analyze skills, experience, and fit to save you hours of manual searching.",
    imageAlt: "AI Talent Matching icon representing smart algorithm-based freelancer matching on Huzzler",
    iconName: "Bot",
    tagline: "Find the Right Freelancer in Seconds",
    badge: "Smart Algorithm Match",
    overview: "Our proprietary AI engine analyzes project briefs, required skill stacks, availability, and past project ratings to match you with top-tier verified professionals instantly.",
    bulletPoints: [
      "Matches freelancers based on 200+ skill and compatibility signals",
      "Instant matching algorithm saves up to 80% of hiring search time",
      "Filter talent by experience level, timezone, and availability",
      "Automated skill verification and past delivery score assessment"
    ],
    stats: [
      { value: "3s", label: "Average Match Time" },
      { value: "98%", label: "Match Satisfaction" },
      { value: "50K+", label: "Verified Experts" }
    ],
    accentColor: "#7C3AED"
  },
  {
    id: "project-marketplace",
    slug: "/features/project-marketplace",
    name: "Project Marketplace",
    title: "Project Marketplace | Browse Verified Freelance Experts | Huzzler",
    description: "Explore Huzzler's Project Marketplace featuring thousands of verified experts across every discipline. Post projects, compare talent, and hire with confidence.",
    imageAlt: "Project Marketplace icon representing browsing verified freelance experts on Huzzler",
    iconName: "Briefcase",
    tagline: "Discover Top Verified Professionals Worldwide",
    badge: "Global Talent Directory",
    overview: "Explore a curated marketplace of world-class freelancers across Design, Development, AI Engineering, Marketing, Copywriting, Video Production, and more.",
    bulletPoints: [
      "Comprehensive multi-category talent directory with live portfolios",
      "Transparent hourly and milestone rates with verified client reviews",
      "Detailed profile verification with ID and skill checkpoints",
      "Direct project bidding and instant talent invitation flows"
    ],
    stats: [
      { value: "120+", label: "Countries Represented" },
      { value: "15+", label: "Specialized Domains" },
      { value: "4.9★", label: "Average Client Rating" }
    ],
    accentColor: "#6366F1"
  },
  {
    id: "smart-proposals",
    slug: "/features/smart-proposals",
    name: "Smart Proposals",
    title: "Smart Proposals | AI-Powered Proposal Generator | Huzzler",
    description: "Huzzler's Smart Proposals uses AI to craft winning pitches in seconds. Turn project briefs into polished, persuasive proposals without the manual writing effort.",
    imageAlt: "Smart Proposals icon representing AI-generated freelance proposal document on Huzzler",
    iconName: "FileText",
    tagline: "AI-Powered Winning Pitch Generator",
    badge: "AI Proposal Engine",
    overview: "Turn client briefs into tailored, high-converting proposals. Smart Proposals analyzes project requirements to generate custom milestones, timelines, and compelling pitch copy.",
    bulletPoints: [
      "Generates tailored, persuasive proposals in under 15 seconds",
      "Automated milestone breakdown with realistic timeline estimates",
      "Customizable tone of voice: professional, creative, or executive",
      "Boosts client acceptance and interview rates by up to 3x"
    ],
    stats: [
      { value: "8 hrs", label: "Saved Per Week" },
      { value: "58%", label: "Avg Acceptance Rate" },
      { value: "100%", label: "Customizable Output" }
    ],
    accentColor: "#8B5CF6"
  },
  {
    id: "project-analytics",
    slug: "/features/project-analytics",
    name: "Project Analytics",
    title: "Project Analytics | Data-Driven Hiring Dashboards | Huzzler",
    description: "Huzzler's Project Analytics gives you rich dashboards and insights that drive smarter hiring decisions. Track performance and outcomes across every project.",
    imageAlt: "Project Analytics icon representing hiring insights dashboard on Huzzler",
    iconName: "BarChart3",
    tagline: "Data-Driven Hiring & Performance Dashboards",
    badge: "Executive Insights",
    overview: "Track real-time hiring metrics, budget burn rates, milestone completion timelines, and talent performance through intuitive executive dashboards.",
    bulletPoints: [
      "Real-time milestone tracking and delivery progress visibility",
      "Budget utilization analytics and invoice forecasting",
      "Freelancer performance scoring and delivery benchmarks",
      "Exportable reports for stakeholder updates and ROI tracking"
    ],
    stats: [
      { value: "100%", label: "Milestone Visibility" },
      { value: "0", label: "Payment Disputes" },
      { value: "3x", label: "Faster Project Delivery" }
    ],
    accentColor: "#3B82F6"
  },
  {
    id: "real-time-messaging",
    slug: "/features/real-time-messaging",
    name: "Real-Time Messaging",
    title: "Real-Time Messaging | Chat, Files & Video in One Place | Huzzler",
    description: "Huzzler's Real-Time Messaging brings built-in chat, file sharing, and video meetings together in one place, keeping client and freelancer communication seamless.",
    imageAlt: "Real-Time Messaging icon representing built-in chat and video communication on Huzzler",
    iconName: "MessageSquare",
    tagline: "Seamless Chat, Files & Video in One Hub",
    badge: "Unified Communication",
    overview: "Stay aligned with instant direct messages, organized project channels, drag-and-drop asset sharing with instant previews, and one-click HD video conferencing.",
    bulletPoints: [
      "Dedicated threaded project channels with @mentions and search",
      "Drag-and-drop file sharing supporting all design and code assets",
      "Integrated HD video calling without needing third-party tools",
      "Smart priority notifications so you never miss an urgent update"
    ],
    stats: [
      { value: "0ms", label: "Sync Latency" },
      { value: "HD", label: "Video Meetings" },
      { value: "End-to-End", label: "Secure & Encrypted" }
    ],
    accentColor: "#10B981"
  },
  {
    id: "portfolio-management",
    slug: "/features/portfolio-management",
    name: "Portfolio Management",
    title: "Portfolio Management | Showcase Your Best Work | Huzzler",
    description: "Huzzler's Portfolio Management lets you showcase your best work and keep your portfolio updated in one place, making it easy for clients to discover your skills.",
    imageAlt: "Portfolio Management icon representing freelancer work showcase on Huzzler",
    iconName: "Shield",
    tagline: "Showcase Your Best Work with Verified Case Studies",
    badge: "Verified Showcase",
    overview: "Build an interactive, high-converting digital portfolio. Showcase live project deliverables, client testimonials, tech stacks, and verified proof-of-work badges.",
    bulletPoints: [
      "Rich media support for Figma embeds, GitHub repos, and video demos",
      "Automatic project completion badges verified directly on Huzzler",
      "AI-assisted portfolio optimization tips for higher search rankings",
      "Customizable bio, service packages, and transparent pricing cards"
    ],
    stats: [
      { value: "3x", label: "More Profile Inquiries" },
      { value: "100%", label: "Verified Credentials" },
      { value: "Rich Media", label: "Embeds & Case Studies" }
    ],
    accentColor: "#EC4899"
  },
  {
    id: "ai-assistant",
    slug: "/features/ai-assistant",
    name: "AI Assistant",
    title: "AI Assistant | Smart Suggestions for Profiles & Proposals | Huzzler",
    description: "Huzzler's AI Assistant offers smart suggestions to create profiles, write proposals, and find relevant opportunities, helping freelancers work faster and smarter.",
    imageAlt: "AI Assistant icon representing smart profile and proposal suggestions on Huzzler",
    iconName: "Zap",
    tagline: "Your 24/7 Intelligent Hiring & Work Copilot",
    badge: "Generative AI Copilot",
    overview: "An AI-powered co-pilot built directly into your workspace. From writing structured project briefs to reviewing deliverables and answering workflow questions, Huzzler AI is always on call.",
    bulletPoints: [
      "Instant project brief creator with role, skill, and budget recommendations",
      "Intelligent proposal critique and suggestion engine for freelancers",
      "24/7 conversational assistant for guidance and project troubleshooting",
      "Continuous optimization of your profile for better client visibility"
    ],
    stats: [
      { value: "24/7", label: "Always Available" },
      { value: "<1s", label: "Response Time" },
      { value: "10x", label: "Workflow Speedup" }
    ],
    accentColor: "#F59E0B"
  },
  {
    id: "team-collaboration",
    slug: "/features/team-collaboration",
    name: "Team Collaboration",
    title: "Team Collaboration | Manage Projects Together | Huzzler",
    description: "Huzzler's Team Collaboration tools let you work together, share updates, and manage projects with your team in one place, streamlining freelance and client workflows.",
    imageAlt: "Team Collaboration icon representing shared project management on Huzzler",
    iconName: "TrendingUp",
    tagline: "Manage Projects, Milestones & Teams Together",
    badge: "Multi-User Workspace",
    overview: "Unite cross-functional teams, clients, and freelance specialists in a shared command center with milestone workflows, task tracking, and role-based permissions.",
    bulletPoints: [
      "Shared project workspaces with custom milestone and task boards",
      "Role-based permission controls for clients, leads, and contributors",
      "Real-time activity feeds, status updates, and calendar syncing",
      "Automated escrow release upon client milestone approval"
    ],
    stats: [
      { value: "Multi-Team", label: "Management" },
      { value: "99.9%", label: "Uptime & Sync" },
      { value: "1-Click", label: "Milestone Approvals" }
    ],
    accentColor: "#14B8A6"
  }
];

export const PAGE_SEO_MAP: Record<string, { title: string; description: string; slug: string }> = {
  "/": {
    slug: "/",
    title: "Huzzler AI | The Next-Gen Freelance Marketplace & AI Workspace",
    description: "Huzzler AI combines talent discovery, project management, AI-powered hiring, collaboration tools, and business intelligence into one powerful platform."
  },
  "/features": {
    slug: "/features",
    title: "Platform Features | AI-Powered Hiring & Freelance Workspace | Huzzler",
    description: "Explore Huzzler's eight powerful modules: AI Talent Matching, Project Marketplace, Smart Proposals, Project Analytics, Real-Time Messaging, Portfolio Management, AI Assistant, and Team Collaboration."
  },
  "/about": {
    slug: "/about",
    title: "About Huzzler | The AI-First Freelance Platform",
    description: "Learn about Huzzler's mission to revolutionize freelance hiring and collaboration through artificial intelligence and vetted global talent."
  },
  "/faq": {
    slug: "/faq",
    title: "Frequently Asked Questions | Help & Support | Huzzler",
    description: "Find answers to frequently asked questions about hiring freelancers, posting projects, payments, escrow security, and using Huzzler AI."
  },
  "/blog": {
    slug: "/blog",
    title: "Blog & Insights | Freelance Hiring, Remote Work & AI | Huzzler",
    description: "Read the latest insights, hiring trends, productivity guides, and remote work strategies from the Huzzler team."
  }
};
