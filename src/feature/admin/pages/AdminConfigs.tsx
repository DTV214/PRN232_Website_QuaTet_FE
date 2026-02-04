import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Settings, Eye } from "lucide-react";
import { 
  configService,
  productService,
  productDetailService,
  categoryService,
  type ProductConfig,
  type Product,
  type Category,
  type ProductDetailResponse
} from "../../../api";
import ConfigProductManager from "../components/ConfigProductManager";

export default function AdminConfigs() {
  const [configs, setConfigs] = useState<ProductConfig[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [configProducts, setConfigProducts] = useState<Record<number, ProductDetailResponse[]>>({});
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
  const [selectedProducts, setSelectedProducts] = useState<{ productid: number; quantity: number }[]>([]);

  const getToken = () => localStorage.getItem("token") || "";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [configsRes, productsRes, categoriesRes] = await Promise.all([
        configService.getAll(),
        productService.getAll(),
        categoryService.getAll(),
      ]);
      setConfigs(configsRes.data || []);
      setCategories(categoriesRes.data || []);
      
      const individualProducts = (productsRes.data || []).filter(
        (p: Product) => !p.configid && p.status !== "TEMPLATE"
      );
      setProducts(individualProducts);

      // Fetch template products (products with configid) and their details
      const templateProducts = (productsRes.data || []).filter(
        (p: Product) => p.configid && p.status === "TEMPLATE"
      );
      
      const productDetails: Record<number, ProductDetailResponse[]> = {};
      for (const template of templateProducts) {
        if (template.productid) {
          try {
            const detailsRes = await productDetailService.getByParent(template.productid);
            // Store by configid for easy lookup
            if (template.configid) {
              productDetails[template.configid] = detailsRes.data || [];
            }
          } catch (err) {
            console.error(`Error fetching details for template ${template.productid}:`, err);
          }
        }
      }
      setConfigProducts(productDetails);
    } catch (err: any) {
      console.error("Error fetching data:", err);
      setError(err.response?.data?.message || "Không thể tải dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = async (config?: ProductConfig) => {
    if (config) {
      setEditingConfig(config);
      setFormData(config);
      if (config.configid) {
        const details = configProducts[config.configid] || [];
        setSelectedProducts(details.map(d => ({ productid: d.productid, quantity: d.quantity || 1 })));
      }
    } else {
      setEditingConfig(null);
      setFormData({
        configname: "",
        suitablesuggestion: "",
        totalunit: 0,
        imageurl: "",
      });
      setSelectedProducts([]);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingConfig(null);
    setSelectedProducts([]);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.configname?.trim()) {
      setError("Vui lòng nhập tên cấu hình");
      return;
    }

    if (selectedProducts.length === 0) {
      setError("Vui lòng chọn ít nhất 1 sản phẩm cho giỏ quà");
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      let configId: number;
      let templateProductId: number | undefined;

      if (editingConfig?.configid) {
        // UPDATE MODE
        await configService.update(editingConfig.configid, formData, getToken());
        configId = editingConfig.configid;
        
        // Find existing template product
        const allProductsRes = await productService.getAll();
        const templateProduct = (allProductsRes.data || []).find(
          (p: Product) => p.configid === configId && p.status === "TEMPLATE"
        );
        templateProductId = templateProduct?.productid;
        
        if (templateProductId) {
          // Update existing template basket using new API
          const updateBasketData = {
            productname: `Template - ${formData.configname}`,
            description: `Template cho ${formData.configname}: ${formData.suitablesuggestion || ''}`,
            imageUrl: formData.imageurl || "",
            status: "TEMPLATE",
            productDetails: selectedProducts.map(p => ({
              productid: p.productid,
              quantity: p.quantity
            }))
          };
          
          await productService.updateCustom(templateProductId, updateBasketData, getToken());
        } else {
          // Template doesn't exist, create new one
          const createBasketData = {
            configid: configId,
            productname: `Template - ${formData.configname}`,
            description: `Template cho ${formData.configname}: ${formData.suitablesuggestion || ''}`,
            imageUrl: formData.imageurl || "",
            status: "DRAFT", // Will be set to TEMPLATE next
            productDetails: selectedProducts.map(p => ({
              productid: p.productid,
              quantity: p.quantity
            }))
          };
          
          await productService.createTemplate(createBasketData, getToken());
          
          // Wait a bit for database sync
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Find the created basket
          const refreshedProducts = await productService.getAll();
          const newBasket = (refreshedProducts.data || []).find(
            (p: Product) => p.configid === configId && p.status === "DRAFT" && p.productname?.startsWith("Template")
          );
          
          if (newBasket?.productid) {
            templateProductId = newBasket.productid;
            // Set as template
            if (templateProductId !== undefined) {
              await productService.templates.setAsTemplate(templateProductId, getToken());
            }
          } else {
            throw new Error("Không thể tìm thấy basket vừa tạo");
          }
        }
      } else {
        // CREATE MODE
        const response = await configService.create(formData, getToken());
        configId = response.data?.configid;
        
        if (!configId) {
          throw new Error("Không thể tạo cấu hình");
        }
        
        // Create custom basket with products
        const createBasketData = {
          configid: configId,
          productname: `Template - ${formData.configname}`,
          description: `Template cho ${formData.configname}: ${formData.suitablesuggestion || ''}`,
          imageUrl: formData.imageurl || "",
          status: "DRAFT", // Will be set to TEMPLATE next
          productDetails: selectedProducts.map(p => ({
            productid: p.productid,
            quantity: p.quantity
          }))
        };
        
        await productService.createTemplate(createBasketData, getToken());
        
        // Wait for database sync
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Find the created basket
        const refreshedProducts = await productService.getAll();
        const newBasket = (refreshedProducts.data || []).find(
          (p: Product) => p.configid === configId && p.status === "DRAFT" && p.productname?.startsWith("Template")
        );
        
        if (newBasket?.productid) {
          templateProductId = newBasket.productid;
          // Set as template
          if (templateProductId !== undefined) {
            await productService.templates.setAsTemplate(templateProductId, getToken());
          }
        } else {
          throw new Error("Không thể tìm thấy basket vừa tạo. Vui lòng thử lại.");
        }
      }

      handleCloseModal();
      await fetchData();
    } catch (err: any) {
      console.error("Error saving config:", err);
      console.error("Error response:", err.response);
      console.error("Error data:", err.response?.data);
      
      let errorMessage = "Không thể lưu cấu hình";
      if (err.response?.data?.errors) {
        // ModelState validation errors
        const errors = Object.values(err.response.data.errors).flat();
        errorMessage = errors.join(", ");
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa cấu hình này?")) {
      return;
    }

    try {
      setError(null);
      
      // Find and delete template product (this will cascade delete ProductDetails)
      const allProductsRes = await productService.getAll();
      const templateProduct = (allProductsRes.data || []).find(
        (p: Product) => p.configid === id && p.status === "TEMPLATE"
      );
      
      if (templateProduct?.productid) {
        await productService.delete(templateProduct.productid, getToken());
      }
      
      await configService.delete(id, getToken());
      await fetchData();
    } catch (err: any) {
      console.error("Error deleting config:", err);
      setError(err.response?.data?.message || "Không thể xóa cấu hình");
    }
  };

  const handleAddProduct = (productId: number) => {
    if (selectedProducts.find(p => p.productid === productId)) {
      setError("Sản phẩm đã được thêm");
      return;
    }
    setSelectedProducts([...selectedProducts, { productid: productId, quantity: 1 }]);
    setError(null);
  };

  const handleRemoveProduct = (productId: number) => {
    setSelectedProducts(selectedProducts.filter(p => p.productid !== productId));
  };

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    setSelectedProducts(selectedProducts.map(p => 
      p.productid === productId ? { ...p, quantity } : p
    ));
  };

  const getConfigProductsForConfig = (configId: number) => {
    return configProducts[configId] || [];
  };

  const getCategoryName = (categoryId?: number) => {
    if (!categoryId) return "Chưa phân loại";
    return categories.find(c => c.categoryid === categoryId)?.categoryname || "N/A";
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
              Template và sản phẩm cho giỏ quà
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
          const details = getConfigProductsForConfig(config.configid!);
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
                      {details.length} sản phẩm
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setViewingConfig(config)}
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
                  Sản phẩm trong giỏ:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {details.slice(0, 4).map((detail, index) => {
                    const product = products.find(p => p.productid === detail.productid);
                    const productImg = product?.imageUrl;
                    const productName = detail.productname || product?.productname || "N/A";
                    return (
                      <div key={index} className="bg-gray-50 rounded-lg p-2 text-center">
                        {productImg && (
                          <img 
                            src={productImg} 
                            alt={productName}
                            className="w-full h-16 object-cover rounded mb-1"
                          />
                        )}
                        <p className="text-xs font-medium truncate">{productName}</p>
                        <p className="text-xs text-gray-500 truncate">{getCategoryName(product?.categoryid)}</p>
                        <p className="text-xs text-tet-primary font-bold">x{detail.quantity}</p>
                      </div>
                    );
                  })}
                  {details.length > 4 && (
                    <div className="bg-gray-50 rounded-lg p-2 flex items-center justify-center">
                      <p className="text-sm text-gray-500">+{details.length - 4} khác</p>
                    </div>
                  )}
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
            className="bg-white rounded-3xl p-8 max-w-4xl w-full shadow-2xl relative max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-serif font-bold text-tet-primary mb-6 flex-shrink-0">
              {editingConfig ? "Chỉnh sửa cấu hình" : "Tạo cấu hình mới"}
            </h3>
            <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
              <div className="overflow-y-auto flex-1 pr-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">
                <div className="space-y-4">
                  {/* Basic Config Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  </div>

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

                  {/* Product Selection */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <ConfigProductManager
                      products={products}
                      categories={categories}
                      selectedProducts={selectedProducts}
                      onAdd={handleAddProduct}
                      onRemove={handleRemoveProduct}
                      onUpdateQuantity={handleUpdateQuantity}
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
          onClick={() => setViewingConfig(null)}
        >
          <div 
            className="bg-white rounded-3xl p-8 max-w-3xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-serif font-bold text-tet-primary">
                Chi tiết cấu hình
              </h3>
              <button
                onClick={() => setViewingConfig(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              {viewingConfig.imageurl && (
                <div className="flex justify-center">
                  <img
                    src={viewingConfig.imageurl}
                    alt={viewingConfig.configname}
                    className="max-w-full h-64 object-contain rounded-xl border border-gray-200"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-500 mb-1">Tên cấu hình</p>
                  <p className="font-bold">{viewingConfig.configname || "-"}</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-500 mb-1">Tổng khối lượng tối đa</p>
                  <p className="font-bold text-tet-accent text-lg">
                    {viewingConfig.totalunit || 0}g
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl md:col-span-2">
                  <p className="text-sm text-gray-500 mb-1">Gợi ý phù hợp</p>
                  <p className="font-bold">{viewingConfig.suitablesuggestion || "-"}</p>
                </div>
              </div>

              {/* Config Products */}
              {getConfigProductsForConfig(viewingConfig.configid!).length > 0 && (
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-500 mb-3 font-bold">
                    Sản phẩm trong giỏ ({getConfigProductsForConfig(viewingConfig.configid!).length})
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {getConfigProductsForConfig(viewingConfig.configid!).map((detail, index) => {
                      const product = products.find(p => p.productid === detail.productid);
                      const productImg = product?.imageUrl;
                      const productName = detail.productname || product?.productname || "N/A";
                      const categoryName = getCategoryName(product?.categoryid);
                      return (
                        <div key={index} className="flex items-center gap-3 bg-white p-3 rounded-lg border border-gray-200 hover:shadow-md transition-all">
                          {productImg && (
                            <img 
                              src={productImg} 
                              alt={productName}
                              className="w-16 h-16 object-cover rounded"
                            />
                          )}
                          <div className="flex-1">
                            <p className="font-medium">{productName}</p>
                            <p className="text-sm text-gray-500">{categoryName}</p>
                            <p className="text-xs text-gray-400">{detail.unit || product?.unit}g/sp</p>
                          </div>
                          <div className="text-right">
                            <span className="text-tet-primary font-bold block">x{detail.quantity}</span>
                            <span className="text-xs text-gray-500">{((detail.unit || product?.unit || 0) * (detail.quantity || 1))}g</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setViewingConfig(null)}
                  className="flex-1 px-6 py-3 border border-gray-200 rounded-full font-bold hover:bg-gray-50 transition-all"
                >
                  Đóng
                </button>
                <button
                  onClick={() => {
                    setViewingConfig(null);
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
