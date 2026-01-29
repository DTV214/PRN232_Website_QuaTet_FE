import { motion } from "framer-motion";
import { Headphones } from "lucide-react";

export default function ContactHero() {
  return (
    <section className="relative py-20 md:py-28 bg-[#FBF5E8]/50 overflow-hidden">
      {/* Họa tiết icon bay nhẹ nhàng */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-10 right-20 text-6xl opacity-10 pointer-events-none"
      >
        🌸
      </motion.div>

      <div className="container mx-auto max-w-7xl px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 text-tet-accent font-serif italic text-lg">
            <Headphones size={20} />
            <span>Hỗ trợ 24/7</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-serif text-tet-primary font-bold">
            Liên Hệ Với Chúng Tôi
          </h1>

          <p className="max-w-2xl mx-auto text-gray-600 italic text-lg leading-relaxed">
            Happybox luôn sẵn sàng lắng nghe và giải đáp mọi thắc mắc của bạn.
            Hãy để chúng tôi giúp bạn chọn lựa những món quà Tết thành ý nhất.
          </p>

          <div className="w-24 h-1 bg-tet-secondary mx-auto rounded-full"></div>
        </motion.div>
      </div>
    </section>
  );
}
