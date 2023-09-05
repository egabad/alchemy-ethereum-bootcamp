const { keccak256 } = require("ethereum-cryptography/keccak");

function getAddress(publicKey) {
    const publicKeyhash = keccak256(publicKey.slice(1));
    return publicKeyhash.slice(publicKeyhash.length - 20);
}

module.exports = getAddress;