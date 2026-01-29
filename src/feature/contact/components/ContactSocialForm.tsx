import { motion } from "framer-motion";
import { Facebook, Instagram, Youtube, Send, Music2 } from "lucide-react";

export default function ContactSocialForm() {
  const socialLinks = [
    { name: "Facebook", icon: <Facebook />, color: "hover:bg-[#1877F2]" },
    { name: "Instagram", icon: <Instagram />, color: "hover:bg-[#E4405F]" },
    { name: "TikTok", icon: <Music2 />, color: "hover:bg-black" },
    { name: "YouTube", icon: <Youtube />, color: "hover:bg-[#FF0000]" },
  ];

  return (
    <section className="bg-tet-primary py-16 md:py-24 relative overflow-hidden">
      {/* Họa tiết mây chìm trang trí xuyên suốt */}
      <div className="absolute inset-0 bg-cloud-pattern opacity-[0.03] pointer-events-none"></div>

      <div className="container mx-auto max-w-7xl px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          {/* 1. KHỐI KẾT NỐI MẠNG XÃ HỘI */}
          <div className="w-full lg:w-1/2 space-y-10">
            <div className="space-y-4">
              <h3 className="flex items-center gap-3 text-tet-secondary text-2xl md:text-3xl font-serif font-bold">
                <span className="w-8 h-[1px] bg-tet-secondary opacity-50"></span>
                Kết Nối Với Chúng Tôi
              </h3>
              <p className="text-[#FBF5E8] opacity-70 italic text-sm md:text-base">
                Theo dõi Happybox trên các nền tảng mạng xã hội để cập nhật
                những mẫu quà Tết mới nhất và các chương trình ưu đãi đặc quyền.
              </p>
            </div>

            {/* Grid 4 ô vuông mạng xã hội */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.05 }}
                  className={`flex flex-col items-center justify-center p-6 bg-white/5 border border-white/10 rounded-2xl text-white transition-all duration-300 ${social.color} group shadow-lg`}
                >
                  <div className="mb-3 group-hover:scale-110 transition-transform">
                    {social.icon}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest opacity-60 group-hover:opacity-100">
                    {social.name}
                  </span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* 2. KHỐI ĐĂNG KÝ NHẬN TIN */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-[2.5rem] backdrop-blur-sm shadow-2xl relative overflow-hidden group"
            >
              {/* Decor icon hoa đào chìm ở góc card */}
              <div className="absolute -top-6 -right-6 text-white opacity-5 text-8xl rotate-12 group-hover:rotate-45 transition-transform duration-1000">
                🌸
              </div>

              <div className="relative z-10 space-y-8">
                <div className="text-center lg:text-left">
                  <h3 className="text-tet-secondary text-2xl md:text-3xl font-serif font-bold mb-4">
                    Đăng Ký Nhận Tin
                  </h3>
                  <p className="text-[#FBF5E8] opacity-70 italic text-sm md:text-base">
                    Nhận ngay thông tin về bộ sưu tập quà Tết 2026 và các mã
                    giảm giá sớm nhất dành riêng cho bạn.
                  </p>
                </div>

                {/* Input Form */}
                <form
                  className="relative group/form"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    type="email"
                    placeholder="Email của bạn..."
                    className="w-full bg-[#FBF5E8] text-tet-primary px-8 py-4 md:py-5 rounded-full outline-none focus:ring-4 focus:ring-tet-secondary/30 transition-all font-medium placeholder:text-gray-400 pr-16"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-tet-primary text-white p-3 md:p-4 rounded-full hover:bg-tet-accent transition-all hover:scale-105 active:scale-95 shadow-md"
                  >
                    <Send
                      size={20}
                      className="group-hover/form:translate-x-1 group-hover/form:-translate-y-1 transition-transform"
                    />
                  </button>
                </form>

                <p className="text-[10px] text-center lg:text-left text-[#FBF5E8] opacity-40 uppercase tracking-widest font-bold">
                  * Chúng tôi cam kết bảo mật thông tin khách hàng tuyệt đối
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
