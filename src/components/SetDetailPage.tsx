import { useState, useMemo } from "react";
import { useStore } from "../store";
import { CardItem } from "./CardItem";
import { CardDialog } from "./CardDialog";
import { SearchBar } from "./SearchBar";
import { TagFilter } from "./TagFilter";
import { LearnMode } from "./LearnMode";
import { Button } from "./ui/button";
import { ArrowLeft, Plus, Shuffle, GraduationCap } from "lucide-react";
import { shuffleArray, filterCardsBySearch, filterCardsByTags } from "../utils";

interface SetDetailPageProps {
  setId: string;
  onBack: () => void;
}

export function SetDetailPage({ setId, onBack }: SetDetailPageProps) {
  const sets = useStore((state) => state.sets);
  const cards = useStore((state) => state.cards);
  const addCard = useStore((state) => state.addCard);
  const updateCard = useStore((state) => state.updateCard);
  const deleteCard = useStore((state) => state.deleteCard);
  const toggleCardLearned = useStore((state) => state.toggleCardLearned);

  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<{
    id: string;
    front: string;
    back: string;
    tags: string[];
  } | null>(null);
  const [learnMode, setLearnMode] = useState(false);
  const [shuffled, setShuffled] = useState(false);

  const set = sets.find((s) => s.id === setId);
  const setCards = cards.filter((c) => c.setId === setId);

  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    setCards.forEach((card) => card.tags.forEach((tag) => tags.add(tag)));
    return Array.from(tags).sort();
  }, [setCards]);

  const filteredCards = useMemo(() => {
    let filtered = setCards;
    if (search) {
      filtered = filterCardsBySearch(filtered, search);
    }
    if (selectedTags.length > 0) {
      filtered = filterCardsByTags(filtered, selectedTags);
    }
    if (shuffled) {
      filtered = shuffleArray(filtered);
    }
    return filtered;
  }, [setCards, search, selectedTags, shuffled]);

  if (!set) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-muted-foreground mb-4">Set not found</p>
          <Button onClick={onBack}>Back to Home</Button>
        </div>
      </div>
    );
  }

  const handleAddCard = () => {
    setEditingCard(null);
    setDialogOpen(true);
  };

  const handleEditCard = (id: string, front: string, back: string, tags: string[]) => {
    setEditingCard({ id, front, back, tags });
    setDialogOpen(true);
  };

  const handleSaveCard = (front: string, back: string, tags: string[]) => {
    if (editingCard) {
      updateCard(editingCard.id, front, back, tags);
    } else {
      addCard(setId, front, back, tags);
    }
  };

  const handleDeleteCard = (id: string) => {
    if (window.confirm("Delete this card?")) {
      deleteCard(id);
    }
  };

  const handleToggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleStartLearn = () => {
    setShuffled(false);
    setLearnMode(true);
  };

  const handleShuffle = () => {
    setShuffled(!shuffled);
  };

  if (learnMode) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">{set.title}</h1>
            <p className="text-muted-foreground">Learning Mode</p>
          </div>
          <LearnMode
            cards={filteredCards}
            onToggleLearned={toggleCardLearned}
            onExit={() => setLearnMode(false)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button onClick={onBack} variant="outline" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{set.title}</h1>
            <p className="text-muted-foreground">{setCards.length} cards</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleShuffle} variant="outline">
              <Shuffle className="w-4 h-4 mr-2" />
              {shuffled ? "Unshuffle" : "Shuffle"}
            </Button>
            <Button onClick={handleStartLearn} disabled={setCards.length === 0}>
              <GraduationCap className="w-4 h-4 mr-2" />
              Learn
            </Button>
            <Button onClick={handleAddCard}>
              <Plus className="w-4 h-4 mr-2" />
              Add Card
            </Button>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search cards..."
          />
          <TagFilter
            availableTags={availableTags}
            selectedTags={selectedTags}
            onToggleTag={handleToggleTag}
          />
        </div>

        {filteredCards.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground mb-4">
              {search || selectedTags.length > 0 ? "No cards found" : "No cards yet"}
            </p>
            {!search && selectedTags.length === 0 && (
              <Button onClick={handleAddCard}>
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Card
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredCards.map((card) => (
              <CardItem
                key={card.id}
                card={card}
                onEdit={() => handleEditCard(card.id, card.front, card.back, card.tags)}
                onDelete={() => handleDeleteCard(card.id)}
                onToggleLearned={() => toggleCardLearned(card.id)}
              />
            ))}
          </div>
        )}

        <CardDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          onSave={handleSaveCard}
          initialFront={editingCard?.front}
          initialBack={editingCard?.back}
          initialTags={editingCard?.tags}
          title={editingCard ? "Edit Card" : "New Card"}
        />
      </div>
    </div>
  );
}
