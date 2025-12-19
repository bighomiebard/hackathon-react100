/**
 * Reusable page layout component
 * Handles: page padding, centered title header, optional action button, central panel
 * UI-only, engine-agnostic
 */
export default function PageFrame({ 
  title, 
  actionButton, 
  children, 
  panelClassName = "",
  animate = true 
}) {
  const animationClasses = animate ? "panel-enter" : "";

  return (
    <div className="w-full flex flex-col min-h-screen bg-slate-900 p-6 md:p-10">
      {/* Header at top */}
      <div className="grid grid-cols-3 items-center mb-12">
        <div></div>
        <h1 className="text-5xl font-bold text-white text-center">
          {title}
        </h1>
        <div className="flex justify-end">
          {actionButton}
        </div>
      </div>

      {/* Panel centered in remaining space with entrance animation */}
      <div className="flex-1 flex items-center justify-center">
        <div className={`w-full max-w-6xl p-12 md:p-16 rounded-2xl bg-black/30 ${animationClasses} ${panelClassName}`}>
          <div className="flex flex-col gap-12 items-center">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
