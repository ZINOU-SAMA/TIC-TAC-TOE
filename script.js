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
    this.item.innerHTML = "<h1>X</h1>";
    this.filled = true;
    turnIndex++;
    roles();
    checkGameStatus();
  }
}

const computer = () => {
  let flag = false;
  while (flag === false) {
    let random = Math.floor(Math.random() * 9);
    if (squares[random].filled === false) {
      squares[random].item.innerHTML = "<h1>O</h1>";
      squares[random].filled = true;
      flag = true;
      turnIndex++;
      checkGameStatus();
    }
  }
};

const roles = () => {
  if (turnIndex % 2 === 0) {
    setTimeout(() => {computer()},1500);
  }
};

let squares = [];

for (let i = 1; i <= 9; i++) {
  let square = new Square(i);
  squares.push(square);
}

let turnIndex = 1;

const winningCombinations = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

const checkForDraw = () => {
  if (turnIndex === 10){
    return "Draw";
  }
}

const checkForWin = () => {
  if (turnIndex >= 5){
    for (let combination of winningCombinations){
      let [a,b,c] = combination;
      if (squares[a].filled && squares[a].item.innerHTML === squares[b].item.innerHTML && squares[a].item.innerHTML === squares[c].item.innerHTML) {
        return squares[a].item.innerHTML;
      }
    }
  }
}

const checkGameStatus = () => {
  const winner = checkForWin();
  if (winner){
    alert(`${winner} Wins!`);
  }
  else if (checkForDraw()){
    alert(`It's a Draw!`);
  }
}