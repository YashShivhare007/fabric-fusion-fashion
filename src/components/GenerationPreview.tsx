
import { Loader2, Download, Share, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GenerationPreviewProps {
  isGenerating: boolean;
  selectedFabric: string | null;
  selectedStyle: string | null;
}

export const GenerationPreview = ({ 
  isGenerating, 
  selectedFabric, 
  selectedStyle 
}: GenerationPreviewProps) => {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        {isGenerating ? "Creating Your Design..." : "Your Custom Kurti"}
      </h2>

      <div className="relative">
        {isGenerating ? (
          <div className="aspect-square bg-gradient-to-br from-purple-100 to-rose-100 rounded-2xl flex items-center justify-center">
            <div className="text-center">
              <Loader2 className="w-16 h-16 text-purple-500 animate-spin mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-700">
                AI is weaving your perfect kurti...
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Preserving every detail of your chosen fabric
              </p>
            </div>
          </div>
        ) : (
          <div className="aspect-square bg-gradient-to-br from-rose-200 to-purple-200 rounded-2xl flex items-center justify-center">
            <div className="text-center p-8">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-rose-400 to-purple-400 flex items-center justify-center">
                <span className="text-4xl">✨</span>
              </div>
              <p className="text-lg font-medium text-gray-700 mb-2">
                Ready to Generate!
              </p>
              <p className="text-sm text-gray-600">
                Click "Generate My Kurti" to see the magic happen
              </p>
            </div>
          </div>
        )}

        {!isGenerating && selectedFabric && selectedStyle && (
          <div className="mt-6 flex justify-center gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Save Design
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Share className="w-4 h-4" />
              Share
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
