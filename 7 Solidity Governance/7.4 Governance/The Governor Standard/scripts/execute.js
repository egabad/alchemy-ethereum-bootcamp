const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  const [owner] = await ethers.getSigners();
  const governor = await ethers.getContractAt("MyGovernor", process.env.GOVERNOR_CONTRACT);
  const token = await ethers.getContractAt("MyToken", process.env.TOKEN_CONTRACT);

  const amount = "15000";
  await governor.execute(
    [token.address],
    [0],
    [token.interface.encodeFunctionData("mint", [owner.address, ethers.utils.parseEther(amount)])],
    ethers.utils.keccak256(ethers.utils.toUtf8Bytes("Give the owner more tokens!"))
  );

  const balance = await token.balanceOf(owner.address);
  console.log(`Owner balance is now ${ethers.utils.formatEther(balance)}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
