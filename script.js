const pointView = document.getElementById("pointView");
const levelView = document.getElementById("levelView");
const LEVEL_Cost = document.getElementById("LEVEL_Cost");
const AUTO_Cost = document.getElementById("AUTO_Cost");
const addPointBtn = document.getElementById("addPointBtn");
const upgradeLevelBtn = document.getElementById("upgradeLevelBtn");
const upgradeAutoBtn = document.getElementById("upgradeAutoBtn");

let POINT = 0;
let LEVEL = 1;
let VOLUME = 1;
let COST = 10;
let AUTO = 0;
let AUTO_COST = 2;

updateStatus();

addPointBtn.addEventListener("click", () => {
  POINT += VOLUME;
  updateStatus();
});

upgradeLevelBtn.addEventListener("click", () => {
  if (POINT >= COST) {
    POINT -= COST;
    LEVEL++;
    VOLUME *= 2;
    COST *= 3;
    levelView.textContent = LEVEL;
    LEVEL_Cost.textContent = COST - POINT;
    
    updateStatus();
  }
});

upgradeAutoBtn.addEventListener("click", () => {
  if (POINT >= COST / 2) {
    POINT -= COST / 2;
    AUTO++;
    AUTO_COST *= 2;
    updateStatus();
  }
});

function updateStatus() {
  pointView.textContent = POINT;
  LEVEL_Cost.textContent = COST;
  AUTO_Cost.textContent = AUTO_COST;
  if (POINT >= COST) {
    upgradeLevelBtn.classList.remove("invalid");
  } else {
    upgradeLevelBtn.classList.add("invalid");
  }
  if (POINT >= AUTO_COST) {
    upgradeAutoBtn.classList.remove("invalid");
  } else {
    upgradeAutoBtn.classList.add("invalid");
  }
}

setInterval(() => {
  POINT += AUTO;
  updateStatus();
}, 500);
