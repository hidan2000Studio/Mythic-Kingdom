let gold = 0;
let level = 1;
let xp = 0;
let xpMax = 100;

let enemyHP = 20;
let enemyMaxHP = 20;

let questKills = 0;
let questGoal = 5;

let inventory = [];

// Sounds
let hitSound = document.getElementById("hitSound");
let clickSound = document.getElementById("clickSound");
let levelSound = document.getElementById("levelSound");

// Laden
if(localStorage.getItem("save")){
  let save = JSON.parse(localStorage.getItem("save"));
  gold = save.gold;
  level = save.level;
  xp = save.xp;
  inventory = save.inventory;
}

function playSound(sound){
  sound.currentTime = 0;
  sound.play();
}

// UI
function updateUI(){
  document.getElementById("gold").innerText = gold;
  document.getElementById("level").innerText = level;
  document.getElementById("xp").innerText = xp;
  document.getElementById("xpMax").innerText = xpMax;
  document.getElementById("enemy").innerText = "Schleim (HP: " + enemyHP + ")";
  document.getElementById("quest").innerText = `Besiege ${questGoal} Gegner (${questKills}/${questGoal})`;

  let inv = document.getElementById("inventory");
  inv.innerHTML = "";
  inventory.forEach(i => {
    let li = document.createElement("li");
    li.innerText = i;
    inv.appendChild(li);
  });
}

// Angriff
function attack(){
  playSound(clickSound);

  let dmg = Math.floor(Math.random() * 10) + 5;
  enemyHP -= dmg;

  // Animation
  let box = document.getElementById("enemyBox");
  box.classList.add("hit");

  setTimeout(() => {
    box.classList.remove("hit");
  }, 200);

  playSound(hitSound);

  if(enemyHP <= 0){
    winFight();
  }

  updateUI();
}

// Sieg
function winFight(){
  gold += Math.floor(Math.random() * 20) + 10;
  xp += 20;

  if(Math.random() < 0.3){
    inventory.push("🗡️ Schwert");
  }

  questKills++;

  if(xp >= xpMax){
    xp = 0;
    level++;
    xpMax += 50;
    playSound(levelSound);
  }

  enemyMaxHP += 5;
  enemyHP = enemyMaxHP;

  saveGame();
}

// Speichern
function saveGame(){
  localStorage.setItem("save", JSON.stringify({
    gold, level, xp, inventory
  }));
}

// Idle
setInterval(() => {
  gold += 1;
  updateUI();
}, 3000);

// Start
updateUI();
