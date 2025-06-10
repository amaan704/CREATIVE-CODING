let shipX = -400;
let smokeParticles = [];

function setup() {
  createCanvas(800, 400);
  noStroke();
}

function draw() {
  background(135, 206, 235); // Sky

  drawWaterBehind();             // Static water base
  drawCruiseShip(shipX, 260);    // Cruise ship
  drawWaterFront();              // Wave crest in front of ship

  // Move ship slowly
  shipX += 0.5;

  // Add smoke from chimneys
  createSmoke(shipX + 115, 170); // chimney 1
  createSmoke(shipX + 135, 170); // chimney 2

  updateSmoke();
}

// Draw static water behind the ship
function drawWaterBehind() {
  fill(70, 130, 180);
  rect(0, 300, width, height - 300);
}

// Draw animated water waves in front of the ship
function drawWaterFront() {
  fill(70, 130, 180);
  beginShape();
  for (let x = 0; x <= width; x += 10) {
    let y = 300 + sin((x + frameCount * 2) * 0.05) * 5;
    vertex(x, y);
  }
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
}

// Draw cruise ship
function drawCruiseShip(x, y) {
  // Hull
  fill(0);
  beginShape();
  vertex(x, y);
  vertex(x + 280, y);
  vertex(x + 240, y + 60);
  vertex(x + 40, y + 60);
  endShape(CLOSE);

  // Decks
  fill(30);
  rect(x + 60, y - 40, 160, 40, 5);
  rect(x + 90, y - 70, 100, 30, 5);

  // Windows on hull
  fill(200);
  for (let i = 0; i < 6; i++) ellipse(x + 60 + i * 35, y + 25, 10, 10);

  // Windows on decks
  fill(255);
  for (let i = 0; i < 4; i++) rect(x + 70 + i * 35, y - 30, 10, 10);
  for (let i = 0; i < 3; i++) rect(x + 100 + i * 30, y - 60, 10, 10);

  // Chimneys
  fill(80);
  rect(x + 110, y - 90, 10, 20);
  rect(x + 130, y - 90, 10, 20);
}

// Create a smoke particle
function createSmoke(x, y) {
  smokeParticles.push({
    x: x + random(-2, 2),
    y: y,
    size: random(8, 15),
    alpha: 200,
    dy: random(-0.5, -1.5)
  });
}

// Animate smoke particles
function updateSmoke() {
  for (let i = smokeParticles.length - 1; i >= 0; i--) {
    let p = smokeParticles[i];
    fill(150, p.alpha);
    ellipse(p.x, p.y, p.size);
    p.y += p.dy;
    p.alpha -= 2;

    if (p.alpha <= 0) {
      smokeParticles.splice(i, 1);
    }
  }
}
