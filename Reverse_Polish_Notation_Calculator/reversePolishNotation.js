const readlineSync = require('readline-sync');
const chalk = require('chalk');                  //https://www.npmjs.com/package/chalk
const Queue = require('./Queue');
const Stack = require('./Stack');
const convertInfixToPostfix = require('./infixToPostfix');
const postfixCalculate = require('./postfixCalculation');
console.log(chalk.yellow.bgRed("***************************************************************"));
console.log(chalk.yellow.bgRed("***************REVERSE POLISH NOTATION CALCULATOR**************"));
console.log(chalk.yellow.bgRed("***************************************************************"));
let quit = "";
while (quit.toLowerCase() != "quit") {


    let infixExp = readlineSync.question(chalk.green(`\nPLEASE ENTER THE INFIX EXPRESSION:`)).trim(); ////actual code

    console.log(`\nIf you want to quit, You can quit now.\n`);
    quit = readlineSync.question("Please enter 'quit' for Quitting or press any key to continue:").trim();

    if (quit.toLowerCase() == "quit") {
        console.log(chalk.green(`\nThank You for playing the game.`));
        process.exit();
    }
    console.log(chalk.green(`\nEntered Infix Expression is ${infixExp}`));

    let postfixExpression = convertInfixToPostfix(infixExp);

    console.log(chalk.green(`\nPostfix expression of ${infixExp} is :  ${postfixExpression}`)); 

    let postfixCalculation = postfixCalculate(postfixExpression);

    console.log(chalk.green(`\nAnswer for Postfix Expression ${postfixExpression} is ${postfixCalculation}.`));

    console.log(`\nIf you want to quit, You can quit now.\n`);
    quit = readlineSync.question("Please enter 'quit' for Quitting  or press any key to continue:").trim();
    if (quit.toLowerCase() == "quit") {
        console.log(chalk.green(`\nThank You.`));

    }
}

process.exit();
