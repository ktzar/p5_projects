function setup() {
  createCanvas(600, 600);     
  print(random(10, 100))
  y = random() * 1000
  x = random() * 1000
}

let x
let y

function draw() {
  background(0);
  x += 0.01
  y += 0.01
  ellipse(noise(x) * 600, noise(y) * 600, 20, 20)
}

