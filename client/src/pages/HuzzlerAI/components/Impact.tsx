import { motion } from "framer-motion";
import { Users, Briefcase, Send, Star } from "lucide-react";

const stats = [
  {
    icon: <Users size={22} className="text-[#a855f7]" />,
    iconBg: "bg-[#a855f7]/10",
    title: "Freelancers Empowered",
    desc: "Helping professionals grow their careers and reach their potential.",
  },
  {
    icon: <Briefcase size={22} className="text-[#a3e635]" />,
    iconBg: "bg-[#a3e635]/10",
    title: "Opportunities Created",
    desc: "Connecting talent with the right projects to create meaningful work.",
  },
  {
    icon: <Send size={22} className="text-[#60a5fa]" />,
    iconBg: "bg-[#60a5fa]/10",
    title: "Projects Completed",
    desc: "Bringing ideas to life through successful collaborations.",
  },
  {
    icon: <Star size={22} className="text-[#fbbf24]" />,
    iconBg: "bg-[#fbbf24]/10",
    title: "Trusted by the Community",
    desc: "Building a reliable platform loved by freelancers and clients alike.",
  },
];

export default function Impact() {
  return (
    <section className="bg-black pt-24 pb-0 overflow-hidden" style={{ paddingLeft: 0, paddingRight: 0 }}>
      <div className="max-w-[1456px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[640px_520px] gap-14 justify-center items-center mx-auto">
          {/* Left Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-[2.5rem] overflow-hidden h-[380px] shadow-2xl"
          >
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
              alt="Community Impact"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Right Content Section */}
          <div className="flex flex-col">
            <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-wider text-violet-300 bg-white/[0.04] border border-white/5 rounded-full px-4 py-2 w-max mb-6">
              <Users size={12} className="text-violet-400" />
              COMMUNITY IMPACT
            </div>
            
            <h2 className="text-[44px] leading-[1.1] font-medium text-white tracking-tight mb-10 text-left">
              Results That
              <br />
              Make an Impact
            </h2>
            
            <div className="flex flex-col gap-4">
              {stats.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex gap-5 bg-[#0a0a0f] border border-white/[0.04] rounded-2xl p-5 items-start text-left transition-all duration-300 hover:bg-[#121218] hover:border-white/10"
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${s.iconBg}`}>
                    {s.icon}
                  </div>
                  <div className="flex flex-col pt-1 text-left">
                    <h3 className="text-[17px] font-medium text-white mb-2">{s.title}</h3>
                    <p className="text-[14px] text-[#94a3b8] leading-relaxed pr-2">
                      {s.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}