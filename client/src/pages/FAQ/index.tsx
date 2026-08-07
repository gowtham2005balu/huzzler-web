import { useState, useEffect, useRef } from "react";
import { UserCircle2, CreditCard, Bot, ShieldCheck, FolderKanban, Headset, MessageCircle, Mail, Phone, BookOpen, PenLine, Globe, Link2, Zap, Search, Plus } from "lucide-react";

const W = "#FFFFFF";
const P2 = "#A78BFA";

const navLinks = ["Home", "Browse Work", "How It Works", "Services", "Pricing", "Blog", "About", "Contact"];

const categories = [
  { id: "all", label: "All Topics" },
  { id: "getting-started", label: "Getting Started" },
  { id: "ai-matching", label: "AI Matching & AI Tools" },
  { id: "collaboration", label: "Collaboration & Project Management" },
  { id: "trust-safety", label: "Trust, Verification & Safety" },
  { id: "company-growth", label: "Company, Mission & Growth" },
];

const faqSections = [
  {
    id: "getting-started",
    label: "Getting Started (For Clients & Freelancers)",
    color: "#7c3aed",
    questions: [
      {
        q: "What is Huzzler?",
        a: "Huzzler is an AI-powered platform that connects clients with skilled freelancers across design, development, writing, marketing, video, and more.",
      },
      {
        q: "Is Huzzler free to use?",
        a: "Yes, Huzzler is a free platform that helps clients and freelancers connect directly with the right people.",
      },
      {
        q: "How do I hire a freelancer on Huzzler?",
        a: "Post a project manually or let AI generate a structured brief, review AI-recommended matches, shortlist your favorites, and start a conversation to discuss details.",
      },
      {
        q: "How do I find work as a freelancer on Huzzler?",
        a: "Create a profile showcasing your skills and portfolio, get discovered through AI matching, and connect directly with clients posting relevant projects.",
      },
      {
        q: "What categories of services are available?",
        a: "Huzzler covers all categories, including Graphics & Design, Programming & Tech, Digital Marketing, Video & Animation, Writing & Translation, AI Services, Music & Audio, Data & Analytics, Business, Photography, Personal Growth, and Finance.",
      },
      {
        q: "Do I need experience to join as a freelancer?",
        a: "Huzzler welcomes freelancers across all experience levels; profiles are verified for skills and background so clients can hire with confidence regardless of where you're starting from.",
      },
      {
        q: "Can I browse freelancers before posting a project?",
        a: "Yes, you can explore talent by category, skillset, and location before deciding to post a project.",
      },
      {
        q: "Is Huzzler available worldwide?",
        a: "Yes, Huzzler connects freelancers and clients globally, removing geographic barriers to hiring.",
      },
      {
        q: "What makes Huzzler different from other freelance platforms?",
        a: "Huzzler combines AI-powered matching, project management, and direct communication in one platform — with no middlemen involved in the connection process.",
      },
      {
        q: "Is Huzzler suitable for businesses as well as individuals?",
        a: "Yes, Huzzler is built for both individual clients and growing teams looking to scale their freelance workforce.",
      },
    ],
  },
  {
    id: "ai-matching",
    label: "AI Matching & AI Tools",
    color: "#7c3aed",
    questions: [
      {
        q: "How does Huzzler's AI matching work?",
        a: "Huzzler's AI analyzes your project requirements — skills, experience, availability, and more — and recommends the most suitable freelancers automatically.",
      },
      {
        q: "How fast is the AI matching process?",
        a: "The AI can analyze hundreds of profiles in a fraction of a second to surface top matches for your project.",
      },
      {
        q: "What factors does the AI consider when matching?",
        a: "Skill matching across 200+ categories, experience scoring based on portfolio analysis, and real-time availability and response-rate tracking.",
      },
      {
        q: "Can AI help me write a project brief?",
        a: "Yes, describe your project in plain language and the AI will generate a structured brief with objectives, deliverables, timeline, and recommended roles.",
      },
      {
        q: "Does the AI suggest a budget for my project?",
        a: "Yes, the AI suggests a budget range based on your project's scope and industry standards.",
      },
      {
        q: "Can I edit an AI-generated brief before posting?",
        a: "Yes, you can review, edit, regenerate, or finalize any AI-generated brief before publishing your project.",
      },
      {
        q: "What is the AI chatbot and what does it do?",
        a: "It's a 24/7 assistant available to both clients and freelancers, offering match suggestions, help writing better project posts, platform guidance, and answers to questions.",
      },
      {
        q: "Does the AI help freelancers create better proposals?",
        a: "Yes, the Smart Proposals tool uses AI to help craft compelling pitches quickly.",
      },
      {
        q: "Does the AI matching improve over time?",
        a: "Yes, recommendations are designed to get smarter and more relevant the more the platform is used.",
      },
      {
        q: "Can I still search manually instead of using AI matching?",
        a: "Yes, you can search and browse freelancers or projects manually at any time, alongside or instead of AI recommendations.",
      },
    ],
  },
  {
    id: "collaboration",
    label: "Collaboration & Project Management",
    color: "#7c3aed",
    questions: [
      {
        q: "Does Huzzler have built-in messaging?",
        a: "Yes, Huzzler includes real-time, threaded project chat with @mentions so you can communicate without leaving the platform.",
      },
      {
        q: "Can I share files directly in Huzzler?",
        a: "Yes, drag-and-drop file sharing with previews is built into project chats.",
      },
      {
        q: "Can I hold video calls through Huzzler?",
        a: "Yes, one-click video meetings are supported via integrations like Zoom or Google Meet.",
      },
      {
        q: "How do I track project progress?",
        a: "Through visual milestone trackers, Kanban-style task boards, and Gantt-style timelines that show progress at a glance.",
      },
      {
        q: "Will I be notified about important project updates?",
        a: "Yes, smart notifications alert you only to what matters — status changes, messages, and milestone updates.",
      },
      {
        q: "What kind of analytics does Huzzler provide?",
        a: "Dashboards showing active projects, completion rates, average delivery time, and overall project performance and velocity.",
      },
      {
        q: "Can multiple team members collaborate on one project?",
        a: "Yes, shared workspaces, milestone boards, and timelines support full team collaboration, not just one-on-one work.",
      },
      {
        q: "Are project milestones tracked automatically?",
        a: "Yes, milestones update automatically as tasks are completed, with status shown as Complete, In Progress, or Upcoming.",
      },
      {
        q: "Can clients see freelancer progress without micromanaging?",
        a: "Yes, visual trackers and automated status updates keep clients informed without needing constant check-ins.",
      },
      {
        q: "Is there a way to see how a project is trending over time?",
        a: "Yes, project analytics dashboards show trends like completion rate and delivery speed over time.",
      },
    ],
  },
  {
    id: "trust-safety",
    label: "Trust, Verification & Safety",
    color: "#7c3aed",
    questions: [
      {
        q: "Are freelancers on Huzzler verified?",
        a: "Yes, every freelancer is verified for skills, experience, and background before joining the Huzzler community.",
      },
      {
        q: "How does Huzzler ensure quality?",
        a: "Through a verification process for all profiles, covering skills and background before a freelancer is listed.",
      },
      {
        q: "How do I know if a freelancer is trustworthy?",
        a: "Look for the verified badge and completed portfolio work on their profile. A ratings and review system is also planned for a future release.",
      },
      {
        q: "Does Huzzler have a rating system?",
        a: "Not yet — a star rating and review system is planned for a later version of the platform.",
      },
      {
        q: "Is there a vetting process before someone can offer services?",
        a: "Yes, freelancers go through a verification process covering their skills and background before being listed.",
      },
      {
        q: "How does Huzzler handle communication between clients and freelancers?",
        a: "Huzzler enables direct communication with no middlemen, so both sides can build relationships based on clear, honest conversation.",
      },
      {
        q: "Can I view a freelancer's past work before hiring?",
        a: "Yes, portfolios and profile details are available for review before you start a conversation or hire.",
      },
      {
        q: "Is support available if I run into an issue?",
        a: "Yes, the AI chatbot and platform support are available anytime for guidance and questions.",
      },
      {
        q: "How new is Huzzler as a platform?",
        a: "Huzzler is newly launched and growing daily, with an expanding community of clients and freelancers.",
      },
      {
        q: "Does Huzzler moderate the quality of listed services?",
        a: "Yes, listings and profiles are maintained through verification standards to keep quality consistent across categories.",
      },
    ],
  },
  {
    id: "company-growth",
    label: "Company, Mission & Growth",
    color: "#7c3aed",
    questions: [
      {
        q: "When was Huzzler founded?",
        a: "Huzzler was founded in 2023 by a small team aiming to transform how freelancers and businesses connect globally.",
      },
      {
        q: "How has Huzzler grown since launch?",
        a: "By 2024, Huzzler expanded to serve freelancers and clients in over 120 countries; in 2025 it introduced its AI matching engine; today it supports thousands of hires daily.",
      },
      {
        q: "What is Huzzler's mission?",
        a: "To empower businesses and freelancers with intelligent tools that make hiring faster, collaboration easier, and opportunities accessible worldwide.",
      },
      {
        q: "What is Huzzler's vision?",
        a: "To create the most trusted AI-powered freelance ecosystem where talent and opportunity connect without barriers, anywhere and at any scale.",
      },
      {
        q: "How many countries does Huzzler operate in?",
        a: "Huzzler serves freelancers and clients in over 120 countries.",
      },
      {
        q: "When did AI matching launch on Huzzler?",
        a: "The AI matching engine launched in 2025, enabling instant, intelligent connections between projects and talent.",
      },
      {
        q: "Who uses Huzzler today?",
        a: "Ambitious startups, enterprises, and individual clients use Huzzler daily to find and hire freelance talent.",
      },
      {
        q: "What do clients say about Huzzler?",
        a: "Clients highlight faster hiring (posting to hiring in as little as 48 hours), strong match quality, and time saved through AI recommendations.",
      },
      {
        q: "What do freelancers say about Huzzler?",
        a: "Freelancers report being connected with better-fit clients and, in some cases, growing their income through consistent AI-driven opportunities.",
      },
      {
        q: "Where can I read more success stories from Huzzler?",
        a: "Huzzler publishes ongoing insights and stories covering AI matching, talent quality, and platform updates.",
      },
    ],
  },
];

const helpCategories = [
  { icon: UserCircle2, label: "Getting Started", color: "#e8e4ff", desc: "New to the platform? Find everything you need to get started and start hiring or finding your first gig.", tag: "Explore" },
  { icon: CreditCard, label: "Payments & Billing", color: "#d1fae5", desc: "Get clarity on payment processes, fee structures, and managing your financial transactions securely.", tag: "Explore" },
  { icon: Bot, label: "AI Assistant", color: "#cffafe", desc: "Discover how our intelligent AI tools can help you match with the right freelancers or clients effortlessly.", tag: "Explore" },
  { icon: ShieldCheck, label: "Account & Security", color: "#dbeafe", desc: "Learn how to keep your account safe, manage settings, and protect your personal information.", tag: "Explore" },
  { icon: FolderKanban, label: "Project Management", color: "#fef9c3", desc: "Find out how to create, manage, and track your projects from start to finish with ease on the platform.", tag: "Explore" },
  { icon: Headset, label: "Customer Support", color: "#ffe4e6", desc: "Need direct help? Learn how to reach our support team and what to expect when you contact us.", tag: "Explore" },
];

const aiCards = [
  { q: "What can the AI Assistant do?", desc: "Our AI assistant can help you navigate the platform, manage projects, and answer your questions instantly, anytime.", color: "#4f46e5", tag: "Assistant" },
  { q: "Can AI write project descriptions for me?", desc: "Yes! Our AI can generate compelling project briefs based on your requirements, saving you time and effort.", color: "#7c3aed", tag: "Content" },
  { q: "Can AI recommend the right freelancers?", desc: "Absolutely. Our smart matching engine evaluates skills, reviews, and past work to suggest the best candidates.", color: "#6d28d9", tag: "Matching" },
  { q: "Does AI help manage active proposals?", desc: "Yes, the AI tracks proposal status, sends reminders, and helps you compare applicants side by side.", color: "#5b21b6", tag: "Proposals" },
  { q: "Can AI assist with project management?", desc: "From setting milestones to tracking deliverables, our AI keeps your projects organized and on schedule.", color: "#4338ca", tag: "Projects" },
  { q: "Is this AI available 24/7?", desc: "Yes! Our AI Assistant is always on, giving you instant support and answers whenever you need them.", color: "#6366f1", tag: "Support" },
];

const supportOptions = [
  { icon: MessageCircle, label: "Live Chat", desc: "Get instant answers from our support team through live chat available during business hours.", cta: "Start Chat" },
  { icon: Mail, label: "Email Support", desc: "Send us a detailed message and our team will respond within 24 hours with a resolution.", cta: "Send Email" },
  { icon: Phone, label: "Schedule a Call", desc: "Book a one-on-one call with a support specialist for complex issues or onboarding help.", cta: "Book Now" },
  { icon: BookOpen, label: "Knowledge Base", desc: "Browse our library of guides, tutorials, and documentation for self-paced learning.", cta: "Explore Docs" },
];

const communityCards = [
  { icon: MessageCircle, label: "Community Forum", bg: "#e8e4ff", desc: "Join discussions with thousands of freelancers and clients sharing tips, experiences, and advice." },
  { icon: PenLine, label: "Freelancer Events", bg: "#d1fae5", desc: "Attend live webinars, workshops, and networking events designed to grow your freelance career." },
  { icon: Globe, label: "Resource Hub", bg: "#cffafe", desc: "Access templates, guides, and tools curated to help freelancers and businesses succeed." },
  { icon: Link2, label: "Learning Bonus", bg: "#fef9c3", desc: "Unlock exclusive learning content and courses to sharpen your skills and grow your income." },
];

// --- Scroll-triggered reveal wrapper ---
function Reveal({
  className = "",
  style = {},
  children,
  as: Component = "div",
  ...rest
}: {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  as?: any;
  [key: string]: any;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Component
      ref={ref}
      className={`${className} ${inView ? "hz-in-view" : ""}`.trim()}
      style={style}
      {...rest}
    >
      {children}
    </Component>
  );
}

function AccordionItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid #e5e7eb", padding: "14px 0" }}>
      <div onClick={() => setOpen(!open)} style={{ cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 13, color: "#374151", fontWeight: 500 }}>{question}</span>
        <span style={{ color: "#9ca3af", fontSize: 18, marginLeft: 12, flexShrink: 0, display: "inline-block", transition: "transform 0.3s ease", transform: open ? "rotate(135deg)" : "rotate(0deg)" }}>+</span>
      </div>
      <div
        style={{
          maxHeight: open ? 400 : 0,
          opacity: open ? 1 : 0,
          overflow: "hidden",
          transition: "max-height 0.35s ease, opacity 0.3s ease, margin-top 0.35s ease",
          marginTop: open ? 10 : 0,
        }}
      >
        <div style={{ fontSize: 12.5, color: "#6b7280", lineHeight: 1.7, paddingRight: 12 }}>
          {answer}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("all");
  const filteredSections = activeCategory === "all" ? faqSections : faqSections.filter(s => s.id === activeCategory);

  return (
    <div className="hz-faq-wrapper" style={{ fontFamily: "'Inter','Segoe UI',sans-serif", color: "#111", background: "#fff" }}>
      <style>{`
        @keyframes hzFadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes hzFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes hzPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(124,58,237,0.35); }
          50% { box-shadow: 0 0 0 8px rgba(124,58,237,0); }
        }
        .hz-reveal { opacity: 0; transform: translateY(18px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .hz-reveal.hz-in-view { opacity: 1; transform: translateY(0); }
        .hz-reveal-fade { opacity: 0; transition: opacity 0.8s ease; }
        .hz-reveal-fade.hz-in-view { opacity: 1; }
        .hz-hover-lift { transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .hz-hover-lift:hover { transform: translateY(-6px); box-shadow: 0 12px 28px rgba(0,0,0,0.1); }
        .hz-hover-scale { transition: transform 0.2s ease; }
        .hz-hover-scale:hover { transform: scale(1.04); }
        .hz-btn { transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease; }
        .hz-btn:hover { transform: translateY(-2px); filter: brightness(1.08); box-shadow: 0 6px 16px rgba(124,58,237,0.35); }
        .hz-btn:active { transform: translateY(0px) scale(0.97); }
        .hz-sidebar-item { transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease; }
        .hz-sidebar-item:hover { transform: translateX(4px); background: #f3f0ff; }
        .hz-icon-circle:hover { transform: translateY(-3px) scale(1.1); background: rgba(255,255,255,0.15); }
        .hz-footer-link:hover { color: #a78bfa; transform: translateX(3px); }
        .hz-input-focus { transition: box-shadow 0.25s ease, border-color 0.25s ease; }
        .hz-input-focus:focus { box-shadow: 0 0 0 3px rgba(124,58,237,0.35); }
        .hz-search-btn:hover { animation: hzPulse 1.2s ease infinite; }

        /* --- extra interactive animation utilities --- */
        .hz-reveal-left { opacity: 0; transform: translateX(-26px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .hz-reveal-left.hz-in-view { opacity: 1; transform: translateX(0); }
        .hz-reveal-scale { opacity: 0; transform: scale(0.88); transition: opacity 0.55s ease, transform 0.55s ease; }
        .hz-reveal-scale.hz-in-view { opacity: 1; transform: scale(1); }
        .hz-hover-glow { transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease; }
        .hz-hover-glow:hover { transform: translateY(-3px) scale(1.06); box-shadow: 0 6px 18px rgba(124,58,237,0.28); }
        .hz-hover-rotate { transition: transform 0.35s ease; }
        .hz-hover-rotate:hover { transform: rotate(8deg) scale(1.08); }
        .hz-cta-btn { transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease; }
        .hz-cta-btn:hover { transform: translateY(-3px); filter: brightness(1.08); box-shadow: 0 8px 20px rgba(124,58,237,0.3); }
        .hz-cta-btn:active { transform: translateY(-1px) scale(0.97); }
        .hz-tag-pulse { animation: hzTagPulse 2.4s ease-in-out infinite; }
        @keyframes hzTagPulse { 0%,100% { opacity:1; } 50% { opacity:0.55; } }

        /* --- hero-specific responsive rules --- */
        .hz-hero-inner { width: 100%; max-width: 1360px; margin: 0 auto; display: flex; gap: 80px; align-items: center; justify-content: space-between; flex-wrap: wrap; }
        .hz-hero-left { flex: 1 1 480px; min-width: 320px; max-width: 620px; }
        .hz-hero-right { flex: 1 1 460px; width: 100%; max-width: 480px; display: flex; flex-direction: column; gap: 18px; }
        .hz-hero-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }

        @media (min-width: 1200px) {
          .hz-hero-left h1 { font-size: 58px !important; }
          .hz-hero-left p { font-size: 15.5px !important; max-width: 480px !important; }
        }

        @media (max-width: 900px) {
          .hz-faq-wrapper section,
          .hz-faq-wrapper div[style*="padding: 48px 100px"],
          .hz-faq-wrapper div[style*="padding: 100px 100px"],
          .hz-faq-wrapper div[style*="padding: 60px 100px"],
          .hz-faq-wrapper div[style*="padding: 100px"],
          .hz-faq-wrapper div[style*="padding: 40px 100px"] {
            padding-left: 20px !important;
            padding-right: 20px !important;
          }
          
          .hz-faq-wrapper .hz-faq-grid {
            grid-template-columns: 1fr !important;
            display: flex !important;
            flex-direction: column !important;
            gap: 16px !important;
          }

          .hz-faq-wrapper .hz-faq-container {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 24px !important;
          }

          .hz-faq-wrapper .hz-faq-sidebar-wrapper {
            width: 100% !important;
            position: static !important;
            margin-bottom: 8px !important;
          }

          .hz-faq-wrapper .hz-faq-sidebar {
            width: 100% !important;
            display: flex !important;
            flex-direction: row !important;
            overflow-x: auto !important;
            padding-bottom: 8px !important;
            gap: 8px !important;
            -webkit-overflow-scrolling: touch !important;
          }

          .hz-faq-wrapper .hz-faq-sidebar::-webkit-scrollbar {
            display: none !important;
          }

          .hz-faq-wrapper .hz-faq-sidebar .hz-sidebar-item {
            margin-bottom: 0 !important;
            white-space: nowrap !important;
          }
          
          .hz-faq-wrapper .hz-faq-list {
            max-height: none !important;
            overflow-y: visible !important;
          }

          .hz-faq-wrapper .hz-faq-ai-assistant {
            padding-bottom: 160px !important;
          }

          .hz-faq-wrapper h1,
          .hz-faq-wrapper h2 {
            font-size: clamp(28px, 5vw, 36px) !important;
            line-height: 1.2 !important;
          }

          /* hero: stack right-side cards under the left content, full width */
          .hz-faq-wrapper .hz-hero {
            padding: 48px 20px !important;
          }
          .hz-faq-wrapper .hz-hero-inner {
            gap: 32px !important;
          }
          .hz-faq-wrapper .hz-hero-left {
            min-width: 0 !important;
            max-width: 100% !important;
          }
          .hz-faq-wrapper .hz-hero-right {
            width: 100% !important;
          }
        }

        @media (max-width: 480px) {
          .hz-faq-wrapper .hz-hero {
            padding: 36px 16px !important;
          }
          .hz-faq-wrapper .hz-hero h1 {
            font-size: 32px !important;
          }
          .hz-faq-wrapper .hz-search-row {
            flex-direction: column !important;
          }
          .hz-faq-wrapper .hz-search-row button {
            width: 100% !important;
            padding: 14px 28px !important;
          }
          .hz-faq-wrapper .hz-quick-links {
            flex-wrap: wrap !important;
            row-gap: 10px !important;
          }
          .hz-faq-wrapper .hz-hero-stats {
            grid-template-columns: 1fr 1fr !important;
            gap: 10px !important;
          }
        }
      `}</style>

      {/* Hero */}
      <Reveal className="hz-reveal-fade hz-hero" style={{ background: "#13112a", padding: "80px 100px" }}>
        <div className="hz-hero-inner">
          {/* Left Side: Header Content */}
          <Reveal className="hz-reveal hz-hero-left" style={{ transitionDelay: "0.05s" }}>
            <Reveal className="hz-reveal-scale hz-tag-pulse" style={{ background: "rgba(255,255,255,0.06)", color: "#e2e8f0", fontSize: 10, fontWeight: 500, padding: "5px 14px", borderRadius: 100, display: "inline-block", border: "1px solid rgba(255,255,255,0.1)", marginBottom: 32, letterSpacing: "0.08em", transitionDelay: "0.1s" }}>
              HELP CENTER
            </Reveal>
            <h1 style={{ color: "#fff", fontSize: 48, fontWeight: 500, lineHeight: 1.15, margin: "0 0 20px", letterSpacing: "-0.02em" }}>
              Frequently<br /><span style={{ color: "#a78bfa" }}>Asked Questions</span>
            </h1>
            <p style={{ color: "#94a3b8", fontSize: 14, margin: "0 0 40px", lineHeight: 1.6, maxWidth: 440 }}>
              Everything you need to know about hiring freelancers, managing projects, payments, AI features, and growing your business with Huzzler.
            </p>

            <div className="hz-search-row" style={{ display: "flex", gap: 12, marginBottom: 20 }}>
              <div style={{ position: "relative", flex: 1 }}>
                <Search style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "#64748b", width: 18, height: 18 }} />
                <input className="hz-input-focus" placeholder="How can we help you today?" style={{ width: "100%", padding: "14px 16px 14px 44px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)", color: "#e2e8f0", fontSize: 14, outline: "none" }} />
              </div>
              <button className="hz-btn hz-search-btn" style={{ background: "#8b5cf6", color: "#fff", border: "none", borderRadius: 10, padding: "0 28px", fontWeight: 600, fontSize: 14, cursor: "pointer", transition: "all 0.2s" }}>Search</button>
            </div>

            <div className="hz-quick-links" style={{ display: "flex", gap: 20, alignItems: "center", fontSize: 13, color: "#94a3b8" }}>
              <span style={{ cursor: "pointer", transition: "color 0.2s" }} className="hover:text-[#a78bfa]">Getting Started &rarr;</span>
              <span style={{ cursor: "pointer", transition: "color 0.2s" }} className="hover:text-[#a78bfa]">Payments &rarr;</span>
              <span style={{ cursor: "pointer", transition: "color 0.2s" }} className="hover:text-[#a78bfa]">AI Features &rarr;</span>
              <span style={{ cursor: "pointer", transition: "color 0.2s" }} className="hover:text-[#a78bfa]">Account Help &rarr;</span>
            </div>
          </Reveal>

          {/* Right Side: Feature Cards Grid */}
          <Reveal className="hz-reveal hz-hero-right" style={{ transitionDelay: "0.15s" }}>

            {/* Card 1: AI Matching */}
            <div className="hz-hover-glow" style={{ background: "#1b1731", borderRadius: 20, padding: "28px", display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ background: "rgba(250, 204, 21, 0.12)", width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Zap style={{ color: "#facc15", width: 18, height: 18 }} />
              </div>
              <div>
                <div style={{ color: "#fff", fontWeight: 500, fontSize: 15, marginBottom: 6 }}>Instant AI Matching</div>
                <div style={{ color: "#94a3b8", fontSize: 13 }}>Find the right freelancer in minutes, not weeks</div>
              </div>
            </div>

            {/* Card 2: Secure Payments */}
            <div className="hz-hover-glow" style={{ background: "#1b1731", borderRadius: 20, padding: "28px", display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ background: "rgba(167, 139, 250, 0.12)", width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <ShieldCheck style={{ color: "#a78bfa", width: 18, height: 18 }} />
              </div>
              <div>
                <div style={{ color: "#fff", fontWeight: 500, fontSize: 15, marginBottom: 6 }}>100% Secure Payments</div>
                <div style={{ color: "#94a3b8", fontSize: 13 }}>Escrow protection on every single project</div>
              </div>
            </div>

            {/* Card 3: Verified Professionals */}
            <div className="hz-hover-glow" style={{ background: "#1b1731", borderRadius: 20, padding: "28px", display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ background: "rgba(167, 139, 250, 0.12)", width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Plus style={{ color: "#a78bfa", width: 18, height: 18 }} />
              </div>
              <div>
                <div style={{ color: "#fff", fontWeight: 500, fontSize: 15, marginBottom: 6 }}>Verified Professionals</div>
                <div style={{ color: "#94a3b8", fontSize: 13 }}>Every freelancer passes our rigorous vetting</div>
              </div>
            </div>

            {/* Stats Row */}
            <div className="hz-hero-stats">
              <div className="hz-hover-glow" style={{ background: "#1b1731", borderRadius: 20, padding: "28px", textAlign: "center" }}>
                <div style={{ color: "#fff", fontWeight: 500, fontSize: 24, marginBottom: 4 }}>50K+</div>
                <div style={{ color: "#94a3b8", fontSize: 13 }}>Freelancers</div>
              </div>
              <div className="hz-hover-glow" style={{ background: "#1b1731", borderRadius: 20, padding: "28px", textAlign: "center" }}>
                <div style={{ color: "#fff", fontWeight: 500, fontSize: 24, marginBottom: 4 }}>15K+</div>
                <div style={{ color: "#94a3b8", fontSize: 13 }}>Projects Done</div>
              </div>
            </div>
          </Reveal>
        </div>
      </Reveal>

      {/* What can we help */}
      <div style={{ padding: "48px 100px 32px", textAlign: "center" }}>
        <Reveal className="hz-reveal"><div style={{ color: "#7c3aed", fontSize: 11, fontWeight: 500, letterSpacing: "0.1em", marginBottom: 8 }}>COMMON HELP</div></Reveal>
        <Reveal className="hz-reveal" style={{ transitionDelay: "0.05s" }}><h2 style={{ fontSize: 26, fontWeight: 500, margin: "0 0 8px" }}>What can we <span style={{ color: "#7c3aed" }}>help you with?</span></h2></Reveal>
        <Reveal className="hz-reveal" style={{ transitionDelay: "0.1s" }}><p style={{ color: "#6b7280", fontSize: 13, margin: "0 0 32px" }}>Select a category for the answer you need — navigating Huzzler is simplified & beyond.</p></Reveal>
        <div className="hz-faq-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {helpCategories.map((c, idx) => (
            <Reveal key={c.label} className="hz-reveal hz-hover-lift" style={{ background: c.color, borderRadius: 12, padding: "20px", textAlign: "left", cursor: "pointer", position: "relative", transitionDelay: `${idx * 0.06}s` }}>
              <div style={{ position: "absolute", top: 14, right: 14, background: "rgba(0,0,0,0.06)", color: "#374151", fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 4 }}>{c.tag}</div>
              <span className="hz-hover-rotate" style={{ display: "inline-block" }}><c.icon size={24} color="#374151" style={{ marginBottom: 10 }} /></span>
              <div style={{ fontWeight: 500, fontSize: 14, marginBottom: 6, color: "#111" }}>{c.label}</div>
              <div style={{ color: "#374151", fontSize: 12, lineHeight: 1.5 }}>{c.desc}</div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Browse All Answers */}
      <div style={{ padding: "40px 100px", background: "#f8f8ff" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <Reveal className="hz-reveal"><div style={{ color: "#7c3aed", fontSize: 11, fontWeight: 500, letterSpacing: "0.1em", marginBottom: 8 }}>ALL ANSWERS</div></Reveal>
          <Reveal className="hz-reveal" style={{ transitionDelay: "0.05s" }}><h2 style={{ fontSize: 26, fontWeight: 500, margin: "0 0 8px" }}>Browse <span style={{ color: "#7c3aed" }}>all answers</span></h2></Reveal>
          <Reveal className="hz-reveal" style={{ transitionDelay: "0.1s" }}><p style={{ color: "#6b7280", fontSize: 13 }}>Organized by topic for easy navigation. Use the sidebar to jump to any category.</p></Reveal>
        </div>
        <div className="hz-faq-container" style={{ display: "flex", gap: 32, alignItems: "flex-start" }}>
          {/* Sidebar */}
          <div className="hz-faq-sidebar-wrapper" style={{ width: 200, flexShrink: 0, position: "sticky", top: 24, alignSelf: "flex-start" }}>
            <div className="hz-faq-sidebar-title" style={{ fontWeight: 600, fontSize: 12, color: "#374151", marginBottom: 8 }}>Browse Topics</div>
            <div className="hz-faq-sidebar">
              {categories.map((c, idx) => (
                <Reveal key={c.id} className="hz-reveal-left" style={{ transitionDelay: `${idx * 0.05}s` }}>
                  <div className="hz-sidebar-item" onClick={() => setActiveCategory(c.id)} style={{ padding: "8px 12px", borderRadius: 7, cursor: "pointer", fontSize: 12, fontWeight: activeCategory === c.id ? 700 : 400, background: activeCategory === c.id ? "#ede9fe" : "transparent", color: activeCategory === c.id ? "#7c3aed" : "#6b7280", marginBottom: 2 }}>
                    {c.label}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          {/* FAQ List */}
          <div className="hz-faq-list" style={{ flex: 1, maxHeight: "calc(100vh - 48px)", overflowY: "auto" }}>
            {filteredSections.map((section, sIdx) => (
              <Reveal key={section.id} className="hz-reveal" style={{ marginBottom: 28, transitionDelay: `${sIdx * 0.08}s` }}>
                <div style={{ color: section.color, fontWeight: 500, fontSize: 13, marginBottom: 4 }}>#{section.label}</div>
                <div style={{ background: "#fff", borderRadius: 10, padding: "0 16px", border: "1px solid #e5e7eb" }}>
                  {section.questions.map((item, i) => (
                    <Reveal key={i} className="hz-reveal" style={{ transitionDelay: `${i * 0.04}s` }}>
                      <AccordionItem question={item.q} answer={item.a} />
                    </Reveal>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* AI Assistant */}
      <div className="hz-faq-ai-assistant" style={{ padding: "48px 100px 160px", textAlign: "center" }}>
        <Reveal className="hz-reveal"><div style={{ color: "#7c3aed", fontSize: 11, fontWeight: 500, letterSpacing: "0.1em", marginBottom: 8 }}>AI ASSISTANT</div></Reveal>
        <Reveal className="hz-reveal" style={{ transitionDelay: "0.05s" }}><h2 style={{ fontSize: 26, fontWeight: 500, margin: "0 0 8px" }}>Huzzler <span style={{ color: "#7c3aed" }}>AI Assistant</span></h2></Reveal>
        <Reveal className="hz-reveal" style={{ transitionDelay: "0.1s" }}><p style={{ color: "#6b7280", fontSize: 13, marginBottom: 32 }}>Our intelligent assistant is ready for project management, and smart advice.</p></Reveal>
        <div className="hz-faq-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {aiCards.map((c, i) => (
            <Reveal key={i} className="hz-reveal-scale hz-hover-lift" style={{ background: `linear-gradient(135deg, ${c.color}dd, ${c.color}99)`, borderRadius: 12, padding: "28px", minHeight: 150, textAlign: "left", position: "relative", transitionDelay: `${i * 0.06}s` }}>
              <div className="hz-hover-glow" style={{ position: "absolute", top: 12, right: 12, background: "rgba(255,255,255,0.2)", color: "#fff", fontSize: 9, fontWeight: 500, padding: "2px 8px", borderRadius: 4 }}>{c.tag}</div>
              <div style={{ color: "#fff", fontWeight: 500, fontSize: 14, margin: "0 0 8px", lineHeight: 1.4 }}>{c.q}</div>
              <div style={{ color: "rgba(255,255,255,0.9)", fontSize: 12, lineHeight: 1.5 }}>{c.desc}</div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Support Options */}
      {false && (
        <div style={{ padding: "48px 100px", background: "#f8f8ff", textAlign: "center" }}>
          <Reveal className="hz-reveal"><div style={{ color: "#7c3aed", fontSize: 11, fontWeight: 500, letterSpacing: "0.1em", marginBottom: 8 }}>SUPPORT</div></Reveal>
          <Reveal className="hz-reveal" style={{ transitionDelay: "0.05s" }}><h2 style={{ fontSize: 26, fontWeight: 500, margin: "0 0 32px" }}>Get <span style={{ color: "#7c3aed" }}>in touch</span></h2></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {supportOptions.map((s, i) => (
              <Reveal key={s.label} className="hz-reveal hz-hover-lift" style={{ background: "#fff", borderRadius: 12, padding: "24px 18px", border: "1px solid #e5e7eb", transitionDelay: `${i * 0.06}s` }}>
                <span className="hz-hover-rotate" style={{ display: "inline-block" }}><s.icon size={28} color="#7c3aed" style={{ marginBottom: 12 }} /></span>
                <div style={{ fontWeight: 500, fontSize: 14, marginBottom: 8 }}>{s.label}</div>
                <div style={{ color: "#6b7280", fontSize: 12, lineHeight: 1.5, marginBottom: 16 }}>{s.desc}</div>
                <button className="hz-cta-btn" style={{ background: "#7c3aed", color: "#fff", border: "none", borderRadius: 8, padding: "8px 16px", fontSize: 12, fontWeight: 600, cursor: "pointer", width: "100%" }}>{s.cta}</button>
              </Reveal>
            ))}
          </div>
        </div>
      )}

      {/* Community */}
      {false && (
        <div style={{ padding: "48px 100px", textAlign: "center" }}>
          <Reveal className="hz-reveal"><div style={{ color: "#7c3aed", fontSize: 11, fontWeight: 500, letterSpacing: "0.1em", marginBottom: 8 }}>COMMUNITY</div></Reveal>
          <Reveal className="hz-reveal" style={{ transitionDelay: "0.05s" }}><h2 style={{ fontSize: 26, fontWeight: 500, margin: "0 0 32px" }}>Join our <span style={{ color: "#7c3aed" }}>community</span></h2></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {communityCards.map((c, i) => (
              <Reveal key={c.label} className="hz-reveal hz-hover-lift" style={{ background: c.bg, borderRadius: 12, padding: "24px 18px", textAlign: "left", cursor: "pointer", transitionDelay: `${i * 0.06}s` }}>
                <span className="hz-hover-rotate" style={{ display: "inline-block" }}><c.icon size={28} color="#374151" style={{ marginBottom: 12 }} /></span>
                <div style={{ fontWeight: 500, fontSize: 14, marginBottom: 8, color: "#111" }}>{c.label}</div>
                <div style={{ color: "#374151", fontSize: 12, lineHeight: 1.5 }}>{c.desc}</div>
              </Reveal>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}