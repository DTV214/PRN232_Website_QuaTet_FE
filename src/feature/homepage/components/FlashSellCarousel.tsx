// src/feature/homepage/components/FlashSellCarousel.tsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ProductCard from "../../../components/common/ProductCard";

const flashSales = Array(4).fill({
  title: "Hộp quà Tết truyền thống",
  price: "1,250,000",
  image:
      "https://res.cloudinary.com/dratbz8bh/image/upload/v1769521638/HOP-BANH-TRUNG-THU-VEN-TRON-3_get5up.jpg",

});

export default function FlashSellCarousel() {
  return (
    <section className="relative py-12 md:py-20 px-4 md:px-10 bg-white overflow-hidden">
      {/* Họa tiết trang trí chìm sống động */}
      <div className="absolute top-10 right-10 opacity-5 pointer-events-none hidden md:block select-none">
        <span className="text-9xl">🧧</span>
      </div>
      <div className="absolute inset-0 bg-cloud-pattern opacity-[0.02] pointer-events-none"></div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Tiêu đề Banner: Tối ưu cho Mobile */}
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end mb-8 md:mb-12 border-b border-gray-100 pb-6 gap-4">
          <div className="text-center sm:text-left">
            <p className="text-tet-accent font-serif italic mb-1 text-sm md:text-base">
              Quà tặng từ tâm
            </p>
            <h2 className="text-3xl md:text-5xl font-serif text-tet-primary tracking-tight">
              Ưu Đãi Đặc Biệt
            </h2>
          </div>
          <Link
            to="/products"
            className="text-tet-accent font-bold hover:underline flex items-center gap-2 text-sm md:text-base group"
          >
            Xem tất cả{" "}
            <span className="text-xl group-hover:translate-x-1 transition-transform">
              &rarr;
            </span>
          </Link>
        </div>

        {/* Lưới sản phẩm Responsive: 1 cột (Mobile), 2 cột (Tablet), 4 cột (Desktop) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {flashSales.map((item, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.4 }}
            >
              <ProductCard {...item} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
