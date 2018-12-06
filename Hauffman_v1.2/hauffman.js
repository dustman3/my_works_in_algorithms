const fs = require('fs');
const path = require('path');
const charFrequncy = require('./charFrequncy');
const hauffmanTreeConst = require('./hauffmanTreeConst');
const hauffmanCode = require('./hauffmanCode');

async function main() {

    let filePath = path.join(__dirname, 'infile.dat');
    let fileData;
    let freqArray;

    fileData = await fs.readFileSync(filePath, { encoding: 'utf-8' });

    fileData = fileData.replace(/[^A-Z0-9]/ig, "");

    freqArray = charFrequncy.charFrequencyCount(fileData);

    filePath = path.join(__dirname, 'output.dat');

    await fs.writeFileSync(filePath, `     Symbol       Frequency
    ********************************`);

    let total = freqArray.total;
    var arr1 = freqArray.array.slice(0);

    for (let i = arr1.length - 1, j = 0; j <= i; i-- , j++) {
        [arr1[i], arr1[j]] = [arr1[j], arr1[i]]
    }


    arr1.forEach(async (element) => {
        let calc = element[1] * 100 / total;
        let str = `\n\n       ${element[0]},          ${calc} % `;
        await fs.appendFileSync(filePath, str);
    });

    let totalBits = 0;

    let tree = hauffmanTreeConst(freqArray.array);

    let code = hauffmanCode(tree);

    let str = `\n\n\n\n    Symbol     Huffman Codes
    *************************`   ;

    await fs.appendFileSync(filePath, str);

    arr1.forEach(async (element) => {
        let str = `\n\n       ${element[0]},          ${code[element[0]]}`;       
        totalBits += (code[element[0]].length) * (element[1]);
        await fs.appendFileSync(filePath, str);
    });

    str = `\n\n       Total Bits : ${totalBits}`;
    await fs.appendFileSync(filePath, str);

    console.log("The output.dat file is generated sucessfully at \n",__dirname)
}

main();

