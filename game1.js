
var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

var titleArt = null;

var W = canvas.width, H = canvas.height;
var LEVEL_W = 6200;
var GROUND = 458;
var keys = {};
var touch = { left:false, right:false, jump:false };

var state = "title"; // title, playing, won, dead
var cameraX = 0;
var score = 0;
var startTime = 0;
var elapsedFrames = 0;

var gravity = 0.58;
var worldPlatforms = [];
var worldBoxes = [];
var worldCoins = [];
var worldFood = [];
var worldEnemies = [];
var particles = [];

var player = null;

function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
function sign(v) { return v < 0 ? -1 : v > 0 ? 1 : 0; }
function overlap(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}
function fill(x, y, w, h, c) {
  ctx.fillStyle = c;
  ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
}
function outlineText(t, x, y, s, color, align) {
  ctx.font = "bold " + s + "px monospace";
  ctx.textAlign = align || "left";
  ctx.textBaseline = "top";
  ctx.fillStyle = "#000";
  ctx.fillText(t, x + 2, y + 2);
  ctx.fillStyle = color || "#fff";
  ctx.fillText(t, x, y);
}
function makeParticle(x, y, txt, color) {
  particles.push({ x:x, y:y, text:txt, color:color || "#fff", life:40 });
}
function resetWorld() {
  cameraX = 0;
  score = 0;
  startTime = 0;
  elapsedFrames = 0;
  particles = [];
  state = "title";

  player = {
    x: 120, y: GROUND - 62,
    w: 36, h: 62,
    hitX: 6, hitY: 8, hitW: 24, hitH: 52,
    vx: 0, vy: 0,
    face: 1,
    onGround: false,
    jumpLock: false,
    invul: 0,
    power: 0,
    health: 100,
    maxHealth: 100,
    tauntText: "",
    tauntTimer: 0
  };

  worldPlatforms = [
    {x:0,y:GROUND,w:980,h:82},
    {x:1090,y:GROUND,w:600,h:82},
    {x:1780,y:GROUND,w:760,h:82},
    {x:2660,y:GROUND,w:660,h:82},
    {x:3450,y:GROUND,w:900,h:82},
    {x:4500,y:GROUND,w:680,h:82},
    {x:5290,y:GROUND,w:930,h:82},

    {x:420,y:365,w:150,h:26},
    {x:760,y:315,w:145,h:26},
    {x:1240,y:345,w:180,h:26},
    {x:1970,y:333,w:160,h:26},
    {x:2220,y:280,w:160,h:26},
    {x:2820,y:335,w:160,h:26},
    {x:3090,y:278,w:160,h:26},
    {x:3690,y:334,w:190,h:26},
    {x:3980,y:285,w:170,h:26},
    {x:4610,y:328,w:180,h:26},
    {x:5520,y:336,w:180,h:26}
  ];

  worldBoxes = [
    {x:690,y:416,w:42,h:42},
    {x:732,y:416,w:42,h:42},
    {x:711,y:374,w:42,h:42},
    {x:1450,y:416,w:42,h:42},
    {x:1492,y:416,w:42,h:42},
    {x:2080,y:416,w:42,h:42},
    {x:2122,y:416,w:42,h:42},
    {x:2164,y:416,w:42,h:42},
    {x:2970,y:416,w:42,h:42},
    {x:3780,y:416,w:42,h:42},
    {x:3822,y:416,w:42,h:42},
    {x:3864,y:416,w:42,h:42},
    {x:4820,y:416,w:42,h:42},
    {x:4862,y:416,w:42,h:42},
    {x:4841,y:374,w:42,h:42},
    {x:5660,y:416,w:42,h:42},
    {x:5702,y:416,w:42,h:42}
  ];

  var coinX = [320,380,440,500,800,850,900,1180,1230,1280,1330,2020,2070,2270,2320,2860,2910,3130,3180,3730,3780,4030,4080,4550,4600,4690,5570,5620,5670];
  worldCoins = [];
  for (var i = 0; i < coinX.length; i++) {
    worldCoins.push({ x:coinX[i], y:260 - (i % 4) * 18, w:18, h:18, taken:false });
  }

  worldFood = [
    {x:820,y:260,w:30,h:30,type:"taco",taken:false},
    {x:2290,y:235,w:30,h:30,type:"drink",taken:false},
    {x:3140,y:230,w:30,h:30,type:"burrito",taken:false},
    {x:4045,y:240,w:30,h:30,type:"taco",taken:false},
    {x:5600,y:240,w:30,h:30,type:"drink",taken:false}
  ];

  worldEnemies = [
    makeEnemy(1160, "rental", 1),
    makeEnemy(1500, "customer", -1),
    makeEnemy(1860, "glass", 1),
    makeEnemy(2370, "customer", -1),
    makeEnemy(2710, "rental", 1),
    makeEnemy(3250, "glass", -1),
    makeEnemy(3510, "customer", 1),
    makeEnemy(4300, "rental", -1),
    makeEnemy(4720, "glass", 1),
    makeEnemy(5410, "customer", -1),
    makeEnemy(5900, "rental", -1)
  ];
}
function makeEnemy(x, type, dir) {
  var damage = 12;
  if (type === "glass") damage = 14;
  if (type === "customer") damage = 10;
  return {
    x:x, y:GROUND - 54,
    w:36, h:54,
    hitX: 6, hitY: 8, hitW: 24, hitH: 46,
    vx:(type === "customer" ? 0.85 : 1.05) * dir,
    dir:dir,
    type:type,
    min:x - 120,
    max:x + 120,
    alive:true,
    damage:damage
  };
}
function getHitbox(o) {
  return { x:o.x + o.hitX, y:o.y + o.hitY, w:o.hitW, h:o.hitH };
}
function solids() {
  return worldPlatforms.concat(worldBoxes);
}
function resolveHorizontal(o, oldX) {
  var s = solids();
  var hb = getHitbox(o);
  for (var i = 0; i < s.length; i++) {
    var solid = s[i];
    if (overlap(hb, solid)) {
      if (o.x > oldX) o.x = solid.x - (o.hitX + o.hitW);
      else if (o.x < oldX) o.x = solid.x + solid.w - o.hitX;
      o.vx = 0;
      hb = getHitbox(o);
    }
  }
}
function resolveVertical(o, oldY) {
  o.onGround = false;
  var s = solids();
  var hb = getHitbox(o);
  for (var i = 0; i < s.length; i++) {
    var solid = s[i];
    if (overlap(hb, solid)) {
      if (o.y > oldY) {
        o.y = solid.y - (o.hitY + o.hitH);
        o.vy = 0;
        o.onGround = true;
      } else if (o.y < oldY) {
        o.y = solid.y + solid.h - o.hitY;
        o.vy = 0;
      }
      hb = getHitbox(o);
    }
  }
}
function damagePlayer(amount, source) {
  if (player.invul > 0 || state !== "playing") return;

  // Taco Power makes Matt tougher, not invincible:
  // incoming contact damage is reduced by 40%.
  var actualDamage = amount;
  if (player.power > 0) {
    actualDamage = Math.max(1, Math.round(amount * 0.60));
  }

  player.health -= actualDamage;
  player.invul = 65;
  player.vy = -7;
  player.vx = source && source.x < player.x ? 4.5 : -4.5;

  if (player.power > 0) {
    makeParticle(player.x + 12, player.y - 10, "-" + actualDamage + " TOUGH!", "#d9a3ff");
  } else {
    makeParticle(player.x + 12, player.y - 10, "-" + actualDamage, "#ff6767");
  }

  if (player.health <= 0) {
    player.health = 0;
    state = "dead";
  }
}
function collectFood(food) {
  food.taken = true;
  score += 500;
  player.power = 520;
  player.health = Math.min(player.maxHealth, player.health + 20);
  makeParticle(food.x, food.y - 8, "TOUGHER!", "#ffe06f");
}
function mattTaunt() {
  player.tauntText = "YOUR MOM!";
  player.tauntTimer = 75;
}

function stompEnemy(enemy) {
  enemy.alive = false;
  player.vy = -8.8;
  score += 250;
  makeParticle(enemy.x, enemy.y - 10, "BONK", "#9ff6a0");
  mattTaunt();
}
function startGameIfNeeded() {
  if (state === "title") {
    state = "playing";
    startTime = Date.now();
  }
}
function updatePlayer() {
  var left = keys.ArrowLeft || keys.KeyA || touch.left;
  var right = keys.ArrowRight || keys.KeyD || touch.right;
  var jump = keys.Space || keys.KeyW || keys.ArrowUp || touch.jump;

  if (left || right || jump) startGameIfNeeded();

  var accel = player.power > 0 ? 0.75 : 0.58;
  var topSpeed = player.power > 0 ? 6.8 : 5.2;

  if (left) { player.vx -= accel; player.face = -1; }
  if (right) { player.vx += accel; player.face = 1; }
  if (!left && !right) player.vx *= player.onGround ? 0.76 : 0.97;
  player.vx = clamp(player.vx, -topSpeed, topSpeed);

  if (jump && player.onGround && !player.jumpLock) {
    player.vy = player.power > 0 ? -12.4 : -10.8;
    player.jumpLock = true;
  }
  if (!jump) player.jumpLock = false;

  player.vy += gravity;
  if (player.vy > 14) player.vy = 14;

  var oldX = player.x;
  player.x += player.vx;
  resolveHorizontal(player, oldX);

  var oldY = player.y;
  player.y += player.vy;
  resolveVertical(player, oldY);

  player.x = clamp(player.x, 0, LEVEL_W - player.w);

  if (player.y > H + 180) {
    player.health -= 18;
    makeParticle(player.x, GROUND - 25, "-18", "#ff6767");
    if (player.health <= 0) {
      player.health = 0;
      state = "dead";
    } else {
      player.x = Math.max(80, player.x - 220);
      player.y = GROUND - 140;
      player.vx = 0;
      player.vy = 0;
      player.invul = 75;
    }
  }

  if (player.invul > 0) player.invul--;
  if (player.power > 0) player.power--;
  if (player.tauntTimer > 0) {
    player.tauntTimer--;
    if (player.tauntTimer <= 0) player.tauntText = "";
  }
}
function updateCoinsAndFood() {
  var ph = getHitbox(player);
  for (var i = 0; i < worldCoins.length; i++) {
    var c = worldCoins[i];
    if (!c.taken && overlap(ph, c)) {
      c.taken = true;
      score += 100;
      makeParticle(c.x, c.y - 8, "+100", "#ffe06f");
    }
  }
  for (var j = 0; j < worldFood.length; j++) {
    var f = worldFood[j];
    if (!f.taken && overlap(ph, f)) collectFood(f);
  }
}
function updateEnemies() {
  var ph = getHitbox(player);
  for (var i = 0; i < worldEnemies.length; i++) {
    var e = worldEnemies[i];
    if (!e.alive) continue;

    e.x += e.vx;
    if (e.x < e.min || e.x > e.max) e.vx *= -1;

    if (e.type === "customer") {
      var dx = player.x - e.x;
      if (Math.abs(dx) < 170) {
        e.vx += sign(dx) * 0.018;
        e.vx = clamp(e.vx, -1.4, 1.4);
      }
    }

    var eh = getHitbox(e);
    if (overlap(ph, eh)) {
      var playerBottom = ph.y + ph.h;
      var enemyTop = eh.y;

      // Enemies can ONLY be defeated by landing on their head.
      if (player.vy > 1.5 && playerBottom - enemyTop < 18) {
        stompEnemy(e);
      } else {
        damagePlayer(e.damage, e);
      }
    }
  }
}
function updateParticles() {
  for (var i = particles.length - 1; i >= 0; i--) {
    var p = particles[i];
    p.y -= 0.6;
    p.life--;
    if (p.life <= 0) particles.splice(i, 1);
  }
}
function updateGame() {
  if (state === "title") {
    if (keys.ArrowLeft || keys.ArrowRight || keys.KeyA || keys.KeyD || touch.left || touch.right) {
      startGameIfNeeded();
    }
    return;
  }
  if (state !== "playing") return;

  elapsedFrames++;
  updatePlayer();
  updateCoinsAndFood();
  updateEnemies();
  updateParticles();

  var target = clamp(player.x - W * 0.35, 0, LEVEL_W - W);
  cameraX += (target - cameraX) * 0.12;

  if (player.x > LEVEL_W - 200) {
    state = "won";
    var timeBonus = Math.max(0, 5000 - Math.floor((Date.now() - startTime) / 80));
    score += timeBonus;
  }
}
