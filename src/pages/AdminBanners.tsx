import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Eye, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const demoBanners = [
  {
    id: '1',
    name: 'Yangi menyu aksiyasi',
    description: 'Bizning yangi menyu taqdim etilmoqda!',
    media: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    isActive: true
  }
];

export default function AdminBanners() {
  const [banners, setBanners] = useState(demoBanners);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '', media: null as File | null, isActive: true });
  const { toast } = useToast();

  const toggleStatus = async (bannerId: string) => {
    setBanners(prev => prev.map(banner => 
      banner.id === bannerId ? { ...banner, isActive: !banner.isActive } : banner
    ));
    toast({ title: "Holat o'zgartirildi" });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Reklamalar boshqaruvi</h1>
          <p className="text-muted-foreground">Reklama bannerlarni boshqaring</p>
        </div>
        <Button onClick={() => setShowAddModal(true)} variant="restaurant">
          <Plus className="h-4 w-4 mr-2" />
          Yangi reklama
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Reklamalar ro'yxati</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3">#</th>
                  <th className="text-left py-3">Nomi</th>
                  <th className="text-left py-3">Tavsif</th>
                  <th className="text-left py-3">Media</th>
                  <th className="text-left py-3">Holati</th>
                  <th className="text-center py-3">Amallar</th>
                </tr>
              </thead>
              <tbody>
                {banners.map((banner, index) => (
                  <tr key={banner.id} className="border-b">
                    <td className="py-3">{index + 1}</td>
                    <td className="py-3 font-medium">{banner.name}</td>
                    <td className="py-3">{banner.description}</td>
                    <td className="py-3">
                      <img src={banner.media} alt={banner.name} className="w-12 h-12 object-cover rounded" />
                    </td>
                    <td className="py-3">
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
                    <td className="py-3">
                      <div className="flex space-x-2 justify-center">
                        <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}