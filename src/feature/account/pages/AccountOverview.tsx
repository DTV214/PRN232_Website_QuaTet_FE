// src/feature/account/pages/AccountOverview.tsx
import { User, ClipboardList } from "lucide-react";
import { ShieldCheck, Package, MapPin, Gift, ChevronRight } from "lucide-react";

export default function AccountOverview() {
  return (
    <div className="space-y-6">
      {/* 1. Thông tin người dùng */}
      <section className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-full border-4 border-tet-secondary overflow-hidden shadow-lg">
            <img
              src="https://i.pravatar.cc/150?u=mai"
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-serif font-bold text-tet-primary">
              Nguyễn Thị Mai
            </h2>
            <p className="text-sm text-gray-500 italic">mai.nguyen@email.com</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-3">
              <span className="flex items-center gap-1 bg-green-50 text-green-600 px-3 py-1 rounded-full text-[10px] font-bold border border-green-100">
                <ShieldCheck size={12} /> Email đã xác thực
              </span>
              <span className="flex items-center gap-1 bg-green-50 text-green-600 px-3 py-1 rounded-full text-[10px] font-bold border border-green-100">
                <ShieldCheck size={12} /> SĐT đã xác thực
              </span>
            </div>
          </div>
        </div>
        <button className="bg-tet-primary text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-tet-accent transition-all shadow-md">
          Chỉnh sửa hồ sơ
        </button>
      </section>

      {/* 2. Hạng thành viên & Điểm */}
      <section className="bg-[#FBF5E8] p-6 rounded-3xl border border-tet-secondary/30 flex justify-between items-center group cursor-pointer hover:shadow-md transition-all">
        <div>
          <p className="text-xs text-tet-primary/60 font-bold uppercase tracking-widest mb-1">
            Hạng thành viên
          </p>
          <h3 className="text-3xl font-serif font-black text-tet-primary uppercase">
            Bạc
          </h3>
        </div>
        <div className="text-right">
          <p className="text-xs text-tet-primary/60 font-bold uppercase tracking-widest mb-1">
            Điểm tích lũy
          </p>
          <p className="text-3xl font-bold text-tet-accent">
            2,450 <span className="text-sm font-medium">điểm</span>
          </p>
        </div>
      </section>

      {/* 3. Truy cập nhanh */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Thông tin cá nhân", icon: <User size={24} /> },
          { label: "Lịch sử đơn hàng", icon: <ClipboardList size={24} /> },
          { label: "Quản lý địa chỉ", icon: <MapPin size={24} /> },
          { label: "Tạo hộp quà Tết", icon: <Gift size={24} /> },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col items-center gap-3 hover:border-tet-secondary hover:shadow-lg transition-all cursor-pointer text-center"
          >
            <div className="text-tet-accent">{item.icon}</div>
            <p className="text-xs font-bold text-tet-primary">{item.label}</p>
          </div>
        ))}
      </div>

      {/* 4. Đơn hàng gần đây */}
      <section className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-serif font-bold text-tet-primary">
            Đơn hàng gần đây
          </h3>
          <button className="text-tet-accent text-sm font-bold hover:underline">
            Xem tất cả
          </button>
        </div>
        <div className="space-y-4">
          {[
            {
              id: "DH001234",
              date: "15/01/2024",
              price: "2,450,000đ",
              status: "Đã giao",
              color: "text-green-600 bg-green-50 border-green-100",
            },
            {
              id: "DH001235",
              date: "18/01/2024",
              price: "1,850,000đ",
              status: "Đang giao",
              color: "text-blue-600 bg-blue-50 border-blue-100",
            },
          ].map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-white border border-transparent hover:border-gray-200 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-tet-primary shadow-inner">
                  <Package size={24} />
                </div>
                <div>
                  <p className="text-sm font-black text-tet-primary">
                    #{order.id}
                  </p>
                  <p className="text-xs text-gray-400 font-medium">
                    {order.date}
                  </p>
                </div>
              </div>
              <div className="text-right flex items-center gap-6">
                <div className="hidden sm:block">
                  <p className="text-sm font-black text-tet-primary">
                    {order.price}
                  </p>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full border ${order.color} font-bold`}
                  >
                    {order.status}
                  </span>
                </div>
                <ChevronRight className="text-gray-300 group-hover:text-tet-primary" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
