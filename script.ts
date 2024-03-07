let starArray: Star[] = []
let originalStarArray: any[] = []

const canvas = document.getElementById('canvas') as HTMLCanvasElement
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

let mouseY: number = 0
let mouseX: number = 0

canvas.height = window.innerHeight
canvas.width = window.innerWidth

const calculateDistance = (x1: number, y1: number, x2: number, y2: number): number =>
	Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)

export const getRandomNumberInRange = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min

type Star = {
	x: number
	y: number
	velocityX: number
	velocityY: number
}
window.addEventListener('mousemove', function (event) {
	// Get the position of the canvas relative to the viewport
	const canvasRect = canvas.getBoundingClientRect()

	// Calculate the mouse position relative to the canvas
	mouseX = event.clientX - canvasRect.left
	mouseY = event.clientY - canvasRect.top
})
const getStars = () => {
	for (let i = 0; i < 100; i++) {
		let star: Star = {
			x: getRandomNumberInRange(0, window.innerWidth),
			y: getRandomNumberInRange(0, window.innerHeight),
			velocityX: 0,
			velocityY: 0
		}
		starArray.push(star)
		originalStarArray.push(star)
	}
}

console.log(originalStarArray)

const animationLoop = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height)

	starArray.forEach((star: Star) => {
		const distance = calculateDistance(star.x, star.y, mouseX, mouseY)

		ctx.fillStyle = 'rgb(160,160,160)'
		ctx.fillRect(star.x, star.y, 3, 3)

		if (distance < 60) {
			if (star.x > mouseX) {
				star.velocityX += 0.1
			} else {
				star.velocityX -= 0.1
			}
			if (star.y > mouseY) {
				star.velocityY += 0.1
			} else {
				star.velocityY -= 0.1
			}
		}

		if (star.velocityX > 2) {
			star.velocityX = 2
		} else if (star.velocityX < -2) {
			star.velocityX = -2
		}

		if (star.velocityY > 2) {
			star.velocityY = 2
		} else if (star.velocityY < -2) {
			star.velocityY = -2
		}

		if (star.x > canvas.width) {
			star.velocityX = -star.velocityX
		} else if (star.x < 0) {
			star.velocityX = -star.velocityX
		}

		if (star.y > canvas.height) {
			star.velocityY = -star.velocityY
		} else if (star.y < 0) {
			star.velocityY = -star.velocityY
		}

		star.x += star.velocityX
		star.y += star.velocityY

		if (star.velocityX > 0) {
			star.velocityX -= 0.01
		} else if (star.velocityX < 0) {
			star.velocityX += 0.01
		}

		if (star.velocityY > 0) {
			star.velocityY -= 0.01
		} else if (star.velocityY < 0) {
			star.velocityY += 0.01
		}
	})

	requestAnimationFrame(animationLoop)
}
getStars()
animationLoop()
