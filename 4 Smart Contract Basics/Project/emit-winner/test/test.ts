import { ethers } from 'hardhat';
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';

describe('EmitWinner', function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployContracts() {
    const Contract = await ethers.getContractFactory('Contract');
    const contract = await Contract.deploy();

    const EmitWinner = await ethers.getContractFactory('EmitWinner');
    const emitWinner = await EmitWinner.deploy();

    const [ deployer ] = await ethers.getSigners();

    return { deployer, contract, emitWinner };
  }

  it('should revert', async function () {
    const { deployer, contract } = await loadFixture(deployContracts);
    await expect(contract.connect(deployer).attempt())
      .to.be.revertedWith('msg.sender is equal to tx.origin');
  });

  it('should emit winner', async function () {
    const { deployer, contract, emitWinner } = await loadFixture(deployContracts);
    const tx = await emitWinner.connect(deployer).attempt(contract.target);
    await expect(tx).to.emit(contract, 'Winner').withArgs(emitWinner.target);
  });
});