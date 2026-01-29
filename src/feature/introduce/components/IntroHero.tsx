import { motion } from "framer-motion";
import { Button } from "@/components/ui/button"; // Sử dụng Shadcn UI
import { Sparkles, Gift } from "lucide-react";

export default function IntroHero() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-[#FBF5E8]">
      {/* 1. Background Họa tiết & Icon Nhấn mạnh */}
      <div className="absolute inset-0 bg-cloud-pattern opacity-[0.04] pointer-events-none"></div>

      {/* Icon hoa đào chìm trang trí */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-10 -left-10 opacity-[0.08] pointer-events-none"
      >
        <span className="text-[200px]">🌸</span>
      </motion.div>

      <div className="absolute bottom-10 right-10 opacity-[0.08] pointer-events-none scale-150">
        <span className="text-[150px]">🏮</span>
      </div>

      <div className="container mx-auto max-w-7xl px-6 relative z-10 text-center">
        {/* 2. Tiêu đề & Lời Description đầy thành ý */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <div className="flex justify-center items-center gap-3 text-tet-accent font-serif italic text-lg md:text-xl">
            <Sparkles size={20} />
            <span>Gửi trao chân tình - Kết nối tình thân</span>
            <Sparkles size={20} />
          </div>

          <h1 className="text-5xl md:text-7xl font-serif text-tet-primary leading-tight font-bold">
            Quà Tết Đầy Ý Nghĩa <br />
            <span className="text-tet-accent italic">
              Cho Xuân Thêm Trọn Vẹn
            </span>
          </h1>

          <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto italic font-medium">
            Mang đến niềm vui và sự trọn vẹn cho mỗi dịp Tết với những món quà
            được tuyển chọn kỹ lưỡng, đóng gói tinh tế thay lời chúc an khang,
            thịnh vượng gửi đến người thân, đối tác và bạn bè.
          </p>

          {/* 3. Nút bấm Shadcn được thiết kế đẹp */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-6">
            <Button className="bg-tet-primary hover:bg-[#4a0d06] text-white px-10 py-7 rounded-full text-lg font-bold shadow-2xl transition-all hover:scale-105 active:scale-95">
              <Gift className="mr-2" /> Khám Phá Quà Tết
            </Button>

            <Button
              variant="outline"
              className="border-2 border-tet-primary text-tet-primary hover:bg-tet-secondary px-10 py-7 rounded-full text-lg font-bold transition-all hover:scale-105 active:scale-95"
            >
              Tạo Hộp Quà Riêng
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Trang trí phía dưới banner */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-tet-secondary to-transparent opacity-30"></div>
    </section>
  );
}
