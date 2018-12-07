const fs = require('fs');
const readlineSync = require('readline-sync');

const saveGame = function saveGame(storeMove, currentPlayerCount, noOfPlayers, boardSize, winCondition) {
    let fileName = readlineSync.question(`Enter the name of the file to Save.`);
    try {
        fs.writeFileSync(`${fileName}.txt`, storeMove + `,${currentPlayerCount},${noOfPlayers},${boardSize},${winCondition}`);
        console.log(`\n===File saved sucessfully===\n`);
        process.exit();
    }
    catch (err) {
        console.log("Error in Saving File");
    }
}
const retriveGame = function retriveGame() {

    let flag = true;
    let retriveGameObj;
    while (flag) {
        let file_name = readlineSync.question(" Please Specify the name of the File You Saved: ");
        let file;
        //const file =
        try {
            file = fs.readFileSync(`${file_name}.txt`, "UTF-8");
            flag = false;
        }
        catch (err) {
            console.log(`${file_name}.txt is a wrong file please provide correct file name.`);
            continue;
        }
        storeMoveStr = file.split(',');
        winCondition = storeMoveStr.pop();
        boardSize = storeMoveStr.pop();
        noOfPlayers = storeMoveStr.pop();
        currentPlayerCount = storeMoveStr.pop();
        storeMove = new Array(boardSize);
        k = 0;
        for (let i = 0; i < boardSize; i++) {
            storeMove[i] = new Array(boardSize);
            for (let j = 0; j < boardSize; j++) {
                storeMove[i][j] = storeMoveStr[k];
                k++;
            }
        }

        retriveGameObj = { noOfPlayers, boardSize, winCondition, storeMove, currentPlayerCount };
    }
    return retriveGameObj;

}
module.exports = {
    saveGame,
    retriveGame
}