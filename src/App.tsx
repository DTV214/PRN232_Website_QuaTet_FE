// src/App.tsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./layouts/components/Navbar";
import Footer from "./layouts/components/Footer";
import BackToTop from "./components/common/BackToTop";
import "./App.css";

// Auth & Home
import LoginPage from "./feature/auth/pages/LoginPage";
import RegisterPage from "./feature/auth/pages/RegisterPage";
import HomePage from "./feature/homepage/pages/HomePage";

// News & Intro
import IntroducePage from "@/feature/introduce/pages/IntroducePage";
import BlogPage from "@/feature/blog/pages/BlogPage";
import BlogDetailPage from "@/feature/blog/pages/BlogDetailPage";
import ContactPage from "@/feature/contact/pages/ContactPage";

// Account Module
import AccountLayout from "@/feature/account/layouts/AccountLayout";
import AccountOverview from "@/feature/account/pages/AccountOverview";
import AccountProfile from "@/feature/account/pages/AccountProfile";
import OrderHistory from "@/feature/account/pages/OrderHistory";
import AccountAddresses from "@/feature/account/pages/AccountAddresses";
import AccountVouchers from "@/feature/account/pages/AccountVouchers";

// Product & Checkout Module
import ProductPage from "@/feature/product/pages/ProductPage";
import ProductDetailPage from "@/feature/product/pages/ProductDetailPage";
import CheckoutPage from "@/feature/checkout/pages/CheckoutPage";
import PaymentSuccess from "@/feature/checkout/pages/PaymentSuccess";
import PaymentFailure from "@/feature/checkout/pages/PaymentFailure";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-tet-bg font-sans">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/introduce" element={<IntroducePage />} />
            <Route path="/blogs" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogDetailPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* NESTED ROUTES CHO ACCOUNT */}
            <Route path="/account" element={<AccountLayout />}>
              <Route index element={<Navigate to="overview" />} />
              <Route path="overview" element={<AccountOverview />} />
              <Route path="profile" element={<AccountProfile />} />
              <Route path="orders" element={<OrderHistory />} />
              <Route path="addresses" element={<AccountAddresses />} />
              <Route path="vouchers" element={<AccountVouchers />} />
            </Route>

            {/* ROUTES SẢN PHẨM & THANH TOÁN */}
            <Route path="/products" element={<ProductPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />

            {/* ROUTES KẾT QUẢ */}
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/payment-failure" element={<PaymentFailure />} />
          </Routes>
        </main>
        <Footer />
        <BackToTop />
      </div>
    </Router>
  );
}

export default App;
