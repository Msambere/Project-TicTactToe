//hard code for testing
let players = [];
let board = makeBoard();
let turn=null
let numTurns=0;


const boardSpots = document.querySelectorAll('.board-spot');
boardSpots.forEach((spot)=> spot.addEventListener("click",playRound))



const nameInputDialog = document.querySelector('.name-input');
const winnerDialog = document.querySelector('.winner')
const winnerDisplay= document.querySelector('#winBox')

nameInputDialog.showModal();

const confirmBtn = nameInputDialog.querySelector("#confirmBtn");
const closeBtn = document.querySelector('#closeBtn');
const resetBtn = document.querySelector('#resetBtn')

const statusDisplay = document.querySelector('.status-display');

 
confirmBtn.addEventListener("click", (event) => {
    event.preventDefault();
    nameInputDialog.close();
    players = createPlayers();
    turn = firstTurn();
    statusDisplay.textContent =`${turn.name}\'s turn`
    document.getElementById("name-form").reset();
  });

closeBtn.addEventListener("click", () => {
    winnerDialog.close();
  });

resetBtn.addEventListener('click', () =>{
    resetGame();
});
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
        winnerDisplay.textContent = `${turn.name} wins!`;
        winnerDialog.showModal();
        return win = true; 
    }else if(numTurns === 9){
        winnerDisplay.textContent = `It's a tie`;
        winnerDialog.showModal();
        return win = true;
    }else{
        changeTurn();
        statusDisplay.textContent =`${turn.name}\'s turn`
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
    takenSpot.setAttribute('style',`color:${getMarkerColor(spotChoice)};`);
};

function getMarkerColor(spotChoice){
    return board[spotChoice].value === "X" ? '#fe6d73':'#227c9d';
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
        let currentSpot = document.querySelector(`[data-index= '${x}']`);
        currentSpot.textContent= null;
    };
    return board;
}

function boardSpot(index){
    let spotName = index;
    let value = null;
    return{spotName, value};
};

function  createPlayers(){

    const playerOneName = document.getElementById('player1').value || 'player1';
    const playerTwoName = document.getElementById('player2').value || 'player2';

    const players = [
        {name: capitalizeFirstLetter(playerOneName), marker: 'X'}, {name: capitalizeFirstLetter(playerTwoName), marker: 'O'}
      ];
    return players
};



function capitalizeFirstLetter(string) {
   return (string[0].toUpperCase()+string.slice(1).toLowerCase());
};

function resetGame(){
    players = [];
    board = makeBoard();
    turn=null
    numTurns=0;
    nameInputDialog.showModal();
    boardSpots.forEach((spot)=> spot.addEventListener("click",playRound));
}