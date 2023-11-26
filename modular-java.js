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
    let value = 0;
    
    const assignMarker=(turn)=>{
        value = turn.marker;
    };

    const getValue = ()=>value;

    return{ assignMarker, getValue};
};

function gameController(playerOneName= 'Mom', playerTwoName='Dad'){
    const board = gameBoard();

    const players = [
        {name: playerOneName, marker: "x"},
        {name: playerTwoName, marker:"O"}
    ];

    let win = false;
    let turn = firstTurn();
    numTurns=0;

    function firstTurn(){
        let coinFlip = Math.floor(Math.random()*2);
        if (coinFlip == 0){
            return players[0];
        }else{
            return players[1];
        };
    };

    function changeTurn(){
        turn = turn == players[0] ? players[1]: players[0];
        };
    

    function checkForWinner(){
        //Row to check
        rowNum= Math.floor(spotChoice/3)
        row=[emptyBoard[rowNum*3].value, emptyBoard[rowNum*3+1].value, emptyBoard[rowNum*3+2].value];
        //Column to check
        colNum=spotChoice%3
        col=[emptyBoard[colNum].value, emptyBoard[colNum+3].value, emptyBoard[colNum+6].value];
        //Diagonals
        diagonal1 = [emptyBoard[0].value, emptyBoard[4].value, emptyBoard[8].value];
        diagonal2 = [emptyBoard[2].value, emptyBoard[4].value, emptyBoard[6].value];
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
        spotChoice=prompt(`${getTurn().name}, choose a spot 0-8:`);
        while(board[spotChoice].value != 0){
            alert('That spot is already taken')
            spotChoice=prompt(`${getTurn().name}, choose a spot 0-8:`);
        } ;
        return spotChoice;
    }

    const getTurn = () => turn;

    const playRound = () =>{
        getPlayerMove();
        board.placeMarker(spotChoice,getTurn());
        numTurns +=1;
        checkForWinner();
    };
    return{playRound, getTurn}
};

const game =GameController();
        
        
   //const printNewRound needed?


    
