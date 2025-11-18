import { Flashcard } from "../types";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Pencil, Trash2, Check } from "lucide-react";

interface CardItemProps {
  card: Flashcard;
  onEdit: () => void;
  onDelete: () => void;
  onToggleLearned: () => void;
}

export function CardItem({ card, onEdit, onDelete, onToggleLearned }: CardItemProps) {
  return (
    <Card className={card.learned ? "bg-muted/50" : ""}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{card.front}</CardTitle>
          <div className="flex gap-1">
            <Button
              onClick={onToggleLearned}
              variant={card.learned ? "default" : "outline"}
              size="icon"
              className="h-8 w-8"
            >
              <Check className="w-4 h-4" />
            </Button>
            <Button onClick={onEdit} variant="outline" size="icon" className="h-8 w-8">
              <Pencil className="w-4 h-4" />
            </Button>
            <Button onClick={onDelete} variant="destructive" size="icon" className="h-8 w-8">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-3">{card.back}</p>
        <div className="flex flex-wrap gap-1">
          {card.tags.map((tag, index) => (
            <Badge key={index} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
