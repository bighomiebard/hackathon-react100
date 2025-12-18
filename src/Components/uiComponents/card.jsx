export default function Card({ 
  title, 
  value, 
  className = "" 
}) {
  return (
    <div className={`
      bg-slate-900/70 border border-white/10 rounded-2xl p-6 text-center
      shadow-lg shadow-black/40 transition-transform transition-[filter] duration-150
      ${className}
    `}>
      {title && (
        <h3 className="text-white/70 text-sm font-semibold uppercase mb-2">
          {title}
        </h3>
      )}
      <p className="text-white text-4xl font-bold">
        {value}
      </p>
    </div>
  );
}
