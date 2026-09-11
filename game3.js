function drawMatt(x, y, face, runFrame) {
  ctx.save();
  ctx.translate(Math.round(x), Math.round(y));
  if (face < 0) {
    ctx.translate(36, 0);
    ctx.scale(-1, 1);
  }

  var jumping = !player.onGround;
  var frame = runFrame % 2;

  fill(5, 3, 26, 10, "#101318");
  fill(4, 11, 29, 15, "#101318");
  fill(2, 22, 34, 22, "#101318");

  if (jumping) {
    fill(7, 40, 10, 10, "#1c4ea4");
    fill(21, 38, 10, 12, "#1c4ea4");
    fill(2, 49, 16, 7, "#e8edf3");
    fill(22, 48, 14, 7, "#e8edf3");
  } else if (frame === 0) {
    fill(8, 39, 9, 16, "#1d4fa9");
    fill(21, 40, 9, 13, "#295eb8");
    fill(3, 52, 15, 7, "#edf0f3");
    fill(21, 51, 15, 7, "#edf0f3");
  } else {
    fill(7, 40, 9, 13, "#295eb8");
    fill(21, 38, 9, 17, "#1d4fa9");
    fill(2, 50, 15, 7, "#edf0f3");
    fill(22, 52, 14, 7, "#edf0f3");
  }
  fill(4, 56, 14, 3, "#242a31");
  fill(22, 55, 14, 3, "#242a31");

  fill(7, 20, 23, 22, "#d82932");
  fill(7, 17, 23, 11, "#171b21");
  fill(3, 22, 8, 18, "#171b21");
  fill(28, 21, 8, 18, "#171b21");
  fill(9, 25, 18, 3, "#ef3a3f");
  fill(17, 21, 3, 20, "#851823");
  fill(24, 22, 5, 5, "#ffffff");
  fill(25, 23, 3, 1, "#171b21");

  if (jumping) {
    fill(0, 22, 8, 8, "#171b21");
    fill(0, 28, 7, 7, "#e6a16f");
    fill(29, 16, 7, 14, "#171b21");
    fill(31, 13, 7, 8, "#e6a16f");
  } else {
    fill(frame ? 0 : 30, 23, 7, 15, "#171b21");
    fill(frame ? 0 : 31, 34, 7, 7, "#e6a16f");
    fill(frame ? 29 : 1, 18, 7, 14, "#171b21");
    fill(frame ? 31 : 0, 15, 7, 8, "#e6a16f");
  }

  fill(10, 8, 18, 16, "#e7a06c");
  fill(8, 10, 4, 10, "#d98b61");
  fill(13, 12, 4, 4, "#fff");
  fill(23, 12, 4, 4, "#fff");
  fill(15, 13, 2, 2, "#111");
  fill(25, 13, 2, 2, "#111");
  fill(14, 19, 13, 3, "#432718");
  fill(18, 18, 4, 2, "#6b3822");
  fill(28, 12, 3, 7, "#e4a070");

  fill(8, 4, 21, 7, "#20242b");
  fill(11, 2, 15, 4, "#303640");
  fill(26, 8, 9, 4, "#20242b");
  fill(10, 4, 5, 3, "#255eb5");
  fill(18, 4, 4, 4, "#535961");

  ctx.restore();
}

function drawSpeechBubble(x, y, lines, w) {
  var bw = w || 124;
  var bh = 18 + lines.length * 16;
  fill(x, y, bw, bh, "#ffffff");
  fill(x + 16, y + bh, 10, 8, "#ffffff");
  ctx.strokeStyle = "#111111";
  ctx.lineWidth = 3;
  ctx.strokeRect(Math.round(x), Math.round(y), bw, bh);
  for (var i = 0; i < lines.length; i++) {
    outlineText(lines[i], x + bw / 2, y + 7 + i * 16, 12, "#111111", "center");
  }
}

function drawEnemy(e) {
  if (!e.alive) return;
  var x = e.x - cameraX;
  var y = e.y;
  if (x < -120 || x > W + 120) return;

  var frame = Math.floor((elapsedFrames + e.x) / 9) % 2;
  var shirt = e.type === "rental" ? "#dd342e" : e.type === "glass" ? "#2a4f8e" : "#249a56";
  var dark = e.type === "rental" ? "#951b1b" : e.type === "glass" ? "#17305d" : "#176a3c";
  var skin = "#e5a16f";

  fill(x + 6, y + 38, 9, frame ? 14 : 12, "#d0ae79");
  fill(x + 21, y + 38, 9, frame ? 12 : 14, "#d0ae79");
  fill(x + 3, y + 49, 15, 5, "#eef0f3");
  fill(x + 20, y + 49, 15, 5, "#eef0f3");

  fill(x + 5, y + 18, 26, 23, shirt);
  fill(x + 7, y + 20, 22, 4, dark);

  fill(x + 10, y + 5, 17, 16, skin);
  fill(x + 13, y + 11, 3, 3, "#fff");
  fill(x + 22, y + 11, 3, 3, "#fff");
  fill(x + 14, y + 12, 2, 2, "#111");
  fill(x + 23, y + 12, 2, 2, "#111");

  if (e.type === "rental") {
    fill(x + 8, y + 2, 21, 6, "#d62e2a");
    fill(x + 23, y + 7, 10, 3, "#d62e2a");
    outlineText("RENTAL", x + 18, y + 1, 6, "#fff", "center");
    fill(x + 28, y + 22, 10, 16, "#fff2d7");
    fill(x + 30, y + 25, 6, 6, "#e0a02c");
    if (Math.abs(player.x - e.x) < 250) drawSpeechBubble(x + 36, y - 40, ["NEED A", "SCISSOR", "LIFT?"], 108);
  } else if (e.type === "glass") {
    fill(x + 8, y + 2, 21, 6, "#24477d");
    outlineText("GLASS", x + 18, y + 1, 6, "#fff", "center");
    fill(x + 11, y + 9, 16, 5, "#111");
    fill(x + 13, y + 19, 13, 3, "#3c251b");
    fill(x + 2, y + 24, 9, 17, "#252a31");
    fill(x - 5, y + 36, 22, 14, "#22262d");
    outlineText("GLASS", x + 6, y + 38, 6, "#fff", "center");
    outlineText("SAMPLES", x + 6, y + 44, 5, "#fff", "center");
    if (Math.abs(player.x - e.x) < 250) drawSpeechBubble(x + 34, y - 30, ["PREMIUM", "GLASS", "SOLUTIONS!"], 112);
  } else {
    fill(x + 8, y + 2, 21, 7, "#70452f");
    fill(x + 3, y + 17, 8, 18, skin);
    fill(x + 28, y + 17, 8, 18, skin);
    fill(x + 30, y + 29, 12, 18, "#f8f8f8");
    outlineText("?", x + 36, y + 31, 11, "#333", "center");
    if (Math.abs(player.x - e.x) < 250) drawSpeechBubble(x + 36, y - 25, ["?"], 42);
  }
}

function drawParticles() {
  for (var i = 0; i < particles.length; i++) {
    var p = particles[i];
    outlineText(p.text, p.x - cameraX, p.y, 14, p.color, "center");
  }
}

function drawMattTaunt() {
  if (!player.tauntText || player.tauntTimer <= 0) return;

  var px = player.x - cameraX + player.w / 2;
  var py = player.y - 42;
  var bw = 100;
  var bh = 27;
  fill(px - bw / 2, py, bw, bh, "#ffffff");
  fill(px - 4, py + bh, 9, 7, "#ffffff");
  ctx.strokeStyle = "#111111";
  ctx.lineWidth = 3;
  ctx.strokeRect(Math.round(px - bw / 2), Math.round(py), bw, bh);
  outlineText("YOUR MOM!", px, py + 5, 13, "#111111", "center");
}

function drawMattHudPortrait(x, y) {
  fill(x + 4, y + 8, 20, 18, "#e7a06c");
  fill(x + 3, y + 4, 22, 8, "#20242b");
  fill(x + 20, y + 9, 8, 4, "#20242b");
  fill(x + 8, y + 15, 3, 3, "#fff");
  fill(x + 17, y + 15, 3, 3, "#fff");
  fill(x + 10, y + 20, 11, 2, "#432718");
}

function drawHeart(x, y, filled) {
  var c = filled ? "#ff3d48" : "#4d5667";
  fill(x + 4, y, 10, 6, c);
  fill(x + 18, y, 10, 6, c);
  fill(x, y + 5, 32, 10, c);
  fill(x + 4, y + 15, 24, 7, c);
  fill(x + 9, y + 22, 14, 6, c);
  fill(x + 14, y + 28, 5, 4, c);
}

function drawHud() {
  fill(0, 0, W, 62, "#050914");

  outlineText("MATT", 15, 7, 21, "#ff5b52");
  drawMattHudPortrait(14, 28);

  var heartCount = player.health > 66 ? 3 : player.health > 33 ? 2 : player.health > 0 ? 1 : 0;
  drawHeart(55, 24, heartCount >= 1);
  drawHeart(91, 24, heartCount >= 2);
  drawHeart(127, 24, heartCount >= 3);

  fill(171, 32, 150, 12, "#303646");
  var pct = player.health / player.maxHealth;
  var barColor = pct > .6 ? "#48d76a" : pct > .3 ? "#ffc13c" : "#ff5d59";
  fill(173, 34, 146 * pct, 8, barColor);

  var collected = 0;
  for (var i = 0; i < worldCoins.length; i++) if (worldCoins[i].taken) collected++;

  outlineText("SCORE", 510, 6, 15, "#ffe15b", "center");
  outlineText(("000000" + score).slice(-6), 510, 27, 18, "#fff", "center");

  outlineText("COINS", 662, 6, 15, "#ffe15b", "center");
  outlineText("● x " + collected, 662, 27, 17, "#fff", "center");

  outlineText("WORLD", 826, 6, 15, "#ffe15b", "center");
  outlineText("1-1", 826, 27, 18, "#fff", "center");
  outlineText("SUNSHINE SHORES", 940, 46, 11, "#a8ddff", "right");

  if (player.power > 0) {
    outlineText("TACO POWER", 366, 43, 11, "#d9a3ff", "center");
  }
}

function drawTitleScreen() {
  fill(0, 0, W, H, "#02050a");
  if (titleArt && titleArt.complete && titleArt.naturalWidth) {
    var artH = H;
    var artW = artH * (titleArt.naturalWidth / titleArt.naturalHeight);
    var ax = (W - artW) / 2;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(titleArt, Math.round(ax), 0, Math.round(artW), H);
  } else {
    outlineText("SUPER MATT", W / 2, 150, 64, "#ff493f", "center");
  }

  fill(0, H - 52, W, 52, "rgba(0,0,0,.78)");
  outlineText("MOVE OR TAP A CONTROL TO START", W / 2, H - 39, 18, "#fff36a", "center");
  outlineText("v8 GRAPHICS PASS", W - 12, H - 18, 9, "#9fdcff", "right");
}

function drawEndScreen() {
  fill(0, 0, W, H, "rgba(0,0,0,.68)");
  if (state === "won") {
    outlineText("SHIFT SURVIVED", W / 2, 145, 46, "#9ff4a1", "center");
    outlineText("Matt made it to the truck.", W / 2, 210, 22, "#fff", "center");
  } else {
    outlineText("MAXIMUM CUSTOMER INTERACTION", W / 2, 140, 34, "#ff6360", "center");
    outlineText("Energy depleted.", W / 2, 204, 22, "#fff", "center");
  }
  outlineText("FINAL SCORE " + score, W / 2, 258, 24, "#ffe15b", "center");
  outlineText("PRESS R OR TAP RESTART", W / 2, 324, 20, "#fff", "center");
}

function render() {
  drawSky();
  drawGroundAndSolids();

  for (var i = 0; i < worldCoins.length; i++) drawCoin(worldCoins[i]);
  for (var j = 0; j < worldFood.length; j++) drawFoodItem(worldFood[j]);
  for (var k = 0; k < worldEnemies.length; k++) drawEnemy(worldEnemies[k]);

  var runFrame = Math.floor(elapsedFrames / 7) % 2;
  if (!(player.invul > 0 && Math.floor(player.invul / 5) % 2 === 0)) {
    drawMatt(player.x - cameraX, player.y, player.face, runFrame);
  }

  drawParticles();
  drawMattTaunt();
  drawHud();

  if (state === "title") drawTitleScreen();
  if (state === "won" || state === "dead") drawEndScreen();
}

function loop() {
  updateGame();
  render();
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

window.addEventListener("keydown", function (e) {
  keys[e.code] = true;
  if (e.code === "KeyR") resetWorld();
  if (e.code === "ArrowLeft" || e.code === "ArrowRight" || e.code === "ArrowUp" || e.code === "Space") e.preventDefault();
});
window.addEventListener("keyup", function (e) { keys[e.code] = false; });

function hold(id, name) {
  var el = document.getElementById(id);
  function down(e) { e.preventDefault(); touch[name] = true; startGameIfNeeded(); }
  function up(e) { e.preventDefault(); touch[name] = false; }
  el.addEventListener("pointerdown", down);
  el.addEventListener("pointerup", up);
  el.addEventListener("pointercancel", up);
  el.addEventListener("pointerleave", up);
}
hold("left", "left");
hold("right", "right");
hold("jump", "jump");
document.getElementById("restart").addEventListener("click", function () { resetWorld(); });

resetWorld();
