import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative bg-[#0d0a23] overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 900px 600px at 70% 10%, rgba(99,70,230,0.35), transparent 60%), radial-gradient(ellipse 1000px 700px at 20% 90%, rgba(76,29,149,0.4), transparent 60%), #100b29",
        }}
      />
      <div className="relative max-w-[1456px] mx-auto px-6 lg:px-10 pt-[80px] pb-[120px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-violet-200 bg-white/10 border border-white/10 rounded-full px-3 py-1.5 mb-6">
              ABOUT HUZZLER AI
            </span>
            <h1 className="text-[44px] leading-[1.12] font-medium text-white tracking-tight mb-5">
              Building the
              <br />
              <span className="text-violet-400">Future of Freelancing</span>
              <br />
              with AI
            </h1>
            <p className="text-white/55 text-[15px] leading-relaxed max-w-[420px] mb-8">
              Huzzler AI connects ambitious businesses with world-class
              freelancers through intelligent matching, AI-powered hiring, and
              seamless project collaboration.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-xs sm:max-w-none">
              <button
                onClick={() => window.open("https://huzzler.app/", "_blank")}
                className="bg-gradient-to-r from-violet-500 to-indigo-500 text-white text-[14px] font-semibold rounded-full px-6 py-3.5 hover:opacity-90 transition-opacity"
              >
                Explore Services
              </button>
              <button
                onClick={() => window.open("https://huzzler.app/", "_blank")}
                className="border border-white/20 text-white text-[14px] font-semibold rounded-full px-6 py-3.5 hover:bg-white/5 transition-colors"
              >
                Join as Freelancer
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative rounded-[24px] overflow-hidden h-[280px] lg:h-[380px] shadow-2xl border border-white/10"
          >
            <img
              src="https://res.cloudinary.com/dqsyzpxkg/image/upload/v1784612262/ca6da6a48177dbba2f6d658598c8348df4f8f507_nzanng.png"
              alt="Huzzler AI Building the Future of Freelancing"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>

      <Marquee />
    </section>
  );
}

function Marquee() {
  const items = [
    "AI-POWERED HIRING",
    "VERIFIED FREELANCERS",
    "GLOBAL TALENT POOL",
    "24/7 AI SUPPORT",
    "REAL-TIME COLLABORATION",
    "SMART MATCHING ALGORITHM",

  ];
  const full = [...items, ...items];
  return (
    <div className="relative bg-black/40 border-t border-white/10 py-8 overflow-hidden">
      <div className="ticker-track">
        {full.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-2 whitespace-nowrap px-6"
          >
            <span className="text-[18px] font-medium tracking-widest text-white/50">
              {item}
            </span>
            <span className="w-2 h-2 rounded-full bg-violet-400" />
          </div>
        ))}
      </div>
    </div>
  );
}