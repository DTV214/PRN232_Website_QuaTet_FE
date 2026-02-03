import { useState } from "react";
import { Plus, Search, Edit, Trash2, Eye} from "lucide-react";


export default function AdminProducts() {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data - replace with real API call
  const products = [
    {
      id: 1,
      name: "Bánh Kem Dâu",
      sku: "BANH-001",
      category: "Bánh ngọt",
      price: 150000,
      unit: 500,
      status: "ACTIVE",
      image: "https://via.placeholder.com/80",
    },
    {
      id: 2,
      name: "Kẹo Dừa",
      sku: "KEO-001",
      category: "Kẹo",
      price: 80000,
      unit: 200,
      status: "ACTIVE",
      image: "https://via.placeholder.com/80",
    },
    {
      id: 3,
      name: "Giỏ Tết Sang Trọng",
      sku: "",
      category: "Giỏ quà",
      price: 880000,
      unit: 2700,
      status: "TEMPLATE",
      image: "https://via.placeholder.com/80",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-700";
      case "INACTIVE":
        return "bg-gray-100 text-gray-700";
      case "TEMPLATE":
        return "bg-purple-100 text-purple-700";
      case "DRAFT":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "Hoạt động";
      case "INACTIVE":
        return "Tạm dừng";
      case "TEMPLATE":
        return "Giỏ mẫu";
      case "DRAFT":
        return "Nháp";
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-serif font-bold text-tet-primary">
              Quản lý sản phẩm
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Quản lý tất cả sản phẩm và giỏ quà
            </p>
          </div>
          <button className="flex items-center gap-2 bg-tet-primary text-white px-6 py-3 rounded-full font-bold hover:bg-tet-accent transition-all shadow-md">
            <Plus size={20} />
            Thêm sản phẩm
          </button>
        </div>

        {/* Search & Filters */}
        <div className="mt-6 flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-full focus:ring-2 focus:ring-tet-accent focus:border-transparent"
            />
          </div>
          <select className="px-6 py-3 border border-gray-200 rounded-full focus:ring-2 focus:ring-tet-accent">
            <option value="">Tất cả trạng thái</option>
            <option value="ACTIVE">Hoạt động</option>
            <option value="INACTIVE">Tạm dừng</option>
            <option value="TEMPLATE">Giỏ mẫu</option>
            <option value="DRAFT">Nháp</option>
          </select>
          <select className="px-6 py-3 border border-gray-200 rounded-full focus:ring-2 focus:ring-tet-accent">
            <option value="">Tất cả danh mục</option>
            <option value="1">Bánh ngọt</option>
            <option value="2">Kẹo</option>
            <option value="3">Rượu</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Sản phẩm
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  SKU
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Danh mục
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Giá
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Khối lượng
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-tet-primary">
                          {product.name}
                        </p>
                        <p className="text-xs text-gray-500">ID: {product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600 font-mono">
                      {product.sku || "-"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-tet-accent">
                      {product.price.toLocaleString()}đ
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">
                      {product.unit}g
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${getStatusBadge(
                        product.status
                      )}`}
                    >
                      {getStatusText(product.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 hover:bg-blue-50 rounded-lg text-blue-600 transition-colors">
                        <Eye size={16} />
                      </button>
                      <button className="p-2 hover:bg-yellow-50 rounded-lg text-yellow-600 transition-colors">
                        <Edit size={16} />
                      </button>
                      <button className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Hiển thị <span className="font-bold">1-3</span> trong tổng số{" "}
            <span className="font-bold">3</span> sản phẩm
          </p>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 disabled:opacity-50">
              Trước
            </button>
            <button className="px-4 py-2 bg-tet-primary text-white rounded-lg text-sm font-medium">
              1
            </button>
            <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 disabled:opacity-50">
              Sau
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
