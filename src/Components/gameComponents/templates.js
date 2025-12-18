//game mode type
export const modes = {
    //game ends on first mistake, no time limit
    ranked: {
    name: "ranked",
    endOnMistake: true,
    duration: null,
    },
    //game ends when time runs out
    practice: {
    name: "practice",
    endOnMistake: false,
    duration: 60000, 
    }
};

//difficulty settings
export const difficulty = {
    peaceful:   { name: "peaceful", ranked: false, inputTime: 3000, min: 1, max: 4 },
    easy:       { name: "easy", ranked: false, inputTime: 2000, min: 2, max: 7 },  
    normal:     { name: "normal", ranked: true, inputTime: 1000, min: 3, max: 10 },
    hard:       { name: "hard", ranked: true, inputTime: 750, min: 4, max: 13 },
    impossible: { name: "impossible", ranked: true, inputTime: 400, min: 5, max: 16 }
};

//arrow template
export const defaultArrowBinds = {
  up: "ArrowUp",
  down: "ArrowDown",
  left: "ArrowLeft",
  right: "ArrowRight",
};
//WASD template
export const arrowWASDBinds = {
  up: "w",
  down: "s",
  left: "a",
  right: "d",
};

//default dev template
export const defaultDevPool =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()[]{}\|/?.,<>;:`~-+=_"
    .split("");

//dev template without shift characters
export const noShiftPool =
  "abcdefghijklmnopqrstuvwxyz0123456789-=\[]';/.,`"
    .split("");