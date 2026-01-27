import { motion } from "framer-motion";

const categories = [
  {
    name: "Hộp Quà Da",
    image:
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=2000",
  },
  {
    name: "Hộp Quà Gỗ",
    image:
      "https://images.unsplash.com/photo-1607344645866-009c320b63e0?q=80&w=2000",
  },
  {
    name: "Giỏ Quà Cao Cấp",
    image:
      "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=2000",
  },
  {
    name: "Quà Sức Khỏe",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2000",
  },
];

export default function CategoryGrid() {
  return (
    <section className="relative py-16 md:py-28 bg-tet-bg/50 overflow-hidden border-t border-tet-secondary/20">
      {/* Họa tiết mây toàn nền và icon trang trí sống động */}
      <div className="absolute inset-0 bg-cloud-pattern pointer-events-none opacity-40"></div>
      <div className="absolute top-10 left-10 opacity-10 pointer-events-none animate-pulse hidden md:block">
        <span className="text-6xl">🏮</span>
      </div>

      <div className="container mx-auto max-w-7xl px-6 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            <p className="text-tet-accent font-serif italic text-base md:text-lg">
              Bộ Sưu Tập Đặc Biệt
            </p>
            <h2 className="text-3xl md:text-5xl font-serif text-tet-primary tracking-tight">
              Khám Phá Danh Mục Quà Tết
            </h2>
            <div className="w-20 md:w-24 h-1 bg-tet-accent mx-auto rounded-full"></div>
            <p className="text-gray-500 italic text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
              Những món quà sang trọng được chọn lọc kỹ lưỡng, mang đậm nét tinh
              hoa văn hóa Việt cho mọi dịp lễ.
            </p>
          </motion.div>
        </div>

        {/* Lưới danh mục: 1 cột mobile, 2 cột tablet, 4 cột desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="relative h-[380px] md:h-[450px] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-lg md:shadow-2xl border-4 border-white transition-all duration-500 group-hover:-translate-y-3 group-hover:shadow-[0_20px_50px_rgba(90,17,7,0.3)]">
                {/* Hình ảnh với hiệu ứng Grayscale chuyên nghiệp */}
                <img
                  src={cat.image}
                  className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                  alt={cat.name}
                />

                {/* Lớp phủ gradient sâu sắc */}
                <div className="absolute inset-0 bg-gradient-to-t from-tet-primary/95 via-tet-primary/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

                {/* Nội dung chữ trên Card */}
                <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8">
                  <h3 className="text-white text-2xl md:text-3xl font-serif mb-3 transform group-hover:translate-x-2 transition-transform duration-300">
                    {cat.name}
                  </h3>
                  <div className="w-10 h-1 bg-tet-secondary group-hover:w-full transition-all duration-500 rounded-full"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
