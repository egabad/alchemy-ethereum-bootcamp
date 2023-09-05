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

    isValid(block) {
        for (let i = 1; i < this.chain.length; i++) {
            const prevBlockHash = this.chain[i - 1].toHash().toString();
            const currBlockPrevHash = this.chain[i].previousHash.toString();
            if (prevBlockHash !== currBlockPrevHash) {
                return false;
            }
        }
        return true;
    }
}

module.exports = Blockchain;