// Select game elements
var ball = document.querySelector('.ball');
var seat = document.querySelector('.seat');
var bricks = document.querySelectorAll('.brick');

// Set initial ball position
var ballX = parseInt(20);
var ballY = 300;
ball.style.left = ballX + 'px';
ball.style.top = ballY + 'px';

// Set initial ball direction
var dx = 5; //horizontal
var dy = -5; //vertical

// Move the ball
var isGameOver ;
let gamewin = document.querySelector('.gameWinBox');
gamewin.style.display = 'none'
let gameover = document.querySelector('.gameOver');
gameover.style.display = 'none'
function moveBall() {
  if (!isGameOver) {
    ballX += dx;
    ballY += dy;
    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';

    // Check for collision with wall

    if (ballX + 20 >= 500 || ballX <= 0) {
      dx = -dx;
    }

    if (ballY <= 0){
      dy = -dy;
    }

    // Check for collision with seat
    if (ballY + 20 >= 390 && ballX + 20 >= seat.offsetLeft && ballX <= seat.offsetLeft + 80) {
      dy = -dy;
    }

    // Check for collision with bricks
    for (var i = 0; i < bricks.length; i++) {
      if (ballY <= bricks[i].offsetTop + 20 && ballX + 20 >= bricks[i].offsetLeft && ballX <= bricks[i].offsetLeft + 50) {
        dy = -dy;
        bricks[i].style.display = 'none';
        bricks[i].classList.remove('brick');
      }
    }

    // Check for game over
    if (ballY + 20 >= 420) {
      gameover.style.display = 'block'
      ball.style.display = 'none'
      isGameOver = true;
    }

    // Check if all bricks are destroyed

    if (document.getElementsByClassName('brick').length === 0) {
      gamewin.style.display = 'block'
      ball.style.display = 'none'
      //document.write("You win!");
      isGameOver = true;
    }
  }
}
// Move the seat
function movePaddle(event) {
  var left = event.clientX - 40;
  if (left <= 0) {
    left = 0;
  } else if (left >= 420) {
    left = 420;
  }
  seat.style.left = left + 'px';
}

// Start the game loop
setInterval(moveBall, 30);

// Move the seat on mouse move
document.addEventListener('mousemove', movePaddle);


