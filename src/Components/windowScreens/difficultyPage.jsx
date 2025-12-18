import { useState } from "react";
import Button from "../uiComponents/button.jsx";
import ButtonGroup from "../uiComponents/ButtonGroup.jsx";
import PageFrame from "../uiComponents/PageFrame.jsx";
import { VIEWS } from "./pageHandler.jsx";
import { setDifficulty } from "../gameComponents/config.js";

//defining buttons
const difficulties = [
  { key: "peaceful", label: "peaceful" },
  { key: "easy", label: "easy" },
  { key: "normal", label: "normal" },
  { key: "hard", label: "hard" },
  { key: "impossible", label: "impossible" }
];

export default function DifficultyPage({ setView }) {
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);

  //queues selected difficulty
  const handleSelect = (difficulty) => {
    setSelectedDifficulty(difficulty);
  };

  //applies difficulty and returns to menu
  const handleDone = () => {
    if (selectedDifficulty) {
      setDifficulty(selectedDifficulty.key);
    }
    setView(VIEWS.MENU);
  };

  return (
    <PageFrame
      title="difficulty"
      actionButton={
        <Button onClick={handleDone} variant="grey" size="small">
          done
        </Button>
      }
    >
      <ButtonGroup direction="row" gap="gap-10">
        {difficulties.slice(0, 3).map((d) => (
          <Button
            key={d.key}
            onClick={() => handleSelect(d)}
            variant={selectedDifficulty?.key === d.key ? "primary" : "grey"}
            size="medium"
          >
            {d.label}
          </Button>
        ))}
      </ButtonGroup>

      <ButtonGroup direction="row" gap="gap-10">
        {difficulties.slice(3).map((d) => (
          <Button
            key={d.key}
            onClick={() => handleSelect(d)}
            variant={selectedDifficulty?.key === d.key ? "primary" : "grey"}
            size="medium"
          >
            {d.label}
          </Button>
        ))}
      </ButtonGroup>
    </PageFrame>
  );
}