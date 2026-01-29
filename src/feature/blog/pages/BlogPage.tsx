import { motion } from "framer-motion";
import BlogHero from "../components/BlogHero";
import BlogGrid from "../components/BlogGrid";
import Newsletter from "../components/Newsletter";

export default function BlogPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white min-h-screen"
    >
      {/* Banner 1: Bài viết nổi bật với bố cục Box chia đôi */}
      <BlogHero />

      {/* Banner 2: Bộ lọc chủ đề và Lưới bài viết 2 hàng 3 cột */}
      <BlogGrid />

      {/* Banner 3: Đăng ký nhận thông báo phong cách Tết */}
      <Newsletter />
    </motion.div>
  );
}
