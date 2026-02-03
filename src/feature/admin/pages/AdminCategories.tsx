import { useState } from "react";
import { Plus, Edit, Trash2, Tag } from "lucide-react";

export default function AdminCategories() {
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);

  // Mock data
  const categories = [
    { id: 1, name: "Bánh ngọt", productCount: 25, createdAt: "15/01/2024" },
    { id: 2, name: "Kẹo mứt", productCount: 18, createdAt: "15/01/2024" },
    { id: 3, name: "Rượu ngoại", productCount: 12, createdAt: "15/01/2024" },
    { id: 4, name: "Trái cây", productCount: 8, createdAt: "16/01/2024" },
    { id: 5, name: "Đặc sản", productCount: 15, createdAt: "16/01/2024" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-serif font-bold text-tet-primary">
              Quản lý danh mục
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Quản lý các danh mục sản phẩm
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-tet-primary text-white px-6 py-3 rounded-full font-bold hover:bg-tet-accent transition-all shadow-md"
          >
            <Plus size={20} />
            Thêm danh mục
          </button>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-tet-accent to-tet-primary flex items-center justify-center text-white shadow-lg">
                <Tag size={24} />
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 hover:bg-yellow-50 rounded-lg text-yellow-600 transition-colors">
                  <Edit size={16} />
                </button>
                <button className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <h3 className="text-lg font-bold text-tet-primary mb-2">
              {category.name}
            </h3>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">
                {category.productCount} sản phẩm
              </span>
              <span className="text-gray-400 text-xs">{category.createdAt}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-2xl font-serif font-bold text-tet-primary mb-6">
              {editingCategory ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Tên danh mục
                </label>
                <input
                  type="text"
                  placeholder="Nhập tên danh mục..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-tet-accent focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-6 py-3 border border-gray-200 rounded-full font-bold hover:bg-gray-50 transition-all"
              >
                Hủy
              </button>
              <button className="flex-1 px-6 py-3 bg-tet-primary text-white rounded-full font-bold hover:bg-tet-accent transition-all shadow-md">
                {editingCategory ? "Cập nhật" : "Tạo mới"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
