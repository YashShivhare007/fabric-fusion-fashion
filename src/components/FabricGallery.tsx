
import { useState } from "react";
import { Check, Sparkles } from "lucide-react";

interface FabricGalleryProps {
  selectedFabric: string | null;
  onFabricSelect: (fabricId: string) => void;
}

const fabrics = [
  {
    id: "silk-paisley",
    name: "Royal Silk Paisley",
    preview: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
    type: "Premium Silk"
  },
  {
    id: "cotton-floral",
    name: "Cotton Floral Print",
    preview: "https://images.unsplash.com/photo-1583743089690-ca019dfd71fd?w=400",
    type: "Pure Cotton"
  },
  {
    id: "chiffon-geometric",
    name: "Chiffon Geometric",
    preview: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400",
    type: "Flowing Chiffon"
  },
  {
    id: "handblock-traditional",
    name: "Handblock Traditional",
    preview: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400",
    type: "Handcrafted"
  },
  {
    id: "banarasi-gold",
    name: "Banarasi Gold Work",
    preview: "https://images.unsplash.com/photo-1583846019346-c6e15a6b5d7f?w=400",
    type: "Luxury Banarasi"
  },
  {
    id: "chanderi-elegant",
    name: "Chanderi Elegance",
    preview: "https://images.unsplash.com/photo-1605513292723-1d00734b2886?w=400",
    type: "Pure Chanderi"
  }
];

export const FabricGallery = ({ selectedFabric, onFabricSelect }: FabricGalleryProps) => {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-xl">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-5 h-5 text-purple-500" />
        <h2 className="text-2xl font-bold text-gray-800">Choose Your Fabric</h2>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {fabrics.map((fabric) => (
          <div
            key={fabric.id}
            onClick={() => onFabricSelect(fabric.id)}
            className={`relative group cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 ${
              selectedFabric === fabric.id
                ? "ring-4 ring-purple-500 ring-offset-2 shadow-2xl scale-105"
                : "hover:shadow-xl hover:scale-102"
            }`}
          >
            <img
              src={fabric.preview}
              alt={fabric.name}
              className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-500"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
              <h3 className="font-semibold text-sm">{fabric.name}</h3>
              <p className="text-xs opacity-90">{fabric.type}</p>
            </div>
            
            {selectedFabric === fabric.id && (
              <div className="absolute top-2 right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
