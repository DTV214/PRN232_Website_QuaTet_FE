import { useState } from "react";
import {
  Search,
  User,
  Heart,
  ShoppingCart,
  Phone,
  Menu,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

const LOGO_URL =
  "https://res.cloudinary.com/dratbz8bh/image/upload/v1769523263/Gemini_Generated_Image_h7qrtzh7qrtzh7qr_uszekn.png";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-full flex flex-col shadow-md sticky top-0 z-[100]">
      {/* 1. THANH CÔNG CỤ TRÊN (TOP BAR) */}
      <div className="bg-tet-primary py-2 md:py-3 px-4 md:px-8 flex items-center justify-between gap-4">
        {/* Nút Menu cho Mobile */}
        <button
          className="text-white md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
          onClick={() => setIsMenuOpen(true)}
        >
          <Menu size={28} />
        </button>

        {/* Khu vực LOGO - Thiết kế hình tròn bắt mắt */}
        <Link to="/home" className="flex items-center gap-3 group shrink-0">
          <div className="relative w-12 h-12 md:w-14 md:h-14 overflow-hidden rounded-full border-2 border-tet-secondary shadow-[0_0_15px_rgba(237,229,181,0.3)] transition-transform group-hover:scale-105">
            <img
              src={LOGO_URL}
              alt="Happybox Logo"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <span className="hidden lg:block text-white font-serif font-bold text-2xl italic tracking-tighter">
            Quà Tết Yêu Thương
          </span>
        </Link>

        {/* Thanh Tìm kiếm - Tự động ẩn trên mobile nhỏ */}
        <div className="hidden sm:flex flex-1 max-w-xl mx-4 relative">
          <input
            type="text"
            placeholder="Tìm kiếm hộp quà cao cấp..."
            className="w-full py-2 px-5 pr-12 rounded-full bg-[#fdfaf3] text-sm focus:outline-none focus:ring-2 focus:ring-tet-secondary text-tet-primary placeholder:text-gray-400 shadow-inner"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-tet-primary p-1.5 rounded-full text-white cursor-pointer hover:bg-tet-accent transition-colors">
            <Search size={16} />
          </div>
        </div>

        {/* Nhóm Icon Chức năng */}
        <div className="flex items-center gap-2 md:gap-5 text-white text-sm font-medium">
          {/* Tài khoản - Chỉ hiện trên màn hình lớn */}
          <Link
            to="/login"
            className="hidden lg:flex items-center gap-1.5 hover:text-tet-secondary transition-colors"
          >
            <User size={20} />
            <span>Tài khoản</span>
          </Link>

          {/* Yêu thích */}
          <div className="hidden sm:flex items-center gap-1.5 cursor-pointer hover:text-tet-secondary transition-colors">
            <Heart size={20} />
          </div>

          {/* Giỏ hàng với Badge số lượng */}
          <div className="flex items-center gap-1.5 cursor-pointer relative hover:text-tet-secondary transition-colors group">
            <div className="p-2 group-hover:bg-white/10 rounded-full transition-colors">
              <ShoppingCart size={22} />
            </div>
            <span className="absolute top-0 right-0 bg-tet-accent text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold border-2 border-tet-primary shadow-lg">
              3
            </span>
          </div>

          {/* Nút Hotline */}
          <button className="hidden md:flex bg-tet-secondary text-tet-primary px-5 py-2 rounded-full items-center gap-2 font-bold text-sm shadow-lg hover:bg-white hover:scale-105 transition-all">
            <Phone size={16} fill="currentColor" />
            <span>1900 1234</span>
          </button>
        </div>
      </div>

      {/* 2. THANH MENU CHÍNH (DESKTOP ONLY) */}
      <div className="hidden md:flex bg-[#4a0d06] text-white py-3 justify-center gap-10 lg:gap-14 text-xs lg:text-sm font-medium border-t border-white/5 uppercase tracking-widest">
        {["Trang chủ", "Quà tặng", "Hộp quà Tết", "Giới thiệu", "Tin tức", "Liên hệ"].map(
          (item) => (
            <Link
              key={item}
              to="/products"
              className="relative hover:text-tet-secondary transition-colors after:content-[''] after:absolute after:w-0 after:h-[1px] after:bg-tet-secondary after:bottom-[-4px] after:left-0 hover:after:w-full after:transition-all"
            >
              {item}
            </Link>
          ),
        )}
      </div>

      {/* 3. MENU DI ĐỘNG (MOBILE DRAWER) */}
      {/* Lớp nền mờ */}
      <div
        className={`fixed inset-0 bg-black/60 z-[110] transition-opacity duration-300 md:hidden ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Nội dung Menu trượt */}
      <div
        className={`fixed top-0 left-0 h-full w-[300px] bg-tet-bg z-[120] shadow-2xl transform transition-transform duration-300 ease-out md:hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="bg-tet-primary p-6 flex justify-between items-center text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-tet-secondary overflow-hidden">
              <img
                src={LOGO_URL}
                alt="Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-serif font-bold text-xl italic">
              Quà Tết Yêu Thương
            </span>
          </div>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="p-1 hover:bg-white/10 rounded-full"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-5 text-tet-primary font-bold uppercase tracking-widest text-sm">
          {[
            "Trang Chủ",
            "Quà Tặng",
            "Hộp Quà Tết",
            "Giới Thiệu",
            "Tin Tức",
            "Liên Hệ",
          ].map((item) => (
            <Link
              key={item}
              to="/products"
              onClick={() => setIsMenuOpen(false)}
              className="py-2 border-b border-tet-secondary/20 hover:text-tet-accent transition-colors"
            >
              {item}
            </Link>
          ))}

          <div className="mt-8 pt-8 border-t border-tet-primary/10 flex flex-col gap-4 italic lowercase">
            <Link
              to="/login"
              className="flex items-center gap-3 text-tet-primary"
            >
              <User size={20} /> Tài khoản khách hàng
            </Link>
            <div className="flex items-center gap-3 text-tet-accent">
              <Phone size={20} fill="currentColor" /> Hotline: 1900 1234
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
