import { useState } from "react";
import Button from "../uiComponents/button.jsx";
import ButtonGroup from "../uiComponents/ButtonGroup.jsx";
import PageFrame from "../uiComponents/PageFrame.jsx";
import { VIEWS } from "./pageHandler.jsx";
import { setGameMode } from "../gameComponents/config.js";

//defining buttons
const modes = [
  { key: "practice", label: "practice" },
  { key: "ranked", label: "ranked" }
];

export default function ModePage({ setView }) {
  const [selectedMode, setSelectedMode] = useState(null);

    //queues selected mode
  const handleSelect = (mode) => {
    setSelectedMode(mode);
  };

    //applies mode and returns to menu
  const handleDone = () => {
    if (selectedMode) {
      setGameMode(selectedMode.key);
    }
    setView(VIEWS.MENU);
  };

  return (
    <PageFrame
      title="mode"
      actionButton={
        <Button onClick={handleDone} variant="grey" size="small">
          done
        </Button>
      }
    >
      {/* Mode buttons */}
      <ButtonGroup direction="row" gap="gap-10">
        {modes.map((m) => (
          <Button
            key={m.key}
            onClick={() => handleSelect(m)}
            variant={selectedMode?.key === m.key ? "primary" : "grey"}
            size="medium"
          >
            {m.label}
          </Button>
        ))}
      </ButtonGroup>
    </PageFrame>
  );
}