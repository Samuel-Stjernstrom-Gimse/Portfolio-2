const logos: NodeListOf<HTMLImageElement> = document.querySelectorAll('.logos-img')
const logoDiv: NodeListOf<HTMLDivElement> = document.querySelectorAll('.logos-info-container')

logos.forEach((logo: HTMLImageElement, index: number): void => {
	let show: boolean = false

	logo.addEventListener('click', (): void => {
		show = !show
		show ? (logoDiv[index].style.visibility = 'visible') : (logoDiv[index].style.visibility = 'hidden')
	})

	logo.addEventListener('mouseover', (): void => {
		logoDiv[index].style.visibility = 'visible'
	})

	logo.addEventListener('mouseout', (): void => {
		if (!show) logoDiv[index].style.visibility = 'hidden'
	})
})
