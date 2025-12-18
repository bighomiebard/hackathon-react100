export default function Checkbox({ 
  id, 
  label, 
  checked = false, 
  onChange 
}) {
  return (
    <div className="flex items-center gap-3">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-5 h-5 cursor-pointer accent-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black/50 transition-all duration-150"
      />
      <label 
        htmlFor={id}
        className="text-white/80 text-lg cursor-pointer hover:text-white transition-colors duration-150"
      >
        {label}
      </label>
    </div>
  );
}
