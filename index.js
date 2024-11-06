const container = document.getElementById('container');
let min_num_cells = 2;
let num_colors = 2;
let init_cells = 10;
const scoreSpan = document.getElementById('score');
const cellNumbersSpan = document.getElementById('cellNumbers');
let idInterval; 
let time = 2000;

function createCell() {
  //creo el div que va dentro del container con su clase
  const cell = document.createElement('div');
  cell.classList.add('cell');
  //cojo un numero random de los marcados
  let randomColor = Math.floor(Math.random()*num_colors)+1;
  //le añado con una clase con dicho numero que eso definira su color en style
  cell.classList.add('color' + randomColor);
  //añado un onclick para poder eliminar los cuadrado que coinciden
  cell.setAttribute('onclick', 'removeCell(this)');
  container.append(cell);
  refreshCellNumbers();
}

function removeCell(cell) {
  //creo un array en el que meto el div que clickeo
  let rangeCells = [cell];
  //guardo la clase como variable para compararla
  let color = cell.classList[1];
  //cojo el siguiente div y comparo sus clases
  let nextCell = cell.nextElementSibling;
  while (nextCell && nextCell.classList[1] === color ) {
    //mientras sean del mismo color los meto en el array
    rangeCells.push(nextCell);
    //vuelvo a llamar al siguiente div para comprobarlo
    nextCell = nextCell.nextElementSibling;
  }

  //hago lo mismo pero hacia atras por si pulso en medio
  let prevCell = cell.previousElementSibling;
  while (prevCell && prevCell.classList[1] === color ) {
    rangeCells.push(prevCell);
    prevCell = prevCell.previousElementSibling;
  }

  //si tiene mas divs que el limite elimino los que se encuentren en el array
  if (rangeCells.length >= min_num_cells) {
    //sumo al contador la cantidad de celdas eliminadas
    scoreSpan.textContent = parseInt(scoreSpan.textContent) + rangeCells.length;
    rangeCells.forEach(cell => cell.remove());
    //refresco el contador de divs
    refreshCellNumbers();
    //si la cantidad de divs es igual a 0 entonces termino la partida
    if (container.children.length == 0) {
      clearInterval(idInterval);
      setTimeout(()=>container.innerHTML = '<h1>GANASTE</h1>', 500);
    }
  }
}

//funcion que cuenta la cantidad de divs y se muestra en el html
function refreshCellNumbers() {
  cellNumbersSpan.textContent = container.children.length;
}

function startGame() {
  container.textContent = '';
  scoreSpan.textContent = 0;
  //creo los divs que indique en el init_cells
  for(let i = 0; i < init_cells; i++) {
    createCell();
  }
  
  //con el interval creo un div cada vez que termine el tiempo marcado
  idInterval = setInterval(createCell, time)
}

//startGame();
