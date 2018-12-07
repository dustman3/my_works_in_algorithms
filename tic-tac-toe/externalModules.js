
const reset = function reset() {
    // this function referred from https://gist.github.com/KenanSulayman/4990953
    return process.stdout.write('\033c');
}
const matrixIntialization = function matrixIntialization(storeMove, boardSize) {
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            storeMove[i][j] = 0;
        }
    }
    return storeMove;
}
const create2DArray = function create2DArray(numRows, numColumns) {
    // this function https://stackoverflow.com/questions/966225/how-can-i-create-a-two-dimensional-array-in-javascript
    let array = new Array(numRows);
    for (let i = 0; i < numColumns; i++) {
        array[i] = new Array();
    }

    console.log(array[1][0]);
    return array;
}
module.exports = {
    reset,
    create2DArray,
    matrixIntialization
}