import { FlashcardSet } from "../types";
import { Card, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import { Pencil, Trash2, BookOpen } from "lucide-react";

interface SetCardProps {
  set: FlashcardSet;
  cardCount: number;
  onEdit: () => void;
  onDelete: () => void;
  onOpen: () => void;
}

export function SetCard({ set, cardCount, onEdit, onDelete, onOpen }: SetCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl">{set.title}</CardTitle>
        <CardDescription>{cardCount} cards</CardDescription>
        <div className="flex gap-2 pt-4">
          <Button onClick={onOpen} className="flex-1" size="sm">
            <BookOpen className="w-4 h-4 mr-2" />
            Open
          </Button>
          <Button onClick={onEdit} variant="outline" size="icon">
            <Pencil className="w-4 h-4" />
          </Button>
          <Button onClick={onDelete} variant="destructive" size="icon">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
}
