const ui = {
  pointView: document.getElementById("pointView"),
  levelView: document.getElementById("levelView"),
  autoView: document.getElementById("autoView"),
  LEVEL_Cost: document.getElementById("LEVEL_Cost"),
  AUTO_Cost: document.getElementById("AUTO_Cost"),
  addPointBtn: document.getElementById("addPointBtn"),
  upgradeLevelBtn: document.getElementById("upgradeLevelBtn"),
  upgradeAutoBtn: document.getElementById("upgradeAutoBtn"),
};

const Status = {
  point: 0,
  level: 1,
  auto: 1,
  isAuto: false,
  levelCost: 10,
  autoCost: 10,
  autoInterval: 700,
};

updateUi();

// Update Status when click button
ui.addPointBtn.addEventListener("click", () => {
  Status.point += Status.level;
  updateUi();
});

ui.upgradeLevelBtn.addEventListener("click", () => {
  if (Status.point >= Status.levelCost) {
    Status.point -= Status.levelCost;
    Status.level++;
    Status.levelCost = (Status.level + 1) * 16;
    updateUi();
  }
});

ui.upgradeAutoBtn.addEventListener("click", () => {
  if (Status.point >= Status.autoCost) {
    if (!Status.isAuto) {
      Status.isAuto = true;
    }
    Status.point -= Status.autoCost;
    Status.autoCost = (Status.auto + 1) * 11;
    Status.auto++;
    updateUi();
  }
});

// Automation logic
setInterval(() => {
  if (Status.isAuto) {
    Status.point += Status.auto - 1;
    updateUi();
  }
}, Status.autoInterval);

// Update UI
function updateUi() {
  ui.pointView.textContent = Status.point;
  ui.levelView.textContent = Status.level;
  ui.autoView.textContent = Status.auto;

  ui.LEVEL_Cost.textContent = Status.levelCost;
  ui.AUTO_Cost.textContent = Status.autoCost;

  // upgrade level button
  if (Status.point >= Status.levelCost) {
    ui.upgradeLevelBtn.classList.remove("invalid");
  } else {
    ui.upgradeLevelBtn.classList.add("invalid");
  }

  // upgrade automation button
  if (Status.point >= Status.autoCost) {
    ui.upgradeAutoBtn.classList.remove("invalid");
  } else {
    ui.upgradeAutoBtn.classList.add("invalid");
  }
}
