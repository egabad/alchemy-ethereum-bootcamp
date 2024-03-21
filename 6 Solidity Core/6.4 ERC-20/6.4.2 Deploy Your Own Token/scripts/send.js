const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  const contract = await ethers.getContractAt("SabrToken", process.env.CONTRACT_ADDRESS);
  const signer = await ethers.provider.getSigner(0);
  console.log(await contract.connect(signer).transfer(process.env.RECIPIENT, 5000));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});