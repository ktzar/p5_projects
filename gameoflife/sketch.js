function setup() {
    createCanvas(width * squareSize + 10, height * squareSize + 10);
}

const width = 10;
const height = 10;
const squareSize = 40;

let running = false;

let board = new Array(width).fill(0).map((r) => new Array(height).fill(0));
for (x = 0; x < width; x++) {
    for (y = 0; y < height; y++) {
        board[x][y] = 0; //Math.random() > 0.92 ? 1 : 0;
    }
}

function countNeighbours(x, y) {
    let count = -board[x][y];
    for (let i = x - 1; i <= x + 1; i++) {
        for (let j = y - 1; j <= y + 1; j++) {
            let ii = i % width;
            let jj = j % height;
            if (ii === -1) {
                ii = width - 1;
            }
            if (jj === -1) {
                jj = height - 1;
            }
            count += board[ii][jj];
        }
    }
    return count;
}

function step() {
    for (x = 0; x < width - 1; x++) {
        for (y = 0; y < height - 1; y++) {
            const neighbours = countNeighbours(x, y);
            const alive = board[x][y] === 1;
            if (alive && neighbours < 2) {
                board[x][y] = 0;
            } else if (alive && neighbours >= 4) {
                board[x][y] = 0;
            } else if (!alive && neighbours === 3) {
                board[x][y] = 1;
            }
        }
    }
}

function mouseClicked() {
    const x = Math.round(mouseX / squareSize);
    const y = Math.round(mouseY / squareSize);
    board[x][y] = 1;
}

function keyTyped() {
    console.log(key);
    if (key === "s") {
        running = false;
    }
    if (key === "r") {
        running = true;
    }
}

function draw() {
    background(255);

    for (x = 0; x < width; x++) {
        for (y = 0; y < height; y++) {
            if (board[x][y] === 0) {
                fill(255);
            } else {
                fill(0);
            }
            rect(x * squareSize, y * squareSize, squareSize, squareSize);
        }
    }
    fill(128);
    if (running) {
        text("Running", 0, 20);
        step();
    } else {
        text("Stopped", 0, 20);
    }
}

