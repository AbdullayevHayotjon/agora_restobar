import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Demo data - to be replaced with API data
const demoBookings = [
    {
        id: '1',
        name: 'Ali Valiev',
        phone: '+998901234567',
        isConfirmed: true
    },
    {
        id: '2',
        name: 'Zilola Ahmedova',
        phone: '+998912345678',
        isConfirmed: false
    },
    {
        id: '3',
        name: 'Sardor Usmonov',
        phone: '+998933214567',
        isConfirmed: true
    }
];

export default function AdminBookings() {
    const [bookings, setBookings] = useState(demoBookings);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('name'); // Default: Ism bo'yicha
    const { toast } = useToast();

    const toggleStatus = async (bookingId: string) => {
        setBookings(prev => prev.map(booking =>
            booking.id === bookingId ? { ...booking, isConfirmed: !booking.isConfirmed } : booking
        ));
        toast({ title: "Holat o'zgartirildi", duration: 3000, });
    };

    const filteredBookings = bookings.filter(booking =>
        searchType === 'name'
            ? booking.name.toLowerCase().includes(searchTerm.toLowerCase())
            : booking.phone.includes(searchTerm)
    );

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-foreground">Bronlar boshqaruvi</h1>
                <p className="text-muted-foreground">Foydalanuvchi bronlarini boshqaring</p>
            </div>
            <div className="flex items-center gap-4 w-full">
                <Select value={searchType} onValueChange={setSearchType}>
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
                                        <td className="py-3 px-2 font-medium">{booking.name}</td>
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

                        {filteredBookings.length === 0 && (
                            <div className="text-center py-8">
                                <p className="text-muted-foreground">Hech qanday bron topilmadi</p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}