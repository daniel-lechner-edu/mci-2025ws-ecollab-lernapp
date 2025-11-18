import { useState } from "react";
import { useStore } from "../store";
import { SetCard } from "./SetCard";
import { SetDialog } from "./SetDialog";
import { SearchBar } from "./SearchBar";
import { ImportExport } from "./ImportExport";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

interface HomePageProps {
  onOpenSet: (setId: string) => void;
}

export function HomePage({ onOpenSet }: HomePageProps) {
  const sets = useStore((state) => state.sets);
  const cards = useStore((state) => state.cards);
  const addSet = useStore((state) => state.addSet);
  const updateSet = useStore((state) => state.updateSet);
  const deleteSet = useStore((state) => state.deleteSet);

  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingSet, setEditingSet] = useState<{ id: string; title: string } | null>(null);

  const filteredSets = sets.filter((set) =>
    set.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddSet = () => {
    setEditingSet(null);
    setDialogOpen(true);
  };

  const handleEditSet = (id: string, title: string) => {
    setEditingSet({ id, title });
    setDialogOpen(true);
  };

  const handleSaveSet = (title: string) => {
    if (editingSet) {
      updateSet(editingSet.id, title);
    } else {
      addSet(title);
    }
  };

  const handleDeleteSet = (id: string) => {
    if (window.confirm("Delete this set and all its cards?")) {
      deleteSet(id);
    }
  };

  return (
    <div className="bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Flashcards</h1>
          <ImportExport />
        </div>

        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search sets..."
            />
          </div>
          <Button onClick={handleAddSet}>
            <Plus className="w-4 h-4 mr-2" />
            New Set
          </Button>
        </div>

        {filteredSets.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground mb-4">
              {search ? "No sets found" : "No flashcard sets yet"}
            </p>
            {!search && (
              <Button onClick={handleAddSet}>
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Set
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSets.map((set) => (
              <SetCard
                key={set.id}
                set={set}
                cardCount={cards.filter((c) => c.setId === set.id).length}
                onEdit={() => handleEditSet(set.id, set.title)}
                onDelete={() => handleDeleteSet(set.id)}
                onOpen={() => onOpenSet(set.id)}
              />
            ))}
          </div>
        )}

        <SetDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          onSave={handleSaveSet}
          initialTitle={editingSet?.title}
          title={editingSet ? "Edit Set" : "New Set"}
        />
      </div>
    </div>
  );
}
