// Session-level player data store
// NOT part of the engine - purely for UI/identity management

let playerData = {
  name: "",
};

export function setPlayerName(name) {
  playerData.name = name.trim();
}

export function getPlayerName() {
  return playerData.name;
}

export function hasPlayerName() {
  return playerData.name.length > 0;
}

export function clearPlayerName() {
  playerData.name = "";
}
