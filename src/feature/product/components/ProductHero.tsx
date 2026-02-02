import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function ProductHero() {
  return (
    <section className="py-16 bg-[#FBF5E8]/50 text-center relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-serif font-bold text-tet-primary mb-6"
        >
          Quà Tết tuyển chọn — Giao hàng nhanh chóng
        </motion.h1>
        <p className="text-gray-600 italic text-lg mb-10 max-w-2xl mx-auto">
          Khám phá bộ sưu tập quà Tết tinh tế, giao hàng nhanh chóng đến tay
          người thân.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button className="bg-tet-primary hover:bg-tet-accent text-white px-8 py-6 rounded-full font-bold shadow-lg">
            Shop Best Sellers
          </Button>
          <Button
            variant="outline"
            className="border-2 border-tet-primary text-tet-primary px-8 py-6 rounded-full font-bold hover:bg-tet-primary hover:text-white transition-all"
          >
            Build Your Gift Box
          </Button>
        </div>
      </div>
      <div className="absolute top-0 right-0 p-10 opacity-5 text-9xl">🌸</div>
    </section>
  );
}
