let starArray = [];
let originalStarArray = [];
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let mouseY = 0;
let mouseX = 0;
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const calculateDistance = (x1, y1, x2, y2) => Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
export const getRandomNumberInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
window.addEventListener('mousemove', function (event) {
    const canvasRect = canvas.getBoundingClientRect();
    mouseX = event.clientX - canvasRect.left;
    mouseY = event.clientY - canvasRect.top;
});
const getStars = () => {
    for (let i = 0; i < 100; i++) {
        let star = {
            x: getRandomNumberInRange(0, window.innerWidth),
            y: getRandomNumberInRange(0, window.innerHeight),
            velocityX: 0,
            velocityY: 0
        };
        starArray.push(star);
        originalStarArray.push(star);
    }
};
console.log(originalStarArray);
const animationLoop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    starArray.forEach((star) => {
        const distance = calculateDistance(star.x, star.y, mouseX, mouseY);
        ctx.fillStyle = 'rgb(229, 229, 229)';
        ctx.beginPath();
        ctx.arc(star.x, star.y, 3, 0, 2 * Math.PI);
        ctx.fill();
        if (distance < 60) {
            if (star.x > mouseX) {
                star.velocityX += 0.1;
            }
            else {
                star.velocityX -= 0.1;
            }
            if (star.y > mouseY) {
                star.velocityY += 0.1;
            }
            else {
                star.velocityY -= 0.1;
            }
        }
        if (star.velocityX > 2) {
            star.velocityX = 2;
        }
        else if (star.velocityX < -2) {
            star.velocityX = -2;
        }
        if (star.velocityY > 2) {
            star.velocityY = 2;
        }
        else if (star.velocityY < -2) {
            star.velocityY = -2;
        }
        if (star.x > canvas.width) {
            star.velocityX = -star.velocityX;
        }
        else if (star.x < 0) {
            star.velocityX = -star.velocityX;
        }
        if (star.y > canvas.height) {
            star.velocityY = -star.velocityY;
        }
        else if (star.y < 0) {
            star.velocityY = -star.velocityY;
        }
        star.x += star.velocityX;
        star.y += star.velocityY;
        if (star.velocityX > 0) {
            star.velocityX -= 0.01;
        }
        else if (star.velocityX < 0) {
            star.velocityX += 0.01;
        }
        if (star.velocityY > 0) {
            star.velocityY -= 0.01;
        }
        else if (star.velocityY < 0) {
            star.velocityY += 0.01;
        }
    });
    requestAnimationFrame(animationLoop);
};
getStars();
animationLoop();
//# sourceMappingURL=script.js.map