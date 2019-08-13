var boxes = document.getElementsByClassName('box');
var whosTurn = 'x';

var handleClicks = (e) => {
  if (e.target.tagName === 'SPAN') {
    onSpanClick(e, e.target);
  } else if (e.target.className.includes('box')) {
    onBoxClick(e);
  } else if (e.target.className.includes('restart')) {
    onRestartClick(e);
  }
};

var onRestartClick = (e) => {
  whosTurn = 'x';
  document.querySelectorAll('span').forEach((e) => {
    e.innerHTML = '';
  });
  document.querySelectorAll('.box').forEach((e) => {
    e.classList.remove('winningLine');
  });
  document.getElementById('winnertext').innerHTML = '';

};
var onSpanClick = (e) => {
  whosTurn = e.target.innerHTML;
  e.target.innerHTML = '';
};

var onBoxClick = (e) => {
  if (!e.target.children[0].innerHTML) {
    e.target.children[0].innerHTML = whosTurn;
    if (whosTurn === 'x') {
      whosTurn = 'o';
    } else {
      whosTurn = 'x';
    }
  } else {
    whosTurn = e.target.children[0].innerHTML;
    e.target.children[0].innerHTML = '';
  }
  manageWinner();
};

var checkForWinner = (board) => {
  if (compareEquals(board[0], board[1], board[2])) {
    return [board[0], 0, 1, 2];
  } else if (compareEquals(board[3], board[4], board[6])) {
    return [board[3], 3, 4, 6];
  } else if (compareEquals(board[6], board[7], board[8])) {
    return [board[6], 6, 7, 8];
  } else if (compareEquals(board[0], board[3], board[6])) {
    return [board[0], 0, 3, 6];
  } else if (compareEquals(board[1], board[4], board[7])) {
    return [board[1], 1, 4, 7];
  } else if (compareEquals(board[2], board[5], board[8])) {
    return [board[2], 2, 5, 8];
  } else if (compareEquals(board[0], board[4], board[8])) {
    return [board[0], 0, 4, 8];
  } else if (compareEquals(board[2], board[4], board[6])) {
    return [board[2], 2, 4, 6];
  } else {
    return [];
  }
};

var manageWinner = () => {
  var board = getBoard();
  var tie = true;
  for (let e of board) {
    if (!e) {
      tie = false;
    }
  }
  if (tie) {
    let str = 'TIE! NO ONE WON';
    document.getElementById('winnertext').innerHTML = str;
    return;
  }
  var winner = checkForWinner(board);
  if (winner.length) {
    let str = `${winner[0].toUpperCase()} HAS WON`;
    for (let i = 1; i < winner.length; i++) {
      document.getElementById(`${winner[i]}`).classList.add('winningLine');
    }
    document.getElementById('winnertext').innerHTML = str;
  }
};

var compareEquals = (one, two, three) => {
  if (one === '' || two === '' || three === '') {
    return false;
  }
  if (one === two && two === three) {
    return true;
  } else {
    return false;
  }
};

var getBoard = () => {
  let board = [];
  for (let box of boxes) {
    board.push(box.children[0].innerHTML);
  }
  return board;
};

document.addEventListener('click', handleClicks);

