import { useState, useEffect, useRef } from "react";
import {
  Bot, Briefcase, FileText, BarChart3, MessageSquare, Shield, Zap, TrendingUp,
  Palette, Code, PenLine, Clapperboard, Settings, CheckCircle2, Check, Lightbulb,
  ClipboardList, Calendar, Search, Sparkles, PartyPopper, Video, Folder, Bell,
  Flag, Timer, Heart, Users, Globe, Lock, RefreshCw, Building2, Key, Headphones,
  Play, ArrowRight, Twitter, Linkedin, Facebook, Youtube, ChevronRight,
  Clock, Target, User, CheckSquare, ListFilter, DollarSign, RotateCcw,
  Tag, Eye, LayoutGrid
} from "lucide-react";

// ===== COLORS (matched to screenshot: white/light page, deep indigo-purple hero, navy "Why Huzzler" band) =====
const P = "#7C3AED";      // primary purple
const P2 = "#A78BFA";     // lighter purple accent
const PD = "#1E1B4B";     // deep indigo (hero bg)
const PD2 = "#2E1065";    // deep purple (hero bg gradient end)
const NAVY = "#0B1120";   // "Why Huzzler" dark navy band
const W = "#FFFFFF";
const OFFWHITE = "#F8F9FC";
const LILAC = "#F1EEFF";  // very light lilac section bg
const INK = "#111827";    // near-black text on white
const G = "#6B7280";      // gray body text
const BORDER = "#E5E7EB"; // light border on white sections

const C = {
  body: { background: W, color: INK, fontFamily: "'Inter',sans-serif", margin: 0, padding: 0 },
  nav: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 100px", borderBottom: "1px solid " + BORDER, background: "rgba(255,255,255,0.95)", position: "sticky", top: 0, zIndex: 100 },
  sec: (bg) => ({ padding: "5rem 100px", background: bg || W }),
  card: { background: W, border: "1px solid " + BORDER, borderRadius: 16, padding: "1.5rem", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" },
  cardOnDark: { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: "1.5rem" },
  h1: { fontSize: 64, fontWeight: 500, lineHeight: 1.1, letterSpacing: "-2px", margin: "0 0 1.5rem" },
  h2: { fontSize: 42, fontWeight: 500, letterSpacing: "-1px", margin: "0 0 1rem", lineHeight: 1.15, color: "#7C3AED" },
  label: { color: P, fontSize: 13, fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 12 },
  btn: (outline) => ({ padding: "8px 20px", borderRadius: 8, border: outline ? "1px solid " + BORDER : "none", background: outline ? "transparent" : P, color: outline ? INK : W, fontSize: 14, cursor: "pointer", fontWeight: outline ? 500 : 600 }),
  btnLg: (outline) => ({ padding: "14px 28px", borderRadius: 10, border: outline ? "1px solid rgba(255,255,255,0.25)" : "none", background: outline ? "transparent" : W, color: outline ? W : P, fontSize: 16, cursor: "pointer", fontWeight: outline ? 500 : 600, display: "flex", alignItems: "center", gap: 8 }),
  grad: { background: "linear-gradient(135deg,#A78BFA,#60A5FA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
  badge: { display: "inline-flex", alignItems: "center", padding: "6px 14px", borderRadius: 999, background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", color: "#E0D7FF", fontSize: 13, fontWeight: 500, marginBottom: 24 },
  pill: (a) => ({ padding: "6px 14px", borderRadius: 999, fontSize: 13, fontWeight: 500, cursor: "pointer", background: a ? P : W, color: a ? W : G, border: a ? "none" : "1px solid " + BORDER }),
  avatar: (bg, fg) => ({ width: 36, height: 36, borderRadius: "50%", background: bg, color: fg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 500, flexShrink: 0 }),
  row: (gap = 20) => ({ display: "flex", gap, alignItems: "center" }),
  grid: (cols, gap = 20) => ({ display: "grid", gridTemplateColumns: `repeat(${cols},1fr)`, gap }),
};

const FREELANCERS = [
  { i: "SC", n: "Sarah Chen", r: "UI/UX Designer", s: 98, bg: "#EDE9FE", fg: "#7C3AED", loc: "San Francisco", tags: ["UI/UX", "Figma", "Mobile"], rate: "$95/hr", rev: "★★★★★ (148)", cat: "Design" },
  { i: "MR", n: "Marcus Roy", r: "React Developer", s: 95, bg: "#D1FAE5", fg: "#065F46", loc: "London", tags: ["React", "TypeScript", "Node"], rate: "$120/hr", rev: "★★★★★ (203)", cat: "Dev" },
  { i: "AT", n: "Aiko Tanaka", r: "Brand Strategist", s: 91, bg: "#FEF3C7", fg: "#92400E", loc: "Tokyo", tags: ["Branding", "Strategy", "Copy"], rate: "$85/hr", rev: "★★★★★ (97)", cat: "Marketing" },
  { i: "EL", n: "Emma Lind", r: "Copywriter", s: 94, bg: "#FEE2E2", fg: "#991B1B", loc: "Stockholm", tags: ["Copywriting", "SEO", "Blogs"], rate: "$70/hr", rev: "★★★★★ (82)", cat: "Writing" },
  { i: "KS", n: "Kenji Sato", r: "Video Producer", s: 96, bg: "#E0F2FE", fg: "#075985", loc: "Kyoto", tags: ["Video Editing", "After Effects", "Colorist"], rate: "$110/hr", rev: "★★★★★ (114)", cat: "Video" },
  { i: "DB", n: "David Brown", r: "Cloud Architect", s: 99, bg: "#ECFDF5", fg: "#065F46", loc: "Austin", tags: ["AWS", "Docker", "Kubernetes"], rate: "$140/hr", rev: "★★★★★ (290)", cat: "Engineering" },
];

// ===== Scroll-triggered reveal wrapper (new) =====
// Observes when its content enters the viewport and toggles "hz-in-view"
// so the CSS transitions below animate in as the user scrolls, instead of
// once on page load. variant picks the animation style (up/left/right/scale/fade).
function Reveal({ variant = "up", delay = 0, className = "", style = {}, children, ...rest }) {
  const ref = useRef(null);
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
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const variantClass = `hz-reveal-${variant}`;
  return (
    <div
      ref={ref}
      className={`${variantClass} ${inView ? "hz-in-view" : ""} ${className}`.trim()}
      style={{ ...style, transitionDelay: delay ? `${delay}s` : undefined }}
      {...rest}
    >
      {children}
    </div>
  );
}

// Global keyframes / transition classes for the Reveal wrapper + hover interactivity
const AnimationStyles = () => (
  <style>{`
    .hz-reveal-up { opacity: 0; transform: translateY(28px); transition: opacity 0.7s ease, transform 0.7s ease; }
    .hz-reveal-up.hz-in-view { opacity: 1; transform: translateY(0); }

    .hz-reveal-left { opacity: 0; transform: translateX(-44px); transition: opacity 0.7s ease, transform 0.7s ease; }
    .hz-reveal-left.hz-in-view { opacity: 1; transform: translateX(0); }

    .hz-reveal-right { opacity: 0; transform: translateX(44px); transition: opacity 0.7s ease, transform 0.7s ease; }
    .hz-reveal-right.hz-in-view { opacity: 1; transform: translateX(0); }

    .hz-reveal-scale { opacity: 0; transform: scale(0.82); transition: opacity 0.6s ease, transform 0.6s ease; }
    .hz-reveal-scale.hz-in-view { opacity: 1; transform: scale(1); }

    .hz-reveal-fade { opacity: 0; transition: opacity 0.9s ease; }
    .hz-reveal-fade.hz-in-view { opacity: 1; }

    .hz-hover-lift { transition: transform 0.25s ease, box-shadow 0.25s ease; }
    .hz-hover-lift:hover { transform: translateY(-6px); box-shadow: 0 14px 30px rgba(0,0,0,0.12); }

    .hz-hover-scale { transition: transform 0.2s ease; }
    .hz-hover-scale:hover { transform: scale(1.04); }

    .hz-hover-glow { transition: transform 0.2s ease, box-shadow 0.2s ease; }
    .hz-hover-glow:hover { transform: translateY(-3px); box-shadow: 0 8px 22px rgba(124,58,237,0.35); }

    .hz-btn-anim { transition: transform 0.2s ease, filter 0.2s ease, box-shadow 0.2s ease; }
    .hz-btn-anim:hover { transform: translateY(-2px); filter: brightness(1.08); }
    .hz-btn-anim:active { transform: translateY(0) scale(0.97); }

    .hz-pulse-dot { animation: hzPulseDot 1.8s ease-in-out infinite; }
    @keyframes hzPulseDot { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }

    .hz-float { animation: hzFloat 4s ease-in-out infinite; }
    @keyframes hzFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
  `}</style>
);

const SmCard = ({ icon, title, desc }) => (
  <div className="hz-hover-lift" style={C.card}>
    <div style={{ width: 44, height: 44, borderRadius: 10, background: "rgba(124,58,237,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 16 }}>{icon}</div>
    <div style={{ fontSize: 17, fontWeight: 500, marginBottom: 8, color: INK }}>{title}</div>
    <div style={{ fontSize: 14, color: G, lineHeight: 1.7 }}>{desc}</div>
  </div>
);

const Hero = () => (
  <section style={{ position: "relative", minHeight: "calc(100vh - 72px)", overflow: "hidden", background: "#0B0D1B", display: "flex", alignItems: "center" }}>

    {/* Full Screen 100% Video Background - No White Space */}
    <div style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1, background: "#0B0D1B" }}>
      <video
        src="https://res.cloudinary.com/dqsyzpxkg/video/upload/v1783591548/portrait-of-young-hispanic-man-freelancer-types-on-2026-02-17-03-33-42-utc_n3ckzu.mp4"
        autoPlay
        loop
        muted
        playsInline
        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "25% center" }}
      />
      {/* Subtle Soft Overlay for Text Legibility */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(0, 0, 0, 0.25) 0%, rgba(10, 10, 25, 0.6) 50%, rgba(10, 10, 25, 0.82) 100%)" }} />
    </div>

    {/* Content Container (Right-aligned content) */}
    <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: "1380px", margin: "0 auto", padding: "6rem 100px 7rem", display: "flex", justifyContent: "flex-end" }}>

      {/* Right Column Content */}
      <Reveal variant="up" style={{ maxWidth: "560px", width: "100%" }}>
        {/* Platform Features Badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 16px", borderRadius: 999, background: "rgba(108, 92, 231, 0.35)", border: "1px solid rgba(167, 139, 250, 0.5)", color: "#E0D7FF", fontSize: 12.5, fontWeight: 600, marginBottom: 24, backdropFilter: "blur(8px)" }}>
          <ChevronRight size={14} /> Platform Features
        </div>

        {/* Heading */}
        <h1 style={{ fontSize: "clamp(34px, 4vw, 50px)", fontWeight: 500, lineHeight: 1.18, letterSpacing: "-1.2px", margin: "0 0 20px", color: W }}>
          <span>Everything You Need</span><br />
          <span>To <span style={{ color: "#A78BFA" }}>Hire, Manage &</span></span><br />
          <span style={{ color: "#A78BFA" }}>Scale</span>
        </h1>

        {/* Paragraph */}
        <p style={{ color: "#F1F5F9", fontSize: "15px", lineHeight: "1.7", margin: "0 0 32px", maxWidth: "480px" }}>
          Huzzler AI combines talent discovery, project management, AI-powered hiring, collaboration tools, and business intelligence into one powerful platform.
        </p>

        {/* CTA Buttons */}
        {/* <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
          <button
            onClick={() => window.open("https://huzzler.app/freelance-dashboard/browse-projects", "_blank")}
            className="hz-btn-anim"
            style={{ padding: "12px 24px", borderRadius: "12px", border: "none", background: "#7C3AED", color: W, fontSize: "14px", fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", boxShadow: "0 8px 24px rgba(124, 58, 237, 0.5)" }}
          >
            Explore Talent <ArrowRight size={15} />
          </button>
          <button
            onClick={() => window.open("https://huzzler.app/", "_blank")}
            className="hz-btn-anim"
            style={{ padding: "12px 24px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.3)", background: "rgba(0,0,0,0.3)", color: W, fontSize: "14px", fontWeight: 600, cursor: "pointer", backdropFilter: "blur(8px)" }}
          >
            Start Hiring
          </button>
          <button
            onClick={() => window.open("https://res.cloudinary.com/dqsyzpxkg/video/upload/v1783591548/portrait-of-young-hispanic-man-freelancer-types-on-2026-02-17-03-33-42-utc_n3ckzu.mp4", "_blank")}
            className="hz-btn-anim"
            style={{ padding: "12px 24px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.3)", background: "rgba(0,0,0,0.3)", color: W, fontSize: "14px", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", backdropFilter: "blur(8px)" }}
          >
            <Play size={14} /> Watch Demo
          </button>
        </div> */}
      </Reveal>

    </div>
  </section>
);

const OverviewCard = ({ icon, title, desc }) => (
  <div
    className="hz-hover-lift"
    style={{
      background: W,
      border: "1px solid " + BORDER,
      borderRadius: 24,
      padding: "2.25rem 1.75rem",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    <div
      style={{
        width: 56,
        height: 56,
        borderRadius: 16,
        background: "rgba(124,58,237,0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
      }}
    >
      {icon}
    </div>
    <div style={{ fontSize: 19, fontWeight: 700, marginBottom: 10, color: P }}>{title}</div>
    <div style={{ fontSize: 14.5, color: G, lineHeight: 1.7 }}>{desc}</div>
  </div>
);

const Overview = () => (
  <section style={{ ...C.sec(OFFWHITE), textAlign: "center" }}>
    <Reveal variant="up">
      <h2 style={{ ...C.h2, textAlign: "center", fontWeight: 600, fontSize: 46 }}>
        Built For Modern Teams
      </h2>
    </Reveal>
    <Reveal variant="up" delay={0.05}>
      <p style={{ color: G, fontSize: 18, maxWidth: 560, margin: "0 auto 3rem" }}>
        Eight powerful modules that work together seamlessly.
      </p>
    </Reveal>
    <div style={C.grid(4)}>
      {[
        [<Bot size={26} color={P} />, "AI Talent Matching", "Smart algorithms connect you with the most qualified professionals."],
        [<Briefcase size={26} color={P} />, "Project Marketplace", "Browse thousands of verified experts across every discipline."],
        [<FileText size={26} color={P} />, "Smart Proposals", "AI-powered proposal generator crafts winning pitches in seconds."],
        [<BarChart3 size={26} color={P} />, "Project Analytics", "Rich dashboards surface insights that drive smarter hiring."],
        [<MessageSquare size={26} color={P} />, "Real-Time Messaging", "Built-in chat, file sharing, and video meetings in one place."],
        [<Shield size={26} color={P} />, "Portfolio Management", "Showcase your best work and keep your portfolio updated in one place."],
        [<Zap size={26} color={P} />, "AI Assistant", "Get smart suggestions to create profiles, write proposals, and find relevant opportunities."],
        [<TrendingUp size={26} color={P} />, "Team Collaboration", "Work together, share updates, and manage projects with your team in one place."],
      ].map(([icon, title, desc], idx) => (
        <Reveal key={title} variant="up" delay={idx * 0.07}>
          <OverviewCard icon={icon} title={title} desc={desc} />
        </Reveal>
      ))}
    </div>
  </section>
);
const AIMatching = () => (
  <section style={{ ...C.sec("#FBFBFE"), padding: "6rem 100px", display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 60, alignItems: "center" }}>

    {/* Left Column: Heading & Feature Details */}
    <Reveal variant="left">
      {/* Feature 01 Badge */}
      {/* <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 999, background: "#F3E8FF", color: "#6C5CE7", fontSize: 12, fontWeight: 500, letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: 20 }}>
        <Sparkles size={14} color="#6C5CE7" /> FEATURE 01 • AI MATCHING
      </div> */}

      {/* Heading */}
      <h2 style={{ fontSize: "clamp(34px, 4vw, 48px)", fontWeight: 600, lineHeight: 1.15, letterSpacing: "-1px", color: "#6C5CE7", margin: "0 0 20px" }}>
        Find the Right
        Freelancer<br />
        in <span style={{ color: "#6C5CE7" }}>Seconds</span>
      </h2>

      {/* Description Paragraph */}
      <p style={{ color: "#6B7280", fontSize: "16px", lineHeight: "1.7", marginBottom: "32px", maxWidth: "480px" }}>
        Our AI helps you discover freelancers whose skills and experience align with your project requirements.
      </p>

      {/* Checklist Items with solid purple circles */}
      {[
        "Matches freelancers based on skills and expertise",
        "Discover relevant talent across multiple categories",
        "Filter by experience, skills, and availability",
        "Save time with AI-powered recommendations"
      ].map((item, idx) => (
        <Reveal key={item} variant="left" delay={idx * 0.06} style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 18 }}>
          <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#6C5CE7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
            <Check size={13} color="#FFFFFF" strokeWidth={3} />
          </div>
          <span style={{ color: "#374151", fontSize: 15, fontWeight: 500, lineHeight: "1.5" }}>{item}</span>
        </Reveal>
      ))}
    </Reveal>

    {/* Right Column: Freelancer Cards Container */}
    <Reveal variant="right" delay={0.1}>
      <div style={{ background: "#FFFFFF", borderRadius: 28, border: "1px solid #EAEBF0", padding: "32px", boxShadow: "0 10px 40px rgba(0,0,0,0.03)" }}>

        {/* Title above cards */}
        <div style={{ fontSize: 17, fontWeight: 500, color: "#0A0F2C", marginBottom: 20 }}>
          Recommended Freelancers
        </div>

        {/* 3 Freelancer Cards */}
        {[
          {
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
            name: "Sarah Chen",
            role: "UI/UX Designer",
            badge: "★ Best Match",
            badgeBg: "#DCFCE7",
            badgeColor: "#15803D",
            tags: ["UI/UX", "Figma", "Mobile"]
          },
          {
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
            name: "Marcus Roy",
            role: "React Developer",
            badge: "★ Great Match",
            badgeBg: "#FEF3C7",
            badgeColor: "#B45309",
            tags: ["React", "TypeScript", "Node"]
          },
          {
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
            name: "Arun Tom",
            role: "Mobile App Developer",
            badge: "★ Good Match",
            badgeBg: "#F3E8FF",
            badgeColor: "#6C5CE7",
            tags: ["Flutter", "Dart", "Firebase"]
          }
        ].map((f) => (
          <div key={f.name} style={{ background: "#FFFFFF", border: "1px solid #F3F4F6", borderRadius: 16, padding: "16px 20px", marginBottom: 16, boxShadow: "0 2px 10px rgba(0,0,0,0.02)", display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <img src={f.avatar} alt={f.name} style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover" }} />
                <div>
                  <div style={{ fontSize: 15, fontWeight: 500, color: "#0A0F2C" }}>{f.name}</div>
                  <div style={{ fontSize: 13, color: "#6B7280" }}>{f.role}</div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ background: f.badgeBg, color: f.badgeColor, fontSize: 12, fontWeight: 500, padding: "4px 12px", borderRadius: 999, display: "inline-flex", alignItems: "center", gap: 4 }}>
                  {f.badge}
                </span>
                <ChevronRight size={16} color="#9CA3AF" />
              </div>
            </div>
            {/* Tags */}
            <div style={{ display: "flex", gap: 8, paddingLeft: 58 }}>
              {f.tags.map(t => (
                <span key={t} style={{ background: "#F3F4F6", color: "#4B5563", fontSize: 12, fontWeight: 500, padding: "4px 10px", borderRadius: 8 }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}

        {/* Bottom Banner */}
        <div style={{ background: "rgba(243, 232, 255, 0.6)", border: "1px solid #EBE7FF", borderRadius: 14, padding: "12px 16px", display: "flex", alignItems: "center", gap: 8, color: "#6C5CE7", fontSize: 13, fontWeight: 600 }}>
          <Sparkles size={15} color="#6C5CE7" /> AI found relevant freelancers for your project.
        </div>

      </div>
    </Reveal>

  </section>
);

const BuildDreamTeam = () => {
  return (
    <section style={{ ...C.sec(LILAC), padding: "6rem 100px", display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 60, alignItems: "center" }}>

      {/* Left Column: Content */}
      <Reveal variant="left">
        {/* Badge */}
        {/* <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 999, background: "#E8E7FF", color: "#6C5CE7", fontSize: 12, fontWeight: 500, letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: 20 }}>
          <Users size={14} color="#6C5CE7" /> FEATURE 02 • COLLABORATION
        </div> */}

        {/* Heading */}
        <h2 style={{ fontSize: "clamp(34px, 4vw, 48px)", fontWeight: 500, lineHeight: 1.15, letterSpacing: "-1px", color: INK, margin: "0 0 20px" }}>
          Build Your Dream Team,<br />
          <span style={{}}>Deliver Together</span>
        </h2>

        {/* Paragraph */}
        <p style={{ color: "#6B7280", fontSize: "16px", lineHeight: "1.7", marginBottom: "32px", maxWidth: "480px" }}>
          Post projects, invite freelancers, and collaborate together on a single platform. Huzzler helps you manage requirements, milestones, and deliverables to ensure your project's success.
        </p>

        {/* CTA Button */}
        <button
          onClick={() => window.open("https://huzzler.app/", "_blank")}
          className="hz-btn-anim"
          style={{ padding: "12px 24px", borderRadius: "12px", border: "none", background: "#7C3AED", color: W, fontSize: "14px", fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "6px", boxShadow: "0 8px 24px rgba(124, 58, 237, 0.4)" }}
        >
          Get Matching <ArrowRight size={15} />
        </button>
      </Reveal>

      {/* Right Column: Card Graphic Mockup */}
      <Reveal variant="right" delay={0.1}>
        <div style={{ background: "#FFFFFF", borderRadius: 28, border: "1px solid #EAEBF0", padding: "32px", boxShadow: "0 10px 40px rgba(0,0,0,0.03)", maxWidth: "440px", margin: "0 auto" }}>

          {/* Card Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: G, textTransform: "uppercase", letterSpacing: "0.5px" }}>Design Phase</div>
              <div style={{ fontSize: 20, fontWeight: 600, color: INK, marginTop: 4 }}>Project: Mobile App</div>
            </div>
            <span style={{ background: "rgba(16, 185, 129, 0.1)", color: "#10B981", fontSize: 12, fontWeight: 600, padding: "6px 12px", borderRadius: 999 }}>
              Active
            </span>
          </div>

          {/* Team Members Section */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 14, fontWeight: 500, color: G, marginBottom: 12 }}>Team Members</div>
            <div style={{ display: "flex", alignItems: "center" }}>
              {/* Overlapping Avatars */}
              <div style={{ display: "flex", marginRight: 12 }}>
                {[
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
                  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
                ].map((avatar, idx) => (
                  <img
                    key={idx}
                    src={avatar}
                    alt={`Team member ${idx + 1}`}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      border: `2.5px solid ${W}`,
                      marginLeft: idx > 0 ? -10 : 0,
                      objectFit: "cover",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
                    }}
                  />
                ))}
              </div>
              <span style={{ fontSize: 13, fontWeight: 500, color: INK }}>+3 Team Members</span>
            </div>
          </div>

          {/* Progress Section */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span style={{ fontSize: 14, fontWeight: 500, color: G }}>Progress</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: P }}>75% Completed</span>
            </div>
            {/* Custom Progress Bar */}
            <div style={{ width: "100%", height: 8, background: "#F3F4F6", borderRadius: 999, overflow: "hidden" }}>
              <div style={{ width: "75%", height: "100%", background: P, borderRadius: 999 }} />
            </div>
          </div>

          {/* Card Footer */}
          <div style={{ borderTop: "1px solid #F3F4F6", paddingTop: 16, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Calendar size={15} color={G} />
              <span style={{ fontSize: 13, color: G }}>Target Date: <strong style={{ color: INK }}>Dec 20</strong></span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4, color: "#10B981", fontSize: 12, fontWeight: 500 }}>
              <CheckCircle2 size={14} color="#10B981" /> Target met
            </div>
          </div>

        </div>
      </Reveal>

    </section>
  );
};

const Marketplace = () => {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? FREELANCERS : FREELANCERS.filter(f => f.cat === active);
  return (
    <section style={C.sec(LILAC)}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Reveal variant="up"><div style={{ ...C.label, display: "inline-flex", alignItems: "center", gap: 6, justifyContent: "center", width: "100%" }}><Briefcase size={14} />Feature 02</div></Reveal>
        <Reveal variant="up" delay={0.05}><h2 style={{ ...C.h2, textAlign: "center" }}>Discover Top Professionals <span style={{ color: P }}>Worldwide</span></h2></Reveal>
      </div>
      <Reveal variant="fade" delay={0.1} style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 28, justifyContent: "center" }}>
        {[{ l: "All", ic: null }, { l: "Design", ic: <Palette size={14} /> }, { l: "Dev", ic: <Code size={14} /> }, { l: "Writing", ic: <PenLine size={14} /> }, { l: "Marketing", ic: <BarChart3 size={14} /> }, { l: "Video", ic: <Clapperboard size={14} /> }, { l: "Engineering", ic: <Settings size={14} /> }].map(({ l, ic }) => (
          <button key={l} className="hz-hover-scale" style={{ ...C.pill(active === l), display: "flex", alignItems: "center", gap: 6 }} onClick={() => setActive(l)}>{ic}{l}</button>
        ))}
      </Reveal>
      <div style={C.grid(3)}>
        {filtered.map(({ i, n, loc, tags, rate, rev, bg, fg }, idx) => (
          <Reveal key={n} variant="up" delay={idx * 0.08} className="hz-hover-lift" style={{ ...C.card, display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ ...C.avatar(bg, fg), width: 48, height: 48, fontSize: 14 }}>{i}</div>
              <div><div style={{ fontWeight: 500, fontSize: 15, color: INK }}>{n}</div><div style={{ fontSize: 12, color: G, display: "flex", alignItems: "center", gap: 4 }}>{loc} <CheckCircle2 size={13} color="#10B981" /> Verified</div></div>
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>{tags.map(t => <span key={t} style={{ padding: "4px 10px", borderRadius: 6, background: OFFWHITE, fontSize: 12, color: "#4B5563", border: "1px solid " + BORDER }}>{t}</span>)}</div>
            <div style={{ color: "#059669", fontSize: 14 }}>{rev}</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 18, fontWeight: 500, color: INK }}>{rate}</span>
              <button onClick={() => window.open("https://huzzler.app/", "_blank")} className="hz-btn-anim" style={{ ...C.btn(), padding: "8px 16px", fontSize: 13 }}>View Profile</button>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

const AIAssistant = () => (
  <section style={{
    padding: "6rem 100px", display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 60, alignItems: "center",
    background: "#080616", color: W
  }}>

    {/* Left Column: Heading & 6 Dark Feature Cards Grid */}
    <Reveal variant="left">
      {/* Feature 03 Badge */}
      {/* <div style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#A78BFA", fontSize: 13, fontWeight: 500, letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: 16 }}>
        <Zap size={14} color="#A78BFA" /> FEATURE 03
      </div> */}

      {/* Heading */}
      <h2 style={{ fontSize: "clamp(34px, 4vw, 48px)", fontWeight: 500, lineHeight: 1.15, letterSpacing: "-1px", color: W, margin: "0 0 20px" }}>
        AI-Powered Project<br />
        <span style={{ color: "#A78BFA" }}>Creation</span>
      </h2>

      {/* Description Paragraph */}
      <p style={{ color: "#A5A8E0", fontSize: "16px", lineHeight: "1.7", marginBottom: "36px", maxWidth: "480px" }}>
        Turn your ideas into well-structured project briefs in seconds. Our AI helps you plan, organize, and get started — faster.
      </p>

      {/* 6 Feature Cards (2 Columns) */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {[
          { icon: <FileText size={18} color="#C4B5FD" />, bg: "rgba(124, 58, 237, 0.2)", title: "Smart Briefs", desc: "AI creates clear, detailed project descriptions." },
          { icon: <Lightbulb size={18} color="#FDE047" />, bg: "rgba(234, 179, 8, 0.2)", title: "Suggested Skills", desc: "Get skill and role suggestions for your project." },
          { icon: <CheckCircle2 size={18} color="#4ADE80" />, bg: "rgba(34, 197, 94, 0.2)", title: "Scope & Deliverables", desc: "AI defines key deliverables and milestones." },
          { icon: <Clock size={18} color="#38BDF8" />, bg: "rgba(56, 189, 248, 0.2)", title: "Timeline Estimation", desc: "Receive realistic time estimates for every phase." },
          { icon: <Target size={18} color="#F43F5E" />, bg: "rgba(244, 63, 94, 0.2)", title: "Budget Guidance", desc: "AI suggests budget range based on project scope." },
          { icon: <MessageSquare size={18} color="#A78BFA" />, bg: "rgba(167, 139, 250, 0.2)", title: "Refine & Finalize", desc: "Review, edit, and publish your project with ease." }
        ].map(({ icon, bg, title, desc }, idx) => (
          <Reveal key={title} variant="scale" delay={idx * 0.05} style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: 16, padding: "16px", display: "flex", gap: 14, alignItems: "flex-start" }}>
            <div style={{ background: bg, padding: "10px", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              {icon}
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 500, color: W, marginBottom: 4 }}>{title}</div>
              <div style={{ fontSize: 12, color: "#94A3B8", lineHeight: "1.4" }}>{desc}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </Reveal>

    {/* Right Column: Dark Interactive AI Project Brief Card */}
    <Reveal variant="right" delay={0.1}>
      <div style={{ background: "#0E0B20", borderRadius: 28, border: "1px solid #231B4D", padding: "32px", boxShadow: "0 20px 50px rgba(0,0,0,0.5)" }}>

        {/* Your Input Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.9)", marginBottom: 12 }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(167, 139, 250, 0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <User size={15} color="#A78BFA" />
          </div>
          Your Input
        </div>

        {/* Input Prompt Box */}
        <div style={{ background: "#161233", border: "1px solid #2B2556", borderRadius: 14, padding: "14px 18px", fontSize: 13, color: "rgba(255,255,255,0.9)", marginBottom: 24, fontStyle: "italic", lineHeight: "1.5" }}>
          "Create a project brief for a mobile banking app redesign with a 6-week timeline."
        </div>

        {/* AI Generated Brief Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 500, color: "#A78BFA", marginBottom: 18 }}>
          <Sparkles size={16} color="#A78BFA" /> AI Generated Project Brief
        </div>

        {/* 6 Structured Brief Output Items */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 28 }}>
          {[
            { icon: <Users size={15} color="#A78BFA" />, title: "Project Overview", desc: "Redesign the existing mobile banking app to improve user experience, visual design, and overall usability." },
            { icon: <CheckSquare size={15} color="#A78BFA" />, title: "Objectives", desc: "Enhance UI/UX, simplify navigation, improve performance, and increase user engagement." },
            { icon: <ListFilter size={15} color="#A78BFA" />, title: "Key Deliverables", desc: "User research, wireframes, UI design, prototype, usability testing, and final design." },
            { icon: <Calendar size={15} color="#A78BFA" />, title: "Timeline", desc: "6 Weeks | 5 Key Phases" },
            { icon: <DollarSign size={15} color="#A78BFA" />, title: "Estimated Budget", desc: "Suggested budget range based on scope and industry standards." },
            { icon: <Users size={15} color="#A78BFA" />, title: "Recommended Roles", desc: "UI/UX Designer, Product Designer, Frontend Developer, QA Tester" }
          ].map(({ icon, title, desc }, idx) => (
            <div key={title} style={{ display: "flex", gap: 14, alignItems: "flex-start", paddingBottom: idx === 5 ? 0 : 12, borderBottom: idx === 5 ? "none" : "1px solid rgba(255, 255, 255, 0.06)" }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: "#231B4D", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                {icon}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: W }}>{title}</div>
                <div style={{ fontSize: 12, color: "#A5A8E0", lineHeight: "1.4", marginTop: 2 }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Action Buttons */}
        <div className="hz-brief-btns" style={{ display: "flex", gap: 12 }}>
          <button
            onClick={() => window.open("https://huzzler.app/freelance-dashboard/aigenerator", "_blank")}
            className="hz-btn-anim"
            style={{ flex: 1, padding: "12px 20px", borderRadius: 12, background: "#6C5CE7", color: W, fontSize: 13, fontWeight: 500, border: "none", cursor: "pointer", boxShadow: "0 8px 20px rgba(108, 92, 231, 0.4)", whiteSpace: "nowrap" }}
          >
            Use This Brief
          </button>
          <button className="hz-btn-anim" style={{ padding: "12px 20px", borderRadius: 12, background: "transparent", border: "1px solid #372E6B", color: "rgba(255,255,255,0.9)", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap" }}>
            <RotateCcw size={14} /> Regenerate Brief
          </button>
        </div>

      </div>
    </Reveal>

  </section>
);

const Messaging = () => (
  <section style={{ ...C.sec(W), display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
    <Reveal variant="left" className="hz-hover-lift" style={C.card}>
      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16, borderBottom: "1px solid " + BORDER, paddingBottom: 12, color: INK }}>Project Chat · Brand Redesign</div>
      {[{ i: "SC", bg: "#EDE9FE", fg: "#7C3AED", msg: <>Hey! I just uploaded the wireframes to the shared folder <PartyPopper size={14} style={{ display: "inline", verticalAlign: "-2px" }} /></>, a: "left" }, { i: "You", bg: "#F3F4F6", fg: "#4B5563", msg: "Love the direction! Can we hop on a quick call?", a: "right" }, { i: "SC", bg: "#EDE9FE", fg: "#7C3AED", msg: <>Absolutely, I'm free in 20 min. I'll send a Zoom link <Video size={14} style={{ display: "inline", verticalAlign: "-2px" }} /></>, a: "left" }, { i: "You", bg: "#F3F4F6", fg: "#4B5563", msg: <>Perfect. Also the client approved the color palette! <CheckCircle2 size={14} color="#10B981" style={{ display: "inline", verticalAlign: "-2px" }} /></>, a: "right" }].map(({ i, bg, fg, msg, a }, idx) => (
        <div key={idx} style={{ display: "flex", gap: 10, marginBottom: 12, flexDirection: a === "right" ? "row-reverse" : "row" }}>
          <div style={{ ...C.avatar(bg, fg), fontSize: 10 }}>{i}</div>
          <div style={{ background: a === "right" ? "rgba(124,58,237,0.1)" : OFFWHITE, borderRadius: 10, padding: "10px 12px", fontSize: 13, color: "#374151", maxWidth: "75%" }}>{msg}</div>
        </div>
      ))}
      <div style={{ display: "flex", gap: 8, marginTop: 12, padding: 10, background: OFFWHITE, borderRadius: 10, alignItems: "center" }}>
        <input placeholder="Write a message..." style={{ flex: 1, background: "transparent", border: "none", color: INK, fontSize: 13, outline: "none" }} />
        <button className="hz-btn-anim" style={{ ...C.btn(), padding: "6px 12px", fontSize: 12, borderRadius: 6, display: "flex", alignItems: "center" }}><ArrowRight size={14} /></button>
      </div>
    </Reveal>
    <Reveal variant="right" delay={0.1}>
      {/* <div style={{ ...C.label, display: "inline-flex", alignItems: "center", gap: 6 }}><MessageSquare size={14} />Feature 04</div> */}
      <h2 style={C.h2}>Collaborate In <span style={{ color: "#7C3AED" }}>Real Time</span></h2>
      <p style={{ color: G, fontSize: 16, marginBottom: 28 }}>Built-in messaging, file sharing, and video meetings — stay aligned without switching tabs.</p>
      {[[<MessageSquare size={20} />, "Threaded project chat with @mentions"], [<Folder size={20} />, "Drag-and-drop file sharing with previews"], [<Video size={20} />, "One-click video meetings via Zoom/Meet"], [<Bell size={20} />, "Smart notifications — only what matters"]].map(([icon, text], idx) => (
        <Reveal key={text} variant="right" delay={0.15 + idx * 0.06} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}><span>{icon}</span><span style={{ color: "#374151", fontSize: 15 }}>{text}</span></Reveal>
      ))}
    </Reveal>
  </section>
);

const Analytics = () => (
  <section style={{ ...C.sec("#FBFBFE"), padding: "6rem 100px", display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 60, alignItems: "center" }}>

    {/* Left Column: Heading & Checklist */}
    <Reveal variant="left">
      {/* Feature 05 Badge */}


      {/* Heading */}
      <h2 style={{ fontSize: "clamp(34px, 4vw, 48px)", fontWeight: 500, lineHeight: 1.15, letterSpacing: "-1px", color: "#6C5CE7", margin: "0 0 20px" }}>
        Build a Profile<br />
        That <span style={{ color: "#6C5CE7" }}>Stands Out</span>
      </h2>

      {/* Description Paragraph */}
      <p style={{ color: "#6B7280", fontSize: "16px", lineHeight: "1.7", marginBottom: "32px", maxWidth: "480px" }}>
        Showcase your skills, experience, and past work to get discovered by clients looking for top talent.
      </p>

      {/* 5 Checklist Items with solid purple circles */}
      {[
        "Highlight your skills and expertise",
        "Showcase portfolio work & case studies",
        "Add experience and verified credentials",
        "Set your preferred rates and availability",
        "Improve profile visibility with AI tips"
      ].map((item, idx) => (
        <Reveal key={item} variant="left" delay={idx * 0.06} style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 18 }}>
          <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#6C5CE7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
            <Check size={13} color="#FFFFFF" strokeWidth={3} />
          </div>
          <span style={{ color: "#374151", fontSize: 15, fontWeight: 500, lineHeight: "1.5" }}>{item}</span>
        </Reveal>
      ))}
    </Reveal>

    {/* Right Column: 5 Feature Cards Container */}
    <Reveal variant="right" delay={0.1}>
      <div style={{ background: "#FFFFFF", borderRadius: 28, border: "1px solid #EAEBF0", padding: "32px", boxShadow: "0 10px 40px rgba(0,0,0,0.03)", display: "flex", flexDirection: "column", gap: 14 }}>

        {[
          { icon: <User size={18} color="#6C5CE7" />, title: "Bio & Overview", desc: "Craft a compelling summary of your professional background and unique strengths." },
          { icon: <Folder size={18} color="#6C5CE7" />, title: "Portfolio & Projects", desc: "Upload your best work and showcase real-world results to build trust." },
          { icon: <Briefcase size={18} color="#6C5CE7" />, title: "Experience", desc: "Detail past work history, roles held, and key accomplishments." },
          { icon: <Tag size={18} color="#6C5CE7" />, title: "Services", desc: "List the specific services you offer along with transparent pricing." },
          { icon: <Eye size={18} color="#6C5CE7" />, title: "Visibility", desc: "Get AI recommendations on how to optimize your profile for maximum reach." }
        ].map(({ icon, title, desc }) => (
          <div key={title} style={{ background: "#FFFFFF", border: "1px solid #F3F4F6", borderRadius: 18, padding: "16px 20px", display: "flex", alignItems: "center", gap: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
            <div style={{ width: 42, height: 42, borderRadius: "50%", background: "#F3E8FF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              {icon}
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 500, color: "#0A0F2C" }}>{title}</div>
              <div style={{ fontSize: 12.5, fontWeight: 500, color: "#6B7280", marginTop: 2, lineHeight: "1.4" }}>{desc}</div>
            </div>
          </div>
        ))}

        {/* Bottom Banner */}
        <div style={{ background: "rgba(243, 232, 255, 0.6)", border: "1px solid #EBE7FF", borderRadius: 16, padding: "14px 18px", display: "flex", alignItems: "center", gap: 10, color: "#6C5CE7", fontSize: 13, fontWeight: 500, marginTop: 4 }}>
          <Sparkles size={16} color="#6C5CE7" style={{ flexShrink: 0 }} /> Profile optimization increases your profile views and client inquiries by up to 3x.
        </div>

      </div>
    </Reveal>

  </section>
);
const WhyHuzzler = () => (
  <section style={{ ...C.sec(NAVY), textAlign: "center", color: W }}>
    <Reveal variant="up">
      <h2 style={{ ...C.h2, textAlign: "center", color: W }}>
        Everything You Need to <span style={C.grad}>Build Great Teams</span>
      </h2>
    </Reveal>
    <Reveal variant="up" delay={0.05}>
      <p style={{ color: "#9CA3AF", fontSize: 18, maxWidth: 680, margin: "0 auto 3rem", lineHeight: 1.6 }}>
        Huzzler brings businesses and skilled professionals together through AI-powered matching, seamless collaboration, and an intelligent workspace designed to help projects move from idea to execution faster.
      </p>
    </Reveal>
    <div style={C.grid(3)}>
      {[
        [<Zap size={26} color={P2} />, "AI-Powered Talent Matching", "Our intelligent matching engine recommends the most relevant freelancers based on your project requirements, skills, experience, availability, and industry expertise."],
        [<Shield size={26} color={P2} />, "Verified Talent Network", "Browse trusted professionals with verified profiles, portfolios, and expertise across design, development, AI, marketing, content creation, business consulting, and more."],
        [<MessageSquare size={26} color={P2} />, "Smart Project Workspace", "Manage project requirements, track milestones, organize files, communicate with freelancers, and keep every project moving from one centralized workspace."],
        [<TrendingUp size={26} color={P2} />, "Seamless Collaboration", "Work together effortlessly with built-in messaging, task updates, document sharing, feedback, and project discussions—all without leaving the platform."],
        [<Globe size={26} color={P2} />, "Faster Hiring Process", "Post projects, discover qualified professionals, invite the right talent, and start collaborating in less time with AI-assisted recommendations."],
        [<Briefcase size={26} color={P2} />, "Built for Modern Work", "Whether you're a startup, agency, enterprise, or independent professional, Huzzler helps you connect, collaborate, and deliver high-quality work from anywhere."],
      ].map(([icon, title, desc], idx) => (
        <Reveal
          key={title}
          variant="up"
          delay={idx * 0.06}
          className="hz-hover-lift"
          style={{ ...C.cardOnDark, textAlign: "left", padding: "1.75rem" }}
        >
          <div style={{ marginBottom: 18 }}>{icon}</div>
          <div style={{ fontSize: 19, fontWeight: 500, marginBottom: 10, color: W }}>{title}</div>
          <div style={{ fontSize: 14.5, lineHeight: 1.7, color: "#9CA3AF" }}>{desc}</div>
        </Reveal>
      ))}
    </div>
  </section>
);

const howItWorksSteps = [
  {
    num: "1",
    title: "Create a Post",
    desc: "Create a job post manually or use AI to generate a clear, well-structured post in seconds.",
    hasPill: true,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6C5CE7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="12" y1="18" x2="12" y2="12" />
        <line x1="9" y1="15" x2="15" y2="15" />
      </svg>
    ),
  },
  {
    num: "2",
    title: "AI Finds the Best Matches",
    desc: "Our AI scans profiles, skills, and experience to find the most relevant freelancers or projects for you.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6C5CE7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
  },
  {
    num: "3",
    title: "Review & Shortlist",
    desc: "Review AI-recommended matches or all applications. Compare profiles, skills, and portfolios to shortlist the perfect fit.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6C5CE7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="8.5" cy="7" r="4" />
        <polyline points="17 11 19 13 23 9" />
      </svg>
    ),
  },
  {
    num: "4",
    title: "Connect & Discuss",
    desc: "Start a conversation, discuss details, clarify expectations, and find the right match with confidence.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6C5CE7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    num: "5",
    title: "Get Guidance Anytime",
    desc: "Use our AI chatbot for suggestions, answers, and support—whenever you need it.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6C5CE7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
  {
    num: "6",
    title: "Work & Succeed Together",
    desc: "Move forward, achieve your goals, and build lasting professional relationships.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6C5CE7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </svg>
    ),
  },
];

const HowItWorks = () => (
  <section style={C.sec(W)}>
    <div style={{ textAlign: "center", marginBottom: "3rem" }}>
      <Reveal variant="up">
        {/* <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(108,92,231,0.1)", color: "#6C5CE7", padding: "6px 16px", borderRadius: 999, fontWeight: 500, fontSize: 11, letterSpacing: "1px", textTransform: "uppercase" }}>
          ✦ HOW IT WORKS
        </div> */}
      </Reveal>
      <Reveal variant="up" delay={0.05}>
        <h2 style={{ ...C.h2, textAlign: "center", fontSize: 40, fontWeight: 500, marginTop: 14, marginBottom: 12 }}>
          How <span style={{ color: "#6C5CE7" }}>Huzzler</span> Works
        </h2>
      </Reveal>
      <Reveal variant="up" delay={0.1}>
        <p style={{ color: "#6B7280", fontSize: 15, maxWidth: 640, margin: "0 auto" }}>
          Whether you post manually or let AI do the heavy lifting, Huzzler connects the <span style={{ color: "#6C5CE7", fontWeight: 500 }}>right people</span> and makes work happen.
        </p>
      </Reveal>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14, alignItems: "stretch" }}>
      {howItWorksSteps.map((step, i) => (
        <div key={step.num} style={{ display: "flex", alignItems: "stretch", gap: 8, flex: 1, position: "relative" }}>
          <Reveal variant="up" delay={i * 0.08} className="hz-hover-lift" style={{ ...C.card, padding: "1.5rem 1.25rem", flex: 1, minWidth: 0, minHeight: 250, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", position: "relative", borderRadius: 24, border: "1px solid #EAEBF0", background: "#FFFFFF", justifyContent: "space-between" }}>
            <div style={{ position: "absolute", top: 14, left: 14, width: 24, height: 24, borderRadius: "50%", background: "#6C5CE7", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 500, fontSize: 11 }}>
              {step.num}
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", paddingTop: 10 }}>
              <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#F3E8FF", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14, border: "1px solid #EBE7FF" }}>
                {step.icon}
              </div>
              <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 8, color: "#0A0F2C", lineHeight: "1.3" }}>
                {step.title}
              </div>
              <div style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.5 }}>
                {step.desc}
              </div>
            </div>

            {step.hasPill ? (
              <div style={{ marginTop: 12, display: "inline-flex", alignItems: "center", gap: 4, padding: "4px 10px", borderRadius: 999, border: "1px solid #E5E7EB", background: "#F9FAFB", fontSize: 11, color: "#6B7280" }}>
                <span> Manual</span>
                <span style={{ color: "#D1D5DB" }}>or</span>
                <span style={{ color: "#6C5CE7", fontWeight: 500 }}>✦ AI</span>
              </div>
            ) : (
              <div style={{ height: 16 }} />
            )}
          </Reveal>
          {i < 5 && (
            <div style={{ color: "#6C5CE7", fontSize: 18, fontWeight: 500, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.6 }}>
              ›
            </div>
          )}
        </div>
      ))}
    </div>
  </section>
);

const Testimonials = () => (
  <section style={C.sec(LILAC)}>
    <div style={{ textAlign: "center", marginBottom: "3rem" }}>
      <Reveal variant="up"><div style={C.label}><Heart size={14} style={{ verticalAlign: "-2px", marginRight: 4 }} fill={P} />Testimonials</div></Reveal>
      <Reveal variant="up" delay={0.05}><h2 style={{ ...C.h2, textAlign: "center" }}>Loved By <span style={{ color: P }}>Businesses Worldwide</span></h2></Reveal>
    </div>
    <div style={C.grid(2)}>
      {[{ q: "Huzzler AI completely transformed our hiring process. We went from 3 weeks to hire down to 3 days.", i: "SM", n: "Sofia Martínez", r: "Head of Ops, Luxe Media", bg: "#EDE9FE", fg: "#7C3AED" }, { q: "The AI proposal generator alone has saved our team over 8 hours per week.", i: "JL", n: "James Liu", r: "CTO, FinScale", bg: "#D1FAE5", fg: "#065F46" }, { q: "My acceptance rate jumped from 12% to 58% with Huzzler's smart matching.", i: "AK", n: "Arjun Kapoor", r: "Freelance Developer", bg: "#FEF3C7", fg: "#92400E" }, { q: "Zero payment disputes across 40+ projects thanks to the escrow system.", i: "PW", n: "Priya Walsh", r: "Founder, Craft Studio", bg: "#DBEAFE", fg: "#1E3A5F" }].map(({ q, i, n, r, bg, fg }, idx) => (
        <Reveal key={n} variant="up" delay={idx * 0.08} className="hz-hover-lift" style={C.card}>
          <div style={{ color: "#F59E0B", fontSize: 16, marginBottom: 12 }}>★★★★★</div>
          <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.7, marginBottom: 20, fontStyle: "italic" }}>"{q}"</p>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ ...C.avatar(bg, fg), width: 40, height: 40 }}>{i}</div>
            <div><div style={{ fontWeight: 500, fontSize: 14, color: INK }}>{n}</div><div style={{ fontSize: 12, color: G }}>{r}</div></div>
          </div>
        </Reveal>
      ))}
    </div>
  </section>
);

const Enterprise = () => (
  <section style={{ ...C.sec(NAVY), textAlign: "center", paddingLeft: 100, paddingRight: 100 }}>
    <div style={{ width: "100%", padding: "2.5rem 0" }}>
      <Reveal variant="up"><div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 999, background: "rgba(124,58,237,0.25)", color: "#C4B5FD", fontSize: 11, fontWeight: 600, marginBottom: 20 }}><Shield size={13} /> ENTERPRISE</div></Reveal>
      <Reveal variant="up" delay={0.05}><h2 style={{ ...C.h2, textAlign: "center", color: W, fontSize: 30, marginBottom: 10 }}>Built For <span style={{ color: P2 }}>Growing Businesses</span></h2></Reveal>
      <Reveal variant="up" delay={0.1}><p style={{ color: "#9CA3AF", fontSize: 14, maxWidth: 460, margin: "0 auto 28px" }}>Advanced controls, custom workflows, and dedicated support for teams that demand more.</p></Reveal>
      <div style={C.grid(3, 14)}>
        {[[<Building2 size={13} />, "Multi-Team Management", "Unified workspace for all departments with role-based access"],
        [<Key size={13} />, "Advanced Permissions", "Granular controls so everyone sees exactly what they need"],
        [<Settings size={13} />, "Custom Workflows", "Build approval flows and automation that match your process"],
        [<BarChart3 size={13} />, "Enterprise Analytics", "Executive dashboards with exportable data and API access"],
        [<Headphones size={13} />, "Priority Support", "Dedicated CSM with SLA guarantees and on-call assistance"],
        [<Lock size={13} />, "Security Controls", "SSO, SAML, GDPR, SOC2 Type II, and custom data retention"],
        ].map(([icon, title, desc], idx) => (
          <Reveal key={title} variant="up" delay={0.15 + idx * 0.06} className="hz-hover-glow" style={{
            padding: "0.9rem", textAlign: "left", borderRadius: 10,
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)"
          }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
              <div style={{ width: 26, height: 26, borderRadius: 7, background: "rgba(124,58,237,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: P2 }}>{icon}</div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 500, color: W, marginBottom: 3 }}>{title}</div>
                <div style={{ fontSize: 10.5, color: "#9CA3AF", lineHeight: 1.5 }}>{desc}</div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const CTA = () => (
  <section className="hz-features-cta" style={{
    position: "relative",
    padding: "6rem 2rem 11rem",
    textAlign: "center",
    background: "linear-gradient(135deg, #7C3AED 0%, #6366F1 50%, #3B82F6 100%)",
    color: W,
    overflow: "hidden"
  }}>
    {/* Subtle Glow Orbs in Background */}
    <div style={{ position: "absolute", top: "-50%", left: "20%", width: "400px", height: "400px", borderRadius: "50%", background: "rgba(255,255,255,0.1)", filter: "blur(60px)", pointerEvents: "none" }} />

    <div style={{ position: "relative", zIndex: 10, maxWidth: "800px", margin: "0 auto" }}>
      <Reveal variant="scale">
        <h2 style={{ fontSize: "clamp(34px, 4vw, 50px)", fontWeight: 500, lineHeight: 1.15, letterSpacing: "-1.5px", color: W, margin: "0 0 20px" }}>
          Experience The Future Of<br />
          Freelance Hiring
        </h2>
      </Reveal>

      <Reveal variant="up" delay={0.1}>
        <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "16px", lineHeight: "1.7", maxWidth: "520px", margin: "0 auto 36px" }}>
          Join thousands of companies using Huzzler AI to hire faster, collaborate better, and scale smarter.
        </p>
      </Reveal>

      <Reveal variant="up" delay={0.18} style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", alignItems: "center" }}>
        <button
          onClick={() => window.open("https://play.google.com/store/apps/details?id=com.huzzler.app", "_blank")}
          className="hz-btn-anim"
          style={{ padding: "12px 26px", borderRadius: 12, border: "none", background: W, color: "#6C5CE7", fontSize: 14, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, boxShadow: "0 10px 25px rgba(0,0,0,0.15)" }}
        >
          Get Started Free <ArrowRight size={16} />
        </button>
        {/* <button
          onClick={() => window.open("https://huzzler.app/freelance-dashboard/browse-projects", "_blank")}
          className="hz-btn-anim"
          style={{ padding: "12px 26px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.12)", color: W, fontSize: 14, fontWeight: 600, cursor: "pointer", backdropFilter: "blur(8px)" }}
        >
          Explore Talent
        </button>
        <button
          onClick={() => window.open("https://huzzler.app/", "_blank")}
          className="hz-btn-anim"
          style={{ padding: "12px 26px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.12)", color: W, fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, backdropFilter: "blur(8px)" }}
        >
          <Calendar size={15} /> Book Demo
        </button> */}
      </Reveal>
    </div>
  </section>
);



export default function Features() {
  return (
    <div style={C.body} className="hz-features-wrapper">
      <AnimationStyles />
      <Hero />
      <Overview />
      <AIMatching />
      <BuildDreamTeam />
      {/* <Marketplace /> */}
      <AIAssistant />
      <Messaging />
      <Analytics />
      <WhyHuzzler />
      {/* <HowItWorks /> */}
      <CTA />
      <style>{`
        @media (max-width: 600px) {
          .hz-features-wrapper video {
            object-position: 18% center !important;
          }
        }
        @media (max-width: 900px) {
          .hz-features-wrapper .hz-brief-btns {
            flex-direction: column !important;
          }
          .hz-features-wrapper section.hz-features-cta {
            padding-bottom: 120px !important;
          }
          .hz-features-wrapper * { box-sizing: border-box !important; }
          body, html { overflow-x: hidden !important; width: 100% !important; }
          
          .hz-features-wrapper section, .hz-features-wrapper main, .hz-features-wrapper div { max-width: 100vw !important; }
          
          .hz-features-wrapper [style*="100px"] {
             padding-left: 20px !important;
             padding-right: 20px !important;
          }
          
          .hz-features-wrapper section {
            padding-top: 40px !important;
            padding-bottom: 40px !important;
            height: auto !important; 
            min-height: auto !important;
          }
          
          .hz-features-wrapper div[style*="grid-template-columns"], 
          .hz-features-wrapper section[style*="grid-template-columns"], 
          .hz-features-wrapper div[style*="display: grid"],
          .hz-features-wrapper .grid { 
            grid-template-columns: 1fr !important; 
            display: flex !important; 
            flex-direction: column !important; 
            gap: 30px !important;
          }
          
          .hz-features-wrapper div[style*="display: flex"][style*="gap: 60px"],
          .hz-features-wrapper div[style*="display: flex"][style*="gap: 40px"],
          .hz-features-wrapper div[style*="display: flex"][style*="gap: 80px"] {
             flex-direction: column !important;
             align-items: flex-start !important;
          }
          
          .hz-features-wrapper h1, 
          .hz-features-wrapper h2, 
          .hz-features-wrapper [style*="font-size: 64"], 
          .hz-features-wrapper [style*="font-size: 42"], 
          .hz-features-wrapper h1[style*="fontSize: 64"], 
          .hz-features-wrapper h2[style*="fontSize: 42"] { 
            font-size: clamp(32px, 8vw, 42px) !important; 
            line-height: 1.2 !important; 
          }
          
          .hz-features-wrapper div[style*="width: 50%"], 
          .hz-features-wrapper div[style*="width: 60%"], 
          .hz-features-wrapper div[style*="width: 40%"] { 
            width: 100% !important; 
          }
          
          .hz-features-wrapper div[style*="justify-content: flex-end"] {
            justify-content: flex-start !important;
          }
        }
      `}</style>
    </div>
  );
}