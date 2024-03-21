require("dotenv").config();
const { Alchemy, Network } = require("alchemy-sdk");
const { firstTopic, secondTopic } = require('./4topics');
// prefix both the topics with 0x
const topics = [firstTopic(), secondTopic()].map((x) => '0x' + x);

const config = {
  apiKey: process.env.API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(config);

async function totalDaiTransferred(fromBlock, toBlock) {
  const logs = await alchemy.core.getLogs({
    address: "0x6b175474e89094c44da98b954eedeac495271d0f",
    fromBlock,
    toBlock,
    topics
  });


  const data = logs.map((log) => BigInt(log.data));
  return data.reduce((a, b) => a + b);
}

module.exports = totalDaiTransferred;