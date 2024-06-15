require('dotenv').config();
const { ethers, upgrades } = require('hardhat');
const { createInterface } = require('readline');

const proxyAddress = process.env.LOCAL_PROXY_ADDRESS || process.env.PROXY_ADDRESS;

async function upgrade(version) {
  const VendingMachine = await ethers.getContractFactory(`VendingMachineV${version}`);
  const upgraded = await upgrades.upgradeProxy(proxyAddress, VendingMachine);
  await upgraded.waitForDeployment();

  const implementationAddress = await upgrades.erc1967.getImplementationAddress(
    proxyAddress
  );

  console.log('The current contract owner is: ' + await upgraded.owner());
  console.log('Implementation contract address: ' + implementationAddress);
}

function main() {
  const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  readline.question('Vending machine contract version: ', (v) => {
    upgrade(v).then(() => readline.close());
  });
}

main();