const zoom = 0.06
const speed = 4
const width = 600
const height = 600
let offset

function setup() {
  createCanvas(width, height);
  offset = random() * 1000
  noiseDetail(4, 0.4)
}

function draw() {
  background(0)
  offset += speed
  
  noFill()
  for (x = 0 ; x < 600 ; x++) {
    for (y = 0 ; y < 600 ; y++) {
      const n = noise(
        x * zoom + offset,
        y * zoom + offset
      )
      stroke(n * 256)
      point(x, y)
    }
  }
  noLoop()
}

