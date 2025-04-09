console.log("Hello World!")

var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d")
var tx = window.innerWidth;
var ty = window.innerHeight;
canvas.width = tx;
canvas.height = ty;
// c.lineWidth = 5;
// c.globalAlpha = 0.5;

var mousex = 0;
var mousey = 0;

addEventListener("mousemove", function() {
    mousex = event.clientX;
    mousey = event.clientY;
});

var grav = 0.99;
c.strokeWidth = 5;
function randomColor() {
    return (
        "rgba(" + 
        Math.round(Math.random() * 250) + "," +
        Math.round(Math.random() * 250) + "," +
        Math.round(Math.random() * 250) + "," +
        Math.ceil(Math.random() * 10) / 10 +
        ")"
    );
}

// Create the bouncing balls
function Ball() {
    this.color = randomColor(); // Generate random color
    this.radius = Math.random() * 20 + 14; // Radius or size of ball between 14 to 34
    this.startradius = this.radius; // Store original radius
    this.x = Math.random() * (tx - this.radius * 2) + this.radius; // Random position in x within bounds
    this.y = Math.random() * (ty - this.radius); // Also random position in y
    this.dy = Math.random() * 2; // Y velocity or speed
    this.dx = Math.round((Math.random() - 0.5) * 10); // X velocity or speed
    this.vel = Math.random() / 5; // gravity-like acceleration
    this.update = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        c.fillStyle = this.color;
        c.fill();
        // c.stroke();
    };
}

var bal = []; // Initialize an empty array
for (var i=0; i < 50; i++) { // Generate a random ball
    bal.push(new Ball());
}

function animate() { // Animation that keeps running using recursion
    if (tx != window.innerWidth || ty != window.innerHeight) {
        tx = window.innerWidth;
        ty = window.innerHeight;
        canvas.width = tx;
        canvas.height = ty;
    }
    requestAnimationFrame(animate); // If window resize. Update canvas size accordingly.
    c.clearRect(0, 0, tx, ty); // Calls the animate function again for next smooth 60FPS loop
    for (var i = 0; i < bal.length; i++) {
        bal[i].update();    // Draw the ball
        bal[i].y += bal[i].dy;  // Update the ball position vertical
        bal[i].x += bal[i].dx; // Update the ball position horizontal
        // Bounce from bottom
        if (bal[i].y + bal[i].radius >= ty) {
            bal[i].dy = -bal[i].dy * grav;  // Reverse and reduce vertical speed
        } else {
            bal[i].dy += bal[i].vel;   // Apply gravity-like acceleration
        }
        // Bounce from left/right walls
        if (bal[i].x + bal[i].radius > tx || bal[i].x - bal[i].radius < 0) {
            bal[i].dx = -bal[i].dx;
        }
        if (mousex > bal[i].x - 20 && mousex < bal[i].x + 20 && mousey > bal[i].y - 50 && mousey < bal[i].y + 50 && bal[i].radius < 70) {
            // bal[i].x += 1;
            bal[i].radius += 5; // If mouse hover. Make ball grow
        } else {
            if (bal[i].radius > bal[i].startradius) {
                bal[i].radius -= 5; // Make ball shrink back if mouse is not hover in the ball
            }
        }

        // for loop end
    }
    // animation endd
}

animate();

setInterval(function() {
    bal.push(new Ball());
    bal.splice(0, 1);
}, 400);
