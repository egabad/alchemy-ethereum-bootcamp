class Tree {
    constructor() {
        this.root = null;
    }

    addNode(node) {
        if (this.root === null) return this.root = node;
        node.data < this.root.data ? this.root.left = node : this.root.right = node;
        return;
    }
}


module.exports = Tree;