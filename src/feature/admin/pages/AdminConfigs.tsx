import { useState } from "react";
import { Plus, Edit, Trash2, Settings, Eye } from "lucide-react";

export default function AdminConfigs() {
  const configs = [
    {
      id: 1,
      name: "Giỏ Tết Sang Trọng",
      totalUnit: 3000,
      suggestion: "Phù hợp biếu sếp, đối tác",
      detailsCount: 3,
      productsCount: 12,
    },
    {
      id: 2,
      name: "Giỏ Tết Truyền Thống",
      totalUnit: 2500,
      suggestion: "Dành cho gia đình",
      detailsCount: 4,
      productsCount: 8,
    },
    {
      id: 3,
      name: "Giỏ Tết Cao Cấp",
      totalUnit: 4000,
      suggestion: "Biếu tặng VIP",
      detailsCount: 5,
      productsCount: 15,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-serif font-bold text-tet-primary">
              Quản lý cấu hình giỏ quà
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Template và quy tắc cho giỏ quà
            </p>
          </div>
          <button className="flex items-center gap-2 bg-tet-primary text-white px-6 py-3 rounded-full font-bold hover:bg-tet-accent transition-all shadow-md">
            <Plus size={20} />
            Tạo cấu hình
          </button>
        </div>
      </div>

      {/* Configs List */}
      <div className="space-y-4">
        {configs.map((config) => (
          <div
            key={config.id}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white shadow-lg flex-shrink-0">
                  <Settings size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-tet-primary mb-1">
                    {config.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">
                    {config.suggestion}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      Tối đa: {config.totalUnit}g
                    </span>
                    <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      {config.detailsCount} quy tắc
                    </span>
                    <span className="inline-flex items-center gap-1 bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-xs font-bold">
                      <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                      {config.productsCount} sản phẩm
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-blue-50 rounded-lg text-blue-600 transition-colors">
                  <Eye size={18} />
                </button>
                <button className="p-2 hover:bg-yellow-50 rounded-lg text-yellow-600 transition-colors">
                  <Edit size={18} />
                </button>
                <button className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            {/* Config Details Preview */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs font-bold text-gray-600 mb-2 uppercase">
                Quy tắc danh mục:
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-xs">
                  Bánh: tối đa 3 món
                </span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-xs">
                  Kẹo: tối đa 2 món
                </span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-xs">
                  Rượu: tối đa 1 món
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
