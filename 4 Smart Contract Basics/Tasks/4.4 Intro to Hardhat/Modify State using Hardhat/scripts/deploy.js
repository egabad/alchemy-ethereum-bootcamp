import * as ethers from 'ethers';
import 'dotenv/config';

async function main() {

  const url = process.env.LOCAL_URL;

  let artifacts = await hre.artifacts.readArtifact('ModifyVariable');

  const provider = new ethers.providers.JsonRpcProvider(url);

  let privateKey = process.env.PRIVATE_KEY;

  let wallet = new ethers.Wallet(privateKey, provider);

  let factory = new ethers.ContractFactory(artifacts.abi, artifacts.bytecode, wallet);

  let contract = await factory.deploy(100, 'Hello World');

  console.log('Contract address:', contract.address);

  await contract.deployed();
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
});
