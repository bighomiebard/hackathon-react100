export default function Leaderboard({ entries = [] }) {
  return (
    <div
      className="
        w-[20rem]
        min-w-[16rem]
        max-w-[28rem]
        h-[45rem]
        bg-slate-900/70
        border border-white/10
        rounded-2xl
        shadow-lg shadow-black/40
        flex
        flex-col
        overflow-hidden
      "
    >
      <div className="flex-1 flex flex-col overflow-y-hidden hover:overflow-y-auto">
        {Array.from({ length: 25 }).map((_, idx) => (
          <div
            key={idx}
            className="flex items-center px-4 flex-shrink-0 transition-colors duration-150 hover:brightness-125"
            style={{
              height: "calc(100% / 15)",
              backgroundColor: idx % 2 === 0 ? "#3a4654" : "#4a576a",
            }}
          >
            <span className="text-white font-bold flex-1">
              {entries[idx]?.name
                ? `#${idx + 1} ${entries[idx].name} score: ${entries[idx].score}`
                : `#${idx + 1}`
              }
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}