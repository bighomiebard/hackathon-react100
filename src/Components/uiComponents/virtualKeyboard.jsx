const keyRows = [
  ["Esc", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace"],
  ["Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"],
  ["CapsLock", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "Enter"],
  ["Shift", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "Shift"],
  ["Control", "Alt", "Space", "Alt", "Control"],
  ["ArrowUp"],
  ["ArrowLeft", "ArrowDown", "ArrowRight"],
];

export default function VirtualKeyboard({ 
  selectedKeys = [], 
  onKeyClick 
}) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="flex flex-col gap-2">
        {keyRows.map((row, rowIdx) => (
          <div key={rowIdx} className="flex gap-2 justify-center flex-wrap">
            {row.map((key) => {
              const isSelected = selectedKeys.includes(key);

              return (
                <button
                  key={key}
                  onClick={() => onKeyClick(key)}
                  className={`
                    px-4 py-3 rounded font-semibold text-sm
                    transition-all duration-200
                    ${
                      isSelected
                        ? "bg-green-500 text-white shadow-lg"
                        : "bg-gray-600 text-gray-100 hover:bg-gray-500"
                    }
                    ${
                      key === "Space"
                        ? "px-20"
                        : key === "Shift" ||
                          key === "Control" ||
                          key === "Alt"
                        ? "px-6"
                        : "px-4"
                    }
                  `}
                >
                  {key}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
