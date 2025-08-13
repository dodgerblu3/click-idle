const ui = {
  body: document.querySelector("body"),
  gameContent: document.getElementById("gameContent"),
  pointView: document.getElementById("pointView"),
  levelView: document.getElementById("levelView"),
  autoView: document.getElementById("autoView"),
  LEVEL_Cost: document.getElementById("LEVEL_Cost"),
  AUTO_Cost: document.getElementById("AUTO_Cost"),
  addPointBtn: document.getElementById("addPointBtn"),
  upgradeLevelBtn: document.getElementById("upgradeLevelBtn"),
  upgradeAutoBtn: document.getElementById("upgradeAutoBtn"),
  resetBtn: document.getElementById("resetBtn"),
};

let Status = {
  point: 0,
  level: 1,
  auto: 1,
  isAuto: false,
  levelCost: 10,
  autoCost: 10,
};

const clickSound = new Audio("click-sound.mp3");

if (localStorage.getItem("status") !== null) {
  Status = JSON.parse(localStorage.getItem("status"));
}

updateUi();

// --- Update Status when click button ---
ui.addPointBtn.addEventListener("click", () => {
  Status.point += Status.level;
  updateUi();
});

ui.upgradeLevelBtn.addEventListener("click", () => {
  if (Status.point >= Status.levelCost) {
    clickSound.currentTime = 0;
    clickSound.play();
    Status.point -= Status.levelCost;
    Status.level++;
    Status.levelCost = (Status.level + 1) * 16;
    updateUi();
  }
});

ui.upgradeAutoBtn.addEventListener("click", () => {
  if (Status.point >= Status.autoCost) {
    clickSound.currentTime = 0;
    clickSound.play();
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
}, 500);

//  --- Reset button ---
ui.resetBtn.addEventListener("click", () => {
  ui.body.insertAdjacentHTML(
    "afterbegin",
    `<div class="delete-data-view" id="deleteDataView">
      <div class="deleteData">
        <div class="modal-container">
          <div>
            <h2>Are you sure you want to delete the data?</h2>
            <div class="buttons">
              <button id="cancelBtn">Cancel</button>
              <button class="danger" id="deleteBtn">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>`
  );

  ui.gameContent.classList.add("hidden-element");

  let deleteModal = {
    deleteDataView: document.getElementById("deleteDataView"),
    cancelBtn: document.getElementById("cancelBtn"),
    deleteBtn: document.getElementById("deleteBtn"),
  };

  deleteModal.cancelBtn.addEventListener("click", () => {
    ui.gameContent.classList.remove("hidden-element");
    deleteModal.deleteDataView.remove();
  });

  deleteModal.deleteBtn.addEventListener("click", () => {
    if (localStorage.getItem("status") !== null) {
      localStorage.removeItem("status");
    }
    Status.point = 0;
    Status.level = 1;
    Status.auto = 1;
    Status.isAuto = false;
    Status.levelCost = 10;
    Status.autoCost = 10;
    updateUi();
    ui.gameContent.classList.remove("hidden-element");
    deleteModal.deleteDataView.remove();
  });
});

// --- Save status data to localStorage ---
window.addEventListener("beforeunload", (event) => {
  localStorage.setItem("status", JSON.stringify(Status));
});

// --- Update UI ---
function updateUi() {
  ui.pointView.classList.add("text-effect");
  setTimeout(() => {
    ui.pointView.classList.remove("text-effect");
  }, 200);
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
