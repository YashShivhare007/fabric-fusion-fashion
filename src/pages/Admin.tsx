
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Upload, Trash2, Edit, Settings, LogOut, Sparkles } from 'lucide-react';
import { Database } from '@/integrations/supabase/types';

type Fabric = Database['public']['Tables']['fabrics']['Row'];

export const AdminPanel = () => {
  const { signOut, profile } = useAuth();
  const [fabrics, setFabrics] = useState<Fabric[]>([]);
  const [loading, setLoading] = useState(false);
  const [fabricForm, setFabricForm] = useState({
    name: '',
    description: '',
    fabric_type: '',
    price: ''
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [editingFabric, setEditingFabric] = useState<Fabric | null>(null);

  useEffect(() => {
    fetchFabrics();
  }, []);

  const fetchFabrics = async () => {
    const { data, error } = await supabase
      .from('fabrics')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      toast.error('Failed to fetch fabrics');
    } else {
      setFabrics(data || []);
    }
  };

  const handleImageUpload = async (fabricId: string) => {
    if (!selectedImage) return null;

    const fileExt = selectedImage.name.split('.').pop();
    const fileName = `${fabricId}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from('fabrics')
      .upload(fileName, selectedImage, { upsert: true });

    if (error) {
      throw error;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('fabrics')
      .getPublicUrl(fileName);

    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedImage && !editingFabric) {
      toast.error('Please select an image');
      return;
    }

    setLoading(true);
    
    try {
      if (editingFabric) {
        // Update existing fabric
        let imageUrl = editingFabric.image_url;
        
        if (selectedImage) {
          imageUrl = await handleImageUpload(editingFabric.id);
        }

        const { error } = await supabase
          .from('fabrics')
          .update({
            name: fabricForm.name,
            description: fabricForm.description,
            fabric_type: fabricForm.fabric_type,
            price: fabricForm.price ? parseFloat(fabricForm.price) : null,
            image_url: imageUrl,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingFabric.id);

        if (error) throw error;
        toast.success('Fabric updated successfully');
      } else {
        // Create new fabric
        const { data: fabricData, error: fabricError } = await supabase
          .from('fabrics')
          .insert({
            name: fabricForm.name,
            description: fabricForm.description,
            fabric_type: fabricForm.fabric_type,
            price: fabricForm.price ? parseFloat(fabricForm.price) : null,
            image_url: 'temp' // Temporary URL
          })
          .select()
          .single();

        if (fabricError) throw fabricError;

        const imageUrl = await handleImageUpload(fabricData.id);
        
        const { error: updateError } = await supabase
          .from('fabrics')
          .update({ image_url: imageUrl })
          .eq('id', fabricData.id);

        if (updateError) throw updateError;
        toast.success('Fabric added successfully');
      }

      // Reset form
      setFabricForm({ name: '', description: '', fabric_type: '', price: '' });
      setSelectedImage(null);
      setEditingFabric(null);
      fetchFabrics();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (fabric: Fabric) => {
    setEditingFabric(fabric);
    setFabricForm({
      name: fabric.name,
      description: fabric.description || '',
      fabric_type: fabric.fabric_type || '',
      price: fabric.price?.toString() || ''
    });
  };

  const handleDelete = async (fabricId: string) => {
    if (!confirm('Are you sure you want to delete this fabric?')) return;

    const { error } = await supabase
      .from('fabrics')
      .delete()
      .eq('id', fabricId);

    if (error) {
      toast.error('Failed to delete fabric');
    } else {
      toast.success('Fabric deleted successfully');
      fetchFabrics();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-rose-500 to-purple-500 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
                Tulsi Fabrics
              </span>
              <span className="ml-2 px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                Admin Panel
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Welcome, {profile?.full_name}</span>
            <Button onClick={signOut} variant="outline" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <Tabs defaultValue="fabrics" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="fabrics">Manage Fabrics</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="fabrics" className="space-y-6">
            {/* Add/Edit Fabric Form */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {editingFabric ? 'Edit Fabric' : 'Add New Fabric'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Fabric Name</Label>
                      <Input
                        id="name"
                        value={fabricForm.name}
                        onChange={(e) => setFabricForm(prev => ({ ...prev, name: e.target.value }))}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="fabric_type">Fabric Type</Label>
                      <Input
                        id="fabric_type"
                        value={fabricForm.fabric_type}
                        onChange={(e) => setFabricForm(prev => ({ ...prev, fabric_type: e.target.value }))}
                        placeholder="e.g., Cotton, Silk, Chiffon"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={fabricForm.description}
                      onChange={(e) => setFabricForm(prev => ({ ...prev, description: e.target.value }))}
                      rows={3}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Price (Optional)</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={fabricForm.price}
                        onChange={(e) => setFabricForm(prev => ({ ...prev, price: e.target.value }))}
                        placeholder="0.00"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="image">Fabric Image</Label>
                      <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setSelectedImage(e.target.files?.[0] || null)}
                        required={!editingFabric}
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button type="submit" disabled={loading}>
                      <Upload className="w-4 h-4 mr-2" />
                      {editingFabric ? 'Update Fabric' : 'Add Fabric'}
                    </Button>
                    
                    {editingFabric && (
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => {
                          setEditingFabric(null);
                          setFabricForm({ name: '', description: '', fabric_type: '', price: '' });
                          setSelectedImage(null);
                        }}
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Fabrics List */}
            <Card>
              <CardHeader>
                <CardTitle>Current Fabrics ({fabrics.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {fabrics.map((fabric) => (
                    <div key={fabric.id} className="border rounded-lg p-4 space-y-2">
                      <img
                        src={fabric.image_url}
                        alt={fabric.name}
                        className="w-full h-32 object-cover rounded"
                      />
                      <h3 className="font-semibold">{fabric.name}</h3>
                      <p className="text-sm text-gray-600">{fabric.fabric_type}</p>
                      {fabric.price && (
                        <p className="text-sm font-medium">₹{fabric.price}</p>
                      )}
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(fabric)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(fabric.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analytics & Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Analytics dashboard coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
