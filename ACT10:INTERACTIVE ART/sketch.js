let stars = [];
let message = "Welcome to Bath Spa University";
let floatOffset = 0;
let textHovered = false;
let starbursts = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(48);
  background(10);
}

function draw() {
  background(10, 10, 20, 40);

  let twinkle = map(sin(frameCount * 0.05), -1, 1, 100, 255);

  for (let s of stars) {
    s.display(twinkle);
    s.update();
  }

  for (let i = starbursts.length - 1; i >= 0; i--) {
    starbursts[i].update();
    starbursts[i].display();
    if (starbursts[i].isDone()) starbursts.splice(i, 1);
  }

  stroke(255, 50);
  for (let i = 0; i < stars.length; i++) {
    for (let j = i + 1; j < stars.length; j++) {
      let d = dist(stars[i].x, stars[i].y, stars[j].x, stars[j].y);
      if (d < 100) {
        line(stars[i].x, stars[i].y, stars[j].x, stars[j].y);
      }
    }
  }

  let textX = width / 2;
  let textY = height / 2;
  let textW = textWidth(message);
  let textH = 48;
  textHovered = (mouseX > textX - textW / 2 && mouseX < textX + textW / 2 &&
                 mouseY > textY - textH / 2 && mouseY < textY + textH / 2);


  floatOffset = sin(frameCount * 0.02) * 10;
  push();
  translate(textX, textY + floatOffset);
  if (textHovered) {
    let scaleAmt = 1 + 0.1 * sin(frameCount * 0.1);
    scale(scaleAmt);
    fill(255, 200, 100);
  } else {
    fill(255);
  }
  noStroke();
  text(message, 0, 0);
  pop();
}

function mouseMoved() {
  if (frameCount % 5 === 0) {
    stars.push(new Star(mouseX, mouseY));
  }

  if (stars.length > 150) {
    stars.splice(0, 1);
  }
}

function mousePressed() {
  starbursts.push(new Starburst(mouseX, mouseY));
}

class Star {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(2, 5);
    this.twinklePhase = random(TWO_PI);
  }

  update() {
    this.size += 0.05 * sin(frameCount * 0.1 + this.twinklePhase);
    this.size = constrain(this.size, 2, 5);
  }

  display(twinkle) {
    noStroke();
    fill(255, twinkle);
    ellipse(this.x, this.y, this.size);
  }
}

class Starburst {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.particles = [];
    this.lifetime = 60;
    this.age = 0;
    for (let i = 0; i < 20; i++) {
      this.particles.push(new StarParticle(x, y));
    }
  }

  update() {
    this.age++;
    for (let p of this.particles) {
      p.update();
    }
  }

  display() {
    for (let p of this.particles) {
      p.display();
    }
  }

  isDone() {
    return this.age > this.lifetime;
  }
}

class StarParticle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    let angle = random(TWO_PI);
    let speed = random(2, 5);
    this.vel = p5.Vector.fromAngle(angle).mult(speed);
    this.size = random(2, 4);
    this.alpha = 255;
  }

  update() {
    this.pos.add(this.vel);
    this.alpha -= 5;
    this.alpha = max(this.alpha, 0);
  }

  display() {
    noStroke();
    fill(255, this.alpha);
    ellipse(this.pos.x, this.pos.y, this.size);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
