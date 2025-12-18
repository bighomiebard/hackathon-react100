export default function DevDisplay({ sequence = [], currentIndex = 0, failed = false, failureTime = null, failedIndex = null }) {
  const getKeyColor = (idx) => {
    // Show red on the failed key immediately
    if (failed && failedIndex !== null && idx === failedIndex) {
      return "#ef4444"; // red on the key that was inputted incorrectly
    }
    
    if (idx < currentIndex) {
      return "#22c55e"; // green on successfully inputted keys
    } else if (idx === currentIndex) {
      return "#9ca3af"; // lighter grey for current
    } else {
      return "#6b7280"; // default grey
    }
  };

  // Shake happens immediately on failure
  const shouldShake = failed && failureTime;

  return (
    <div className={`bg-gray-800 border-4 border-gray-600 rounded-lg p-8 min-h-40 flex items-center justify-center ${shouldShake ? 'shake' : ''}`}>
      <div className="w-full flex justify-evenly items-center">
        {sequence.length > 0 ? (
          sequence.map((key, idx) => (
            <div
              key={idx}
              className="w-24 h-24 flex items-center justify-center rounded font-bold transition-colors flex-shrink-0"
              style={{ backgroundColor: getKeyColor(idx), color: "#ffffff", fontSize: "4.5rem", fontFamily: "monospace", lineHeight: "1" }}
            >
              {key}
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-lg">Ready?</p>
        )}
      </div>
    </div>
  );
}
