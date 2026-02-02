import { motion } from "framer-motion";
import { Ticket, Info, Clock, Truck } from "lucide-react";

export default function AccountVouchers() {
  const vouchers = [
    {
      id: "TET2025",
      value: "10%",
      label: "GIẢM GIÁ",
      title: "Giảm 10% Quà Tết",
      min: "500.000đ",
      apply: "Quà Tết, Hộp quà",
      date: "28/01/2025",
      color: "bg-[#9F3025]",
    },
    {
      id: "GIFT50K",
      value: "50K",
      label: "GIẢM GIÁ",
      title: "Giảm 50.000đ",
      min: "300.000đ",
      apply: "Tất cả sản phẩm",
      date: "31/01/2025",
      color: "bg-[#D97706]",
    },
    {
      id: "TETSHIP",
      value: "FREESHIP",
      label: "VẬN CHUYỂN",
      title: "Miễn phí vận chuyển",
      min: "200.000đ",
      apply: "Toàn quốc",
      date: "25/01/2025",
      color: "bg-[#3B82F6]",
      isShip: true,
    },
    {
      id: "PREMIUM15",
      value: "15%",
      label: "GIẢM GIÁ",
      title: "Giảm 15% Hộp quà cao cấp",
      min: "1.000.000đ",
      apply: "Hộp quà cao cấp",
      date: "30/01/2025",
      color: "bg-[#7C3AED]",
    },
    {
      id: "MEGA100",
      value: "100K",
      label: "GIẢM GIÁ",
      title: "Giảm 100.000đ",
      min: "800.000đ",
      apply: "Tất cả sản phẩm",
      date: "27/01/2025",
      color: "bg-[#DB2777]",
    },
    {
      id: "NEWTET20",
      value: "20%",
      label: "GIẢM GIÁ",
      title: "Giảm 20% Khách hàng mới",
      min: "400.000đ",
      apply: "Đơn đầu tiên",
      date: "29/01/2025",
      color: "bg-[#0D9488]",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-6 pb-10"
    >
      {/* 1. HEADER & NHẬP MÃ */}
      <section className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
        <div className="mb-6">
          <h3 className="text-2xl font-serif font-bold text-tet-primary">
            Mã giảm giá
          </h3>
          <p className="text-sm text-gray-400 italic">
            Hãy áp dụng mã giảm giá để được giá ưu đãi
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 max-w-2xl">
          <div className="relative flex-1">
            <Ticket
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Nhập mã giảm giá của bạn..."
              className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-tet-secondary transition-all"
            />
          </div>
          <button className="bg-[#4a0d06] text-white px-8 py-3.5 rounded-2xl font-bold shadow-lg hover:brightness-125 transition-all shrink-0">
            Thêm mã
          </button>
        </div>
      </section>

      {/* 2. TABS PHÂN LOẠI */}
      <div className="flex gap-8 border-b border-gray-100 px-2 overflow-x-auto no-scrollbar">
        {[
          { name: "Có thể dùng", count: 8 },
          { name: "Đã dùng", count: 12 },
          { name: "Hết hạn", count: 5 },
        ].map((tab, i) => (
          <button
            key={i}
            className={`flex items-center gap-2 pb-4 text-sm font-bold transition-all border-b-2 whitespace-nowrap ${
              i === 0
                ? "border-tet-primary text-tet-primary"
                : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            {tab.name}{" "}
            <span className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full text-[10px]">
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* 3. BỘ LỌC CHI TIẾT */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-3">
          <select className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-xs font-bold text-gray-600 outline-none">
            <option>Tất cả danh mục</option>
          </select>
          <select className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-xs font-bold text-gray-600 outline-none">
            <option>Đơn tối thiểu</option>
          </select>
          <button className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2 text-xs font-bold text-gray-600">
            <Truck size={14} /> Miễn phí ship
          </button>
        </div>
        <select className="bg-transparent text-xs font-bold text-gray-600 outline-none">
          <option>Sắp hết hạn</option>
        </select>
      </div>

      {/* 4. LƯỚI VOUCHER */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {vouchers.map((v) => (
          <motion.div
            key={v.id}
            whileHover={{ y: -5 }}
            className="flex h-36 bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 group transition-all"
          >
            {/* Phần màu trái (Value) */}
            <div
              className={`w-32 md:w-40 ${v.color} flex flex-col items-center justify-center text-white relative`}
            >
              {/* Ticket Cutouts (Mô phỏng đường xẻ vé) */}
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#FBF5E8] rounded-full"></div>
              <div className="absolute right-[-1px] top-0 bottom-0 w-[2px] border-l-2 border-dashed border-white/30"></div>

              <div className="z-10 text-center px-2">
                {v.isShip ? (
                  <Truck size={36} className="mx-auto mb-2" />
                ) : (
                  <p className="text-2xl md:text-3xl font-black">{v.value}</p>
                )}
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-80 mt-1">
                  {v.label}
                </p>
              </div>
            </div>

            {/* Phần thông tin phải */}
            <div className="flex-1 p-5 flex flex-col justify-between relative">
              <span className="absolute top-4 right-4 bg-green-50 text-green-600 px-3 py-1 rounded-full text-[10px] font-bold border border-green-100">
                Có thể dùng
              </span>

              <div className="space-y-1">
                <h4 className="text-sm md:text-base font-bold text-tet-primary line-clamp-1">
                  {v.title}
                </h4>
                <div className="flex flex-col gap-1">
                  <p className="text-[11px] text-gray-500 flex items-center gap-1.5">
                    <Info size={12} /> Đơn tối thiểu: {v.min}
                  </p>
                  <p className="text-[11px] text-gray-400 italic">
                    Áp dụng: {v.apply}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-2 border-t border-gray-50 pt-3">
                <p className="text-[11px] text-gray-400 flex items-center gap-1.5 font-medium">
                  <Clock size={12} /> HSD: {v.date}
                </p>
                <button className="text-tet-accent text-xs font-black uppercase hover:underline">
                  Dùng ngay
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
