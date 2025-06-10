let baseFontSize = 48;
let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textFont('Georgia');
  
  // Create particles for background effect
  for (let i = 0; i < 100; i++) {
    particles.push({
      x: random(width),
      y: random(height),
      size: random(2, 8),
      speed: random(0.5, 2),
      angle: random(TWO_PI)
    });
  }
}

function draw() {
  background(30, 30, 50);
  
  // Draw twinkling particles
  noStroke();
  for (let p of particles) {
    fill(255, 255, 255, random(100, 200));
    p.x += cos(p.angle) * p.speed;
    p.y += sin(p.angle) * p.speed;
    
    // Wrap around screen edges
    if (p.x < 0) p.x = width;
    if (p.x > width) p.x = 0;
    if (p.y < 0) p.y = height;
    if (p.y > height) p.y = 0;
    
    circle(p.x, p.y, p.size);
  }
  
  // Dynamic color effect
  let r = map(sin(frameCount * 0.02), -1, 1, 150, 255);
  let g = map(cos(frameCount * 0.03), -1, 1, 50, 200);
  let b = map(sin(frameCount * 0.04), -1, 1, 100, 255);
  
  fill(r, g, b);
  
  // Multi-directional wave distortion effect
  let waveX = sin(frameCount * 0.03) * 20;
  let waveY = cos(frameCount * 0.05) * 15;
  
  // Pulsing font size with more dramatic range
  let pulse = sin(frameCount * 0.07) * 20;
  let currentFontSize = baseFontSize + pulse;
  textSize(currentFontSize);
  
  // New quote with glowing effect
  push();
  translate(width/2 + waveX, height/2 + waveY);
  
  // Glow effect
  drawingContext.shadowBlur = 30;
  drawingContext.shadowColor = color(r, g, b, 150);
  
  text("Creativity is intelligence having fun", 0, 0);
  
  // Secondary smaller text (author)
  textSize(currentFontSize * 0.4);
  drawingContext.shadowBlur = 15;
  text("- Albert Einstein", 0, currentFontSize * 0.8);
  
  pop();
  
  // Interactive mouse effect
  if (mouseIsPressed) {
    let mx = map(mouseX, 0, width, -20, 20);
    let my = map(mouseY, 0, height, -20, 20);
    filter(BLUR, 2);
    push();
    translate(width/2 + mx, height/2 + my);
    fill(255, 255, 255);
    textSize(currentFontSize * 1.2);
    text("Creativity is intelligence having fun", 0, 0);
    pop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
