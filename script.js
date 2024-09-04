class Square {
  constructor(id) {
    this.id = id;
    this.filled = false;
    this.item = document.getElementById(`sqr-${this.id}`);
    this.item.addEventListener("click", () => this.fill());
  }
  fill() {
    if (this.filled || turnIndex === false || gameOver) return;
    this.item.innerHTML = "<h1 class='x'>X</h1>";
    this.filled = true;
    turnIndex = !turnIndex;
    roles();
    setTimeout(() => {
      checkGameStatus();
    }, 200);
  }
}

const computer = () => {
  if (gameOver) return;
  let flag = false;
  while (flag === false) {
    let random = Math.floor(Math.random() * 9);
    if (squares[random].filled === false) {
      squares[random].item.innerHTML = "<h1 class='o'>O</h1>";
      squares[random].filled = true;
      flag = true;
      turnIndex = !turnIndex;
    }
  }
  setTimeout(() => {
    checkGameStatus();
  }, 200);
};

const roles = () => {
  if (turnIndex === false) {
    setTimeout(computer, 1500);
  }
};

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const checkForDraw = () => {
  return squares.every((square) => square.filled);
};

const checkForWin = () => {
  for (let combination of winningCombinations) {
    let [a, b, c] = combination;
    if (
      squares[a].filled &&
      squares[a].item.innerHTML === squares[b].item.innerHTML &&
      squares[a].item.innerHTML === squares[c].item.innerHTML
    ) {
      return squares[a].item.innerHTML;
    }
  }
};

const checkGameStatus = () => {
  const winner = checkForWin();
  if (winner) {
    gameOver = true;
    if (winner === `<h1 class="x">X</h1>`) {
      gameResult.innerHTML = "<h1>Player Won!</h1>";
      gameResult.style.color = "#e74c3c";
    } else {
      gameResult.innerHTML = "<h1>Computer Won!</h1>";
      gameResult.style.color = "#3498db";
    }
    resetButton.innerHTML = "<button>Play Again</button>";
    const playAgainButton = resetButton.querySelector("button");
    playAgainButton.addEventListener("click", resetGame);
  } else if (checkForDraw()) {
    gameOver = true;
    gameResult.innerHTML = "<h1>It's a Draw!</h1>";
    gameResult.style.color = "#f0a835";
    resetButton.innerHTML = "<button>Play Again</button>";
    const playAgainButton = resetButton.querySelector("button");
    playAgainButton.addEventListener("click", resetGame);
  }
};

const resetGame = () => {
  squares.forEach((square) => {
    square.filled = false;
    square.item.innerHTML = "";
  });
  gameOver = false;
  resetButton.innerHTML = "";
  gameResult.innerHTML = "";
};

let squares = [];

for (let i = 1; i <= 9; i++) {
  let square = new Square(i);
  squares.push(square);
}

let turnIndex = true;
let gameOver = false;
const resetButton = document.getElementById("reset-button");
const gameResult = document.getElementById("game-result");
