document.addEventListener('DOMContentLoaded', () => {
	const box = document.querySelectorAll('.grid div')
	const scoreDisplay = document.querySelector('span')
	const startButton = document.querySelector('.start')

	const width = 10
	let snake = [2,1,0]
	let appleIndex = 0
	let direction = 1
  	let crl = direction
	let interval = 0
	let intervalTime = 0
	let score = 0

	document.addEventListener('keydown', control)
	startButton.addEventListener('click', start)

	function start() {
		snake.forEach(index => box[index].classList.remove('snake'))
    		score = 0
    		scoreDisplay.innerText = score
		box[appleIndex].classList.remove('apple')
		clearInterval(interval)
		direction = 1
   		crl = 1
		intervalTime = 150
		snake = [2,1,0]
		snake.forEach(index => box[index].classList.add('snake'))
		randomApple()
		interval = setInterval(move, intervalTime)
	}

	function randomApple() {
		do{
			appleIndex = Math.floor(Math.random() * box.length)
		}
		while(box[appleIndex].classList.contains('snake'))
		box[appleIndex].classList.add('apple')
	}

	function move() {
    		direction = crl
		if (
      			(snake[0] + width >= (width * width) && direction === width ) || //if snake hits bottom
      			(snake[0] % width === width -1 && direction === 1) || //if snake hits right wall
      			(snake[0] % width === 0 && direction === -1) || //if snake hits left wall
      			(snake[0] - width < 0 && direction === -width) ||  //if snake hits the top
      			box[snake[0] + direction].classList.contains('snake') //if snake goes into itself
    		) {
      		return clearInterval(interval) //this will clear the interval if any of the above happen
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
      		score++
      		scoreDisplay.textContent = score
		}

	}

	function control(e) {
	    if(direction !== -1&&e.keyCode === 39) {
	      	crl = 1 //if we press the right arrow on our keyboard, the snake will go right one
	    } else if (direction !== width&&e.keyCode === 38) {
	      	crl = -width // if we press the up arrow, the snake will go back ten divs, appearing to go up
	    } else if (direction !== 1&&e.keyCode === 37) {
	      	crl = -1 // if we press left, the snake will go left one div
	    } else if (direction !== -width&&e.keyCode === 40) {
	      	crl = +width //if we press down, the snake head will instantly appear in the div ten divs from where you are now
	    }
  	}
}) 
