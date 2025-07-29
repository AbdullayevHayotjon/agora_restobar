import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminMenu from "./pages/AdminMenu";
import AdminBanners from "./pages/AdminBanners";
import AdminBookings from "./pages/adminBookings";

const queryClient = new QueryClient();

const App = () => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const handleAdminLogin = () => {
    setIsAdminAuthenticated(true);
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route 
              path="/admin" 
              element={
                <AdminLogin 
                  isAuthenticated={isAdminAuthenticated}
                  onLogin={handleAdminLogin}
                />
              } 
            />
            {isAdminAuthenticated && (
              <>
                <Route path="/admin/menu" element={<AdminDashboard onLogout={handleAdminLogout} />}>
                  <Route index element={<AdminMenu />} />
                </Route>
                <Route path="/admin/banners" element={<AdminDashboard onLogout={handleAdminLogout} />}>
                  <Route index element={<AdminBanners />} />
                </Route>
                <Route path="/admin/bookings" element={<AdminDashboard onLogout={handleAdminLogout} />}>
                  <Route index element={<AdminBookings />} />
                </Route>
                <Route path="/admin/dashboard" element={<Navigate to="/admin/menu" replace />} />
              </>
            )}
            {!isAdminAuthenticated && (
              <Route path="/admin/*" element={<Navigate to="/admin" replace />} />
            )}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;