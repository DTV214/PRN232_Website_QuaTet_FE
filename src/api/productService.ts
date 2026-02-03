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

  // Create product
  create: async (product: Product, token: string) => {
    const response = await axios.post(API_ENDPOINTS.PRODUCTS.CREATE, product, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  // Update product
  update: async (id: number | string, product: Product, token: string) => {
    const response = await axios.put(API_ENDPOINTS.PRODUCTS.UPDATE(id), product, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  // Delete product
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
