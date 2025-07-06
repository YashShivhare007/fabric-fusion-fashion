
import { Sparkles } from "lucide-react";

export const Header = () => {
  return (
    <header className="relative z-10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-rose-500 to-purple-500 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
            Fabric Fusion
          </span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">Gallery</a>
          <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">How it Works</a>
          <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">About</a>
        </nav>
      </div>
    </header>
  );
};
