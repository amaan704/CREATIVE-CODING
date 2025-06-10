function setup() {
  createCanvas(400, 400);
  noLoop(); // Static image
}

function draw() {
  background(0, 20, 40); // Dark space background
  
  // Draw stars
  fill(255);
  for (let i = 0; i < 50; i++) {
    ellipse(random(width), random(height), random(1, 3));
  }
  
  // Position alien in center
  translate(width/2, height/2);
  
  // Draw alien body (simple oval)
  fill(100, 220, 150); // Alien green
  noStroke();
  ellipse(0, 40, 80, 100); // Body
  
  // Draw perfectly circular head
  fill(120, 240, 160); // Slightly different green
  ellipse(0, -40, 120, 120); // Head
  
  // Large oval eyes
  fill(255); // White
  ellipse(-30, -50, 40, 50); // Left eye
  ellipse(30, -50, 40, 50);  // Right eye
  fill(0); // Black pupils
  ellipse(-30, -50, 15, 20);
  ellipse(30, -50, 15, 20);
  
  // Simple smile
  noFill();
  stroke(200, 0, 0);
  strokeWeight(3);
  arc(0, -20, 40, 20, 0, PI);
  
  // Thin arms
  stroke(100, 220, 150);
  strokeWeight(6);
  line(-50, 20, -90, 10); // Left arm
  line(50, 20, 90, 10);   // Right arm
  
  // Short legs
  line(-20, 90, -30, 120); // Left leg
  line(20, 90, 30, 120);   // Right leg
}
