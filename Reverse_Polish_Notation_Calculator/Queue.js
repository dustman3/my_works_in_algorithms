class Queue {

    constructor(arr) {
        this.arr = arr || [];
    }

    isEmpty() {
        if (this.arr == null || this.arr == undefined || this.arr.length == 0) {
            return true;
        }
        return false;
    }
    front() {
        return this.arr[0];
    }

    DeQueue() {
        return this.arr.shift();
    }

    EnQueue(num) {
        this.arr.push(num);
    }

    print() {
        return this.arr.join("");
    }


}

module.exports = Queue;