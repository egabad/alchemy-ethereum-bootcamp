const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game5', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game5');
    const game = await Game.deploy();

    return { game };
  }

  beforeEach(async function() {
    const threshold = 0x00FfFFfFFFfFFFFFfFfFfffFFFfffFfFffFfFFFf;
    let isAddrFound = false;
    let address;

    while(!isAddrFound) {
      // Create a random wallet
      let wallet = new ethers.Wallet.createRandom().connect(ethers.provider);
      address = await wallet.getAddress();

      // Check if the generated address is under the threshold
      if (address < threshold ) {
        isAddrFound = true;
        this.signer = wallet;

        // Send 1 ether to the address
        const signer = ethers.provider.getSigner(0);
        await signer.sendTransaction({
          to: address,
          value: ethers.utils.parseEther('1.0'),
        });
      }
    }
  });

  it('should be a winner', async function () {
    const { game } = await loadFixture(deployContractAndSetVariables);

    // good luck
    await game.connect(this.signer).win();

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
