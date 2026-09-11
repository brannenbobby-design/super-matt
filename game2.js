function drawPixelCloud(x, y, scale) {
  fill(x, y + 8 * scale, 56 * scale, 14 * scale, "#eaf8ff");
  fill(x + 12 * scale, y, 27 * scale, 18 * scale, "#ffffff");
  fill(x + 32 * scale, y + 3 * scale, 20 * scale, 15 * scale, "#f7fdff");
}

function drawSky() {
  fill(0, 0, W, H, "#28a8ef");
  fill(0, 320, W, 220, "#119fe9");
  fill(0, 405, W, 135, "#0f8fdd");
  for (var r = 0; r < 28; r++) {
    var wx = ((r * 78 - cameraX * 0.24) % 1200 + 1200) % 1200 - 80;
    var wy = 417 + (r % 5) * 20;
    fill(wx, wy, 42, 4, "#8feaff");
    fill(wx + 10, wy + 4, 30, 3, "#d5f8ff");
  }

  var sunX = 825, sunY = 82;
  fill(sunX + 8, sunY - 18, 8, 18, "#ffda35");
  fill(sunX + 8, sunY + 65, 8, 18, "#ffda35");
  fill(sunX - 18, sunY + 8, 18, 8, "#ffda35");
  fill(sunX + 65, sunY + 8, 18, 8, "#ffda35");
  fill(sunX - 6, sunY - 8, 62, 62, "#ffe04a");
  fill(sunX + 5, sunY + 10, 18, 9, "#111722");
  fill(sunX + 30, sunY + 10, 18, 9, "#111722");
  fill(sunX + 22, sunY + 14, 10, 4, "#111722");
  fill(sunX + 20, sunY + 33, 15, 4, "#121212");

  for (var i = 0; i < 7; i++) {
    var cx = ((i * 205 - cameraX * 0.07) % 1280 + 1280) % 1280 - 110;
    var cy = 92 + (i % 3) * 58;
    drawPixelCloud(cx, cy, 1);
  }

  for (var b = 0; b < 22; b++) {
    var sx = ((b * 72 - cameraX * 0.16) % 1250 + 1250) % 1250 - 65;
    var sh = 38 + ((b * 31) % 78);
    var colors = ["#7f9fd4","#ec9aa4","#7fb8dc","#e3b276","#638bc4"];
    var sc = colors[b % colors.length];
    fill(sx, 405 - sh, 34, sh, sc);
    fill(sx + 4, 405 - sh - 5, 26, 5, sc);
    for (var yy = 405 - sh + 10; yy < 397; yy += 14) {
      fill(sx + 7, yy, 5, 5, "#ffe08c");
      fill(sx + 22, yy, 5, 5, "#ffe08c");
    }
  }

  fill(0, 388, W, 7, "#d9dfd5");
  for (var br = 0; br < 15; br++) {
    var bx = ((br * 80 - cameraX * 0.18) % 1200 + 1200) % 1200 - 30;
    fill(bx, 391, 8, 21, "#c8d2cd");
  }
}

function drawPalm(worldX, baseY, big) {
  var x = worldX - cameraX * 0.72;
  var s = big ? 1.2 : 1;
  fill(x + 18 * s, baseY - 104 * s, 14 * s, 104 * s, "#7d411d");
  fill(x + 22 * s, baseY - 100 * s, 8 * s, 96 * s, "#bd6c2f");
  for (var t = 0; t < 7; t++) {
    fill(x + 16 * s, baseY - (94 - t * 14) * s, 10 * s, 4 * s, "#e3a04a");
  }

  fill(x - 32 * s, baseY - 128 * s, 55 * s, 12 * s, "#126b38");
  fill(x + 28 * s, baseY - 130 * s, 58 * s, 12 * s, "#126b38");
  fill(x - 14 * s, baseY - 150 * s, 50 * s, 12 * s, "#178845");
  fill(x + 18 * s, baseY - 154 * s, 50 * s, 12 * s, "#178845");
  fill(x - 25 * s, baseY - 140 * s, 55 * s, 8 * s, "#37c85f");
  fill(x + 30 * s, baseY - 142 * s, 55 * s, 8 * s, "#37c85f");
}

function drawRoadSign(worldX, y, kind) {
  var x = worldX - cameraX * 0.55;
  if (x < -220 || x > W + 220) return;

  if (kind === "florida") {
    fill(x + 30, y + 106, 8, 86, "#696f75");
    fill(x + 146, y + 106, 8, 86, "#696f75");
    fill(x, y, 190, 112, "#0d754f");
    fill(x + 5, y + 5, 180, 102, "#158d62");
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 4;
    ctx.strokeRect(Math.round(x + 8), Math.round(y + 8), 174, 96);
    outlineText("FLORIDA →", x + 95, y + 14, 24, "#fff", "center");
    outlineText("GOOD VIBES", x + 95, y + 51, 16, "#fff", "center");
    outlineText("AHEAD", x + 95, y + 72, 16, "#fff", "center");
    fill(x + 22, y + 62, 5, 28, "#fff");
    fill(x + 11, y + 58, 18, 4, "#fff");
    fill(x + 25, y + 55, 17, 4, "#fff");
  } else {
    fill(x + 8, y + 75, 6, 70, "#666b73");
    fill(x + 122, y + 75, 6, 70, "#666b73");
    fill(x, y, 140, 86, "#354274");
    fill(x + 5, y + 5, 130, 76, "#44548c");
    outlineText("TAMPA", x + 70, y + 12, 20, "#ff9b9a", "center");
    outlineText("LEVELS", x + 70, y + 37, 18, "#ffb2a7", "center");
    outlineText("HIT DIFFERENT", x + 70, y + 61, 10, "#fff2d7", "center");
  }
}

function drawWoodSign(worldX, y) {
  var x = worldX - cameraX;
  if (x < -190 || x > W + 40) return;
  fill(x + 76, y + 120, 12, 70, "#70401f");
  fill(x, y, 170, 126, "#75401d");
  fill(x + 5, y + 5, 160, 116, "#925426");
  fill(x + 2, y + 25, 166, 5, "#6b3518");
  fill(x + 2, y + 60, 166, 5, "#6b3518");
  fill(x + 2, y + 94, 166, 5, "#6b3518");
  outlineText("AVOID", x + 18, y + 13, 17, "#fff");
  outlineText("REPS", x + 18, y + 33, 17, "#fff");
  outlineText("COLLECT", x + 18, y + 67, 17, "#fff");
  outlineText("TACOS", x + 18, y + 87, 17, "#fff");
  outlineText("STAY SANE", x + 18, y + 105, 14, "#fff");
  fill(x + 126, y + 42, 5, 35, "#2fb762");
  fill(x + 112, y + 37, 24, 5, "#2fb762");
  fill(x + 128, y + 32, 26, 5, "#2fb762");
}

function drawBrickTile(x, y, question) {
  if (question) {
    fill(x, y, 32, 26, "#f4a91c");
    fill(x + 3, y + 3, 26, 20, "#ffd13e");
    ctx.strokeStyle = "#8b4b11";
    ctx.lineWidth = 2;
    ctx.strokeRect(Math.round(x), Math.round(y), 32, 26);
    outlineText("?", x + 16, y + 3, 20, "#fff", "center");
  } else {
    fill(x, y, 32, 26, "#8c3f1f");
    fill(x + 2, y + 2, 28, 22, "#b75b29");
    fill(x + 2, y + 12, 28, 3, "#6e2e19");
    fill(x + 14, y + 2, 3, 10, "#6e2e19");
    fill(x + 6, y + 15, 3, 9, "#6e2e19");
    fill(x + 24, y + 15, 3, 9, "#6e2e19");
  }
}

function drawGroundAndSolids() {
  drawPalm(120, GROUND, true);
  drawPalm(790, GROUND, false);
  drawPalm(1670, GROUND, true);
  drawPalm(3380, GROUND, true);
  drawPalm(4740, GROUND, false);
  drawPalm(5660, GROUND, true);

  drawWoodSign(80, 277);
  drawRoadSign(3180, 165, "florida");
  drawRoadSign(4010, 264, "tampa");

  for (var i = 0; i < worldPlatforms.length; i++) {
    var p = worldPlatforms[i];
    var x = p.x - cameraX;
    if (x > W || x + p.w < 0) continue;

    if (p.h <= 30) {
      for (var tx = 0; tx < p.w; tx += 32) {
        var q = (Math.floor((p.x + tx) / 32) % 5 === 2);
        drawBrickTile(x + tx, p.y, q);
      }
      continue;
    }

    fill(x, p.y, p.w, p.h, "#8b4b22");
    fill(x, p.y, p.w, 10, "#75e23f");
    fill(x, p.y + 10, p.w, 7, "#2ea23a");
    fill(x, p.y + 17, p.w, 5, "#146e2e");

    for (var xx = 0; xx < p.w; xx += 32) {
      for (var yy = 22; yy < p.h; yy += 32) {
        var checker = ((xx / 32 + yy / 32) % 2 === 0);
        fill(x + xx, p.y + yy, 31, 31, checker ? "#b86a2d" : "#965126");
        fill(x + xx + 3, p.y + yy + 3, 25, 25, checker ? "#a85d2a" : "#824720");
      }
    }
  }

  for (var j = 0; j < worldBoxes.length; j++) {
    var b = worldBoxes[j];
    var bx = b.x - cameraX;
    if (bx > W || bx + b.w < 0) continue;

    fill(bx, b.y, b.w, b.h, "#a9682f");
    fill(bx + 2, b.y + 2, b.w - 4, b.h - 4, "#d2924c");
    fill(bx + 18, b.y, 6, b.h, "#ad7136");
    fill(bx, b.y + 17, b.w, 3, "#b5793a");
    fill(bx + 9, b.y + 25, 24, 3, "#2c231e");
    ctx.strokeStyle = "#2c231e";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(bx + 21, b.y + 21, 9, .2, 2.8);
    ctx.stroke();
  }

  var tx2 = LEVEL_W - 180 - cameraX;
  fill(tx2, GROUND - 54, 135, 42, "#101319");
  fill(tx2 + 61, GROUND - 83, 57, 31, "#222933");
  fill(tx2 + 69, GROUND - 76, 33, 18, "#62bfe9");
  fill(tx2 + 14, GROUND - 18, 24, 24, "#1c2027");
  fill(tx2 + 93, GROUND - 18, 24, 24, "#1c2027");
  fill(tx2 + 20, GROUND - 12, 12, 12, "#6c747e");
  fill(tx2 + 99, GROUND - 12, 12, 12, "#6c747e");
  outlineText("MATT'S TRUCK", tx2 + 67, GROUND - 46, 10, "#fff", "center");
}

function drawCoin(c) {
  if (c.taken) return;
  var x = c.x - cameraX;
  if (x < -24 || x > W + 24) return;
  var wobble = Math.floor((Date.now() / 140 + c.x) % 3);
  fill(x + 5 + wobble, c.y, 8 - wobble * 2, 18, "#ff9e00");
  fill(x + 2 + wobble, c.y + 3, 14 - wobble * 2, 12, "#ffd12e");
  fill(x + 7, c.y + 4, 4, 10, "#fff08b");
}

function drawFoodItem(f) {
  if (f.taken) return;
  var x = f.x - cameraX;
  var y = f.y + Math.sin((Date.now() + f.x) / 180) * 4;
  if (x < -50 || x > W + 50) return;

  fill(x - 8, y + 13, 8, 3, "#ffe437");
  fill(x + 30, y + 13, 8, 3, "#ffe437");
  fill(x + 13, y - 8, 3, 8, "#ffe437");
  fill(x + 13, y + 30, 3, 8, "#ffe437");

  if (f.type === "taco") {
    fill(x + 2, y + 13, 27, 11, "#d88610");
    fill(x + 4, y + 9, 23, 13, "#f3c73c");
    fill(x + 7, y + 8, 18, 5, "#44a84e");
    fill(x + 10, y + 10, 5, 4, "#d53831");
    fill(x + 18, y + 10, 5, 4, "#d53831");
  } else if (f.type === "burrito") {
    fill(x + 4, y + 6, 24, 20, "#b98655");
    fill(x + 6, y + 5, 22, 18, "#ead2a6");
    fill(x + 10, y + 8, 14, 4, "#b57a49");
    fill(x + 12, y + 14, 10, 3, "#d99b57");
  } else {
    fill(x + 7, y + 4, 18, 25, "#623091");
    fill(x + 9, y + 5, 14, 21, "#823ec2");
    fill(x + 10, y + 1, 4, 8, "#efefef");
    fill(x + 6, y + 3, 20, 4, "#f1f1f1");
    outlineText("TB", x + 16, y + 12, 9, "#fff", "center");
  }
}
