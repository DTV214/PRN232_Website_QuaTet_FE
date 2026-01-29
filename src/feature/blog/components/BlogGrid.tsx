import { motion } from "framer-motion";
import { mockBlogs } from "../data/mockBlogs";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";

export default function BlogGrid() {
  const categories = [
    "Tất cả",
    "Gift Guides",
    "Truyền thống",
    "Quà tặng doanh nghiệp",
    "Bao bì",
    "Khuyến mãi",
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto max-w-7xl px-6">
        {/* Thanh lọc */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat, i) => (
            <button
              key={i}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                i === 0
                  ? "bg-tet-primary text-white shadow-lg"
                  : "bg-gray-100 text-gray-500 hover:bg-tet-secondary hover:text-tet-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Lưới 2 hàng 3 cột */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockBlogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100"
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-tet-accent uppercase tracking-widest">
                  {blog.category}
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-serif text-tet-primary font-bold mb-4 line-clamp-2 group-hover:text-tet-accent transition-colors">
                  {blog.title}
                </h3>
                <p className="text-gray-500 text-sm mb-6 line-clamp-3 leading-relaxed">
                  {blog.description}
                </p>
                <div className="flex items-center justify-between text-[11px] text-gray-400 font-bold uppercase tracking-tighter border-t border-gray-50 pt-4">
                  <span>{blog.date}</span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {blog.readTime}
                  </span>
                </div>
                <Link
                  to={`/blog/${blog.id}`}
                  className="block mt-6 text-center text-tet-primary font-bold border-2 border-tet-primary py-2 rounded-xl hover:bg-tet-primary hover:text-white transition-all"
                >
                  Xem chi tiết
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination Tĩnh */}
        <div className="mt-16 flex justify-center items-center gap-2">
          <button className="p-2 rounded-full border border-gray-200 hover:bg-tet-secondary transition-colors">
            <ChevronLeft size={20} />
          </button>
          {[1, 2, 3, "...", 12].map((p, i) => (
            <button
              key={i}
              className={`w-10 h-10 rounded-full font-bold transition-all ${p === 1 ? "bg-tet-primary text-white shadow-lg" : "hover:bg-gray-100 text-gray-500"}`}
            >
              {p}
            </button>
          ))}
          <button className="p-2 rounded-full border border-gray-200 hover:bg-tet-secondary transition-colors">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
