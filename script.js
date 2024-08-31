class Square {
  constructor(id) {
    this.id = id;
    this.filled = false;
    this.item = document.getElementById(`sqr-${this.id}`);
    this.item.addEventListener("click", () => this.fill());
  }
  fill() {
    if (this.filled) {
      return;
    }
    this.item.innerHTML = "<h1>X</h1>";
    this.filled = true;
  }
}

let squares = [];

for (let i = 1; i <= 9; i++) {
  let square = new Square(i);
  squares.push(square);
}
