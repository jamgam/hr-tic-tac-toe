var boxes = document.getElementsByClassName('box');
var whosTurn = 'x';

var onClick = (e) => {
  // console.log(e.target.children[0].innerHTML);
  if (e.target.children[0] === undefined) {
    console.log(e.target);
  }
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
  if (checkForWinner(getBoard())) {
    let str = `${checkForWinner(getBoard()).toUpperCase()} HAS WON`;
    document.getElementById('winnertext').innerHTML = str;
  }
  console.log(checkForWinner(getBoard()));
};

var checkForWinner = (board) => {
  if (compareEquals(board[0], board[1], board[2])) {
    return board[0];
  } else if (compareEquals(board[3], board[4], board[6])) {
    return board[3];
  } else if (compareEquals(board[6], board[7], board[8])) {
    return board[6];
  } else if (compareEquals(board[0], board[3], board[6])) {
    return board[0];
  } else if (compareEquals(board[1], board[4], board[7])) {
    return board[1];
  } else if (compareEquals(board[2], board[5], board[8])) {
    return board[2];
  } else if (compareEquals(board[0], board[4], board[8])) {
    return board[0];
  } else if (compareEquals(board[2], board[4], board[6])) {
    return board[2];
  } else {
    return '';
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


for (let box of boxes) {
  box.addEventListener('click', onClick);
}

// document.getElementsByClassName('box').addEventListener('click', onClick);

// ele.appendChild(document.querySelector('#app'));
// document.querySelector('#app').appendChild(ele);
// document.getElementById('app').appendChild(ele);

