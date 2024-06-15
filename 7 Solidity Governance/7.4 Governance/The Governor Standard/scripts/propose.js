const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  const [owner] = await ethers.getSigners();
  const governor = await ethers.getContractAt("MyGovernor", process.env.GOVERNOR_CONTRACT);
  const token = await ethers.getContractAt("MyToken", process.env.TOKEN_CONTRACT);

  const amount = "15000";
  const tx = await governor.propose(
    [token.address],
    [0],
    [token.interface.encodeFunctionData("mint", [owner.address, ethers.utils.parseEther(amount)])],
    "Give the owner more tokens!"
  );
  const receipt = await tx.wait();
  const event = receipt.events.find(x => x.event === 'ProposalCreated');
  const { proposalId } = event.args;

  console.log(`Proposed to give ${amount} to the owner. Proposal ID: ${proposalId}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
