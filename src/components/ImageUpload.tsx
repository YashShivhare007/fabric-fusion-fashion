
import { useState, useRef } from "react";
import { Upload, Camera, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ImageUploadProps {
  uploadedImage: string | null;
  onImageUpload: (imageUrl: string | null) => void;
}

export const ImageUpload = ({ uploadedImage, onImageUpload }: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      
      const reader = new FileReader();
      reader.onload = () => {
        onImageUpload(reader.result as string);
        toast.success("Photo uploaded successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    onImageUpload(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-xl">
      <div className="flex items-center gap-2 mb-6">
        <Camera className="w-5 h-5 text-purple-500" />
        <h2 className="text-2xl font-bold text-gray-800">Upload Your Photo</h2>
      </div>

      {!uploadedImage ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-purple-300 rounded-2xl p-12 text-center cursor-pointer hover:border-purple-500 hover:bg-purple-50/50 transition-all duration-300 group"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-100 to-rose-100 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Upload className="w-8 h-8 text-purple-500" />
          </div>
          
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Upload Your Photo</h3>
          <p className="text-gray-500 text-sm mb-4">
            Choose a clear photo of yourself for the best results
          </p>
          
          <Button 
            variant="outline"
            className="border-purple-300 text-purple-600 hover:bg-purple-50"
          >
            Select Photo
          </Button>
          
          <p className="text-xs text-gray-400 mt-3">
            Supports JPG, PNG up to 5MB
          </p>
        </div>
      ) : (
        <div className="relative rounded-2xl overflow-hidden">
          <img
            src={uploadedImage}
            alt="Uploaded photo"
            className="w-full h-64 object-cover"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          
          <Button
            onClick={handleRemoveImage}
            variant="destructive"
            size="sm"
            className="absolute top-3 right-3 w-8 h-8 p-0 rounded-full"
          >
            <X className="w-4 h-4" />
          </Button>
          
          <div className="absolute bottom-3 left-3 text-white text-sm font-medium">
            Photo Ready ✨
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};
