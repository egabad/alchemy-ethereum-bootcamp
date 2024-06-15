const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  const governor = await ethers.getContractAt("MyGovernor", process.env.GOVERNOR_CONTRACT);
  const proposalId = ethers.BigNumber.from(process.env.PROPOSAL_ID);

  await hre.network.provider.send("evm_mine");
  await governor.castVote(proposalId.toString(), 1);

  console.log(`Vote casted.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
