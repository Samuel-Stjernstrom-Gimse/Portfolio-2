import { getRandomNumberInRange } from './script.js'

const canvas2 = document.getElementById('contact-canvas') as HTMLCanvasElement
const ctx2 = canvas2.getContext('2d') as CanvasRenderingContext2D
const squareArrayLayer1: Square[] = []
const squareArrayLayer2: Square[] = []
const squareArrayLayer3: Square[] = []
const squareArrayLayer4: Square[] = []
const squareArrayLayer5: Square[] = []

canvas2.width = window.innerWidth
canvas2.height = window.innerHeight

type Square = {
	x: number
	y: number
	vel: number
	up: boolean
	h: number
	w: number
	maxHeightDivider: number
	color: string
	num: number
}
const getRandomNumberInRange2 = (min: number, max: number) => Math.random() * (max - min) + min
const getSquares = (maxHeight: number, color: string, array: any, num: number) => {
	for (let i = 0; i < num; i++) {
		const random = getRandomNumberInRange(0, 1) === 1
		const square: Square = {
			x: (canvas2.width / num) * i,
			y: canvas2.height,
			vel: 0,
			up: random,
			h: 0,
			w: 1,
			maxHeightDivider: maxHeight,
			color: color,
			num: num
		}
		array.push(square)
	}
}

function renderSquares(array: any) {
	array.forEach((square: Square) => {
		if (square.h === 0)
			square.h = -getRandomNumberInRange(
				canvas2.height / (square.maxHeightDivider + 2),
				canvas2.height / square.maxHeightDivider
			)
		if (square.h < -canvas2.height / square.maxHeightDivider) {
			square.up = false
		} else if (square.h > -canvas2.height / (square.maxHeightDivider + 1)) {
			square.up = true
		}
		if (square.up) square.h += getRandomNumberInRange2(-0.2, -0.01)
		if (!square.up) square.h += getRandomNumberInRange2(0.01, 0.2)
		ctx2.fillStyle = square.color

		ctx2.fillRect(square.x, square.y, canvas2.width / square.num + 2, square.h)
	})
}
getSquares(8, 'rgb(229, 229, 229)', squareArrayLayer1, 20)
getSquares(6, 'rgb(109,109,109)', squareArrayLayer2, 20)
getSquares(5, 'rgb(62,60,60)', squareArrayLayer3, 20)
getSquares(4, 'rgb(44,43,43)', squareArrayLayer4, 20)
getSquares(3, 'rgb(19,19,19)', squareArrayLayer5, 20)

const squareAnimationLoop = () => {
	ctx2.clearRect(0, 0, canvas2.width, canvas2.height)

	renderSquares(squareArrayLayer5)
	renderSquares(squareArrayLayer4)
	renderSquares(squareArrayLayer3)
	renderSquares(squareArrayLayer2)
	renderSquares(squareArrayLayer1)

	requestAnimationFrame(squareAnimationLoop)
}

squareAnimationLoop()
