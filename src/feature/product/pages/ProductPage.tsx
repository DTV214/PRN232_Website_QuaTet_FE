import { Link } from "react-router-dom"; // Thêm Link để xử lý redirect qua trang chi tiết
import ProductHero from "../components/ProductHero";
import ProductSidebar from "../components/ProductSidebar";
import ProductCard from "../components/ProductCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Tạo dữ liệu Mock với ID riêng biệt để Link hoạt động chính xác
const MOCK_PRODUCTS = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  title: "Hộp quà Tết truyền thống",
  price: "1,250,000đ",
  img: "https://res.cloudinary.com/dratbz8bh/image/upload/v1769521637/IN-VO-HOP-QUA-TET_z1cmai.jpg",
}));

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-white">
      <ProductHero />
      <div className="container mx-auto px-6 py-12 flex flex-col lg:flex-row gap-10">
        {/* Sidebar: Ẩn trên mobile, hiện trên desktop */}
        <div className="hidden lg:block w-72 shrink-0">
          <ProductSidebar />
        </div>

        {/* Nội dung chính */}
        <div className="flex-1 space-y-8">
          <div className="flex justify-between items-center border-b pb-6">
            <p className="text-sm font-bold text-gray-500 italic">
              Hiển thị 117 sản phẩm
            </p>
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-tet-primary hidden sm:block">
                Sắp xếp:
              </span>

              <Select defaultValue="popular">
                {/* Đã thêm bg-white và shadow-sm để nút nổi bật hơn */}
                <SelectTrigger className="w-[180px] rounded-xl border-gray-200 focus:ring-tet-secondary bg-white shadow-sm">
                  <SelectValue placeholder="Sắp xếp" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="popular">Phổ biến nhất</SelectItem>
                  <SelectItem value="price-asc">Giá tăng dần</SelectItem>
                  <SelectItem value="price-desc">Giá giảm dần</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Grid sản phẩm */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {MOCK_PRODUCTS.map((p) => (
              <Link key={p.id} to={`/product/${p.id}`} className="block group">
                <ProductCard title={p.title} price={p.price} img={p.img} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
