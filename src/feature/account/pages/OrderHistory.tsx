import { motion } from "framer-motion";
import { Search, Calendar, CreditCard, RefreshCcw } from "lucide-react";

export default function OrderHistory() {
  const orders = [
    {
      id: "TG2024001",
      date: "15/01/2024 - 14:30",
      status: "Đã giao",
      statusColor: "text-green-600 bg-green-50 border-green-100",
      total: "1,250,000đ",
      payment: "Thẻ tín dụng",
      items: 3,
      productName: "Hộp quà Xuân Như Ý",
      img: "https://res.cloudinary.com/dratbz8bh/image/upload/v1769521637/IN-VO-HOP-QUA-TET_z1cmai.jpg",
    },
    {
      id: "TG2024002",
      date: "12/01/2024 - 09:15",
      status: "Đang giao",
      statusColor: "text-blue-600 bg-blue-50 border-blue-100",
      total: "890.000đ",
      payment: "Chuyển khoản",
      items: 2,
      productName: "Set Trà Thượng Hạng",
      img: "https://res.cloudinary.com/dratbz8bh/image/upload/v1769313271/1714504461883_xqmhva.png",
    },
    {
      id: "TG2024003",
      date: "08/01/2024 - 16:45",
      status: "Chờ xác nhận",
      statusColor: "text-amber-600 bg-amber-50 border-amber-100",
      total: "320.000đ",
      payment: "COD",
      items: 1,
      productName: "Túi quà Tết Đoàn Viên",
      img: "https://res.cloudinary.com/dratbz8bh/image/upload/v1769521491/Gia-Dinh-Doan-Vien-T_v0n9to.png",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      {/* 1. THANH TÌM KIẾM & BỘ LỌC */}
      <section className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Mã đơn hàng hoặc tên sản phẩm..."
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-tet-secondary outline-none transition-all text-sm"
            />
          </div>
          <div className="flex gap-3">
            <select className="bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 text-sm font-bold text-tet-primary outline-none focus:ring-2 focus:ring-tet-secondary cursor-pointer">
              <option>Tất cả trạng thái</option>
              <option>Đang giao</option>
              <option>Đã giao</option>
              <option>Đã hủy</option>
            </select>
            <select className="bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 text-sm font-bold text-tet-primary outline-none focus:ring-2 focus:ring-tet-secondary cursor-pointer">
              <option>30 ngày qua</option>
              <option>6 tháng qua</option>
              <option>Năm 2023</option>
            </select>
          </div>
        </div>
      </section>

      {/* 2. DANH SÁCH ĐƠN HÀNG */}
      <div className="space-y-4">
        {orders.map((order) => (
          <motion.div
            key={order.id}
            whileHover={{ y: -4 }}
            className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100 group transition-all"
          >
            {/* Header của Card: Mã đơn & Ngày */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-50 pb-4 mb-6">
              <div className="flex items-center gap-4">
                <span className="text-sm font-black text-tet-primary uppercase tracking-wider">
                  Mã đơn: #{order.id}
                </span>
                <span className="hidden sm:block text-gray-300">|</span>
                <span className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                  <Calendar size={14} /> {order.date}
                </span>
              </div>
              <span
                className={`text-[10px] px-3 py-1 rounded-full border font-bold uppercase tracking-widest ${order.statusColor}`}
              >
                {order.status}
              </span>
            </div>

            {/* Nội dung sản phẩm & Giá */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex gap-4">
                <div className="w-20 h-20 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 shrink-0">
                  <img
                    src={order.img}
                    alt="product"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-tet-primary line-clamp-1">
                    {order.productName}
                  </h4>
                  <p className="text-xs text-gray-400 italic">
                    {order.items} sản phẩm
                  </p>
                  <div className="flex items-center gap-2 text-[10px] text-gray-500 mt-2">
                    <CreditCard size={12} />{" "}
                    <span>Thanh toán: {order.payment}</span>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-auto flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-2 border-t md:border-0 pt-4 md:pt-0">
                <p className="text-xl font-black text-tet-primary">
                  {order.total}
                </p>
                <div className="flex gap-2">
                  <button className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-500 hover:bg-gray-50 transition-all">
                    Xem chi tiết
                  </button>
                  {order.status === "Đã giao" ? (
                    <button className="px-4 py-2 rounded-xl bg-tet-primary text-white text-xs font-bold shadow-md hover:bg-tet-accent transition-all flex items-center gap-1.5">
                      <RefreshCcw size={14} /> Mua lại
                    </button>
                  ) : (
                    order.status === "Chờ xác nhận" && (
                      <button className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold shadow-md hover:bg-red-700 transition-all">
                        Hủy đơn
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 3. PAGINATION TĨNH */}
      <div className="flex justify-center items-center gap-2 pt-6">
        <button className="px-4 py-2 rounded-xl border border-gray-100 text-sm font-bold text-gray-400 hover:bg-[#FBF5E8] hover:text-tet-primary transition-all">
          Trước
        </button>
        <button className="w-10 h-10 rounded-xl bg-tet-primary text-white font-bold shadow-lg">
          1
        </button>
        <button className="w-10 h-10 rounded-xl border border-gray-100 text-sm font-bold text-gray-400 hover:bg-[#FBF5E8]">
          2
        </button>
        <button className="w-10 h-10 rounded-xl border border-gray-100 text-sm font-bold text-gray-400 hover:bg-[#FBF5E8]">
          3
        </button>
        <button className="px-4 py-2 rounded-xl border border-gray-100 text-sm font-bold text-gray-400 hover:bg-[#FBF5E8] hover:text-tet-primary transition-all">
          Sau
        </button>
      </div>
    </motion.div>
  );
}
