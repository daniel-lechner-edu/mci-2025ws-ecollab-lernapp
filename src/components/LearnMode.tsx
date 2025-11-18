import { useState } from "react";
import { Flashcard } from "../types";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight, RotateCcw, Check } from "lucide-react";

interface LearnModeProps {
  cards: Flashcard[];
  onToggleLearned: (id: string) => void;
  onExit: () => void;
}

export function LearnMode({ cards, onToggleLearned, onExit }: LearnModeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  if (cards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <p className="text-muted-foreground mb-4">No cards to learn</p>
        <Button onClick={onExit}>Back to Set</Button>
      </div>
    );
  }

  const currentCard = cards[currentIndex];
  const progress = ((currentIndex + 1) / cards.length) * 100;

  const handleNext = () => {
    setFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const handleToggleLearned = () => {
    onToggleLearned(currentCard.id);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-4">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>
            Card {currentIndex + 1} of {cards.length}
          </span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
          <div
            className="bg-primary h-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div
        className="perspective-1000 cursor-pointer mb-6"
        onClick={handleFlip}
      >
        <div
          className={`relative transition-transform duration-500 transform-style-3d ${
            flipped ? "rotate-y-180" : ""
          }`}
          style={{
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          <Card className="h-96 backface-hidden">
            <CardContent className="flex items-center justify-center h-full p-8">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-4">Front</p>
                <p className="text-2xl">{currentCard.front}</p>
              </div>
            </CardContent>
          </Card>
          <Card
            className="absolute top-0 left-0 w-full h-96 backface-hidden"
            style={{
              transform: "rotateY(180deg)",
              backfaceVisibility: "hidden",
            }}
          >
            <CardContent className="flex items-center justify-center h-full p-8">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-4">Back</p>
                <p className="text-2xl">{currentCard.back}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex gap-2 justify-between">
        <Button onClick={onExit} variant="outline">
          Exit
        </Button>
        <div className="flex gap-2">
          <Button onClick={handlePrev} variant="outline" size="icon">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button onClick={handleFlip} variant="outline">
            <RotateCcw className="w-4 h-4 mr-2" />
            Flip
          </Button>
          <Button
            onClick={handleToggleLearned}
            variant={currentCard.learned ? "default" : "outline"}
          >
            <Check className="w-4 h-4 mr-2" />
            {currentCard.learned ? "Learned" : "Mark Learned"}
          </Button>
          <Button onClick={handleNext} variant="outline" size="icon">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
