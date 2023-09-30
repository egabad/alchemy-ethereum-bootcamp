const axios = require('axios');
require('dotenv').config();

// copy-paste your URL provided in your Alchemy.com dashboard
const ALCHEMY_URL = `https://eth-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`;
const randomEOAAddress = '0xe5cB067E90D5Cd1F8052B83562Ae670bA4A211a8';
const randomContractAddress = '0xa6f6eec9ba3d2e5e1cc21f060c670a04fc3728b9';
const randomTransactionHash = '0xeef595de3a9413fcc2d624fb21a4eeb4c134b8ff2f1cd07b5f43bd579f75ba82';

const batch = [
  {
    jsonrpc: '2.0', id: 1,
    method: 'eth_getBlockByNumber',
    params: [
      '0xb443', // Block 46147
      true  // Retrieve the full transaction object in transactions array
    ]
  },
  {
    jsonrpc: '2.0', id: 2,
    method: 'eth_chainId',
  },
  {
    jsonrpc: '2.0', id: 3,
    method: 'eth_accounts',
  },
  {
    jsonrpc: '2.0', id: 4,
    method: 'eth_getBalance',
    params: [
      randomEOAAddress,
      'latest', // Block tag for the most recent block in the canonical chain
    ],
  },
  {
    jsonrpc: '2.0', id: 5,
    method: 'eth_blockNumber',
  },
  {
    jsonrpc: '2.0', id: 6,
    method: 'eth_getTransactionCount',
    params: [
      randomEOAAddress,
      'latest',
    ],
  },
  {
    jsonrpc: '2.0', id: 7,
    method: 'eth_getTransactionByHash',
    params: [
      randomTransactionHash,
    ],
  },
  {
    jsonrpc: '2.0', id: 8,
    method: 'web3_clientVersion',
  },
  {
    jsonrpc: '2.0', id: 9,
    method: 'eth_gasPrice',
  },
  {
    jsonrpc: '2.0', id: 10,
    method: 'eth_getCode',
    params: [
      randomContractAddress,
      'latest',
    ],
  },
];

axios.post(ALCHEMY_URL, batch).then((response) => {
  response.data.forEach((x, i) => {
    console.log('===', x.id, batch[i].method, '===');
    console.log(x.result);
  });
});
