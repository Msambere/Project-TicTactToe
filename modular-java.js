function gameBoard(){
    let board = []
    for(x=0; x<9; x++){
        board.push(boardSpot(x));
    };
    const getBoard = () => board;

    const placeMarker =(spotChoice, turn)=>{
        board[spotChoice].value =assignMarker(turn);
    };
    return{getBoard, placeMarker}
};

function boardSpot(index){
    let spotName = index;
    let value = null;
    let boardSpot = {spotName, value}

    const assignMarker=(turn)=>{
        value = turn.marker;
    };

    const getValue = ()=>value;

    return{boardSpot, assignMarker, getValue};
};

function  createPlayers(){

    const playerOneName = document.getElementById('player1').value || 'Player1';
    const playerTwoName = document.getElementById('player2').value || 'Player2';

    const players = [
        {name: capitalizeFirstLetter(playerOneName), marker: 'X'}, {name: capitalizeFirstLetter(playerTwoName), marker: 'O'}
    ];
    
    function firstTurn(){
        let coinFlip = Math.floor(Math.random()*2);
        return coinFlip == 0? players[0]:players[1];
    };
    return {players, firstTurn}
};


function capitalizeFirstLetter(string) {
    return (string[0].toUpperCase()+string.slice(1).toLowerCase());
 };

function gameController(){
    let win = false;
    let numTurns=0;
    const board = gameBoard();
    const players = createPlayers();
    const getPlayers = players.players;
    let turn = players.firstTurn(); 
    
    const changeTurn =()=>{
        return turn = turn == getPlayers[0] ? getPlayers[1]: getPlayers[0];
    };
    const getTurn = () => turn;

    const getWin = () => win;

    const getNumTurns = () => numTurns;

    

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
            return win = true; 
        }else if(numTurns === 9){
            return win = 'tie';
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
    function resetGame(){
        players = [];
        board = gameBoard();
        turn=()=>firstTurn();
        numTurns=0;
        win = false
        nameInputDialog.showModal();
        boardSpots.forEach((spot)=> spot.addEventListener("click",playRound));
    }
    return{getPlayers, playRound, getTurn, getWin, getNumTurns, resetGame, getBoard: board.getBoard}
};
    
function ScreenController(){
    const game = gameController();
    const nameInputDialog = document.querySelector('.name-input');
    const boardSpots = document.querySelectorAll('.board-spot');
    const winnerDialog = document.querySelector('.winner')
    const winnerDisplay= document.querySelector('#winBox')
    const confirmBtn = nameInputDialog.querySelector("#confirmBtn");
    const closeBtn = document.querySelector('#closeBtn');
    const resetBtn = document.querySelector('#resetBtn')
    const statusDisplay = document.querySelector('.status-display');
    

    

    confirmBtn.addEventListener("click", (event) => {
        event.preventDefault();
        nameInputDialog.close();
        statusDisplay.textContent =`${game.getTurn().name}\'s turn`
        //boardSpots.forEach((spot)=> spot.addEventListener("click",game.playRound))
        document.getElementById("name-form").reset();
    });

    closeBtn.addEventListener("click", () => {
        winnerDialog.close();
    });

    resetBtn.addEventListener('click', () =>{
        game.resetGame();
    });

    //Startup
    nameInputDialog.showModal();
    boardSpots.forEach((spot)=> spot.addEventListener("click",game.playRound))

    if (game.getWin() === true){
        boardSpots.forEach((spot)=> spot.removeEventListener("click",game.playRound));
        winnerDisplay.textContent = `${game.getTurn().name} wins!`;
        winnerDialog.showModal();
    }else if (game.getWin() ==='tie'){
        boardSpots.forEach((spot)=> spot.removeEventListener("click",game.playRound));
        winnerDisplay.textContent = `It's a tie`;
        winnerDialog.showModal();
    }
};
     
ScreenController();
   //const printNewRound needed?


    
