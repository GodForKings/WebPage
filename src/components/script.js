gsap.registerPlugin(CustomEase)
gsap.registerPlugin(ScrollTrigger)

// Анимация загрузки при старте

gsap.from(
	'nav',
	{ y: '-100%', opacity: 0, ease: 'power3.out', duration: 1 },
	0.8
)
gsap.from(
	'nav ul li img.logo',
	{
		x: '-50%',
		y: '-50%',
		opacity: 0,
		duration: 2,
		rotate: '1000deg',
	},
	1.8
)
gsap.from('.controls', { x: '20px', opacity: 0, duration: 1 }, 1.3)
gsap.from('.arrows', { opacity: 0, duration: 1 }, 1.3)
gsap.from(
	'.header-wrp .socials, .header-wrp .arrowDown',
	{ x: '20px', opacity: 0, duration: 1 },
	1.3
)

//Логика курсора
window.addEventListener('mousemove', e => {
	gsap.to('.cursor', { x: e.clientX, y: e.clientY })
	gsap.to('.cursor-follow', {
		x: e.clientX,
		y: e.clientY,
		duration: 1.5,
		ease: 'power3.out',
	})
})

document.body.classList.remove('loading')

let imageView = false
let currentOpenImage
let slide = 1 //текущий слайд
let pausedSlider = false
let progressSeconds = 0 //прогресс в секундах
let tli = gsap.timeline()

function selectImage(img) {
	// Не прерывать анимацию
	if (tli.isActive()) {
		return
	}

	// Закрыть картинку если открыта
	if (imageView) {
		closeImage(img)
		return
	}

	currentOpenImage = img

	img.target.parentNode.classList.add('crossCursor')

	tli = gsap.timeline()

	let imgs = document.querySelectorAll('.slide' + slide + ' .img')

	imgs.forEach(f => {
		if (f == img.target.parentNode) return
		tli.to(f, { opacity: 0 }, 0)
	})

	imageView = true
	// Скрыть заголовки слайдов
	tli.to('.slide' + slide + ' h2', { opacity: 0 }, 0)
	tli.to('.bg', { opacity: 0 }, 0.6)

	//если не центральное изображение, сделать трансформацию в центр
	if (!img.target.parentNode.classList.contains('i1'))
		tli.to(img.target.parentNode, { x: '-50%', y: '-50%' }, 0)

	tli.to(
		img.target.parentNode,
		{
			width: '80vw',
			height: '80vh',
			opacity: 1,
			ease: 'power3.out',
			duration: 1,
		},
		0.5
	)

	//спрятать курсор
	gsap.to('.c', { opacity: 0 })
}

function closeImage(img) {
	tli.reverse()

	imageView = false

	img.target.parentNode.classList.remove('crossCursor')

	gsap.to('.c', { opacity: 1 })
	pausedSlider = false
}

function init() {
	let imgs = document.querySelectorAll('.header-wrp img')
	imgs.forEach(img => {
		// эффект наведения для акцента на изображении
		img.addEventListener('mouseenter', () => {
			if (imageView) return
			imgs.forEach(f => {
				if (f == img) return
				gsap.to(f, { opacity: 0.3 })
			})
			pausedSlider = true
		})
		//возврат прозрачности при снятии фокуса
		img.addEventListener('mouseleave', () => {
			if (imageView) return
			imgs.forEach(f => {
				gsap.to(f, { opacity: 1 })
			})
			pausedSlider = false
		})

		img.addEventListener('click', selectImage)
	})
}

window.onload = init() //вызываем функцию после полной загрузки страницы

// Анимация воспроизведения слайдера

let tl1 = gsap.timeline({ paused: false })
let ease = CustomEase.create(
	'custom',
	'M0,0 C0.246,0.041 0.22,0.315 0.359,0.606 0.427,0.748 0.571,0.989 1,1 '
)

tl1.from(
	'.slide1 .i1 img',
	{ y: '-110%', opacity: 0, ease: ease, duration: 1, scaleX: 0.3 },
	0.7
)
tl1.from(
	'.slide1 .i2 img',
	{ x: '110%', opacity: 0, ease: ease, duration: 1, scaleY: 0.2 },
	0.2
)
tl1.from(
	'.slide1 .i3 img',
	{ y: '110%', opacity: 0, ease: ease, duration: 1, scaleY: 0.5 },
	0.4
)
tl1.from(
	'.slide1 .i4 img',
	{ y: '110%', opacity: 0, ease: ease, duration: 1, scaleY: 0.5 },
	0.5
)
tl1.from(
	'.slide1 .i5 img',
	{ x: '110%', opacity: 0, ease: ease, duration: 1, scaleY: 0.5 },
	0.7
)
tl1.from(
	'.slide1 .i6 img',
	{ y: '110%', opacity: 0, ease: ease, duration: 1, scaleY: 0.5 },
	0.9
)

tl1.fromTo(
	'.slide1 .title1 span',
	{
		y: '40%',
		opacity: 0,
		duration: 1,
		ease: 'power3.out',
	},
	{
		y: '0%',
		opacity: 1,
	},
	0.9
)

tl1.fromTo(
	'.slide1 .title2 span',
	{
		y: '-40%',
		opacity: 0,
		duration: 1,
		ease: 'power3.out',
	},
	{
		y: '0%',
		opacity: 1,
	},
	1.1
)

// Анимация для второго слайдера
let tl2 = gsap.timeline({ paused: true })
tl2.from(
	'.slide2 .i1 img',
	{ y: '110%', opacity: 0, ease: ease, duration: 1, scaleY: 0.5 },
	0.7
)
tl2.from(
	'.slide2 .i2 img',
	{ x: '110%', opacity: 0, ease: ease, duration: 1, scaleY: 0.5 },
	0.2
)
tl2.from(
	'.slide2 .i3 img',
	{ y: '110%', opacity: 0, ease: ease, duration: 1, scaleY: 0.5 },
	0.4
)
tl2.from(
	'.slide2 .i4 img',
	{ y: '110%', opacity: 0, ease: ease, duration: 1, scaleY: 0.5 },
	0.5
)
tl2.from(
	'.slide2 .i5 img',
	{ x: '110%', opacity: 0, ease: ease, duration: 1, scaleY: 0.5 },
	0.7
)
tl2.from(
	'.slide2 .i6 img',
	{ y: '110%', opacity: 0, ease: ease, duration: 1, scaleY: 0.5 },
	0.9
)

tl2.fromTo(
	'.slide2 .title1 span',
	{
		y: '40%',
		opacity: 0,
		duration: 1,
		ease: 'power3.out',
	},
	{
		y: '0%',
		opacity: 1,
	},
	0.9
)

tl2.fromTo(
	'.slide2 .title2 span',
	{
		y: '40%',
		opacity: 0,
		duration: 1,
		ease: 'power3.out',
	},
	{
		y: '0%',
		opacity: 1,
	},
	1.1
)

// Третий слайд
let tl3 = gsap.timeline({ paused: true })
tl3.from(
	'.slide3 .i1 img',
	{ y: '110%', opacity: 0, ease: ease, duration: 1, scaleY: 0.5 },
	0.7
)
tl3.from(
	'.slide3 .i2 img',
	{ x: '110%', opacity: 0, ease: ease, duration: 1, scaleY: 0.5 },
	0.2
)
tl3.from(
	'.slide3 .i3 img',
	{ y: '110%', opacity: 0, ease: ease, duration: 1, scaleY: 0.5 },
	0.4
)
tl3.from(
	'.slide3 .i4 img',
	{ y: '110%', opacity: 0, ease: ease, duration: 1, scaleY: 0.5 },
	0.5
)
tl3.from(
	'.slide3 .i5 img',
	{ x: '110%', opacity: 0, ease: ease, duration: 1, scaleY: 0.5 },
	0.7
)
tl3.from(
	'.slide3 .i6 img',
	{ y: '110%', opacity: 0, ease: ease, duration: 1, scaleY: 0.5 },
	0.9
)

tl3.fromTo(
	'.slide3 .title1 span',
	{
		y: '40%',
		opacity: 0,
		duration: 1,
		ease: 'power3.out',
	},
	{
		y: '0%',
		opacity: 1,
	},
	0.9
)

tl3.fromTo(
	'.slide3 .title2 span',
	{
		y: '40%',
		opacity: 0,
		duration: 1,
		ease: 'power3.out',
	},
	{
		y: '0%',
		opacity: 1,
	},
	1.1
)

// Четвертый слайд

let tl4 = gsap.timeline({ paused: true })
tl4.from(
	'.slide4 .i1 img',
	{ y: '110%', opacity: 0, ease: ease, duration: 1, scaleY: 0.5 },
	0.7
)
tl4.from(
	'.slide4 .i2 img',
	{ x: '110%', opacity: 0, ease: ease, duration: 1, scaleY: 0.5 },
	0.2
)
tl4.from(
	'.slide4 .i3 img',
	{ y: '110%', opacity: 0, ease: ease, duration: 1, scaleY: 0.5 },
	0.4
)
tl4.from(
	'.slide4 .i4 img',
	{ y: '110%', opacity: 0, ease: ease, duration: 1, scaleY: 0.5 },
	0.5
)
tl4.from(
	'.slide4 .i5 img',
	{ x: '110%', opacity: 0, ease: ease, duration: 1, scaleY: 0.5 },
	0.7
)
tl4.from(
	'.slide4 .i6 img',
	{ y: '110%', opacity: 0, ease: ease, duration: 1, scaleY: 0.5 },
	0.9
)

tl4.fromTo(
	'.slide4 .title1 span',
	{
		y: '60%',
		opacity: 0,
		duration: 1,
		ease: 'power3.out',
	},
	{
		y: '0%',
		opacity: 1,
	},
	0.9
)

tl4.fromTo(
	'.slide4 .title2 span',
	{
		y: '-40%',
		opacity: 0,
		duration: 1,
		ease: 'power3.out',
	},
	{
		y: '0%',
		opacity: 1,
	},
	1.1
)

const tlArray = [tl1, tl2, tl3, tl4]

function changeSlide(id) {
	//закрыть изображение если оно открыто
	if (imageView) {
		closeImage(currentOpenImage)
	}

	//повтор анимации текущего слайда

	tlArray[slide - 1].reverse(1)

	//новая анимация
	tlArray[id - 1].restart()

	let sliders = document.querySelectorAll('header')
	sliders.forEach(slide => {
		slide.classList.remove('active')
	})

	let newSlide = document.querySelector(`.slide${id}`)
	newSlide.classList.add('active')

	//обновляем текущий слайд
	slide = id

	controls.forEach(element => {
		element.classList.remove('active')
	})
	controls[id - 1].classList.add('active')
	//при смене через клик сбросим событие автоперехода к 0
	progressSeconds = 0
}

//событие нажатие для контроль панели справа

let controls = document.querySelectorAll('.controls ul li')
for (let i = 0; i < controls.length; i++) {
	controls[i].addEventListener('click', () => {
		changeSlide(i + 1)
	})
}

async function startProgressBar() {
	setInterval(() => {
		if (pausedSlider) return

		progressSeconds += 0.1

		if (progressSeconds >= 8) {
			changeSlide((slide % 4) + 1)
			progressSeconds = 0
		}

		gsap.to('.slideProgress', { scaleX: progressSeconds / 8, duration: 0.3 })
	}, 100)
}

startProgressBar()

//смена слайда с помощью стрелок

const prevArrow = document.querySelector('.arrows svg:first-child')
const nextArrow = document.querySelector('.arrows svg:last-child')

prevArrow.addEventListener('click', () => {
	changeSlide(slide == 1 ? 4 : slide - 1)
})

nextArrow.addEventListener('click', () => {
	changeSlide(slide == 4 ? 1 : slide + 1)
})

// Анимация всплытия секции "технологии" при прокрутки
try {
	const gridTl = gsap.timeline({
		scrollTrigger: {
			trigger: '.technologies',
			start: 'top center',
			scrub: 1,
			toggleActions: 'restart none none none',
		},
	})

	const gridElementsTech = [
		...document.querySelectorAll('.technologies .technologies-element'),
	]

	gridElementsTech.forEach((element, index) => {
		gridTl.from(
			`.technologies .technologies-element:nth-child(${index + 1}) .row *`,
			{ y: '150%', duration: 1 },
			0.3 * index
		)
		gridTl.from(
			`.technologies .technologies-element:nth-child(${index + 1}) .img-wrp`,
			{ height: 0, duration: 1 },
			0.3 * 1
		)
		gridTl.from(
			`.technologies .technologies-element:nth-child(${index + 1}) img`,
			{ scale: 0.5, duration: 1.4, ease: 'power3.out' },
			0.3 * index
		)
	})

	gridTl.from('.technologies', { height: 0, duration: 2 }, 0)
} catch (error) {
	console.log(error)
}

// Анимация всплытия секции "контакты" при прокрутки

const scrollTI = gsap.timeline({
	scrollTrigger: {
		trigger: '.technologies .technologies-element:last-child',
		start: 'top+=100 top',
		end: '+=200',
		scrub: 1,
		toggleActions: 'restart none none none',
	},
})

scrollTI.to('#studio .technologies', { y: '-20%', opacity: 0 }, 0)
// добавьте затухание и вытянуть ряд
scrollTI.from('.contact-grid', { y: '20%', opacity: 0 }, 0.3)
scrollTI.from('.contact-grid .row', { y: '-100%', opacity: 0 }, 0.3)
