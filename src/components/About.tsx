import { Card, CardContent } from '@/components/ui/card';
import { Wine, Users, Gamepad2, Mic, Cigarette, ChefHat } from 'lucide-react';

type Language = 'uz' | 'ru' | 'en';

const aboutTranslations = {
  uz: {
    title: 'Biz haqimizda',
    subtitle: 'Agora Restobar - bu zamonaviy ko\'ngilochar maskan',
    description: 'Bizning restobar har qanday ta\'m va xohishlar uchun mo\'ljallangan. Oilaviy yig\'ilishlardan tortib do\'stlar bilan ko\'ngilochar kechgacha - bizda hamma uchun joy bor.',
    features: {
      bar: {
        title: 'Bar',
        description: 'Professional bartenderlar tomonidan tayyorlangan noyob kokteylar'
      },
      hall: {
        title: 'Katta zal',
        description: 'Katta tadbirlar va bayramlar uchun keng zal'
      },
      cabins: {
        title: 'Kabinalar',
        description: 'Shaxsiy va oilaviy uchrashuvlar uchun alohida kabinalar'
      },
      playstation: {
        title: 'PlayStation',
        description: 'Do\'stlar bilan o\'yin va ko\'ngilochar vaqt o\'tkazish'
      },
      karaoke: {
        title: 'Karaoke',
        description: 'Sevimli qo\'shiqlaringizni kuylang va dam oling'
      },
      hookah: {
        title: 'Kalyan',
        description: 'Yuqori sifatli kalyan va turli ta\'mlar'
      }
    }
  },
  ru: {
    title: 'О нас',
    subtitle: 'Agora Restobar - это современное развлекательное заведение',
    description: 'Наш ресторан предназначен для любых вкусов и желаний. От семейных встреч до развлекательных вечеров с друзьями - у нас есть место для всех.',
    features: {
      bar: {
        title: 'Бар',
        description: 'Уникальные коктейли от профессиональных барменов'
      },
      hall: {
        title: 'Большой зал',
        description: 'Просторный зал для больших мероприятий и праздников'
      },
      cabins: {
        title: 'Кабинки',
        description: 'Отдельные кабинки для личных и семейных встреч'
      },
      playstation: {
        title: 'PlayStation',
        description: 'Игры и развлечения с друзьями'
      },
      karaoke: {
        title: 'Караоке',
        description: 'Пойте любимые песни и отдыхайте'
      },
      hookah: {
        title: 'Кальян',
        description: 'Высококачественный кальян и различные вкусы'
      }
    }
  },
  en: {
    title: 'About Us',
    subtitle: 'Agora Restobar - a modern entertainment venue',
    description: 'Our restaurant is designed for any taste and desire. From family gatherings to entertaining evenings with friends - we have a place for everyone.',
    features: {
      bar: {
        title: 'Bar',
        description: 'Unique cocktails by professional bartenders'
      },
      hall: {
        title: 'Large Hall',
        description: 'Spacious hall for large events and celebrations'
      },
      cabins: {
        title: 'Cabins',
        description: 'Private cabins for personal and family meetings'
      },
      playstation: {
        title: 'PlayStation',
        description: 'Games and entertainment with friends'
      },
      karaoke: {
        title: 'Karaoke',
        description: 'Sing your favorite songs and relax'
      },
      hookah: {
        title: 'Hookah',
        description: 'High-quality hookah and various flavors'
      }
    }
  }
};

interface AboutProps {
  language: Language;
}

export function About({ language }: AboutProps) {
  const t = aboutTranslations[language];

  const features = [
    {
      icon: Wine,
      title: t.features.bar.title,
      description: t.features.bar.description,
      color: 'text-amber-500'
    },
    {
      icon: Users,
      title: t.features.hall.title,
      description: t.features.hall.description,
      color: 'text-blue-500'
    },
    {
      icon: ChefHat,
      title: t.features.cabins.title,
      description: t.features.cabins.description,
      color: 'text-purple-500'
    },
    {
      icon: Gamepad2,
      title: t.features.playstation.title,
      description: t.features.playstation.description,
      color: 'text-green-500'
    },
    {
      icon: Mic,
      title: t.features.karaoke.title,
      description: t.features.karaoke.description,
      color: 'text-pink-500'
    },
    {
      icon: Cigarette,
      title: t.features.hookah.title,
      description: t.features.hookah.description,
      color: 'text-orange-500'
    }
  ];

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t.title}
          </h2>
          <p className="text-xl text-primary font-medium mb-4">
            {t.subtitle}
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 border-0 bg-card/50 backdrop-blur-sm"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-8 text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary/10 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`h-8 w-8 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Restaurant atmosphere image */}
        <div className="mt-16">
          <div className="relative h-96 rounded-2xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80"
              alt="Restaurant Interior"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="text-2xl font-bold mb-2">Zamonaviy atmosfera</h3>
              <p className="text-white/90">Bizning restoranda o'zingizni uyingizda his eting</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}