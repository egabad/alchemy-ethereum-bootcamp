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

    hasNode(num) {
        return this.search(this.root, num);
    }

    search(node, num) {
        if (num === node.data) {
            return true;
        } else if (num < node.data) {
            if (node.left === null) return false;
            return this.search(node.left, num);
        } else if (num > node.data) {
            if (node.right === null) return false;
            return this.search(node.right, num);
        }
    }
}


module.exports = Tree;