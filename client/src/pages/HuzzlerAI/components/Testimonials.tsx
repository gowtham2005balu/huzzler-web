import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "Huzzler AI found us the perfect developer in under 24 hours. The matching was eerily accurate — it felt like the AI actually understood our culture, not just the job description.",
    name: "Marcus L.",
    role: "CTO, Nexora Labs",
    color: "bg-[#dcd3fb]",
  },
  {
    quote:
      "We scaled our design team by 3x in one month during a product launch sprint. Huzzler's vetting meant every hire was immediately productive from their very first day.",
    name: "Alicia Torres",
    role: "Head of Product, Luma",
    color: "bg-[#e2f178]",
  },
  {
    quote:
      "The AI brief builder alone saved us hours of back-and-forth. Our proposals were higher quality because the platform helped us articulate exactly what we needed.",
    name: "James K.",
    role: "Founder, Stackwave",
    color: "bg-[#aedcf9]",
  },
  {
    quote:
      "I've tried every freelance platform. Huzzler AI is different — the projects are serious, the clients are professional, and the AI finds work that genuinely matches my skill set.",
    name: "Yemi O.",
    role: "Senior Freelancer, Lagos",
    color: "bg-[#fbe199]",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-[#f5f3fb] py-24 px-6 md:px-12 lg:px-[100px]">
      <div className="max-w-[1456px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-14">
          <span className="inline-block text-[11px] font-semibold tracking-wide text-violet-600 bg-violet-100 rounded-full px-3 py-1.5 mb-5">
            TRUSTED WORLDWIDE
          </span>
          <h2 className="text-[36px] leading-tight font-medium text-gray-900 tracking-tight">
            Trusted by Businesses
            <br />
            Worldwide
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`${t.color} rounded-2xl p-6 h-[280px] flex flex-col justify-between`}
            >
              <div>
                <div className="text-amber-500 text-[13px] mb-3">
                  ★★★★★
                </div>
                <p className="text-[13px] text-gray-700/80 leading-relaxed">
                  "{t.quote}"
                </p>
              </div>
              <div className="flex items-center gap-2.5 mt-4">
                <div className="w-8 h-8 rounded-full bg-gray-400/40" />
                <div>
                  <div className="text-[13px] font-medium text-gray-900 leading-none">
                    {t.name}
                  </div>
                  <div className="text-[11px] text-gray-600/70 mt-0.5">
                    {t.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}