import { getCurrentGame } from "./config.js";
import { generateSequence } from "./sequenceGenerator.js";

export const PHASES = Object.freeze({
  IDLE: "idle",
  COUNTDOWN: "countdown",
  ACTIVE: "active",
  FAILED: "failed",
  ENDED: "ended",
});

let startTime = null;
let duration = null;
let state = {
  sequence: [],
  index: 0,
  score: 0,
  mistakes: 0,
  isRunning: false,
  phase: PHASES.IDLE,
  failureTime: null,
  successTime: null,
  failedIndex: null,
  countdownValue: 0,
};
let config = null;
let inputTimer = null;
let gameTimer = null;
let pauseTimer = null;
let countdownTimer = null;
let listeners = [];

function notify() {
  listeners.forEach(fn => fn({ ...state }));
}

export function restartGame() {
  const gameConfig = getCurrentGame();
  startGame(structuredClone(gameConfig));
}

export function subscribe(fn) {
  listeners.push(fn);
  fn({ ...state }); // 🔑 immediate sync
  return () => {
    listeners = listeners.filter(l => l !== fn);
  };
}

export function getState() {
  return { ...state };
}

export function getTiming() {
  return { startTime, duration };
}

export function startGame(gameConfig) {
  config = gameConfig;
  duration = config.mode.duration ?? null;

  // Initialize state WITHOUT sequence during countdown
  state = {
    sequence: [],
    index: 0,
    score: 0,
    mistakes: 0,
    isRunning: true,
    phase: PHASES.COUNTDOWN,
    failureTime: null,
    successTime: null,
    failedIndex: null,
    countdownValue: 3,

  };

  notify();
  startCountdown();
}

export function stopGame() {
  clearTimeout(pauseTimer);
  clearInterval(countdownTimer);
  endGame();
}

export function handleKeyPress(code) {
  if (!state.isRunning) return;
  if (state.phase !== PHASES.ACTIVE) return;

  // Ignore modifier-only keys globally
  if (code === "ShiftLeft" || code === "ShiftRight") return;

  // Dev mode input
  if (config.keyset === "dev") {
    handleDevInput(code);
    return;
  }

  // Arrow mode input
  const direction = state.sequence[state.index];
  const expectedKey = config.bindings[direction];

  if (code === expectedKey) {
    state.index++;

    // Sequence completed successfully
    if (state.index === state.sequence.length) {
      state.score++;
      state.successTime = Date.now();
      clearTimeout(inputTimer);

      // Pause to show completed sequence before next one
      pauseTimer = setTimeout(() => {
        state.sequence = generateSequence(config);
        state.index = 0;
        state.successTime = null;
        state.phase = PHASES.ACTIVE;
        notify();
        startInputTimer();
      }, 200);

      notify();
      return;
    }

    startInputTimer();
    notify();
  } else {
    handleMistake();
  }
}

function handleDevInput(code) {
  // Only allow keys explicitly enabled in the dev pool
  if (!config.pool.includes(code)) {
    handleMistake();
    return;
  }

  state.index++;

  // Sequence completed successfully
  if (state.index === state.sequence.length) {
    state.score++;
    state.successTime = Date.now();
    clearTimeout(inputTimer);

    pauseTimer = setTimeout(() => {
      state.sequence = generateSequence(config);
      state.index = 0;
      state.successTime = null;
      state.phase = PHASES.ACTIVE;
      notify();
      startInputTimer();
    }, 200);

    notify();
    return;
  }

  startInputTimer();
  notify();
}

function handleMistake() {
  clearTimeout(inputTimer);

  state.mistakes++;
  state.failureTime = Date.now();
  state.failedIndex = state.index;
  state.phase = PHASES.FAILED;

  notify();

  // Pause to show failure before recovery
  pauseTimer = setTimeout(() => {
    // In ranked mode, end the game immediately
    if (config.mode.endOnMistake) {
      endGame();
      return;
    }

    // In practice mode, reset and continue
    state.sequence = generateSequence(config);
    state.index = 0;
    state.failedIndex = null;
    state.phase = PHASES.ACTIVE;
    state.failureTime = null;
    notify();
    startInputTimer();
  }, config.difficulty.failDelay ?? 600);
}

function startInputTimer() {
  clearTimeout(inputTimer);
  inputTimer = setTimeout(handleMistake, config.difficulty.inputTime);
}

function startCountdown() {
  state.countdownValue = 3;
  notify();

  let count = 2;
  countdownTimer = setInterval(() => {
    state.countdownValue = count;
    notify();
    count--;

    if (count < 0) {
      clearInterval(countdownTimer);
      
      // Generate sequence and start actual gameplay when countdown completes
      startTime = Date.now();
      state.sequence = generateSequence(config);
      state.phase = PHASES.ACTIVE;
      state.countdownValue = 0;
      notify();
      
      startInputTimer();

      if (duration) {
        gameTimer = setTimeout(endGame, duration);
      }
    }
  }, 1000);
}

function endGame() {
  clearTimeout(inputTimer);
  clearInterval(countdownTimer);
  clearTimeout(pauseTimer);
  clearTimeout(gameTimer);

  state.isRunning = false;
  state.phase = PHASES.ENDED;
  notify();
}