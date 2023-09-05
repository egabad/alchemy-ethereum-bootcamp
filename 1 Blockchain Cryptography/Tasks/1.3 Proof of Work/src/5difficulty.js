const SHA256 = require('crypto-js/sha256');
const TARGET_DIFFICULTY = BigInt(0x0fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff);
const MAX_TRANSACTIONS = 10;

const mempool = [];
const blocks = [];

function addTransaction(transaction) {
    mempool.push(transaction);
}

function getHash(block) {
    return SHA256(JSON.stringify(block));
}

function getHashInt(hash) {
    return BigInt(`0x${hash}`);
}

function mine() {
    // Instantiate block
    let block = { id: blocks.length, nonce: 0 };
    
    // Pull transactions from mempool
    const currMempool = [...mempool];
    block.transactions = currMempool.filter((transaction, i) => {
        if (i < MAX_TRANSACTIONS) {
            mempool.shift();
            return transaction;
        }
    });
    
    // Get block hash that meets target difficulty requirement
    while(getHashInt(getHash(block)) > TARGET_DIFFICULTY) {
        block.nonce++;
    }

    // Use proof of work hash
    block.hash = getHash(block);

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