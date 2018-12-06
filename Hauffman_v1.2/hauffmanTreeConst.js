function treeConst(array) {

    let treeConst = new Tree();

    for (let i = 0; ; i++) {
        let left = array.shift();
        let right = array.shift();
        let addFreq = left[1] + right[1]
        let leftSymbol = left[0];
        let rightSymbol = right[0];
        let arr = [];
        arr.push(leftSymbol);
        arr.push(rightSymbol);
        array = treeConst.add(array, addFreq, arr);
        if (array.length == 1) {
            break;
        }
    }
    return array;
}

class Tree {
    add(root, freq, arr) {
        let newArr = [];
        let count = 0;

        let new_node = {
            nodeValue: freq,
            left: arr[0],
            right: arr[1]
        }

        newArr.push(new_node);
        newArr.push(freq);
        root.unshift(newArr);

        for (let i = 1; i < root.length; i++) {

            if (freq <= root[i][1]) {
                root.splice(i - 1, 0, root.shift());                    //https://stackoverflow.com/questions/586182/how-to-insert-an-item-into-an-array-at-a-specific-index

                break;
            }
            count++;
            if (count == root.length - 1) {
                root.push(root.shift());
            }
        }
        return root;
    }
    isEmpty() {
        return this.root == null;
    }
}
module.exports = treeConst;