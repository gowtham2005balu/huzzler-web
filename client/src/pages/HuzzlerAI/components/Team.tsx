import { motion } from "framer-motion";

const team = [
  {
    name: "Alex Morgan",
    role: "CEO & FOUNDER",
    img: "/images/ph1.png",
    color: "bg-[#dcd3fb]",
    desc: "10+ years building SaaS products. Previously led product at two unicorn startups. Passionate about the future of distributed work.",
  },
  {
    name: "Priya Sharma",
    role: "PRODUCT DESIGN LEAD",
    img: "/images/ph6.jpg",
    color: "bg-[#fbe199]",
    desc: "Award-winning designer with a background in human-centered UX. Crafted interfaces used by millions of professionals worldwide.",
  },
  {
    name: "David Chen",
    role: "AI ENGINEERING LEAD",
    img: "/images/ph5.jpg",
    color: "bg-[#a6ecc9]",
    desc: "ML researcher turned product builder. Designed AI matching systems that process millions of signals to surface the perfect talent fit.",
  },
  {
    name: "Sofia Reyes",
    role: "COMMUNITY MANAGER",
    img: "/images/ph4.png",
    color: "bg-[#aedcf9]",
    desc: "Built and scaled communities from zero to 50K+ members. Advocates daily for our freelancers and the businesses they power worldwide.",
  },
];

export default function Team() {
  return (
    <section className="bg-[#f5f3fb] py-24 px-6 md:px-12 lg:px-[100px]">
      <div className="max-w-[1456px] mx-auto px-6 lg:px-10">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="inline-block text-[11px] font-semibold tracking-wide text-violet-600 bg-violet-100 rounded-full px-3 py-1.5 mb-5">
              OUR PEOPLE
            </span>
            <h2 className="text-[34px] leading-tight font-medium text-gray-900 tracking-tight">
              The People Behind
              <br />
              Huzzler
            </h2>
          </div>
          <button className="hidden sm:flex items-center gap-1.5 text-[14px] font-semibold text-white bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full px-5 py-3 hover:opacity-90 transition-opacity whitespace-nowrap">
            View All Team →
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {team.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl overflow-hidden bg-white"
            >
              <div className="h-[195px] overflow-hidden">
                <img
                  src={m.img}
                  alt={m.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className={`${m.color} p-5 h-[180px]`}>
                <h3 className="text-[16px] font-medium text-gray-900">
                  {m.name}
                </h3>
                <span className="text-[11px] font-semibold text-gray-600/70 tracking-wide">
                  {m.role}
                </span>
                <p className="text-[12.5px] text-gray-700/70 leading-relaxed mt-2">
                  {m.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}