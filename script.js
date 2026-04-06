// ===== SPIELDATEN =====
let player = JSON.parse(localStorage.getItem("mythicSave")) || {
  gold: 100,
  level: 1,
  xp: 0,
  xpMax: 100,
  inventory: [],
  kills: 0
};

let enemyHP = 30;
let enemyMaxHP = 30;

// ===== SOUNDS (lizenzfrei) =====
const clickSound = new Audio("https://cdn.pixabay.com/download/audio/2022/03/10/audio_c863c3b1f1.mp3");
const hitSound = new Audio("https://cdn.pixabay.com/download/audio/2022/03/15/audio_115b9bcb1b.mp3");
const levelSound = new Audio("https://cdn.pixabay.com/download/audio/2022/03/15/audio_7c1d6b8b3f.mp3");

// ===== SAVE =====
function save() {
  localStorage.setItem("mythicSave", JSON.stringify(player));
}

// ===== ITEM SYSTEM =====
const rarities = ["Gewöhnlich", "Selten", "Episch", "Legendär"];

function createItem() {
  let r = rarities[Math.floor(Math.random() * rarities.length)];
  return `${r} Schwert`;
}

// ===== UI =====
function updateUI() {
  document.getElementById("level").textContent = player.level;
  document.getElementById("xp").textContent = player.xp;
  document.getElementById("xpMax").textContent = player.xpMax;
  document.getElementById("gold").textContent = player.gold;

  document.getElementById("enemy").textContent =
    `Schleim (HP: ${enemyHP})`;

  document.getElementById("quest").textContent =
    `Besiege 10 Gegner (${player.kills}/10)`;

  let inv = document.getElementById("inventory");
  inv.innerHTML = "";

  player.inventory.forEach(item => {
    let li = document.createElement("li");
    li.textContent = item;
    inv.appendChild(li);
  });
}

// ===== ANIMATION =====
function hitAnim() {
  const box = document.getElementById("enemyBox");
  box.classList.add("hit");

  setTimeout(() => {
    box.classList.remove("hit");
  }, 150);
}

// ===== KAMPF =====
function attack() {
  clickSound.currentTime = 0;
  clickSound.play();

  let dmg = Math.floor(Math.random() * 10) + 5;
  enemyHP -= dmg;

  hitAnim();

  hitSound.currentTime = 0;
  hitSound.play();

  if (enemyHP <= 0) {
    win();
  }

  updateUI();
}

// ===== SIEG =====
function win() {
  player.gold += Math.floor(Math.random() * 30) + 20;
  player.xp += 25;
  player.kills++;

  // Loot
  if (Math.random() < 0.4) {
    player.inventory.push(createItem());
  }

  // Level Up
  if (player.xp >= player.xpMax) {
    player.xp = 0;
    player.level++;
    player.xpMax += 50;

    levelSound.currentTime = 0;
    levelSound.play();
  }

  // Neuer Gegner
  enemyMaxHP += 10;
  enemyHP = enemyMaxHP;

  save();
}

// ===== SHOP =====
function buyPotion() {
  if (player.gold >= 50) {
    player.gold -= 50;
    player.inventory.push("❤️ Heiltrank");
    save();
    updateUI();
  }
}

// ===== IDLE =====
setInterval(() => {
  player.gold += 2;
  updateUI();
}, 3000);

// ===== START =====
updateUI();
