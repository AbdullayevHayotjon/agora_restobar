import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Menu } from '@/components/Menu';
import { News } from '@/components/News';
import { Contact } from '@/components/Contact';
import { Booking } from '@/components/Booking';
import { Footer } from '@/components/Footer';

type Language = 'uz' | 'ru' | 'en';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [language, setLanguage] = useState<Language>('uz');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Theme effect
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Scroll spy effect
  useEffect(() => {
    const sections = ['home', 'about', 'menu', 'news', 'contact', 'booking'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -80% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar 
        activeSection={activeSection}
        language={language}
        setLanguage={setLanguage}
        theme={theme}
        setTheme={setTheme}
      />
      
      <Hero language={language} />
      <About language={language} />
      <Menu language={language} />
      <News language={language} />
      <Contact language={language} />
      <Booking language={language} />
      <Footer language={language} />
    </div>
  );
};

export default Index;
