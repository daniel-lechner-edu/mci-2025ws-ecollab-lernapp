import { useRef } from "react";
import { Button } from "./ui/button";
import { Download, Upload } from "lucide-react";
import { downloadJSON, parseJSONFile } from "../utils";
import { useStore } from "../store";

export function ImportExport() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const exportData = useStore((state) => state.exportData);
  const importData = useStore((state) => state.importData);

  const handleExport = () => {
    const data = exportData();
    downloadJSON(data, `flashcards-${Date.now()}.json`);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const data = await parseJSONFile(file);
      if (data.sets && data.cards) {
        importData(data);
      } else {
        alert("Invalid file format");
      }
    } catch (error) {
      alert("Error reading file");
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex gap-2">
      <Button onClick={handleExport} variant="outline" size="sm">
        <Download className="w-4 h-4 mr-2" />
        Export
      </Button>
      <Button onClick={handleImportClick} variant="outline" size="sm">
        <Upload className="w-4 h-4 mr-2" />
        Import
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
