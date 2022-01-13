const container = document.querySelector('.container');
const colorPicker = document.querySelector('#color');
const newCanvas = document.querySelector('#new');
const defaultCanvas = document.querySelector('#default');
const classic = document.querySelector('#classic');
const painting = document.querySelector('#painting');
const random = document.querySelector('#random');
let numberOfCells = 16;
let cells = null;
let color = 'rgb(0, 0, 0)';
let classicMode = true;
let randomMode = false;


function build() {
  for (let i = 1; i <= numberOfCells; i++) {
    let row = document.createElement('div');
    row.classList.add('row');
    container.appendChild(row)

    for (let i = 1; i <= numberOfCells; i++) {
      let cell = document.createElement('div');
      cell.classList.add('cell');
      row.appendChild(cell);
    }
  }

  cells = document.querySelectorAll('.cell');
  cells.forEach(cell => cell.addEventListener('mouseover', colorCell));
  colorPicker.addEventListener('change', updateColor);
  newCanvas.addEventListener('click', reset);
  classic.addEventListener('click', function(){
    classicMode = true;
    randomMode = false;
    classic.classList.add('active');
    painting.classList.remove('active');
    random.classList.remove('active');
  });
  painting.addEventListener('click', function(){
    classicMode = false;
    randomMode = false;
    painting.classList.add('active');
    classic.classList.remove('active');
    random.classList.remove('active');
  });
  random.addEventListener('click', function(){
    classicMode = false;
    randomMode = true;
    random.classList.add('active');
    painting.classList.remove('active');
    classic.classList.remove('active');
  });
  defaultCanvas.addEventListener('click', function(){
    document.querySelector('#num').value = 16;
    reset();
  });
}

function reset() {
  while(container.firstChild) {
    container.removeChild(container.firstChild);
  }

  classicMode = true;
  randomMode = false;
  classic.classList.add('active');

  const width = parseFloat(window.getComputedStyle(container).getPropertyValue('width'));
  numberOfCells = document.querySelector('#num').value;
  let cellSize = (width / numberOfCells);
  const suffix = document.querySelector('#num').dataset.sizing;
  document.documentElement.style.setProperty('--cell-size', cellSize + suffix);

  build();
}

function updateColor(e) {
  let r = 0, g = 0, b = 0;
  let hex = e.target.value;

  r = '0x' + hex[1] + hex[2];
  g = '0x' + hex[3] + hex[4];
  b = '0x' + hex[5] + hex[6];

  color = 'rgb(' + +r + ', ' + +g + ', ' + +b + ')';
}

function colorCell() {
  let opacity = parseFloat(this.style.opacity);
  let bg = window.getComputedStyle(this).getPropertyValue('background-color');

  if (!classicMode && !randomMode) {
    if (bg == color) {
      this.style.opacity = opacity + 0.1;
    } else {
      this.style.opacity = this.style.opacity / 2;
    }
    this.style.background = color;
  } else if (!randomMode) {
    this.style.background = 'rgb(0, 0, 0)';
    this.style.opacity = 1;
  } else {
    let r = 0, g = 0, b = 0;
    r = Math.floor(Math.random() * 256);
    g = Math.floor(Math.random() * 256);
    b = Math.floor(Math.random() * 256);

    this.style.background = 'rgb(' + +r + ', ' + +g + ', ' + +b + ')';
    this.style.opacity = (Math.floor(Math.random() * 100) + 1)/100;
  }
}

reset();