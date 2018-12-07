const readlineSync = require('readline-sync');
const chalk = require('chalk');
const searchWord = require('./searchWord');
const fs = require('fs');
const readline = require('readline');
const display = require('./display.js');


let obj = {};
var ingore = ["a", "an", "and", "but", "or", "the"];


class Tries {

    constructor() {

        this.root = {
            child1: null
        }
    }

    getTree() {
        return this.root;
    }

    insert(string) {

        if (!searchWord.search(this.root, string)) {


            let arr = string.split("");
            let len = arr.length;
            if (ingore.indexOf(string) == -1) {
                obj[string] = 1;
            }
            let arrOcc = string.split("'s");
            if (arrOcc.length > 1) {
                if (obj.hasOwnProperty(arrOcc[0])) {
                    obj[arrOcc[0]] = obj[arrOcc[0]] + 1;
                }
            }

            if (this.root.child1 == null) {
                let current = this.root;
                for (let i = 0; i < len; i++) {

                    let new_node = {
                        value: arr[i],
                        child1: null
                    }

                    current.child1 = new_node;
                    current = current.child1;

                }

            }
            else {

                let size = Object.keys(this.root).length;
                let count = 0;
                for (var property1 in this.root) {

                    if (arr[0] == this.root[property1].value) {
                        break;
                    }

                    count++;
                }

                if (count == size) {

                    let node = {
                        value: arr[0],
                        child1: null
                    }

                    let current = node;

                    for (let i = 1; i < len; i++) {

                        let new_node = {
                            value: arr[i],
                            child1: null
                        }

                        current.child1 = new_node;
                        current = current.child1;

                    }
                    let string = `child${count + 1}`;
                    this.root[string] = node;
                }
                else {

                    let str = `child${count + 1}`;

                    let nestedTree = complexTree(this.root[str], arr);

                    this.root[str] = nestedTree;

                    finish = 0;

                }
            }
        } else {
            if (ingore.indexOf(string) == -1) {
                if (obj.hasOwnProperty(string)) {
                    obj[string] = obj[string] + 1;
                } else if (obj.hasOwnProperty(string + "'s"))
                    obj[string] = obj[string] + 1;
            }
        }
    }
}

function complexTree(root, arr, previous) {

    let i = 0;
    let current = root;
    while (current.value != null) {
        let flag = true;
        for (let property in current) {

            if (finish == 1) {
                return root;
            }

            if (current[property] == arr[i] && flag) {
                flag = false;
            }
            else if (flag == false && current[property] != null) {
                complexTree(current[property], arr.slice(i + 1, arr.length), current);
            }
            else if (current[property] == null) {

                arr = arr.slice(i + 1, arr.length);

                let node = {
                    value: arr[i],
                    child1: null
                }

                let recent = node;

                for (let i = 1; i < arr.length; i++) {

                    let new_node = {
                        value: arr[i],
                        child1: null
                    }

                    recent.child1 = new_node;

                    recent = recent.child1;

                }

                current[property] = node;
                finish = 1;


            }
            else {
                let node = {
                    value: arr[i],
                    child1: null
                }
                let max = 0;
                for (let property in previous) {
                    if (property != "value") {
                        let num = parseInt(property.match(/\d/g).join(""));
                        max = num > max ? num : max;
                    }

                }
                let a = 1;
                let current = node;
                while (a < arr.length) {
                    let subRoot = {
                        value: arr[a],
                        child1: null
                    }

                    current.child1 = subRoot;
                    current = current.child1;
                    a++;
                }

                let str = `child${max + 1}`;
                previous[str] = node;
                finish = 1;

            }



        }
        i++;
 
    }

}
let finish = 0;

function main(text) {

    let tries = new Tries();

    let dataArr = text.replace(/[^a-zA-Z ]/g, "").split(" ");
 
    let len = dataArr.length;
 
    for (let i = 0; i < len; i++) {
        tries.insert(dataArr[i]);
    }

    let fileName = "companies.dat";
    try {

        file = fs.readFileSync(`${fileName}`, "UTF-8");
    }
    catch (e) {
        throw console.log("Companies.dat file is not Present.");
    }

    if (file.length < 1) throw console.log("Provided file 'Companies.dat' is empty.");

    let companies = file.split("\r\n");

    let tempObj = {};

    let companyFound = [];

    for (let i = 0; i < companies.length; i++) {

        let arr = companies[i].replace(/[^a-zA-Z ]/g, "").split(" ");
        let count = 0;

        for (let j = 0; j < arr.length; j++) {
            companyFound.push(arr[0]);
            if (arr[j].length != 0) {
                if (searchWord.search(tries.getTree(), arr[j])) {
                    count++;
                    if (ingore.indexOf(arr[j]) != -1) {
                        if (tempObj.hasOwnProperty(arr[j])) {
                            tempObj[arr[j]] = tempObj[arr[j]] + 1;
                        }
                        else {
                            tempObj[arr[j]] = 1;
                        }
                    }
                }



            }
        }

        arr.forEach(element => {
            if (tempObj.hasOwnProperty(element)) {
                if (obj.hasOwnProperty(element)) {
                    obj[element] = obj[element] + 1;
                }
                else {
                    obj[element] = 1;
                }

            }
        });


        tempObj = {};
    }

    let wordCount = 0;
    for (var property in obj) {
        wordCount += obj[property];
      }

    let uniqueArray = companyFound.filter(function (item, pos) {

        return companyFound.indexOf(item) == pos;

    })


    display(companies, obj, wordCount, uniqueArray);

}


let read = readline.createInterface({    // https://stackoverflow.com/questions/46762894/javascript-node-js-how-to-read-and-process-multiple-line-provided-as-an-inpu/46763311
    input: process.stdin,
    output: process.stdout,
    terminal: false
});
let text1 = "";
console.log("Enter the article below:");
read.on('line', function (line) {
    text1 += line + " ";
    if (line === '.') {
        read.close();
    }
});

read.on('close', function () {
    main(text1);
})

