class Boid {
    constructor(x, y) {
        this.position = createVector(x, y)
        this.velocity = createVector(random(-maxInitialSpeed, maxInitialSpeed), random(-maxInitialSpeed, maxInitialSpeed))
    }

    separation(neighbours) {
        for (let i = 0 ; i < neighbours.length ; i++) {
            const separation = this.position.copy().sub(neighbours[i].position)
            separation.setMag(neighbourhoodSizeSlider.value() - separation.mag())
            this.velocity.sub(separation.mult(-separationSlider.value()))
        }
    }

    cohesion(neighbours) {
        const center = createVector(0, 0)
        for (let i = 0 ; i < neighbours.length ; i++) {
            center.add(neighbours[i].position)
        }
        center.div(neighbours.length)
        this.velocity.add(center.sub(this.position).mult(cohesionSlider.value()))
    }

    alignment(neighbours) {
        const newHeading = this.velocity.copy()
        for (let i = 0 ; i < neighbours.length ; i++) {
            newHeading.add(neighbours[i].velocity)
        }
        const a = alignmentSlider.value()
        this.velocity.setHeading((newHeading.heading() * a + this.velocity.heading() * (1-a)))
    }

    calculate(boids) {
        const neighbours = []
        for (let i = 0; i < boids.length ; i++) {
            if (boids[i].position.copy().sub(this.position).mag() < neighbourhoodSizeSlider.value() && boids[i] !== this) {
                neighbours.push(boids[i])
            }
        }
        if (neighbours.length) {
            this.separation(neighbours)
            this.cohesion(neighbours)
            this.alignment(neighbours)
            if (this.velocity.mag() > maxVelocitySlider.value()) {
                this.velocity.setMag(maxVelocitySlider.value())
            }
        }
    }

    draw() {
        this.position.add(this.velocity)
        if (this.position.x > WIDTH) {
            this.position.x = 0
        } else if (this.position.x < 0) {
            this.position.x = WIDTH
        }
        if (this.position.y > HEIGHT) {
            this.position.y = 0
        } else if (this.position.y < 0) {
            this.position.y = HEIGHT
        }

        const perp = this.velocity.copy().rotate(HALF_PI).setMag(4)
        const vel = this.velocity.copy().setMag(10)
        triangle(
            this.position.x, this.position.y,
            this.position.x - vel.x + perp.x, this.position.y - vel.y + perp.y,
            this.position.x - vel.x - perp.x, this.position.y - vel.y - perp.y
        )
    }
}
