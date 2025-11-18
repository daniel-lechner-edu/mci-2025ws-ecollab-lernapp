import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { X } from "lucide-react";
import { Badge } from "./ui/badge";

interface CardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (front: string, back: string, tags: string[]) => void;
  initialFront?: string;
  initialBack?: string;
  initialTags?: string[];
  title: string;
}

export function CardDialog({
  open,
  onOpenChange,
  onSave,
  initialFront,
  initialBack,
  initialTags,
  title,
}: CardDialogProps) {
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    if (open) {
      setFront(initialFront || "");
      setBack(initialBack || "");
      setTags(initialTags || []);
      setTagInput("");
    }
  }, [open, initialFront, initialBack, initialTags]);

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setFront("");
      setBack("");
      setTags([]);
      setTagInput("");
    }
    onOpenChange(isOpen);
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSave = () => {
    if (front.trim() && back.trim()) {
      onSave(front.trim(), back.trim(), tags);
      setFront("");
      setBack("");
      setTags([]);
      setTagInput("");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Front</label>
            <Textarea
              placeholder="Question or term"
              value={front}
              onChange={(e) => setFront(e.target.value)}
              rows={3}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Back</label>
            <Textarea
              placeholder="Answer or definition"
              value={back}
              onChange={(e) => setBack(e.target.value)}
              rows={3}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Tags</label>
            <div className="flex gap-2 mb-2">
              <Input
                placeholder="Add tag"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
              />
              <Button onClick={handleAddTag} type="button">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="cursor-pointer">
                  {tag}
                  <X
                    className="w-3 h-3 ml-1"
                    onClick={() => handleRemoveTag(tag)}
                  />
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => handleOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
