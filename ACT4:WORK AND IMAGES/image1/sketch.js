let img;
let showOriginal = true;
let currentEffect = 'original';

function preload() {
  img = loadImage('TREE1.jpg'); 
}

function setup() {
  createCanvas(500, 500);
  img.resize(width, height);
  noLoop();
}

function draw() {
  if (showOriginal) {
    image(img, 0, 0);
    return;
  }

  switch(currentEffect) {
    case 'posterize':
      applyPosterize();
      break;
    case 'pixelate':
      applyPixelate();
      break;
    case 'pointillism':
      applyPointillism();
      break;
    case 'invert':
      applyInvert();
      break;
    case 'edge':
      applyEdgeDetection();
      break;
  }
}

function applyPosterize() {
  image(img, 0, 0);
  loadPixels();
  
  // Posterization by reducing color levels
  for (let i = 0; i < pixels.length; i += 4) {
    const levels = 4; // Number of color levels
    pixels[i] = floor(pixels[i] / 255 * levels) * (255 / levels);   // R
    pixels[i+1] = floor(pixels[i+1] / 255 * levels) * (255 / levels); // G
    pixels[i+2] = floor(pixels[i+2] / 255 * levels) * (255 / levels); // B
  }
  
  updatePixels();
}

function applyPixelate() {
  image(img, 0, 0);
  loadPixels();
  
  const pixelSize = 10; // Size of pixel blocks
  
  for (let y = 0; y < height; y += pixelSize) {
    for (let x = 0; x < width; x += pixelSize) {
      // Get the color at the center of the block
      const index = (x + y * width) * 4;
      const r = pixels[index];
      const g = pixels[index + 1];
      const b = pixels[index + 2];
      
      // Draw a rectangle with that color
      fill(r, g, b);
      noStroke();
      rect(x, y, pixelSize, pixelSize);
    }
  }
}

function applyPointillism() {
  background(255);
  const density = width * height / 1000; // Number of dots
  
  for (let i = 0; i < density; i++) {
    const x = random(width);
    const y = random(height);
    
    // Get the color at this position
    const c = img.get(x, y);
    
    // Draw a colored ellipse
    noStroke();
    fill(c);
    const size = random(5, 15);
    ellipse(x, y, size, size);
  }
}

function applyInvert() {
  image(img, 0, 0);
  loadPixels();
  
  for (let i = 0; i < pixels.length; i += 4) {
    pixels[i] = 255 - pixels[i];     // R
    pixels[i+1] = 255 - pixels[i+1]; // G
    pixels[i+2] = 255 - pixels[i+2]; // B
  }
  
  updatePixels();
}

function applyEdgeDetection() {
  image(img, 0, 0);
  loadPixels();
  
  // Create a copy of the original pixels
  const originalPixels = pixels.slice();
  
  for (let y = 1; y < height-1; y++) {
    for (let x = 1; x < width-1; x++) {
      const index = (x + y * width) * 4;
      
      // Sobel operator for edge detection
      let grayX = 0;
      let grayY = 0;
      
      // 3x3 kernel
      for (let ky = -1; ky <= 1; ky++) {
        for (let kx = -1; kx <= 1; kx++) {
          const kidx = ((x + kx) + (y + ky) * width) * 4;
          
          // Convert to grayscale
          const gray = (originalPixels[kidx] + originalPixels[kidx+1] + originalPixels[kidx+2]) / 3;
          
          // Apply Sobel kernels
          grayX += gray * (kx == 0 ? 0 : (kx == -1 ? -1 : 1));
          grayY += gray * (ky == 0 ? 0 : (ky == -1 ? -1 : 1));
        }
      }
      
      // Calculate gradient magnitude
      const magnitude = sqrt(grayX*grayX + grayY*grayY);
      const edgeValue = constrain(magnitude * 2, 0, 255);
      
      // Set edge pixels
      pixels[index] = edgeValue;
      pixels[index+1] = edgeValue;
      pixels[index+2] = edgeValue;
    }
  }
  
  updatePixels();
}

function keyPressed() {
  switch(key) {
    case '1': showOriginal = true; break;
    case '2': showOriginal = false; currentEffect = 'posterize'; break;
    case '3': showOriginal = false; currentEffect = 'pixelate'; break;
    case '4': showOriginal = false; currentEffect = 'pointillism'; break;
    case '5': showOriginal = false; currentEffect = 'invert'; break;
    case '6': showOriginal = false; currentEffect = 'edge'; break;
  }
  redraw();
}

function mousePressed() {
  showOriginal = !showOriginal;
  redraw();
}
