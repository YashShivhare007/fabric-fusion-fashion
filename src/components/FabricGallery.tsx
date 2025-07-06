
import { Check, Sparkles } from "lucide-react";
import { Database } from "@/integrations/supabase/types";

type Fabric = Database['public']['Tables']['fabrics']['Row'];

interface FabricGalleryProps {
  fabrics: Fabric[];
  selectedFabric: string | null;
  onFabricSelect: (fabricId: string) => void;
}

export const FabricGallery = ({ fabrics, selectedFabric, onFabricSelect }: FabricGalleryProps) => {
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
              src={fabric.image_url}
              alt={fabric.name}
              className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-500"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
              <h3 className="font-semibold text-sm">{fabric.name}</h3>
              <p className="text-xs opacity-90">{fabric.fabric_type}</p>
              {fabric.price && (
                <p className="text-xs font-medium">₹{fabric.price}</p>
              )}
            </div>
            
            {selectedFabric === fabric.id && (
              <div className="absolute top-2 right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        ))}
      </div>
      
      {fabrics.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No fabrics available. Please contact admin to add fabrics.</p>
        </div>
      )}
    </div>
  );
};
