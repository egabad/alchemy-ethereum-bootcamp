const { ethers } = require("hardhat");

async function main() {
  const [owner] = await ethers.getSigners();
  const transactionCount = await owner.getTransactionCount();

  // Gets the address of the token before it is deployed
  const futureAddress = ethers.utils.getContractAddress({
    from: owner.address,
    nonce: transactionCount + 1
  });

  const MyGovernor = await ethers.getContractFactory("MyGovernor");
  const governor = await MyGovernor.deploy(futureAddress);

  const MyToken = await ethers.getContractFactory("MyToken");
  const token = await MyToken.deploy(governor.address);

  // Delegate votes to owner
  await token.delegate(owner.address);

  console.log(
    `Governor deployed to ${governor.address}\n`,
    `Token deployed to ${token.address}\n`,
    `Votes delegated to ${owner.address}\n`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
