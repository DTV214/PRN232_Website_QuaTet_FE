import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function PaymentSuccess() {
  return (
    <div className="min-h-screen bg-[#FBF5E8]/30 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white w-full max-w-lg p-10 md:p-16 rounded-[3rem] shadow-2xl border border-gray-100 text-center space-y-8"
      >
        {/* Icon thành công */}
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center text-green-600 shadow-inner">
            <CheckCircle2 size={56} strokeWidth={1.5} />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-tet-primary">
            Thanh toán <br /> thành công
          </h1>
          <p className="text-gray-500 italic text-lg font-medium">
            Cảm ơn bạn đã mua hàng
          </p>
        </div>

        {/* Nút điều hướng */}
        <div className="flex flex-col gap-4 pt-6">
          <Button
            asChild
            className="bg-[#4CAF50] hover:bg-[#43A047] text-white py-8 rounded-2xl text-lg font-bold shadow-lg transition-transform hover:scale-[1.02]"
          >
            <Link to="/products" className="flex items-center gap-2">
              Tiếp tục mua sắm
            </Link>
          </Button>

          <Link
            to="/home"
            className="text-tet-primary font-bold hover:underline transition-all"
          >
            Quay về trang chủ
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
