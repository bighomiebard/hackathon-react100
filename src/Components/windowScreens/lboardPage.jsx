import { useState, useEffect } from "react";
import Button from "../uiComponents/button.jsx";
import Leaderboard from "../uiComponents/lboardComponent.jsx";
import KeysetFilterGroup from "../uiComponents/checkboxes/filterBoxes.jsx";
import { VIEWS } from "./pageHandler.jsx";
import { fetchTopScores } from "../../api/lboardAPI.js";

const COLUMN_CONFIG = [
  { id: "normal", label: "normal" },
  { id: "hard", label: "hard" },
  { id: "impossible", label: "impossible" },
];

export default function LeaderboardPage({ setView }) {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeKeysets, setActiveKeysets] = useState(["arrows", "wasd", "dev"]);

  useEffect(() => {
    const loadScores = async () => {
      try {
        setLoading(true);
        setError(null);
        const topScores = await fetchTopScores(100);
        setScores(topScores);
      } catch (err) {
        console.error("Failed to load leaderboard:", err);
        setError("Failed to load leaderboard");
      } finally {
        setLoading(false);
      }
    };

    loadScores();
  }, []);

  // Filter by active keysets, then partition by difficulty
  const getEntriesForColumn = (difficulty) => {
    return scores.filter(
      (entry) =>
        entry.difficulty === difficulty && activeKeysets.includes(entry.keyset)
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-800 p-6 md:p-10">
      {/* Header */}
      <div className="grid grid-cols-3 items-center mb-12">
        <div></div>
        <h1 className="text-5xl font-bold text-white text-center">
          leaderboard
        </h1>
        <div className="flex justify-end">
          <Button
            onClick={() => setView(VIEWS.MENU)}
            variant="grey"
            size="small"
          >
            done
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex gap-8 flex-1">
        {/* Left Sidebar - Keyset Filter */}
        <div className="flex flex-col gap-4 pt-4">
          <KeysetFilterGroup
            value={activeKeysets}
            onChange={setActiveKeysets}
          />
        </div>

        {/* Center - Three Leaderboards */}
        <div className="flex-1 flex justify-center items-start gap-8">
          {COLUMN_CONFIG.map((column) => (
            <div key={column.id} className="flex flex-col items-center gap-3 flex-shrink-0" style={{ paddingTop: "1rem", paddingBottom: "6rem", paddingLeft: "3.5rem", paddingRight: "3.5rem" }}>
                {/* Difficulty Label */}
                <div className="text-center">
                  <h3 className="text-white font-semibold capitalize text-lg">
                    {column.label}
                  </h3>
                </div>

                {/* Leaderboard */}
               {!loading && !error && (
                  <Leaderboard entries={getEntriesForColumn(column.id)} />
                )}

                {loading && (
                  <div className="w-[20rem] h-[45rem] bg-gray-800 border-2 border-gray-600 rounded-lg p-6 flex items-center justify-center">
                    <p className="text-gray-400 text-sm">loading...</p>
                  </div>
                )}

                {error && (
                  <div className="w-[20rem] h-[45rem] bg-gray-800 border-2 border-gray-600 rounded-lg p-6 flex items-center justify-center">
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}