//hard code for testing
let players = createPlayers();
let board = makeBoard();
let turn = firstTurn();
let numTurns=0;
const boardSpots = document.querySelectorAll('.board-spot');
boardSpots.forEach((spot)=> spot.addEventListener("click",playRound))
const turnDisplay = document.querySelector('.turn-display');
turnDisplay.textContent =`${turn.name}\'s turn`
const winBox= document.querySelector('.winner');


//


//Game play
function gamePlay(){
    let win = false;
    while(win === false || numTurns<9){
        playRound();
    };
};

function playRound(event){
    spotChoice=event.target.getAttribute('data-index');
    displayPlayerMove(getPlayerMove(spotChoice));
    numTurns+=1;
    checkForWinner();
    turnDisplay.textContent =`${turn.name}\'s turn`
    return numTurns;
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
        boardSpots.forEach((spot)=> spot.removeEventListener("click",playRound));
        winBox.textContent =`${turn.name} wins!`;
        return win = true; 
    }else if(numTurns === 9){
        return win = true, winBox.textContent = `It's a tie!`;
    }else{
        changeTurn();
        return win = false;
    };
};



function getPlayerMove(spotChoice){
    if(board[spotChoice].value != null){
        alert('That spot is already taken')
    }else{
        board[spotChoice].value = turn.marker
        //console.log(`${turn.name} took square ${board[spotChoice].spotName}`)
        //console.log(board);
        return spotChoice;
    }
};

function displayPlayerMove(spotChoice){
    let takenSpot = document.querySelector(`[data-index= '${spotChoice}']`);
    takenSpot.textContent= board[spotChoice].value;
    takenSpot.setAttribute('style',`color:${getMarkerColor(spotChoice)}; font-size:80%; font-weight:bold; font-size: 100px;`);
};

function getMarkerColor(spotChoice){
    return board[spotChoice].value === "X" ? 'red':'blue';
};

function firstTurn(){
    let coinFlip = Math.floor(Math.random()*2);
    return coinFlip == 0? players[0]:players[1];
};


function changeTurn(){
    return turn = turn == players[0] ? players[1]: players[0];
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
    let value = null;
    return{spotName, value};
};

function  createPlayers(){
    const playerOneName = "mom" //prompt("Type player1 name:");
    const playerTwoName = "dad" //prompt('Type player2 name')

    const players = [
        {name: playerOneName, marker: 'X'}, {name: playerTwoName, marker: 'O'}
      ];
    return players
};
