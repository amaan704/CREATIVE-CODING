let particles = [];
let lightningActive = false;
let lightningTimer = 0;
let luffyImg;
let luffyY;
let luffyVisible = false;

function preload() {
  luffyImg = loadImage('luffy.jpg'); // Example placeholder
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noCursor();
  for (let i = 0; i < 100; i++) {
    particles.push(new Particle());
  }
  luffyY = -400; // Start Luffy off-screen
}

function draw() {
  background(10, 10, 20, 200); // Dark background
  
  // Draw moving background particles
  for (let p of particles) {
    p.update();
    p.show();
  }
  // Animate Luffy falling
  if (luffyVisible) {
    imageMode(CENTER);
    image(luffyImg, width / 2, luffyY, luffyImg.width / 2, luffyImg.height / 2);
    luffyY += 20; // Falling speed
    if (luffyY > height / 2) {
      luffyY = height / 2;
    }
  }
}

function mouseMoved() {
  triggerLightning();
}

function triggerLightning() {
  lightningActive = true;
  lightningTimer = 100;
  luffyVisible = true;
  luffyY = -400; // Reset Luffy to top
}

// Particle class for background stars
class Particle {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(1, 3);
    this.speed = random(0.2, 1);
  }
  
  update() {
    this.y += this.speed;
    if (this.y > height) {
      this.y = 0;
      this.x = random(width);
    }
  }
  
  show() {
    noStroke();
    fill(100, 100, 255, 100); // Subtle blueish particles
    ellipse(this.x, this.y, this.size);
  }
}
