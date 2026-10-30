// FORMULARI VALIDACIO
const form = document.querySelector('#parking') as HTMLFormElement;
const inputfName = form.querySelector('#firstname') as HTMLInputElement;
const inputlName = form.querySelector('#lastname') as HTMLInputElement;
const inputPlate = form.querySelector('#licensePlate') as HTMLInputElement;
const button = form.querySelector('#reserve') as HTMLButtonElement;
const symbols = ['!', '"', '·', '$', '%', '&', '/', '(', ')', '=', '?', '¿', '*', '_', '-', '+', '[', ']', '{', '}', '|', '\\', ':', ';', '<', '>'];

// Funciones para marcar validación
function isValid(input: HTMLInputElement) {
  input.classList.remove('ex1-error');
  input.classList.add('ex1-valid');
}

function isInvalid(input: HTMLInputElement) {
  input.classList.remove('ex1-valid');
  input.classList.add('ex1-error');
}

// Validación del formulario
function validateForm(): void {
  let countErrors = 0;

  if (!validateName(inputfName)) { 
    countErrors++;
    isInvalid(inputfName);
  } 

  if (!validateName(inputlName)) { 
    countErrors++;
    isInvalid(inputlName);
  } 

  if (!validateLicensePlate(inputPlate)) { 
    countErrors++;
    isInvalid(inputPlate);
  }

  button.disabled = countErrors > 0;
}

// Validación de nombres
function validateName(name: HTMLInputElement): boolean {
  const nameValue = name.value.trim();
  if (nameValue === '') return false;

  for (let i = 0; i < nameValue.length; i++) {
    if (symbols.includes(nameValue[i])) return false;
  }

  isValid(name);
  return true;
}

// Validación de matrícula
function validateLicensePlate(inputPlate: HTMLInputElement): boolean {
  const vocals = ['A', 'E', 'I', 'O', 'U'];
  const plate = inputPlate.value.trim().toUpperCase();

  if (plate.length !== 7) return false;

  let countNumbers = 0;
  let countConsonants = 0;

  for (let i = 0; i < plate.length; i++) {
    const char = plate[i];

    if (symbols.includes(char)) return false;

    if (!isNaN(parseInt(char))) {
      countNumbers++;
    } else if (char >= 'A' && char <= 'Z') {
      if (vocals.includes(char)) return false;
      countConsonants++;
    } else {
      return false;
    }
  }

  if (countNumbers === 4 && countConsonants === 3) {
    isValid(inputPlate);
    return true;
  } else {
    isInvalid(inputPlate);
    return false;
  }
}
inputfName.addEventListener('input', validateForm);
inputlName.addEventListener('input', validateForm);
inputPlate.addEventListener('input', validateForm);

//MEMORY GAME
const cards = document.querySelectorAll('#memory-board > div > div') as NodeListOf<HTMLDivElement>;
let card1: HTMLDivElement | null = null;
let card2: HTMLDivElement | null = null;
let count:number=0;
cards.forEach(card => {
  card.addEventListener('click', () => {
    count++;
    card.classList.add('show');
    if(count === 1){
      card1 = card;
    }else if(count === 2){
      card2 = card;
      if(card1?.className===card2?.className){
        count = 0;
        card1 = null;
        card2 = null;
      }
    }else{
      flipCards(card1, card2);
      card1 = card;
    }
  });
});

function flipCards(card1:HTMLDivElement | null, card2:HTMLDivElement | null):void{
  if(card1) card1.classList.remove('show');
  if(card2) card2.classList.remove('show');
  card1 = null;
  card2 = null;
  count = 1;
}

//COLORS GAME

const colorCells = document.querySelectorAll<HTMLTableCellElement>('#mix-color td');

let originCell: HTMLTableCellElement | null = null;
let originColor: string = '';

colorCells.forEach(cell => {

  // 🔹 Cuando empieza a arrastrar
  cell.addEventListener('dragstart', () => {
    originCell = cell;
    originColor = cell.style.backgroundColor;
  });

  // 🔹 Permitir drop
  cell.addEventListener('dragover', (e) => {
    e.preventDefault();
  });

  // 🔹 Cuando entra encima → PREVIEW mezcla
  cell.addEventListener('dragenter', () => {
    if (!originCell || cell === originCell) return;

    const mixedColor = mixColors(originColor, cell.style.backgroundColor);

    // Guardamos color original del destino si no lo tenía guardado
    if (!cell.dataset.originalColor) {
      cell.dataset.originalColor = cell.style.backgroundColor;
    }

    cell.style.backgroundColor = mixedColor;
  });

  // 🔹 Si sale sin soltar → restaurar color
  cell.addEventListener('dragleave', () => {
    if (cell.dataset.originalColor) {
      cell.style.backgroundColor = cell.dataset.originalColor;
      delete cell.dataset.originalColor;
    }
  });

  // 🔹 Cuando suelta → mezcla definitiva
  cell.addEventListener('drop', () => {
    if (!originCell || cell === originCell) return;

    const mixedColor = mixColors(originColor, cell.dataset.originalColor || cell.style.backgroundColor);
    cell.style.backgroundColor = mixedColor;

    delete cell.dataset.originalColor;
  });

  // 🔹 Cuando termina el drag
  cell.addEventListener('dragend', () => {
    colorCells.forEach(c => {
      if (c.dataset.originalColor) {
        c.style.backgroundColor = c.dataset.originalColor;
        delete c.dataset.originalColor;
      }
    });
    originCell = null;
  });

});


// 🔥 Función para mezclar colores RGB
function mixColors(color1: string, color2: string): string {

  const rgb1 = color1.match(/\d+/g)!.map(Number);
  const rgb2 = color2.match(/\d+/g)!.map(Number);

  const r = Math.floor((rgb1[0] + rgb2[0]) / 2);
  const g = Math.floor((rgb1[1] + rgb2[1]) / 2);
  const b = Math.floor((rgb1[2] + rgb2[2]) / 2);

  return `rgb(${r},${g},${b})`;
}
//CANDY CRUSH GAME


//TIC TAC TOE GAME
const cells = document.querySelectorAll<HTMLDivElement>('#tic-tac-toe .ttt-cell');
let currentPlayer: 'X' | 'O' = 'X';
let gameOver = false;
const diagonal1 = Array.from(cells).filter(c => c.getAttribute('data-row') === c.getAttribute('data-col'));
/*
1. diagonal2 tienen que ser las celdas que sumen data-row y data-col igual a 2, es decir, (0,2), (1,1) y (2,0)
2. parseInt convierte el string a numero
3. ! para decirle a typescript que no es null porque lo sabemos de antemano, 
 ya que el HTML está bien formado y tiene esos atributos*/
const diagonal2 = Array.from(cells).filter(c =>parseInt(c.getAttribute('data-row')!) + parseInt(c.getAttribute('data-col')!) === 2);

cells.forEach(cell => {
  cell.addEventListener('click', () => {
    if (cell.textContent || gameOver) return; // ⛔ bloquear si ya ganó alguien

    cell.textContent = currentPlayer;

    const row = cell.dataset.row!;
    const col = cell.dataset.col!;

    if (checkWin(row, col)) {
      alert(`Player ${currentPlayer} wins!`);
      gameOver = true; // 🔒 bloquear tablero
      return;
    }

    if(checkDraw()){
      alert(`It's a draw!`);
      gameOver = true; // 🔒 bloquear tablero
      return;
    }
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  });
});

function checkWin(row: string, col: string): boolean {
  //horizontal
  const sameRow = Array.from(cells).filter(c => c.getAttribute('data-row') === row);  
  const sameCol = Array.from(cells).filter(c => c.getAttribute('data-col') === col);
  
  if (checkLine(sameRow)) return true;
  if (checkLine(sameCol)) return true;
  //si no es la diagonal principal ni la secundaria, no hace falta comprobarlas
  if(row !== col && parseInt(row) + parseInt(col) !== 2){return false;}
  if (checkLine(diagonal1)) return true;
  if (checkLine(diagonal2)) return true;
  return false;
}

function checkLine (line: HTMLDivElement[]): boolean {
  let count = 0;
  for (const cell of line) {
    count++;
    if(cell.textContent !== currentPlayer){
      return false
    }
    if (count===3){
      return true;
    }
  };
  return false;
}

function checkDraw(): boolean {
  for (const cell of cells) {
    if (!cell.textContent) {
      return false; // todavía hay casillas vacías
    }
  }
  return true; // ninguna casilla vacía → empate
}

//SUM NUMBERS GAME
const sumCells = document.querySelectorAll<HTMLDivElement>('#sum-numbers .ttt-cell');
let draggedCell: HTMLDivElement | null = null;
sumCells.forEach(cell => {
  cell.addEventListener('dragstart', () => {
    draggedCell = cell;
  });
  cell.addEventListener('dragover', (e) => {
    e.preventDefault();
  });
  cell.addEventListener('drop', (e) => {
    e.preventDefault();
    if (draggedCell && draggedCell !== cell) {
      const draggedValue = parseInt(draggedCell.textContent);
      const targetValue = parseInt(cell.textContent);
      cell.textContent = (draggedValue + targetValue).toString();
      draggedCell.textContent = draggedValue.toString();
    }
  });
  cell.addEventListener('dragend', () => {
    draggedCell = null;
  });
});