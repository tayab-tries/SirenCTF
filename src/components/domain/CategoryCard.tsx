import React from "react";
import { 
  Globe, 
  KeyRound, 
  FileSearch, 
  Radar, 
  Binary, 
  Terminal, 
  Cpu, 
  Sparkles
} from "lucide-react";
import { Category } from "@/lib/types";

interface CategoryCardProps {
  category: Category;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe,
  KeyRound,
  FileSearch,
  Radar,
  Binary,
  Terminal,
  Cpu,
  Sparkles,
};

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const IconComponent = iconMap[category.iconName] || Terminal;

  return (
    <div className="group relative rounded-xl border border-zinc-800/90 bg-[#15151b]/80 p-6 transition-colors hover:border-red-900/50 font-sans flex flex-col justify-between">
      <div className="space-y-4">
        {/* Top Icon & Domain Badge */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#0d0d11] border border-zinc-800 text-zinc-300 group-hover:text-[#E31B2E] group-hover:border-red-900/60 transition-colors">
            <IconComponent className="h-5 w-5" aria-hidden="true" />
          </div>

          <span className="px-2.5 py-1 text-[10px] font-mono rounded border border-zinc-800 text-zinc-400 bg-zinc-900/80 font-medium">
            DOMAIN // {category.slug.toUpperCase()}
          </span>
        </div>

        {/* Category Name & Description */}
        <div>
          <h3 className="font-mono text-base font-bold text-zinc-100 group-hover:text-[#FF3347] transition-colors">
            {category.name}
          </h3>

          <p className="mt-2 text-xs text-zinc-400 leading-relaxed font-sans line-clamp-3">
            {category.description}
          </p>
        </div>
      </div>

      {/* Bottom Technical Metadata Tag */}
      <div className="mt-5 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[10px] font-mono text-zinc-500">
        <span>CHALLENGE CATEGORY</span>
        <span className="text-zinc-400 group-hover:text-red-400 font-medium tracking-wider">
          UPCOMING SPEC
        </span>
      </div>
    </div>
  );
};
