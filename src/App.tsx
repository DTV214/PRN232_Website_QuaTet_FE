// src/App.tsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./layouts/components/Navbar";
import Footer from "./layouts/components/Footer";
import LoginPage from "./feature/auth/pages/LoginPage";
import RegisterPage from "./feature/auth/pages/RegisterPage";
import HomePage from "./feature/homepage/pages/HomePage";
import BackToTop from "./components/common/BackToTop"; // Import nút BackToTop
import "./App.css";
import IntroducePage from "@/feature/introduce/pages/IntroducePage";
import BlogDetailPage from "@/feature/blog/pages/BlogDetailPage";
import BlogPage from "@/feature/blog/pages/BlogPage";
import ContactPage from "@/feature/contact/pages/ContactPage";
import AccountVouchers from "@/feature/account/pages/AccountVouchers";
import AccountAddresses from "@/feature/account/pages/AccountAddresses";
import OrderHistory from "@/feature/account/pages/OrderHistory";
import AccountProfile from "@/feature/account/pages/AccountProfile";
import AccountOverview from "@/feature/account/pages/AccountOverview";
import AccountLayout from "@/feature/account/layouts/AccountLayout";

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

            <Route path="/account" element={<AccountLayout />}>
              <Route index element={<Navigate to="overview" />} />
              <Route path="overview" element={<AccountOverview />} />
              <Route path="profile" element={<AccountProfile />} />
              <Route path="orders" element={<OrderHistory />} />
              <Route path="addresses" element={<AccountAddresses />} />
              <Route path="vouchers" element={<AccountVouchers />} />
            </Route>
          </Routes>
        </main>
        <Footer />
        <BackToTop /> {/* Đặt ở đây để hiển thị toàn bộ web */}
      </div>
    </Router>
  );
}

export default App;
