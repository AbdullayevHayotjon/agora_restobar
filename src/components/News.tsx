import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Eye, Calendar, PlayCircle } from 'lucide-react';
import { API_BASE_URL } from '@/lib/constants';

type Language = 'uz' | 'ru' | 'en';

const newsTranslations = {
  uz: {
    title: 'Yangiliklar',
    subtitle: 'Bizning eng so\'nggi yangiliklar va hodisalar',
    readMore: 'Batafsil o\'qish',
    video: 'Video',
    image: 'Rasm',
    loading: 'Yuklanmoqda...'
  },
  ru: {
    title: 'Новости',
    subtitle: 'Наши последние новости и события',
    readMore: 'Читать далее',
    video: 'Видео',
    image: 'Изображение',
    loading: 'Загрузка...'
  },
  en: {
    title: 'News',
    subtitle: 'Our latest news and events',
    readMore: 'Read More',
    video: 'Video',
    image: 'Image',
    loading: 'Loading...'
  }
};

interface NewsItem {
  id: string;
  title: string;
  description: string;
  updateDate: string;
  mediaUrl: string;
  mediaType: string; // 'rasm' | 'video'
}

interface NewsProps {
  language: Language;
}

export function News({ language }: NewsProps) {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const t = newsTranslations[language];

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/banner/active`);
        const data = await response.json();

        if (data.isSuccess && data.value && data.value.$values) {
          setNewsList(data.value.$values);
        }
      } catch (error) {
        console.error('Xatolik yuz berdi:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleString(language === 'uz' ? 'uz-UZ' : language === 'ru' ? 'ru-RU' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getMediaType = (type: string) => {
    return type.toLowerCase() === 'video' ? 'video' : 'image';
  };

  const resolveUrl = (url: string) => {
    return url.startsWith('http') ? url : `${API_BASE_URL}${url}`;
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

        {loading ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">{t.loading}</p>
          </div>
        ) : newsList.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Hozircha yangiliklar yo'q
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsList.map((news, index) => (
              <Card
                key={news.id}
                className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 overflow-hidden cursor-pointer"
                onClick={() => setSelectedNews(news)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-48 overflow-hidden">
                  {getMediaType(news.mediaType) === 'video' ? (
                    <video
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 pointer-events-none"
                      muted
                      playsInline
                      preload="metadata"
                      src={resolveUrl(news.mediaUrl)}
                    />
                  ) : (
                    <img
                      src={resolveUrl(news.mediaUrl)}
                      alt={news.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    {getMediaType(news.mediaType) === 'video' ? (
                      <PlayCircle className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    ) : (
                      <Eye className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    )}
                  </div>
                  <div className="absolute top-4 left-4">
                    <Badge variant={getMediaType(news.mediaType) === 'video' ? 'default' : 'secondary'} className="bg-black/50 text-white">
                      {getMediaType(news.mediaType) === 'video' ? t.video : t.image}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center text-sm text-muted-foreground mb-3">
                    <Calendar className="h-4 w-4 mr-2" />
                    {formatDate(news.updateDate)}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {news.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {news.description}
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
        )}
      </div>

      {/* Modal */}
      <Dialog open={!!selectedNews} onOpenChange={() => setSelectedNews(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedNews && (
            <>
              <DialogHeader>
                <div className="flex items-center space-x-2 mb-2">
                  <Badge variant={getMediaType(selectedNews.mediaType) === 'video' ? 'default' : 'secondary'}>
                    {getMediaType(selectedNews.mediaType) === 'video' ? t.video : t.image}
                  </Badge>
                  <span className="text-sm text-muted-foreground flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDate(selectedNews.updateDate)}
                  </span>
                </div>
                <DialogTitle className="text-2xl font-bold text-primary text-left">
                  {selectedNews.title}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
                  {getMediaType(selectedNews.mediaType) === 'video' ? (
                    <video
                      controls
                      controlsList="nodownload nofullscreen noremoteplayback"
                      autoPlay
                      className="w-full h-full object-cover"
                      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                      src={resolveUrl(selectedNews.mediaUrl)}
                    >
                    </video>
                  ) : (
                    <img
                      src={resolveUrl(selectedNews.mediaUrl)}
                      alt={selectedNews.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div>
                  <p className="text-muted-foreground leading-relaxed text-base">
                    {selectedNews.description}
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