import axios from 'axios';
import { API_ENDPOINTS } from './apiConfig';

export interface ProductConfig {
  configid?: number;
  configname: string;
  suitablesuggestion?: string;
  totalunit?: number;
  imageurl?: string;
}

export interface ConfigDetail {
  configdetailid?: number;
  configid: number;
  categoryid: number;
  quantity: number;
}

export const configService = {
  // Get all configs
  getAll: async () => {
    const response = await axios.get(API_ENDPOINTS.CONFIGS.LIST);
    return response.data;
  },

  // Get config by ID
  getById: async (id: number | string) => {
    const response = await axios.get(API_ENDPOINTS.CONFIGS.DETAIL(id));
    return response.data;
  },

  // Create config (Admin/Staff)
  create: async (config: ProductConfig, token: string) => {
    const response = await axios.post(API_ENDPOINTS.CONFIGS.CREATE, config, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  // Update config (Admin/Staff)
  update: async (id: number | string, config: ProductConfig, token: string) => {
    const response = await axios.put(API_ENDPOINTS.CONFIGS.UPDATE(id), config, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  // Delete config (Admin/Staff)
  delete: async (id: number | string, token: string) => {
    const response = await axios.delete(API_ENDPOINTS.CONFIGS.DELETE(id), {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },
};

export const configDetailService = {
  // Get config details by config ID
  getByConfig: async (configId: number | string) => {
    const response = await axios.get(API_ENDPOINTS.CONFIG_DETAILS.BY_CONFIG(configId));
    return response.data;
  },

  // Create config detail (Admin/Staff)
  create: async (detail: ConfigDetail, token: string) => {
    const response = await axios.post(API_ENDPOINTS.CONFIG_DETAILS.CREATE, detail, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  // Update config detail (Admin/Staff)
  update: async (detail: ConfigDetail, token: string) => {
    const response = await axios.put(API_ENDPOINTS.CONFIG_DETAILS.UPDATE, detail, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  // Delete config detail (Admin/Staff)
  delete: async (id: number | string, token: string) => {
    const response = await axios.delete(API_ENDPOINTS.CONFIG_DETAILS.DELETE(id), {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },
};
