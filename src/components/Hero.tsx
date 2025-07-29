import { Button } from '@/components/ui/button';
import { ChefHat, Calendar } from 'lucide-react';

type Language = 'uz' | 'ru' | 'en';

const heroTranslations = {
  uz: {
    subtitle: 'Ta\'m va sifatning uyg\'unligi',
    description: 'Zamonaviy muhit va noyob ta\'mlar dunyosiga xush kelibsiz. Bizda har bir taom - san\'at asari.',
    viewMenu: 'Menyuni ko\'rish',
    bookTable: 'Stol bron qilish'
  },
  ru: {
    subtitle: 'Гармония вкуса и качества',
    description: 'Добро пожаловать в мир современной атмосферы и уникальных вкусов. Каждое наше блюдо - произведение искусства.',
    viewMenu: 'Посмотреть меню',
    bookTable: 'Забронировать стол'
  },
  en: {
    subtitle: 'Harmony of taste and quality',
    description: 'Welcome to the world of modern atmosphere and unique flavors. Every dish is a work of art.',
    viewMenu: 'View Menu',
    bookTable: 'Book a Table'
  }
};

interface HeroProps {
  language: Language;
}

export function Hero({ language }: HeroProps) {
  const t = heroTranslations[language];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Soft dark overlay for text clarity */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>

      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed opacity-100 z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')"
        }}
      ></div>

      {/* Floating blurred elements (optional) */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-success/10 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-primary/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-30 text-center px-4 max-w-4xl mx-auto pt-24 md:pt-32">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight drop-shadow-[0_4px_10px_rgba(0,0,0,0.7)]">
            AGORA resto<span className="text-primary">&</span>bar
          </h1>
          <p className="text-xl md:text-2xl text-white mb-4 font-light drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
            {t.subtitle}
          </p>
          <p className="text-lg text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
            {t.description}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              variant="restaurant"
              size="lg"
              onClick={() => scrollToSection('menu')}
              className="text-lg px-8 py-4 h-auto group"
            >
              <ChefHat className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              {t.viewMenu}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToSection('booking')}
              className="text-lg px-8 py-4 h-auto bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary group backdrop-blur-sm"
            >
              <Calendar className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              {t.bookTable}
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
