// PROJECT CONTEXT / ARCHITECTURAL INTENT

// This is a React single-page application that behaves like a game, NOT a multi-page website.
// There is exactly one HTML file (index.html). All “pages” are React components that are
// conditionally rendered based on application state.

// NAVIGATION MODEL (IMPORTANT)
// Navigation is controlled by a single piece of state in App.jsx called `view`.
// There is NO routing library and NO redirects.
// Changing screens means updating `view` and letting React re-render.

// The allowed screens are defined as constants in `pageHandler.js`:

//   export const VIEWS = {
//     HOME,
//     MENU,
//     DIFFICULTY,
//     MODE,
//     KEYSET,
//     KEYBINDS,
//     LEADERBOARD,
//     PLAY,
//     END
//   }

// These values represent APP STATES, not file paths.

// App.jsx is the ONLY place where screen-to-component mapping occurs, using conditional rendering:
//   if view === VIEWS.HOME -> render HomePage
//   if view === VIEWS.MENU -> render MenuPage
//   etc.

// PAGE COMPONENT RULES (CRITICAL)
// - Page components (HomePage, MenuPage, PlayPage, etc.) DO NOT manage navigation state.
// - Page components MUST NOT use useState for screen changes.
// - Page components receive `setView` as a prop from App.jsx.
// - Page components request navigation changes by calling:
//     setView(VIEWS.X)

// Pages should be mostly stateless except for UI-local concerns (visual toggles, animations, etc.).

// GAME LOGIC SEPARATION
// - Game logic (timers, sequences, scoring, difficulty, modes) lives in gameComponents/.
// - UI components must not contain game rules.
// - GameScreen (PlayPage) mounts the game engine and unmounts it when leaving the screen.

// BUTTON BEHAVIOR
// Buttons NEVER “navigate” on their own.
// Buttons call handler functions that request a view change via setView.

// EXAMPLE:
//   Button click -> setView(VIEWS.MENU)
//   React re-renders -> App.jsx swaps HomePage for MenuPage

// DO NOT:
// - Use window.location
// - Use routing libraries
// - Store navigation state inside page components
// - Hardcode string literals like "menu" directly in multiple files

// ALWAYS:
// - Import VIEWS from pageHandler.js
// - Use setView(VIEWS.X) for screen transitions
// - Let App.jsx control which component is rendered

// MENTAL MODEL:
// This app is a finite state machine.
// Only one screen exists at a time.
// Changing `view` destroys the old screen and mounts the new one.

// Follow this architecture exactly when generating or editing code.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
