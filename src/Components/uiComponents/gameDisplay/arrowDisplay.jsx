export default function ArrowDisplay({ arrows = [], currentIndex = 0, failed = false, failureTime = null, failedIndex = null }) {
  const renderArrow = (direction, color) => {
    // SVG arrow pointing up, will be rotated based on direction
    const rotations = {
      up: 0,
      right: 90,
      down: 180,
      left: 270,
    };

    return (
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        style={{ transform: `rotate(${rotations[direction]}deg)` }}
      >
        {/* Arrow pointing up */}
        <polygon
          points="60,10 110,90 80,90 80,110 40,110 40,90 10,90"
          fill={color}
        />
      </svg>
    );
  };

  const getArrowColor = (idx) => {
    // Show red on the failed arrow immediately
    if (failed && failedIndex !== null && idx === failedIndex) {
      return "#ef4444"; // red on the arrow that was inputted incorrectly
    }
    
    if (idx < currentIndex) {
      return "#22c55e"; // green on successfully inputted arrows
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
      <div className="flex gap-12 flex-wrap justify-center">
        {arrows.length > 0 ? (
          arrows.map((dir, idx) => (
            <div key={idx}>
              {renderArrow(dir, getArrowColor(idx))}
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-lg">Ready?</p>
        )}
      </div>
    </div>
  );
}