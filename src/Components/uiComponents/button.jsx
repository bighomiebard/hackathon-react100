export default function Button({ 
  children, 
  onClick, 
  className = "",
  variant = "primary",
  size = "large"
}) {
  const baseStyles = "font-bold select-none rounded-lg shadow-md transition-transform transition-[filter,background-color,border-color] duration-150 ease-out hover:-translate-y-[1px] active:translate-y-[1px] hover:brightness-110 active:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black/50 min-h-[clamp(52px,6vw,140px)] flex items-center justify-center";
  
  const variants = {
    primary: "text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600",
    secondary: "text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700",
    grey: "text-gray-800 bg-gray-400 hover:bg-gray-500 active:brightness-90",
  };
  
  const sizes = {
    small: "px-[clamp(18px,3vw,40px)] py-[clamp(10px,1.5vw,20px)] text-[clamp(1.0625rem,1.25vw,1.375rem)]",
    medium: "px-[clamp(36px,4vw,80px)] py-[clamp(18px,2vw,40px)] text-[clamp(1.25rem,1.5vw,2rem)]",
    large: "px-[clamp(52px,5vw,110px)] py-[clamp(28px,2.5vw,56px)] text-[clamp(1.625rem,2vw,2.75rem)]",
  };
  
  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}
