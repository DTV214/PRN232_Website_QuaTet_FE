import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Wallet } from "lucide-react";

export default function CheckoutPage() {
  return (
    <div className="bg-[#FBF5E8]/30 min-h-screen py-10 md:py-16">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <h1 className="text-3xl font-serif font-bold text-tet-primary mb-10">
          Thanh toán
        </h1>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* CỘT TRÁI: THÔNG TIN VÀ PHƯƠNG THỨC */}
          <div className="w-full lg:w-2/3 space-y-8">
            {/* 1. Thông tin liên hệ */}
            <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
              <h3 className="text-xl font-serif font-bold text-tet-primary">
                Thông tin liên hệ
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                    Họ và tên *
                  </Label>
                  <Input
                    placeholder="Nguyễn Văn A"
                    className="rounded-xl border-gray-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                    Số điện thoại *
                  </Label>
                  <Input
                    placeholder="0912 345 678"
                    className="rounded-xl border-gray-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                    Email *
                  </Label>
                  <Input
                    placeholder="email@example.com"
                    className="rounded-xl border-gray-200"
                  />
                </div>
              </div>
            </section>

            {/* 2. Địa chỉ giao hàng */}
            <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
              <h3 className="text-xl font-serif font-bold text-tet-primary">
                Địa chỉ giao hàng
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Select>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Tỉnh/Thành phố *" />
                  </SelectTrigger>
                </Select>
                <Select>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Quận/Huyện *" />
                  </SelectTrigger>
                </Select>
                <Select>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Phường/Xã *" />
                  </SelectTrigger>
                </Select>
                <div className="md:col-span-3 space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                    Địa chỉ cụ thể *
                  </Label>
                  <Input
                    placeholder="Số nhà, tên đường..."
                    className="rounded-xl border-gray-200"
                  />
                </div>
              </div>
            </section>

            {/* 3. Phương thức giao hàng & Thanh toán */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <section className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-6">
                <h3 className="text-lg font-serif font-bold text-tet-primary">
                  Phương thức giao hàng
                </h3>
                <RadioGroup defaultValue="standard" className="space-y-3">
                  <div className="flex items-center justify-between p-4 border rounded-2xl cursor-pointer hover:bg-gray-50 transition-all border-tet-primary bg-tet-bg/10">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="standard" id="standard" />
                      <Label
                        htmlFor="standard"
                        className="font-bold text-sm cursor-pointer"
                      >
                        Giao hàng tiêu chuẩn
                      </Label>
                    </div>
                    <span className="text-sm font-black">30.000đ</span>
                  </div>
                </RadioGroup>
              </section>

              <section className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-6">
                <h3 className="text-lg font-serif font-bold text-tet-primary">
                  Phương thức thanh toán
                </h3>
                <RadioGroup defaultValue="cod" className="space-y-3">
                  <div className="flex items-center justify-between p-4 border rounded-2xl cursor-pointer hover:bg-gray-50 transition-all">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="cod" id="cod" />
                      <Label
                        htmlFor="cod"
                        className="font-bold text-sm cursor-pointer"
                      >
                        Thanh toán khi nhận hàng
                      </Label>
                    </div>
                    <Wallet size={20} className="text-gray-400" />
                  </div>
                </RadioGroup>
              </section>
            </div>
          </div>

          {/* CỘT PHẢI: TÓM TẮT ĐƠN HÀNG (Sticky) */}
          <aside className="w-full lg:w-1/3 sticky top-28">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100 space-y-8">
              <h3 className="text-xl font-serif font-bold text-tet-primary">
                Đơn hàng của bạn
              </h3>

              {/* Danh sách sản phẩm */}
              <div className="space-y-6">
                <div className="flex gap-4 items-center">
                  <div className="relative w-16 h-16 bg-gray-50 rounded-xl overflow-hidden shrink-0">
                    <img src="https://via.placeholder.com/80" alt="item" />
                    <span className="absolute -top-2 -right-2 bg-tet-primary text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                      1
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-tet-primary line-clamp-1">
                      Hộp quà Tết Phúc Lộc Thọ
                    </h4>
                    <p className="text-[10px] text-gray-400 uppercase font-bold">
                      Size: Lớn | Màu: Đỏ vàng
                    </p>
                  </div>
                  <span className="text-sm font-black text-tet-primary">
                    850.000đ
                  </span>
                </div>
              </div>

              {/* Mã giảm giá */}
              <div className="flex gap-2">
                <Input placeholder="Nhập mã giảm giá" className="rounded-xl" />
                <button className="bg-[#4a0d06] text-white px-4 py-2 rounded-xl text-xs font-bold hover:brightness-125 transition-all shrink-0">
                  Áp dụng
                </button>
              </div>

              {/* Tính toán tổng tiền */}
              <div className="space-y-3 pt-6 border-t border-gray-50">
                <div className="flex justify-between text-sm text-gray-500 font-medium">
                  <span>Tạm tính</span>
                  <span>1.290.000đ</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500 font-medium">
                  <span>Phí vận chuyển</span>
                  <span>30.000đ</span>
                </div>
                <div className="flex justify-between text-sm text-green-600 font-bold">
                  <span>Giảm giá</span>
                  <span>-129.000đ</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-lg font-serif font-bold text-tet-primary uppercase">
                    Tổng cộng
                  </span>
                  <div className="text-right">
                    <p className="text-2xl font-black text-tet-primary italic">
                      1.191.000đ
                    </p>
                    <p className="text-[10px] text-green-600 font-bold tracking-tighter italic">
                      🌸 Tiết kiệm: 129.000đ
                    </p>
                  </div>
                </div>
              </div>

              <button className="w-full bg-[#4a0d06] text-white py-5 rounded-2xl font-bold text-lg shadow-xl hover:bg-tet-accent transition-all hover:scale-[1.02] active:scale-[0.98]">
                Đặt hàng
              </button>

              <p className="text-[10px] text-center text-gray-400 italic font-medium">
                🛡️ Thanh toán an toàn & bảo mật
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
