import { useState } from "react";
import { HomePage } from "./components/HomePage";
import { SetDetailPage } from "./components/SetDetailPage";

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
    <>
      {currentView.type === "home" ? (
        <HomePage onOpenSet={handleOpenSet} />
      ) : (
        <SetDetailPage setId={currentView.setId} onBack={handleBackToHome} />
      )}
    </>
  );
}

export default App;
