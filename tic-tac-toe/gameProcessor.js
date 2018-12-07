const readlineSync = require('readline-sync');
const saveRetrieveModule = require("./saveRetrieveModule");
const externalModules = require("./externalModules");

function banner(noOfPlayers, boardSize, winCondition, storeMove) {
    externalModules.reset();
    console.log("\n**************************************************");
    console.log("No of Player:  " + noOfPlayers + "\nBoard Size:    " + boardSize + "\nWin Condition:", winCondition);
    console.log("****************************************************\n");
    gridConstructor(boardSize, storeMove);
}
const gameConditionCheck = function gameConditionCheck(noOfPlayers, boardSize, winCondition) {
    noOfPlayers = parseInt(noOfPlayers); boardSize = parseInt(boardSize); winCondition = parseInt(winCondition);
    if (boardSize < 3) throw "Board size cannot be smaller than 3";
    if (noOfPlayers > boardSize) throw "Number of player cannot be greater than board size";
    if (winCondition > boardSize) throw "Win Condition cannot be greater than board Size";
    if (winCondition < 3) throw "Win Condition cannot be smaller than 3";
}
const gridConstructor = function gridConstructor(boardSize, storeMove) {

    process.stdout.write("    ");
    for (let n = 0; n < boardSize; n++) {
        if (n < 9 && n > -1) {
            process.stdout.write(" " + (n + 1) + "  ");
        }
        else if (n < 99 && n > 8) {
            process.stdout.write(" " + (n + 1) + " ");
        }
        else if (n < 998 && n > 98) {
            process.stdout.write((n + 1) + " ");
        }
    }
    console.log();
    let stringNumber;
    for (let j = 0; j < boardSize; j++) {
        if (j < 9 && j > -1) {
            stringNumber = (j + 1) + "   ";
        }
        else if (j < 99 && j > 8) {
            stringNumber = (j + 1) + "  ";
        }
        else if (j < 998 && j > 98) {
            stringNumber = (j + 1) + " ";
        }
        process.stdout.write(stringNumber);

        for (let i = 0; i < boardSize; i++) {
            if (storeMove[j][i] == 0 || storeMove[j][i] == undefined) {
                if (i == (boardSize - 1)) {
                    process.stdout.write("   ");
                }
                else {
                    process.stdout.write("   |");
                }
            }
            else if (storeMove[[j][i]] != 0 || storeMove[j][i] != undefined) {

                if (i == (boardSize - 1)) {
                    process.stdout.write(" " + storeMove[j][i]);
                }
                else {
                    process.stdout.write(" " + storeMove[j][i] + " |");
                }
            }
        }
        console.log();

        if (j != boardSize - 1) {
            process.stdout.write("  ");
            for (let k = 0; k < boardSize; k++) {
                if (k == 0)
                    process.stdout.write("  ");
                process.stdout.write("---");
                if (k != boardSize - 1) {
                    process.stdout.write("+");
                }
            }
        }
        console.log();
    }

    console.log();
}
const assignSymbol = function assignSymbol(noOfPlayers) {

    let playerSymbolList = new Array();
    playerSymbolList.push("X");
    playerSymbolList.push("O");

    if (noOfPlayers > 2) {
        for (let i = 0; i < noOfPlayers; i++) {
            if (!(i == 14 || i == 23)) {
                if (playerSymbolList.length < noOfPlayers)
                    playerSymbolList.push(String.fromCharCode(65 + i));
            }
        }
    }
    return playerSymbolList
}
const playerMove = function playerMove(noOfPlayers, boardSize, winCondition, currentPlayerCount, storeMove, playerSymbolList) {

    let winnerPlayer = null;
    for (playerNo = currentPlayerCount; playerNo < (boardSize * boardSize); playerNo++) {

        let currentPlayer = (playerNo % noOfPlayers) + 1;
        banner(noOfPlayers, boardSize, winCondition, storeMove);
        console.log(`PLAYER ${currentPlayer} ENTER YOUR MOVE Or PRESS Q to QUIT: `);

        while (1) {

            let rowColProcess = readlineSync.question(`Enter ROW and COLUMN number with space: `);

            rowColNum = [];
            rowColNum = rowColProcess.split(" ");

            if (rowColProcess.trim().toLowerCase() == 'q') {

                while (true) {
                    externalModules.reset();
                    let saveMenu = readlineSync.question(`To save the game type Yes else press No : `);
                    if (saveMenu.toLowerCase() == "yes") {
                        saveRetrieveModule.saveGame(storeMove, playerNo, noOfPlayers, boardSize, winCondition);
                        process.exit();
                    }
                    else if (saveMenu.toLowerCase() == "no") {
                        process.exit();
                    }

                }
            }
            
            else if (rowColNum.length > 2 || rowColNum.length < 2) {
                console.log("Invalid Entry! Try again! ");
                while (rowColNum.length = 0) {
                    rowColNum.pop();
                }
            }

            else if (rowColNum.length === 2) {
                let temprow = parseInt(rowColNum[0]);
                let tempcol = parseInt(rowColNum[1]);
                if(isNaN(temprow)||isNaN(tempcol)) console.log("\n Row or column cannot be string \n");
                else if (temprow < 1 || tempcol < 0) {
                    console.log("column or row number cannot be smaller than 0");
                }
                else if (parseInt(temprow) > parseInt(boardSize) || parseInt(tempcol) > parseInt(boardSize)){
                    console.log("Index out of bound");
                }
                else if ((storeMove[temprow - 1][tempcol - 1]) != 0 || (storeMove[temprow - 1][tempcol - 1]) != '0') {
                    console.log("There is already an entry at that position! try again ");
                    while (rowColNum.length = 0) {
                        rowColNum.pop(); //emptying the wrong entry
                    }
                }
                else break;
            }
        }
        winnerPlayer = processMove(rowColNum, playerNo, storeMove, playerSymbolList, winCondition, boardSize);
        if (winnerPlayer != 0) break;
    }
    banner(noOfPlayers, boardSize, winCondition, storeMove);
    return winnerPlayer;
}
const processMove = function processMove(rowColNum, playerNo, storeMove, playerSymbolList, winCondition, boardSize) {

    temprow = (rowColNum[0] - 1);
    tempcol = (rowColNum[1] - 1);
    storeMove[temprow][tempcol] = playerSymbolList[(playerNo % (playerSymbolList.length))];

    let playerSymbol = playerSymbolList[(playerNo % (playerSymbolList.length))];
    let result = checkWinner(storeMove, playerSymbol, winCondition, boardSize, temprow, tempcol);

    gridConstructor(boardSize, storeMove);

    if (result == "Won") {
        let winnerPlayer = playerNo % (playerSymbolList.length) + 1;
        return winnerPlayer;
    }
    else
        return 0;
}
const checkWinner = function checkWinner(storeArr, playerSymbol, winConditionString, boardSize, rowNum, rowColNum) {

    let horiFwd = 1, horiBkd = 1, vertUp = 1, vertDown = 1, diagonalUp = 1, diagonalDown = 1, diagonalUpBk = 1, diagonalDownBk = 1;
    let midVertical = 1, midHorizontal = 1, midDiagonalFwd = 1, midDiagonalBwd = 1;
    let winCondition = parseInt(winConditionString);

    if (storeArr[rowNum][rowColNum] === playerSymbol) {
        //horizontal
        for (let j = 1; j <= winCondition; j++) {
            if ((rowColNum + j) < boardSize) {
                if (storeArr[rowNum][rowColNum + j] == playerSymbol) {
                    horiFwd++;
                   // console.log("hori" + horiFwd);
                    if (horiFwd === winCondition && j == (winCondition - 1)) {
                        return "Won";
                    }
                }
            }
            if ((rowColNum + j) < boardSize) {
                if (storeArr[rowNum][rowColNum + j] == playerSymbol) {
                    midVertical++;
                }
            }
            if ((rowColNum - j) >= 0) {
                if (storeArr[rowNum][rowColNum - j] == playerSymbol) {
                    midVertical++;
                }
            }
            //   console.log("hori" + midVertical);
            if (midVertical === winCondition) {
                return "Won";
            }
 
            if ((rowNum + j) < boardSize) {
                if (storeArr[rowNum + j][rowColNum] == playerSymbol) {
                    midHorizontal++;
                }
            }
            if ((rowNum - j) >= 0) {
                if (storeArr[rowNum - j][rowColNum] == playerSymbol) {
                    midHorizontal++;
                }
            }
            if (midHorizontal === winCondition) {
                return "Won";
            }

            if ((rowColNum + j) < boardSize && (rowNum - j) >= 0) {
                if (storeArr[rowNum - j][rowColNum + j] == playerSymbol) {
                    midDiagonalFwd++;
                }
            }
            if ((rowColNum - j) >= 0 && (rowNum + j) < boardSize) {
                if (storeArr[rowNum + j][rowColNum - j] == playerSymbol) {
                    midDiagonalFwd++;
                }
            }
            if (midDiagonalFwd === winCondition) {
                return "Won";
            }

            if ((rowColNum - j) >=0 && (rowNum - j) >= 0) {
                if (storeArr[rowNum - j][rowColNum - j] == playerSymbol) {
                    midDiagonalBwd++;
                }
            }
            if ((rowColNum + j) < boardSize && (rowNum + j) < boardSize) {
                if (storeArr[rowNum + j][rowColNum + j] == playerSymbol) {
                    midDiagonalBwd++;
                }
            }
            if (midDiagonalBwd === winCondition) {
                return "Won";
            }

            if ((rowColNum - j) >= 0) {
                if (storeArr[rowNum][rowColNum - j] == playerSymbol) {
                    horiBkd++;
                    if (horiBkd === winCondition && j == (winCondition - 1)) {
                        return "Won";
                    }
                }
            }
            if ((rowNum + j) < boardSize) {
                if (storeArr[rowNum + j][rowColNum] == playerSymbol) {
                    vertDown++;
                    if (vertDown === winCondition && j == (winCondition - 1)) {
                        return "Won";
                    }
                }
            }
            if ((rowNum - j) >= 0) {
                if (storeArr[rowNum - j][rowColNum] == playerSymbol) {
                    vertUp++;
                    if (vertUp === winCondition && j == (winCondition - 1)) {
                        return "Won";
                    }
                }
            }

            if ((rowColNum + j) < boardSize && (rowNum - j) >= 0) {
                if (storeArr[rowNum - j][rowColNum + j] == playerSymbol) {
                    diagonalUp++;
                    if (diagonalUp === winCondition && j == (winCondition - 1)) {
                        return "Won";
         1           }
                }
            }

            if ((rowNum + j) < boardSize && (rowColNum - j) >= 0) {
                if (storeArr[rowNum + j][rowColNum - j] == playerSymbol) {
                    diagonalDown++;
                    if (diagonalDown === winCondition && j == (winCondition - 1)) {
                        return "Won";
                    }
                }
            }

            if ((rowColNum - j) >= 0 && (rowNum - j) >= 0) {
                if (storeArr[rowNum - j][rowColNum - j] == playerSymbol) {
                    diagonalUpBk++;
                    if (diagonalUpBk === winCondition && j == (winCondition - 1)) {
                        return "Won";
                    }
                }
            }

            if ((rowNum + j) < boardSize && (rowColNum + j) < boardSize) {
                if (storeArr[rowNum + j][rowColNum + j] == playerSymbol) {
                    diagonalDownBk++;
                    if (diagonalDownBk === winCondition && j == (winCondition - 1)) {
                        return "Won";
                    }
                }
            }
        }

    }
}
module.exports = {
    gameConditionCheck,
    gridConstructor,
    assignSymbol,
    processMove,
    checkWinner,
    playerMove
}