let gold = 0;
let level = 1;
let xp = 0;
let xpMax = 100;

let enemyHP = 20;
let enemyMaxHP = 20;

let questKills = 0;
let questGoal = 5;

let inventory = [];

// Laden
if(localStorage.getItem("save")){
  let save = JSON.parse(localStorage.getItem("save"));
  gold = save.gold;
  level = save.level;
  xp = save.xp;
  inventory = save.inventory;
}

// UI Update
function updateUI(){
  document.getElementById("gold").innerText = gold;
  document.getElementById("level").innerText = level;
  document.getElementById("xp").innerText = xp;
  document.getElementById("xpMax").innerText = xpMax;
  document.getElementById("enemy").innerText = "Schleim (HP: " + enemyHP + ")";
  document.getElementById("quest").innerText = `Besiege ${questGoal} Gegner (${questKills}/${questGoal})`;

  let invList = document.getElementById("inventory");
  invList.innerHTML = "";
  inventory.forEach(item => {
    let li = document.createElement("li");
    li.innerText = item;
    invList.appendChild(li);
  });
}

// Angriff
function attack(){
  enemyHP -= Math.floor(Math.random() * 10) + 5;

  if(enemyHP <= 0){
    winFight();
  }

  updateUI();
}

// Sieg
function winFight(){
  gold += Math.floor(Math.random() * 20) + 10;
  xp += 20;

  // Loot Chance
  if(Math.random() < 0.3){
    inventory.push("Schwert");
  }

  // Quest Fortschritt
  questKills++;

  // Level Up
  if(xp >= xpMax){
    xp = 0;
    level++;
    xpMax += 50;
  }

  // Neuer Gegner
  enemyMaxHP += 5;
  enemyHP = enemyMaxHP;

  // Speichern
  saveGame();
}

// Speicherfunktion
function saveGame(){
  localStorage.setItem("save", JSON.stringify({
    gold, level, xp, inventory
  }));
}

// Idle System (automatisch Gold)
setInterval(() => {
  gold += 1;
  updateUI();
}, 3000);

// Start
updateUI();
