let particles = [];
let maxParticles = 100; // Adjust for more/less trail density
let hue = 0; // For color cycling

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 1);
  noStroke();
  background(0);
}

function draw() {
  // Fade effect (lower alpha = longer trails)
  background(0, 0.1);

  // Create new particle at mouse position
  if (mouseIsPressed) {
    // Extra particles when mouse is pressed
    for (let i = 0; i < 3; i++) {
      addParticle();
    }
  } else {
    addParticle();
  }

  // Update and display particles
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.update();
    p.display();
    
    // Remove faded particles
    if (p.alpha <= 0) {
      particles.splice(i, 1);
    }
  }

  // Cycle hue for color change
  hue = (hue + 0.5) % 360;
}

function addParticle() {
  if (particles.length < maxParticles) {
    // Calculate speed for dynamic sizing
    let speed = dist(mouseX, mouseY, pmouseX, pmouseY);
    let size = map(speed, 0, 20, 5, 20); // Faster = bigger
    
    particles.push(new Particle(
      mouseX,
      mouseY,
      size,
      hue
    ));
  }
}

// Particle class
class Particle {
  constructor(x, y, size, hue) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.hue = hue;
    this.alpha = 1;
    this.decay = random(0.01, 0.03); // Fade speed
    this.velocity = {
      x: random(-1, 1),
      y: random(-1, 1)
    };
  }

  update() {
    // Apply slight drift for organic motion
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    
    // Fade out
    this.alpha -= this.decay;
  }

  display() {
    fill(this.hue, 100, 100, this.alpha);
    circle(this.x, this.y, this.size * this.alpha); // Shrink as it fades
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
