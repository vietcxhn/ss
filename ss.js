document.addEventListener('DOMContentLoaded', () => {
	const box = document.querySelectorAll('.grid div')
	const scoreDisplay = document.querySelector('span')
	const startButton = document.querySelectorAll('.start')

	const width = 10
	let snake = [2,1,0]
	let appleIndex = 0
	let direction = 1
	let interval = 0
	let intervalTime = 0
	let score = 0

	document.addEventListener('keyup', control)
	startButton.addEventListener('click', start)

	function start() {
		snake.forEach(index => box(index).classList.remove('snake'))
		box(appleIndex).classList.remove('apple')
		clearInterval(interval)
		randomApple()
		direction = 1
		intervalTime = 300
		snake = [2,1,0]
		snake.forEach(index => box[index].classList.add('snake'))
		interval = setInterval(move, intervalTime)
	}

	function randomApple() {
		do{
			appleIndex = Math.floor(Math.random() * box.length)
		}
		while(box(appleIndex).classList.contains('snake'))
		box(appleIndex).classList.add('apple')
	}

	function move() {
		if(
			(direction = 1&&snake[0] % width === width - 1)||
			(direction = -1&&snake[0] % width === 0)||
			(direction = width&&snake[0] + width >=box.length)||
			(direction = -width&&snake[0] - width < 0)||
			(box[snake[0] + direction].classList.contains('snake'))
		){
			clearInterval(interval)
		}

		let tail = snake.pop()
		box[tail].classList.remove('snake')
		box[snake[0] + direction].classList.add('snake')
		snake.unshift(snake[0] + direction)

		if(box[snake[0]].classList.contains('apple')){
			box[snake[0]].classList.remove('apple')
			snake.push(tail)
			box[tail].classList.add('snake')
			randomApple()
		}

	}

	function control(e) {
	    if(direction !== -1&&e.keyCode === 39) {
	      	direction = 1 //if we press the right arrow on our keyboard, the snake will go right one
	    } else if (direction !== width&&e.keyCode === 38) {
	      	direction = -width // if we press the up arrow, the snake will go back ten divs, appearing to go up
	    } else if (direction !== 1&&e.keyCode === 37) {
	      	direction = -1 // if we press left, the snake will go left one div
	    } else if (direction !== -width&&e.keyCode === 40) {
	      	direction = +width //if we press down, the snake head will instantly appear in the div ten divs from where you are now
	    }
  	}
	
}) 
