class Stack {
    constructor(arr) {
        this.arr = arr || [];
    }

    IsEmpty() {
        return this.arr.length == 0;
    }

    pop() {

        return this.arr.pop();
    }

    push(num) {
        this.arr.push(num);
    }

    Top() {
        return this.arr[this.arr.length - 1];
    }
}

module.exports = Stack;