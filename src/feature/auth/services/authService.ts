import axiosClient from "@/api/axiosClient";
import { API_ENDPOINTS } from "@/api/apiConfig";

// Định nghĩa Interface để đảm bảo Type Safety cho dự án Happybox
export interface LoginPayload {
  username: string;
  password: string;
}

export interface RegisterRequestPayload {
  username: string;
  password: string;
  email: string;
  fullname: string;
  phone: string;
}

export interface VerifyOtpPayload {
  username: string;
  otp: string;
}

const authService = {
  // 1. Đăng nhập
  login: async (payload: LoginPayload) => {
    return axiosClient.post(API_ENDPOINTS.AUTH.LOGIN, payload);
  },

  // 2. Bước 1 Đăng ký: Gửi đầy đủ thông tin để tạo tài khoản chờ & nhận OTP
  // Theo ảnh Swagger: Cần gửi cả password, email, fullname, phone
  requestOtp: async (payload: RegisterRequestPayload) => {
    return axiosClient.post(API_ENDPOINTS.AUTH.REGISTER_REQUEST_OTP, payload);
  },

  // 3. Bước 2 Đăng ký: Xác nhận mã OTP để kích hoạt tài khoản
  verifyOtp: async (payload: VerifyOtpPayload) => {
    return axiosClient.post(API_ENDPOINTS.AUTH.REGISTER_VERIFY_OTP, payload);
  },
};

export default authService;
