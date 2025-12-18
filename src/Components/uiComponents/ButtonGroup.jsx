/**
 * ButtonGroup - Layout primitive for arranging buttons
    */
export default function ButtonGroup({
  children,
  direction = "col",
  gap = "gap-4",
  align = "center",
  className = ""
}) {
  const directionClass = direction === "row" ? "flex-row" : "flex-col";
  const alignClass = align === "center" ? "items-center" : align === "start" ? "items-start" : "items-end";

  return (
    <div className={`flex ${directionClass} ${gap} ${alignClass} justify-center ${className}`}>
      {children}
    </div>
  );
}
