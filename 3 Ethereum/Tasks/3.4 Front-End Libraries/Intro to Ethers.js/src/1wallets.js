const ethers = require('ethers');
const { Wallet, HDNodeWallet } = ethers;

require('dotenv').config();
const { PRIVATE_KEY, MNEMONIC } = process.env;

// create a wallet with a private key
const wallet1 = new Wallet(PRIVATE_KEY);

// create a wallet from mnemonic
const wallet2 = Wallet.fromMnemonic(MNEMONIC);

module.exports = {
    wallet1,
    wallet2,
}
