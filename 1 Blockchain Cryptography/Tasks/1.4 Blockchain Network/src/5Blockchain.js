const Block = require('./5Block');

class Blockchain {
    constructor() {
        this.chain = [ new Block('Genesis!') ];
    }

    addBlock(block) {
        const currChain = [...this.chain];
        const currBlock = currChain.pop();
        block.previousHash = currBlock.toHash();
        this.chain.push(block);
    }
}

module.exports = Blockchain;