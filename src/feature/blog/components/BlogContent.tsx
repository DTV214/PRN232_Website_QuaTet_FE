// src/feature/blog/components/BlogContent.tsx
import type { BlogPost } from "@/feature/blog/data/mockBlogs";
import {
  Clock,
  Calendar,
  Lightbulb,
  AlertCircle,
  ArrowRight,
  Share2,
} from "lucide-react";


export default function BlogContent({ blog }: { blog: BlogPost }) {
  if (!blog)
    return (
      <div className="p-10 text-center italic text-gray-400">
        Đang tải nội dung bài viết...
      </div>
    );

  return (
    <article className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
      {/* 1. Ảnh bìa bài viết (Hero Image) */}
      <div className="w-full h-[300px] md:h-[450px] overflow-hidden relative">
        <img
          src={blog.image}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          alt={blog.title}
        />
        <div className="absolute top-6 left-6 bg-tet-primary text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
          {blog.category}
        </div>
      </div>

      <div className="p-8 md:p-14">
        {/* 2. Header bài viết */}
        <header className="space-y-6 mb-12 border-b border-gray-50 pb-10">
          <h1 className="text-3xl md:text-5xl font-serif text-tet-primary font-bold leading-[1.2]">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 font-bold uppercase tracking-widest">
              <span className="flex items-center gap-2">
                <Calendar size={18} className="text-tet-accent" /> {blog.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock size={18} className="text-tet-accent" /> {blog.readTime}
              </span>
            </div>

            <button className="flex items-center gap-2 text-tet-primary hover:text-tet-accent transition-colors text-sm font-bold">
              <Share2 size={18} /> Chia sẻ
            </button>
          </div>
        </header>

        {/* 3. Nội dung chính */}
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-10">
          <p className="text-xl md:text-2xl font-serif italic text-tet-primary/90 leading-relaxed border-l-4 border-tet-secondary pl-6 py-2">
            {blog.description}
          </p>

          <h3 className="text-2xl md:text-3xl font-serif font-bold text-tet-primary mt-12">
            Quà truyền thống - Gói trọn tinh hoa Việt
          </h3>
          <p>
            Trong tâm thức người Việt, quà Tết không chỉ đơn thuần là vật chất,
            mà còn là nhịp cầu kết nối tâm giao.
          </p>

          {/* Box Mẹo hay - Thiết kế dạng Card cao cấp */}
          <div className="bg-[#FBF5E8] p-8 rounded-3xl border-2 border-dashed border-tet-secondary/50 flex flex-col md:flex-row gap-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Lightbulb size={120} />
            </div>
            <div className="bg-white w-14 h-14 rounded-full flex items-center justify-center text-tet-accent shadow-md shrink-0">
              <Lightbulb size={30} />
            </div>
            <div>
              <h4 className="font-bold text-tet-primary text-xl mb-2">
                Mẹo hay từ Happybox
              </h4>
              <p className="text-base italic leading-relaxed">
                Khi chọn quà Tết, hãy ưu tiên những sản phẩm có màu sắc đỏ hoặc
                vàng - biểu tượng của sự may mắn. Một tấm thiệp viết tay chân
                thành sẽ giá trị hơn vạn lời nói sáo rỗng.
              </p>
            </div>
          </div>

          {/* Danh sách đặc điểm */}
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none pl-0">
            {[
              "Bánh chưng, bánh tét - Sum vầy",
              "Hoa mai, hoa đào - May mắn",
              "Trà cao cấp - Tôn trọng",
              "Rượu vang - Khởi đầu mới",
            ].map((item, idx) => (
              <li
                key={idx}
                className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100"
              >
                <span className="w-2 h-2 bg-tet-accent rounded-full"></span>
                <span className="font-bold text-tet-primary text-sm">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          {/* Banner sản phẩm nội bộ - Thiết kế lại bắt mắt hơn */}
          <div className="bg-tet-primary rounded-[2rem] p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 text-white shadow-2xl my-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-cloud-pattern opacity-5"></div>
            <div className="w-full md:w-40 h-40 bg-white/10 rounded-2xl overflow-hidden shrink-0 border border-white/20 shadow-inner">
              <img
                src={blog.image}
                className="w-full h-full object-cover"
                alt="Sản phẩm gợi ý"
              />
            </div>
            <div className="flex-1 text-center md:text-left z-10">
              <div className="inline-block px-3 py-1 bg-tet-secondary/20 text-tet-secondary rounded-full text-[10px] font-bold uppercase mb-2">
                Gợi ý quà Tết
              </div>
              <h4 className="font-serif font-bold text-2xl mb-2">
                Hộp Trà Cao Cấp Tây Bắc
              </h4>
              <p className="text-sm opacity-80 mb-6 italic line-clamp-2">
                Trà thái nguyên thượng hạng, đóng gói sang trọng phù hợp biếu
                tặng đối tác
              </p>
              <div className="flex items-center justify-center md:justify-start gap-6">
                <span className="font-bold text-2xl text-tet-secondary tracking-wide">
                  890.000đ
                </span>
                <button className="bg-white text-tet-primary px-6 py-2.5 rounded-full text-xs font-black hover:bg-tet-secondary transition-all shadow-lg flex items-center gap-2 group/btn">
                  Mua Ngay{" "}
                  <ArrowRight
                    size={14}
                    className="group-hover/btn:translate-x-1 transition-transform"
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Box Lưu ý - Thiết kế tinh tế */}
          <div className="bg-amber-50/50 p-8 rounded-3xl border border-amber-200 flex gap-6 items-start">
            <div className="p-3 bg-white rounded-2xl shadow-sm">
              <AlertCircle className="text-amber-600" size={28} />
            </div>
            <div>
              <h4 className="font-bold text-amber-900 text-lg mb-1">
                Lưu ý về ngân sách
              </h4>
              <p className="text-sm text-amber-800 italic leading-relaxed">
                Vạn vật hữu linh, món quà quý ở tấm lòng. Hãy chọn một hộp quà
                vừa vặn với khả năng tài chính của bạn, bởi sự chân thành mới là
                món quà quý nhất dịp đầu xuân.
              </p>
            </div>
          </div>
        </div>

        {/* 4. CTA Bottom */}
        <div className="mt-20 bg-tet-primary p-12 rounded-[3rem] text-center text-white relative overflow-hidden group">
          <div className="absolute inset-0 bg-cloud-pattern opacity-10 group-hover:scale-110 transition-transform duration-1000"></div>
          <div className="relative z-10 space-y-8">
            <h3 className="text-3xl md:text-4xl font-serif font-bold leading-tight max-w-2xl mx-auto">
              Tìm món quà Tết hoàn hảo cho gia đình bạn
            </h3>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button className="bg-white text-tet-primary px-10 py-4 rounded-full font-black text-sm hover:bg-tet-secondary transition-all shadow-xl hover:-translate-y-1 active:translate-y-0">
                Khám Phá Quà Tết
              </button>
              <button className="border-2 border-white/50 backdrop-blur-sm px-10 py-4 rounded-full font-black text-sm hover:bg-white/10 transition-all shadow-xl hover:-translate-y-1 active:translate-y-0 uppercase tracking-widest">
                Tạo Hộp Quà
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
