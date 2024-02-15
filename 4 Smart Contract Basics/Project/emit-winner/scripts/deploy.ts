import { ethers, network } from 'hardhat';
import 'dotenv/config';

const isLocal = network.name === 'local' ? true : false;
const privKey = (isLocal ? process.env.LOCAL_PRIVATE_KEY : process.env.GOERLI_PRIVATE_KEY) ?? 'key';
const provider = ethers.provider;
const deployer = new ethers.Wallet(privKey, provider);

async function main() {
  console.log('Network name: ', network.name);
  console.log('Deployer: ', deployer.address);
  console.log('Deployer balance: ', (await provider.getBalance(deployer)).toString());
  
  if (isLocal) {
    await deploy('Contract');
  }
  await deploy('EmitWinner');
}

async function deploy(contractName: string) {
  const contract = await ethers.deployContract(contractName);
  await contract.waitForDeployment();

  console.log('Deployed at ', contract.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});