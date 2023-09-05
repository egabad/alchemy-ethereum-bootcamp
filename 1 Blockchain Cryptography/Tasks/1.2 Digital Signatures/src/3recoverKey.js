const secp = require("ethereum-cryptography/secp256k1");
const hashMessage = require("./1hashMessage");

async function recoverKey(message, signature, recoveryBit) {
    return secp.recoverPublicKey(hashMessage(message), signature, recoveryBit);
}

module.exports = recoverKey;