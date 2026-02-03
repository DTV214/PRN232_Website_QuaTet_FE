// src/feature/account/pages/AccountOverview.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  ClipboardList,
  ShieldCheck,
  MapPin,
  Gift,
  Loader2,
} from "lucide-react";
import type { ProfileData } from "../services/accountService";
import accountService from "../services/accountService";

export default function AccountOverview() {
  const navigate = useNavigate();
  // 1. Khởi tạo State để quản lý dữ liệu người dùng
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // 2. Fetch dữ liệu từ API khi component được mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await accountService.getProfile();
        if (response.status === 200) {
          setProfile(response.data);
        }
      } catch (error: unknown) {
        console.error("Lỗi khi lấy thông tin hồ sơ:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // 3. Hiển thị trạng thái loading trong khi chờ API
  if (loading) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center text-tet-primary">
        <Loader2 className="animate-spin mb-4" size={40} />
        <p className="font-serif italic text-sm">
          Đang lấy thông tin quà Tết của bạn...
        </p>
      </div>
    );
  }

  // 4. Nếu không có profile (lỗi hệ thống)
  if (!profile) {
    return (
      <div className="text-center py-20 text-red-500">
        Không thể tải thông tin tài khoản. Vui lòng thử lại sau.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 1. Thông tin người dùng (REAL DATA) */}
      <section className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-full border-4 border-tet-secondary overflow-hidden shadow-lg bg-gray-50">
            <img
              src={`https://ui-avatars.com/api/?name=${profile.fullName || profile.username}&background=random&size=150`}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-serif font-bold text-tet-primary">
              {profile.fullName || "Chưa cập nhật tên"}
            </h2>
            <p className="text-sm text-gray-500 italic">{profile.email}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-3">
              <span className="flex items-center gap-1 bg-green-50 text-green-600 px-3 py-1 rounded-full text-[10px] font-bold border border-green-100">
                <ShieldCheck size={12} /> Email đã xác thực
              </span>
              {profile.status === "ACTIVE" && (
                <span className="flex items-center gap-1 bg-green-50 text-green-600 px-3 py-1 rounded-full text-[10px] font-bold border border-green-100">
                  <ShieldCheck size={12} /> Tài khoản hoạt động
                </span>
              )}
            </div>
          </div>
        </div>
        <button
          onClick={() => navigate("/account/profile")}
          className="bg-tet-primary text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-tet-accent transition-all shadow-md active:scale-95"
        >
          Chỉnh sửa hồ sơ
        </button>
      </section>

      {/* 2. Hạng thành viên & Số dư ví (REAL DATA) */}
      <section className="bg-[#FBF5E8] p-6 rounded-3xl border border-tet-secondary/30 flex justify-between items-center group cursor-pointer hover:shadow-md transition-all">
        <div>
          <p className="text-xs text-tet-primary/60 font-bold uppercase tracking-widest mb-1">
            Hạng thành viên
          </p>
          <h3 className="text-3xl font-serif font-black text-tet-primary uppercase">
            {profile.role === "CUSTOMER" ? "Bạc" : profile.role}
          </h3>
        </div>
        <div className="text-right">
          <p className="text-xs text-tet-primary/60 font-bold uppercase tracking-widest mb-1">
            Số dư ví Happybox
          </p>
          <p className="text-3xl font-bold text-tet-accent">
            {profile.walletBalance.toLocaleString()}{" "}
            <span className="text-sm font-medium">VNĐ</span>
          </p>
        </div>
      </section>

      {/* 3. Truy cập nhanh (Giữ nguyên giao diện của bạn) */}
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

      {/* 4. Đơn hàng gần đây (Mock Data tạm thời - Chờ API Order) */}
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
          <p className="text-sm text-gray-400 text-center py-4 italic">
            Chức năng xem đơn hàng đang được cập nhật...
          </p>
        </div>
      </section>
    </div>
  );
}
