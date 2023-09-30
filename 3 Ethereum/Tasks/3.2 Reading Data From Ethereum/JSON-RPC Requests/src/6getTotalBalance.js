require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');
const url = `https://eth-mainnet.g.alchemy.com/v2/${API_KEY}`;

async function getTotalBalance(addresses) {
    const batch = addresses.map((address, i) =>  ({
        jsonrpc: "2.0",
        id: i,
        method: "eth_getBalance",
        params: [address],
    }));

    const response = await axios.post(url, batch);

    return response.data.reduce((a,b) => a + parseInt(b.result), 0);
}

module.exports = getTotalBalance;