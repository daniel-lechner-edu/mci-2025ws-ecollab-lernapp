import { Badge } from "./ui/badge";
import { X } from "lucide-react";

interface TagFilterProps {
  availableTags: string[];
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
}

export function TagFilter({ availableTags, selectedTags, onToggleTag }: TagFilterProps) {
  if (availableTags.length === 0) return null;

  return (
    <div>
      <label className="text-sm font-medium mb-2 block">Filter by tags</label>
      <div className="flex flex-wrap gap-2">
        {availableTags.map((tag) => {
          const isSelected = selectedTags.includes(tag);
          return (
            <Badge
              key={tag}
              variant={isSelected ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => onToggleTag(tag)}
            >
              {tag}
              {isSelected && <X className="w-3 h-3 ml-1" />}
            </Badge>
          );
        })}
      </div>
    </div>
  );
}
