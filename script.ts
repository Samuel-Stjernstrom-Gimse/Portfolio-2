let starArray: Star[] = []
let originalStarArray: any[] = []
let animationCount = 0

const canvas = document.getElementById('canvas') as HTMLCanvasElement
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
const man = document.getElementById('man') as HTMLImageElement
let animate = false
const particleSpeed = 10

canvas.height = window.innerHeight * 2
canvas.width = window.innerWidth

const getRandomNumberInRange = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min
type Star = {
	x: number
	y: number
}

const getStars = () => {
	for (let i = 0; i < 3000; i++) {
		let star: Star = {
			x: getRandomNumberInRange(-window.innerWidth * 10, window.innerWidth),
			y: getRandomNumberInRange(0, window.innerHeight * 10)
		}
		starArray.push(star)
		originalStarArray.push(star)
	}
}

const removeStars = () => {
	starArray = []
}

console.log(originalStarArray)

const animationLoop = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height)

	starArray.forEach((star: Star, index) => {
		ctx.fillStyle = 'rgb(255,255,255)'
		ctx.fillRect(star.x, star.y, 3, 3)

		if (animate) {
			animationCount++
			star.x += 4
			star.y -= 2
		} else if (animationCount > 0) {
			animationCount -= 0.5
			star.x -= 2
			star.y += 1
		}
	})

	requestAnimationFrame(animationLoop)
}

man.addEventListener('mouseover', () => {
	animate = !animate
})

man.addEventListener('mouseout', () => {
	animate = !animate
	/*	removeStars()
	getStars()*/
})
getStars()
animationLoop()
