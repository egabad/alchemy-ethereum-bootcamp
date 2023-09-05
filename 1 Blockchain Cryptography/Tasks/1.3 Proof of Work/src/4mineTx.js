const SHA256 = require('crypto-js/sha256');
const TARGET_DIFFICULTY = BigInt(0x0fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff);
const MAX_TRANSACTIONS = 10;

const mempool = [];
const blocks = [];

function addTransaction(transaction) {
    mempool.push(transaction);
}

function mine() {
    // Instantiate block
    const id = blocks.length;
    let block = { id };
    
    // Pull transactions from mempool
    const currMempool = [...mempool];
    block.transactions = currMempool.filter((transaction, i) => {
        if (i < MAX_TRANSACTIONS) {
            mempool.shift();
            return transaction;
        }
    });

    // Get block hash
    const blockStringified = JSON.stringify(block);
    block.hash = SHA256(blockStringified);

    // Add block to chain
    blocks.push(block);
}

module.exports = {
    TARGET_DIFFICULTY,
    MAX_TRANSACTIONS,
    addTransaction, 
    mine, 
    blocks,
    mempool
};