import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { API_BASE_URL } from '@/lib/constants';
import { useToast } from '@/hooks/use-toast';

type Language = 'uz' | 'ru' | 'en';

// Menyu uchun tarjimani saqlash obyekti
const menuTranslations = {
  uz: {
    title: 'Bizning Menyu',
    subtitle: 'Har bir ta\'m uchun noyob taomlar',
    viewDetails: 'Batafsil',
    price: 'Narxi',
    som: 'so\'m',
    noItems: 'Bu kategoriyada hozircha mahsulotlar yo\'q',
    error: 'Xato',
    errorMessage: 'Menyu ma\'lumotlarini yuklashda xatolik yuz berdi',
    loading: 'Ma\'lumotlar yuklanmoqda...', // Yuklanayotgan holat uchun matn
    description: 'Tavsif' // Tavsif uchun matn
  },
  ru: {
    title: 'Наше Меню',
    subtitle: 'Уникальные блюда для любого вкуса',
    viewDetails: 'Подробнее',
    price: 'Цена',
    som: 'сум',
    noItems: 'В этой категории пока нет продуктов',
    error: 'Ошибка',
    errorMessage: 'Произошла ошибка при загрузке данных меню',
    loading: 'Загрузка данных...', // Yuklanayotgan holat uchun matn
    description: 'Описание' // Tavsif uchun matn
  },
  en: {
    title: 'Our Menu',
    subtitle: 'Unique dishes for every taste',
    viewDetails: 'View Details',
    price: 'Price',
    som: 'sum',
    noItems: 'No items in this category yet',
    error: 'Error',
    errorMessage: 'An error occurred while loading menu data',
    loading: 'Loading data...', // Yuklanayotgan holat uchun matn
    description: 'Description' // Tavsif uchun matn
  }
};

// Menyu kategoriyalari ro'yxati
const menuTypes = [
  { value: 'salads', label: { uz: 'Salatlar', ru: 'Салаты', en: 'Salads' } },
  { value: 'soups', label: { uz: 'Sho\'rvalar', ru: 'Супы', en: 'Soups' } },
  { value: 'pasta', label: { uz: 'Makaron taomlari', ru: 'Паста', en: 'Pasta' } },
  { value: 'hotDishes', label: { uz: 'Issiq taomlar', ru: 'Горячие блюдо', en: 'Hot Dishes' } },
  { value: 'grilledDishes', label: { uz: 'Grilda tayyorlangan taomlar', ru: 'Блюда на грилье', en: 'Grilled Dishes' } },
  { value: 'fishDishes', label: { uz: 'Baliqli taomlar', ru: 'Рыбное бдюдо', en: 'Fish Dishes' } },
  { value: 'hotAppetizers', label: { uz: 'Issiq gazaklar', ru: 'Горячие закуски', en: 'Hot Appetizers' } },
  { value: 'caucasianShashlik', label: { uz: 'Kavkazcha shashliklar', ru: 'Кавказские Шашлыки', en: 'Caucasian Shashlik' } },
  { value: 'sideDishes', label: { uz: 'Garnirlar', ru: 'Гарниры', en: 'Side Dishes' } },
  { value: 'sauces', label: { uz: 'Souslar', ru: 'Соусы', en: 'Sauces' } },
  { value: 'coldAppetizers', label: { uz: 'Sovuq gazaklar', ru: 'Холодные закуски', en: 'Cold Appetizers' } },
  { value: 'tea', label: { uz: 'Choylar', ru: 'Чаи', en: 'Tea' } },
  { value: 'freshJuices', label: { uz: 'Freysh sharbatlar', ru: 'Фрешы', en: 'Fresh Juices' } },
  { value: 'alcoholicCocktails', label: { uz: 'Alkogolli kokteyllar', ru: 'Алкогольные коктели', en: 'Alcoholic Cocktails' } },
  { value: 'coffee', label: { uz: 'Qahva', ru: 'Кофе', en: 'Coffee' } },
  { value: 'lemonades', label: { uz: 'Limonadlar', ru: 'Лимонады', en: 'Lemonades' } },
  { value: 'alcohol', label: { uz: 'Alkogol', ru: 'Алкоголь', en: 'Alcohol' } },
  { value: 'drinks', label: { uz: 'Ichimliklar', ru: 'Напитки', en: 'Drinks' } },
  { value: 'hookah', label: { uz: 'Kalyan', ru: 'Кальян', en: 'Hookah' } },
];

interface MenuItem {
  id: string;
  nameUz: string;
  nameRu: string;
  nameEn: string;
  descriptionUz: string;
  descriptionRu: string;
  descriptionEn: string;
  price: number;
  image: string;
  type: string;
}

interface Category {
  id: string;
  type: string;
  label: { uz: string; ru: string; en: string };
}

interface MenuProps {
  language: Language;
}

export function Menu({ language }: MenuProps) {
  // Kategoriyalar holati
  const [categories, setCategories] = useState<Category[]>(menuTypes.map((type, index) => ({
    id: (index + 1).toString(),
    type: type.value,
    label: type.label
  })));
  // Tanlangan kategoriya holati
  const [selectedCategory, setSelectedCategory] = useState<Category>(categories[0]);
  // Menyu elementlari holati
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  // Tanlangan menyu elementi holati
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  // Kategoriyalar skroll pozitsiyasi
  const [categoryScrollPosition, setCategoryScrollPosition] = useState(0);
  // Yuklanish holati
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const t = menuTranslations[language];

  // API'dan menyu elementlarini olish funksiyasi
  const fetchMenuItems = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/Menu`);
      if (response.ok) {
        const data = await response.json();
        const mappedItems: MenuItem[] = (data.$values || []).map(item => ({
          id: item.id,
          nameUz: item.nameUz || '',
          nameRu: item.nameRu || '',
          nameEn: item.nameEn || '',
          descriptionUz: item.descriptionUz || '',
          descriptionRu: item.descriptionRu || '',
          descriptionEn: item.descriptionEn || '',
          price: item.price || 0,
          image: `${API_BASE_URL}${item.imageUrl}`,
          type: item.category || ''
        }));
        setMenuItems(mappedItems);
      } else {
        throw new Error('Failed to fetch menu items');
      }
    } catch (error) {
      console.error('Xato:', error);
      toast({
        title: t.error,
        description: t.errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Komponent yuklanishi bilan ma'lumotlarni olish
  useEffect(() => {
    fetchMenuItems();
  }, []);

  // Tanlangan kategoriyaga mos menyu elementlarini filtrlash
  const filteredItems = menuItems.filter(item => item.type === selectedCategory.type);

  // Kategoriyalarni chapga yoki o'ngga siljitish funksiyasi
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
        {/* Menyu sarlavhasi va subtitri */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Kategoriyalar */}
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
              {categories.map((category) => (
                <Button
                  key={category.id}
                  onClick={() => setSelectedCategory(category)}
                  className={`whitespace-nowrap flex-shrink-0 border transition-all duration-200
                    ${selectedCategory.id === category.id
                      ? 'bg-[#F3732F] text-white border-[#F3732F] shadow-md'
                      : 'bg-white text-black border-gray-300 hover:bg-[#F3732F] hover:text-white hover:border-[#F3732F] dark:bg-transparent dark:text-[#F3732F] dark:border-[#F3732F] dark:hover:bg-[#F3732F] dark:hover:text-white'
                    }`}
                >
                  {category.label[language]}
                </Button>
              ))}
            </div>

            <Button variant="ghost" size="icon" onClick={() => scrollCategories('right')} className="ml-2 flex-shrink-0">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Menyu elementlari */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <Card
              key={item.id}
              className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 overflow-hidden cursor-pointer"
              onClick={() => setSelectedItem(item)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img src={item.image} alt={item[`name${language.charAt(0).toUpperCase()}${language.slice(1)}`]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <Eye className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {item[`name${language.charAt(0).toUpperCase()}${language.slice(1)}`]}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {item[`description${language.charAt(0).toUpperCase()}${language.slice(1)}`]}
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

        {/* Yuklanish yoki ma'lumot yo'qligi holati */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg animate-pulse">{t.loading}</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">{t.noItems}</p>
          </div>
        ) : null}
      </div>

      {/* Menyu elementi detallari modal oynasi */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-2xl">
          {selectedItem && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-primary">
                  {selectedItem[`name${language.charAt(0).toUpperCase()}${language.slice(1)}`]}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <img src={selectedItem.image} alt={selectedItem[`name${language.charAt(0).toUpperCase()}${language.slice(1)}`]} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">{t.description}:</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedItem[`description${language.charAt(0).toUpperCase()}${language.slice(1)}`]}
                  </p>
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