import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import useAuthStore from "./store/authStore";

// Pages
import LandingPage from "./pages/LandingPage";
import ClassicsPage from "./pages/ClassicsPage";
import EverydayPage from "./pages/EverydayPage";
import CategoryListingPage from "./pages/CategoryListingPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AccountPage from "./pages/account/AccountPage";
import ProfilesPage from "./pages/account/ProfilesPage";
import MeasurementsPage from "./pages/account/MeasurementsPage";
import OrderHistoryPage from "./pages/account/OrderHistoryPage";
import FavoritesPage from "./pages/account/FavoritesPage";

// Layout
import Navbar from "./components/layout/Navbar";

// ─── Protected Route ──────────────────────────────────────────────────────
// Wraps pages that require login
// If not logged in → redirect to /login
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, isLoading } = useAuthStore();

  if (isLoading) return <div className="flex items-center justify-center h-screen">
    <p className="text-white">Loading...</p>
  </div>;

  return isLoggedIn ? children : <Navigate to="/login" />;
};

// ─── App ──────────────────────────────────────────────────────────────────
const App = () => {
  const { checkAuth } = useAuthStore();

  // On every page load/refresh — check if user is still logged in
  useEffect(() => {
    checkAuth();
  }, []);
const NavbarLayout = () => {
  return (
    <>
      <Navbar /> {/* Navbar only lives inside this wrapper! */}
      <Outlet/> {/* This is where the pages will load */}
    </>
  );
};


  return (
    <BrowserRouter>
   
      <Routes>

        {/* ── Public Routes ── */}

        <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<NavbarLayout />}>
        <Route path="/classics" element={<ClassicsPage />} />
        <Route path="/everyday" element={<EverydayPage />} />
      

        {/* ── Category + Product Routes ── */}
        <Route path="/classics/:categorySlug" element={<CategoryListingPage section="classics" />} />
        <Route path="/everyday/:categorySlug" element={<CategoryListingPage section="everyday" />} />
        <Route path="/products/:slug" element={<ProductPage />} />

        {/* ── Protected Routes (must be logged in) ── */}
        <Route path="/cart" element={
          <ProtectedRoute><CartPage /></ProtectedRoute>
        } />

        <Route path="/account" element={
          <ProtectedRoute><AccountPage /></ProtectedRoute>
        } />

        <Route path="/account/profiles" element={
          <ProtectedRoute><ProfilesPage /></ProtectedRoute>
        } />

        <Route path="/account/profiles/:id/measurements" element={
          <ProtectedRoute><MeasurementsPage /></ProtectedRoute>
        } />

        <Route path="/account/orders" element={
          <ProtectedRoute><OrderHistoryPage /></ProtectedRoute>
        } />
        
       <Route path="/account/favorites" element={
  <ProtectedRoute><FavoritesPage /></ProtectedRoute>
} />

        {/* ── 404 — redirect to home ── */}
        <Route path="*" element={<Navigate to="/" />} />
</Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;