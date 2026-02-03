// URL cơ sở của Backend .NET 8
// src/api/apiConfig.ts
const SERVER_URL = "http://14.225.207.221:5000/api";
const BASE_URL = SERVER_URL || "https://localhost:7056/api";
// Điều này giúp bạn chỉ cần đổi file .env khi đẩy lên server thật.
export const API_ENDPOINTS = {
  AUTH: {
    // Khớp chính xác với Swagger trong ảnh bạn cung cấp
    LOGIN: `${BASE_URL}/auth/login`,
    REGISTER_REQUEST_OTP: `${BASE_URL}/auth/register/request-otp`,
    REGISTER_VERIFY_OTP: `${BASE_URL}/auth/register/verify-otp`,
  },
  // Các endpoint khác cho Happybox sau này
  PRODUCTS: {
    LIST: `${BASE_URL}/products`,
    DETAIL: (id: string | number) => `${BASE_URL}/products/${id}`,
  },
  USER: {
    PROFILE: `${BASE_URL}/account/profile`,
  },
};

export default BASE_URL;
