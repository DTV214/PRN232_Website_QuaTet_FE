
import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Settings, Eye } from "lucide-react";
import { configService, configDetailService, type ProductConfig, type ConfigDetail } from "../../../api";
import { categoryService, type Category } from "../../../api";

export default function AdminConfigs() {
  const [configs, setConfigs] = useState<ProductConfig[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [configDetails, setConfigDetails] = useState<Record<number, ConfigDetail[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingConfig, setEditingConfig] = useState<ProductConfig | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [viewingConfig, setViewingConfig] = useState<ProductConfig | null>(null);
  const [formData, setFormData] = useState<ProductConfig>({
    configname: "",
    suitablesuggestion: "",
    totalunit: 0,
    imageurl: "",
  });

  // Get token from localStorage
  const getToken = () => localStorage.getItem("token") || "";

  // Fetch configs and categories
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [configsRes, categoriesRes] = await Promise.all([
        configService.getAll(),
        categoryService.getAll(),
      ]);
      setConfigs(configsRes.data || []);
      setCategories(categoriesRes.data || []);

      // Fetch config details for each config
      const details: Record<number, ConfigDetail[]> = {};
      for (const config of configsRes.data || []) {
        if (config.configid) {
          try {
            const detailsRes = await configDetailService.getByConfig(config.configid);
            details[config.configid] = detailsRes.data || [];
          } catch (err) {
            details[config.configid] = [];
          }
        }
      }
      setConfigDetails(details);
    } catch (err: any) {
      console.error("Error fetching data:", err);
      setError(err.response?.data?.message || "Không thể tải dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  // Open modal for create/edit
  const handleOpenModal = (config?: ProductConfig) => {
    if (config) {
      setEditingConfig(config);
      setFormData(config);
    } else {
      setEditingConfig(null);
      setFormData({
        configname: "",
        suitablesuggestion: "",
        totalunit: 0,
        imageurl: "",
      });
    }
    setShowModal(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingConfig(null);
    setError(null);
  };

  // View config details
  const handleViewConfig = (config: ProductConfig) => {
    setViewingConfig(config);
  };

  // Close view modal
  const handleCloseViewModal = () => {
    setViewingConfig(null);
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.configname?.trim()) {
      setError("Vui lòng nhập tên cấu hình");
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      if (editingConfig?.configid) {
        // Update
        await configService.update(editingConfig.configid, formData, getToken());
      } else {
        // Create
        await configService.create(formData, getToken());
      }

      handleCloseModal();
      await fetchData(); // Auto refresh
    } catch (err: any) {
      console.error("Error saving config:", err);
      setError(err.response?.data?.message || "Không thể lưu cấu hình");
    } finally {
      setSubmitting(false);
    }
  };

  // Delete config
  const handleDelete = async (id: number) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa cấu hình này?")) {
      return;
    }

    try {
      setError(null);
      await configService.delete(id, getToken());
      await fetchData(); // Auto refresh
    } catch (err: any) {
      console.error("Error deleting config:", err);
      setError(err.response?.data?.message || "Không thể xóa cấu hình");
    }
  };

  // Get category name by id
  const getCategoryName = (categoryId: number) => {
    const category = categories.find(c => c.categoryid === categoryId);
    return category?.categoryname || "N/A";
  };

  // Get config details for a config
  const getConfigDetailsForConfig = (configId: number) => {
    return configDetails[configId] || [];
  };

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
          <button 
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 bg-tet-primary text-white px-6 py-3 rounded-full font-bold hover:bg-tet-accent transition-all shadow-md"
            disabled={loading}
          >
            <Plus size={20} />
            Tạo cấu hình
          </button>
        </div>
      </div>

      {/* Global Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center gap-3">
          <div className="flex-1 text-red-700 text-sm">{error}</div>
          <button
            onClick={() => setError(null)}
            className="text-red-500 hover:text-red-700 font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* Configs List */}
      {loading ? (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-12 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-tet-primary"></div>
        </div>
      ) : configs.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-12 text-center">
          <Settings size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg mb-4">Chưa có cấu hình nào</p>
          <button
            onClick={() => handleOpenModal()}
            className="inline-flex items-center gap-2 bg-tet-primary text-white px-6 py-3 rounded-full font-bold hover:bg-tet-accent transition-all shadow-md"
          >
            <Plus size={20} />
            Tạo cấu hình đầu tiên
          </button>
        </div>
      ) : (
        <div className="space-y-4">
        {configs.map((config) => {
          const details = getConfigDetailsForConfig(config.configid!);
          return (
          <div
            key={config.configid}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white shadow-lg flex-shrink-0">
                  <Settings size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-tet-primary mb-1">
                    {config.configname}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">
                    {config.suitablesuggestion || "Không có gợi ý"}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      Tối đa: {config.totalunit || 0}g
                    </span>
                    <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      {details.length} quy tắc
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleViewConfig(config)}
                  className="p-2 hover:bg-blue-50 rounded-lg text-blue-600 transition-colors"
                >
                  <Eye size={18} />
                </button>
                <button 
                  onClick={() => handleOpenModal(config)}
                  className="p-2 hover:bg-yellow-50 rounded-lg text-yellow-600 transition-colors"
                >
                  <Edit size={18} />
                </button>
                <button 
                  onClick={() => handleDelete(config.configid!)}
                  className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors"
                  disabled={loading}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            {/* Config Details Preview */}
            {details.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs font-bold text-gray-600 mb-2 uppercase">
                  Quy tắc danh mục:
                </p>
                <div className="flex flex-wrap gap-2">
                  {details.map((detail, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-xs">
                      {getCategoryName(detail.categoryid)}: tối đa {detail.quantity} món
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
        })}
        </div>
      )}

      {/* Create/Edit Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4"
          onClick={handleCloseModal}
        >
          <div 
            className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl relative max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-serif font-bold text-tet-primary mb-6 flex-shrink-0">
              {editingConfig ? "Chỉnh sửa cấu hình" : "Tạo cấu hình mới"}
            </h3>
            <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
              <div className="overflow-y-auto flex-1 pr-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <div className="space-y-4">
                  {/* Tên cấu hình */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Tên cấu hình <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Nhập tên cấu hình..."
                      value={formData.configname || ""}
                      onChange={(e) => setFormData({ ...formData, configname: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-tet-accent focus:border-transparent"
                      disabled={submitting}
                    />
                  </div>

                  {/* Gợi ý phù hợp */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Gợi ý phù hợp
                    </label>
                    <input
                      type="text"
                      placeholder="VD: Phù hợp biếu sếp, đối tác..."
                      value={formData.suitablesuggestion || ""}
                      onChange={(e) => setFormData({ ...formData, suitablesuggestion: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-tet-accent focus:border-transparent"
                      disabled={submitting}
                    />
                  </div>

                  {/* Tổng khối lượng */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Tổng khối lượng tối đa (gram)
                    </label>
                    <input
                      type="number"
                      placeholder="0"
                      value={formData.totalunit || 0}
                      onChange={(e) => setFormData({ ...formData, totalunit: Number(e.target.value) })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-tet-accent focus:border-transparent"
                      disabled={submitting}
                      min="0"
                    />
                  </div>

                  {/* URL hình ảnh */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      URL Hình ảnh
                    </label>
                    <input
                      type="url"
                      placeholder="https://example.com/image.jpg"
                      value={formData.imageurl || ""}
                      onChange={(e) => setFormData({ ...formData, imageurl: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-tet-accent focus:border-transparent"
                      disabled={submitting}
                    />
                  </div>

                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                      {error}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-3 pt-4 flex-shrink-0 border-t border-gray-100 mt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-6 py-3 border border-gray-200 rounded-full font-bold hover:bg-gray-50 transition-all"
                  disabled={submitting}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-tet-primary text-white rounded-full font-bold hover:bg-tet-accent transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={submitting}
                >
                  {submitting ? "Đang xử lý..." : editingConfig ? "Cập nhật" : "Tạo mới"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Config Modal */}
      {viewingConfig && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4"
          onClick={handleCloseViewModal}
        >
          <div 
            className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-serif font-bold text-tet-primary">
                Chi tiết cấu hình
              </h3>
              <button
                onClick={handleCloseViewModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              {/* Image */}
              {viewingConfig.imageurl && (
                <div className="flex justify-center">
                  <img
                    src={viewingConfig.imageurl}
                    alt={viewingConfig.configname}
                    className="max-w-full h-64 object-contain rounded-xl border border-gray-200"
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/400x300?text=No+Image";
                    }}
                  />
                </div>
              )}

              {/* Config Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-500 mb-1">ID Cấu hình</p>
                  <p className="font-bold text-tet-primary">{viewingConfig.configid}</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-500 mb-1">Tên cấu hình</p>
                  <p className="font-bold">{viewingConfig.configname || "-"}</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl md:col-span-2">
                  <p className="text-sm text-gray-500 mb-1">Gợi ý phù hợp</p>
                  <p className="font-bold">{viewingConfig.suitablesuggestion || "-"}</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-500 mb-1">Tổng khối lượng tối đa</p>
                  <p className="font-bold text-tet-accent text-lg">
                    {viewingConfig.totalunit || 0}g
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-500 mb-1">Số quy tắc</p>
                  <p className="font-bold text-lg">
                    {getConfigDetailsForConfig(viewingConfig.configid!).length}
                  </p>
                </div>
              </div>

              {/* Config Details */}
              {getConfigDetailsForConfig(viewingConfig.configid!).length > 0 && (
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-500 mb-3 font-bold">Quy tắc danh mục</p>
                  <div className="space-y-2">
                    {getConfigDetailsForConfig(viewingConfig.configid!).map((detail, index) => (
                      <div key={index} className="flex justify-between items-center bg-white p-3 rounded-lg">
                        <span className="font-medium">{getCategoryName(detail.categoryid)}</span>
                        <span className="text-tet-primary font-bold">Tối đa: {detail.quantity} món</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={handleCloseViewModal}
                  className="flex-1 px-6 py-3 border border-gray-200 rounded-full font-bold hover:bg-gray-50 transition-all"
                >
                  Đóng
                </button>
                <button
                  onClick={() => {
                    handleCloseViewModal();
                    handleOpenModal(viewingConfig);
                  }}
                  className="flex-1 px-6 py-3 bg-tet-primary text-white rounded-full font-bold hover:bg-tet-accent transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Edit size={18} />
                  Chỉnh sửa
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
