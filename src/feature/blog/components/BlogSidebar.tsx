// src/feature/blog/components/BlogSidebar.tsx
export default function BlogSidebar() {
  return (
    <div className="space-y-8 sticky top-28">
      {/* 1. Bài viết liên quan */}
      <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
        <h3 className="text-xl font-serif font-bold text-tet-primary mb-6 border-b border-gray-50 pb-4">
          Bài viết liên quan
        </h3>
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-4 group cursor-pointer">
              <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                <img
                  src="https://res.cloudinary.com/dratbz8bh/image/upload/v1769521491/Gia-Dinh-Doan-Vien-T_v0n9to.png"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                />
              </div>
              <div>
                <h4 className="text-sm font-bold text-tet-primary line-clamp-2 group-hover:text-tet-accent transition-colors">
                  Cách trang trí nhà cửa đón Tết 2026
                </h4>
                <p className="text-[10px] text-gray-400 mt-2 uppercase font-bold">
                  15 Tháng 12, 2023
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Danh mục phổ biến */}
      <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
        <h3 className="text-xl font-serif font-bold text-tet-primary mb-6 border-b border-gray-50 pb-4">
          Danh mục phổ biến
        </h3>
        <div className="flex flex-wrap gap-2">
          {[
            "Gợi ý quà",
            "Văn hóa Tết",
            "Trang trí",
            "Ẩm thực",
            "Phong tục",
          ].map((cat) => (
            <span
              key={cat}
              className="px-4 py-2 bg-[#FBF5E8] text-tet-primary text-xs font-bold rounded-full hover:bg-tet-primary hover:text-white cursor-pointer transition-all"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>

      {/* 3. Newsletter Sidebar */}
      <div className="bg-tet-primary p-8 rounded-[2.5rem] text-white text-center shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">🌸</div>
        <h3 className="text-xl font-bold mb-4">Đăng ký nhận ưu đãi</h3>
        <p className="text-xs opacity-70 mb-6 italic">
          Nhận thông tin ưu đãi sớm nhất về sản phẩm mới
        </p>
        <input
          type="email"
          placeholder="Email của bạn"
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-xs mb-3 focus:outline-none"
        />
        <button className="w-full bg-white text-tet-primary py-3 rounded-xl font-bold text-sm hover:bg-tet-secondary transition-all">
          Đăng ký
        </button>
      </div>
    </div>
  );
}
