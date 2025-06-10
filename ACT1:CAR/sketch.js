function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(240); // Light gray background
  
  // Main car body
  fill(30, 144, 255); // Dodger blue color
  noStroke();
  rect(150, 200, 300, 100, 15); // x, y, width, height, rounded corners
  
  // Car top/roof
  fill(25, 120, 220); // Slightly darker blue
  rect(180, 150, 240, 60, 10);
  
  // Windows
  fill(200, 230, 255, 200); // Semi-transparent light blue
  rect(200, 160, 80, 40, 5); // Left window
  rect(320, 160, 80, 40, 5); // Right window
  
  // Window divider
  stroke(100);
  line(300, 160, 300, 200);
  noStroke();
  
  // Wheels
  fill(40); // Dark gray wheels
  ellipse(220, 310, 80, 80); // Left wheel
  ellipse(380, 310, 80, 80); // Right wheel
  
  // Wheel hubs
  fill(150); // Light gray hubs
  ellipse(220, 310, 40, 40);
  ellipse(380, 310, 40, 40);
  
  // Headlight
  fill(255, 255, 200); // Warm white
  ellipse(460, 240, 30, 25);
  
  // Taillight
  fill(255, 60, 60); // Bright red
  ellipse(140, 240, 25, 20);
}
