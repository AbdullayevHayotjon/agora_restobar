import { useState } from 'react';
import InputMask from 'react-input-mask'; // ✅ Qo‘shildi
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar, User, Phone, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type Language = 'uz' | 'ru' | 'en';

const bookingTranslations = {
  uz: {
    title: 'Stol bron qilish',
    subtitle: 'Bizda joy bron qiling va ajoyib vaqt o\'tkazing',
    name: 'Ismingiz',
    phone: 'Telefon raqamingiz',
    bookNow: 'Bron qilish',
    nameRequired: 'Ismingizni kiriting',
    phoneRequired: 'Telefon raqamingizni kiriting',
    success: 'Muvaffaqiyatli yuborildi!',
    successMessage: 'Tez orada siz bilan bog\'lanamiz',
    namePlaceholder: 'Ismingizni kiriting...',
    phonePlaceholder: '97 422 88 88'
  },
  ru: {
    title: 'Бронирование столика',
    subtitle: 'Забронируйте место у нас и проведите отличное время',
    name: 'Ваше имя',
    phone: 'Ваш номер телефона',
    bookNow: 'Забронировать',
    nameRequired: 'Введите ваше имя',
    phoneRequired: 'Введите ваш номер телефона',
    success: 'Успешно отправлено!',
    successMessage: 'Мы скоро свяжемся с вами',
    namePlaceholder: 'Введите ваше имя...',
    phonePlaceholder: '90 123 45 67'
  },
  en: {
    title: 'Table Reservation',
    subtitle: 'Book a place with us and have a great time',
    name: 'Your Name',
    phone: 'Your phone number',
    bookNow: 'Book Now',
    nameRequired: 'Please enter your name',
    phoneRequired: 'Please enter your phone number',
    success: 'Successfully sent!',
    successMessage: 'We will contact you soon',
    namePlaceholder: 'Enter your name...',
    phonePlaceholder: '90 123 45 67'
  }
};

interface BookingProps {
  language: Language;
}

export function Booking({ language }: BookingProps) {
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const t = bookingTranslations[language];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast({ title: 'Xato', description: t.nameRequired, variant: 'destructive' });
      return false;
    }
    if (!formData.phone.trim() || formData.phone.replace(/\s/g, '').length < 9) {
      toast({ title: 'Xato', description: t.phoneRequired, variant: 'destructive' });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await fetch('http://45.92.173.180:5043/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.name,
          phone: '+998' + formData.phone.replace(/\s/g, '')
        }),
      });

      const data = await response.json();

      if (response.ok && data.message?.toLowerCase().includes("qabul qilindi")) {
        setIsSubmitted(true);
        toast({ title: t.success, description: data.message });
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ name: '', phone: '' });
        }, 3000);
      } else {
        throw new Error(data.message || 'Xatolik yuz berdi');
      }
    } catch (error) {
      toast({
        title: 'Xato',
        description: 'Nimadir xato ketdi. Qaytadan urinib ko‘ring.',
        variant: 'destructive',
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <section id="booking" className="py-20 bg-gradient-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">{t.title}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="shadow-elegant hover:shadow-glow transition-all duration-300">
            <CardHeader className="text-center pb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary mb-4 mx-auto">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-primary">{t.title}</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              {isSubmitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/20 mb-4">
                    <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-green-600 dark:text-green-400">
                    {t.success}
                  </h3>
                  <p className="text-muted-foreground">{t.successMessage}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium flex items-center">
                      <User className="h-4 w-4 mr-2 text-primary" />
                      {t.name}
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder={t.namePlaceholder}
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="h-12 text-base focus:ring-primary focus:border-primary"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-primary" />
                      {t.phone}
                    </Label>
                    <div className="flex items-center space-x-2">
                      <span className="px-3 py-2 border border-border bg-muted text-muted-foreground rounded-md select-none">
                        +998
                      </span>
                      <InputMask
                        mask="99 999 99 99"
                        maskChar=""
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      >
                        {(inputProps: any) => (
                          <Input
                            {...inputProps}
                            id="phone"
                            type="tel"
                            placeholder={t.phonePlaceholder}
                            className="h-12 text-base focus:ring-primary focus:border-primary"
                            required
                          />
                        )}
                      </InputMask>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="booking"
                    size="lg"
                    className="w-full h-12 text-lg font-semibold"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Yuborilmoqda...</span>
                      </div>
                    ) : (
                      <>
                        <Calendar className="h-5 w-5 mr-2" />
                        {t.bookNow}
                      </>
                    )}
                  </Button>
                </form>
              )}

              <div className="text-center pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  {language === 'uz' && "Telefon orqali ham bog'lanishingiz mumkin: "}
                  {language === 'ru' && "Вы также можете связаться по телефону: "}
                  {language === 'en' && "You can also contact us by phone: "}
                  <a
                    href="tel:+998974228888"
                    className="text-primary hover:underline font-medium"
                  >
                    +998 97 422 88 88
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
