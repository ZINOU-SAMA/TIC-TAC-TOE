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
    }
  }
};

const roles = () => {
  if (turnIndex % 2 === 0) {
    setTimeout(() => {computer()},2000);
  }
};

let squares = [];

for (let i = 1; i <= 9; i++) {
  let square = new Square(i);
  squares.push(square);
}

let turnIndex = 1;
