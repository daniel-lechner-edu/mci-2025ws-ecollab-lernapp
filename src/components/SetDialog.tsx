import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface SetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (title: string) => void;
  initialTitle?: string;
  title: string;
}

export function SetDialog({
  open,
  onOpenChange,
  onSave,
  initialTitle,
  title,
}: SetDialogProps) {
  const [setTitle, setSetTitle] = useState("");

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen && initialTitle) {
      setSetTitle(initialTitle);
    } else if (!isOpen) {
      setSetTitle("");
    }
    onOpenChange(isOpen);
  };

  const handleSave = () => {
    if (setTitle.trim()) {
      onSave(setTitle.trim());
      setSetTitle("");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Input
            placeholder="Set title"
            value={setTitle}
            onChange={(e) => setSetTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
          />
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
