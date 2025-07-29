import { useState, useEffect } from 'react';
import { Moon, Sun, Globe, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type Language = 'uz' | 'ru' | 'en';

const translations = {
  uz: {
    home: 'Bosh sahifa',
    about: 'Biz haqimizda',
    menu: 'Menyu',
    news: 'Yangiliklar',
    contact: 'Aloqa',
    booking: 'Stol bron qilish'
  },
  ru: {
    home: 'Главная',
    about: 'О нас',
    menu: 'Меню',
    news: 'Новости',
    contact: 'Контакты',
    booking: 'Бронирование'
  },
  en: {
    home: 'Home',
    about: 'About',
    menu: 'Menu',
    news: 'News',
    contact: 'Contact',
    booking: 'Book a Table'
  }
};

interface NavbarProps {
  activeSection: string;
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

export function Navbar({ activeSection, language, setLanguage, theme, setTheme }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'home', label: translations[language].home },
    { id: 'about', label: translations[language].about },
    { id: 'menu', label: translations[language].menu },
    { id: 'news', label: translations[language].news },
    { id: 'contact', label: translations[language].contact },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-300 ${theme === 'light'
        ? 'bg-white/70'
        : 'bg-[#0f0f0f]/70'
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img
              src={theme === 'light' ? '/logo_black.png' : '/logo_white.png'}
              alt="Agora Restobar logotipi"
              className="w-[120px] sm:w-[120px] lg:w-[150px] object-contain"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 ${activeSection === item.id
                  ? 'text-primary'
                  : 'text-foreground hover:text-primary'
                  } after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-primary after:left-0 after:bottom-0 after:scale-x-0 after:origin-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-left ${activeSection === item.id ? 'after:scale-x-100' : ''
                  }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* RIGHT SIDE CONTROLS */}
          <div className="flex items-center space-x-2">
            {/* Desktop: Language + Theme + Booking */}
            <div className="hidden lg:flex items-center space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Globe className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {['uz', 'ru', 'en'].map((lang) => (
                    <DropdownMenuItem key={lang} onClick={() => setLanguage(lang as Language)}>
                      <span className={language === lang ? 'font-bold text-primary' : ''}>
                        {lang === 'uz' ? "O'zbek" : lang === 'ru' ? 'Русский' : 'English'}
                      </span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              >
                {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </Button>

              <Button
                variant="restaurant"
                size="sm"
                onClick={() => scrollToSection('booking')}
              >
                {translations[language].booking}
              </Button>
            </div>

            {/* Mobile: Language + Theme + Hamburger */}
            <div className="flex lg:hidden items-center space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Globe className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {['uz', 'ru', 'en'].map((lang) => (
                    <DropdownMenuItem key={lang} onClick={() => setLanguage(lang as Language)}>
                      <span className={language === lang ? 'font-bold text-primary' : ''}>
                        {lang === 'uz' ? "O'zbek" : lang === 'ru' ? 'Русский' : 'English'}
                      </span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              >
                {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-background/95 backdrop-blur-md border-t border-border animate-fade-in">
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${activeSection === item.id
                    ? 'text-primary bg-primary/10'
                    : 'text-foreground hover:text-primary hover:bg-accent'
                    }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="border-t border-border pt-3 space-y-2">
                <Button
                  variant="restaurant"
                  size="sm"
                  onClick={() => scrollToSection('booking')}
                  className="w-full"
                >
                  {translations[language].booking}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
