class Tree {
    constructor() {
        this.root = null;
    }

    addNode(node) {
        this.root === null ? this.root = node : this.assignChild(this.root, node);
    }

    assignChild(parent, child) {
        if (child.data < parent.data) {
            parent.left === null ? 
                parent.left = child : this.assignChild(parent.left, child);
        } else {
            parent.right === null ? 
                parent.right = child : this.assignChild(parent.right, child);
        }
    }
}


module.exports = Tree;