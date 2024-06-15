const hre = require('hardhat');
const { provider, keccak256, zeroPadValue, toBeHex, toUtf8Bytes } = hre.ethers;


async function lookupStorage() {
  const address = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';

  // eth_getStorageAt
  const x = await provider.getStorage(address, '0x0');
  console.log('x: ', parseInt(x));
  const y = await provider.getStorage(address, '0x1');
  console.log('y: ', parseInt(y));

  const a1Key = zeroPadValue(toBeHex(6), 32);
  console.log('a1Key:     ', a1Key);
  const aBaseSlot = zeroPadValue(toBeHex(0x2), 32).slice(2);
  console.log('aBaseSlot: ', aBaseSlot);
  const a1Slot = keccak256(a1Key + aBaseSlot);
  console.log('a1Slot:    ', a1Slot);
  const a1 = await provider.getStorage(address, a1Slot);
  console.log('a1:        ', parseInt(a1));
}

async function lookupArbitraryStorage() {
  const address = '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9';

  // using eth_getStorageAt
  const slot = keccak256(toUtf8Bytes('Hello World!'));
  const value = await provider.getStorage(address, slot);

  console.log('slot(keccack256("Hello World!")): ', parseInt(value));

  // using function in smart contract
  const storage = await hre.ethers.getContractAt('ArbitraryStorage', address);
  await storage.check();
}

lookupStorage();
lookupArbitraryStorage();