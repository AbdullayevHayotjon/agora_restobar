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
    addressText: 'Toshkent shahar, Yunusobod tumani, Xalqobod ko‘chasi, 6-uy',
    phoneText: '+998 97 422 88 88',
    emailText: 'agorarestobaruz@gmail.com',
    workingText: 'Har kuni 10:00 dan 03:00 gacha',
    followUs: 'Bizni kuzatib boring',
    locationTitle: 'Bizning manzilimiz',
    addressUrl: 'https://maps.app.goo.gl/DQmdnPgL3a8fkwRr9'
  },
  ru: {
    title: 'Контакты',
    subtitle: 'Свяжитесь с нами',
    address: 'Адрес',
    phone: 'Телефон',
    workingHours: 'Рабочие часы',
    email: 'Email',
    social: 'Социальные сети',
    addressText: 'город Ташкент, Юнусабадский район, улица Халкабад, дом 6',
    phoneText: '+998 97 422 88 88',
    emailText: 'agorarestobaruz@gmail.com',
    workingText: 'Ежедневно с 10:00 до 03:00',
    followUs: 'Следите за нами',
    locationTitle: 'Наш адрес',
    addressUrl: 'https://maps.app.goo.gl/DQmdnPgL3a8fkwRr9'
  },
  en: {
    title: 'Contact',
    subtitle: 'Get in touch with us',
    address: 'Address',
    phone: 'Phone',
    workingHours: 'Working Hours',
    email: 'Email',
    social: 'Social Media',
    addressText: 'Tashkent city, Yunusabad district, Khalkabad street, house 6',
    phoneText: '+998 97 422 88 88',
    emailText: 'agorarestobaruz@gmail.com',
    workingText: 'Daily from 10:00 to 03:00',
    followUs: 'Follow us',
    locationTitle: 'Our Location',
    addressUrl: 'https://maps.app.goo.gl/DQmdnPgL3a8fkwRr9'
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
      url: 'https://www.instagram.com/agora.restobar',
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
          <Card className="overflow-hidden h-96 lg:h-full">
            <div className="relative w-full h-full bg-muted/30">
              <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3222.4440209531776!2d69.28747669411496!3d41.32690108289397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8be3372f2549%3A0x6ffd2ad248d469ee!2sESADO%20Assistance!5e1!3m2!1suz!2s!4v1753716628961!5m2!1suz!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full"
              ></iframe>

              <div className="absolute z-10 top-0 left-0 p-4 text-center bg-white w-full">
                <h3 className="text-xl font-bold text-foreground mb-1">
                  {t.locationTitle}
                </h3>
                <p className="text-muted-foreground">{t.addressText}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}