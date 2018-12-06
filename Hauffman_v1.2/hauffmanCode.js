function code(tree) {

    tree = tree[0][0];
    let obj = {};
    while (tree.right != null || tree.left != null) {

        let currentNode = tree;
        let code = "";
        let flag = true;
        while (flag) {

            if (currentNode.left != null &&
                currentNode.left.hasOwnProperty('left') &&
                currentNode.left.hasOwnProperty('right') &&
                currentNode.left.left == null &&
                currentNode.left.right == null) {
                currentNode.left = null;
                break;
            }
            if (currentNode.right != null &&
                currentNode.right.hasOwnProperty('left') &&
                currentNode.right.hasOwnProperty('right') &&
                currentNode.right.left == null &&
                currentNode.right.right == null) {
                currentNode.right = null;
                break;
            }
            if (typeof currentNode.left !== "string" && currentNode.left != null) {
                code += 0;
                currentNode = currentNode.left;
            }
            else if (typeof currentNode.right !== "string" && currentNode.right != null) {
                code += 1;
                currentNode = currentNode.right;
            }
            else if (typeof currentNode.left == "string") {
                code += 0;
                obj[currentNode.left] = code;
                currentNode.left = null;
                flag = false;

            }
            else if (typeof currentNode.right == "string") {
                code += 1;
                obj[currentNode.right] = code;
                currentNode.right = null;
                flag = false;
            }
        }
    }
    return obj;
}
module.exports = code;