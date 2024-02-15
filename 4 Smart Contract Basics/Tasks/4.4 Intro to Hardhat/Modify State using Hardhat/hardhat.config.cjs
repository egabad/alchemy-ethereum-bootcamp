require('@nomiclabs/hardhat-ethers');
require('dotenv').config();

module.exports = {
  solidity: '0.8.4',
  networks: {
    local: {
      url: process.env.LOCAL_URL,
      accounts: [process.env.PRIVATE_KEY],
    }
  }
};