import { motion } from "framer-motion";
import { mockBlogs } from "../data/mockBlogs";
import { Link } from "react-router-dom";

export default function BlogHero() {
  const featured = mockBlogs[0]; // Lấy bài viết đầu tiên làm nổi bật

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-serif text-tet-primary font-bold mb-4">
            Tet Stories & Gift Guides
          </h1>
          <p className="text-gray-500 italic text-lg">
            Ideas, traditions, and curated picks
          </p>
        </div>

        {/* Box nổi bật */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="group relative flex flex-col md:flex-row border-2 border-tet-secondary/30 rounded-[2.5rem] overflow-hidden bg-[#FBF5E8]/20 shadow-xl"
        >
          {/* Bên trái: Hình ảnh */}
          <div className="w-full md:w-1/2 overflow-hidden">
            <img
              src={featured.image}
              alt={featured.title}
              className="w-full h-[350px] md:h-[450px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Bên phải: Thông tin */}
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <span className="bg-tet-primary text-white px-4 py-1 rounded-full text-xs font-bold w-fit mb-6">
              {featured.category}
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-tet-primary font-bold mb-6 leading-tight">
              {featured.title}
            </h2>
            <p className="text-gray-600 mb-8 line-clamp-3 italic">
              {featured.description}
            </p>

            <div className="flex items-center justify-between mt-auto border-t border-tet-secondary/20 pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-tet-secondary flex items-center justify-center font-bold text-tet-primary">
                  {featured.author.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-tet-primary">
                    {featured.author}
                  </p>
                  <p className="text-xs text-gray-400">{featured.date}</p>
                </div>
              </div>
              <Link
                to={`/blog/${featured.id}`}
                className="bg-tet-primary text-white px-6 py-2.5 rounded-full font-bold hover:bg-tet-accent transition-all shadow-md"
              >
                Đọc thêm
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
