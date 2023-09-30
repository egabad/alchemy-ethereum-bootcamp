const { providers } = require('ethers');
const { ganacheProvider } = require('./config');

const provider = new providers.Web3Provider(ganacheProvider);

async function findEther(address) {
    const blockNumber = await provider.getBlockNumber();
    const recipients = [];
    for (let i = 0; i <= blockNumber; i++) {
        const block = await provider.getBlockWithTransactions(i);
        block.transactions.map((tx) => {
            if (tx.from === address) recipients.push(tx.to);
        });
    }

    return recipients;
}

module.exports = findEther;