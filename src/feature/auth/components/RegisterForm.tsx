import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

export function RegisterForm() {
  return (
    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
      {/* Họ và tên */}
      <div>
        <label className="block text-sm font-bold text-tet-primary mb-1">
          Họ và tên
        </label>
        <input
          type="text"
          placeholder="Họ và tên của bạn"
          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-tet-primary outline-none text-sm"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-bold text-tet-primary mb-1">
          Email
        </label>
        <input
          type="email"
          placeholder="Địa chỉ email"
          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-tet-primary outline-none text-sm"
        />
      </div>

      {/* Số điện thoại */}
      <div>
        <label className="block text-sm font-bold text-tet-primary mb-1">
          Số điện thoại
        </label>
        <input
          type="text"
          placeholder="Số điện thoại liên lạc"
          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-tet-primary outline-none text-sm"
        />
      </div>

      {/* Mật khẩu */}
      <div>
        <label className="block text-sm font-bold text-tet-primary mb-1">
          Mật khẩu
        </label>
        <div className="relative">
          <input
            type="password"
            placeholder="Mật khẩu"
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-tet-primary outline-none text-sm"
          />
          <Eye className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4 cursor-pointer" />
        </div>
      </div>

      {/* Xác nhận mật khẩu */}
      <div>
        <label className="block text-sm font-bold text-tet-primary mb-1">
          Xác nhận mật khẩu
        </label>
        <div className="relative">
          <input
            type="password"
            placeholder="Nhập lại mật khẩu"
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-tet-primary outline-none text-sm"
          />
          <Eye className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4 cursor-pointer" />
        </div>
      </div>

      {/* Điều khoản */}
      <div className="flex items-start gap-2 py-2">
        <input
          type="checkbox"
          className="mt-1 accent-tet-primary h-4 w-4"
          id="terms"
        />
        <label htmlFor="terms" className="text-xs text-gray-600 leading-tight">
          Tôi đồng ý với{" "}
          <span className="text-tet-primary font-bold underline cursor-pointer">
            Điều khoản dịch vụ
          </span>{" "}
          và{" "}
          <span className="text-red-800 underline cursor-pointer">
            Chính sách bảo mật
          </span>
        </label>
      </div>

      {/* Nút Đăng ký */}
      <button className="w-full bg-tet-primary text-white py-3.5 rounded-lg font-bold hover:brightness-110 transition-all shadow-md">
        Đăng Ký Ngay
      </button>

      <div className="relative my-6 text-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <span className="relative bg-white px-3 text-xs text-gray-400 uppercase tracking-wider">
          Hoặc đăng ký bằng
        </span>
      </div>

      {/* Google Login */}
      <button
        type="button"
        className="w-full border border-gray-200 p-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-all text-sm font-medium"
      >
        <img
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          alt="Google"
          className="w-5 h-5"
        />
        Google
      </button>

      <p className="text-center text-sm mt-6 text-gray-600 font-medium">
        Đã có tài khoản?{" "}
        <Link
          to="/login"
          className="text-tet-primary font-bold underline underline-offset-4"
        >
          Đăng nhập ngay
        </Link>
      </p>
    </form>
  );
}
