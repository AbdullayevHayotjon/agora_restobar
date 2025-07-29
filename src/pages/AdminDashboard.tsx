import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChefHat, Megaphone, Calendar, LogOut, Menu as MenuIcon, X } from 'lucide-react';

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const sidebarItems = [
    {
      id: 'menu',
      label: 'Menyular',
      icon: ChefHat,
      path: '/admin/menu'
    },
    {
      id: 'bookings',
      label: 'Bronlar',
      icon: Calendar,
      path: '/admin/bookings'
    },
    {
      id: 'banners',
      label: 'Reklamalar',
      icon: Megaphone,
      path: '/admin/banners'
    }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsSidebarOpen(false);
  };

  const handleLogout = () => {
    onLogout();
    navigate('/admin');
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-48 bg-card border-r border-border transform transition-transform duration-300 ease-in-out
          flex flex-col
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:relative lg:translate-x-0 lg:h-screen
        `}
      >
        <div className="pl-8 pr-4 py-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {/* Logotip rasmi */}
              <img
                src="/logo_black.png" // ← bu yerga logotip faylingizning yo‘lini yozing
                alt="Logotip"
                className="w-[120px] sm:w-[120px] lg:w-[120px] object-contain" // ← kerak bo‘lsa o‘lchamni moslang
              />
            </div>
            
          </div>
        </div>

        <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
          {sidebarItems.map((item) => (
            <Button
              key={item.id}
              variant={isActivePath(item.path) ? "default" : "ghost"}
              className={`w-full justify-start text-left h-12 ${isActivePath(item.path)
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'hover:bg-accent'
                }`}
              onClick={() => handleNavigation(item.path)}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.label}
            </Button>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <Button
            variant="outline"
            className="w-full justify-start text-left h-12 text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 mr-3" />
            Chiqish
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 lg:ml-0">
        {/* Hamburger menu faqat mobil uchun */}
        <div className="px-4 py-3 lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(true)}
          >
            <MenuIcon className="h-5 w-5" />
          </Button>
        </div>

        {/* Main content area */}
        <main className="p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}