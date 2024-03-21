const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const weiAmount = (await ethers.provider.getBalance(deployer.address)).toString();
  
  console.log("Account balance:", ethers.formatEther(weiAmount));

  const Token = await ethers.getContractFactory("SabrToken");
  const token = await Token.deploy();

  console.log("Token address:", token.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});