const chalk = require('chalk');
const Queue = require('./Queue');
const Stack = require('./Stack');

let postfixCalculate = (postQu) => {
    let eval = new Stack();
    var postQ = new Queue();
    let str = "";
    let strPOW = "";
    postQArray = postQu.split("");
    for (let i = 0; i < postQArray.length; i++) {
        if (Number(postQArray[i]) || postQArray[i] == '.' || postQArray[i] == '0') {

            str += postQArray[i];
            if (i == postQArray.length - 1) {
                postQ.EnQueue(str);
                if (strPOW == "POW") {
                    postQ.EnQueue(strPOW);
                    console.log("test" + strPOW)
                    strPOW = "";
                }
            }
        }
        else {
            if (str != "") {
                postQ.EnQueue(str);
                str = "";
            }
            if (postQArray[i] == 'P' || postQArray[i] == 'O' || postQArray[i] == 'W') {
                strPOW += postQArray[i];
                if (strPOW == "POW") {
                    postQ.EnQueue(strPOW);
                    strPOW = "";

                }

            } else {
                postQ.EnQueue(postQArray[i]);
            }
        }
    }
    //Starts -- Sample code provided in the PDF, code modified for POW and mulitdigits
    var topNum, nextNum, answer;
    while (!postQ.isEmpty()) {
        t = postQ.front();
        if (t == " ") {
            postQ.DeQueue();
            continue;
        }
        postQ.DeQueue();
        if (Number(t) || t == 0) {
            eval.push(t);
        }
        else {
            topNum = parseFloat(eval.Top());
            eval.pop();
            nextNum = parseFloat(eval.Top());
            eval.pop();                        // Remove operand from stack
            switch (t) {
                case '+': answer = nextNum + topNum;
                    if (answer % 1 != 0) {
                        answer = answer.toFixed(2);
                    }
                    break;
                case '-': answer = nextNum - topNum;
                    if (answer % 1 != 0) {
                        answer = answer.toFixed(2);
                    }
                    break;
                case '*': answer = nextNum * topNum;
                    if (answer % 1 != 0) {
                        answer = answer.toFixed(2);

                    }
                    break;
                case '/': if (topNum !== 0) {
                    answer = nextNum / topNum;
                    if (answer % 1 != 0) {           //https://stackoverflow.com/questions/2304052/check-if-a-number-has-a-decimal-place-is-a-whole-number
                        answer = answer.toFixed(2);   //https://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-only-if-necessary
                    }
                    break;
                } else return "Incorrect Expression, Number cant be divided by zero";
                case '%': answer = nextNum % topNum; break;
                case "POW": answer = Math.pow(nextNum, topNum);
            }
            eval.push(answer);
        }
    }
    return eval.Top();
}
//ENDS -- Sample code provided in the PDF, code modified for POW and mulitdigits

module.exports = postfixCalculate;