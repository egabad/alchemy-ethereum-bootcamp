const Block = require('./2Block');

class Blockchain {
    constructor() {
        this.chain = [ new Block('Genesis!') ];
    }

    addBlock(block) {
        return this.chain.push(block);
    }
}

module.exports = Blockchain;