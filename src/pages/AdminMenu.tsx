import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Upload,
  Eye,
  X
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Demo data - to be replaced with API data
const demoMenuItems = [
  {
    id: '1',
    nameUz: 'Toshkent oshi',
    nameRu: 'Ташкентский плов',
    nameEn: 'Tashkent Plov',
    descriptionUz: 'An\'anaviy toshkent oshi, yumshoq go\'sht va aromat bilan',
    descriptionRu: 'Традиционный ташкентский плов с мягким мясом и ароматом',
    descriptionEn: 'Traditional Tashkent plov with tender meat and aroma',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    type: 'osh'
  },
  {
    id: '2',
    nameUz: 'Beef Steak',
    nameRu: 'Говяжий стейк',
    nameEn: 'Beef Steak',
    descriptionUz: 'Yumshoq beef steak, kartoshka garniri bilan',
    descriptionRu: 'Нежный говяжий стейк с картофельным гарниром',
    descriptionEn: 'Tender beef steak with potato side',
    price: 85000,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    type: 'steak'
  }
];

const menuTypes = [
  { value: 'osh', label: 'Osh' },
  { value: 'steak', label: 'Steak' },
  { value: 'drinks', label: 'Ichimliklar' },
  { value: 'hookah', label: 'Kalyan' },
  { value: 'salads', label: 'Salatlar' },
  { value: 'soups', label: 'Sho\'rvalar' },
  { value: 'dessert', label: 'Desert' },
  { value: 'appetizers', label: 'Mazzalar' }
];

interface MenuFormData {
  nameUz: string;
  nameRu: string;
  nameEn: string;
  descriptionUz: string;
  descriptionRu: string;
  descriptionEn: string;
  price: string;
  type: string;
  image: File | null;
}

const initialFormData: MenuFormData = {
  nameUz: '',
  nameRu: '',
  nameEn: '',
  descriptionUz: '',
  descriptionRu: '',
  descriptionEn: '',
  price: '',
  type: '',
  image: null
};

export default function AdminMenu() {
  const [menuItems, setMenuItems] = useState(demoMenuItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLang, setSelectedLang] = useState<'uz' | 'ru' | 'en'>('uz'); // til tanlash holati
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [formData, setFormData] = useState<MenuFormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const filteredItems = menuItems.filter(item => {
    const field = `name${selectedLang.charAt(0).toUpperCase()}${selectedLang.slice(1)}`; // nameUz, nameRu, nameEn
    return item[field].toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleInputChange = (field: keyof MenuFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      image: file
    }));
  };

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Replace with actual API call
      // const formDataToSend = new FormData();
      // formDataToSend.append('nameUz', formData.nameUz);
      // ... append other fields
      // if (formData.image) formDataToSend.append('image', formData.image);

      // const response = await fetch('/api/admin/menu', {
      //   method: 'POST',
      //   body: formDataToSend
      // });

      await new Promise(resolve => setTimeout(resolve, 1000));

      const newItem = {
        id: Date.now().toString(),
        ...formData,
        price: parseFloat(formData.price),
        image: formData.image
          ? URL.createObjectURL(formData.image)
          : 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
      };

      setMenuItems(prev => [...prev, newItem]);
      setShowAddModal(false);
      setFormData(initialFormData);

      toast({
        title: "Muvaffaqiyatli!",
        description: "Yangi menyu qo'shildi",
      });
    } catch (error) {
      toast({
        title: "Xato",
        description: "Menyu qo'shishda xatolik yuz berdi",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem) return;

    setIsLoading(true);

    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const updatedItem = {
        ...selectedItem,
        ...formData,
        price: parseFloat(formData.price),
        image: formData.image ? URL.createObjectURL(formData.image) : selectedItem.image
      };

      setMenuItems(prev => prev.map(item =>
        item.id === selectedItem.id ? updatedItem : item
      ));

      setShowEditModal(false);
      setSelectedItem(null);
      setFormData(initialFormData);

      toast({
        title: "Muvaffaqiyatli!",
        description: "Menyu yangilandi",
      });
    } catch (error) {
      toast({
        title: "Xato",
        description: "Menyu yangilashda xatolik yuz berdi",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteItem = async () => {
    if (!selectedItem) return;

    setIsLoading(true);

    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setMenuItems(prev => prev.filter(item => item.id !== selectedItem.id));
      setShowDeleteModal(false);
      setSelectedItem(null);

      toast({
        title: "Muvaffaqiyatli!",
        description: "Menyu o'chirildi",
      });
    } catch (error) {
      toast({
        title: "Xato",
        description: "Menyu o'chirishda xatolik yuz berdi",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const openEditModal = (item: any) => {
    setSelectedItem(item);
    setFormData({
      nameUz: item.nameUz,
      nameRu: item.nameRu,
      nameEn: item.nameEn,
      descriptionUz: item.descriptionUz,
      descriptionRu: item.descriptionRu,
      descriptionEn: item.descriptionEn,
      price: item.price.toString(),
      type: item.type,
      image: null
    });
    setShowEditModal(true);
  };

  const openDeleteModal = (item: any) => {
    setSelectedItem(item);
    setShowDeleteModal(true);
  };

  const openViewModal = (item: any) => {
    setSelectedItem(item);
    setShowViewModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-row flex-wrap justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Menyular boshqaruvi</h1>
          <p className="text-muted-foreground">Restoran menyularini boshqaring</p>
        </div>
        <Button
          onClick={() => {
            setFormData(initialFormData); // 🔁 formani tozalaydi
            setSelectedItem(null);        // 🔁 eski tahrirlangan itemni o'chiradi
            setShowAddModal(true);        // ✅ modalni ochadi
          }}
          variant="restaurant"
        >
          <Plus className="h-4 w-4 mr-2" />
          Yangi menyu qo'shish
        </Button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4 flex-wrap">
        {/* Til tanlash */}
        <Select value={selectedLang} onValueChange={(val) => setSelectedLang(val as 'uz' | 'ru' | 'en')}>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Til" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="uz">UZ</SelectItem>
            <SelectItem value="ru">RU</SelectItem>
            <SelectItem value="en">EN</SelectItem>
          </SelectContent>
        </Select>

        {/* Qidiruv inputi */}
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder={`Menyu nomi (${selectedLang.toUpperCase()}) bo‘yicha qidirish...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Menu Items Table */}
      <Card>
        <CardHeader>
          <CardTitle>Menyular ro'yxati ({filteredItems.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2">#</th>
                  <th className="text-left py-3 px-2">Nomi (Uz)</th>
                  <th className="text-left py-3 px-2">Nomi (Ru)</th>
                  <th className="text-left py-3 px-2">Nomi (En)</th>
                  <th className="text-left py-3 px-2">Narxi</th>
                  <th className="text-left py-3 px-2">Turi</th>
                  <th className="text-left py-3 px-2">Rasm</th>
                  <th className="text-center py-3 px-2">Amallar</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item, index) => (
                  <tr key={item.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-2">{index + 1}</td>
                    <td className="py-3 px-2 font-medium">{item.nameUz}</td>
                    <td className="py-3 px-2">{item.nameRu}</td>
                    <td className="py-3 px-2">{item.nameEn}</td>
                    <td className="py-3 px-2">{item.price.toLocaleString()} so'm</td>
                    <td className="py-3 px-2">
                      <Badge variant="secondary">
                        {menuTypes.find(type => type.value === item.type)?.label}
                      </Badge>
                    </td>
                    <td className="py-3 px-2">
                      <img
                        src={item.image}
                        alt={item.nameUz}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex space-x-2 justify-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openViewModal(item)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditModal(item)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openDeleteModal(item)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredItems.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Hech qanday menyu topilmadi</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Add Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Yangi menyu qo'shish</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddItem} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="nameUz">Nomi(Uz)</Label>
                <Input
                  id="nameUz"
                  value={formData.nameUz}
                  onChange={(e) => handleInputChange('nameUz', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="nameRu">Nomi(Ru)</Label>
                <Input
                  id="nameRu"
                  value={formData.nameRu}
                  onChange={(e) => handleInputChange('nameRu', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="nameEn">Nomi(En)</Label>
                <Input
                  id="nameEn"
                  value={formData.nameEn}
                  onChange={(e) => handleInputChange('nameEn', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="descUz">Tavsif (O'zbek)</Label>
                <Textarea
                  id="descUz"
                  value={formData.descriptionUz}
                  onChange={(e) => handleInputChange('descriptionUz', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="descRu">Tavsif (Русский)</Label>
                <Textarea
                  id="descRu"
                  value={formData.descriptionRu}
                  onChange={(e) => handleInputChange('descriptionRu', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="descEn">Tavsif (English)</Label>
                <Textarea
                  id="descEn"
                  value={formData.descriptionEn}
                  onChange={(e) => handleInputChange('descriptionEn', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Narxi (so'm)</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="type">Turi</Label>
                <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Turini tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    {menuTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="image">Rasm</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="cursor-pointer"
              />
            </div>

            <div className="flex space-x-2 pt-4">
              <Button type="submit" disabled={isLoading} className="flex-1">
                {isLoading ? 'Qo\'shilmoqda...' : 'Qo\'shish'}
              </Button>
              <Button type="button" variant="outline" onClick={() => setShowAddModal(false)}>
                Bekor qilish
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Menyuni tahrirlash</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditItem} className="space-y-4">
            {/* Same form fields as Add Modal */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="editNameUz">Nomi (O'zbek)</Label>
                <Input
                  id="editNameUz"
                  value={formData.nameUz}
                  onChange={(e) => handleInputChange('nameUz', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="editNameRu">Nomi (Русский)</Label>
                <Input
                  id="editNameRu"
                  value={formData.nameRu}
                  onChange={(e) => handleInputChange('nameRu', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="editNameEn">Nomi (English)</Label>
                <Input
                  id="editNameEn"
                  value={formData.nameEn}
                  onChange={(e) => handleInputChange('nameEn', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="editPrice">Narxi (so'm)</Label>
                <Input
                  id="editPrice"
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="editType">Turi</Label>
                <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Turini tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    {menuTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="editImage">Yangi rasm (ixtiyoriy)</Label>
              <Input
                id="editImage"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="cursor-pointer"
              />
            </div>

            <div className="flex space-x-2 pt-4">
              <Button type="submit" disabled={isLoading} className="flex-1">
                {isLoading ? 'Yangilanmoqda...' : 'Yangilash'}
              </Button>
              <Button type="button" variant="outline" onClick={() => setShowEditModal(false)}>
                Bekor qilish
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Modal */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Menyuni o'chirish</DialogTitle>
          </DialogHeader>
          {selectedItem && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.nameUz}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-semibold">{selectedItem.nameUz}</h3>
                  <p className="text-sm text-muted-foreground">{selectedItem.price.toLocaleString()} so'm</p>
                </div>
              </div>
              <p className="text-center text-muted-foreground">
                Haqiqatan ham bu menyuni o'chirmoqchimisiz?
              </p>
              <div className="flex space-x-2">
                <Button
                  variant="destructive"
                  onClick={handleDeleteItem}
                  disabled={isLoading}
                  className="flex-1"
                >
                  {isLoading ? 'O\'chirilmoqda...' : 'O\'chirish'}
                </Button>
                <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
                  Bekor qilish
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* View Modal */}
      <Dialog open={showViewModal} onOpenChange={setShowViewModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Menyu ma'lumotlari</DialogTitle>
          </DialogHeader>
          {selectedItem && (
            <div className="space-y-6">
              <div className="relative h-64 rounded-lg overflow-hidden">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.nameUz}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground">O'zbek</h4>
                  <p className="font-medium">{selectedItem.nameUz}</p>
                  <p className="text-sm text-muted-foreground mt-1">{selectedItem.descriptionUz}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground">Русский</h4>
                  <p className="font-medium">{selectedItem.nameRu}</p>
                  <p className="text-sm text-muted-foreground mt-1">{selectedItem.descriptionRu}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground">English</h4>
                  <p className="font-medium">{selectedItem.nameEn}</p>
                  <p className="text-sm text-muted-foreground mt-1">{selectedItem.descriptionEn}</p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t">
                <div>
                  <span className="text-sm text-muted-foreground">Turi: </span>
                  <Badge variant="secondary">
                    {menuTypes.find(type => type.value === selectedItem.type)?.label}
                  </Badge>
                </div>
                <span className="text-2xl font-bold text-primary">
                  {selectedItem.price.toLocaleString()} so'm
                </span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}