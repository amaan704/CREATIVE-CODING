let song;
let fft;

function preload() {
  song = loadSound('song.mp3');
}

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  fft = new p5.FFT();
  song.loop();
}

function draw() {
  background(10);
  stroke(255);
  noFill();
  translate(width/2, height/2);

  let spectrum = fft.analyze();

  beginShape();
  for (let i = 0; i < 360; i += 5) {
    let index = floor(map(i, 0, 360, 0, spectrum.length));
    let r = map(spectrum[index], 0, 255, 100, 300);
    let x = r * cos(i);
    let y = r * sin(i);
    vertex(x, y);
  }
  endShape(CLOSE);
}
