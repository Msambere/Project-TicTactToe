//hard code for testing
let players = createPlayers();
let board = makeBoard();
let turn = firstTurn();
console.log(players);
console.log(board);
console.log(turn);


//


//Game play
function gamePlay(){
    let win = false;
    numTurns=0;
    while(win === false){
        getPlayerMove();
        numTurns+=1;
        checkForWinner();
    };
};



function checkForWinner(){
    //Row to check
    rowNum= Math.floor(spotChoice/3)
    row=[board[rowNum*3].value, board[rowNum*3+1].value, board[rowNum*3+2].value];
    //Column to check
    colNum=spotChoice%3
    col=[board[colNum].value, board[colNum+3].value, board[colNum+6].value];
    //Diagonals
    diagonal1 = [board[0].value, board[4].value, board[8].value];
    diagonal2 = [board[2].value, board[4].value, board[6].value];
    //Check 
    const isTurnMarker= (spotValue)=> spotValue === turn.marker;
    if(row.every(isTurnMarker) || col.every(isTurnMarker) || diagonal1.every(isTurnMarker) || diagonal2.every(isTurnMarker)){
        return win = true, console.log(`${turn.name} wins!`);
    }else if(numTurns === 9){
        return win = true, console.log(`It's a tie!`);
    }else{
        return changeTurn();
    };
};



function getPlayerMove(){
    spotChoice=prompt(`${turn.name}, choose a spot 0-8:`);
    while(board[spotChoice].value != 0){
        alert('That spot is already taken')
        spotChoice=prompt(`${turn.name}, choose a spot 0-8:`);
    } 
    board[spotChoice].value = turn.marker
    console.log(`${turn.name} took square ${board[spotChoice].spotName}`)
    console.log(board);
    return spotChoice;
};



function firstTurn(){
    let coinFlip = Math.floor(Math.random()*2);
    if (coinFlip == 0){
        return players[0];
    }else{
        return players[1];
    };
};


function changeTurn(){
    if (turn == players[0]){
        return turn = players[1];
    }else {
        return turn = players[0];
    };
};


function makeBoard(){
    let board = []
    for(x=0; x<9; x++){
        board.push(boardSpot(x))
    };
    return board;
}

function boardSpot(index){
    let spotName = index;
    let value = 0;
    return{spotName, value};
};

function  createPlayers(){
    const playerOneName = prompt("Type players[0] name:");
    const playerTwoName = prompt('Type players[1] name')

    const players = [
        {
          name: playerOneName,
          marker: 'X'
        },
        {
          name: playerTwoName,
          marker: 'O'
        }
      ];
    return players
};
