import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, Mail, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AdminLoginProps {
  isAuthenticated: boolean;
  onLogin: () => void;
}

export default function AdminLogin({ isAuthenticated, onLogin }: AdminLoginProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Demo credentials - replace with actual authentication
  const DEMO_EMAIL = 'admin@agorarestobar.uz';
  const DEMO_PASSWORD = 'admin123';

  if (isAuthenticated) {
    return <Navigate to="/admin/menu" replace />;
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast({
        title: "Xato",
        description: "Barcha maydonlarni to'ldiring",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Replace with actual API authentication
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (formData.email === DEMO_EMAIL && formData.password === DEMO_PASSWORD) {
        onLogin();
        toast({
          title: "Muvaffaqiyatli!",
          description: "Admin panelga kirish amalga oshirildi",
        });
      } else {
        toast({
          title: "Xato",
          description: "Email yoki parol noto'g'ri",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Xato",
        description: "Tizimda xatolik yuz berdi",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-success/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-elegant">
        <CardHeader className="text-center pb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary mb-4 mx-auto">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-primary">
            Admin Panel
          </CardTitle>
          <p className="text-muted-foreground">
            Agora Restobar Admin Panel
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium flex items-center">
                <Mail className="h-4 w-4 mr-2 text-primary" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@agorarestobar.uz"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="h-12 text-base focus:ring-primary focus:border-primary"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium flex items-center">
                <Lock className="h-4 w-4 mr-2 text-primary" />
                Parol
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="h-12 text-base focus:ring-primary focus:border-primary"
                required
              />
            </div>

            <Button
              type="submit"
              variant="restaurant"
              size="lg"
              className="w-full h-12 text-lg font-semibold"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Kirish...</span>
                </div>
              ) : (
                <>
                  <Shield className="h-5 w-5 mr-2" />
                  Kirish
                </>
              )}
            </Button>
          </form>

          {/* Demo credentials info */}
          <div className="mt-6 p-4 bg-muted/50 rounded-lg text-sm">
            <p className="text-muted-foreground text-center">
              <strong>Demo ma'lumotlar:</strong><br />
              Email: admin@agorarestobar.uz<br />
              Parol: admin123
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}