class MerkleTree {
    constructor(leaves, concat) {
        this.leaves = leaves;
        this.concat = concat;
    }

    getRoot(layer = this.leaves) {
        const numLeaves = layer.length;
        if (numLeaves === 1) return layer[0];

        const isOdd = numLeaves % 2 === 1;
        const loopEnd = isOdd ? numLeaves - 1 : numLeaves;
        let newLayer = [];

        for (let i = 0; i < loopEnd; i += 2) {
            newLayer.push(this.concat(layer[i], layer[i + 1]));
        }

        if (isOdd) newLayer.push(layer[numLeaves - 1]);

        return this.getRoot(newLayer);
    }
}

module.exports = MerkleTree;