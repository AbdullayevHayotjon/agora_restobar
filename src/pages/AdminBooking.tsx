import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { API_BASE_URL } from '@/lib/constants';

interface Booking {
    id: string;
    fullName: string;
    phone: string;
    isConfirmed: boolean;
}

export default function AdminBookings() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState<'name' | 'phone'>('name');
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();

    // 🔁 Bronlarni olib keluvchi umumiy funksiya
    const fetchBookings = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`${API_BASE_URL}/api/bookings`);
            const data = await response.json();
            setBookings(data.$values);
            setIsLoading(false);
        } catch (error) {
            console.error("API xatolik:", error);
            setIsLoading(false);
            toast({
                title: "Xatolik",
                description: "Bron ma'lumotlarini olishda xatolik yuz berdi.",
                variant: "destructive"
            });
        }
    };

    // ✅ Faqat 1 marta ma'lumotni olish
    useEffect(() => {
        fetchBookings();
    }, []);

    // 🔄 Holatni o'zgartiruvchi va so‘ngra qayta yuklovchi funksiya
    const toggleStatus = async (bookingId: string) => {
        // 1. Avvalgi holatni olish
        const previous = bookings.find(b => b.id === bookingId);
        if (!previous) return;

        // 2. Darhol UI-ni yangilaymiz
        setBookings(prev =>
            prev.map(b =>
                b.id === bookingId ? { ...b, isConfirmed: !b.isConfirmed } : b
            )
        );

        try {
            // 3. API so‘rovi
            const response = await fetch(`${API_BASE_URL}/api/bookings/${bookingId}`, {
                method: 'PUT',
            });

            if (!response.ok) {
                throw new Error('Server xatolikka uchradi');
            }

            // 4. Hammasi yaxshi bo‘lsa — Toast chiqaramiz
            toast({
                title: "Holat o'zgartirildi",
                description: "Bron holati muvaffaqiyatli o'zgartirildi.",
                duration: 3000,
            });
            await fetchBookings();

        } catch (error) {
            // 5. Xatolik bo‘lsa — holatni orqaga qaytaramiz
            console.error("Toggle xatolik:", error);
            setBookings(prev =>
                prev.map(b =>
                    b.id === bookingId ? { ...b, isConfirmed: previous.isConfirmed } : b
                )
            );

            toast({
                title: "Xatolik",
                description: "Holatni o'zgartirishda muammo yuz berdi.",
                variant: "destructive",
            });
        }
    };


    const filteredBookings = bookings.filter(booking =>
        searchType === 'name'
            ? booking.fullName.toLowerCase().includes(searchTerm.toLowerCase())
            : booking.phone.includes(searchTerm)
    );

    return (
        <div className="space-y-6 h-full flex flex-col">
            {/* Header va Search bar */}
            <div className="flex-shrink-0 space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Bronlar boshqaruvi</h1>
                    <p className="text-muted-foreground">Foydalanuvchi bronlarini boshqaring</p>
                </div>
                <div className="flex items-center gap-4 w-full">
                    <Select value={searchType} onValueChange={(val) => setSearchType(val as 'name' | 'phone')}>
                        <SelectTrigger className="w-[200px] truncate">
                            <SelectValue placeholder="Qidiruv turi" />
                        </SelectTrigger>
                        <SelectContent className="min-w-[var(--radix-select-trigger-width)]">
                            <SelectItem value="name">Ism bo‘yicha</SelectItem>
                            <SelectItem value="phone">Telefon raqami bo‘yicha</SelectItem>
                        </SelectContent>
                    </Select>
                    <div className="relative flex-grow">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                            placeholder={searchType === 'name' ? "Ism bo‘yicha qidirish..." : "Telefon raqami bo‘yicha qidirish..."}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 w-full"
                        />
                    </div>
                </div>
            </div>

            {/* Jadval (scroll qismi) */}
            <div className="flex-1 overflow-y-auto min-h-0">
                <Card>
                    <CardHeader>
                        <CardTitle>Bronlar ro'yxati ({filteredBookings.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-3 px-2">#</th>
                                        <th className="text-left py-3 px-2">Foydalanuvchi ismi</th>
                                        <th className="text-left py-3 px-2">Telefon raqami</th>
                                        <th className="text-left py-3 px-2">Holati</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredBookings.map((booking, index) => (
                                        <tr key={booking.id} className="border-b hover:bg-muted/50">
                                            <td className="py-3 px-2">{index + 1}</td>
                                            <td className="py-3 px-2 font-medium">{booking.fullName}</td>
                                            <td className="py-3 px-2">
                                                <a
                                                    href={`tel:${booking.phone}`}
                                                    className="text-blue-600 underline hover:text-blue-800"
                                                >
                                                    {booking.phone}
                                                </a>
                                            </td>
                                            <td className="py-3 px-2">
                                                <div className="flex items-center space-x-2">
                                                    <Switch
                                                        checked={booking.isConfirmed}
                                                        onCheckedChange={() => toggleStatus(booking.id)}
                                                    />
                                                    <Badge variant={booking.isConfirmed ? "default" : "secondary"}>
                                                        {booking.isConfirmed ? "Tasdiqlandi" : "Tasdiqlanmagan"}
                                                    </Badge>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {isLoading ? (
                                <div className="text-center py-8">
                                    <p className="text-muted-foreground animate-pulse">Ma'lumotlar yuklanmoqda...</p>
                                </div>
                            ) : filteredBookings.length === 0 ? (
                                <div className="text-center py-8">
                                    <p className="text-muted-foreground">Hech qanday bron topilmadi</p>
                                </div>
                            ) : null}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
