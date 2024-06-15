const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { ethers, upgrades, network } = require('hardhat');
const { expect } = require("chai");

describe("VendingMachine", function () {
  const NUM_SODAS = 10;
  const SODA_PRICE = "1000";
  const PRICE_UNIT = "wei";

  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployV2Fixture() {
    // Deploy the VendingMachineV2 implementation contract
    const VendingMachineV2 = await ethers.getContractFactory("VendingMachineV2");
    const proxy = await upgrades.deployProxy(VendingMachineV2, [NUM_SODAS], {
      initializer: "initialize",
    });
    await proxy.waitForDeployment();

    const [owner, user] = await ethers.getSigners();

    return { proxy, owner, user };
  }

  describe("V2", function () {
    beforeEach(async function () {
      ({ proxy, owner, user } = await loadFixture(deployV2Fixture));
    });

    it("should deploy and initialize the proxy with correct values", async function () {
      expect(await proxy.numSodas()).to.equal(NUM_SODAS);
      expect(await proxy.owner()).to.equal(owner.address);
    });

    describe("when withdrawing profits", function () {
      it("should revert when not called by owner", async function () {
        expect(
          proxy.connect(user).withdrawProfits()
        ).to.be.revertedWith("Only owner can call this function.");
      });
  
      it("should revert when no profit", async function () {
        expect(
          proxy.connect(owner).withdrawProfits()
        ).to.be.revertedWith("Profits must be greater than 0 in order to withdraw!");
      });

      it("should withdraw profits when called by owner", async function () {
        await proxy.purchaseSoda({ value: ethers.parseUnits(SODA_PRICE, PRICE_UNIT) });

        expect(
          await proxy.connect(owner).withdrawProfits()
        ).to.changeEtherBalance(owner, ethers.parseUnits(SODA_PRICE, PRICE_UNIT));
      });
    });

    describe("when purchasing a soda", function () {
      it("should decrement num of sodas", async function () {
        await proxy.purchaseSoda({ value: ethers.parseUnits(SODA_PRICE, PRICE_UNIT) });
        expect(await proxy.numSodas()).to.equal(NUM_SODAS - 1);
      });

      it("should be reverted with message when amount is insufficient", async function () {
        expect(
          proxy.purchaseSoda({ value: ethers.parseUnits("100", PRICE_UNIT) })
        ).to.be.revertedWith("You must pay 1000 wei for a soda!");
      });

      it("should be reverted with panic when out of stock", async function () {
        // Purchase all sodas
        const promises = [];
        for (let i = 0; i < NUM_SODAS; i++) {
          promises.push(
            proxy.purchaseSoda({ value: ethers.parseUnits(SODA_PRICE, PRICE_UNIT) })
          );
        }
        await Promise.all(promises);

        expect(
          proxy.purchaseSoda({ value: ethers.parseUnits(SODA_PRICE, PRICE_UNIT) })
        ).to.be.revertedWithPanic;
      });
    });
  });

  async function deployV3Fixture() {
    ({ proxy, owner, user } = await loadFixture(deployV2Fixture));

    // Upgrade to the VendingMachineV3 implementation contract
    const VendingMachineV3 = await ethers.getContractFactory("VendingMachineV3");
    upgradedProxy = await upgrades.upgradeProxy(
      proxy.target, VendingMachineV3, { call: "initializeV3" }
    );
    await upgradedProxy.waitForDeployment();

    return { upgradedProxy, owner, user };
  }

  describe("V3", function () {
    describe("upgrade", function () {
      it("should keep correct state after upgrading to v3", async function () {
        ({ proxy } = await loadFixture(deployV2Fixture));

        // Purchase two sodas
        await proxy.purchaseSoda({ value: ethers.parseUnits(SODA_PRICE, PRICE_UNIT) });
        await proxy.purchaseSoda({ value: ethers.parseUnits(SODA_PRICE, PRICE_UNIT) });

        // Upgrade to the VendingMachineV3 implementation contract
        const VendingMachineV3 = await ethers.getContractFactory("VendingMachineV3");
        upgradedProxy = await upgrades.upgradeProxy(
          proxy.target, VendingMachineV3, { call: "initializeV3" }
        );
        await upgradedProxy.waitForDeployment();

        expect(await upgradedProxy.numSodas()).to.equal(NUM_SODAS - 2);
        expect(await upgradedProxy.sodaPrice()).to.equal(BigInt(SODA_PRICE));
      });
    });

    describe("new features", function () {
      beforeEach(async function () {
        ({ upgradedProxy, owner, user } = await loadFixture(deployV3Fixture));
      });

      it("should revert with message when out of stock", async function () {
        // Purchase all sodas
        const promises = [];
        for (let i = 0; i < NUM_SODAS; i++) {
          promises.push(
            upgradedProxy.purchaseSoda({ value: ethers.parseUnits(SODA_PRICE, PRICE_UNIT) })
          );
        }
        await Promise.all(promises);

        expect(
          upgradedProxy.purchaseSoda({ value: ethers.parseUnits(SODA_PRICE, PRICE_UNIT) })
        ).to.be.revertedWith("Sodas out of stock!");
      });

      it("should view soda purchases", async function () {
        await upgradedProxy.connect(user)
          .purchaseSoda({ value: ethers.parseUnits(SODA_PRICE, PRICE_UNIT) });
        expect(await upgradedProxy.purchases(user.address)).to.equal(1);
      });

      it("should change soda price", async function () {
        const newPrice = "2000";

        await upgradedProxy.connect(owner).setSodaPrice(ethers.parseUnits(newPrice, PRICE_UNIT));
        expect(await upgradedProxy.sodaPrice()).to.equal(BigInt(newPrice));
      });

      it("should restock soda", async function () {
        const newStock = 50;

        await upgradedProxy.connect(owner).restockSoda(newStock);
        expect(await upgradedProxy.numSodas()).to.equal(NUM_SODAS + newStock);
      });

      it("should revert when restricted functions are not called by owner", async function () {
        expect(
          upgradedProxy.connect(user).restockSoda(100)
        ).to.be.revertedWith("Only owner can call this function.");

        expect(
          upgradedProxy.connect(user).setSodaPrice(ethers.parseUnits("2000", PRICE_UNIT))
        ).to.be.revertedWith("Only owner can call this function.");

        expect(
          upgradedProxy.connect(user).withdrawProfits()
        ).to.be.revertedWith("Only owner can call this function.");

        expect(
          upgradedProxy.connect(user).setNewOwner(user.address)
        ).to.be.revertedWith("Only owner can call this function.");
      });
    });
  });
});
