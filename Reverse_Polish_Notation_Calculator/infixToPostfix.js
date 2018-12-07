const chalk = require('chalk');
const Queue = require('./Queue');
const Stack = require('./Stack');
let convertInfixToPostfix = (infixExp) => {
    var opStack = new Stack();
    var postQ = new Queue();
    var infixQ = new Queue();
    var t;
    let str = "";
    let strPOW = "";
    for (let i = 0; i < infixExp.length; i++) {
        if (Number(infixExp[i]) || infixExp[i] == '.' || infixExp[i] == 0) {

            str += infixExp[i];
            if (i == infixExp.length - 1) {
                infixQ.EnQueue(str);
                if (strPOW == "POW") {
                    infixQ.EnQueue(strPOW);
                    strPOW = "";

                }
            }
        }
        else {
            if (str != "") {
                infixQ.EnQueue(str);
                str = "";
            }
            if (strPOW == "POW") {
                infixQ.EnQueue(strPOW);
                strPOW = "";

            }
            if (infixExp[i] == 'P' || infixExp[i] == 'O' || infixExp[i] == 'W') {
                strPOW += infixExp[i];
            } else {
                infixQ.EnQueue(infixExp[i]);
            }
        }
    }
    //Starts -- Sample code provided in the PDF, code modified for POW and mulitdigits
    while (!infixQ.isEmpty()) {
        t = infixQ.front();
        infixQ.DeQueue();

        if (Number(t) || t == 0) {                           //https://www.w3schools.com/jsref/jsref_number.asp
            postQ.EnQueue(t);
            postQ.EnQueue(" ");

        } else if (opStack.IsEmpty()) {
            opStack.push(t);
        } else if (t == '(') {
            opStack.push(t);
        } else if (t == ')') {
            while (opStack.Top() != '(') {
                postQ.EnQueue(opStack.Top());
                opStack.pop();
            }
            opStack.pop();
        } else if (t == "POW") {
            postQ.EnQueue(t)
        } else {
            while (!opStack.IsEmpty() && opStack.Top() != '(' && precedence(t) <= precedence(opStack.Top())) {

                postQ.EnQueue(opStack.Top());
                opStack.pop();

            }
            opStack.push(t);
        }
    }
    while (!opStack.IsEmpty()) {

        postQ.EnQueue(opStack.Top());
        opStack.pop();

    }

    return postQ.print();
    //ENDS -- Sample code provided in the PDF, code modified for POW and mulitdigits
}



function precedence(t) {                        //https://www.geeksforgeeks.org/stack-set-2-infix-to-postfix/
    switch (t) {
        case '+':
        case '-':
            return 1;

        case '*':
        case '/':
        case '%':
            return 2;

        case "POW":
            return 3;
    }
    return -1;
}
module.exports = convertInfixToPostfix;