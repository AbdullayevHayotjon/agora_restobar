import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';

type Language = 'uz' | 'ru' | 'en';

const menuTranslations = {
  uz: {
    title: 'Bizning Menyu',
    subtitle: 'Har bir ta\'m uchun noyob taomlar',
    viewDetails: 'Batafsil',
    price: 'Narxi',
    som: 'so\'m'
  },
  ru: {
    title: 'Наше Меню',
    subtitle: 'Уникальные блюда для любого вкуса',
    viewDetails: 'Подробнее',
    price: 'Цена',
    som: 'сум'
  },
  en: {
    title: 'Our Menu',
    subtitle: 'Unique dishes for every taste',
    viewDetails: 'View Details',
    price: 'Price',
    som: 'sum'
  }
};

const demoCategories = [
  { id: '1', name: { uz: 'Salatlar', ru: 'Салаты', en: 'Salads' }, type: 'salads' },
  { id: '2', name: { uz: 'Sho\'rvalar', ru: 'Супы', en: 'Soups' }, type: 'soups' },
  { id: '3', name: { uz: 'Makaron taomlari', ru: 'Паста', en: 'Pasta' }, type: 'pasta' },
  { id: '4', name: { uz: 'Issiq taomlar', ru: 'Горячие блюдо', en: 'Hot Dishes' }, type: 'hotDishes' },
  { id: '5', name: { uz: 'Grilda tayyorlangan taomlar', ru: 'Блюда на грилье', en: 'Grilled Dishes' }, type: 'grilledDishes' },
  { id: '6', name: { uz: 'Baliqli taomlar', ru: 'Рыбное бдюдо', en: 'Fish Dishes' }, type: 'fishDishes' },
  { id: '7', name: { uz: 'Issiq gazaklar', ru: 'Горячие закуски', en: 'Hot Appetizers' }, type: 'hotAppetizers' },
  { id: '8', name: { uz: 'Kavkazcha shashliklar', ru: 'Кавказские Шашлыки', en: 'Caucasian Shashlik' }, type: 'caucasianShashlik' },
  { id: '9', name: { uz: 'Garnirlar', ru: 'Гарниры', en: 'Side Dishes' }, type: 'sideDishes' },
  { id: '10', name: { uz: 'Souslar', ru: 'Соусы', en: 'Sauces' }, type: 'sauces' },
  { id: '11', name: { uz: 'Sovuq gazaklar', ru: 'Холодные закуски', en: 'Cold Appetizers' }, type: 'coldAppetizers' },
  { id: '12', name: { uz: 'Choylar', ru: 'Чаи', en: 'Tea' }, type: 'tea' },
  { id: '13', name: { uz: 'Freysh sharbatlar', ru: 'Фрешы', en: 'Fresh Juices' }, type: 'freshJuices' },
  { id: '14', name: { uz: 'Alkogolli kokteyllar', ru: 'Алкогольные коктели', en: 'Alcoholic Cocktails' }, type: 'alcoholicCocktails' },
  { id: '15', name: { uz: 'Qahva', ru: 'Кофе', en: 'Coffee' }, type: 'coffee' },
  { id: '16', name: { uz: 'Limonadlar', ru: 'Лимонады', en: 'Lemonades' }, type: 'lemonades' },
  { id: '17', name: { uz: 'Alkogol', ru: 'Алкоголь', en: 'Alcohol' }, type: 'alcohol' },
  { id: '18', name: { uz: 'Ichimliklar', ru: 'Напитки', en: 'Drinks' }, type: 'drinks' },
  { id: '19', name: { uz: 'Kalyan', ru: 'Кальян', en: 'Hookah' }, type: 'hookah' },
];

const demoMenuItems = [
  {
    id: '1',
    name: { uz: 'Toshkent oshi', ru: 'Ташкентский плов', en: 'Tashkent Plov' },
    description: { uz: 'An\'anaviy toshkent oshi, yumshoq go\'sht va aromat bilan', ru: 'Традиционный ташкентский плов с мягким мясом и ароматом', en: 'Traditional Tashkent plov with tender meat and aroma' },
    price: 35000,
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    type: 'salads'
  },
  {
    id: '2',
    name: { uz: 'Beef Steak', ru: 'Говяжий стейк', en: 'Beef Steak' },
    description: { uz: 'Yumshoq beef steak, kartoshka garniri bilan', ru: 'Нежный говяжий стейк с картофельным гарниром', en: 'Tender beef steak with potato side' },
    price: 86000,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    type: 'soups'
  },
  {
    id: '3',
    name: { uz: 'Fresh Limonad', ru: 'Свежий лимонад', en: 'Fresh Lemonade' },
    description: { uz: 'Yangi limon va yalpizdan tayyorlangan limonad', ru: 'Лимонад из свежего лимона и мяты', en: 'Lemonade made from fresh lemon and mint' },
    price: 15000,
    image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    type: 'salads'
  }
];

interface MenuProps {
  language: Language;
}

export function Menu({ language }: MenuProps) {
  const [selectedCategory, setSelectedCategory] = useState(demoCategories[0]);
  const [selectedItem, setSelectedItem] = useState<typeof demoMenuItems[0] | null>(null);
  const [categoryScrollPosition, setCategoryScrollPosition] = useState(0);

  const t = menuTranslations[language];

  const filteredItems = demoMenuItems.filter(item => item.type === selectedCategory.type);

  const scrollCategories = (direction: 'left' | 'right') => {
    const container = document.getElementById('categories-container');
    if (container) {
      const scrollAmount = 200;
      const newPosition = direction === 'left'
        ? Math.max(0, categoryScrollPosition - scrollAmount)
        : categoryScrollPosition + scrollAmount;

      container.scrollTo({ left: newPosition, behavior: 'smooth' });
      setCategoryScrollPosition(newPosition);
    }
  };

  return (
    <section id="menu" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Categories */}
        <div className="relative mb-12">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={() => scrollCategories('left')} className="mr-2 flex-shrink-0">
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div
              id="categories-container"
              className="flex space-x-4 overflow-x-auto scrollbar-hide flex-1"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {demoCategories.map((category) => (
                <Button
                  key={category.id}
                  onClick={() => setSelectedCategory(category)}
                  className={`whitespace-nowrap flex-shrink-0 border transition-all duration-200
      ${selectedCategory.id === category.id
                      ? 'bg-[#F3732F] text-white border-[#F3732F] shadow-md'
                      : 'bg-white text-black border-gray-300 hover:bg-[#F3732F] hover:text-white hover:border-[#F3732F] dark:bg-transparent dark:text-[#F3732F] dark:border-[#F3732F] dark:hover:bg-[#F3732F] dark:hover:text-white'
                    }`}
                >
                  {category.name[language]}
                </Button>
              ))}

            </div>

            <Button variant="ghost" size="icon" onClick={() => scrollCategories('right')} className="ml-2 flex-shrink-0">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Menu Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <Card
              key={item.id}
              className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 overflow-hidden cursor-pointer"
              onClick={() => setSelectedItem(item)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img src={item.image} alt={item.name[language]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <Eye className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {item.name[language]}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {item.description[language]}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">
                    {item.price.toLocaleString()} {t.som}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedItem(item);
                    }}
                  >
                    {t.viewDetails}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">Bu kategoriyada hozircha mahsulotlar yo'q</p>
          </div>
        )}
      </div>

      {/* Item Detail Modal */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-2xl">
          {selectedItem && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-primary">{selectedItem.name[language]}</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <img src={selectedItem.image} alt={selectedItem.name[language]} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Tavsif:</h4>
                  <p className="text-muted-foreground leading-relaxed">{selectedItem.description[language]}</p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-sm text-muted-foreground">{t.price}:</span>
                  <span className="text-3xl font-bold text-primary">
                    {selectedItem.price.toLocaleString()} {t.som}
                  </span>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
