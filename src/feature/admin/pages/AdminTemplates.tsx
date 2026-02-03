
import { Gift, Eye, Trash2, Copy, Star } from "lucide-react";

export default function AdminTemplates() {
  const templates = [
    {
      id: 100,
      name: "Giỏ Tết Sang Trọng",
      config: "Giỏ Sang Trọng",
      price: 880000,
      unit: 2700,
      cloneCount: 45,
      items: ["Bánh Kem Dâu x2", "Kẹo Dừa x1", "Rượu Vang x1"],
      image: "https://via.placeholder.com/200",
    },
    {
      id: 101,
      name: "Giỏ Tết Truyền Thống",
      config: "Giỏ Truyền Thống",
      price: 650000,
      unit: 2200,
      cloneCount: 38,
      items: ["Bánh chưng x1", "Mứt gừng x2", "Nước mắm x1"],
      image: "https://via.placeholder.com/200",
    },
    {
      id: 102,
      name: "Giỏ Tết Cao Cấp",
      config: "Giỏ Cao Cấp",
      price: 1250000,
      unit: 3500,
      cloneCount: 32,
      items: ["Chocolate Bỉ x3", "Champagne x1", "Macaron x2"],
      image: "https://via.placeholder.com/200",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-serif font-bold text-tet-primary">
              Quản lý giỏ mẫu
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Giỏ quà mẫu cho khách hàng clone
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 border border-tet-primary text-tet-primary px-6 py-3 rounded-full font-bold hover:bg-tet-secondary transition-all">
              <Star size={20} />
              Chọn từ sản phẩm
            </button>
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all group"
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden bg-gray-100">
              <img
                src={template.image}
                alt={template.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute top-3 right-3 flex gap-2">
                <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                  TEMPLATE
                </span>
                <span className="bg-white/90 backdrop-blur-sm text-tet-accent px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                  <Copy size={12} />
                  {template.cloneCount}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="text-lg font-bold text-tet-primary mb-1">
                {template.name}
              </h3>
              <p className="text-xs text-gray-500 mb-3">
                Config: {template.config}
              </p>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-2xl font-bold text-tet-accent">
                    {template.price.toLocaleString()}đ
                  </p>
                  <p className="text-xs text-gray-500">{template.unit}g</p>
                </div>
              </div>

              {/* Items */}
              <div className="mb-4">
                <p className="text-xs font-bold text-gray-600 mb-2">
                  Món trong giỏ:
                </p>
                <div className="space-y-1">
                  {template.items.map((item, index) => (
                    <p key={index} className="text-xs text-gray-600 flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-tet-accent"></span>
                      {item}
                    </p>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-bold hover:bg-blue-100 transition-all">
                  <Eye size={16} />
                  Xem
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg font-bold hover:bg-red-100 transition-all">
                  <Trash2 size={16} />
                  Gỡ
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-3xl border border-purple-100">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-tet-primary mb-2">
              Thống kê template
            </h3>
            <p className="text-sm text-gray-600">
              Tổng số lần clone: <span className="font-bold">115 lần</span>
            </p>
          </div>
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white shadow-lg">
            <Gift size={28} />
          </div>
        </div>
      </div>
    </div>
  );
}
