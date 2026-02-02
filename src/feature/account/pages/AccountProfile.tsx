import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  ShieldCheck,
  Bell,
  Clock,
  Save,
  Lock,
} from "lucide-react";
import { useState } from "react";

export default function AccountProfile() {
  const [showPass, setShowPass] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-10"
    >
      {/* 1. KHỐI THÔNG TIN CÁ NHÂN */}
      <section className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-sm border border-gray-100 relative overflow-hidden">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-tet-bg rounded-2xl text-tet-primary">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h3 className="text-xl font-serif font-bold text-tet-primary">
              Thông tin cá nhân
            </h3>
            <p className="text-xs text-gray-400 italic">
              Cập nhật thông tin để có trải nghiệm tốt nhất
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Họ và tên */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-tet-primary ml-1">
              Họ và tên *
            </label>
            <input
              type="text"
              defaultValue="Nguyễn Thị Lan"
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-tet-secondary outline-none transition-all"
            />
          </div>

          {/* Số điện thoại */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-tet-primary ml-1 text-right flex justify-between">
              Số điện thoại *{" "}
              <span className="text-[10px] text-green-600 uppercase">
                Đã xác thực
              </span>
            </label>
            <input
              type="text"
              defaultValue="0987654321"
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-tet-secondary outline-none transition-all"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-tet-primary ml-1">
              Email *
            </label>
            <div className="relative">
              <input
                type="email"
                defaultValue="nguyenlan@email.com"
                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-tet-secondary outline-none transition-all pr-12"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500 text-[10px] font-bold">
                Xác thực
              </span>
            </div>
          </div>

          {/* Ngày sinh */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-tet-primary ml-1">
              Ngày sinh
            </label>
            <input
              type="date"
              defaultValue="1990-05-15"
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-tet-secondary outline-none transition-all cursor-pointer"
            />
          </div>

          {/* Giới tính */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-bold text-tet-primary ml-1">
              Giới tính
            </label>
            <div className="flex gap-8 mt-2 p-2">
              {["Nữ", "Nam", "Khác"].map((gender) => (
                <label
                  key={gender}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <div className="relative flex items-center justify-center">
                    <input
                      type="radio"
                      name="gender"
                      className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded-full checked:border-tet-primary transition-all"
                    />
                    <div className="absolute w-2.5 h-2.5 bg-tet-primary rounded-full scale-0 peer-checked:scale-100 transition-transform"></div>
                  </div>
                  <span className="text-sm font-medium text-gray-600 group-hover:text-tet-primary">
                    {gender}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-10">
          <button className="px-8 py-3 rounded-full text-sm font-bold text-gray-500 hover:bg-gray-100 transition-all">
            Hủy
          </button>
          <button className="bg-tet-primary text-white px-10 py-3 rounded-full text-sm font-bold shadow-lg hover:bg-tet-accent transition-all flex items-center gap-2">
            <Save size={18} /> Lưu thay đổi
          </button>
        </div>
      </section>

      {/* 2. KHỐI BẢO MẬT & MẬT KHẨU */}
      <section className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-red-50 text-red-600 rounded-2xl">
            <Lock size={24} />
          </div>
          <h3 className="text-xl font-serif font-bold text-tet-primary">
            Bảo mật
          </h3>
        </div>

        <div className="space-y-6 max-w-2xl">
          {/* Mật khẩu hiện tại */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-tet-primary ml-1">
              Mật khẩu hiện tại *
            </label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-tet-secondary outline-none pr-12"
              />
              <button
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-tet-primary"
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-tet-primary ml-1">
                Mật khẩu mới *
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-tet-secondary outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-tet-primary ml-1">
                Xác nhận mật khẩu *
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-tet-secondary outline-none"
              />
            </div>
          </div>

          <button className="bg-[#4a0d06] text-white px-8 py-3.5 rounded-full text-sm font-bold shadow-lg hover:brightness-125 transition-all w-fit mt-4">
            Cập nhật mật khẩu
          </button>
        </div>
      </section>

      {/* 3. TÙY CHỌN BỔ SUNG */}
      <section className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
        <h3 className="text-xl font-serif font-bold text-tet-primary mb-8">
          Tùy chọn
        </h3>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Newsletter */}
          <div className="flex-1 p-6 bg-gray-50 rounded-3xl flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Bell className="text-tet-accent" />
              <div>
                <p className="text-sm font-bold text-tet-primary">
                  Nhận bản tin
                </p>
                <p className="text-xs text-gray-400">
                  Khuyến mãi & sản phẩm mới
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              className="w-12 h-6 bg-gray-300 rounded-full appearance-none checked:bg-tet-primary transition-all relative cursor-pointer before:content-[''] before:absolute before:w-4 before:h-4 before:bg-white before:rounded-full before:top-1 before:left-1 checked:before:left-7 before:transition-all"
            />
          </div>

          {/* Delivery Time Dropdown */}
          <div className="flex-1 p-6 bg-gray-50 rounded-3xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Clock className="text-tet-accent" />
              <p className="text-sm font-bold text-tet-primary">
                Thời gian giao hàng
              </p>
            </div>
            <select className="bg-transparent text-sm font-bold text-tet-primary outline-none cursor-pointer">
              <option>Sáng (8:00 - 12:00)</option>
              <option>Chiều (13:00 - 18:00)</option>
            </select>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
