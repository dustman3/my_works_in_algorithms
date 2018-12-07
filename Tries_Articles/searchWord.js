let search = function (tree, word) {

    if(tree.child1==null) return false;

    let arr = word.split("");
    let treeArr = [];
    let len = arr.length;
    let i = 0;

    while (i != len) {
        for (let property in tree) {
            update = false;
            if (property != "value" && tree[property] != null && tree[property].value == arr[i]) {
                treeArr.push(tree[property].value);
                tree = tree[property];
                i++;
                update = true;
                break;
            }
        }

        if (i == 0) return false;

        if(!update){
            break;
        }

    }

    if(treeArr.join("") === arr.join("")){
        return true;
    }
    else{
        return false;
    }


}

module.exports = {
    search
}