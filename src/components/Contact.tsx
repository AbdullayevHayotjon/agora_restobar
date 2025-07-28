import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Phone, Clock, Mail, Instagram, Facebook, Send } from 'lucide-react';

type Language = 'uz' | 'ru' | 'en';

const contactTranslations = {
  uz: {
    title: 'Aloqa',
    subtitle: 'Biz bilan bog\'laning',
    address: 'Manzil',
    phone: 'Telefon',
    workingHours: 'Ish vaqti',
    email: 'Email',
    social: 'Ijtimoiy tarmoqlar',
    addressText: 'Toshkent shahri, Yunusobod tumani, 123-ko\'cha, 45-uy',
    phoneText: '+998 90 123 45 67',
    emailText: 'info@agorarestobar.uz',
    workingText: 'Har kuni 10:00 dan 02:00 gacha',
    followUs: 'Bizni kuzatib boring'
  },
  ru: {
    title: 'Контакты',
    subtitle: 'Свяжитесь с нами',
    address: 'Адрес',
    phone: 'Телефон',
    workingHours: 'Рабочие часы',
    email: 'Email',
    social: 'Социальные сети',
    addressText: 'г. Ташкент, Юнусабадский р-н, ул. 123, дом 45',
    phoneText: '+998 90 123 45 67',
    emailText: 'info@agorarestobar.uz',
    workingText: 'Ежедневно с 10:00 до 02:00',
    followUs: 'Следите за нами'
  },
  en: {
    title: 'Contact',
    subtitle: 'Get in touch with us',
    address: 'Address',
    phone: 'Phone',
    workingHours: 'Working Hours',
    email: 'Email',
    social: 'Social Media',
    addressText: 'Tashkent city, Yunusabad district, 123 street, house 45',
    phoneText: '+998 90 123 45 67',
    emailText: 'info@agorarestobar.uz',
    workingText: 'Daily from 10:00 to 02:00',
    followUs: 'Follow us'
  }
};

interface ContactProps {
  language: Language;
}

export function Contact({ language }: ContactProps) {
  const t = contactTranslations[language];

  const contactInfo = [
    {
      icon: MapPin,
      title: t.address,
      content: t.addressText,
      color: 'text-red-500'
    },
    {
      icon: Phone,
      title: t.phone,
      content: t.phoneText,
      color: 'text-green-500'
    },
    {
      icon: Clock,
      title: t.workingHours,
      content: t.workingText,
      color: 'text-blue-500'
    },
    {
      icon: Mail,
      title: t.email,
      content: t.emailText,
      color: 'text-purple-500'
    }
  ];

  const socialLinks = [
    {
      icon: Instagram,
      name: 'Instagram',
      url: '#',
      color: 'text-pink-500'
    },
    {
      icon: Facebook,
      name: 'Facebook',
      url: '#',
      color: 'text-blue-600'
    },
    {
      icon: Send,
      name: 'Telegram',
      url: '#',
      color: 'text-blue-400'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <Card 
                  key={index} 
                  className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-primary/10 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <info.icon className={`h-6 w-6 ${info.color}`} />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {info.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {info.content}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Social Media */}
            <Card className="group hover:shadow-elegant transition-all duration-300">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-4 flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-primary/10 flex items-center justify-center mr-3">
                    <Instagram className="h-6 w-6 text-primary" />
                  </div>
                  {t.followUs}
                </h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      className={`inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-primary/10 hover:bg-gradient-primary/20 transition-all duration-300 hover:scale-110 group`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <social.icon className={`h-5 w-5 ${social.color} group-hover:scale-110 transition-transform`} />
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Map */}
          <div className="relative">
            <Card className="overflow-hidden h-96 lg:h-full">
              <div className="relative w-full h-full bg-muted/30 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Bizning manzilimiz
                  </h3>
                  <p className="text-muted-foreground">
                    {t.addressText}
                  </p>
                </div>
                {/* In a real application, you would integrate with Google Maps or another map service */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-success/10 opacity-50"></div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}