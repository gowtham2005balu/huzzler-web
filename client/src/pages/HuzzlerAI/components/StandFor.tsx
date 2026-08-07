import { motion } from "framer-motion";

export default function StandFor() {
  return (
    <section className="bg-white pt-24 pb-28 px-6 md:px-12 lg:px-[100px]">
      <div className="max-w-[1456px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-14">
          <span className="inline-block text-[15px] font-semibold tracking-wide text-violet-500 bg-white/10 rounded-full px-3 py-1.5 mb-5">
            OUR PURPOSE
          </span>
          <h2 className="text-[36px] font-medium text-black tracking-tight">
            What We Stand For
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative rounded-2xl p-9 h-[225px] overflow-hidden flex flex-col items-start text-left"
            style={{
              background: "linear-gradient(135deg, #a9d3fb 0%, #79b3da 100%)",
            }}
          >
            <span className="text-[11px] font-medium tracking-wide text-gray-700/60">
              OUR MISSION
            </span>
            <h3 className="text-[26px] font-medium text-gray-900 mt-3 mb-3">
              Empowering Every Hire
            </h3>
            <p className="text-[14px] text-gray-700/70 leading-relaxed max-w-[420px]">
              Empower businesses and freelancers with intelligent tools that
              make hiring faster, collaboration easier, and opportunities
              accessible worldwide — for everyone.
            </p>
            <svg
              className="absolute bottom-4 right-6 w-12 h-12 text-white/30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
              <circle cx="12" cy="12" r="5" strokeWidth="1.5" />
              <circle cx="12" cy="12" r="1.5" strokeWidth="1.5" />
            </svg>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative rounded-2xl p-9 h-[225px] overflow-hidden flex flex-col items-start text-left"
            style={{
              background: "linear-gradient(135deg, #65df9c 0%, #45863d 100%)",
            }}
          >
            <span className="text-[11px] font-medium tracking-wide text-gray-700/60">
              OUR VISION
            </span>
            <h3 className="text-[26px] font-medium text-gray-900 mt-3 mb-3">
              A World Without Talent Borders
            </h3>
            <p className="text-[14px] text-gray-700/70 leading-relaxed max-w-[420px]">
              Create the most trusted AI-powered freelance ecosystem where
              talent and opportunity connect without barriers — anywhere, any
              time, at any scale.
            </p>
            <svg
              className="absolute bottom-4 right-6 w-12 h-12 text-white/30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
              <path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" strokeWidth="1.5" />
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
}