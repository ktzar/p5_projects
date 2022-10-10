const maxInitialSpeed = 2
const WIDTH = 1024
const HEIGHT = 768

let separationSlider;
let alignmentSlider;
let cohesionSlider;
let neighbourhoodSizeSlider;
let maxVelocitySlider;


let boids = [];

function setup() {
    separationSlider = createSlider(0, 1, 0.2, 0.01)
    alignmentSlider = createSlider(0, 1, 0.5, 0.1)
    cohesionSlider = createSlider(0, 5, 0.5, 0.1)
    neighbourhoodSizeSlider = createSlider(0, 75, 20, 1)
    maxVelocitySlider = createSlider(1, 10, 2, 1)
    createCanvas(WIDTH, HEIGHT);
    for (let i = 0 ; i < 50 ; i++) {
        boids.push(new Boid(random(1, width), random(1, height)))
    }
}

function draw() {
    background(255)
    for (let i = 0; i < boids.length ; i++) {
        boids[i].calculate(boids)
        boids[i].draw()
    }
}
