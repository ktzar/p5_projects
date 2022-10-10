let y = []
const interpCount = 10
const width = 400
const points = 20
const space = width / (points - 1)
const dotSize = 2

function setup() {
    createCanvas(400, 400);
    for (let i = 0 ; i < points ; i++) {
        y.push(random() * 300 + 50)
    }
}

function linear(v1, v2, mu) {
    return v2 * mu + v1 * (1 - mu)
}

function cosine(v1, v2, mu) {
    const mu2 = (1 - cos(mu * PI))/2
    return v2 * mu2 + v1 * (1 - mu2)
}

function cubic(y0, y1, y2, y3, mu) {
    mu2 = mu*mu;
    a0 = y3 - y2 - y0 + y1;
    a1 = y0 - y1 - a0;
    a2 = y2 - y0;
    a3 = y1;
    return(a0*mu*mu2+a1*mu2+a2*mu+a3);
}

function draw() {
    background(220);
    strokeWeight(1);
    stroke(0);
    beginShape(LINES);
    let prevX, prevY
    for (let i = 0 ; i < points ; i++) {
        if (i > 0) {
            for (let j = 0 ; j < interpCount ; j++) {
                const percent = (j/interpCount)
                let a1 = y[i-2]
                let a2 = y[i-1]
                let a3 = y[i]
                let a4 = y[i+1]
                if (i === 1) {
                    a1 = a2  
                }
                if (i === interpCount - 1) {
                    a4 = a3
                }
                const _y = cubic(a1, a2, a3, a4, percent)
                const _x = (i - 1) * space + space * percent
                line(prevX, prevY, _x, _y)
                prevX = _x
                prevY = _y
            }
        }     
    }
    endShape();

    for (let i = 0 ; i < points ; i++) {
        fill('red')
        ellipse(i * space, y[i], dotSize * 4, dotSize * 4)    
    }
}
