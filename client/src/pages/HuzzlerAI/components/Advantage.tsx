import { motion } from "framer-motion";
import { Zap, Shield, MessageSquare, TrendingUp, Globe, Bot } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "AI Talent Matching",
    desc: "Our proprietary AI engine analyzes 200+ data points to match your project with the ideal talent profile in seconds, not days.",
  },
  {
    icon: Shield,
    title: "Verified Professionals",
    desc: "Every freelancer passes a rigorous multi-step verification — skills tests, portfolio reviews, and background checks included.",
  },
  {
    icon: MessageSquare,
    title: "Real-time Collaboration",
    desc: "Built-in workspace with messaging, file sharing, and video calls. Everything you need to collaborate without leaving the platform.",
  },
  {
    icon: TrendingUp,
    title: "Project Success Tracking",
    desc: "Milestone tracking, time reports, and performance dashboards give you complete visibility into every active project in real time.",
  },
  {
    icon: Globe,
    title: "Global Talent Access",
    desc: "Tap into a diverse pool of 50,000+ vetted professionals across 120+ countries. The best talent, wherever they are in the world.",
  },
  {
    icon: Bot,
    title: "Built-in AI Assistant",
    desc: "Your 24/7 AI copilot helps write job briefs, review proposals, and suggest optimizations — making you a smarter, faster hirer.",
  },
];

export default function Advantage() {
  return (
    <section className="bg-black py-24 px-6 md:px-12 lg:px-[100px]">
      <div className="max-w-[1456px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-14">
          {/* <span className="inline-block text-[11px] font-semibold tracking-wide text-violet-300 bg-white/10 rounded-full px-3 py-1.5 mb-5">
            THE ADVANTAGE
          </span> */}
          <h2 className="text-[36px] font-medium text-white tracking-tight mb-4">
            The Huzzler Advantage
          </h2>
          <p className="text-white/45 text-[15px] max-w-[460px] mx-auto leading-relaxed">
            Six reasons why ambitious companies choose Huzzler AI over
            traditional hiring platforms.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="bg-white rounded-2xl p-7 min-h-[200px] flex flex-col items-start text-left"
            >
              <f.icon className="w-[26px] h-[26px] text-violet-600" strokeWidth={2} />
              <h3 className="text-[16px] font-medium text-gray-900 mt-4 mb-2">
                {f.title}
              </h3>
              <p className="text-[13px] text-gray-600 leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}