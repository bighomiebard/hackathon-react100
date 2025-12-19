export default function Card({ 
  title, 
  value, 
  className = "" 
}) {
  return (
    <div className={`
      bg-gradient-to-br from-slate-900/80 to-slate-950/90 border border-cyan-500/30 rounded-lg p-6 text-center
      shadow-lg shadow-cyan-500/10 transition-all duration-150
      relative overflow-hidden
      ${className}
    `}>
      {/* Arcade glow effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent pointer-events-none rounded-lg" />
      
      <div className="relative z-10">
        {title && (
          <h3 className="text-cyan-400/90 text-xs font-bold uppercase mb-2 tracking-wider">
            {title}
          </h3>
        )}
        <p className="text-white text-4xl font-bold font-mono">
          {value}
        </p>
      </div>
    </div>
  );
}
