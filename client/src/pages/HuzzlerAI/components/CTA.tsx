import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section
      className="pt-16 pb-48 px-6 lg:px-10"
      style={{ background: 'linear-gradient(180deg, rgba(8, 6, 20, 1) 0%, rgba(15, 10, 42, 1) 25%, rgba(28, 16, 80, 1) 50%, rgba(61, 43, 144, 1) 75%, rgba(85, 56, 204, 1) 100%)' }}
    >
      <div className="max-w-[1456px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-[28px] py-20 px-6 text-center"
          style={{
            background:
              "radial-gradient(ellipse 600px 300px at 30% 20%, rgba(255,255,255,0.6), transparent 60%), linear-gradient(135deg, #e7e2fb 0%, #ddd6f8 100%)",
          }}
        >
          <h2 className="text-[38px] font-medium text-gray-900 tracking-tight mb-4">
            Ready to Work Smarter?
          </h2>
          <p className="text-gray-600 text-[15px] mb-8">
            Hire top freelancers, launch projects faster, and scale with
            confidence.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-xs mx-auto sm:max-w-none">
            <button
              onClick={() => window.open("https://play.google.com/store/apps/details?id=com.huzzler.app", "_blank")}
              className="bg-gradient-to-r from-violet-500 to-indigo-500 text-white text-[14px] font-semibold rounded-full px-6 py-3.5 hover:opacity-90 transition-opacity"
            >
              Get Started
            </button>
            <button
              onClick={() => window.open("https://huzzler.app/", "_blank")}
              className="bg-white text-gray-900 text-[14px] font-semibold rounded-full px-6 py-3.5 hover:bg-gray-50 transition-colors"
            >
              Explore Talent
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}