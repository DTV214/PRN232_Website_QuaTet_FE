import axios from 'axios';
import { API_ENDPOINTS } from './apiConfig';

export interface Category {
  categoryid?: number;
  categoryname: string;
}

export const categoryService = {
  // Get all categories
  getAll: async () => {
    const response = await axios.get(API_ENDPOINTS.CATEGORIES.LIST);
    return response.data;
  },

  // Create category (Admin/Staff)
  create: async (category: Category, token: string) => {
    const response = await axios.post(API_ENDPOINTS.CATEGORIES.CREATE, category, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  // Update category (Admin/Staff)
  update: async (id: number | string, category: Category, token: string) => {
    const response = await axios.put(API_ENDPOINTS.CATEGORIES.UPDATE, {
      categoryid: id,
      categoryname: category.categoryname
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  // Delete category (Admin/Staff)
  delete: async (id: number | string, token: string) => {
    const response = await axios.delete(API_ENDPOINTS.CATEGORIES.DELETE(id), {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },
};
