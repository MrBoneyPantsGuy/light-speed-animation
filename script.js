const canvas = document.getElementById('hyper-speed-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const numStars = 5000;
const stars = [];

function createStar() {
    const angle = Math.random() * 2 * Math.PI;
    const speed = Math.random() * 2000;
    return {
        x: 0,
        y: 0,
        z: Math.random() * canvas.width,
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
        speed: speed,
        prevX: 0, // Previous X position
        prevY: 0  // Previous Y position
    };
}

for (let i = 0; i < numStars; i++) {
    stars.push(createStar());
}

function moveStars() {
    for (let i = 0; i < numStars; i++) {
        // Store previous position
        stars[i].prevX = stars[i].x;
        stars[i].prevY = stars[i].y;

        // Update current position
        stars[i].x += stars[i].dx * stars[i].speed;
        stars[i].y += stars[i].dy * stars[i].speed;
        stars[i].z -= 1;

        // Reset star if it goes out of bounds or reaches the viewer
        if (stars[i].z <= 0 || Math.abs(stars[i].x) > canvas.width / 2 || Math.abs(stars[i].y) > canvas.height / 2) {
            stars[i] = createStar();
        }
    }
}

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'lightblue';
    ctx.strokeStyle = 'rgba(173, 216, 230, 0.3)'; // Tail color (light blue with transparency)
    ctx.lineWidth = 2;

    for (let i = 0; i < numStars; i++) {
        const k = 128.0 / stars[i].z;
        const x = stars[i].x * k + canvas.width / 2;
        const y = stars[i].y * k + canvas.height / 2;
        const size = (1 - stars[i].z / canvas.width) * 1.5;

        // Draw the star itself
        if (x >= 0 && x <= canvas.width && y >= 0 && y <= canvas.height) {
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }

        // Draw the tail
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(stars[i].prevX * k + canvas.width / 2, stars[i].prevY * k + canvas.height / 2);
        ctx.stroke();
    }
}

function animate() {
    moveStars();
    drawStars();
    requestAnimationFrame(animate);
}

animate();
