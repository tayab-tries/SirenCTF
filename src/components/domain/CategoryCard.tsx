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
    <div className="group relative rounded-xl border border-slate-800/80 bg-slate-900/60 p-6 transition-colors hover:border-cyan-500/40 font-sans flex flex-col justify-between">
      <div className="space-y-4">
        {/* Top Icon & Challenge Count Badge */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-slate-950 border border-slate-800 text-cyan-400 group-hover:border-cyan-500/50 transition-colors">
            <IconComponent className="h-5 w-5" aria-hidden="true" />
          </div>

          <span className={`px-2 py-0.5 text-[10px] font-mono rounded border ${category.colorBadge}`}>
            {category.challengeCount} Challenges
          </span>
        </div>

        {/* Category Name & Description */}
        <div>
          <h3 className="font-mono text-base font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">
            {category.name}
          </h3>

          <p className="mt-2 text-xs text-slate-300 leading-relaxed font-sans line-clamp-3">
            {category.description}
          </p>
        </div>
      </div>

      {/* Bottom Technical Metadata Tag */}
      <div className="mt-5 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono text-slate-400">
        <span>DOMAIN // {category.slug.toUpperCase()}</span>
        <span className="text-cyan-400/80 group-hover:text-cyan-400 font-semibold tracking-wider">
          SPEC
        </span>
      </div>
    </div>
  );
};
