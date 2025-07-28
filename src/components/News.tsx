import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Eye, Calendar, PlayCircle } from 'lucide-react';

type Language = 'uz' | 'ru' | 'en';

const newsTranslations = {
  uz: {
    title: 'Yangiliklar',
    subtitle: 'Bizning eng so\'nggi yangiliklar va hodisalar',
    readMore: 'Batafsil o\'qish',
    video: 'Video',
    image: 'Rasm'
  },
  ru: {
    title: 'Новости',
    subtitle: 'Наши последние новости и события',
    readMore: 'Читать далее',
    video: 'Видео',
    image: 'Изображение'
  },
  en: {
    title: 'News',
    subtitle: 'Our latest news and events',
    readMore: 'Read More',
    video: 'Video',
    image: 'Image'
  }
};

// Demo data - to be replaced with API data
const demoNews = [
  {
    id: '1',
    title: { uz: 'Yangi menyu taqdim etildi', ru: 'Представлено новое меню', en: 'New menu introduced' },
    description: { uz: 'Agora Restobar o\'zining yangi menyu tarkibini taqdim etdi. Bu yerda ko\'plab yangi va mazali taomlar mavjud.', ru: 'Agora Restobar представил свое новое меню. Здесь много новых и вкусных блюд.', en: 'Agora Restobar introduced its new menu. There are many new and delicious dishes here.' },
    media: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    type: 'image',
    date: '2024-01-15',
    isActive: true
  },
  {
    id: '2',
    title: { uz: 'Jonli musiqa kechalari', ru: 'Вечера живой музыки', en: 'Live music nights' },
    description: { uz: 'Har shanba kuni bizda jonli musiqa kechalari o\'tkaziladi. Professional musiqachilar va ajoyib atmosfera.', ru: 'Каждую субботу у нас проходят вечера живой музыки. Профессиональные музыканты и отличная атмосфера.', en: 'Every Saturday we host live music nights. Professional musicians and great atmosphere.' },
    media: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    type: 'video',
    date: '2024-01-10',
    isActive: true
  },
  {
    id: '3',
    title: { uz: 'Yangi karaoke xonasi ochildi', ru: 'Открылся новый караоке-зал', en: 'New karaoke room opened' },
    description: { uz: 'Zamonaviy jihozlar bilan jihozlangan yangi karaoke xonasi ochildi. Do\'stlar bilan vaqt o\'tkazish uchun ajoyib joy.', ru: 'Открылся новый караоке-зал, оборудованный современной техникой. Отличное место для времяпрепровождения с друзьями.', en: 'A new karaoke room equipped with modern equipment has opened. Great place to spend time with friends.' },
    media: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    type: 'image',
    date: '2024-01-05',
    isActive: true
  }
];

interface NewsProps {
  language: Language;
}

export function News({ language }: NewsProps) {
  const [selectedNews, setSelectedNews] = useState<typeof demoNews[0] | null>(null);
  
  const t = newsTranslations[language];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'uz' ? 'uz-UZ' : language === 'ru' ? 'ru-RU' : 'en-US');
  };

  return (
    <section id="news" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {demoNews.map((news, index) => (
            <Card 
              key={news.id} 
              className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 overflow-hidden cursor-pointer"
              onClick={() => setSelectedNews(news)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={news.media}
                  alt={news.title[language]}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  {news.type === 'video' ? (
                    <PlayCircle className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  ) : (
                    <Eye className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  )}
                </div>
                <div className="absolute top-4 left-4">
                  <Badge variant={news.type === 'video' ? 'default' : 'secondary'} className="bg-black/50 text-white">
                    {news.type === 'video' ? t.video : t.image}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center text-sm text-muted-foreground mb-3">
                  <Calendar className="h-4 w-4 mr-2" />
                  {formatDate(news.date)}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {news.title[language]}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {news.description[language]}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-primary font-medium text-sm group-hover:underline">
                    {t.readMore}
                  </span>
                  <Eye className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {demoNews.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Hozircha yangiliklar yo'q
            </p>
          </div>
        )}
      </div>

      {/* News Detail Modal */}
      <Dialog open={!!selectedNews} onOpenChange={() => setSelectedNews(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedNews && (
            <>
              <DialogHeader>
                <div className="flex items-center space-x-2 mb-2">
                  <Badge variant={selectedNews.type === 'video' ? 'default' : 'secondary'}>
                    {selectedNews.type === 'video' ? t.video : t.image}
                  </Badge>
                  <span className="text-sm text-muted-foreground flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDate(selectedNews.date)}
                  </span>
                </div>
                <DialogTitle className="text-2xl font-bold text-primary text-left">
                  {selectedNews.title[language]}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
                  {selectedNews.type === 'video' ? (
                    <div className="w-full h-full bg-black/10 flex items-center justify-center relative">
                      <img
                        src={selectedNews.media}
                        alt={selectedNews.title[language]}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <PlayCircle className="h-16 w-16 text-white" />
                      </div>
                    </div>
                  ) : (
                    <img
                      src={selectedNews.media}
                      alt={selectedNews.title[language]}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div>
                  <p className="text-muted-foreground leading-relaxed text-base">
                    {selectedNews.description[language]}
                  </p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}