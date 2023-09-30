const { utils, providers, Wallet } = require('ethers');
const { ganacheProvider } = require('./config');

const provider = new providers.Web3Provider(ganacheProvider);

async function donate(privateKey, charities) {
    const wallet = new Wallet(privateKey, provider);
    const value = utils.parseEther('1.0');
    for (charity of charities) {
        await wallet.sendTransaction({ value, to: charity });
    }
}

module.exports = donate;