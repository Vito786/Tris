let currentPlayer = 1;
let moves = 0;
let gameEnded = false;

const cells = document.querySelectorAll('.cell');
const statusMessage = document.getElementById('status');
const resetButton = document.getElementById('resetButton');

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);

function handleCellClick(event) {
  const cell = event.target;

  if (cell.textContent !== '' || gameEnded) {
    return;
  }

  const symbol = currentPlayer === 1 ? 'O' : 'X';
  cell.textContent = symbol;
  cell.classList.add('player' + currentPlayer);


  if (checkWin()) {
    statusMessage.textContent = 'Ha vinto il giocatore ' + currentPlayer;
    gameEnded = true;
  } else if (moves === 8) {

    statusMessage.textContent = 'Patta';
    gameEnded = true;
  } else {

    currentPlayer = currentPlayer === 1 ? 2 : 1;
    statusMessage.textContent = "Tocca al giocatore " + currentPlayer;
    moves++;
  }
}

function checkWin() {
  const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Righe
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colonne
    [0, 4, 8], [2, 4, 6] // Diagonali
  ];

  for (let condition of winConditions) {
    if (
      cells[condition[0]].textContent !== '' &&
      cells[condition[0]].textContent === cells[condition[1]].textContent &&
      cells[condition[1]].textContent === cells[condition[2]].textContent
    ) {

      return true;
    }
  }

  return false;
}

function resetGame() {
  currentPlayer = 1;
  moves = 0;
  gameEnded = false;
  statusMessage.textContent = 'Tocca al giocatore 1';
  
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('player1', 'player2');
  });
}
