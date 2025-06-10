let continents = [];
let hoverIndex = -1;

function setup() {
  createCanvas(800, 500);
  
  // Continent data (name, area in million km², color)
  continents = [
    {name: "Asia", area: 44.58, color: [255, 99, 132]},
    {name: "Africa", area: 30.37, color: [54, 162, 235]},
    {name: "North America", area: 24.71, color: [255, 206, 86]},
    {name: "South America", area: 17.84, color: [75, 192, 192]},
    {name: "Antarctica", area: 14.20, color: [153, 102, 255]},
    {name: "Europe", area: 10.18, color: [255, 159, 64]},
    {name: "Australia", area: 8.56, color: [199, 199, 199]}
  ];
}

function draw() {
  background(245);
  drawTitle();
  drawContinents();
  drawLegend();
  if (hoverIndex !== -1) drawTooltip();
}

function drawTitle() {
  fill(50);
  textSize(24);
  textStyle(BOLD);
  textAlign(CENTER);
  text("Continental Land Area Comparison", width/2, 40);
}

function drawContinents() {
  const barWidth = 70;
  const spacing = 20;
  const startX = (width - (continents.length * (barWidth + spacing) - spacing)) / 2;
  const maxHeight = 350;
  
  textSize(14);
  textAlign(CENTER);
  
  for (let i = 0; i < continents.length; i++) {
    const continent = continents[i];
    const x = startX + i * (barWidth + spacing);
    const barHeight = map(continent.area, 0, 50, 0, maxHeight);
    const y = height - 80 - barHeight;
    
    // Check mouse hover
    const isHover = mouseX > x && mouseX < x + barWidth && 
                   mouseY > y && mouseY < height - 80;
    
    // Highlight on hover
    fill(isHover ? 
        [continent.color[0], continent.color[1], continent.color[2], 200] :
        [continent.color[0], continent.color[1], continent.color[2], 150]);
    
    // Draw bar
    rect(x, y, barWidth, barHeight, 5);
    
    // Draw label
    fill(50);
    text(continent.name, x + barWidth/2, height - 60);
    
    // Draw area value
    fill(isHover ? 0 : 100);
    text(nf(continent.area, 1, 2) + "M km²", 
         x + barWidth/2, y - 10);
    
    // Update hover state
    if (isHover) hoverIndex = i;
  }
}

function drawLegend() {
  const legendX = 50;
  const legendY = 80;
  
  fill(50);
  textSize(16);
  textAlign(LEFT);
  text("Land Area (million km²)", legendX, legendY);
  
  // Scale indicator
  stroke(200);
  line(legendX, legendY + 10, legendX + 150, legendY + 10);
  
  textSize(12);
  text("0", legendX - 10, legendY + 25);
  text("50", legendX + 145, legendY + 25);
}

function drawTooltip() {
  const continent = continents[hoverIndex];
  const tooltipWidth = 180;
  const tooltipHeight = 80;
  const x = constrain(mouseX, tooltipWidth/2 + 10, width - tooltipWidth/2 - 10);
  const y = mouseY - tooltipHeight - 20;
  
  // Tooltip background
  fill(255, 230);
  stroke(200);
  strokeWeight(1);
  rectMode(CENTER);
  rect(x, y, tooltipWidth, tooltipHeight, 5);
  
  // Tooltip content
  fill(0);
  textSize(16);
  textAlign(CENTER);
  text(continent.name, x, y - 15);
  
  textSize(14);
  fill(100);
  text("Area: " + nf(continent.area, 1, 2) + " million km²", x, y + 15);
  
  // Percentage calculation
  const totalArea = continents.reduce((sum, c) => sum + c.area, 0);
  const percent = (continent.area / totalArea * 100).toFixed(1);
  text(percent + "% of total land area", x, y + 35);
}

function mouseMoved() {
  hoverIndex = -1; // Reset hover state
}

// Responsive adjustment
function windowResized() {
  resizeCanvas(windowWidth, 500);
}
