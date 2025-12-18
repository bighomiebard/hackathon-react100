import { useState } from "react";

import StartPage from "./Components/windowScreens/startPage.jsx";
import MenuPage from "./Components/windowScreens/menuPage.jsx";
import DifficultyPage from "./Components/windowScreens/difficultyPage.jsx";
import ModePage from "./Components/windowScreens/modePage.jsx";
import KeysetPage from "./Components/windowScreens/keysetPage.jsx";
import KeybindPage from "./Components/windowScreens/keybindPage.jsx";
import LeaderboardPage from "./Components/windowScreens/lboardPage.jsx";
import PlayPage from "./Components/windowScreens/playPage.jsx";
import EndPage from "./Components/windowScreens/endPage.jsx";
import { VIEWS } from "./Components/windowScreens/pageHandler.jsx";


export default function App() {

  //current view state
  const [view, setView] = useState(VIEWS.HOME);

  //changes view based on state
  function renderView() {
    switch (view) {
      case VIEWS.HOME:
        return <StartPage setView={setView} VIEWS={VIEWS} />;

      case VIEWS.MENU:
        return <MenuPage setView={setView} VIEWS={VIEWS} />;

      case VIEWS.DIFFICULTY:
        return <DifficultyPage setView={setView} VIEWS={VIEWS} />;

      case VIEWS.MODE:
        return <ModePage setView={setView} VIEWS={VIEWS} />;

      case VIEWS.KEYSET:
        return <KeysetPage setView={setView} VIEWS={VIEWS} />;

      case VIEWS.KEYBINDS:
        return <KeybindPage setView={setView} VIEWS={VIEWS} />;

      case VIEWS.LEADERBOARD:
        return <LeaderboardPage setView={setView} VIEWS={VIEWS} />;

      case VIEWS.PLAY:
        return <PlayPage setView={setView} VIEWS={VIEWS} />;

      case VIEWS.END:
        return <EndPage setView={setView} VIEWS={VIEWS} />;

      default:
        return <StartPage setView={setView} VIEWS={VIEWS} />;
    }
  }

  return (
    <>
      {renderView()}
    </>
  );
}