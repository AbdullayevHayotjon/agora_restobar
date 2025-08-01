import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { API_BASE_URL } from '@/lib/constants';

interface Banner {
  id: string;
  name: string;
  description: string;
  mediaFile: File | null;
  mediaUrl: string;
  isActive: boolean;
  updateDate: string; // Added updateDate field
}

interface BannerFormData {
  name: string;
  description: string;
  media: File | null;
  isActive: boolean;
}

const initialFormData: BannerFormData = {
  name: '',
  description: '',
  media: null,
  isActive: true
};

export default function AdminBanners() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Banner | null>(null);
  const [formData, setFormData] = useState<BannerFormData>(initialFormData);
  const [previewMedia, setPreviewMedia] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormChanged, setIsFormChanged] = useState(false);
  const { toast } = useToast();

  // Video fayl ekanligini aniqlash
  const isVideo = (url: string | null, file: File | null = null) => {
    if (file) {
      return file.type.startsWith('video/');
    }
    return url?.endsWith('.mp4') || false;
  };

  // API'dan ma'lumotlarni olish funksiyasi
  const fetchBanners = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/banner`);
      if (response.ok) {
        const data = await response.json();
        const mappedBanners: Banner[] = (data.value.$values || []).map(item => ({
          id: item.id,
          name: item.title || '',
          description: item.description || '',
          mediaFile: null,
          mediaUrl: `${API_BASE_URL}${item.mediaUrl}`,
          isActive: item.isActive,
          updateDate: item.updateDate || '' // Map updateDate from API
        }));
        setBanners(mappedBanners);
      } else {
        throw new Error('Ma\'lumotlarni olishda xatolik yuz berdi');
      }
    } catch (error) {
      console.error('Xatolik:', error);
      toast({
        title: "Xato",
        description: "Reklama ma'lumotlarini yuklashda xatolik yuz berdi",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Boshlang'ich yuklash
  useEffect(() => {
    fetchBanners();
  }, []);

  const handleInputChange = (field: keyof BannerFormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const validFormats = ['image/png', 'image/jpeg', 'video/mp4'];
      if (!validFormats.includes(file.type)) {
        toast({
          title: "Xato",
          description: "Faqat .png, .jpg yoki .mp4 formatdagi fayllar qabul qilinadi!",
          variant: "destructive",
        });
        return;
      }
      setFormData(prev => ({
        ...prev,
        media: file
      }));
      const previewUrl = URL.createObjectURL(file);
      setPreviewMedia(previewUrl);
    } else {
      setFormData(prev => ({
        ...prev,
        media: null
      }));
      setPreviewMedia(null);
    }
  };

  const validateForm = (isEdit: boolean = false) => {
    if (!formData.name) {
      toast({
        title: "Xato",
        description: "Reklama nomi majburiy!",
        variant: "destructive",
      });
      return false;
    }
    if (!isEdit && !formData.media) {
      toast({
        title: "Xato",
        description: "Media fayli majburiy!",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('Title', formData.name);
      formDataToSend.append('Description', formData.description || '');
      formDataToSend.append('IsActive', formData.isActive.toString());
      if (formData.media) {
        formDataToSend.append('MediaUrl', formData.media);
      } else {
        throw new Error('Media fayli majburiy!');
      }

      const response = await fetch(`${API_BASE_URL}/api/banner`, {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        await fetchBanners();
        setShowAddModal(false);
        setFormData(initialFormData);
        setPreviewMedia(null);

        toast({
          title: "Muvaffaqiyatli!",
          description: "Yangi reklama qo'shildi",
        });
      } else {
        const errorText = await response.text();
        throw new Error(`API xatosi: ${response.status} - ${errorText}`);
      }
    } catch (error) {
      console.error('Xatolik:', error);
      toast({
        title: "Xato",
        description: error instanceof Error ? error.message : "Reklama qo'shishda xatolik yuz berdi",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem) return;

    if (!validateForm(true)) {
      return;
    }

    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('Title', formData.name);
      formDataToSend.append('Description', formData.description || '');
      formDataToSend.append('IsActive', formData.isActive.toString());
      if (formData.media) {
        formDataToSend.append('MediaUrl', formData.media);
      }

      const response = await fetch(`${API_BASE_URL}/api/banner/${selectedItem.id}`, {
        method: 'PUT',
        body: formDataToSend,
      });

      if (response.ok) {
        await fetchBanners();
        setShowEditModal(false);
        setSelectedItem(null);
        setFormData(initialFormData);
        setPreviewMedia(null);
        setIsFormChanged(false);

        toast({
          title: "Muvaffaqiyatli!",
          description: "Reklama yangilandi",
        });
      } else {
        const errorText = await response.text();
        throw new Error(`API xatosi: ${response.status} - ${errorText}`);
      }
    } catch (error) {
      console.error('Xatolik:', error);
      toast({
        title: "Xato",
        description: error instanceof Error ? error.message : "Reklama yangilashda xatolik yuz berdi",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteItem = async () => {
    if (!selectedItem) return;

    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/banner/${selectedItem.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchBanners();
        setShowDeleteModal(false);
        setSelectedItem(null);

        toast({
          title: "Muvaffaqiyatli!",
          description: "Reklama o'chirildi",
        });
      } else {
        const errorText = await response.text();
        throw new Error(`API xatosi: ${response.status} - ${errorText}`);
      }
    } catch (error) {
      console.error('Xatolik:', error);
      toast({
        title: "Xato",
        description: error instanceof Error ? error.message : "Reklama o'chirishda xatolik yuz berdi",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleStatus = async (bannerId: string) => {
    // 1. Avvalgi holatni saqlash
    const previousBanner = banners.find(b => b.id === bannerId);
    if (!previousBanner) return;

    // 2. Optimistik tarzda UI-ni yangilash
    setBanners(prev =>
      prev.map(b =>
        b.id === bannerId ? { ...b, isActive: !b.isActive } : b
      )
    );

    try {
      // 3. API so‘rovi
      const response = await fetch(`${API_BASE_URL}/api/banner/status/${bannerId}`, {
        method: 'PUT',
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API xatosi: ${response.status} - ${errorText}`);
      }

      // 4. Muvaffaqiyatli bo‘lsa, ma'lumotlarni qayta yuklash va toast
      await fetchBanners();
      toast({
        title: "Muvaffaqiyatli",
        description: "Reklama holati o'zgartirildi",
        duration: 3000,
      });
    } catch (error) {
      // 5. Xatolik bo‘lsa, holatni qaytarish va xato toast
      setBanners(prev =>
        prev.map(b =>
          b.id === bannerId ? { ...b, isActive: previousBanner.isActive } : b
        )
      );
      console.error('Xatolik:', error);
      toast({
        title: "Xato",
        description: error instanceof Error ? error.message : "Holatni o'zgartirishda xatolik yuz berdi",
        variant: "destructive"
      });
    }
  };

  const openEditModal = (item: Banner) => {
    setSelectedItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      media: null,
      isActive: item.isActive
    });
    setPreviewMedia(null);
    setShowEditModal(true);
    setIsFormChanged(false);
  };

  const openDeleteModal = (item: Banner) => {
    setSelectedItem(item);
    setShowDeleteModal(true);
  };

  const openViewModal = (item: Banner) => {
    setSelectedItem(item);
    setShowViewModal(true);
  };

  const openAddModal = () => {
    setFormData(initialFormData);
    setPreviewMedia(null);
    setShowAddModal(true);
  };

  // Formadagi o'zgarishlarni kuzatish
  useEffect(() => {
    if (selectedItem) {
      const hasChanges =
        formData.name !== selectedItem.name ||
        formData.description !== selectedItem.description ||
        formData.isActive !== selectedItem.isActive ||
        formData.media !== null;
      setIsFormChanged(hasChanges);
    }
  }, [formData, selectedItem]);

  // Xotirani tozalash
  useEffect(() => {
    return () => {
      if (previewMedia) {
        URL.revokeObjectURL(previewMedia);
      }
    };
  }, [previewMedia]);

  // Format updateDate for display
  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleString('uz-UZ', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-row flex-wrap justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Reklamalar boshqaruvi</h1>
          <p className="text-muted-foreground">Reklama bannerlarni boshqaring</p>
        </div>
        <Button onClick={openAddModal} variant="restaurant">
          <Plus className="h-4 w-4 mr-2" />
          Yangi reklama qo'shish
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Reklamalar ro'yxati ({banners.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2">#</th>
                  <th className="text-left py-3 px-2">Nomi</th>
                  <th className="text-left py-3 px-2">Tavsif</th>
                  <th className="text-left py-3 px-2">Yangilangan sana</th> {/* New column */}
                  <th className="text-left py-3 px-2">Media</th>
                  <th className="text-left py-3 px-2">Holati</th>
                  <th className="text-center py-3 px-2">Amallar</th>
                </tr>
              </thead>
              <tbody>
                {banners.map((banner, index) => (
                  <tr key={banner.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-2">{index + 1}</td>
                    <td className="py-3 px-2 font-medium">{banner.name}</td>
                    <td className="py-3 px-2">{banner.description}</td>
                    <td className="py-3 px-2">{formatDate(banner.updateDate)}</td> {/* Display formatted date */}
                    <td className="py-3 px-2">
                      {isVideo(banner.mediaUrl, banner.mediaFile) ? (
                        <video
                          src={banner.mediaUrl}
                          className="w-12 h-12 rounded"
                          controls
                          autoPlay={false}
                        />
                      ) : (
                        <img
                          src={banner.mediaUrl}
                          alt={banner.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      )}
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={banner.isActive}
                          onCheckedChange={() => toggleStatus(banner.id)}
                        />
                        <Badge variant={banner.isActive ? "default" : "secondary"}>
                          {banner.isActive ? "Faol" : "Nofaol"}
                        </Badge>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex space-x-2 justify-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openViewModal(banner)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditModal(banner)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openDeleteModal(banner)}
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

            {isLoading ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground animate-pulse">Ma'lumotlar yuklanmoqda...</p>
              </div>
            ) : banners.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Hech qanday reklama topilmadi</p>
              </div>
            ) : null}
          </div>
        </CardContent>
      </Card>

      {/* Add Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Yangi reklama qo'shish</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddItem} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nomi <span className="text-red-500">*</span></Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Tavsif</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="media">Media <span className="text-red-500">*</span></Label>
                <Input
                  id="media"
                  type="file"
                  accept="image/png,image/jpeg,video/mp4"
                  onChange={handleMediaChange}
                  required
                  className="cursor-pointer"
                />
                <p className="text-sm text-muted-foreground mt-1">Faqat PNG, JPG yoki MP4 formatda</p>
                {previewMedia && (
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground">Tanlangan media:</p>
                    {isVideo(previewMedia, formData.media) ? (
                      <video
                        src={previewMedia}
                        className="mt-2 w-32 h-32 rounded-lg"
                        controls
                        autoPlay={false}
                      />
                    ) : (
                      <img
                        src={previewMedia}
                        alt="Tanlangan media"
                        className="mt-2 w-32 h-32 object-cover rounded-lg"
                      />
                    )}
                  </div>
                )}
              </div>
              <div>
                <Label htmlFor="isActive">Holati</Label>
                <div className="flex items-center space-x-2 mt-2">
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(value) => handleInputChange('isActive', value)}
                  />
                  <span>{formData.isActive ? "Faol" : "Nofaol"}</span>
                </div>
              </div>
            </div>

            <div className="flex space-x-2 pt-4">
              <Button type="submit" disabled={isLoading} className="flex-1">
                {isLoading ? "Qoʻshilmoqda..." : "Qoʻshish"}
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
        <DialogContent className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Reklamani tahrirlash</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditItem} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="editName">Nomi <span className="text-red-500">*</span></Label>
                <Input
                  id="editName"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="editDescription">Tavsif</Label>
                <Textarea
                  id="editDescription"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="editMedia">Yangi media (ixtiyoriy)</Label>
                <Input
                  id="editMedia"
                  type="file"
                  accept="image/png,image/jpeg,video/mp4"
                  onChange={handleMediaChange}
                  className="cursor-pointer"
                />
                <p className="text-sm text-muted-foreground mt-1">Faqat PNG, JPG yoki MP4 formatda</p>
                {previewMedia ? (
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground">Tanlangan yangi media:</p>
                    {isVideo(previewMedia, formData.media) ? (
                      <video
                        src={previewMedia}
                        className="mt-2 w-32 h-32 rounded-lg"
                        controls
                        autoPlay={false}
                      />
                    ) : (
                      <img
                        src={previewMedia}
                        alt="Tanlangan media"
                        className="mt-2 w-32 h-32 object-cover rounded-lg"
                      />
                    )}
                  </div>
                ) : selectedItem && (
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground">Joriy media:</p>
                    {isVideo(selectedItem.mediaUrl, selectedItem.mediaFile) ? (
                      <video
                        src={selectedItem.mediaUrl}
                        className="mt-2 w-32 h-32 rounded-lg"
                        controls
                        autoPlay={false}
                      />
                    ) : (
                      <img
                        src={selectedItem.mediaUrl}
                        alt={selectedItem.name}
                        className="mt-2 w-32 h-32 object-cover rounded-lg"
                      />
                    )}
                  </div>
                )}
              </div>
              <div>
                <Label htmlFor="editIsActive">Holati</Label>
                <div className="flex items-center space-x-2 mt-2">
                  <Switch
                    id="editIsActive"
                    checked={formData.isActive}
                    onCheckedChange={(value) => handleInputChange('isActive', value)}
                  />
                  <span>{formData.isActive ? "Faol" : "Nofaol"}</span>
                </div>
              </div>
            </div>

            <div className="flex space-x-2 pt-4">
              <Button type="submit" disabled={isLoading || !isFormChanged} className="flex-1">
                {isLoading ? "Yangilanmoqda..." : "Yangilash"}
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
            <DialogTitle>Reklamani o'chirish</DialogTitle>
          </DialogHeader>
          {selectedItem && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
                {isVideo(selectedItem.mediaUrl, selectedItem.mediaFile) ? (
                  <video
                    src={selectedItem.mediaUrl}
                    className="w-16 h-16 rounded-lg"
                    controls
                    autoPlay={false}
                  />
                ) : (
                  <img
                    src={selectedItem.mediaUrl}
                    alt={selectedItem.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                )}
                <div>
                  <h3 className="font-semibold">{selectedItem.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedItem.description}</p>
                </div>
              </div>
              <p className="text-center text-muted-foreground">
                Haqiqatan ham bu reklamani o'chirmoqchimisiz?
              </p>
              <div className="flex space-x-2">
                <Button
                  variant="destructive"
                  onClick={handleDeleteItem}
                  disabled={isLoading}
                  className="flex-1"
                >
                  {isLoading ? "Oʻchirilmoqda..." : "Oʻchirish"}
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
            <DialogTitle>Reklama ma'lumotlari</DialogTitle>
          </DialogHeader>
          {selectedItem && (
            <div className="space-y-6">
              <div className="relative h-64 rounded-lg overflow-hidden">
                {isVideo(selectedItem.mediaUrl, selectedItem.mediaFile) ? (
                  <video
                    src={selectedItem.mediaUrl}
                    className="w-full h-full rounded-lg"
                    controls
                    autoPlay={false}
                  />
                ) : (
                  <img
                    src={selectedItem.mediaUrl}
                    alt={selectedItem.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground">Nomi</h4>
                  <p className="font-medium">{selectedItem.name}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground">Tavsif</h4>
                  <p className="text-sm text-muted-foreground">{selectedItem.description}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground">Yangilangan sana</h4>
                  <p className="text-sm text-muted-foreground">{formatDate(selectedItem.updateDate)}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground">Holati</h4>
                  <Badge variant={selectedItem.isActive ? "default" : "secondary"}>
                    {selectedItem.isActive ? "Faol" : "Nofaol"}
                  </Badge>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}