import axios from 'axios';
import { API_ENDPOINTS } from './apiConfig';

// Types
export interface Product {
  productid?: number;
  categoryid?: number;
  configid?: number;
  accountid?: number;
  sku?: string;
  productname?: string;
  description?: string;
  imageUrl?: string;
  price?: number;
  status?: string;
  unit?: number;
  isCustom?: boolean;
  totalQuantity?: number;
  stocks?: StockDto[];
}

export interface StockDto {
  stockId: number;
  productId: number;
  productName: string;
  quantity: number;
  expiryDate?: string;
  status: string;
  productionDate?: string;
  lastUpdated?: string;
}

export interface CreateSingleProductRequest {
  categoryid?: number;
  accountid?: number;
  sku: string;
  productname: string;
  description?: string;
  imageUrl?: string;
  price: number;
  unit: number;
  createStockRequest?: any;
}

export interface CreateComboProductRequest {
  configid?: number;
  accountid?: number;
  productname: string;
  description?: string;
  imageUrl?: string;
  status?: string;
  productDetails: ProductDetailRequest[];
}

export interface ProductDetailRequest {
  productid?: number;
  quantity?: number;
}

export interface UpdateComboProductRequest {
  productname?: string;
  description?: string;
  imageUrl?: string;
  status?: string;
  productDetails?: ProductDetailRequest[];
}

export interface CustomerBasketDto {
  productid: number;
  configid?: number;
  configName?: string;
  productname: string;
  description?: string;
  imageUrl?: string;
  status: string;
  totalPrice: number;
  totalWeight: number;
  createdDate?: string;
  productDetails: BasketProductDetailDto[];
}

export interface BasketProductDetailDto {
  productdetailid: number;
  productid: number;
  productname: string;
  sku?: string;
  price: number;
  unit: number;
  quantity: number;
  imageUrl?: string;
  totalQuantityInStock: number;
  subtotal: number;
}

export interface CloneBasketRequest {
  customName?: string;
}

export interface ValidationStatus {
  productid: number;
  productname: string;
  currentWeight?: number;
  maxWeight?: number;
  weightExceeded: boolean;
  warnings: string[];
  categoryStatus: Record<string, {
    categoryId: number;
    categoryName: string;
    currentCount: number;
    requiredCount: number;
    isSatisfied: boolean;
  }>;
  isValid: boolean;
}

// Product Service
export const productService = {
  // Get all products
  getAll: async () => {
    const response = await axios.get(API_ENDPOINTS.PRODUCTS.LIST);
    return response.data;
  },

  // Get product by ID
  getById: async (id: number | string) => {
    const response = await axios.get(API_ENDPOINTS.PRODUCTS.DETAIL(id));
    return response.data;
  },

  // Get products by account (logged in user)
  getByAccount: async (token: string) => {
    const response = await axios.get(API_ENDPOINTS.PRODUCTS.BY_ACCOUNT, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  // Get draft baskets
  getDrafts: async (token: string) => {
    const response = await axios.get(API_ENDPOINTS.PRODUCTS.DRAFTS, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  // Get customer's custom baskets with details
  getMyBaskets: async (token: string): Promise<CustomerBasketDto[]> => {
    const response = await axios.get(API_ENDPOINTS.PRODUCTS.MY_BASKETS, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  // Create normal product (Admin/Staff)
  createNormal: async (product: CreateSingleProductRequest, token: string) => {
    const response = await axios.post(API_ENDPOINTS.PRODUCTS.CREATE_NORMAL, product, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  // Create custom basket (Customer)
  createCustom: async (basket: CreateComboProductRequest, token: string) => {
    const response = await axios.post(API_ENDPOINTS.PRODUCTS.CREATE_CUSTOM, basket, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  // Create template basket (Admin/Staff)
  createTemplate: async (basket: CreateComboProductRequest, token: string) => {
    const response = await axios.post(API_ENDPOINTS.PRODUCTS.CREATE_TEMPLATE, basket, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  // Update normal product (Admin/Staff)
  updateNormal: async (id: number | string, product: Product, token: string) => {
    const response = await axios.put(API_ENDPOINTS.PRODUCTS.UPDATE_NORMAL(id), product, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  // Update custom basket
  updateCustom: async (id: number | string, basket: UpdateComboProductRequest, token: string) => {
    const response = await axios.put(API_ENDPOINTS.PRODUCTS.UPDATE_CUSTOM(id), basket, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  // Delete product (Admin/Staff)
  delete: async (id: number | string, token: string) => {
    const response = await axios.delete(API_ENDPOINTS.PRODUCTS.DELETE(id), {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  // Get validation status
  getValidationStatus: async (id: number | string): Promise<ValidationStatus> => {
    const response = await axios.get(API_ENDPOINTS.PRODUCTS.VALIDATION_STATUS(id));
    return response.data;
  },

  // Template operations
  templates: {
    // Get all templates
    getAll: async () => {
      const response = await axios.get(API_ENDPOINTS.PRODUCTS.TEMPLATES);
      return response.data;
    },

    // Clone template
    clone: async (templateId: number | string, request: CloneBasketRequest, token: string) => {
      const response = await axios.post(
        API_ENDPOINTS.PRODUCTS.CLONE_TEMPLATE(templateId),
        request,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    },

    // Set as template (Admin/Staff)
    setAsTemplate: async (id: number | string, token: string) => {
      const response = await axios.post(
        API_ENDPOINTS.PRODUCTS.SET_AS_TEMPLATE(id),
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    },

    // Remove template (Admin/Staff)
    removeTemplate: async (id: number | string, token: string) => {
      const response = await axios.delete(
        API_ENDPOINTS.PRODUCTS.REMOVE_TEMPLATE(id),
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    },
  },
};
