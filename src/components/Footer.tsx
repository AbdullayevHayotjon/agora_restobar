import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Send } from 'lucide-react';

type Language = 'uz' | 'ru' | 'en';

const footerTranslations = {
  uz: {
    description: 'AGORA resto&bar - zamonaviy va shinam muhitda sifatli xizmat ko\'rsatuvchi restoran.',
    quickLinks: 'Tezkor havolalar',
    contact: 'Aloqa ma\'lumotlari',
    followUs: 'Bizni kuzatib boring',
    rights: 'Barcha huquqlar himoyalangan',
    links: {
      home: 'Bosh sahifa',
      about: 'Biz haqimizda',
      menu: 'Menyu',
      news: 'Yangiliklar',
      contact: 'Aloqa',
      booking: 'Bron qilish'
    }
  },
  ru: {
    description: 'AGORA resto&bar - ресторан, предоставляющий качественный сервис в современной и уютной атмосфере.',
    quickLinks: 'Быстрые ссылки',
    contact: 'Контактная информация',
    followUs: 'Следите за нами',
    rights: 'Все права защищены',
    links: {
      home: 'Главная',
      about: 'О нас',
      menu: 'Меню',
      news: 'Новости',
      contact: 'Контакты',
      booking: 'Бронирование'
    }
  },
  en: {
    description: 'AGORA resto&bar - a restaurant providing quality service in a modern and cozy atmosphere.',
    quickLinks: 'Quick Links',
    contact: 'Contact Information',
    followUs: 'Follow Us',
    rights: 'All rights reserved',
    links: {
      home: 'Home',
      about: 'About',
      menu: 'Menu',
      news: 'News',
      contact: 'Contact',
      booking: 'Booking'
    }
  }
};

interface FooterProps {
  activeSection: string;
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

export function Footer({ language, theme }: FooterProps) {
  const t = footerTranslations[language];
  const currentYear = new Date().getFullYear();


  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quickLinks = [
    { id: 'home', label: t.links.home },
    { id: 'about', label: t.links.about },
    { id: 'menu', label: t.links.menu },
    { id: 'news', label: t.links.news },
    { id: 'contact', label: t.links.contact },
    { id: 'booking', label: t.links.booking }
  ];

  const contactInfo = [
    {
      icon: MapPin,
      text: language === 'uz' ? 'Toshkent shahar, Yunusobod tumani, Xalqobod ko‘chasi, 6-uy' :
        language === 'ru' ? 'город Ташкент, Юнусабадский район, улица Халкабад, дом 6' :
          'Tashkent city, Yunusabad district, Khalkabad street, house 6'
    },
    {
      icon: Phone,
      text: '+998 97 422 88 88'
    },
    {
      icon: Mail,
      text: 'agorarestobaruz@gmail.com'
    },
    {
      icon: Clock,
      text: language === 'uz' ? 'Har kuni 10:00 - 03:00' :
        language === 'ru' ? 'Ежедневно 10:00 - 03:00' :
          'Daily 10:00 - 03:00'
    }
  ];

  const socialLinks = [
    {
      icon: Instagram,
      name: 'Instagram',
      url: 'https://www.instagram.com/agora.restobar',
      color: 'hover:text-pink-500'
    },
    {
      icon: Facebook,
      name: 'Facebook',
      url: '#',
      color: 'hover:text-blue-600'
    },
    {
      icon: Send,
      name: 'Telegram',
      url: '#',
      color: 'hover:text-blue-400'
    }
  ];

  return (
    <footer className="bg-gradient-to-br from-primary/5 to-success/5 border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Description */}
          <div className="lg:col-span-1">
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-6">
                <div className="flex items-start space-x-2 mb-6">
                  <img
                    src={theme === 'light' ? '/logo_black.png' : '/logo_white.png'}
                    alt="Agora Restobar logotipi"
                    className="w-[120px] h-auto object-contain"
                  />
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {t.description}
              </p>
            </div>
            {/* Social Links */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">{t.followUs}</h3>
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className={`inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary transition-all duration-300 hover:scale-110 ${social.color}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-6">{t.quickLinks}</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-foreground mb-6">{t.contact}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mt-1">
                    <info.icon className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-muted-foreground text-sm leading-relaxed">
                    {info.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-sm">
              © {currentYear} AGORA resto&bar. {t.rights}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}