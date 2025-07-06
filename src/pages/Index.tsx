
import { useState } from "react";
import { FabricGallery } from "@/components/FabricGallery";
import { ImageUpload } from "@/components/ImageUpload";
import { StyleSelector } from "@/components/StyleSelector";
import { GenerationPreview } from "@/components/GenerationPreview";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Sparkles, Upload, Palette, Wand2 } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [selectedFabric, setSelectedFabric] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!selectedFabric || !uploadedImage || !selectedStyle) {
      toast.error("Please select fabric, upload your image, and choose a kurti style");
      return;
    }

    setIsGenerating(true);
    // Simulate AI generation for demo
    setTimeout(() => {
      setIsGenerating(false);
      toast.success("Your custom kurti design is ready!");
    }, 3000);
  };

  const isReadyToGenerate = selectedFabric && uploadedImage && selectedStyle;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-100 to-purple-100 rounded-full text-sm font-medium text-purple-700 mb-6">
            <Sparkles className="w-4 h-4" />
            AI-Powered Fashion Design
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-rose-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            Fabric Fusion
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Transform your style with AI. Upload your photo, choose exquisite fabrics, 
            and see yourself in stunning custom kurtis that preserve every detail of the fabric design.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20 shadow-lg">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 flex items-center justify-center">
              <Palette className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Choose Fabric</h3>
            <p className="text-gray-600">Select from our premium fabric collection</p>
          </div>
          
          <div className="text-center p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20 shadow-lg">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center">
              <Upload className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Upload Photo</h3>
            <p className="text-gray-600">Share your photo and select kurti style</p>
          </div>
          
          <div className="text-center p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20 shadow-lg">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 flex items-center justify-center">
              <Wand2 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">AI Magic</h3>
            <p className="text-gray-600">Watch AI create your perfect kurti</p>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left Column */}
          <div className="space-y-8">
            <FabricGallery 
              selectedFabric={selectedFabric}
              onFabricSelect={setSelectedFabric}
            />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <ImageUpload 
              uploadedImage={uploadedImage}
              onImageUpload={setUploadedImage}
            />
            
            <StyleSelector 
              selectedStyle={selectedStyle}
              onStyleSelect={setSelectedStyle}
            />
          </div>
        </div>

        {/* Generate Button */}
        <div className="text-center mb-8">
          <Button 
            onClick={handleGenerate}
            disabled={!isReadyToGenerate || isGenerating}
            size="lg"
            className="px-8 py-6 text-lg font-semibold bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-500 hover:from-rose-600 hover:via-purple-600 hover:to-indigo-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <Wand2 className="w-5 h-5 mr-2 animate-spin" />
                Creating Your Design...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Generate My Kurti
              </>
            )}
          </Button>
        </div>

        {/* Preview Section */}
        {(isGenerating || isReadyToGenerate) && (
          <GenerationPreview 
            isGenerating={isGenerating}
            selectedFabric={selectedFabric}
            selectedStyle={selectedStyle}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
