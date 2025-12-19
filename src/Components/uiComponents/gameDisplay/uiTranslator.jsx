/**
 * Convert KeyboardEvent.code into a human-readable character
 * UI-only. Engine must never import this.
 */
export function codeToDisplayChar(code, disableShift = false) {
  // Letter keys
  if (code.startsWith("Key")) {
    const letter = code.slice(3);
    return disableShift ? letter.toLowerCase() : letter;
  }

  // Digits and symbols
  const map = {
    Digit1: disableShift ? "1" : "!",
    Digit2: disableShift ? "2" : "@",
    Digit3: disableShift ? "3" : "#",
    Digit4: disableShift ? "4" : "$",
    Digit5: disableShift ? "5" : "%",
    Digit6: disableShift ? "6" : "^",
    Digit7: disableShift ? "7" : "&",
    Digit8: disableShift ? "8" : "*",
    Digit9: disableShift ? "9" : "(",
    Digit0: disableShift ? "0" : ")",

    Minus: disableShift ? "-" : "_",
    Equal: disableShift ? "=" : "+",
    BracketLeft: disableShift ? "[" : "{",
    BracketRight: disableShift ? "]" : "}",
    Backslash: disableShift ? "\\" : "|",
    Semicolon: disableShift ? ";" : ":",
    Quote: disableShift ? "'" : "\"",
    Comma: disableShift ? "," : "<",
    Period: disableShift ? "." : ">",
    Slash: disableShift ? "/" : "?",
    Backquote: disableShift ? "`" : "~",
  };

  return map[code] ?? code;
}