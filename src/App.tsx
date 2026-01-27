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
          </Routes>
        </main>
        <Footer />
        <BackToTop /> {/* Đặt ở đây để hiển thị toàn bộ web */}
      </div>
    </Router>
  );
}

export default App;
