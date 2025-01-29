
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

const tileSize = 40;
const rows = canvas.height / tileSize;
const cols = canvas.width / tileSize;

const dirtColor = '#8B4513';
const grassColor = '#228B22';
const playerColor = '#FFD700';

const world = [];
let player = { x: 5, y: rows / 2 - 1 };

// Generate a simple world
for (let y = 0; y < rows; y++) {
    const row = [];
    for (let x = 0; x < cols; x++) {
        if (y > rows / 2) {
            row.push(dirtColor);
        } else if (y === rows / 2) {
            row.push(grassColor);
        } else {
            row.push(null);
        }
    }
    world.push(row);
}

// Draw the world
function drawWorld() {
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            if (world[y][x]) {
                ctx.fillStyle = world[y][x];
                ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
            }
        }
    }
}

// Draw the player
function drawPlayer() {
    ctx.fillStyle = playerColor;
    ctx.fillRect(player.x * tileSize, player.y * tileSize, tileSize, tileSize);
}

// Handle player movement
document.addEventListener('keydown', function(event) {
    switch (event.key) {
        case 'ArrowUp':
            if (player.y > 0 && !world[player.y - 1][player.x]) player.y--;
            break;
        case 'ArrowDown':
            if (player.y < rows - 1 && !world[player.y + 1][player.x]) player.y++;
            break;
        case 'ArrowLeft':
            if (player.x > 0 && !world[player.y][player.x - 1]) player.x--;
            break;
        case 'ArrowRight':
            if (player.x < cols - 1 && !world[player.y][player.x + 1]) player.x++;
            break;
        case ' ':
            // Mine block
            if (world[player.y][player.x]) {
                world[player.y][player.x] = null;
            }
            break;
        case 'b':
            // Build block
            if (!world[player.y][player.x]) {
                world[player.y][player.x] = dirtColor;
            }
            break;
    }
    draw();
});

// Draw everything
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawWorld();
    drawPlayer();
}

draw();