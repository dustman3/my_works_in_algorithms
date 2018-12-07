/*
    Authors:
    Amel George Rathappillil(10442659)
    Amit Vadnere(10442085)
    Harish Indalkar(10441759)

*/
const readlineSync = require('readline-sync');
const externalModules = require("./externalModules");
const gameProcessor = require("./gameProcessor");
const saveRetrieveModule = require("./saveRetrieveModule");

function gameInitDisplay() {

    console.log("**************************************************\n**************************************************");
    console.log("**************************************************\n*******************TIC TAC TOE********************");
    console.log("**************************************************\n**************************************************");
    console.log("**************************************************");

    let checkFlag = readlineSync.question("Press E to continue ");

    if (checkFlag.toLowerCase() === "e") {
        externalModules.reset();
        gameInitOption();
    }

    else {
        externalModules.reset();
        console.log("Invalid Key ! Try AGAIN");
        gameInitDisplay();
    }
};
function gameInitOption() {

    console.log("                     1.NEW GAME                   ");
    console.log("                    2.RESUME GAME                 ");
    console.log("                       3.QUIT                     \n");

    let optionMenu = readlineSync.question("Press 1,2 or 3 for selecting above options \n");
    externalModules.reset();

    switch (optionMenu) {
        case "1":
            gameInput();
            break;
        case "2":
            let retriveGameObj = saveRetrieveModule.retriveGame();
            startGame(retriveGameObj.noOfPlayers, retriveGameObj.boardSize, retriveGameObj.winCondition, retriveGameObj.storeMove, retriveGameObj.currentPlayerCount);
            break;
        case "3":
            console.log("B.B.....Bye !!");
            break;
        default:
            console.log('incorrect option! Try again');
            gameInitOption();
    }
};
function gameInput() {
    let noOfPlayers, boardSize, winCondition;
    while (true) {

        noOfPlayers = parseInt(readlineSync.question("Enter the number of players "));

        if (noOfPlayers > 26) { externalModules.reset(); console.log("Number of player cannot be greater than 26 "); }
        else if (noOfPlayers < 2) { externalModules.reset(); console.log("Number of player cannot be smaller than 2 "); }
        else if (isNaN(noOfPlayers)) { externalModules.reset(); console.log("Please enter a number"); }
        else break;
    }

    while (true) {

        boardSize = parseInt(readlineSync.question("Enter the size of board (x*x) "));

        if (boardSize > 999) { externalModules.reset(); console.log("Size of board cannot be greater than 999 ") }
        else if (boardSize < 2) { externalModules.reset(); console.log(" Size of board cannot be smaller than 2 ") }
        else if (isNaN(boardSize)) { externalModules.reset(); console.log("Please enter a NUMBER."); }
        else break;
    }

    while (true) {

        winCondition = parseInt(readlineSync.question("Enter the win condition "));

        if (isNaN(winCondition)) {
            externalModules.reset();
            console.log("Please enter a Integer Value.");

        }
        else {
            try {
                gameProcessor.gameConditionCheck(noOfPlayers, boardSize, winCondition);
                externalModules.reset();
                break;
            }
            catch (err) {
                externalModules.reset();
                console.log(err);
                gameInput();
            }
        }
    }

    let storeMove = externalModules.create2DArray(boardSize, boardSize);
    storeMove = externalModules.matrixIntialization(storeMove, boardSize);
    currentPlayerCount = 0;
    startGame(noOfPlayers, boardSize, winCondition, storeMove, currentPlayerCount);

};
function startGame(noOfPlayers, boardSize, winCondition, storeMove, currentPlayerCount) {

    playerSymbolList = gameProcessor.assignSymbol(noOfPlayers);
    

    winnerPlayer = gameProcessor.playerMove(noOfPlayers, boardSize, winCondition, currentPlayerCount, storeMove, playerSymbolList);

    if (winnerPlayer != 0) {
        console.log(" Player " + winnerPlayer + " is the WINNER !\n");

        let checkFlag = readlineSync.question("Press E to continue ");

        if (checkFlag.toLowerCase() === "e") {
            externalModules.reset();
            gameInitOption();
        }

        else {
            externalModules.reset();
            console.log("Invalid Key ! Try AGAIN");
            gameInitDisplay();
        }
    }
    else if (winnerPlayer == 0) {
        console.log("It's a tie ! \n");

        let checkFlag = readlineSync.question("Press E to continue ");
        if (checkFlag.toLowerCase() === "e") {
            externalModules.reset();
            gameInitOption();
        }

        else {
            externalModules.reset();
            console.log("Invalid Key ! Try AGAIN");
            gameInitDisplay();
        }
    }
    
    else {
        throw ("Thank you for Playing\n");
    }
};

gameInitDisplay();

