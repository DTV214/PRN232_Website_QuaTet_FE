// src/feature/homepage/components/CustomGiftBanner.tsx
import { PenTool, Hammer, Heart } from "lucide-react";
import { motion } from "framer-motion";

export default function CustomGiftBanner() {
  const steps = [
    {
      name: "Thiết Kế",
      icon: <PenTool />,
      desc: "Mọi tác phẩm bắt đầu từ bản phác thảo tại studio, lấy cảm hứng từ thiên nhiên.",
    },
    {
      name: "Chế Tác",
      icon: <Hammer />,
      desc: "Nghệ nhân bậc thầy tạo hình nguyên liệu thô bằng kỹ thuật truyền thống.",
    },
    {
      name: "Chăm Sóc",
      icon: <Heart />,
      desc: "Hoàn thiện tỉ mỉ bằng dầu tự nhiên và đóng gói bằng vật liệu thân thiện môi trường.",
    },
  ];

  return (
    <section className="relative py-16 md:py-32 px-6 md:px-10 overflow-hidden bg-[#FBF5E8]">
      {/* Họa tiết chìm sống động - Tự động thu nhỏ trên Mobile */}
      <div className="absolute top-5 left-5 opacity-[0.05] pointer-events-none scale-100 md:scale-150">
        🌸
      </div>
      <div className="absolute bottom-10 right-5 opacity-[0.05] pointer-events-none scale-100 md:scale-150 rotate-45">
        🏮
      </div>
      <div className="absolute inset-0 bg-cloud-pattern opacity-[0.03] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20 relative z-10">
        {/* Bên trái: Hình ảnh có khung trang trí */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="w-full lg:w-1/2 relative"
        >
          <div className="absolute -inset-4 md:-inset-6 border-2 border-tet-secondary rounded-[2rem] md:rounded-[3rem] rotate-2 opacity-50"></div>
          <div className="absolute -inset-2 md:-inset-3 border border-tet-primary/20 rounded-[2rem] md:rounded-[3rem] -rotate-1"></div>
          <img
            src="https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=2000"
            className="rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl relative z-10 w-full h-[350px] md:h-[550px] object-cover"
            alt="Quà tặng doanh nghiệp"
          />
        </motion.div>

        {/* Bên phải: Nội dung */}
        <div className="w-full lg:w-1/2 space-y-6 md:space-y-8 text-center lg:text-left">
          <p className="text-tet-accent font-serif italic text-base md:text-lg tracking-widest uppercase">
            Trao gửi tâm tình
          </p>
          <h2 className="text-4xl md:text-6xl font-serif text-tet-primary leading-[1.1]">
            Giải Pháp Quà Tặng <br /> Doanh Nghiệp
          </h2>
          <p className="text-gray-600 text-lg md:text-xl leading-relaxed italic">
            Nâng tầm mối quan hệ kinh doanh với dịch vụ quà tặng cao cấp. Chúng
            tôi đảm bảo mỗi hộp quà đều kể trọn câu chuyện thương hiệu của bạn.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 py-2 md:py-4">
            <div className="flex items-center gap-4 group bg-white/50 p-4 rounded-2xl md:bg-transparent md:p-0">
              <div className="bg-tet-secondary p-3 md:p-4 rounded-2xl text-tet-primary shadow-sm group-hover:rotate-12 transition-transform">
                <PenTool size={24} />
              </div>
              <h4 className="font-bold text-tet-primary text-md md:text-lg leading-tight text-left">
                Thiết Kế Logo <br /> Miễn Phí
              </h4>
            </div>
            <div className="flex items-center gap-4 group bg-white/50 p-4 rounded-2xl md:bg-transparent md:p-0">
              <div className="bg-tet-secondary p-3 md:p-4 rounded-2xl text-tet-primary shadow-sm group-hover:rotate-12 transition-transform">
                <Hammer size={24} />
              </div>
              <h4 className="font-bold text-tet-primary text-md md:text-lg leading-tight text-left">
                Chiết Khấu <br /> Đơn Hàng Lớn
              </h4>
            </div>
          </div>

          <button className="w-full md:w-auto bg-tet-primary text-white px-10 md:px-12 py-4 md:py-5 rounded-2xl font-bold shadow-lg hover:bg-[#4a0d06] hover:-translate-y-1 transition-all uppercase tracking-widest text-sm md:text-base">
            Nhận Báo Giá Ngay
          </button>
        </div>
      </div>

      {/* Quy trình với Timeline lượn sóng */}
      <div className="relative mt-24 md:mt-40 max-w-6xl mx-auto px-4">
        {/* SVG Timeline bắt mắt */}
        <svg
          className="absolute top-1/4 left-0 w-full h-20 z-0 opacity-20 hidden md:block"
          viewBox="0 0 1200 100"
          fill="none"
        >
          <motion.path
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            d="M0,50 C150,150 450,-50 600,50 C750,150 1050,-50 1200,50"
            stroke="#5A1107"
            strokeWidth="2"
            strokeDasharray="8 8"
          />
        </svg>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 text-center relative z-10">
          {steps.map((step, i) => (
            <motion.div
              key={step.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col items-center gap-4 md:gap-6 group"
            >
              <div className="w-24 h-24 md:w-28 md:h-28 bg-white rounded-full flex items-center justify-center shadow-xl relative group-hover:bg-tet-secondary transition-all duration-500 border-2 border-tet-secondary/20">
                <span className="absolute -top-2 -right-2 bg-tet-secondary text-tet-primary w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold border-2 md:border-4 border-white shadow-md z-20">
                  {i + 1}
                </span>
                <div className="text-gray-400 group-hover:text-tet-primary scale-125 md:scale-150 transition-all duration-500 group-hover:rotate-[360deg]">
                  {step.icon}
                </div>
              </div>
              <div className="space-y-2 md:space-y-3">
                <h5 className="font-serif text-2xl md:text-3xl text-tet-primary">
                  {step.name}
                </h5>
                <p className="text-gray-500 text-sm md:text-base leading-relaxed px-4 md:px-0">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
