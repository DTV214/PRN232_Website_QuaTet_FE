// src/feature/auth/components/LoginForm.tsx
import { Eye } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export function LoginForm() {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Giả lập logic đăng nhập thành công
    console.log("Đăng nhập thành công!");
    navigate("/home"); // Điều hướng qua trang homepage
  };

  return (
    <form className="space-y-5" onSubmit={handleLogin}>
      <div>
        <label className="block text-sm font-bold text-tet-primary mb-1.5">
          Email / SĐT
        </label>
        <input
          type="text"
          required
          placeholder="Địa chỉ email hoặc SĐT"
          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-tet-primary outline-none text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-tet-primary mb-1.5">
          Mật khẩu
        </label>
        <div className="relative">
          <input
            type="password"
            required
            placeholder="Mật khẩu"
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-tet-primary outline-none text-sm"
          />
          <Eye className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4 cursor-pointer" />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-tet-primary text-white py-3.5 rounded-lg font-bold text-base hover:opacity-90 transition-all shadow-md"
      >
        Đăng Nhập
      </button>

      {/* ... Phần Google Login giữ nguyên ... */}
      <div className="relative my-8 text-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <span className="relative bg-white px-3 text-xs text-gray-400 uppercase tracking-wider">
          Hoặc đăng nhập bằng
        </span>
      </div>

      <button
        type="button"
        className="w-full border border-gray-200 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-all text-sm font-medium"
      >
        <img
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          alt="Google"
          className="w-5 h-5"
        />{" "}
        Google
      </button>

      <p className="text-center text-sm text-gray-600 mt-6 font-medium">
        Chưa có tài khoản?{" "}
        <Link
          to="/register"
          className="text-tet-primary font-bold underline underline-offset-4"
        >
          Đăng ký ngay
        </Link>
      </p>
    </form>
  );
}
