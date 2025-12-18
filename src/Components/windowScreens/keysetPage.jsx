import { useState } from 'react';
import Button from '../uiComponents/button.jsx';
import ButtonGroup from '../uiComponents/ButtonGroup.jsx';
import PageFrame from '../uiComponents/PageFrame.jsx';
import { VIEWS } from './pageHandler.jsx';
import { setKeyset } from '../gameComponents/config.js';

//defining buttons
const keysets = [
  { key: 'arrows', label: 'arrows' },
  { key: 'dev', label: 'Dev mode' },
];

export default function KeysetPage({ setView }) {
  const [selectedKeyset, setSelectedKeyset] = useState(null);

  //queues selected keyset
  const handleSelect = (keyset) => {
    setSelectedKeyset(keyset);
  };

    //applies keyset and returns to menu
  const handleDone = () => {
    if (selectedKeyset) {
      setKeyset(selectedKeyset.key);
    }
    setView(VIEWS.MENU);
  };

  //navigates to keybind page
  const handleKeybinds = () => {
    if (selectedKeyset) {
      setKeyset(selectedKeyset.key);
    }
    setView(VIEWS.KEYBINDS);
  };

  return (
    <PageFrame
      title="keyset"
      actionButton={
        <Button onClick={handleDone} variant="grey" size="small">
          done
        </Button>
      }
    >
      {/* Row 1: Arrows and Dev mode */}
      <ButtonGroup direction="row" gap="gap-10">
        {keysets.map((k) => (
          <Button
            key={k.key}
            onClick={() => handleSelect(k)}
            variant={selectedKeyset?.key === k.key ? 'primary' : 'grey'}
            size="medium"
          >
            {k.label}
          </Button>
        ))}
      </ButtonGroup>

      {/* Row 2: Keybinds button */}
      {/* <ButtonGroup direction="row" gap="gap-10">
        <Button
          onClick={handleKeybinds}
          variant="grey"
          size="medium"
        >
          keybinds
        </Button>
      </ButtonGroup> */}
    </PageFrame>
  );
}

