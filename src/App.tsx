import { useState } from "react";
import { HomePage } from "./components/HomePage";
import { SetDetailPage } from "./components/SetDetailPage";
import { Footer } from "./components/Footer";

function App() {
  const [currentView, setCurrentView] = useState<{ type: "home" } | { type: "set"; setId: string }>({
    type: "home",
  });

  const handleOpenSet = (setId: string) => {
    setCurrentView({ type: "set", setId });
  };

  const handleBackToHome = () => {
    setCurrentView({ type: "home" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        {currentView.type === "home" ? (
          <HomePage onOpenSet={handleOpenSet} />
        ) : (
          <SetDetailPage setId={currentView.setId} onBack={handleBackToHome} />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
