class Square {
  constructor(id) {
    this.id = id;
    this.filled = false;
    this.item = document.getElementById(`sqr-${this.id}`);
    this.item.addEventListener("click", () => this.fill());
  }
  fill() {
    if (this.filled || turnIndex % 2 === 0) {
      return;
    }
    if (gameOver === true) {
      return;
    }
    this.item.innerHTML = "<h1 class='x'>X</h1>";
    this.filled = true;
    turnIndex++;
    roles();
    setTimeout(() => {
      checkGameStatus();
    }, 200);
  }
}

const computer = () => {
  if (gameOver === true) {
    return;
  }
  let flag = false;
  while (flag === false) {
    let random = Math.floor(Math.random() * 9);
    if (squares[random].filled === false) {
      squares[random].item.innerHTML = "<h1 class='o'>O</h1>";
      squares[random].filled = true;
      flag = true;
      turnIndex++;
    }
  }
  setTimeout(() => {
    checkGameStatus();
  }, 200);
};

const roles = () => {
  if (turnIndex % 2 === 0) {
    setTimeout(() => {
      computer();
    }, 1500);
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
  if (turnIndex === 10) {
    return true;
  }
};

const checkForWin = () => {
  if (turnIndex >= 5) {
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
  }
};

const checkGameStatus = () => {
  const winner = checkForWin();
  if (winner) {
    alert(`${winner} Wins!`);
    gameOver = true;
    resetButoon.innerHTML = "<button>Play Again</button>";
    const playAgainButton = resetButoon.querySelector("button");
    playAgainButton.addEventListener("click", resetGame);
  } else if (checkForDraw()) {
    gameResult.innerHTML = "<h1>It's a Draw!</h1>";
    gameOver = true;
    resetButoon.innerHTML = "<button>Play Again</button>";
    const playAgainButton = resetButoon.querySelector("button");
    playAgainButton.addEventListener("click", resetGame);
  }
};

const resetGame = () => {
  squares.forEach((square) => {
    square.filled = false;
    square.item.innerHTML = "";
  });
  turnIndex = 1;
  gameOver = false;
  resetButoon.innerHTML = "";
  gameResult.innerHTML = "";
};

let squares = [];

for (let i = 1; i <= 9; i++) {
  let square = new Square(i);
  squares.push(square);
}

let turnIndex = 1;
let gameOver = false;
const resetButoon = document.getElementById("reset-button");
const gameResult = document.getElementById("game-result");
