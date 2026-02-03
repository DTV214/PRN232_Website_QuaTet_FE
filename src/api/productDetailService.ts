import axios from 'axios';
import { API_ENDPOINTS } from './apiConfig';

export interface ProductDetailRequest {
  productdetailid?: number;
  productparentid?: number;
  productid?: number;
  quantity?: number;
}

export interface ProductDetailResponse {
  productdetailid: number;
  productparentid: number;
  productid: number;
  quantity: number;
  productname?: string;
  unit?: number;
  price?: number;
}

export const productDetailService = {
  // Get product details by parent ID (basket ID)
  getByParent: async (parentId: number | string) => {
    const response = await axios.get(API_ENDPOINTS.PRODUCT_DETAILS.BY_PARENT(parentId));
    return response.data;
  },

  // Add product to basket
  create: async (detail: ProductDetailRequest, token: string) => {
    const response = await axios.post(API_ENDPOINTS.PRODUCT_DETAILS.CREATE, detail, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  // Update product quantity in basket
  update: async (detail: ProductDetailRequest, token: string) => {
    const response = await axios.put(API_ENDPOINTS.PRODUCT_DETAILS.UPDATE, detail, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  // Remove product from basket
  delete: async (id: number | string, token: string) => {
    const response = await axios.delete(API_ENDPOINTS.PRODUCT_DETAILS.DELETE(id), {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },
};
