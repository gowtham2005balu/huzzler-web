import { User, Briefcase, MessageSquare, Zap, ShieldCheck, Sparkles } from "lucide-react";

const benefits = [
  {
    icon: User,
    title: "Verified Talent",
    desc: "Connect with skilled professionals who are verified and trusted."
  },
  {
    icon: Briefcase,
    title: "Quality Projects",
    desc: "Access handpicked opportunities that match your skills and goals."
  },
  {
    icon: MessageSquare,
    title: "Seamless Collaboration",
    desc: "Communicate and work together effortlessly in one place."
  },
  {
    icon: Zap,
    title: "Smart Automation",
    desc: "Use intelligent tools that save time and simplify your workflow."
  },
  {
    icon: ShieldCheck,
    title: "Secure & Reliable",
    desc: "Your data and work are protected with enterprise-grade security."
  }
];

export default function Metrics() {
  return (
    <section className="bg-black pt-36 pb-24 px-6 md:px-12 lg:px-[100px]">
      <div className="max-w-[1456px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold tracking-widest text-violet-300 bg-white/5 rounded-full px-4 py-1.5 mb-6 uppercase">
            <Sparkles size={14} className="text-violet-400" /> BENEFITS
          </span>
          <h2 className="text-[42px] font-medium text-white tracking-tight mb-5">
            Built for Modern <span className="text-violet-400">Workflows</span>
          </h2>
          <p className="text-white/60 text-[16px] max-w-[500px] mx-auto leading-relaxed">
            Everything you need to work smarter, collaborate better, and deliver great results.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.title}
                className="bg-[#0a0a0c] border border-white/10 rounded-2xl p-8 flex flex-col items-center text-center hover:bg-[#111114] transition-colors"
              >
                <div className="w-14 h-14 rounded-full bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-6">
                  <Icon size={24} className="text-violet-400" />
                </div>
                <h3 className="text-white font-medium text-[15px] mb-3">{b.title}</h3>
                <p className="text-white/50 text-[13px] leading-relaxed">
                  {b.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}