const Block = require('./2Block');

class Blockchain {
    constructor() {
        this.chain = [ new Block('Genesis!') ];
    }
}

module.exports = Blockchain;