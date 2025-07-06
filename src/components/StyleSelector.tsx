
import { Check, Shirt } from "lucide-react";

interface StyleSelectorProps {
  selectedStyle: string | null;
  onStyleSelect: (styleId: string) => void;
}

const kurtiStyles = [
  {
    id: "straight-cut",
    name: "Straight Cut",
    description: "Classic and versatile",
    icon: "👗"
  },
  {
    id: "a-line",
    name: "A-Line",
    description: "Flattering and elegant",
    icon: "👘"
  },
  {
    id: "anarkali",
    name: "Anarkali",
    description: "Traditional and graceful",
    icon: "🥻"
  },
  {
    id: "palazzo-set",
    name: "Palazzo Set",
    description: "Modern and comfortable",
    icon: "👔"
  }
];

export const StyleSelector = ({ selectedStyle, onStyleSelect }: StyleSelectorProps) => {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-xl">
      <div className="flex items-center gap-2 mb-6">
        <Shirt className="w-5 h-5 text-purple-500" />
        <h2 className="text-2xl font-bold text-gray-800">Select Kurti Style</h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {kurtiStyles.map((style) => (
          <div
            key={style.id}
            onClick={() => onStyleSelect(style.id)}
            className={`relative p-4 rounded-2xl cursor-pointer transition-all duration-300 border-2 ${
              selectedStyle === style.id
                ? "border-purple-500 bg-purple-50/50 shadow-lg scale-105"
                : "border-gray-200 hover:border-purple-300 hover:bg-purple-50/30 hover:shadow-md"
            }`}
          >
            <div className="text-center">
              <div className="text-3xl mb-2">{style.icon}</div>
              <h3 className="font-semibold text-gray-800 mb-1">{style.name}</h3>
              <p className="text-sm text-gray-600">{style.description}</p>
            </div>
            
            {selectedStyle === style.id && (
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
